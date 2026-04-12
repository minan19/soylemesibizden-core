"use client";
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useSovereignTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useSovereignTheme();

  return (
    <button 
      onClick={toggleTheme}
      style={{ 
        background: 'var(--bg-secondary)', 
        border: '1px solid var(--border-color)', 
        padding: '10px', 
        borderRadius: '50%', 
        cursor: 'pointer', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        color: 'var(--text-primary)'
      }}
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
};
