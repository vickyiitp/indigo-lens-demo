import React, { useRef, useLayoutEffect } from 'react';
// Fix: Add ThreeElements to import for type definitions.
import { Canvas, useThree, useFrame, ThreeElements } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from './Spline';

gsap.registerPlugin(ScrollTrigger);

const SceneSetup: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
    const { camera, scene } = useThree();
    const timeline = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        if (reducedMotion) {
            camera.position.set(0, 0, 6);
            return;
        }
        
        // Initial camera animation
        gsap.fromTo(camera.position, { z: 12 }, { z: 6, duration: 2, ease: 'power3.out' });

        // Create a new timeline and store it in a local variable for safety.
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
            },
        });

        // Add animations to the local timeline instance.
        tl.to(camera.position, { y: -3, z: 5 }, 0)
          .to(camera.rotation, { x: -0.2 }, 0);
        
        // Assign the fully constructed timeline to the ref.
        timeline.current = tl;
        
        // More robust cleanup function.
        return () => {
            timeline.current?.kill();
            // Explicitly kill any animations on the camera to prevent conflicts on re-render.
            gsap.killTweensOf(camera.position);
            gsap.killTweensOf(camera.rotation);
        }
    }, [camera, reducedMotion]);
    
    // Subtle scene rotation
    useFrame(({ clock }) => {
        if (!reducedMotion) {
            scene.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.1;
        }
    });

    return null;
};

const HeroSplineCanvas: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
    return (
        <Canvas
            camera={{ position: [0, 0, 12], fov: 50 }}
            dpr={[1, 1.5]} // Clamp pixel ratio for performance
        >
            <color attach="background" args={['#080808']} />
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={0.5} color="#B5179E" />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#00F5FF" />
            
            <Spline reducedMotion={reducedMotion} />
            
            <SceneSetup reducedMotion={reducedMotion} />
            
            {!reducedMotion && (
                <EffectComposer>
                    <Bloom luminanceThreshold={0.1} intensity={0.8} levels={9} mipmapBlur />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            )}
        </Canvas>
    );
};

export default HeroSplineCanvas;