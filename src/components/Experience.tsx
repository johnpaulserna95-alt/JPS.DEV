import { motion } from 'motion/react';
import { Bug, Phone, Brain } from 'lucide-react';

const experiences = [
  {
    company: "Detail Online Technology Inc.",
    period: "FEB 2021 — MAY 2021",
    role: "Intern IT Specialist / Jr. Software Tester",
    description: "Contributed to quality assurance processes, delivered rigorous software testing methodologies, and improved system processes through systematic defect tracking and reporting.",
    icon: Bug,
    tags: ["Bug Tracking", "IT Support"]
  },
  {
    company: "Avis — Singapore Spa Account",
    period: "JUN 2021 — AUG 2022",
    role: "Cold Calling Representative",
    description: "Managed high-volume international client outreach, built professional communication skills in a fast-paced B2B environment, and consistently exceeded monthly call targets.",
    icon: Phone,
    tags: ["B2B Sales", "Cold Calling", "CRM", "Client Relations"]
  },
  {
    company: "Freelance AI Automation",
    period: "2022 — PRESENT",
    role: "AI Automation Specialist",
    description: "Building AI-powered workflows, automation pipelines, and intelligent systems that replace repetitive human labor. Specializing in LLM integrations, n8n/Make automations, and custom AI solutions.",
    icon: Brain,
    tags: ["n8n", "Zapier", "LLM APIs", "AI Agents"],
    isCurrent: true
  }
];

export default function Experience() {
  return (
    <section id="experience" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="font-mono text-[11px] text-primary font-bold tracking-[0.15em] uppercase">01 /</span>
        <h2 className="text-3xl font-extrabold tracking-[-0.03em]">Experience</h2>
      </motion.div>

      <div className="flex flex-col gap-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`glass glow rounded-[1.25rem] p-7 flex gap-6 transition-colors duration-300 hover:border-[rgba(var(--accent-rgb),0.3)] ${exp.isCurrent ? 'border-[rgba(var(--accent-rgb),0.25)] shadow-[0_0_40px_rgba(var(--accent-rgb),0.1)]' : ''}`}
          >
            <div className="shrink-0">
              <div className={`w-12 h-12 rounded-xl bg-[rgba(var(--accent-rgb),0.1)] border border-[rgba(var(--accent-rgb),0.2)] flex items-center justify-center ${exp.isCurrent ? 'bg-[rgba(var(--accent-rgb),0.15)] border-[rgba(var(--accent-rgb),0.3)]' : ''}`}>
                <exp.icon className="text-primary" size={22} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                <h3 className="font-extrabold text-[1.05rem] tracking-[-0.02em]">{exp.company}</h3>
                <span className="font-mono text-[10px] font-bold text-primary bg-[rgba(var(--accent-rgb),0.1)] px-2.5 py-1 rounded-md whitespace-nowrap flex items-center gap-1.5">
                  {exp.isCurrent && <span className="status-dot w-1.5 h-1.5 bg-primary rounded-full inline-block"></span>}
                  {exp.period}
                </span>
              </div>
              <p className="text-primary text-[12px] font-bold font-mono tracking-[0.05em] uppercase mb-3">{exp.role}</p>
              <p className="text-[0.9rem] opacity-60 leading-[1.7]">{exp.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.tags.map(tag => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
