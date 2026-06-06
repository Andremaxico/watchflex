import { useState, useEffect } from 'react';

export function useWindowWidth() {
    // Initialize with undefined or a default value to prevent SSR hydration mismatch
    const [width, setWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        // Only runs on the client side
        const handleResize = () => setWidth(window.innerWidth);

        // Set initial width
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width;
}
