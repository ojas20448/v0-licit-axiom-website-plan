'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface CounterProps {
    value: number;
    duration?: number;
    suffix?: string;
    className?: string;
}

export function Counter({ value, duration = 2, suffix = '', className = '' }: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            setDisplayValue(Math.round(latest));
        });

        return () => unsubscribe();
    }, [springValue]);

    // Check for reduced motion
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        return (
            <span ref={ref} className={className}>
                {value}
                {suffix}
            </span>
        );
    }

    return (
        <span ref={ref} className={className}>
            {displayValue}
            {suffix}
        </span>
    );
}

interface AnimatedStatProps {
    value: string;
    label: string;
    delay?: number;
}

export function AnimatedStat({ value, label, delay = 0 }: AnimatedStatProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Extract number and suffix from value (e.g., "26+" -> 26 and "+")
    const match = value.match(/^(\d+)(.*)$/);
    const numericValue = match ? parseInt(match[1], 10) : 0;
    const suffix = match ? match[2] : '';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            className="text-center"
        >
            <div className="font-serif text-3xl font-bold text-accent md:text-4xl">
                <Counter value={numericValue} suffix={suffix} />
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{label}</div>
        </motion.div>
    );
}
