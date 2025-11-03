import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- PARTICLES COMPONENT ---
interface ParticleData {
    time: number;
    factor: number;
    speed: number;
    x: number;
    y: number;
    z: number;
}
const Particles: React.FC<{ count: number }> = ({ count }) => {
    const mesh = useRef<THREE.Points>(null!);
    const particlesData = useMemo(() => {
        const temp: ParticleData[] = [];
        for (let i = 0; i < count; i++) {
            const time = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.005 + Math.random() / 200;
            const x = (Math.random() - 0.5) * 80;
            const y = (Math.random() - 0.5) * 80;
            const z = (Math.random() - 0.5) * 80;
            temp.push({ time, factor, speed, x, y, z });
        }
        return temp;
    }, [count]);
    
    const particles = useRef(particlesData);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        particlesData.forEach((p, i) => {
            pos.set([p.x, p.y, p.z], i * 3);
        });
        return pos;
    }, [count, particlesData]);
    
    useFrame(() => {
        if (!mesh.current) return;
        particles.current.forEach((particle, i) => {
            let { factor, speed } = particle;
            const t = (particle.time += speed);
            dummy.position.set(
                particle.x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                particle.y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                particle.z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.updateMatrix();
            (mesh.current.geometry.attributes.position as THREE.BufferAttribute).setXYZ(i, dummy.position.x, dummy.position.y, dummy.position.z);
        });
        mesh.current.geometry.attributes.position.needsUpdate = true;
        mesh.current.rotation.y += 0.0005;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.1} color="#00F5FF" sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
    );
};

// --- LINE TRAILS COMPONENT ---
class TrailPoint {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    constructor() {
        this.position = new THREE.Vector3(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        this.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1
        ).normalize().multiplyScalar(0.1);
    }
    update() {
        this.position.add(this.velocity);
        if (this.position.length() > 40) {
            this.position.negate();
        }
    }
}

const LineTrails: React.FC<{ count: number }> = ({ count }) => {
    const lines = useMemo(() => {
        return Array.from({ length: count }, () => {
            const points = Array.from({ length: 30 }, () => new THREE.Vector3(0,0,0));
            const curve = new THREE.CatmullRomCurve3(points);
            const geometry = new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
            const material = new THREE.MeshBasicMaterial({ 
                color: '#3A0CA3', 
                blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: 0.5,
            });
            const trailPoints = Array.from({ length: 30 }, () => new TrailPoint());
            return { meshRef: React.createRef<THREE.Mesh>(), geometry, material, trailPoints };
        });
    }, [count]);

    useFrame(() => {
        lines.forEach(line => {
            const { geometry, trailPoints } = line;
            trailPoints.forEach(p => p.update());
            const curvePoints = trailPoints.map(p => p.position);
            const newCurve = new THREE.CatmullRomCurve3(curvePoints);
            const newGeometry = new THREE.TubeGeometry(newCurve, 20, 0.02, 8, false);
            geometry.attributes.position = newGeometry.attributes.position;
            geometry.index = newGeometry.index;
            geometry.attributes.position.needsUpdate = true;
        });
    });

    return (
        <group>
            {lines.map((line, index) => (
                <mesh key={index} ref={line.meshRef} geometry={line.geometry} material={line.material} />
            ))}
        </group>
    );
};


// --- MAIN BACKGROUND COMPONENT ---
interface PageBackgroundProps {
    scene: 'particles' | 'none';
    active: boolean;
    reducedMotion: boolean;
}

const PageBackground: React.FC<PageBackgroundProps> = ({ scene, active, reducedMotion }) => {
    if (reducedMotion || !active || scene === 'none') {
        return (
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-charcoal to-indigo-brand/20 animate-gradient-pan bg-[length:200%_200%]" />
        );
    }
    
    return (
        <div className="absolute inset-0 z-0 opacity-50">
            <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
                {scene === 'particles' && <Particles count={100} />}
                {scene === 'particles' && <LineTrails count={8} />}
            </Canvas>
        </div>
    );
};

export default PageBackground;