import { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import BookmarkBorderRounded from '@mui/icons-material/BookmarkBorderRounded';
import MicRounded from '@mui/icons-material/MicRounded';

const reactionConfig = {
  laugh: { icon: '😂', label: 'LOL' },
  hug: { icon: '🤗', label: 'Aww' },
  same: { icon: '💯', label: 'Same' },
};

function formatCount(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num;
}

export default function SwipeCard({ story, onSwipe, onSave, isTop, style }) {
  const [exitDir, setExitDir] = useState(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-25, 0, 25]);
  const laughOpacity = useTransform(x, [0, 100, 200], [0, 0.5, 1]);
  const skipOpacity = useTransform(x, [-200, -100, 0], [1, 0.5, 0]);

  function handleDragEnd(_, info) {
    const threshold = 120;
    if (info.offset.x > threshold) {
      setExitDir('right');
      onSwipe('right', story);
    } else if (info.offset.x < -threshold) {
      setExitDir('left');
      onSwipe('left', story);
    } else {
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
    }
  }

  return (
    <motion.div
      style={{ x, rotate, ...style, position: 'absolute', inset: 0 }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      animate={
        exitDir === 'right'
          ? { x: 500, opacity: 0, rotate: 30 }
          : exitDir === 'left'
          ? { x: -500, opacity: 0, rotate: -30 }
          : {}
      }
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileTap={isTop ? { scale: 1.02 } : {}}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          mx: 2,
          my: 1,
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 2,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          cursor: isTop ? 'grab' : 'default',
          '&:active': { cursor: isTop ? 'grabbing' : 'default' },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Swipe overlay labels */}
        {isTop && (
          <>
            <motion.div
              className="swipe-label"
              style={{ opacity: laughOpacity, right: 24, border: '2px solid #34C759', color: '#34C759' }}
            >
              LOL
            </motion.div>
            <motion.div
              className="swipe-label"
              style={{ opacity: skipOpacity, left: 24, border: '2px solid #FF3B30', color: '#FF3B30' }}
            >
              Skip
            </motion.div>
          </>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main', fontSize: 14, fontWeight: 700 }}>
                {story.author[0]}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {story.author}
                </Typography>
                <Typography variant="caption">{story.timeAgo} ago</Typography>
              </Box>
            </Box>
            <IconButton
              size="small"
              onClick={(e) => { e.stopPropagation(); onSave(story); }}
              sx={{ color: 'text.secondary' }}
            >
              <BookmarkBorderRounded fontSize="small" />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 1 }}>
            {story.type === 'audio' ? (
              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mb: 2,
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 3,
                  }}
                >
                  <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>
                    <MicRounded />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px', mb: 0.5 }}>
                      {Array.from({ length: 24 }).map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            width: 3,
                            bgcolor: 'primary.light',
                            borderRadius: 1,
                            opacity: 0.4 + Math.random() * 0.6,
                          }}
                          style={{ height: `${Math.random() * 20 + 4}px` }}
                        />
                      ))}
                    </Box>
                    <Typography variant="caption">{story.duration}</Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    textAlign: 'center',
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{story.content}&rdquo;
                </Typography>
              </Box>
            ) : (
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: 'text.primary',
                  lineHeight: 1.6,
                  textAlign: 'center',
                }}
              >
                &ldquo;{story.content}&rdquo;
              </Typography>
            )}
          </Box>

          {/* Tags */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {story.tags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                size="small"
                variant="outlined"
                sx={{ borderColor: 'grey.200', color: 'text.secondary', fontWeight: 500 }}
              />
            ))}
          </Box>

          {/* Reactions bar */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
            {Object.entries(story.reactions).map(([key, count]) => (
              <Chip
                key={key}
                label={`${reactionConfig[key].icon} ${formatCount(count)}`}
                size="small"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  bgcolor: 'grey.100',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  '&:hover': { bgcolor: 'grey.200' },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
