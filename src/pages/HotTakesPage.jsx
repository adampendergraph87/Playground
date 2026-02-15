import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Send, ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react';
import { hotTakePrompts } from '../data/stories';

function HotTakeCard({ take, index }) {
  const [expanded, setExpanded] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [liked, setLiked] = useState({});

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-charcoal/5"
    >
      {/* Prompt header */}
      <div className="bg-gradient-to-r from-charcoal to-charcoal-light p-5">
        <div className="flex items-center gap-2 mb-2">
          <Flame size={14} className="text-brand-400" />
          <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Hot Take</span>
        </div>
        <p className="text-white text-lg font-bold leading-snug">{take.prompt}</p>
      </div>

      {/* Responses */}
      <div className="p-4">
        <AnimatePresence>
          {take.responses.slice(0, expanded ? take.responses.length : 2).map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-3 py-3 border-b border-charcoal/5 last:border-0"
            >
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-600 shrink-0">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-charcoal leading-relaxed">{r.text}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => setLiked((prev) => ({ ...prev, [i]: !prev[i] }))}
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      liked[i] ? 'text-brand-500' : 'text-charcoal/35 hover:text-charcoal/60'
                    }`}
                  >
                    <ThumbsUp size={12} />
                    <span>{liked[i] ? r.likes + 1 : r.likes}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {take.responses.length > 2 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-brand-500 font-medium mt-2 hover:text-brand-600 transition-colors"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? 'Show less' : `${take.responses.length - 2} more responses`}
          </button>
        )}

        {/* Add response */}
        {showInput ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex gap-2 mt-3 pt-3 border-t border-charcoal/5"
          >
            <input
              type="text"
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Drop your take..."
              className="flex-1 px-4 py-2.5 bg-cream rounded-xl text-sm text-charcoal placeholder:text-charcoal/30 outline-none focus:ring-2 focus:ring-brand-300 transition-all"
              autoFocus
            />
            <button className="p-2.5 bg-brand-500 rounded-xl text-white hover:bg-brand-600 transition-colors active:scale-95">
              <Send size={16} />
            </button>
          </motion.div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="w-full mt-3 py-2.5 rounded-xl border-2 border-dashed border-charcoal/10 text-sm text-charcoal/40 font-medium hover:border-brand-300 hover:text-brand-500 transition-all"
          >
            + Add your take
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function HotTakesPage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-charcoal">Hot Takes</h1>
        <p className="text-sm text-charcoal/50 mt-1">
          Finish the sentence. No filter. Anonymous.
        </p>
      </div>

      <div className="px-5 pb-6 flex flex-col gap-4">
        {hotTakePrompts.map((take, i) => (
          <HotTakeCard key={take.id} take={take} index={i} />
        ))}
      </div>
    </div>
  );
}
