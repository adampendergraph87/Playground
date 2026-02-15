import { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Heart, X, Bookmark, Laugh, Users, Mic } from 'lucide-react';

const reactionConfig = {
  laugh: { icon: '😂', label: 'LOL' },
  hug: { icon: '🤗', label: 'Aww' },
  same: { icon: '💯', label: 'Same' },
};

function formatCount(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num;
}

const cardColors = [
  'bg-gradient-to-br from-brand-50 to-brand-100',
  'bg-gradient-to-br from-purple-50 to-lavender/30',
  'bg-gradient-to-br from-amber-50 to-warm-100',
  'bg-gradient-to-br from-emerald-50 to-sage/30',
  'bg-gradient-to-br from-rose-50 to-blush/30',
  'bg-gradient-to-br from-sky-50 to-sky/20',
];

export default function SwipeCard({ story, onSwipe, onSave, isTop, style }) {
  const [exitDir, setExitDir] = useState(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-25, 0, 25]);
  const laughOpacity = useTransform(x, [0, 100, 200], [0, 0.5, 1]);
  const skipOpacity = useTransform(x, [-200, -100, 0], [1, 0.5, 0]);

  const colorClass = cardColors[story.id % cardColors.length];

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
      className={`absolute inset-0 mx-4 my-2 ${colorClass} rounded-[var(--radius-card)] shadow-lg border border-white/60 overflow-hidden cursor-grab active:cursor-grabbing`}
      style={{ x, rotate, ...style }}
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
      {/* Swipe overlay labels */}
      {isTop && (
        <>
          <motion.div
            className="swipe-label right-6 border-2 border-green-500 text-green-500"
            style={{ opacity: laughOpacity }}
          >
            😂 LOL
          </motion.div>
          <motion.div
            className="swipe-label left-6 border-2 border-red-400 text-red-400"
            style={{ opacity: skipOpacity }}
          >
            Skip
          </motion.div>
        </>
      )}

      <div className="flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {story.author[0]}
            </div>
            <div>
              <p className="font-semibold text-charcoal text-sm">{story.author}</p>
              <p className="text-xs text-charcoal/50">{story.timeAgo} ago</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onSave(story); }}
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <Bookmark size={18} className="text-charcoal/40" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-2">
          {story.type === 'audio' ? (
            <div className="w-full">
              <div className="flex items-center gap-3 mb-4 p-4 bg-white/60 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-coral flex items-center justify-center shadow-md">
                  <Mic size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-brand-400 rounded-full"
                        style={{ height: `${Math.random() * 20 + 4}px`, opacity: 0.4 + Math.random() * 0.6 }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-charcoal/50">{story.duration}</p>
                </div>
              </div>
              <p className="text-lg font-medium text-charcoal/80 leading-relaxed text-center italic">
                "{story.content}"
              </p>
            </div>
          ) : (
            <p className="text-xl font-medium text-charcoal leading-relaxed text-center">
              "{story.content}"
            </p>
          )}
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-4 flex-wrap justify-center">
          {story.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-white/50 text-charcoal/60 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Reactions bar */}
        <div className="flex justify-center gap-4">
          {Object.entries(story.reactions).map(([key, count]) => (
            <button
              key={key}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/60 hover:bg-white/80 transition-colors active:scale-95"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-base">{reactionConfig[key].icon}</span>
              <span className="text-xs font-semibold text-charcoal/70">{formatCount(count)}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
