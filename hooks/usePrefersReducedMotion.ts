
import { useState, useEffect } from 'react';

const query = '(prefers-reduced-motion: reduce)';

const getInitialState = () => {
    // Check for window existence for SSR environments
    if (typeof window === 'undefined') {
        return false;
    }
    return window.matchMedia(query).matches;
};

export function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialState);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        
        const listener = () => {
            setPrefersReducedMotion(mediaQuery.matches);
        };

        // Add listener in a way that is compatible with older browsers
        try {
            mediaQuery.addEventListener('change', listener);
        } catch (e) {
            // Fallback for older browsers
            mediaQuery.addListener(listener);
        }

        return () => {
            try {
                mediaQuery.removeEventListener('change', listener);
            } catch (e) {
                // Fallback for older browsers
                mediaQuery.removeListener(listener);
            }
        };
    }, []);

    return prefersReducedMotion;
}
