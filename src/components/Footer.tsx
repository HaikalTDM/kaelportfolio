import { site, whatsappUrl } from '../data/site';
import { SoundEngine } from '../lib/sound';
import { getLenis } from '../lib/scroll';
import { ArrowUpRight, ArrowUp, MessageSquare } from './Icons';

export default function Footer({ onOpenEnquiry }: { onOpenEnquiry: () => void }) {
  const wa = whatsappUrl("Hey kael! Let's chat about a project.");

  const goTo = (target: string) => {
    SoundEngine.playClick();
    const lenis = getLenis();
    const el = document.querySelector(target);
    if (!el) return;
    if (lenis) lenis.scrollTo(el as HTMLElement);
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-void border-t border-white/10 text-paper pt-20 pb-12 px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        {/* CTA banner */}
        <div className="pb-16 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-paper">
            Got a project that&apos;s been
            <br />
            <span className="text-paper/60">sitting in a group chat for 6 months?</span>
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                SoundEngine.playBlip(680);
                onOpenEnquiry();
              }}
              className="bg-coral text-black font-semibold text-sm px-6 py-3 rounded-full hover:opacity-90 transition active:scale-95 shadow-lg shadow-coral/10"
            >
              LET&apos;S ACTUALLY BUILD IT →
            </button>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4 text-coral" />
              Or just WhatsApp me
            </a>
          </div>
        </div>

        {/* Directory grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-xs leading-relaxed border-b border-white/10 font-light">
          <div className="space-y-3">
            <p className="font-semibold text-white uppercase tracking-wider font-mono">{site.brand}</p>
            <p className="text-paper/60 pr-4">
              One developer in Kuala Lumpur who builds websites and web apps that don&apos;t need
              a babysitter. Or an agency markup.
            </p>
            <div className="flex items-center gap-3 pt-2 text-paper/70 font-mono">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-coral inline-flex items-center gap-1"
              >
                GitHub <ArrowUpRight className="w-3 h-3" />
              </a>
              <span>/</span>
              <a
                href={site.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-coral inline-flex items-center gap-1"
              >
                Threads <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-white uppercase tracking-wider font-mono">Services</p>
            <ul className="space-y-1.5 text-paper/70">
              <li>Websites &amp; Headless Stores</li>
              <li>Business Systems &amp; Portals</li>
              <li>Point-of-Sale &amp; Dashboards</li>
              <li>Interactive Canvas &amp; 3D</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-white uppercase tracking-wider font-mono">Navigation</p>
            <ul className="space-y-1.5 text-paper/70">
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white">Index / Top</button></li>
              <li><button onClick={() => goTo('#work')} className="hover:text-white">Selected Work</button></li>
              <li><button onClick={() => goTo('#about')} className="hover:text-white">About &amp; The Vibe</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-white uppercase tracking-wider font-mono">Direct Contact</p>
            <p className="text-paper/70">{site.email}</p>
            <p className="text-paper/70">{site.whatsappLabel}</p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-coral pt-1 hover:underline font-mono"
            >
              Direct chat on WhatsApp <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Meta bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-paper/50 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for new projects (sarcasm included free)</span>
          </div>
          <p>© {new Date().getFullYear()} {site.brand} All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            Back to top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
