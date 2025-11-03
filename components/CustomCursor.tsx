import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type CursorType = 'default' | 'btn' | 'link' | 'card';

const CustomCursor: React.FC = () => {
    const { x, y } = useMousePosition();
    const prefersReducedMotion = usePrefersReducedMotion();
    const [cursorType, setCursorType] = useState<CursorType>('default');
    const [isIdle, setIsIdle] = useState(false);
    // FIX: Replaced NodeJS.Timeout with a browser-compatible type and explicitly initialized
    // the ref to satisfy the "Expected 1 arguments" error.
    const idleTimeoutRef = useRef<number | undefined>(undefined);

    const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
    const cursorX = useSpring(x, springConfig);
    const cursorY = useSpring(y, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Update cursor position
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Reset idle timer
            setIsIdle(false);
            clearTimeout(idleTimeoutRef.current);
            idleTimeoutRef.current = window.setTimeout(() => setIsIdle(true), 2500);

            // Check for hover target
            const target = e.target as HTMLElement;
            const cursorTarget = target.closest('[data-cursor-type]');
            if (cursorTarget) {
                setCursorType(cursorTarget.getAttribute('data-cursor-type') as CursorType);
            } else {
                setCursorType('default');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        // FIX: Added cleanup for the timeout to prevent memory leaks on unmount.
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(idleTimeoutRef.current);
        };
    }, [cursorX, cursorY]);

    if (prefersReducedMotion) {
        return null;
    }

    const variants = {
        default: {
            width: 32,
            height: 32,
            border: '2px solid rgba(0, 245, 255, 0.6)',
            backgroundColor: 'rgba(0, 245, 255, 0.1)',
        },
        btn: {
            width: 80,
            height: 40,
            borderRadius: '8px',
            border: '2px solid #B5179E',
            backgroundColor: 'rgba(181, 23, 158, 0.2)',
        },
        link: {
            width: 12,
            height: 12,
            border: '2px solid #00F5FF',
            backgroundColor: '#00F5FF',
        },
        card: {
            width: 48,
            height: 48,
            border: '2px dashed rgba(255, 255, 255, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
    };

    return (
        <motion.div
            variants={variants}
            animate={cursorType}
            style={{
                translateX: cursorX,
                translateY: cursorY,
            }}
            className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[1000] backdrop-blur-sm"
        >
            {isIdle && <div className="w-full h-full rounded-full bg-neon-blue animate-cursor-pulse"></div>}
        </motion.div>
    );
};

export default CustomCursor;
