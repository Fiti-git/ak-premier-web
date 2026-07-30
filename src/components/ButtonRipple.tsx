'use client';

import { useEffect } from 'react';

export default function ButtonRipple() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('.btn') as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--x', `${e.clientX - rect.left}px`);
      target.style.setProperty('--y', `${e.clientY - rect.top}px`);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return null;
}
