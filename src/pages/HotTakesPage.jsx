import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import WhatshotRounded from '@mui/icons-material/WhatshotRounded';
import SendRounded from '@mui/icons-material/SendRounded';
import ThumbUpAltRounded from '@mui/icons-material/ThumbUpAltRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded';
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
    >
      <Card sx={{ overflow: 'hidden' }}>
        {/* Prompt header */}
        <Box sx={{ bgcolor: 'grey.900', p: 2.5 }}>
          <Chip
            icon={<WhatshotRounded sx={{ fontSize: 14 }} />}
            label="Hot Take"
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.1)',
              color: 'primary.light',
              mb: 1.5,
              '& .MuiChip-icon': { color: 'primary.light' },
            }}
          />
          <Typography variant="h4" sx={{ color: 'white', lineHeight: 1.4 }}>
            {take.prompt}
          </Typography>
        </Box>

        {/* Responses */}
        <Box sx={{ p: 2 }}>
          <AnimatePresence>
            {take.responses.slice(0, expanded ? take.responses.length : 2).map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light', color: 'primary.dark', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                    A
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{r.text}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => setLiked((prev) => ({ ...prev, [i]: !prev[i] }))}
                        sx={{ color: liked[i] ? 'primary.main' : 'text.disabled', p: 0.5 }}
                      >
                        <ThumbUpAltRounded sx={{ fontSize: 14 }} />
                      </IconButton>
                      <Typography variant="caption">
                        {liked[i] ? r.likes + 1 : r.likes}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>

          {take.responses.length > 2 && (
            <Button
              size="small"
              onClick={() => setExpanded(!expanded)}
              endIcon={expanded ? <ExpandLessRounded /> : <ExpandMoreRounded />}
              sx={{ mt: 0.5, color: 'primary.main' }}
            >
              {expanded ? 'Show less' : `${take.responses.length - 2} more responses`}
            </Button>
          )}

          {/* Add response */}
          {showInput ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <Box sx={{ display: 'flex', gap: 1, mt: 1.5, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                <TextField
                  fullWidth
                  size="small"
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Drop your take..."
                  autoFocus
                />
                <IconButton color="primary" sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
                  <SendRounded fontSize="small" />
                </IconButton>
              </Box>
            </motion.div>
          ) : (
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setShowInput(true)}
              sx={{ mt: 1.5, borderStyle: 'dashed', color: 'text.secondary' }}
            >
              + Add your take
            </Button>
          )}
        </Box>
      </Card>
    </motion.div>
  );
}

export default function HotTakesPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
        <Typography variant="h2">Hot Takes</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Finish the sentence. No filter. Anonymous.
        </Typography>
      </Box>

      <Box sx={{ px: 2.5, pb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {hotTakePrompts.map((take, i) => (
          <HotTakeCard key={take.id} take={take} index={i} />
        ))}
      </Box>
    </Box>
  );
}
