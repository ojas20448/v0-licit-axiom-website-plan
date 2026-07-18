'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

/**
 * Fades each page in on mount using a pure CSS animation (keyed by pathname so
 * navigation re-triggers it).
 *
 * This deliberately avoids framer-motion's AnimatePresence / mount animations at
 * the root of the App Router: that pattern could leave stale display:none page
 * wrappers behind and strand the active page at its initial (invisible) state —
 * a blank white screen. A CSS animation always settles at its visible end state,
 * so the page can never get stuck hidden.
 */
export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <div key={pathname} className="page-fade-in">
            {children}
        </div>
    );
}
