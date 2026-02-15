import { motion } from 'framer-motion';
import { Flame, BookmarkCheck, Award, TrendingUp, ChevronRight, Shield, Bell, LogOut, Star } from 'lucide-react';
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
  { icon: Bell, label: 'Notifications', value: 'On' },
  { icon: Shield, label: 'Privacy', value: '' },
  { icon: Star, label: 'Rate SwipeLife', value: '' },
];

export default function ProfilePage() {
  const { streak, cardsSwipedToday, savedStories } = useApp();

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-charcoal">Profile</h1>
      </div>

      {/* Profile card */}
      <div className="px-5 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-charcoal/5"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">S</span>
            </div>
            <div>
              <h2 className="font-bold text-charcoal text-lg">SwipeLifer</h2>
              <p className="text-xs text-charcoal/50">Joined Feb 2026</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs px-2 py-0.5 bg-brand-50 text-brand-600 rounded-full font-semibold">
                  Anonymous
                </span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex justify-between bg-cream rounded-xl p-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Flame size={16} className="text-brand-500" />
                <span className="text-xl font-bold text-charcoal">{streak}</span>
              </div>
              <p className="text-[10px] text-charcoal/50 mt-0.5">Streak</p>
            </div>
            <div className="w-px bg-charcoal/10" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp size={16} className="text-brand-500" />
                <span className="text-xl font-bold text-charcoal">{cardsSwipedToday}</span>
              </div>
              <p className="text-[10px] text-charcoal/50 mt-0.5">Today</p>
            </div>
            <div className="w-px bg-charcoal/10" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <BookmarkCheck size={16} className="text-brand-500" />
                <span className="text-xl font-bold text-charcoal">{savedStories.length}</span>
              </div>
              <p className="text-[10px] text-charcoal/50 mt-0.5">Saved</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Badges */}
      <div className="px-5 mb-5">
        <h2 className="text-sm font-semibold text-charcoal/60 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Award size={14} />
          Badges
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                badge.earned
                  ? 'bg-white border-brand-200 shadow-sm'
                  : 'bg-gray-50/50 border-charcoal/5 opacity-40'
              }`}
            >
              <span className="text-2xl mb-1">{badge.icon}</span>
              <span className="text-[10px] font-medium text-charcoal/70 text-center leading-tight">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 pb-6">
        <h2 className="text-sm font-semibold text-charcoal/60 uppercase tracking-wider mb-3">
          Settings
        </h2>
        <div className="bg-white rounded-2xl border border-charcoal/5 overflow-hidden shadow-sm">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-cream/50 transition-colors text-left ${
                i < menuItems.length - 1 ? 'border-b border-charcoal/5' : ''
              }`}
            >
              <item.icon size={18} className="text-charcoal/40" />
              <span className="flex-1 text-sm text-charcoal font-medium">{item.label}</span>
              {item.value && <span className="text-xs text-charcoal/40">{item.value}</span>}
              <ChevronRight size={16} className="text-charcoal/20" />
            </button>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-2 mt-4 py-3 text-red-400 text-sm font-medium hover:text-red-500 transition-colors">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
