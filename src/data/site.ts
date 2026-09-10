import siteData from '../content/site.json';
import projectsData from '../content/projects.json';

export type CanvasPattern = 'rings' | 'waves' | 'grid' | 'topography' | 'particles';

export interface ProjectTheme {
  bg: string;
  accent: string;
}

export interface Project {
  id: string;
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

export interface SiteInfo {
  brand: string;
  name: string;
  persona: string;
  role: string;
  location: string;
  // WhatsApp digits in international format, no '+'
  whatsapp: string;
  whatsappLabel: string;
  email: string;
  github: string;
  threads: string;
  photo: string;
}

export const site = siteData as SiteInfo;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

const PROJECTS = projectsData.projects as Project[];

export default PROJECTS;
