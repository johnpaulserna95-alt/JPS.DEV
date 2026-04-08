import { motion } from 'motion/react';
import { Terminal, Mail, Github } from 'lucide-react';

export default function Hero() {
  return (
    <section id="about" className="pt-32 pb-16 flex flex-col items-center text-center">
      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative mb-10"
      >
        <div className="w-[140px] h-[140px] rounded-full overflow-hidden border-2 border-[rgba(var(--accent-rgb),0.3)] shadow-[0_0_40px_rgba(var(--accent-rgb),0.15)]">
          <img
            src="https://lh3.googleusercontent.com/aida/ADBb0ui7y7oWOKFSwI7ZJKeT1i_U_TSHb0DI--07L2HruXqVhIlR15yG8_sxY7KfJ_ilTQvUA1ujITBo_KbbzQuF2G7coLZOsspgg8RyDXlUr1FUac04FeWO1zPwC95e7ul-qPbEUNVXKXcDHbR9vNSDPPjYOvQfYclvdZXI8u06jwwHZfnU1eU18Xz6JzofdU2YHJkPmvnn6prgquhmyFBGe7IYXAcYYNzPCNleoICyN8EXrl1Mx_5cc7VHjQR2YM77yusQcRrRq0p-pg"
            alt="John Paul Serna"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-primary text-black text-[9px] font-black font-mono tracking-[0.15em] uppercase px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1.5">
          <span className="status-dot w-1.5 h-1.5 bg-black rounded-full inline-block"></span>
          AVAILABLE
        </div>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-7xl md:text-8xl font-black leading-[0.9] tracking-[-0.04em] mb-6"
      >
        John Paul<br /><span className="text-primary">Serna</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-base tracking-[0.25em] uppercase font-mono opacity-50 mb-6"
      >
        AI Automation Specialist · General Santos, PH
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
        className="max-w-[520px] text-lg leading-[1.7] opacity-65 mb-10"
      >
        BS IT background bridging human intent and machine efficiency. From software testing to AI automation — I build systems that work while you sleep.
      </motion.p>
      
      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex gap-4 flex-wrap justify-center"
      >
        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-black rounded-xl font-bold text-[13px] font-mono tracking-[0.05em] uppercase no-underline transition-all duration-300 shadow-[0_0_25px_rgba(var(--accent-rgb),0.3)] hover:opacity-85"
        >
          <Terminal size={18} /> View Projects
        </a>
        <a
          href="https://github.com/johnpaulserna95-alt"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 border border-[rgba(var(--accent-rgb),0.3)] rounded-xl font-bold text-[13px] font-mono tracking-[0.05em] uppercase no-underline text-inherit transition-all duration-300 hover:bg-[rgba(var(--accent-rgb),0.05)]"
        >
          <Github size={18} /> GitHub
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 border border-[rgba(var(--accent-rgb),0.3)] rounded-xl font-bold text-[13px] font-mono tracking-[0.05em] uppercase no-underline text-inherit transition-all duration-300 hover:bg-[rgba(var(--accent-rgb),0.05)]"
        >
          <Mail size={18} /> Get in Touch
        </a>
      </motion.div>
    </section>
  );
}
