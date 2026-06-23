import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Float, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------------
// LAYER 5 & 4: Aurora and Background Gradients
// ----------------------------------------------------------------------------
function AuroraBackground() {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh ref={ref} position={[0, 0, -15]} scale={[40, 40, 1]}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <meshBasicMaterial color="#0A0514" transparent opacity={0.6} depthWrite={false} />
      </mesh>
    </Float>
  );
}

// ----------------------------------------------------------------------------
// LAYER 3: Ambient Geometry
// ----------------------------------------------------------------------------
function AmbientGeometry() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -8]}>
      {/* Wireframe Sphere */}
      <mesh position={[-8, 4, -5]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial color="#7C3AED" wireframe transparent opacity={0.05} />
      </mesh>
      {/* Floating Cube */}
      <mesh position={[8, -4, -3]} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshPhysicalMaterial 
          color="#00E5FF" 
          transparent opacity={0.1} 
          roughness={0} 
          transmission={1} 
          thickness={0.5} 
        />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------------------------------
// THE MONOGRAM & FLOW FIELD PARTICLES (Logo Dissolve)
// ----------------------------------------------------------------------------
const MARK_URL = "/luexe-mark.png";

// Custom Shader Material for Flow Field Particles
const ParticleShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uColor1: { value: new THREE.Color("#7C3AED") },
    uColor2: { value: new THREE.Color("#00E5FF") }
  },
  vertexShader: `
    uniform float uTime;
    uniform float uProgress;
    attribute vec3 targetPos;
    attribute vec3 controlPos1;
    attribute vec3 controlPos2;
    attribute float random;
    varying float vAlpha;
    varying vec3 vColor;
    
    vec3 bezier(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float t) {
      float u = 1.0 - t;
      float tt = t * t;
      float uu = u * u;
      float uuu = uu * u;
      float ttt = tt * t;
      vec3 p = uuu * p0;
      p += 3.0 * uu * t * p1;
      p += 3.0 * u * tt * p2;
      p += ttt * p3;
      return p;
    }

    void main() {
      // Local progress delayed by particle random value to create a peel effect
      float localProgress = clamp((uProgress - random * 0.2) / 0.8, 0.0, 1.0);
      
      // Calculate position along bezier curve
      vec3 currentPos = bezier(position, controlPos1, controlPos2, targetPos, localProgress);
      
      // Add subtle flow field drift over time
      currentPos.x += sin(uTime * 0.5 + random * 10.0) * localProgress * 2.0;
      currentPos.y += cos(uTime * 0.3 + random * 10.0) * localProgress * 1.0;
      
      vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Size depends on random and distance
      gl_PointSize = (10.0 + random * 15.0) * (1.0 / -mvPosition.z);
      
      // Alpha fades out towards the end of the ribbon
      vAlpha = smoothstep(0.0, 0.2, localProgress) * (1.0 - localProgress);
      
      // Mix colors based on random seed
      vColor = mix(vec3(0.486, 0.227, 0.929), vec3(0.0, 0.898, 1.0), random);
    }
  `,
  fragmentShader: `
    varying float vAlpha;
    varying vec3 vColor;
    void main() {
      // Create a soft glowing circle
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float strength = pow(1.0 - (dist * 2.0), 1.5);
      
      gl_FragColor = vec4(vColor, strength * vAlpha * 0.8);
    }
  `
};

