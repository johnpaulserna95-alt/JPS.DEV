import { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform, AnimatePresence } from 'motion/react';

interface Splash {
  id: number;
  x: number;
  y: number;
}

export default function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [splashes, setSplashes] = useState<Splash[]>([]);

  // Velocity-based scaling for a more "reactive" feel
  const xVelocity = useVelocity(mouseX);
  const yVelocity = useVelocity(mouseY);
  
  // Calculate combined velocity
  const velocity = useMotionValue(0);
  useEffect(() => {
    const unsubscribeX = xVelocity.on("change", (v) => {
      const currentY = yVelocity.get();
      velocity.set(Math.sqrt(v * v + currentY * currentY));
    });
    return () => unsubscribeX();
  }, [xVelocity, yVelocity, velocity]);

  // Map velocity to scale and opacity
  const dynamicScale = useTransform(velocity, [0, 1000], [1, 1.3]);
  const dynamicOpacity = useTransform(velocity, [0, 1000], [1, 0.6]);

  // Silky spring configurations
  const springConfig = { damping: 45, stiffness: 90 }; // Main silky follow
  const trailConfig = { damping: 55, stiffness: 50 };  // Liquid trail
  const atmosphericConfig = { damping: 80, stiffness: 25 }; // Deep aura
  
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  const tx = useSpring(mouseX, trailConfig);
  const ty = useSpring(mouseY, trailConfig);

  const sx = useSpring(mouseX, atmosphericConfig);
  const sy = useSpring(mouseY, atmosphericConfig);

  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, isVisible]);

  const handleClick = useCallback((e: MouseEvent) => {
    const newSplash = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setSplashes((prev) => [...prev, newSplash]);
    
    // Remove splash after animation
    setTimeout(() => {
      setSplashes((prev) => prev.filter((s) => s.id !== newSplash.id));
    }, 1200);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [handleMouseMove, handleClick]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* 1. Deep Atmospheric Aura (The "Mood" layer) */}
      <motion.div
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 0.2 : 0,
          scale: isVisible ? 2 : 1.2,
        }}
        className="absolute w-[1200px] h-[1200px] blur-[200px] will-change-transform"
      >
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(var(--accent-rgb), 0.15) 0%, 
              rgba(var(--accent-rgb), 0.05) 40%, 
              transparent 80%
            )`,
          }}
        />
      </motion.div>

      {/* 2. Liquid Silk Trail (The "Depth" layer) */}
      <motion.div
        style={{
          x: tx,
          y: ty,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 0.4 : 0,
          scale: isVisible ? 1.2 : 0.9,
        }}
        className="absolute w-[800px] h-[800px] blur-[150px] filter saturate-[1.3] will-change-transform"
      >
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(var(--accent-rgb), 0.2) 0%, 
              rgba(124, 58, 237, 0.1) 35%, 
              rgba(59, 130, 246, 0.05) 60%, 
              transparent 85%
            )`,
          }}
        />
      </motion.div>

      {/* 3. Core Elegant Glow (The "Focus" layer) */}
      <motion.div
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          scale: dynamicScale,
          opacity: dynamicOpacity,
        }}
        animate={{
          opacity: isVisible ? 0.7 : 0,
        }}
        className="absolute w-[600px] h-[600px] blur-[100px] will-change-transform"
      >
        {/* Main core gradient */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(var(--accent-rgb), 0.4) 0%, 
              rgba(var(--accent-rgb), 0.2) 25%, 
              rgba(var(--accent-rgb), 0.05) 50%, 
              transparent 75%
            )`,
          }}
        />
        
        {/* High-end Texture/Noise Overlay */}
        <div 
          className="absolute inset-0 rounded-full opacity-[0.1] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ethereal Shimmer */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-[25%] rounded-full bg-white/10 blur-[60px] mix-blend-plus-lighter"
        />
      </motion.div>

      {/* 4. Click Splash Effects */}
      <AnimatePresence>
        {splashes.map((splash) => (
          <motion.div
            key={splash.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              left: splash.x,
              top: splash.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="absolute w-[400px] h-[400px] pointer-events-none"
          >
            {/* Splash Ripple */}
            <div 
              className="absolute inset-0 rounded-full blur-[50px]"
              style={{
                background: `radial-gradient(circle at center, 
                  rgba(var(--accent-rgb), 0.5) 0%, 
                  rgba(124, 58, 237, 0.3) 30%, 
                  transparent 70%
                )`,
              }}
            />
            {/* Secondary Splash Ring */}
            <motion.div 
              initial={{ scale: 0.4, opacity: 1 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 border border-[rgba(var(--accent-rgb),0.4)] rounded-full blur-[8px]"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
