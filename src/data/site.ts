export type CanvasPattern = 'rings' | 'waves' | 'grid' | 'topography' | 'particles';

export interface ProjectTheme {
  bg: string;
  accent: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  type: string;
  description: string;
  theme: ProjectTheme;
  canvasPattern: CanvasPattern;
  // Optional looping screen-capture video of the live site (e.g. 1920×894).
  // Set to a path like '/videos/captura.mp4' to replace the styled mockup with a
  // full-bleed video layer. Must be muted for autoplay; keep files small (< ~8 MB).
  video?: string;
  ui: {
    tag: string;
    headline: string;
    sub: string;
  };
  specs: {
    role: string;
    status: string;
    linkLabel: string;
    link: string;
    repo?: string;
    deadpoolNote: string;
  };
}

export const site = {
  brand: 'kael.',
  name: 'Muhammad Haikal bin Ismail',
  persona: 'Haikal',
  role: 'Solo Product Developer',
  location: 'Kuala Lumpur, MY',
  // WhatsApp digits in international format, no '+'
  whatsapp: '60132068891',
  whatsappLabel: '+60 13-206 8891',
  email: 'm.haikalismail02@gmail.com',
  github: 'https://github.com/haikalTDM',
  threads: 'https://www.threads.net/@haikal_tdm',
} as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

const PROJECTS: Project[] = [
  {
    id: 'captura',
    index: '01 / 03',
    title: 'Captura',
    type: 'Camera Rental & Production Platform',
    description:
      'Premium camera hire for KL creators who refuse to shoot on a phone. Equipment browsing, booking, and an admin panel that keeps the gear (and the chaos) in check.',
    theme: { bg: '#0d0b09', accent: '#e6b450' },
    canvasPattern: 'rings',
    video: '/videos/capturawebsite.webm',
    ui: {
      tag: 'Premium Gear · Kuala Lumpur',
      headline: 'RENT. SHOOT. REPEAT.',
      sub: 'Full-frame bodies and cinema lenses, booked in minutes.',
    },
    specs: {
      role: 'Design + Build',
      status: 'LIVE · captura.my',
      linkLabel: 'captura.my',
      link: 'https://captura.my',
      repo: 'https://github.com/haikalTDM/captura-camera-rental',
      deadpoolNote:
        'Literally rents out the cameras the site was filmed on. Full circle, zero plot holes.',
    },
  },
  {
    id: 'prettylocalkl',
    index: '02 / 03',
    title: 'Pretty Local KL',
    type: 'Fashion & Lifestyle Storefront',
    description:
      'A fashion and lifestyle storefront putting Malaysian labels where KL shoppers will actually find them. Editorial polish, zero "everything is imported" energy.',
    theme: { bg: '#140f14', accent: '#f27d98' },
    canvasPattern: 'waves',
    video: '/videos/prettylocalklwebsite.webm',
    ui: {
      tag: 'Local Design · KL',
      headline: 'LOCAL STYLE. FRESH DROPS.',
      sub: 'Malaysian labels, one edit at a time.',
    },
    specs: {
      role: 'Design + Build',
      status: 'LIVE · prettylocalkl.com',
      linkLabel: 'prettylocalkl.com',
      link: 'https://prettylocalkl.com',
      deadpoolNote:
        'Loads faster than a KL traffic jam clears. Low bar, still counts.',
    },
  },
  {
    id: 'simplepos',
    index: '03 / 03',
    title: 'SimplePOS',
    type: 'Point-of-Sale System',
    description:
      'A point-of-sale that skips the three-day training course. Order entry, payments, and reporting that get out of your way before the lunch rush does.',
    theme: { bg: '#0a110c', accent: '#8fe06e' },
    canvasPattern: 'grid',
    video: '/videos/saleposwebsite.webm',
    ui: {
      tag: 'Counter-Ready · F&B',
      headline: 'ORDER. PAY. DONE.',
      sub: 'No bloat, no training manual, no queues.',
    },
    specs: {
      role: 'Design + Build',
      status: 'LIVE · capturapos.vercel.app',
      linkLabel: 'capturapos.vercel.app',
      link: 'https://capturapos.vercel.app',
      repo: 'https://github.com/haikalTDM/SimplePOS',
      deadpoolNote:
        'Rings up orders faster than you can explain today\'s specials. Ka-ching.',
    },
  },
];

export default PROJECTS;
