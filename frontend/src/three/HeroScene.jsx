import React, { useMemo, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MARK_URL = "/luexe-mark.png";
useTexture.preload(MARK_URL);

/* Official Luexe monogram as a floating, mouse-reactive glowing billboard.
   The flat plane gently tilts (parallax) while the surrounding particle field,
   glass shards and volumetric lighting provide the cinematic 3D depth. */
function LogoMark3D({ pointer }) {
  const ref = useRef();
  const matRef = useRef();
  const tex = useTexture(MARK_URL);
  tex.colorSpace = THREE.SRGBColorSpace;
  // Reduce anisotropy to save GPU memory bandwidth on mobile devices
  tex.anisotropy = 2;

  const aspect = tex.image ? tex.image.width / tex.image.height : 1;
  const h = 4.4;
  const w = h * aspect;

  const { positions, colors, randoms } = useMemo(() => {
    if (!tex || !tex.image) return { positions: new Float32Array(0), colors: new Float32Array(0), randoms: new Float32Array(0) };
    const img = tex.image;
    const canvas = document.createElement("canvas");
    const maxDimension = 200;
    const scale = maxDimension / Math.max(img.width, img.height);
    canvas.width = Math.floor(img.width * scale);
    canvas.height = Math.floor(img.height * scale);
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    
    const pos = [];
    const col = [];
    const rnd = [];
    
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const a = data[i + 3];
        if (a > 100) {
          const px = (x / canvas.width - 0.5) * w;
          const py = -(y / canvas.height - 0.5) * h;
          pos.push(px, py, 0);
          col.push(data[i]/255, data[i+1]/255, data[i+2]/255);
          
          const rx = (Math.random() - 0.5) * 15;
          const ry = (Math.random() - 0.5) * 15;
          const rz = (Math.random() - 0.5) * 15;
          rnd.push(rx, ry, rz);
        }
      }
    }
    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
      randoms: new Float32Array(rnd)
    };
  }, [tex, w, h]);

  const uniforms = useMemo(() => ({
    uProgress: { value: 0 },
    uSize: { value: 12.0 * (window.devicePixelRatio || 1) },
    uOpacity: { value: 1 },
  }), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade out the solid mesh immediately
      gsap.to(matRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "0% top",
          end: "5% top",
          scrub: true,
        }
      });

      // 2. Blast the particles outward
      gsap.to(uniforms.uProgress, {
        value: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#top",
          start: "5% top",
          end: "80% top",
          scrub: 1.2,
        }
      });
    });
    return () => ctx.revert();
  }, [uniforms]);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const targetY = pointer.current.x * 0.42 + Math.sin(t * 0.5) * 0.12;
    const targetX = -pointer.current.y * 0.3 + Math.sin(t * 0.4) * 0.05;
    g.rotation.y += (targetY - g.rotation.y) * 0.06;
    g.rotation.x += (targetX - g.rotation.x) * 0.06;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={ref}>
        {/* The solid logo (visible initially) */}
        <mesh>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial
            ref={matRef}
            map={tex}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        
        {/* The shattering particles (visible on scroll) */}
        {positions.length > 0 && (
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[positions, 3]} />
              <bufferAttribute attach="attributes-color" args={[colors, 3]} />
              <bufferAttribute attach="attributes-random" args={[randoms, 3]} />
            </bufferGeometry>
            <shaderMaterial
              uniforms={uniforms}
              vertexShader={`
                uniform float uProgress;
                uniform float uSize;
                attribute vec3 random;
                attribute vec3 color;
                varying vec3 vColor;
                void main() {
                  vColor = color;
                  vec3 pos = position + random * uProgress;
                  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                  gl_Position = projectionMatrix * mvPosition;
                  gl_PointSize = uSize * (1.0 / -mvPosition.z);
                }
              `}
              fragmentShader={`
                uniform float uProgress;
                uniform float uOpacity;
                varying vec3 vColor;
                void main() {
                  vec2 xy = gl_PointCoord.xy - vec2(0.5);
                  if(length(xy) > 0.5) discard;
                  
                  float alpha = uOpacity * (1.0 - (uProgress * uProgress));
                  gl_FragColor = vec4(vColor, alpha);
                }
              `}
              transparent
              depthWrite={false}
            />
          </points>
        )}
      </group>
    </Float>
  );
}

function Particles({ count, color, radius = 9, size = 0.025, speed = 0.0004 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ref.current) {
        // Blast particles outward by scaling the group
        gsap.to(ref.current.scale, {
          x: 4.5,
          y: 4.5,
          z: 4.5,
          ease: "power2.in",
          scrollTrigger: {
            trigger: "#top",
            start: "0% top",
            end: "120% top",
            scrub: 1.2,
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += speed;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}


function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 5, 5]} intensity={60} color="#7C3AED" />
      <pointLight position={[-6, -3, 4]} intensity={50} color="#00E5FF" />
      <directionalLight position={[0, 6, 6]} intensity={1.1} color="#ffffff" />
    </>
  );
}

export default function HeroScene({ config }) {
  const pointer = useRef({ x: 0, y: 0 });
  const [inView, setInView] = React.useState(true);

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    
    // Pause rendering entirely if user scrolls past Hero section (saves massive laptop battery and eliminates lag)
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.2) {
        if (inView) setInView(false);
      } else {
        if (!inView) setInView(true);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [inView]);

  return (
    <Canvas
      dpr={config.dpr}
      camera={{ position: [0, 0, 7.5], fov: 40 }}
      gl={{
        antialias: config.antialias,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      frameloop={inView ? "always" : "never"}
      style={{ pointerEvents: "none" }}
    >
      <Lights />

      <Suspense fallback={null}>
        {config.environment ? (
          <Environment resolution={256} frames={1}>
            <Lightformer
              intensity={2.2}
              color="#7C3AED"
              position={[-5, 2, -3]}
              scale={[7, 7, 1]}
            />
            <Lightformer
              intensity={2.2}
              color="#00E5FF"
              position={[5, -1, -2]}
              scale={[7, 7, 1]}
            />
            <Lightformer
              intensity={3}
              color="#ffffff"
              position={[0, 5, 3]}
              scale={[9, 2.5, 1]}
            />
          </Environment>
        ) : null}

        <LogoMark3D pointer={pointer} />

        {config.particles > 0 && (
          <>
            <Particles
              count={Math.round(config.particles * 0.6)}
              color="#00E5FF"
              size={0.02}
            />
            <Particles
              count={Math.round(config.particles * 0.4)}
              color="#7C3AED"
              size={0.03}
              radius={7}
              speed={-0.0003}
            />
          </>
        )}
      </Suspense>

      {config.bloom && (
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom
            mipmapBlur
            intensity={config.bloomIntensity}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.4}
            radius={0.8}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
