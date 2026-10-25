import React, { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Environment } from "@react-three/drei";
import * as THREE from "three";
import { HERO_PHOTO, THEME } from "./HeroConfig";

/* -------------------------------------------------------
   CUSTOM GLSL SHADER MATERIAL FOR 3D PHOTO
------------------------------------------------------- */

const PhotoShader = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uHover: { value: 0 },
    uPointer: { value: new THREE.Vector2(0, 0) },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uPointer;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);

      vec3 pos = position;

      // Organic subtle depth waves on hover & cursor interaction
      float wave = sin(pos.x * 2.2 + uTime * 1.4) * cos(pos.y * 2.2 + uTime * 1.2);
      float dist = length(uv - (uPointer * 0.5 + 0.5));
      float ripple = sin(dist * 12.0 - uTime * 2.5) * exp(-dist * 3.5);

      pos.z += (wave * 0.05 + ripple * 0.06) * uHover;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    precision highp float;

    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec2 uv = vUv;

      // Subtle chromatic dispersion near edges on hover
      float chr = 0.0035 * uHover;
      float r = texture2D(uTexture, uv + vec2(chr, 0.0)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - vec2(chr, 0.0)).b;
      vec3 photo = vec3(r, g, b);

      // Studio specular highlight
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      vec3 lightDir = normalize(vec3(1.5, 2.5, 2.0));
      vec3 halfVector = normalize(lightDir + viewDir);
      float NdotH = max(dot(normal, halfVector), 0.0);
      float specular = pow(NdotH, 32.0) * 0.25;

      // Ethereal rim light
      float NdotV = max(dot(normal, viewDir), 0.0);
      float rim = pow(1.0 - NdotV, 3.0) * 0.28;
      vec3 rimColor = vec3(0.78, 0.33, 0.16); // Burnt terracotta accent

      vec3 finalColor = photo + vec3(specular) + rim * rimColor;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

/* -------------------------------------------------------
   3D PHOTO SCULPTURE ASSEMBLY
------------------------------------------------------- */

function PhotoMonolith() {
  const groupRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Load photo texture cleanly with sRGB color space
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(HERO_PHOTO);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHover: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    [texture]
  );

  // Width: 2.7, Height: 3.6 (Standard 3:4 portrait aspect ratio)
  const width = 2.7;
  const height = 3.6;

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Smooth hover lerp for wave ripple & chromatic dispersion
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hovered ? 1.0 : 0.25,
        0.08
      );
      materialRef.current.uniforms.uPointer.value.lerp(state.pointer, 0.08);
    }

    // 3D Parallax Tilt following pointer
    if (groupRef.current) {
      const targetRotY = state.pointer.x * 0.38;
      const targetRotX = -state.pointer.y * 0.26;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.06
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.06
      );
    }
  });

  return (
    <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.35}>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* 1. Main 3D Photo Mesh with Subdivided Plane & Custom Shader */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[width, height, 48, 48]} />
          <shaderMaterial
            ref={materialRef}
            vertexShader={PhotoShader.vertexShader}
            fragmentShader={PhotoShader.fragmentShader}
            uniforms={uniforms}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 2. Sleek Architectural Beveled Backing Monolith */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[width + 0.16, height + 0.16, 0.1]} />
          <meshStandardMaterial
            color={THEME.text}
            metalness={0.92}
            roughness={0.18}
            envMapIntensity={1.4}
          />
        </mesh>

        {/* 3. Outer Fine Metallic Rim Frame (Burnt Terracotta Accent) */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[width + 0.04, height + 0.04, 0.02]} />
          <meshStandardMaterial
            color={THEME.accent}
            metalness={0.85}
            roughness={0.25}
            wireframe
          />
        </mesh>

        {/* 4. Fine Spatial Orbital Ring looping in 3D around the photo */}
        <mesh rotation={[1.15, 0.42, 0.18]} scale={2.4}>
          <torusGeometry args={[1, 0.007, 16, 160]} />
          <meshStandardMaterial
            color={THEME.accent}
            emissive={THEME.accent}
            emissiveIntensity={0.35}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* 5. Secondary Brushed Bronze Diagonal Ring */}
        <mesh rotation={[0.4, -0.9, 0.3]} scale={2.65}>
          <torusGeometry args={[1, 0.004, 12, 140]} />
          <meshStandardMaterial
            color={THEME.bronze}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* -------------------------------------------------------
   MAIN 3D SCENE STAGE
------------------------------------------------------- */

export function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5.8], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 5]} intensity={2.6} color="#FFF8F0" />
      <pointLight position={[-3, -2, 3]} intensity={14} color={THEME.accent} />
      <pointLight position={[3, 2, -2]} intensity={9} color={THEME.bronze} />

      <Suspense fallback={null}>
        <PhotoMonolith />
        <Environment preset="studio" />
      </Suspense>

      <Sparkles
        count={32}
        scale={5.8}
        size={2.2}
        speed={0.22}
        opacity={0.45}
        color={THEME.accent}
      />
    </Canvas>
  );
}

export function ShaderBackground() {
  return null;
}

export default function Hero3D() {
  return (
    <div
      id="hero-3d-stage"
      className="relative flex h-[500px] w-full items-center justify-center sm:h-[600px] lg:h-[min(82vh,780px)]"
      aria-label="Interactive 3D photo sculpture"
    >
      <Scene3D />
    </div>
  );
}
