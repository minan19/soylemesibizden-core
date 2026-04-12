"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext({
  theme: 'light' as Theme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--bg-primary', '#050505');
      root.style.setProperty('--bg-secondary', '#0D1117');
      root.style.setProperty('--text-primary', '#E6EDF3');
      root.style.setProperty('--text-secondary', '#8B949E');
      root.style.setProperty('--border-color', '#30363D');
      root.style.setProperty('--accent-emerald', '#1ABC9C');
    } else {
      root.style.setProperty('--bg-primary', '#FAFAFA');
      root.style.setProperty('--bg-secondary', '#FFFFFF');
      root.style.setProperty('--text-primary', '#0A0A0A');
      root.style.setProperty('--text-secondary', '#666666');
      root.style.setProperty('--border-color', '#EEEEEE');
      root.style.setProperty('--accent-emerald', '#1ABC9C');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useSovereignTheme = () => useContext(ThemeContext);
