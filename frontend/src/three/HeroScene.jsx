import React, { useMemo, useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MARK_URL = "/luexe-mark.png";
useTexture.preload(MARK_URL);

function LogoMark3D({ pointer, scrollProgress }) {
  const ref = useRef();
  const matRef = useRef();
  const tex = useTexture(MARK_URL);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const aspect = tex.image ? tex.image.width / tex.image.height : 1;
  const h = 4.4;
  const w = h * aspect;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale and move the logo towards the camera as user scrolls
      gsap.to(ref.current.position, {
        z: 4,
        y: 2,
        ease: "power2.in",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade out and "shatter" (opacity) as it gets close
      gsap.to(matRef.current, {
        opacity: 0,
        ease: "power3.in",
        scrollTrigger: {
          trigger: "#top",
          start: "50% top",
          end: "80% top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    
    // Slow rotation combined with mouse movement
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
          {/* Black chrome effect using standard material with metalness */}
          <meshStandardMaterial
            ref={matRef}
            map={tex}
            color="#0a0a0a"
            metalness={1}
            roughness={0.1}
            transparent
            alphaTest={0.01}
            envMapIntensity={3}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

function ShatterParticles() {
  const ref = useRef();
  const matRef = useRef();
  const count = 1500;
  
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return arr;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Particles appear and fly up as the logo shatters
      gsap.fromTo(matRef.current, 
        { opacity: 0, size: 0 },
        {
          opacity: 1,
          size: 0.05,
          scrollTrigger: {
            trigger: "#top",
            start: "60% top",
            end: "120% top",
            scrub: true,
          }
        }
      );
      gsap.to(ref.current.position, {
        y: 10,
        z: 2,
        scrollTrigger: {
          trigger: "#top",
          start: "60% top",
          end: "150% top",
          scrub: true,
        }
      });
    });
    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={ref} position={[0, -2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color="#00E5FF"
        transparent
        opacity={0}
        size={0}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[6, 5, 5]} intensity={60} color="#7C3AED" />
      <pointLight position={[-6, -3, 4]} intensity={50} color="#00E5FF" />
      <directionalLight position={[0, 6, 6]} intensity={1.1} color="#ffffff" />
    </>
  );
}

export default function HeroScene({ config }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

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
    >
      <Lights />

      <Suspense fallback={null}>
        {config.environment ? (
          <Environment resolution={256} frames={1}>
            <Lightformer intensity={2} color="#7C3AED" position={[-5, 2, -3]} scale={[7, 7, 1]} />
            <Lightformer intensity={2} color="#00E5FF" position={[5, -1, -2]} scale={[7, 7, 1]} />
            <Lightformer intensity={4} color="#ffffff" position={[0, 5, 3]} scale={[9, 2.5, 1]} />
          </Environment>
        ) : null}

        <LogoMark3D pointer={pointer} />
        <ShatterParticles />

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
