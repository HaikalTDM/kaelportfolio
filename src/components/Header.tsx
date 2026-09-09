import { useEffect, useRef, useState } from 'react';
import { site, whatsappUrl } from '../data/site';
import { SoundEngine } from '../lib/sound';
import { scrollToSelector } from '../lib/scroll';
import { Close, Menu, MessageSquare, Volume2, VolumeX } from './Icons';

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
  const [menuOpen, setMenuOpen] = useState(false);

  // Reflect the persisted preference into the engine once on mount.
  const mountedRef = useRef(false);
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    SoundEngine.enabled = soundOn;
    if (soundOn) SoundEngine.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

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

  const wa = whatsappUrl("Hey kael! Let's chat about a project.");

  const go = (href: string) => {
    setMenuOpen(false);
    scrollToSelector(href);
  };

  const openEnquiry = () => {
    setMenuOpen(false);
    SoundEngine.playBlip(680);
    onOpenEnquiry();
  };

  const soundBtn = (
    <button
      onClick={toggleSound}
      aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
      aria-pressed={soundOn}
      className="pointer-events-auto p-2 rounded-full text-paper/70 hover:text-coral transition duration-200"
      title="Toggle sound effects"
    >
      {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
    </button>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-300">
      {/* gradient scrim behind the bar */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-transparent" />

      {/* top bar */}
      <div className="relative flex items-center justify-between px-4 md:px-12 py-4 md:py-5">
        <a
          href="#top"
          onClick={smoothAnchor('#top')}
          className="pointer-events-auto flex items-center gap-2 text-coral font-bold text-xl md:text-2xl tracking-tight transition hover:opacity-85 select-none backdrop-blur-md bg-black/40 border border-white/10 px-3 py-1.5 md:px-4 rounded-full shadow-lg shadow-black/40 hover:border-coral/40"
        >
          <span>{site.brand}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-coral pulse-dot" />
        </a>

        {/* Desktop: full pill nav */}
        <nav className="hidden md:flex pointer-events-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-full px-4 py-2 items-center gap-5 shadow-xl shadow-black/40">
          <a href="#work" onClick={smoothAnchor('#work')} className="text-xs uppercase tracking-widest text-paper/70 hover:text-white transition duration-200">
            Work
          </a>
          <a href="#about" onClick={smoothAnchor('#about')} className="text-xs uppercase tracking-widest text-paper/70 hover:text-white transition duration-200">
            The Vibe
          </a>

          <button
            onClick={openEnquiry}
            className="bg-coral text-black font-semibold text-xs px-5 py-2 rounded-full hover:opacity-90 transition duration-200 active:scale-95"
          >
            LET&apos;S COOK
          </button>

          {soundBtn}

          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Say hi on WhatsApp"
            onClick={() => SoundEngine.playClick()}
            className="p-1.5 rounded-full bg-white/[0.07] text-paper hover:text-coral hover:bg-white/[0.14] transition duration-200"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile: logo + compact controls + menu button */}
        <div className="flex md:hidden pointer-events-auto items-center gap-1">
          {soundBtn}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Say hi on WhatsApp"
            onClick={() => SoundEngine.playClick()}
            className="p-2 rounded-full text-paper/70 hover:text-coral transition duration-200"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="ml-1 min-w-[44px] min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full backdrop-blur-md bg-black/40 border border-white/10 text-paper hover:text-coral transition"
          >
            {menuOpen ? <Close className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="md:hidden pointer-events-auto mx-4 mt-1 backdrop-blur-xl bg-black/70 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-3 flex flex-col gap-1">
          <button
            onClick={() => go('#work')}
            className="w-full text-left px-4 py-3 rounded-xl text-sm uppercase tracking-widest text-paper/80 hover:text-white hover:bg-white/[0.06] transition"
          >
            Work
          </button>
          <button
            onClick={() => go('#about')}
            className="w-full text-left px-4 py-3 rounded-xl text-sm uppercase tracking-widest text-paper/80 hover:text-white hover:bg-white/[0.06] transition"
          >
            The Vibe
          </button>
          <div className="h-px bg-white/10 my-1" />
          <button
            onClick={openEnquiry}
            className="w-full text-center bg-coral text-black font-semibold text-sm uppercase tracking-wider px-4 py-3 rounded-xl hover:opacity-90 transition active:scale-[0.98]"
          >
            LET&apos;S COOK
          </button>
        </nav>
      )}
    </header>
  );
}
