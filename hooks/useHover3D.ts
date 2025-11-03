import { useRef, useEffect, useState } from 'react';
import { useMotionValue, useSpring, transform, useMotionTemplate } from 'framer-motion';

const springConfig = { stiffness: 150, damping: 20, mass: 1 };

export function useHover3D<T extends HTMLElement>(options?: { x?: number, y?: number, z?: number }) {
    const ref = useRef<T>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useMotionValue(0), springConfig);
    const rotateY = useSpring(useMotionValue(0), springConfig);
    const translateX = useSpring(useMotionValue(0), springConfig);
    const translateY = useSpring(useMotionValue(0), springConfig);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = element.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;

            mouseX.set(x);
            mouseY.set(y);
            
            element.style.setProperty('--x', `${x}px`);
            element.style.setProperty('--y', `${y}px`);

            const mappedRotateX = transform(y, [0, height], [options?.x ?? 10, -(options?.x ?? 10)]);
            const mappedRotateY = transform(x, [0, width], [-(options?.y ?? 10), options?.y ?? 10]);

            rotateX.set(mappedRotateX);
            rotateY.set(mappedRotateY);

            const mappedTranslateX = transform(x, [0, width], [-(options?.z ?? 4), options?.z ?? 4]);
            const mappedTranslateY = transform(y, [0, height], [-(options?.z ?? 4), options?.z ?? 4]);
            
            translateX.set(mappedTranslateX);
            translateY.set(mappedTranslateY);
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            rotateX.set(0);
            rotateY.set(0);
            translateX.set(0);
            translateY.set(0);

            element.style.removeProperty('--x');
            element.style.removeProperty('--y');
        };

        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseenter', handleMouseEnter);
            // Fix: Corrected typo in event handler name from handleLeave to handleMouseLeave.
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref, mouseX, mouseY, rotateX, rotateY, translateX, translateY, options]);

    // Fix: Renamed the 'transform' constant to 'motionTransform' to avoid conflict with the imported 'transform' function from framer-motion.
    const motionTransform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px)`;

    return {
        ref,
        style: {
            transformStyle: 'preserve-3d' as const,
            transform: motionTransform,
        },
        isHovered
    };
}