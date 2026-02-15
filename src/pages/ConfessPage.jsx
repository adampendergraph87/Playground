import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send, Play, Pause, Trash2, Keyboard } from 'lucide-react';

const recentConfessions = [
  { id: 1, duration: '0:34', text: 'I told my kid vegetables are "dinosaur food" and now he only eats broccoli...', plays: 1234, timeAgo: '2h' },
  { id: 2, duration: '1:12', text: 'My biggest secret? I sit in the car for 10 min after getting home just for silence...', plays: 3456, timeAgo: '4h' },
  { id: 3, duration: '0:48', text: "I pretend the WiFi is broken so my kids will go outside. I'm watching Netflix...", plays: 5678, timeAgo: '6h' },
];

function WaveformVisualizer({ active }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-16">
      {Array.from({ length: 32 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-brand-400"
          animate={
            active
              ? {
                  height: [4, Math.random() * 40 + 8, 4],
                }
              : { height: 4 }
          }
          transition={
            active
              ? {
                  duration: 0.4 + Math.random() * 0.4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.02,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

function ConfessionCard({ confession, index }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl p-4 shadow-sm border border-charcoal/5"
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => setPlaying(!playing)}
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm ${
            playing
              ? 'bg-brand-500 text-white'
              : 'bg-brand-100 text-brand-600 hover:bg-brand-200'
          }`}
        >
          {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-charcoal leading-relaxed italic">"{confession.text}"</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-charcoal/40">{confession.duration}</span>
            <span className="text-xs text-charcoal/40">{confession.plays.toLocaleString()} plays</span>
            <span className="text-xs text-charcoal/40">{confession.timeAgo} ago</span>
          </div>
          {playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-brand-300 rounded-full"
                    animate={{ height: [3, Math.random() * 14 + 3, 3] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.03 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ConfessPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [mode, setMode] = useState('voice'); // voice or text
  const [textInput, setTextInput] = useState('');

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecording(true);
    } else {
      setIsRecording(true);
      setHasRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-charcoal">Audio Confessionals</h1>
        <p className="text-sm text-charcoal/50 mt-1">
          Share your story. Completely anonymous.
        </p>
      </div>

      {/* Recording area */}
      <div className="px-5 mb-6">
        <div className="bg-gradient-to-b from-charcoal to-charcoal-light rounded-2xl p-6 text-center shadow-lg">
          {/* Mode toggle */}
          <div className="flex justify-center gap-2 mb-5">
            <button
              onClick={() => setMode('voice')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                mode === 'voice'
                  ? 'bg-brand-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              <Mic size={14} />
              Voice
            </button>
            <button
              onClick={() => setMode('text')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                mode === 'text'
                  ? 'bg-brand-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              <Keyboard size={14} />
              Text
            </button>
          </div>

          {mode === 'voice' ? (
            <>
              <WaveformVisualizer active={isRecording} />

              <p className="text-white/60 text-sm mb-5 mt-3">
                {isRecording
                  ? 'Recording... tap to stop'
                  : hasRecording
                  ? 'Recording saved! Send or redo?'
                  : 'Tap to start recording your confession'}
              </p>

              <div className="flex justify-center gap-4">
                {hasRecording && (
                  <button
                    onClick={() => setHasRecording(false)}
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleRecord}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                    isRecording
                      ? 'bg-red-500 animate-pulse'
                      : 'bg-brand-500 hover:bg-brand-600'
                  }`}
                >
                  {isRecording ? (
                    <MicOff size={24} className="text-white" />
                  ) : (
                    <Mic size={24} className="text-white" />
                  )}
                </motion.button>

                {hasRecording && (
                  <button className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-white hover:bg-brand-600 transition-colors">
                    <Send size={18} />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-left">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Share your confession anonymously..."
                className="w-full h-28 bg-white/10 rounded-xl p-4 text-white placeholder:text-white/30 text-sm outline-none resize-none focus:ring-2 focus:ring-brand-400 transition-all"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-white/30">{textInput.length} / 280</span>
                <button className="px-5 py-2 bg-brand-500 rounded-full text-white text-sm font-semibold hover:bg-brand-600 transition-colors active:scale-95 flex items-center gap-2">
                  <Send size={14} />
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent confessions */}
      <div className="px-5 pb-6">
        <h2 className="text-sm font-semibold text-charcoal/60 uppercase tracking-wider mb-3">
          Recent Confessions
        </h2>
        <div className="flex flex-col gap-3">
          {recentConfessions.map((c, i) => (
            <ConfessionCard key={c.id} confession={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
