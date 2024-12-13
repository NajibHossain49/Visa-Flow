import React from 'react';
import { useTheme } from './ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-14 z-50 p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg transition-colors"
      aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-blue-500" />}
    </button>
  );
};

export default ThemeToggle;