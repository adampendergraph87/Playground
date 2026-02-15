import { useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PeopleRounded from '@mui/icons-material/PeopleRounded';
import FavoriteRounded from '@mui/icons-material/FavoriteRounded';
import BoltRounded from '@mui/icons-material/BoltRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import LockRounded from '@mui/icons-material/LockRounded';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import { couplesChallenges } from '../data/stories';

function ChallengeCard({ challenge, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card>
        <CardActionArea sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              variant="rounded"
              sx={{ width: 48, height: 48, bgcolor: 'secondary.light', color: 'secondary.dark', fontSize: '1.25rem', borderRadius: 3 }}
            >
              {challenge.emoji}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{challenge.title}</Typography>
              <Typography variant="caption">{challenge.description}</Typography>
            </Box>
            <ArrowForwardRounded sx={{ color: 'text.disabled', fontSize: 20 }} />
          </Box>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}

export default function CouplesPage() {
  const [linked, setLinked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inviteCode] = useState('SWIPE-' + Math.random().toString(36).substring(2, 7).toUpperCase());

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
        <Typography variant="h2">Couples Mode</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Laugh together. See how your humor aligns.
        </Typography>
      </Box>

      {!linked ? (
        <Box sx={{ px: 2.5, pb: 3 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card sx={{ textAlign: 'center' }}>
              <Box sx={{ p: 3 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>
                  <PeopleRounded sx={{ fontSize: 28 }} />
                </Avatar>
                <Typography variant="h3" sx={{ mb: 1 }}>Link Your Partner</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Share the code below or scan each other's QR codes to start laughing together
                </Typography>

                {/* Invite code */}
                <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                    Your invite code
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                    <Typography
                      sx={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.1em' }}
                    >
                      {inviteCode}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={handleCopy}
                      sx={{ color: copied ? 'success.main' : 'text.secondary' }}
                    >
                      {copied ? <CheckRounded fontSize="small" /> : <ContentCopyRounded fontSize="small" />}
                    </IconButton>
                  </Box>
                </Card>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => setLinked(true)}
                >
                  Link Partner
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center', mt: 2 }}>
                  <LockRounded sx={{ fontSize: 14, color: 'text.disabled' }} />
                  <Typography variant="caption">Private & anonymous — only humor is shared</Typography>
                </Box>
              </Box>
            </Card>
          </motion.div>
        </Box>
      ) : (
        <Box sx={{ px: 2.5, pb: 3 }}>
          {/* Compatibility score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card sx={{ bgcolor: 'grey.900', color: 'white', mb: 3, border: 'none' }}>
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1.5 }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main', fontWeight: 700 }}>Y</Avatar>
                  <FavoriteRounded sx={{ color: 'error.main', fontSize: 20 }} />
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'secondary.main', fontWeight: 700 }}>P</Avatar>
                </Box>
                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  Humor Compatibility
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                  <BoltRounded sx={{ color: 'primary.light', fontSize: 24 }} />
                  <Typography sx={{ fontSize: '2.5rem', fontWeight: 700 }}>78%</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                  Based on 23 shared swipes
                </Typography>

                {/* Taste breakdown */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3 }}>
                  {[
                    { label: 'Dad Jokes', pct: 92 },
                    { label: 'Dark Humor', pct: 45 },
                    { label: 'Wholesome', pct: 88 },
                  ].map((t) => (
                    <Box key={t.label} sx={{ textAlign: 'center' }}>
                      <Box sx={{ position: 'relative', width: 48, height: 48, mx: 'auto', mb: 0.5 }}>
                        <svg width="48" height="48" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                          <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                          <circle
                            cx="18" cy="18" r="14" fill="none"
                            stroke="#007AFF" strokeWidth="3"
                            strokeDasharray={`${t.pct * 0.88} 88`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <Typography
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                          }}
                        >
                          {t.pct}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.625rem' }}>
                        {t.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Card>
          </motion.div>

          {/* Challenges */}
          <Typography variant="h6" sx={{ mb: 1.5 }}>Couple Challenges</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {couplesChallenges.map((c, i) => (
              <ChallengeCard key={c.id} challenge={c} index={i} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
