'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita error de hidratación: no pintar según el tema hasta montar.
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-gray-800 p-3 text-sm font-medium hover:bg-sky-100 dark:hover:bg-gray-700 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      {isDark ? (
        <SunIcon className="w-6" />
      ) : (
        <MoonIcon className="w-6" />
      )}
      <div className="hidden md:block">{isDark ? 'Light' : 'Dark'}</div>
    </button>
  );
}