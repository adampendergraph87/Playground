import { Home, Layers, Mic, Users, User, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'hot-takes', label: 'Hot Takes', Icon: Flame },
  { id: 'confess', label: 'Confess', Icon: Mic },
  { id: 'couples', label: 'Couples', Icon: Users },
  { id: 'profile', label: 'Profile', Icon: User },
];

export default function BottomNav() {
  const { currentPage, setCurrentPage } = useApp();

  return (
    <nav className="flex items-center justify-around px-2 py-2 bg-white/80 backdrop-blur-xl border-t border-charcoal/5 safe-area-bottom">
      {navItems.map(({ id, label, Icon }) => {
        const active = currentPage === id;
        return (
          <button
            key={id}
            onClick={() => setCurrentPage(id)}
            className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all ${
              active
                ? 'text-brand-600'
                : 'text-charcoal/35 hover:text-charcoal/60'
            }`}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
            <span className={`text-[10px] font-medium ${active ? 'font-semibold' : ''}`}>
              {label}
            </span>
            {active && (
              <div className="w-1 h-1 rounded-full bg-brand-500 mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
