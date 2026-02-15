import { useApp } from './context/AppContext';
import BottomNav from './components/BottomNav';
import CelebrationOverlay from './components/CelebrationOverlay';
import HomePage from './pages/HomePage';
import HotTakesPage from './pages/HotTakesPage';
import ConfessPage from './pages/ConfessPage';
import CouplesPage from './pages/CouplesPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

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
    <div className="h-full w-full max-w-md mx-auto flex flex-col bg-cream shadow-2xl relative">
      <div className="flex-1 overflow-hidden">
        <PageRouter />
      </div>
      <BottomNav />
      <CelebrationOverlay />
    </div>
  );
}
