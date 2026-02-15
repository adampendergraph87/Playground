import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const confettiColors = ['#FB923C', '#FF6B6B', '#A8D5BA', '#C4B5FD', '#7DD3FC', '#FCD34D'];

function Confetti() {
  const pieces = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.3,
    duration: 1 + Math.random() * 1,
    color: confettiColors[i % confettiColors.length],
    size: 6 + Math.random() * 6,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, rotate: 0, opacity: 1 }}
          animate={{ y: '100vh', rotate: p.rotation + 360, opacity: 0 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          className="absolute rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: `${p.x}%`,
          }}
        />
      ))}
    </div>
  );
}

export default function CelebrationOverlay() {
  const { showCelebration, dismissCelebration } = useApp();

  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(dismissCelebration, 2500);
      return () => clearTimeout(timer);
    }
  }, [showCelebration, dismissCelebration]);

  return (
    <AnimatePresence>
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={dismissCelebration}
        >
          <Confetti />
          <motion.div
            initial={{ scale: 0.5, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="bg-white rounded-3xl px-8 py-6 shadow-2xl text-center mx-6 relative z-10"
          >
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-3xl mb-2"
            >
              🎉
            </motion.p>
            <p className="text-lg font-bold text-charcoal">{showCelebration}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
