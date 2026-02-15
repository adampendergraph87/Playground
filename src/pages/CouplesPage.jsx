import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Zap, ArrowRight, Lock, Copy, Check } from 'lucide-react';
import { couplesChallenges } from '../data/stories';

function ChallengeCard({ challenge, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-full bg-white rounded-2xl p-5 shadow-sm border border-charcoal/5 hover:shadow-md transition-all active:scale-[0.98] text-left"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-coral to-brand-400 flex items-center justify-center text-xl shadow-sm">
          {challenge.emoji}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-charcoal text-sm">{challenge.title}</h3>
          <p className="text-xs text-charcoal/50 mt-0.5">{challenge.description}</p>
        </div>
        <ArrowRight size={16} className="text-charcoal/30" />
      </div>
    </motion.button>
  );
}

export default function CouplesPage() {
  const [linked, setLinked] = useState(false);
  const [copied, setCopied] = useState(false);
  const inviteCode = 'SWIPE-' + Math.random().toString(36).substring(2, 7).toUpperCase();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-charcoal">Couples Mode</h1>
        <p className="text-sm text-charcoal/50 mt-1">
          Laugh together. See how your humor aligns.
        </p>
      </div>

      {!linked ? (
        <div className="px-5 pb-6">
          {/* Link partner section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-coral/10 to-brand-100 rounded-2xl p-6 text-center mb-6 border border-coral/20"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral to-brand-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users size={28} className="text-white" />
            </div>
            <h2 className="text-lg font-bold text-charcoal mb-2">Link Your Partner</h2>
            <p className="text-sm text-charcoal/60 mb-5">
              Share the code below or scan each other's QR codes to start laughing together
            </p>

            {/* Invite code */}
            <div className="bg-white rounded-xl p-4 mb-4 border border-charcoal/5">
              <p className="text-xs text-charcoal/40 mb-1">Your invite code</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl font-mono font-bold text-charcoal tracking-widest">
                  {inviteCode}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-cream transition-colors"
                >
                  {copied ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} className="text-charcoal/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => setLinked(true)}
              className="w-full py-3.5 bg-gradient-to-r from-coral to-brand-500 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
            >
              Link Partner
            </button>

            <div className="flex items-center gap-2 justify-center mt-4">
              <Lock size={12} className="text-charcoal/30" />
              <span className="text-xs text-charcoal/30">Private & anonymous — only humor is shared</span>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="px-5 pb-6">
          {/* Compatibility score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-charcoal to-charcoal-light rounded-2xl p-6 text-center mb-6 shadow-lg"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">
                Y
              </div>
              <Heart size={20} className="text-coral" />
              <div className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center text-white font-bold">
                P
              </div>
            </div>
            <p className="text-xs text-white/50 mb-2 uppercase tracking-wider font-semibold">Humor Compatibility</p>
            <div className="flex items-center justify-center gap-1">
              <Zap size={20} className="text-brand-400" />
              <span className="text-4xl font-bold text-white">78%</span>
            </div>
            <p className="text-xs text-white/40 mt-1">Based on 23 shared swipes</p>

            {/* Taste breakdown */}
            <div className="flex justify-center gap-4 mt-4">
              {[
                { label: 'Dad Jokes', pct: 92 },
                { label: 'Dark Humor', pct: 45 },
                { label: 'Wholesome', pct: 88 },
              ].map((t) => (
                <div key={t.label} className="text-center">
                  <div className="relative w-12 h-12 mx-auto mb-1">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="14" fill="none"
                        stroke="url(#grad)" strokeWidth="3"
                        strokeDasharray={`${t.pct * 0.88} 88`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="grad">
                          <stop offset="0%" stopColor="#FB923C" />
                          <stop offset="100%" stopColor="#FF6B6B" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                      {t.pct}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/50">{t.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Challenges */}
          <h2 className="text-sm font-semibold text-charcoal/60 uppercase tracking-wider mb-3">
            Couple Challenges
          </h2>
          <div className="flex flex-col gap-3">
            {couplesChallenges.map((c, i) => (
              <ChallengeCard key={c.id} challenge={c} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
