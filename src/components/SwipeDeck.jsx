import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowBackIosNewRounded from '@mui/icons-material/ArrowBackIosNewRounded';
import UndoRounded from '@mui/icons-material/UndoRounded';
import ThumbDownAltRounded from '@mui/icons-material/ThumbDownAltRounded';
import BookmarkBorderRounded from '@mui/icons-material/BookmarkBorderRounded';
import ThumbUpAltRounded from '@mui/icons-material/ThumbUpAltRounded';
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
  const progress = ((currentIndex + 1) / stories.length) * 100;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.default' }}>
      {/* Deck header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 2, pb: 1, zIndex: 10 }}>
        <IconButton onClick={onBack} size="small">
          <ArrowBackIosNewRounded fontSize="small" />
        </IconButton>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{deckTitle}</Typography>
          <Typography variant="caption">
            {currentIndex + 1} / {stories.length}
          </Typography>
        </Box>
        <IconButton onClick={handleUndo} size="small" disabled={currentIndex === 0}>
          <UndoRounded fontSize="small" />
        </IconButton>
      </Box>

      {/* Progress bar */}
      <Box sx={{ px: 2, mb: 1 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 4,
            borderRadius: 2,
            bgcolor: 'rgba(0,0,0,0.04)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 2,
              bgcolor: 'primary.main',
              transition: 'transform 0.5s ease',
            },
          }}
        />
      </Box>

      {/* Card stack */}
      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
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
      </Box>

      {/* Bottom action buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, py: 2, zIndex: 10 }}>
        <IconButton
          onClick={() => handleSwipe('left', stories[currentIndex])}
          sx={{
            width: 56,
            height: 56,
            bgcolor: 'background.paper',
            boxShadow: 2,
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': { bgcolor: 'error.50', borderColor: 'error.light' },
          }}
        >
          <ThumbDownAltRounded sx={{ color: 'text.secondary' }} />
        </IconButton>
        <IconButton
          onClick={() => handleSave(stories[currentIndex])}
          sx={{
            width: 48,
            height: 48,
            bgcolor: 'background.paper',
            boxShadow: 1,
            border: '1px solid',
            borderColor: 'divider',
            alignSelf: 'center',
            '&:hover': { bgcolor: 'primary.50', borderColor: 'primary.light' },
          }}
        >
          <BookmarkBorderRounded sx={{ color: 'text.secondary' }} />
        </IconButton>
        <IconButton
          onClick={() => handleSwipe('right', stories[currentIndex])}
          sx={{
            width: 56,
            height: 56,
            bgcolor: 'background.paper',
            boxShadow: 2,
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': { bgcolor: 'success.50', borderColor: 'success.light' },
          }}
        >
          <ThumbUpAltRounded sx={{ color: 'text.secondary' }} />
        </IconButton>
      </Box>
    </Box>
  );
}
