import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useApp } from '../context/AppContext';

const confettiColors = ['#007AFF', '#34C759', '#FF9500', '#5856D6', '#FF3B30', '#FFCC00'];

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
    <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, rotate: 0, opacity: 1 }}
          animate={{ y: '100vh', rotate: p.rotation + 360, opacity: 0 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: 2,
            left: `${p.x}%`,
          }}
        />
      ))}
    </Box>
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
          onClick={dismissCelebration}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Confetti />
          <motion.div
            initial={{ scale: 0.5, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <Paper
              elevation={4}
              sx={{
                borderRadius: 5,
                px: 4,
                py: 3,
                textAlign: 'center',
                mx: 3,
                position: 'relative',
                zIndex: 10,
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <Typography sx={{ fontSize: '2rem', mb: 1 }}>🎉</Typography>
              </motion.div>
              <Typography variant="h5">{showCelebration}</Typography>
            </Paper>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
