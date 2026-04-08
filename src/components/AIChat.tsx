import { useState, useRef, useEffect } from 'react';
import { Brain, ArrowUp, Loader2 } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { askGeminiProxy } from '../services/chatService';

export default function AIChat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [hidden, setHidden] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const query = input.trim();
    setInput('');
    setLoading(true);
    setShowResponse(true);
    setResponse(null);

    const result = await askGeminiProxy(query);
    if (result.includes("GEMINI_API_KEY is missing")) {
      setResponse("⚠️ API Key Missing: Please add GEMINI_API_KEY to the Secrets panel in AI Studio to enable the chat feature.");
    } else {
      setResponse(result);
    }
    setLoading(false);

    // Auto hide after 12 seconds
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowResponse(false);
    }, 12000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <motion.div
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: 100, opacity: 0 },
      }}
      animate={hidden && !showResponse && !loading ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed bottom-0 left-0 right-0 p-5 z-50 pointer-events-none"
    >
      <div className="max-w-[900px] mx-auto pointer-events-auto relative">
        <AnimatePresence>
          {showResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-3"
            >
              <div className="glass rounded-2xl p-4 md:p-5 max-w-[700px] text-[0.9rem] leading-[1.65] border-l-[3px] border-primary shadow-2xl">
                <div className="flex items-center gap-2 mb-2.5 opacity-50 text-[11px] font-mono uppercase tracking-[0.12em]">
                  <Brain size={14} /> JPS·AI
                </div>
                {loading ? (
                  <div className="flex gap-1.5 items-center">
                    <span className="dot w-1.5 h-1.5 bg-primary rounded-full inline-block"></span>
                    <span className="dot w-1.5 h-1.5 bg-primary rounded-full inline-block"></span>
                    <span className="dot w-1.5 h-1.5 bg-primary rounded-full inline-block"></span>
                  </div>
                ) : (
                  <p>{response}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass glow-strong rounded-[1.5rem] flex items-center p-2 pl-5 gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <Brain size={22} className="opacity-40 text-primary shrink-0" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about John..."
            className="flex-1 bg-transparent border-none text-inherit text-[0.95rem] font-sans py-3 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-primary text-black p-2.5 rounded-2xl border-none cursor-pointer flex items-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <ArrowUp size={20} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
