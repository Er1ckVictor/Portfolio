import type { ComponentType, SVGProps } from "react";
import {
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithubactions,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiCss,
  SiSupabase,
  SiTypescript,
  SiVercel,
  SiThreedotjs,
  SiGsap
} from "react-icons/si";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { Building2, Database, Monitor, Network, Rocket, Server, ShieldCheck, Sprout, Wrench } from "lucide-react";
import type { SocialKey, TimelineIcon } from "./data";

type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

/** Ícone de cada tecnologia (nome igual ao usado em data.ts). */
export const techIcons: Record<string, Icon> = {
  "Three.js": SiThreedotjs,
  Gsap: SiGsap,
  CSS: SiCss,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  "APIs REST": Network,
  Supabase: SiSupabase,
  Firebase: SiFirebase,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  Git: SiGit,
  "GitHub Actions": SiGithubactions,
  Vercel: SiVercel,
};

export const socialIcons: Record<SocialKey, Icon> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
};

export const groupIcons: Record<string, Icon> = {
  frontend: Monitor,
  backend: Server,
  data: Database,
  infra: Wrench,
};

export const timelineIcons: Record<TimelineIcon, Icon> = {
  start: Sprout,
  growth: ShieldCheck,
  work: Building2,
  now: Rocket,
};

export function TechIcon({ name, size = 16, className }: { name: string; size?: number; className?: string }) {
  const I = techIcons[name];
  if (!I) return null;
  return <I size={size} className={className} aria-hidden="true" focusable="false" />;
}
