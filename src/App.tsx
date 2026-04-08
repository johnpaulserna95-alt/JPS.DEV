/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeProvider } from './lib/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        <CursorGlow />
        <Navbar />
        
        <main className="relative z-[2] max-w-[900px] mx-auto px-6 pb-48">
          <Hero />
          
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(var(--accent-rgb),0.3)] to-transparent my-16" />
          
          <Experience />
          
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(var(--accent-rgb),0.3)] to-transparent my-16" />
          
          <Projects />
          
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(var(--accent-rgb),0.3)] to-transparent my-16" />
          
          <Contact />
        </main>
        
        <AIChat />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
