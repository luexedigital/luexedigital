import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function BackgroundParticles({ count, color, radius = 10, size = 0.03, speed = 0.0002, isAssembling }) {
  const ref = useRef();
  
  const originalPositions = useMemo(() => {
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
    if (!ref.current) return;
    if (isAssembling) {
      // Pull particles towards the center to simulate gathering
      gsap.to(ref.current.scale, { x: 0.1, y: 0.1, z: 0.1, duration: 2, ease: "power2.inOut" });
    } else {
      gsap.to(ref.current.scale, { x: 1, y: 1, z: 1, duration: 2, ease: "power2.out" });
    }
  }, [isAssembling]);

  useFrame(() => {
    if (ref.current && !isAssembling) {
      ref.current.rotation.y += speed;
      ref.current.rotation.x += speed * 0.5;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={originalPositions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FinalMonogramAssembly({ isAssembling }) {
  const ref = useRef();
  const matRef = useRef();
  const tex = useTexture("/luexe-mark.png");
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  
  const aspect = tex.image ? tex.image.width / tex.image.height : 1;
  const h = 8;
  const w = h * aspect;

  useEffect(() => {
    if (isAssembling) {
      gsap.fromTo(ref.current.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 2.5, ease: "back.out(1.2)" });
      gsap.fromTo(matRef.current, { opacity: 0 }, { opacity: 0.8, duration: 2, delay: 0.5 });
    } else if (ref.current) {
      gsap.to(ref.current.scale, { x: 0, y: 0, z: 0, duration: 1, ease: "power2.in" });
      gsap.to(matRef.current, { opacity: 0, duration: 1 });
    }
  }, [isAssembling]);

  useFrame((state) => {
    if (ref.current && isAssembling) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -2]} scale={0}>
      <planeGeometry args={[w, h]} />
      <meshStandardMaterial
        ref={matRef}
        map={tex}
        transparent
        opacity={0}
        color="#00E5FF"
        emissive="#00E5FF"
        emissiveIntensity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function AmbientGradients({ isAssembling }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.rotation.z = t * 0.05;
    }
  });

  useEffect(() => {
    if (isAssembling) {
      gsap.to(ref.current.material, { opacity: 0.1, duration: 2 });
    } else {
      gsap.to(ref.current.material, { opacity: 0.3, duration: 2 });
    }
  }, [isAssembling]);

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh ref={ref} position={[0, 0, -5]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial
          color="#120A2A"
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

export default function GlobalBackground({ config }) {
  const [isAssembling, setIsAssembling] = useState(false);
  const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 30 : 150;

  useEffect(() => {
    const handleReveal = () => setIsAssembling(true);
    const handleHide = () => setIsAssembling(false);
    
    window.addEventListener("reveal-final-cta", handleReveal);
    window.addEventListener("hide-final-cta", handleHide);
    
    return () => {
      window.removeEventListener("reveal-final-cta", handleReveal);
      window.removeEventListener("hide-final-cta", handleHide);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={config?.dpr || [1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <AmbientGradients isAssembling={isAssembling} />
        <BackgroundParticles count={particleCount} color="#00E5FF" size={0.02} speed={0.0003} isAssembling={isAssembling} />
        <BackgroundParticles count={Math.floor(particleCount * 0.6)} color="#7C3AED" size={0.03} radius={12} speed={-0.0002} isAssembling={isAssembling} />
        <FinalMonogramAssembly isAssembling={isAssembling} />
      </Canvas>
    </div>
  );
}
