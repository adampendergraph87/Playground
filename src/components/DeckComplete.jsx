import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import ShareRounded from '@mui/icons-material/ShareRounded';
import WhatshotRounded from '@mui/icons-material/WhatshotRounded';
import { useApp } from '../context/AppContext';

export default function DeckComplete({ deckTitle, count, onBack }) {
  const { streak, cardsSwipedToday } = useApp();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        bgcolor: 'background.default',
        px: 3,
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
        style={{ marginBottom: 24 }}
      >
        <Avatar sx={{ width: 96, height: 96, bgcolor: 'primary.main', boxShadow: 3 }}>
          <EmojiEventsRounded sx={{ fontSize: 40 }} />
        </Avatar>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Typography variant="h2" sx={{ mb: 1, textAlign: 'center' }}>Deck Complete!</Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
          You swiped through all {count} stories in {deckTitle}
        </Typography>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginBottom: 40 }}
      >
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}>
              <WhatshotRounded fontSize="small" />
              <Typography variant="h3">{streak}</Typography>
            </Box>
            <Typography variant="caption">Day streak</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h3" color="primary.main">{cardsSwipedToday}</Typography>
            <Typography variant="caption">Today</Typography>
          </Box>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackRounded />}
            onClick={onBack}
            sx={{ borderRadius: '999px' }}
          >
            More Decks
          </Button>
          <Button
            variant="outlined"
            startIcon={<ShareRounded />}
            sx={{ borderRadius: '999px' }}
          >
            Share
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
