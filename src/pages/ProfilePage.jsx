import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WhatshotRounded from '@mui/icons-material/WhatshotRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import BookmarkRounded from '@mui/icons-material/BookmarkRounded';
import MilitaryTechRounded from '@mui/icons-material/MilitaryTechRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import NotificationsRounded from '@mui/icons-material/NotificationsRounded';
import ShieldRounded from '@mui/icons-material/ShieldRounded';
import StarRounded from '@mui/icons-material/StarRounded';
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import { useApp } from '../context/AppContext';

const badges = [
  { icon: '🔥', label: '3-Day Streak', earned: true },
  { icon: '😂', label: '100 LOLs', earned: true },
  { icon: '📖', label: 'Story Teller', earned: false },
  { icon: '👫', label: 'Couple Goals', earned: false },
  { icon: '🎙️', label: 'Confessed', earned: true },
  { icon: '💯', label: 'Same Energy', earned: false },
];

const menuItems = [
  { Icon: NotificationsRounded, label: 'Notifications', value: 'On' },
  { Icon: ShieldRounded, label: 'Privacy', value: '' },
  { Icon: StarRounded, label: 'Rate SwipeLife', value: '' },
];

export default function ProfilePage() {
  const { streak, cardsSwipedToday, savedStories } = useApp();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
      <Box sx={{ px: 2.5, pt: 3, pb: 2 }}>
        <Typography variant="h2">Profile</Typography>
      </Box>

      {/* Profile card */}
      <Box sx={{ px: 2.5, mb: 2.5 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <Box sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: 24, fontWeight: 700, boxShadow: 2 }}>
                  S
                </Avatar>
                <Box>
                  <Typography variant="h4">SwipeLifer</Typography>
                  <Typography variant="caption" sx={{ display: 'block' }}>Joined Feb 2026</Typography>
                  <Chip label="Anonymous" size="small" color="primary" variant="outlined" sx={{ mt: 0.5 }} />
                </Box>
              </Box>

              {/* Stats row */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  bgcolor: 'background.default',
                  borderRadius: 3,
                  p: 2,
                }}
              >
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                    <WhatshotRounded sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Typography variant="h4">{streak}</Typography>
                  </Box>
                  <Typography variant="caption">Streak</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                    <TrendingUpRounded sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Typography variant="h4">{cardsSwipedToday}</Typography>
                  </Box>
                  <Typography variant="caption">Today</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                    <BookmarkRounded sx={{ fontSize: 18, color: 'primary.main' }} />
                    <Typography variant="h4">{savedStories.length}</Typography>
                  </Box>
                  <Typography variant="caption">Saved</Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </motion.div>
      </Box>

      {/* Badges */}
      <Box sx={{ px: 2.5, mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <MilitaryTechRounded sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="h6">Badges</Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                variant={badge.earned ? 'elevation' : 'outlined'}
                sx={{
                  textAlign: 'center',
                  p: 1.5,
                  opacity: badge.earned ? 1 : 0.4,
                  ...(badge.earned && { borderColor: 'primary.light' }),
                }}
              >
                <Typography sx={{ fontSize: '1.5rem', mb: 0.5 }}>{badge.icon}</Typography>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 500, lineHeight: 1.2, display: 'block' }}
                >
                  {badge.label}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Menu */}
      <Box sx={{ px: 2.5, pb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1.5 }}>Settings</Typography>
        <Card>
          <List disablePadding>
            {menuItems.map((item, i) => (
              <ListItemButton
                key={item.label}
                divider={i < menuItems.length - 1}
                sx={{ py: 1.5 }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <item.Icon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                />
                {item.value && (
                  <Typography variant="caption" sx={{ mr: 1 }}>{item.value}</Typography>
                )}
                <ChevronRightRounded sx={{ color: 'text.disabled', fontSize: 20 }} />
              </ListItemButton>
            ))}
          </List>
        </Card>

        <Button
          color="error"
          startIcon={<LogoutRounded />}
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
}
