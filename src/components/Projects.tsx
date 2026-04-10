import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Layout, Bot, X, LucideIcon } from 'lucide-react';
import React, { useState } from 'react';

interface Project {
  title: string;
  description: string;
  image?: string;
  floatImage?: string;
  repoUrl?: string;
  category: string;
  tags: string[];
  metric: string;
  icon: LucideIcon;
  gradient?: string;
}

const projects: Project[] = [
  {
    title: "AI-Native Portfolio",
    description: "Liquid-glass aesthetics with chat-style UI, dark/light mode, kinetic interactions, and fluid mouse gradients. Built with vanilla HTML/CSS/JS.",
    image: "/my-project.png",
    floatImage: "https://opengraph.githubassets.com/1/johnpaulserna95-alt/My-Porfolio",
    repoUrl: "https://github.com/johnpaulserna95-alt/My-Porfolio",
    category: "PORTFOLIO",
    tags: ["STITCH.GOOGLE + CLAUDE CODE + AI STUDIO"],
    metric: "95% PERF",
    icon: Layout
  },
  {
    title: "Real-Time Data Dashboard",
    description: "Complex architectural system dashboards with real-time data streaming, live metrics, and automated alerting pipelines.",
    image: "/my-project1.png",
    floatImage: "https://opengraph.githubassets.com/1/johnpaulserna95-alt/My-Porfolio",
    repoUrl: "https://github.com/johnpaulserna95-alt/My-Porfolio",
    category: "DASHBOARD",
    tags: ["STITCH.GOOGLE + CLAUDE CODE + AI STUDIO"],
    metric: "100% AUTO",
    icon: Terminal
  },
  {
    title: "AI Lead Generation Bot",
    description: "Automated outreach agent combining cold calling expertise with AI personalization. Scrapes, qualifies, and messages prospects autonomously.",
    category: "AI AGENT",
    tags: ["OpenAI", "n8n"],
    metric: "POWERED BY CLAUDE CODE",
    icon: Bot,
    gradient: "linear-gradient(135deg,rgba(124,58,237,0.15),rgba(var(--accent-rgb),0.1))"
  }
];

export default function Projects() {
  const [floatingIndex, setFloatingIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const toggleFloat = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setFloatingIndex(floatingIndex === index ? null : index);
  };

  const openModal = (image: string | undefined) => {
    if (image) setSelectedImage(image);
  };

  return (
    <section id="projects" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="font-mono text-[11px] text-primary font-bold tracking-[0.15em] uppercase">02 /</span>
        <h2 className="text-3xl font-extrabold tracking-[-0.03em]">Featured Projects</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={floatingIndex === index ? {
              y: [0, -15, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            } : { y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => openModal(project.floatImage || project.image)}
            className={`glass glow rounded-[1.25rem] overflow-hidden group transition-all duration-400 cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(var(--accent-rgb),0.12)] ${floatingIndex === index ? 'shadow-[0_30px_70px_rgba(var(--accent-rgb),0.2)]' : ''}`}
          >
            <div className="h-[190px] overflow-hidden relative bg-[rgba(var(--accent-rgb),0.05)]" style={project.gradient ? { background: project.gradient } : {}}>
              {(project.image || project.floatImage) && !imageErrors[index] ? (
                <motion.img
                  key={floatingIndex === index ? 'floating' : 'static'}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  src={floatingIndex === index && project.floatImage ? project.floatImage : project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 block"
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-15 text-primary">
                  <project.icon size={72} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <button 
                  onClick={(e) => toggleFloat(e, index)}
                  className={`chip font-bold tracking-[0.05em] transition-all duration-300 ${floatingIndex === index ? 'bg-primary text-black border-transparent scale-110' : 'bg-primary text-black border-transparent hover:scale-105'}`}
                >
                  {project.category}
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-extrabold text-[1.1rem] tracking-[-0.02em] mb-2">{project.title}</h3>
              <p className="text-[0.875rem] opacity-60 leading-[1.65] mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] font-bold font-mono text-primary hover:underline flex items-center gap-1"
                    >
                      VIEW CODE
                    </a>
                  )}
                  <span className="font-mono text-[10px] font-bold text-primary">{project.metric}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pop-up Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage}
                alt="Project Preview"
                className="w-full h-full object-contain rounded-xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
