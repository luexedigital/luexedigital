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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slightly fade the logo as you scroll down so text below is readable
      gsap.to(matRef.current, {
        opacity: 0.03,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#top",
          start: "0% top",
          end: "100% top",
          scrub: true,
        }
      });

      // Blast (scale) the logo
      if (ref.current) {
        gsap.to(ref.current.scale, {
          x: 12,
          y: 12,
          z: 12,
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
