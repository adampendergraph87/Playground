import { useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import MicRounded from '@mui/icons-material/MicRounded';
import MicOffRounded from '@mui/icons-material/MicOffRounded';
import SendRounded from '@mui/icons-material/SendRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import KeyboardRounded from '@mui/icons-material/KeyboardRounded';

const recentConfessions = [
  { id: 1, duration: '0:34', text: 'I told my kid vegetables are "dinosaur food" and now he only eats broccoli...', plays: 1234, timeAgo: '2h' },
  { id: 2, duration: '1:12', text: 'My biggest secret? I sit in the car for 10 min after getting home just for silence...', plays: 3456, timeAgo: '4h' },
  { id: 3, duration: '0:48', text: "I pretend the WiFi is broken so my kids will go outside. I'm watching Netflix...", plays: 5678, timeAgo: '6h' },
];

function WaveformVisualizer({ active }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', height: 64 }}>
      {Array.from({ length: 32 }).map((_, i) => (
        <motion.div
          key={i}
          style={{ width: 3, borderRadius: 2, backgroundColor: '#4DA3FF' }}
          animate={
            active
              ? { height: [4, Math.random() * 40 + 8, 4] }
              : { height: 4 }
          }
          transition={
            active
              ? { duration: 0.4 + Math.random() * 0.4, repeat: Infinity, repeatType: 'reverse', delay: i * 0.02 }
              : { duration: 0.3 }
          }
        />
      ))}
    </Box>
  );
}

function ConfessionCard({ confession, index }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          <IconButton
            onClick={() => setPlaying(!playing)}
            sx={{
              width: 40,
              height: 40,
              bgcolor: playing ? 'primary.main' : 'primary.light',
              color: playing ? 'white' : 'primary.dark',
              '&:hover': { bgcolor: playing ? 'primary.dark' : 'primary.main', color: 'white' },
              flexShrink: 0,
            }}
          >
            {playing ? <PauseRounded fontSize="small" /> : <PlayArrowRounded fontSize="small" />}
          </IconButton>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.5 }}>
              &ldquo;{confession.text}&rdquo;
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Typography variant="caption">{confession.duration}</Typography>
              <Typography variant="caption">{confession.plays.toLocaleString()} plays</Typography>
              <Typography variant="caption">{confession.timeAgo} ago</Typography>
            </Box>
            {playing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px', mt: 1 }}>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                      key={i}
                      style={{ width: 3, borderRadius: 2, backgroundColor: '#4DA3FF' }}
                      animate={{ height: [3, Math.random() * 14 + 3, 3] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.03 }}
                    />
                  ))}
                </Box>
              </motion.div>
            )}
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
}

export default function ConfessPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [mode, setMode] = useState('voice');
  const [textInput, setTextInput] = useState('');

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecording(true);
    } else {
      setIsRecording(true);
      setHasRecording(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
        <Typography variant="h2">Audio Confessionals</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Share your story. Completely anonymous.
        </Typography>
      </Box>

      {/* Recording area */}
      <Box sx={{ px: 2.5, mb: 3 }}>
        <Card sx={{ bgcolor: 'grey.900', color: 'white', border: 'none' }}>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            {/* Mode toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
              <Button
                startIcon={<MicRounded />}
                onClick={() => setMode('voice')}
                variant={mode === 'voice' ? 'contained' : 'text'}
                size="small"
                sx={{
                  borderRadius: '999px',
                  ...(mode !== 'voice' && { color: 'rgba(255,255,255,0.6)' }),
                }}
              >
                Voice
              </Button>
              <Button
                startIcon={<KeyboardRounded />}
                onClick={() => setMode('text')}
                variant={mode === 'text' ? 'contained' : 'text'}
                size="small"
                sx={{
                  borderRadius: '999px',
                  ...(mode !== 'text' && { color: 'rgba(255,255,255,0.6)' }),
                }}
              >
                Text
              </Button>
            </Box>

            {mode === 'voice' ? (
              <>
                <WaveformVisualizer active={isRecording} />

                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 2.5, mt: 1.5 }}>
                  {isRecording
                    ? 'Recording... tap to stop'
                    : hasRecording
                    ? 'Recording saved! Send or redo?'
                    : 'Tap to start recording your confession'}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  {hasRecording && (
                    <IconButton
                      onClick={() => setHasRecording(false)}
                      sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
                    >
                      <DeleteRounded />
                    </IconButton>
                  )}

                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Fab
                      onClick={handleRecord}
                      color={isRecording ? 'error' : 'primary'}
                      sx={{
                        width: 64,
                        height: 64,
                        ...(isRecording && {
                          animation: 'pulse 1.5s infinite',
                          '@keyframes pulse': {
                            '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,59,48,0.4)' },
                            '50%': { boxShadow: '0 0 0 12px rgba(255,59,48,0)' },
                          },
                        }),
                      }}
                    >
                      {isRecording ? <MicOffRounded sx={{ fontSize: 28 }} /> : <MicRounded sx={{ fontSize: 28 }} />}
                    </Fab>
                  </motion.div>

                  {hasRecording && (
                    <IconButton
                      sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
                    >
                      <SendRounded />
                    </IconButton>
                  )}
                </Box>
              </>
            ) : (
              <Box sx={{ textAlign: 'left' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Share your confession anonymously..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&.Mui-focused fieldset': { borderColor: 'primary.light' },
                    },
                    '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.3)' },
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                    {textInput.length} / 280
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<SendRounded />}
                    size="small"
                    sx={{ borderRadius: '999px' }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Card>
      </Box>

      {/* Recent confessions */}
      <Box sx={{ px: 2.5, pb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1.5 }}>Recent Confessions</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {recentConfessions.map((c, i) => (
            <ConfessionCard key={c.id} confession={c} index={i} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
