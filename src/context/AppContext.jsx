import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [streak, setStreak] = useState(3);
  const [cardsSwipedToday, setCardsSwipedToday] = useState(0);
  const [savedStories, setSavedStories] = useState([]);
  const [showCelebration, setShowCelebration] = useState(null);

  const swipeCard = useCallback(() => {
    setCardsSwipedToday((prev) => {
      const next = prev + 1;
      // Duolingo-style micro-celebrations at milestones
      if (next === 5) setShowCelebration('🔥 5 swipes! You\'re warming up!');
      if (next === 10) setShowCelebration('⚡ 10 swipes! On fire!');
      if (next === 20) setShowCelebration('🏆 20 swipes! Legend status!');
      return next;
    });
  }, []);

  const saveStory = useCallback((story) => {
    setSavedStories((prev) => {
      if (prev.find((s) => s.id === story.id)) return prev;
      return [...prev, story];
    });
  }, []);

  const dismissCelebration = useCallback(() => {
    setShowCelebration(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        streak,
        setStreak,
        cardsSwipedToday,
        swipeCard,
        savedStories,
        saveStory,
        showCelebration,
        dismissCelebration,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
