import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { dailyDecks, stories } from '../data/stories';
import SwipeDeck from '../components/SwipeDeck';

function DeckCard({ deck, onClick, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-4 shadow-sm border border-charcoal/5 hover:shadow-md transition-all active:scale-[0.98] text-left"
    >
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${deck.color} flex items-center justify-center text-2xl shadow-sm`}>
          {deck.emoji}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-charcoal text-base">{deck.title}</h3>
          <p className="text-xs text-charcoal/50 mt-0.5">
            {deck.cardCount} stories · {deck.subtitle}
          </p>
        </div>
        <ChevronRight size={18} className="text-charcoal/30" />
      </div>
    </motion.button>
  );
}

export default function HomePage() {
  const { streak, cardsSwipedToday } = useApp();
  const [activeDeck, setActiveDeck] = useState(null);

  if (activeDeck) {
    const deckStories = stories.filter((s) => s.category === activeDeck.id);
    return (
      <SwipeDeck
        stories={deckStories.length > 0 ? deckStories : stories.slice(0, activeDeck.cardCount)}
        deckTitle={activeDeck.title}
        onBack={() => setActiveDeck(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-2xl font-bold text-charcoal">SwipeLife</h1>
            <p className="text-sm text-charcoal/50 mt-0.5">What's making everyone laugh today</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 rounded-full border border-brand-200">
            <Flame size={16} className="text-brand-500" />
            <span className="text-sm font-bold text-brand-600">{streak}</span>
          </div>
        </div>
      </div>

      {/* Daily stats banner */}
      <div className="px-5 mb-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-charcoal to-charcoal-light rounded-2xl p-4 text-white shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-brand-300" />
            <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider">
              Today's Progress
            </span>
          </div>
          <div className="flex items-end gap-4">
            <div>
              <p className="text-3xl font-bold">{cardsSwipedToday}</p>
              <p className="text-xs text-white/50 mt-0.5">stories swiped</p>
            </div>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-400 to-brand-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (cardsSwipedToday / 20) * 100)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-white/40 mb-2">/ 20</p>
          </div>
        </motion.div>
      </div>

      {/* Daily Decks */}
      <div className="px-5 mb-4">
        <h2 className="text-sm font-semibold text-charcoal/60 uppercase tracking-wider mb-3">
          Daily Decks
        </h2>
        <div className="flex flex-col gap-3">
          {dailyDecks.map((deck, i) => (
            <DeckCard key={deck.id} deck={deck} index={i} onClick={() => setActiveDeck(deck)} />
          ))}
        </div>
      </div>

      {/* Trending section */}
      <div className="px-5 pb-6">
        <h2 className="text-sm font-semibold text-charcoal/60 uppercase tracking-wider mb-3">
          Trending Stories
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x">
          {stories.slice(0, 4).map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[260px] snap-start bg-white rounded-2xl p-4 shadow-sm border border-charcoal/5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold">
                  {story.author[0]}
                </div>
                <span className="text-xs font-medium text-charcoal/60">{story.author}</span>
              </div>
              <p className="text-sm text-charcoal leading-relaxed line-clamp-3">{story.content}</p>
              <div className="flex gap-2 mt-3">
                <span className="text-xs text-charcoal/40">😂 {(story.reactions.laugh / 1000).toFixed(1)}k</span>
                <span className="text-xs text-charcoal/40">💯 {(story.reactions.same / 1000).toFixed(1)}k</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
