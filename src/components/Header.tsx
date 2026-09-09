import { useEffect, useRef, useState } from 'react';
import { site, whatsappUrl } from '../data/site';
import { SoundEngine } from '../lib/sound';
import { scrollToSelector } from '../lib/scroll';
import { MessageSquare, Volume2, VolumeX } from './Icons';

const SOUND_KEY = 'kael_sound';

// Lenis-compatible nav click: no native jump, smooth scroll instead.
const smoothAnchor =
  (href: string) =>
  (e: React.MouseEvent) => {
    e.preventDefault();
    SoundEngine.playClick();
    scrollToSelector(href);
  };

export default function Header({ onOpenEnquiry }: { onOpenEnquiry: () => void }) {
  const [soundOn, setSoundOn] = useState(
    () => typeof localStorage !== 'undefined' && localStorage.getItem(SOUND_KEY) === 'on',
  );

  // Reflect the persisted preference into the engine once on mount.
  const mountedRef = useRef(false);
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    SoundEngine.enabled = soundOn;
    if (soundOn) SoundEngine.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSound = () => {
    setSoundOn((prev) => {
      const next = !prev;
      SoundEngine.enabled = next;
      if (next) {
        SoundEngine.init();
        SoundEngine.playBlip(760);
      }
      localStorage.setItem(SOUND_KEY, next ? 'on' : 'off');
      return next;
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-gradient-to-b from-black/85 via-black/35 to-transparent pointer-events-none transition-all duration-300">
      <a
        href="#top"
        onClick={smoothAnchor('#top')}
        className="pointer-events-auto flex items-center gap-2 text-coral font-bold text-2xl tracking-tight transition hover:opacity-85 select-none backdrop-blur-md bg-black/40 border border-white/10 px-4 py-1.5 rounded-full shadow-lg shadow-black/40 hover:border-coral/40"
      >
        <span>{site.brand}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-coral pulse-dot" />
      </a>

      <nav className="pointer-events-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-full px-3 md:px-4 py-2 flex items-center gap-3 md:gap-5 shadow-xl shadow-black/40">
        <a href="#work" onClick={smoothAnchor('#work')} className="text-xs uppercase tracking-widest text-paper/70 hover:text-white transition duration-200">
          Work
        </a>
        <a href="#about" onClick={smoothAnchor('#about')} className="text-xs uppercase tracking-widest text-paper/70 hover:text-white transition duration-200">
          The Vibe
        </a>

        <button
          onClick={() => {
            SoundEngine.playBlip(680);
            onOpenEnquiry();
          }}
          className="bg-black/70 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium text-white hover:bg-black transition duration-200 active:scale-95"
        >
          LET&apos;S COOK
        </button>

        <button
          onClick={toggleSound}
          aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
          aria-pressed={soundOn}
          className="p-1.5 rounded-full bg-white/[0.07] text-paper hover:text-coral hover:bg-white/[0.14] transition duration-200"
          title="Toggle sound effects"
        >
          {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        <a
          href={whatsappUrl("Hey kael! Let's chat about a project.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Say hi on WhatsApp"
          onClick={() => SoundEngine.playClick()}
          className="p-1.5 rounded-full bg-white/[0.07] text-paper hover:text-coral hover:bg-white/[0.14] transition duration-200"
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </a>
      </nav>
    </header>
  );
}
