import React, { useState } from 'react';
import { pageData } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, Tv, Download, Key, List, Trash2, Star, Gamepad2, PlayCircle
} from 'lucide-react';

// Map string identifiers from data.js to SVG components
const iconMap = {
  tv: Tv,
  download: Download,
  key: Key,
  list: List,
  trash: Trash2,
  star: Star,
  gamepad: Gamepad2,
};

const TipCard = ({ tip, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = iconMap[tip.icon] || PlayCircle;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg group cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-6 flex items-start gap-4">
        <div className="p-3 bg-slate-700/50 rounded-lg text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-300 ease-in-out">
          <IconComponent size={24} className="group-hover:animate-pulse" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-100 mb-2 flex justify-between items-center">
            {tip.title}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} className="text-slate-400" />
            </motion.div>
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {tip.description}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="px-6 pb-6 pt-0"
          >
            <div className="pt-4 border-t border-slate-700">
              <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">Instructions</h4>
              <ol className="list-decimal list-outside ml-4 space-y-2 text-slate-300">
                {tip.steps.map((step, idx) => (
                  <li key={idx} className="pl-2 leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-cyan-500/30">
      <header className="max-w-4xl mx-auto pt-20 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20"
        >
          <Tv size={16} />
          SkyMaxxTV Support
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {pageData.title}
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
          {pageData.intro}
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid gap-4">
          {pageData.tips.map((tip, index) => (
            <TipCard key={tip.id} tip={tip} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}