import { useEffect, useRef, useState } from 'react';
import PROJECTS, { type Project } from '../data/site';
import { SoundEngine } from '../lib/sound';
import { getLenis, scrollToY } from '../lib/scroll';
import { ArrowRight } from './Icons';

interface Props {
  onOpenEnquiry: () => void;
}

// Hand-crafted per-project UI mockups shown inside the settled card.
function ProjectMockup({ project }: { project: Project }) {
  const c = project.theme.accent;

  if (project.id === 'captura') {
    return (
      <div className="w-full bg-[#f5f1e8] text-[#111] rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-extrabold text-sm tracking-tighter uppercase">Captura</span>
          <span className="text-[9px] font-mono text-[#7a6a3d] uppercase">RM/day</span>
        </div>
        <div className="flex items-center justify-center py-3 relative">
          {/* body */}
          <div className="w-16 h-10 bg-[#1a1a1a] rounded-md shadow-inner relative">
            {/* lens barrel */}
            <div className="absolute -left-7 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-9 h-6 rounded-[3px] bg-[#2b2b2b] border border-black/30" />
              <div className="w-4 h-3 rounded-full bg-[#0a0a0a] border-2 border-[#444] -mt-1" />
            </div>
            {/* grip + viewfinder */}
            <div className="absolute right-0 top-0 w-3 h-4 bg-[#0e0e0e] rounded-tr-md" />
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-[#333] rounded-sm" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold leading-tight">Sony A7 IV + 24-70 GM</p>
            <p className="text-[9px] text-gray-500">Full-frame · 4K60 · in stock</p>
          </div>
          <div
            className="text-black text-[9px] font-bold uppercase px-2.5 py-1 rounded-full"
            style={{ backgroundColor: c }}
          >
            Book now
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 'prettylocalkl') {
    const swatches = ['#d9a8a0', '#c4a5c0', '#b5b48f', '#e4c8a8', '#a8b8c9', '#cf8f86'];
    return (
      <div className="w-full bg-[#faf6f1] text-[#241a17] rounded-xl p-4 shadow-lg">
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-serif font-bold tracking-tight text-[#241a17]">Pretty Local KL</span>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#241a17]/50">New Drop</span>
        </div>
        <div className="grid grid-cols-6 gap-1.5 py-1">
          {swatches.map((col, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-full h-10 rounded-md shadow-sm border border-black/5" style={{ backgroundColor: col }} />
              <div className="w-full h-1.5 rounded-full bg-[#241a17]/15" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[9px] text-[#241a17]/60 font-light">KL streetwear &amp; heritage edits</span>
          <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: c }}>
            Shop the edit →
          </span>
        </div>
      </div>
    );
  }

  // simplepos
  return (
    <div className="w-full bg-[#0b120d] border border-white/10 text-white rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono font-semibold tracking-widest uppercase" style={{ color: c }}>
          ● SimplePOS
        </span>
        <span className="text-[9px] font-mono text-white/40">Table 04 · 2 items</span>
      </div>
      <div className="space-y-1 py-1 font-mono text-[10px]">
        <div className="flex justify-between text-white/80">
          <span>Nasi Lemak Ayam</span><span className="text-white/40">×1</span><span>RM 12.50</span>
        </div>
        <div className="flex justify-between text-white/80">
          <span>Teh Tarik (ais)</span><span className="text-white/40">×2</span><span>RM 7.00</span>
        </div>
      </div>
      <div className="border-t border-dashed border-white/15 mt-2 pt-2 flex items-center justify-between">
        <span className="text-[9px] font-mono uppercase text-white/50">Total</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold font-mono">RM 19.50</span>
          <span
            className="text-[#0b120d] text-[9px] font-bold uppercase px-2.5 py-1 rounded-full"
            style={{ backgroundColor: c }}
          >
            Charge
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HeroWork({ onOpenEnquiry }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prevIdxRef = useRef(-1);

  const [viewport, setViewport] = useState({ w: 1440, h: 900 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });

  const activeProject = PROJECTS[activeIndex];

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({
      x: -(y / rect.height) * 2 * 10 + 10,
      y: ((x / rect.width) * 2 - 1) * 10,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  // Scroll → progress mapping (drives hero shrink + card-curtain slide)
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const p = Math.min(1, Math.max(0, -rect.top / total));
        setScrollProgress(p);
        if (p >= 0.16) {
          const idx = Math.min(
            PROJECTS.length - 1,
            Math.round(((p - 0.16) / 0.84) * (PROJECTS.length - 1)),
          );
          if (idx !== prevIdxRef.current) {
            SoundEngine.playBlip(540 + idx * 90);
            prevIdxRef.current = idx;
          }
          setActiveIndex(idx);
        } else {
          setActiveIndex(0);
        }
      } else if (rect.top > 0) {
        setScrollProgress(0);
        setActiveIndex(0);
      } else {
        setScrollProgress(1);
        setActiveIndex(PROJECTS.length - 1);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (idx: number) => {
    const el = containerRef.current;
    if (!el) return;
    SoundEngine.playClick();
    const total = el.offsetHeight - window.innerHeight;
    const target = 0.16 + (idx / (PROJECTS.length - 1)) * 0.84;
    scrollToY(el.offsetTop + Math.min(1, target) * total, getLenis());
  };

  // Morph: shrinkT 0 (full-viewport hero) → 1 (settled center card)
  const shrinkT = Math.min(1, Math.max(0, scrollProgress / 0.15));
  const easeT = 1 - Math.pow(1 - shrinkT, 3);

  const isDesktop = viewport.w >= 1024;
  const isTablet = viewport.w >= 768 && viewport.w < 1024;
  // Match the site screen-capture aspect ratio (1920×894 ≈ 2.15:1).
  // Card stays within the central 6-column gap so it never overlaps the side text.
  const targetW = isDesktop
    ? Math.min(540, viewport.w * 0.38)
    : isTablet
      ? Math.min(520, viewport.w * 0.66)
      : Math.max(300, viewport.w - 40);
  const targetH = targetW * (894 / 1920);

  const curW = viewport.w - easeT * (viewport.w - targetW);
  const curH = viewport.h - easeT * (viewport.h - targetH);
  const radius = easeT * 22;

  const heroOpacity = Math.max(0, 1 - shrinkT / 0.15);
  const uiOpacity = Math.max(0, (scrollProgress - 0.12) / 0.08);

  // Continuous position across the project stack (0..N-1) → drives the vertical curtain slide.
  const slideProgress = Math.min(
    PROJECTS.length - 1,
    Math.max(0, ((scrollProgress - 0.16) / 0.84) * (PROJECTS.length - 1)),
  );

  // Smooth crossfade from hero backdrop → project video, aligned with the card shrink.
  // Starts just after scroll begins so videos have a moment to preroll before fading in.
  const blendT = Math.min(1, Math.max(0, (scrollProgress - 0.02) / 0.12));
  const heroVideoBlend = 1 - Math.pow(1 - blendT, 3); // eased in

  const effTiltX = tilt.x * easeT;
  const effTiltY = tilt.y * easeT;

  const flipStyle = {
    transform: `rotateX(${effTiltX}deg) rotateY(${effTiltY}deg)`,
  } as const;

  const stackStep = curH + 8; // include a small seam between project tiles

  return (
    <section ref={containerRef} id="work" className="relative h-[480vh] w-full bg-void">
      <div
        className="sticky top-0 h-screen w-full flex flex-col justify-between transition-colors duration-700 overflow-hidden"
        style={{ backgroundColor: scrollProgress >= 0.16 ? activeProject.theme.bg : '#080808' }}
      >
        {/* 3-column surrounding UI (visible once showcase settles) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full px-6 md:px-12 pt-20 pb-8 relative z-10 pointer-events-none">
          {/* Left: title */}
          <div
            className="md:col-span-3 flex flex-col justify-center relative min-h-[140px] transition-opacity duration-300 min-w-0"
            style={{ opacity: uiOpacity, pointerEvents: uiOpacity > 0.5 ? 'auto' : 'none' }}
          >
            <div className="grid grid-cols-1 grid-rows-1 w-full">
              {PROJECTS.map((p, idx) => (
                <div
                  key={p.id}
                  className="col-start-1 row-start-1 transition-opacity duration-500 ease-in-out"
                  style={{ opacity: activeIndex === idx ? 1 : 0 }}
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-paper tracking-tight leading-[1.08] break-words">
                    {p.title}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          {/* Center spacer keeps the card centered over the middle columns */}
          <div className="md:col-span-6 hidden md:block pointer-events-none" />

          {/* Right: copy + CTA */}
          <div
            className="md:col-span-3 flex flex-col justify-center relative min-h-[200px] transition-opacity duration-300"
            style={{ opacity: uiOpacity, pointerEvents: uiOpacity > 0.5 ? 'auto' : 'none' }}
          >
            <div className="grid grid-cols-1 grid-rows-1 w-full">
              {PROJECTS.map((p, idx) => (
                <div
                  key={p.id}
                  className="col-start-1 row-start-1 space-y-4 transition-opacity duration-500 ease-in-out"
                  style={{ opacity: activeIndex === idx ? 1 : 0 }}
                >
                  <p className="text-paper/90 text-sm font-light leading-relaxed">{p.description}</p>
                  <div className="w-full h-px bg-white/15" />
                  <span className="block text-[11px] font-mono tracking-widest uppercase font-semibold" style={{ color: p.theme.accent }}>
                    {p.type}
                  </span>
                  <p className="text-[11px] font-sans text-paper/55 italic leading-snug">
                    "{p.specs.deadpoolNote}"
                  </p>
                  <div>
                    <a
                      href={p.specs.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => SoundEngine.playBlip(600)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-paper hover:text-coral transition group"
                    >
                      <span>SEE IT LIVE</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MORPHING CARD: vertical curtain of project slides */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 perspective-1000 z-20 will-change-transform pointer-events-auto"
          style={{ width: curW, height: curH }}
        >
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            onClick={() => {
              if (heroOpacity > 0.01) return;
              SoundEngine.playClick();
              window.open(activeProject.specs.link, '_blank', 'noopener,noreferrer');
            }}
            className="relative w-full h-full will-change-transform select-none cursor-pointer transform-style-3d transition-transform duration-150 group"
            style={flipStyle}
          >
            {/* PORTAL (clips the stack) */}
            <div
              className="absolute inset-0 overflow-hidden shadow-2xl bg-void"
              style={{ borderRadius: radius, border: `${easeT}px solid rgba(255,255,255,0.15)` }}
            >
              {/* Original hero backdrop (dark + glow); fades out as videos fade in */}
              <div
                className="absolute inset-0 bg-void pointer-events-none transition-opacity duration-150"
                style={{ opacity: 1 - heroVideoBlend }}
              >
                <div
                  className="absolute"
                  style={{
                    width: 'min(70vw, 900px)',
                    height: 'min(70vw, 900px)',
                    right: '-20%',
                    bottom: '-45%',
                    background: `radial-gradient(circle, ${activeProject.theme.accent}2b 0%, transparent 62%)`,
                    filter: 'blur(30px)',
                  }}
                />
              </div>

              {/* STACK: mounts once scrolling begins, crossfades in over the hero backdrop */}
              {scrollProgress >= 0.005 && (
                <div
                  className="absolute inset-0 transition-opacity duration-150"
                  style={{
                    opacity: heroVideoBlend,
                    pointerEvents: heroVideoBlend > 0.5 ? 'auto' : 'none',
                  }}
                >
                <div
                  className="absolute inset-0 transition-transform duration-200 ease-out"
                  style={{ transform: `translateY(${-slideProgress * stackStep}px)` }}
                >
                  {PROJECTS.map((p) => (
                    <div
                      key={p.id}
                      className="relative w-full"
                      style={{ height: curH, marginBottom: 8 }}
                    >
                      {p.video ? (
                        <video
                          src={p.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ProjectMockup project={p} />
                      )}
                      {/* seam highlight between slides */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15" />
                    </div>
                  ))}
                  </div>
                </div>
              )}

              {/* HERO CONTENT (full-screen; fades as card shrinks) */}
              <div
                className="absolute inset-0 z-30 flex flex-col justify-end p-6 md:p-14 lg:p-16 pb-12 md:pb-16 pointer-events-none transition-opacity duration-200"
                style={{ opacity: heroOpacity, display: heroOpacity <= 0.01 ? 'none' : 'flex' }}
              >
                <div className="relative z-10 max-w-xl pointer-events-auto">
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      width: 'min(60vw, 720px)',
                      height: 'min(60vw, 720px)',
                      right: '-30%',
                      bottom: '-70%',
                      background: `radial-gradient(circle, ${activeProject.theme.accent}26 0%, transparent 65%)`,
                      filter: 'blur(20px)',
                    }}
                  />
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-paper tracking-tight leading-[1.05] drop-shadow-lg">
                    I make websites that
                    <br />
                    actually do their job.
                  </h1>
                  <p className="text-paper/80 text-sm sm:text-base mt-4 mb-7 font-light drop-shadow max-w-md">
                    One developer in Kuala Lumpur who builds fast, honest sites and apps. No account
                    managers, no handoffs, no "let&apos;s circle back." Just code that ships.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onOpenEnquiry}
                      className="bg-coral text-black font-semibold text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 sm:px-6 sm:py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition active:scale-95 shadow-xl shadow-coral/20"
                    >
                      START A PROJECT <span>→</span>
                    </button>
                    <a
                      href="#work"
                      onClick={(e) => {
                        e.preventDefault();
                        goTo(0);
                      }}
                      className="backdrop-blur-md bg-black/40 text-paper text-xs sm:text-sm uppercase tracking-wider font-medium px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-white/25 hover:bg-black/60 transition"
                    >
                      VIEW SELECTED WORK
                    </a>
                  </div>
                </div>
              </div>

              {/* glare */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
                style={{
                  opacity: easeT,
                  background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.16) 0%, transparent 60%)`,
                }}
              />

              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" style={{ borderRadius: radius }} />
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="flex items-center justify-between px-6 md:px-12 pb-6 text-xs font-mono tracking-wider max-w-7xl mx-auto w-full transition-opacity duration-300 relative z-10"
          style={{ opacity: uiOpacity, pointerEvents: uiOpacity > 0.5 ? 'auto' : 'none' }}
        >
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              goTo(0);
            }}
            className="text-paper/70 hover:text-white transition flex items-center gap-1.5 uppercase"
          >
            ALL PROJECTS <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <div className="hidden sm:flex items-center gap-2">
            {PROJECTS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => goTo(idx)}
                aria-label={`Jump to ${p.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-8 bg-coral' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <span className="text-paper/60">{activeProject.index}</span>
        </div>
      </div>
    </section>
  );
}
