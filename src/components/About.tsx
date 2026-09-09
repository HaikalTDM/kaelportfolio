import { site, whatsappUrl } from '../data/site';

const principles = [
  {
    num: '01',
    title: 'Brains, not buzzwords',
    desc: 'Clear thinking beats frantic typing. Architecture comes first so your site does not fold the moment your traffic spikes.',
  },
  {
    num: '02',
    title: 'Honest trade-offs, no theatre',
    desc: 'No jargon, no 14-person Zoom calls to pick a font. If an idea will burn your budget or slow your site down, I will say so before you pay for it.',
  },
  {
    num: '03',
    title: 'Ships and stays shipped',
    desc: 'Built to keep running after launch, without you babysitting it or paying a monthly "maintenance retainer" that funds someone else\'s latte habit.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-void text-paper pt-28 pb-28 md:pt-40 md:pb-36 px-6 md:px-14">
      {/* Wave divider from showcase */}
      <div className="absolute -top-12 md:-top-20 left-0 w-full overflow-hidden leading-none z-30 pointer-events-none">
        <svg className="relative block w-full h-12 md:h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,40 C180,105 420,115 650,55 C900,-5 1060,65 1200,35 L1200,120 L0,120 Z" fill="#080808" />
          <path
            d="M0,40 C180,105 420,115 650,55 C900,-5 1060,65 1200,35"
            fill="none"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        {/* Left: portrait */}
        <div className="md:col-span-4 flex flex-col">
          <div className="group relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
            <img
              src="/images/haikal.webp"
              alt={`${site.name} — ${site.role}`}
              className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-coral block">Based in</span>
                <span className="text-xs text-white/90 font-medium">{site.location}</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Currently taking projects" />
            </div>
          </div>
          <p className="mt-3 text-xs uppercase tracking-widest text-paper/50 font-mono">{site.role}</p>

          {/* Direct contact row */}
          <a
            href={whatsappUrl('Hey kael! I saw your portfolio.')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 bg-coral text-black text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full hover:opacity-90 transition active:scale-95"
          >
            WhatsApp me — {site.whatsappLabel}
          </a>
        </div>
        {/* Right: philosophy */}
        <div className="md:col-span-8 flex flex-col justify-center">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-coral mb-3">
            No Middlemen · No "Team" · No B.S.
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-paper tracking-tight leading-[1.08]">
            No account manager. Just the person who actually builds your product.
          </h2>

          <p className="text-paper/70 text-sm md:text-base mt-6 font-light leading-relaxed max-w-2xl">
            Agencies hand you off like a hot potato: sales rep, then account manager, then a junior who
            learned the stack last Tuesday. You pay retainer hours for meetings about meetings. Here,
            every line of code, every interaction, every server query runs through me. One dev, one
            invoice, zero "let me check with the team."
          </p>

          <div className="mt-12 space-y-6 border-t border-white/10 pt-10">
            {principles.map((item) => (
              <div key={item.num} className="flex items-start gap-5 group">
                <span className="font-mono text-sm text-coral pt-0.5 font-semibold">{item.num}.</span>
                <div>
                  <h4 className="text-base font-semibold text-paper group-hover:text-coral transition-colors duration-200">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm text-paper/60 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
