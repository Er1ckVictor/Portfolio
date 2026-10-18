"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, projects, socials } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/scroll";
import { openProject } from "@/components/sections/Projects";
import { Terminal } from "./Terminal";
import { ArrowUpRight, CodeXml } from "lucide-react";
import { socialIcons, TechIcon } from "@/lib/icons";

gsap.registerPlugin(ScrollTrigger);

function Letters({ text }: { text: string }) {
  return (
    <span className="hero__word" aria-hidden="true">
      {text.split("").map((ch, i) => (
        <span key={i} className="hero__char">
          {ch}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [booted, setBooted] = useState(false);
  const featured = projects.filter((p) => p.featured);

  // Entrada do main: um único momento orquestrado assim que a página abre (~1,5 s).
  useEffect(() => {
    const root = ref.current!;
    let cancelled = false;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        root.setAttribute("data-revealed", "");
        root.setAttribute("data-typed", "");
        setBooted(true);
        return;
      }
      gsap.set(".hero__char", { yPercent: 110 });
      gsap.set("[data-reveal]", { autoAlpha: 0, y: 16 });
      gsap.set(".hero__panel", { autoAlpha: 0, x: 24 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power4.out" },
        onStart: () => root.setAttribute("data-revealed", ""),
      });
      // o cursor azul depois do nome só pisca quando o nome terminou de subir
      tl.call(() => root.setAttribute("data-typed", ""), [], 0.95 + 0.03 * document.querySelectorAll(".hero__char").length);
      tl.to(".hero__char", { yPercent: 0, duration: 0.95, stagger: 0.03 })
        .to("[data-reveal]", { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06 }, 0.42)
        .to(".hero__panel", { autoAlpha: 1, x: 0, duration: 0.9, onStart: () => setBooted(true) }, 0.55);

      // espera a fonte carregar para o nome não "pular" no meio da animação
      const fonts = document.fonts?.ready ?? Promise.resolve();
      Promise.race([fonts, new Promise((r) => setTimeout(r, 600))]).then(() => {
        if (!cancelled) tl.play();
      });
    }, root);
    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <section ref={ref} id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner wrap">
        <div className="hero__left">
          <p className="hero__status" data-reveal>
            <span className="hero__pulse" aria-hidden="true" />
            {profile.available ? "Disponível para novos projetos" : "Em um projeto no momento"}
          </p>

          <h1 id="hero-title" className="hero__title">
            <span className="sr-only">{profile.name}</span>
            <span className="hero__line">
              <Letters text={profile.firstName} />
            </span>
            <span className="hero__line">
              <Letters text={profile.lastName} />
            </span>
          </h1>

          <p className="hero__role" data-reveal>
            <CodeXml size={20} aria-hidden="true" className="hero__role-icon" />
            {profile.role}
          </p>
          <p className="hero__desc" data-reveal>
            {profile.description}
          </p>

          <div className="hero__projects" data-reveal>
            <p className="hero__label" id="hero-projects-label">
              Projetos em destaque
            </p>
            <ul className="hero__project-list" aria-labelledby="hero-projects-label" onMouseLeave={() => setActive(null)}>
              {featured.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    className="pbtn"
                    data-active={active === p.slug}
                    onMouseEnter={() => setActive(p.slug)}
                    onFocus={() => setActive(p.slug)}
                    onBlur={() => setActive(null)}
                    onClick={() => openProject(p.slug)}
                  >
                    <span className="pbtn__name">
                      {p.name}
                      <ArrowUpRight size={16} aria-hidden="true" className="pbtn__arrow" />
                    </span>
                    <span className="pbtn__meta" title={p.stack.join(", ")}>
                      {p.stack.slice(0, 4).map((t) => (
                        <TechIcon key={t} name={t} size={15} />
                      ))}
                      <span className="sr-only">{p.stack.join(", ")}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <ul className="hero__socials" data-reveal>
            {socials.map((s) => {
              const Icon = socialIcons[s.key];
              return (
                <li key={s.key}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="social">
                    <Icon size={18} aria-hidden="true" className="social__icon" />
                    <span className="social__label">{s.label}</span>
                    <ArrowUpRight size={14} aria-hidden="true" className="social__arrow" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hero__panel">
          <Terminal active={active} booted={booted} />
        </div>
      </div>
    </section>
  );
}
