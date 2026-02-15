import Box from '@mui/material/Box';
import { useApp } from './context/AppContext';
import BottomNav from './components/BottomNav';
import CelebrationOverlay from './components/CelebrationOverlay';
import HomePage from './pages/HomePage';
import HotTakesPage from './pages/HotTakesPage';
import ConfessPage from './pages/ConfessPage';
import CouplesPage from './pages/CouplesPage';
import ProfilePage from './pages/ProfilePage';

function PageRouter() {
  const { currentPage } = useApp();

  switch (currentPage) {
    case 'home':
      return <HomePage />;
    case 'hot-takes':
      return <HotTakesPage />;
    case 'confess':
      return <ConfessPage />;
    case 'couples':
      return <CouplesPage />;
    case 'profile':
      return <ProfilePage />;
    default:
      return <HomePage />;
  }
}

export default function App() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        maxWidth: 448,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        boxShadow: 4,
        position: 'relative',
      }}
    >
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <PageRouter />
      </Box>
      <BottomNav />
      <CelebrationOverlay />
    </Box>
  );
}
