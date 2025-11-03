import React, { useMemo, useRef } from 'react';
// Fix: `ShaderMaterialProps` is no longer exported. Replaced the import with `ThreeElements` to fix the type error.
import { useFrame, extend, ThreeElements } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import splineConfig from '../assets/spline-config.json';

// Corrected shader with proper world-space calculations for Fresnel effect.
const SplineMaterial = shaderMaterial(
  { uTime: 0, uColor1: new THREE.Color('#7B61FF'), uColor2: new THREE.Color('#00F5FF') },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    void main() {
      vUv = uv;
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      vWorldNormal = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    
    void main() {
        float time = uTime * 0.2;
        // Using sine to create moving bands of light
        float strength = (sin(vUv.x * 20.0 - time * 5.0) + 1.0) / 2.0;
        strength = pow(strength, 3.0);
        
        vec3 color = mix(uColor1, uColor2, vUv.x);
        
        // Correct Fresnel calculation using world-space vectors
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        float fresnel = 1.0 - dot(normalize(vWorldNormal), viewDirection);
        fresnel = pow(fresnel, 2.0);
        
        gl_FragColor = vec4(color * strength + fresnel * color * 0.5, 1.0);
    }
  `
);

extend({ SplineMaterial });

// FIX: Correctly typed the custom splineMaterial using the modern `ThreeElements['shaderMaterial']`.
// This resolves the critical type error that was causing the application to fail to load.
declare module '@react-three/fiber' {
  interface ThreeElements {
    splineMaterial: ThreeElements['shaderMaterial'] & {
      uTime?: number;
      uColor1?: THREE.Color;
      uColor2?: THREE.Color;
    };
  }
}

const Particles: React.FC<{ curve: THREE.CatmullRomCurve3 }> = ({ curve }) => {
    const pointsRef = useRef<THREE.Points>(null!);
    const count = 200;

    // Correctly initialize the progress ref.
    const progressRef = useRef(new Float32Array(count).fill(0).map(Math.random));
    
    const positions = useMemo(() => new Float32Array(count * 3), [count]);

    useFrame((_, delta) => {
        if (!pointsRef.current) return;
        const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const progress = progressRef.current;
        
        for (let i = 0; i < count; i++) {
            progress[i] += delta * 0.1;
            if (progress[i] > 1) progress[i] = 0;

            const point = curve.getPoint(progress[i]);
            positionsArray[i * 3] = point.x + (Math.random() - 0.5) * 0.2;
            positionsArray[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.2;
            positionsArray[i * 3 + 2] = point.z + (Math.random() - 0.5) * 0.2;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#00F5FF"
                size={0.08}
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};


const Spline: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
    const materialRef = useRef<THREE.ShaderMaterial>(null!);

    const curve = useMemo(() => {
        const points = (splineConfig.points as [number, number, number][]).map(p => new THREE.Vector3(...p));
        return new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.5);
    }, []);

    useFrame(({ clock }) => {
        if (materialRef.current && !reducedMotion) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    return (
        <>
            <mesh>
                <tubeGeometry args={[curve, 128, 0.1, 16, false]} />
                <splineMaterial ref={materialRef} side={THREE.DoubleSide} />
            </mesh>
            {!reducedMotion && <Particles curve={curve} />}
        </>
    );
};

export default Spline;