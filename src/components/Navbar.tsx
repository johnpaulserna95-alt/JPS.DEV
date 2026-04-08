import { Moon, Sun, Github } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';
import { motion } from 'motion/react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-8 py-5 bg-[rgba(5,5,5,0.5)] dark:bg-[rgba(5,5,5,0.5)] light:bg-[rgba(248,247,244,0.7)] backdrop-blur-[20px] border-b border-[rgba(var(--accent-rgb),0.07)] transition-all duration-500">
      <div className="font-mono font-bold text-base tracking-[-0.02em] text-primary flex items-center gap-1">
        JPS.DEV<span className="typing-cursor"></span>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        <nav className="flex gap-6">
          {['About', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[11px] font-bold tracking-[0.18em] uppercase font-mono opacity-50 hover:opacity-100 transition-opacity no-underline text-inherit"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/johnpaulserna95-alt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-inherit opacity-50 hover:opacity-100 transition-opacity"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>
          
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-[52px] h-[26px] rounded-full bg-[rgba(var(--accent-rgb),0.1)] border border-[rgba(var(--accent-rgb),0.2)] relative cursor-pointer flex items-center p-[3px]"
          >
            <motion.div
              animate={{ x: theme === 'dark' ? 26 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[11px] text-black"
            >
              {theme === 'dark' ? <Moon size={13} /> : <Sun size={13} />}
            </motion.div>
          </button>
        </div>
      </div>
    </header>
  );
}
