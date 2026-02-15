import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import SwipeCard from './SwipeCard';
import DeckComplete from './DeckComplete';
import { useApp } from '../context/AppContext';

export default function SwipeDeck({ stories, deckTitle, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { swipeCard, saveStory } = useApp();

  const handleSwipe = useCallback(
    (dir, story) => {
      swipeCard();
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 200);
    },
    [swipeCard]
  );

  const handleSave = useCallback(
    (story) => {
      saveStory(story);
    },
    [saveStory]
  );

  const handleUndo = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  if (currentIndex >= stories.length) {
    return <DeckComplete deckTitle={deckTitle} count={stories.length} onBack={onBack} />;
  }

  const visibleCards = stories.slice(currentIndex, currentIndex + 3).reverse();

  return (
    <div className="flex flex-col h-full bg-cream">
      {/* Deck header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 z-10">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-white/60 transition-colors"
        >
          <ArrowLeft size={22} className="text-charcoal" />
        </button>
        <div className="text-center">
          <h2 className="font-bold text-charcoal text-sm">{deckTitle}</h2>
          <p className="text-xs text-charcoal/50">
            {currentIndex + 1} / {stories.length}
          </p>
        </div>
        <button
          onClick={handleUndo}
          className="p-2 rounded-full hover:bg-white/60 transition-colors"
          disabled={currentIndex === 0}
        >
          <RotateCcw size={18} className={currentIndex === 0 ? 'text-charcoal/20' : 'text-charcoal/60'} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-4 mb-2">
        <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / stories.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card stack */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence>
          {visibleCards.map((story, i) => {
            const isTop = i === visibleCards.length - 1;
            const stackIndex = visibleCards.length - 1 - i;
            return (
              <SwipeCard
                key={story.id}
                story={story}
                isTop={isTop}
                onSwipe={handleSwipe}
                onSave={handleSave}
                style={{
                  scale: 1 - stackIndex * 0.04,
                  y: stackIndex * 8,
                  zIndex: visibleCards.length - stackIndex,
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Bottom action buttons */}
      <div className="flex justify-center gap-6 py-4 z-10">
        <button
          onClick={() => handleSwipe('left', stories[currentIndex])}
          className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-50 transition-colors active:scale-90 border border-gray-100"
        >
          <span className="text-2xl">👎</span>
        </button>
        <button
          onClick={() => { handleSave(stories[currentIndex]); }}
          className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors active:scale-90 border border-gray-100 self-center"
        >
          <span className="text-lg">🔖</span>
        </button>
        <button
          onClick={() => handleSwipe('right', stories[currentIndex])}
          className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-green-50 transition-colors active:scale-90 border border-gray-100"
        >
          <span className="text-2xl">😂</span>
        </button>
      </div>
    </div>
  );
}
