import { motion } from 'motion/react';
import { Mail, Github, MapPin, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    const subject = encodeURIComponent(`Portfolio Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    // Direct Gmail compose link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=johnpaulserna95@gmail.com&su=${subject}&body=${body}`;
    
    // Fallback to mailto if they prefer a client, but user specifically asked for gmail.com
    window.open(gmailUrl, '_blank');
    
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="font-mono text-[11px] text-primary font-bold tracking-[0.15em] uppercase">04 /</span>
        <h2 className="text-3xl font-extrabold tracking-[-0.03em]">Get in Touch</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="glass glow rounded-[1.25rem] p-8"
        >
          <h3 className="text-[1.3rem] font-extrabold tracking-[-0.03em] mb-3">Let's build something together</h3>
          <p className="opacity-60 text-[0.9rem] leading-[1.7] mb-7">
            Open for freelance AI automation projects, workflow consulting, and interesting collabs. Based in General Santos City, PH — working globally.
          </p>
          <div className="flex flex-col gap-4">
            <a href="mailto:johnpaulserna95@gmail.com" className="flex items-center gap-3 text-[0.9rem] opacity-70 hover:text-primary hover:translate-x-1 transition-all no-underline text-inherit">
              <Mail size={20} className="text-primary" />
              johnpaulserna95@gmail.com
            </a>
          
            <a 
              href="https://github.com/johnpaulserna95-alt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[0.9rem] opacity-70 hover:text-primary hover:translate-x-1 transition-all no-underline text-inherit"
            >
              <Github size={20} className="text-primary" />
              github.com/johnpaulserna95-alt
            </a>
            <div className="flex items-center gap-3 text-[0.9rem] opacity-70">
              <MapPin size={20} className="text-primary" />
              General Santos City, Philippines
            </div>
          </div>
        </motion.div>

        {/* Quick message */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="glass rounded-[1.25rem] p-8 flex flex-col gap-4"
        >
          <p className="text-[11px] font-mono font-bold tracking-[0.15em] text-primary uppercase">Quick Message</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              placeholder="Your name"
              required
              className="w-full bg-[rgba(var(--accent-rgb),0.04)] border border-[rgba(var(--accent-rgb),0.12)] rounded-[0.6rem] px-4 py-3 text-[0.9rem] text-inherit outline-none font-sans transition-all focus:border-[rgba(var(--accent-rgb),0.4)]"
              type="text"
            />
            <input
              name="email"
              placeholder="Your email"
              required
              className="w-full bg-[rgba(var(--accent-rgb),0.04)] border border-[rgba(var(--accent-rgb),0.12)] rounded-[0.6rem] px-4 py-3 text-[0.9rem] text-inherit outline-none font-sans transition-all focus:border-[rgba(var(--accent-rgb),0.4)]"
              type="email"
            />
            <textarea
              name="message"
              placeholder="What's on your mind?"
              required
              rows={3}
              className="w-full bg-[rgba(var(--accent-rgb),0.04)] border border-[rgba(var(--accent-rgb),0.12)] rounded-[0.6rem] px-4 py-3 text-[0.9rem] text-inherit outline-none resize-none font-sans transition-all focus:border-[rgba(var(--accent-rgb),0.4)]"
            ></textarea>
            <button
              type="submit"
              className="w-full p-3.5 bg-primary text-black rounded-[0.6rem] font-extrabold text-[13px] font-mono tracking-[0.05em] cursor-pointer border-none transition-opacity hover:opacity-85 flex items-center justify-center gap-2"
            >
              <Send size={18} /> SEND MESSAGE
            </button>
          </form>
          {sent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-[12px] font-mono text-primary p-2"
            >
              ✓ Message sent! I'll reply soon.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
