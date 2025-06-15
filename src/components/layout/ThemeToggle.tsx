
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-full hover:bg-accent/50 transition-all duration-200 hover:scale-105"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5">
        <Sun 
          size={18} 
          className={`absolute inset-0 transition-all duration-300 ${
            isDark 
              ? 'rotate-90 scale-0 opacity-0' 
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon 
          size={18} 
          className={`absolute inset-0 transition-all duration-300 ${
            isDark 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </Button>
  );
};

export default ThemeToggle;
