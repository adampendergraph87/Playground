import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRounded from '@mui/icons-material/HomeRounded';
import WhatshotRounded from '@mui/icons-material/WhatshotRounded';
import MicRounded from '@mui/icons-material/MicRounded';
import PeopleRounded from '@mui/icons-material/PeopleRounded';
import PersonRounded from '@mui/icons-material/PersonRounded';
import { useApp } from '../context/AppContext';

const navItems = [
  { id: 'home', label: 'Home', Icon: HomeRounded },
  { id: 'hot-takes', label: 'Hot Takes', Icon: WhatshotRounded },
  { id: 'confess', label: 'Confess', Icon: MicRounded },
  { id: 'couples', label: 'Couples', Icon: PeopleRounded },
  { id: 'profile', label: 'Profile', Icon: PersonRounded },
];

export default function BottomNav() {
  const { currentPage, setCurrentPage } = useApp();

  return (
    <BottomNavigation
      value={currentPage}
      onChange={(_, newValue) => setCurrentPage(newValue)}
      showLabels
    >
      {navItems.map(({ id, label, Icon }) => (
        <BottomNavigationAction
          key={id}
          value={id}
          label={label}
          icon={<Icon />}
        />
      ))}
    </BottomNavigation>
  );
}
