import { useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import WhatshotRounded from '@mui/icons-material/WhatshotRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import { useApp } from '../context/AppContext';
import { dailyDecks, stories } from '../data/stories';
import SwipeDeck from '../components/SwipeDeck';

function DeckCard({ deck, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card>
        <CardActionArea onClick={onClick} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              variant="rounded"
              sx={{
                width: 48,
                height: 48,
                bgcolor: 'primary.light',
                color: 'primary.dark',
                fontSize: '1.5rem',
                borderRadius: 3,
              }}
            >
              {deck.emoji}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {deck.title}
              </Typography>
              <Typography variant="caption">
                {deck.cardCount} stories · {deck.subtitle}
              </Typography>
            </Box>
            <ChevronRightRounded sx={{ color: 'text.disabled' }} />
          </Box>
        </CardActionArea>
      </Card>
    </motion.div>
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

  const progressPct = Math.min(100, (cardsSwipedToday / 20) * 100);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Box>
            <Typography variant="h2">SwipeLife</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              What's making everyone laugh today
            </Typography>
          </Box>
          <Chip
            icon={<WhatshotRounded sx={{ fontSize: 16 }} />}
            label={streak}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>
      </Box>

      {/* Daily stats banner */}
      <Box sx={{ px: 2.5, mb: 2.5 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card sx={{ bgcolor: 'grey.900', color: 'white', border: 'none' }}>
            <Box sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <AutoAwesomeRounded sx={{ fontSize: 16, color: 'primary.light' }} />
                <Typography variant="overline" sx={{ color: 'primary.light' }}>
                  Today's Progress
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                <Box>
                  <Typography sx={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>
                    {cardsSwipedToday}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    stories swiped
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, mb: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progressPct}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'primary.light',
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', mb: 1 }}>
                  / 20
                </Typography>
              </Box>
            </Box>
          </Card>
        </motion.div>
      </Box>

      {/* Daily Decks */}
      <Box sx={{ px: 2.5, mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1.5 }}>Daily Decks</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {dailyDecks.map((deck, i) => (
            <DeckCard key={deck.id} deck={deck} index={i} onClick={() => setActiveDeck(deck)} />
          ))}
        </Box>
      </Box>

      {/* Trending section */}
      <Box sx={{ px: 2.5, pb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1.5 }}>Trending Stories</Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            overflowX: 'auto',
            pb: 1,
            mx: -2.5,
            px: 2.5,
            scrollSnapType: 'x mandatory',
          }}
        >
          {stories.slice(0, 4).map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ minWidth: 260, flexShrink: 0, scrollSnapAlign: 'start' }}
            >
              <Card sx={{ height: '100%' }}>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: 12, fontWeight: 700 }}>
                      {story.author[0]}
                    </Avatar>
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {story.author}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      color: 'text.primary',
                    }}
                  >
                    {story.content}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5 }}>
                    <Typography variant="caption">
                      {(story.reactions.laugh / 1000).toFixed(1)}k laughs
                    </Typography>
                    <Typography variant="caption">
                      {(story.reactions.same / 1000).toFixed(1)}k same
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
