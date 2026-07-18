'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';
    delay?: number;
    className?: string;
}

const animations = {
    fadeUp: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    slideLeft: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    },
    slideRight: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
};

export function AnimatedSection({
    children,
    animation = 'fadeUp',
    delay = 0,
    className = '',
}: AnimatedSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Check for reduced motion preference
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Safety fallback: content must never remain permanently invisible.
    // If the IntersectionObserver never fires (scroll-locked modal, offscreen
    // render, client-side navigation timing, etc.), reveal the content anyway
    // shortly after mount so the page can never get stuck as a blank screen.
    const [forceVisible, setForceVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setForceVisible(true), 400);
        return () => clearTimeout(timer);
    }, []);

    const selectedAnimation = animations[animation];
    const isVisible = prefersReducedMotion || isInView || forceVisible;

    return (
        <motion.div
            ref={ref}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate={isVisible ? 'visible' : 'hidden'}
            variants={selectedAnimation}
            transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : delay,
                ease: 'easeOut',
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
