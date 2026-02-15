import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, Share2, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DeckComplete({ deckTitle, count, onBack }) {
  const { streak, cardsSwipedToday } = useApp();

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-cream to-brand-50 px-6">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
        className="mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-xl">
          <Trophy size={40} className="text-white" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-charcoal mb-2"
      >
        Deck Complete!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-charcoal/60 text-center mb-8"
      >
        You swiped through all {count} stories in {deckTitle}
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-6 mb-10"
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-brand-500">
            <Flame size={20} />
            <span className="text-2xl font-bold">{streak}</span>
          </div>
          <p className="text-xs text-charcoal/50 mt-1">Day streak</p>
        </div>
        <div className="w-px bg-charcoal/10" />
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-brand-500">{cardsSwipedToday}</span>
          <p className="text-xs text-charcoal/50 mt-1">Today</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex gap-3"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal text-white font-semibold text-sm hover:bg-charcoal-light transition-colors active:scale-95"
        >
          <ArrowLeft size={16} />
          More Decks
        </button>
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-charcoal font-semibold text-sm border border-charcoal/10 hover:bg-brand-50 transition-colors active:scale-95"
        >
          <Share2 size={16} />
          Share
        </button>
      </motion.div>
    </div>
  );
}