function HeroMonogramAndParticles({ pointer }) {
  const meshRef = useRef();
  const matRef = useRef();
  const pointsRef = useRef();
  const shaderRef = useRef();
  
  const tex = useTexture(MARK_URL);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const aspect = tex.image ? tex.image.width / tex.image.height : 1;
  const h = 4.4;
  const w = h * aspect;

  // Setup Instanced Particles
  const count = typeof window !== 'undefined' ? (window.innerWidth < 768 ? 100 : (window.innerWidth < 1024 ? 200 : 400)) : 400;
  
  const [positions, targets, cp1, cp2, randoms] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const t = new Float32Array(count * 3);
    const c1 = new Float32Array(count * 3);
    const c2 = new Float32Array(count * 3);
    const r = new Float32Array(count);
    
    for(let i = 0; i < count; i++) {
      // Start slightly randomized around the logo
      p[i*3] = (Math.random() - 0.5) * w;
      p[i*3+1] = (Math.random() - 0.5) * h;
      p[i*3+2] = (Math.random() - 0.5) * 0.5;
      
      // Target way up and scattered
      t[i*3] = (Math.random() - 0.5) * 20;
      t[i*3+1] = 15 + Math.random() * 10;
      t[i*3+2] = (Math.random() - 0.5) * 10 - 5;
      
      // Control points for bezier (curved ribbon path)
      c1[i*3] = p[i*3] + (Math.random() - 0.5) * 5;
      c1[i*3+1] = p[i*3+1] + 5 + Math.random() * 2;
      c1[i*3+2] = p[i*3+2] + (Math.random() - 0.5) * 5;
      
      c2[i*3] = t[i*3] + (Math.random() - 0.5) * 5;
      c2[i*3+1] = t[i*3+1] - 5;
      c2[i*3+2] = t[i*3+2] + (Math.random() - 0.5) * 5;
      
      r[i] = Math.random();
    }
    return [p, t, c1, c2, r];
  }, [count, w, h]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Logo opacity dissolve
      gsap.to(matRef.current, {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#top",
          start: "20% top",
          end: "60% top",
          scrub: true,
        }
      });
      
      // 2. Drive shader uniform for particle peeling
      if(shaderRef.current) {
        gsap.to(shaderRef.current.uniforms.uProgress, {
          value: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#top",
            start: "30% top",
            end: "120% top",
            scrub: true,
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      const targetY = pointer.current.x * 0.4 + Math.sin(t * 0.5) * 0.1;
      const targetX = -pointer.current.y * 0.3 + Math.sin(t * 0.4) * 0.05;
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.05;
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group position={[0, 0, 4]}>
      {/* The Monogram */}
      <mesh ref={meshRef}>
        <planeGeometry args={[w, h]} />
        <meshPhysicalMaterial
          ref={matRef}
          map={tex}
          color="#1a1a1a" // Graphite metallic base
          metalness={1}
          roughness={0.1}
          transparent
          alphaTest={0.01}
          envMapIntensity={2.5}
          depthWrite={false}
          emissive="#7C3AED"
          emissiveMap={tex}
          emissiveIntensity={0.4} // Subtle baked edge glow
        />
      </mesh>
      
      {/* The Flow-Field Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-targetPos" count={count} array={targets} itemSize={3} />
          <bufferAttribute attach="attributes-controlPos1" count={count} array={cp1} itemSize={3} />
          <bufferAttribute attach="attributes-controlPos2" count={count} array={cp2} itemSize={3} />
          <bufferAttribute attach="attributes-random" count={count} array={randoms} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
          ref={shaderRef}
          args={[ParticleShaderMaterial]}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// ----------------------------------------------------------------------------
// GLOBAL CAMERA CONTROLLER & LIGHTING
// ----------------------------------------------------------------------------
function SceneController() {
  const { camera, scene } = useThree();
  const light1Ref = useRef();
  const light2Ref = useRef();

  useEffect(() => {
    // Cinematic Camera Rig
    const ctx = gsap.context(() => {
      // Start position (Hero)
      camera.position.set(0, 0, 8);
      
      // Services: Gentle downward drift
      gsap.to(camera.position, {
        y: -1,
        z: 9,
        scrollTrigger: {
          trigger: "#services",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
      
      // Case Studies: Soft orbital movement
      gsap.to(camera.position, {
        x: 1,
        y: -0.5,
        scrollTrigger: {
          trigger: "#work",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
      
      // Final CTA: Slow pull-back
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 11,
        scrollTrigger: {
          trigger: "#contact",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      // Dynamic Lighting Colors
      // Hero -> Services (More Cyan)
      gsap.to(light1Ref.current.color, {
        r: 0, g: 0.898, b: 1, // Cyan
        scrollTrigger: { trigger: "#services", start: "top center", end: "bottom center", scrub: true }
      });
      
      // Services -> Case Studies (More Purple)
      gsap.to(light1Ref.current.color, {
        r: 0.486, g: 0.227, b: 0.929, // Purple
        scrollTrigger: { trigger: "#work", start: "top center", end: "bottom center", scrub: true }
      });
    });
    return () => ctx.revert();
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight ref={light1Ref} position={[6, 5, 5]} intensity={80} color="#7C3AED" />
      <pointLight ref={light2Ref} position={[-6, -3, 4]} intensity={70} color="#00E5FF" />
      <directionalLight position={[0, 6, 6]} intensity={1.5} color="#ffffff" />
    </>
  );
}

// ----------------------------------------------------------------------------
// MAIN EXPORT: Global Scene Manager
// ----------------------------------------------------------------------------
export default function GlobalSceneManager({ config }) {
  const pointer = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (wrapperRef.current) {
        gsap.to(wrapperRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: "#process",
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-0 pointer-events-none transition-opacity">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        dpr={config?.dpr || [1, 1.5]}
      >
        <SceneController />
        
        {config?.environment && (
          <Environment resolution={256} frames={1}>
            <Lightformer intensity={2} color="#7C3AED" position={[-5, 2, -3]} scale={[7, 7, 1]} />
            <Lightformer intensity={2} color="#00E5FF" position={[5, -1, -2]} scale={[7, 7, 1]} />
            <Lightformer intensity={3} color="#ffffff" position={[0, 5, 3]} scale={[9, 2.5, 1]} />
          </Environment>
        )}

        {/* 5-Layer System Objects */}
        <AuroraBackground />
        <AmbientGeometry />
        <HeroMonogramAndParticles pointer={pointer} />

        {config?.bloom && (
          <EffectComposer disableNormalPass multisampling={0}>
            <Bloom
              mipmapBlur
              intensity={config.bloomIntensity || 1.2}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.5}
              radius={0.8}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
