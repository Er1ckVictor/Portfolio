"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "@/lib/data";
import { timelineIcons } from "@/lib/icons";

gsap.registerPlugin(ScrollTrigger);

export function Timeline() {
  const listRef = useRef<HTMLDivElement>(null);

  // A linha azul acompanha a leitura (ligada ao scroll do usuário)
  useEffect(() => {
    const list = listRef.current!;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tl__fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 60%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>(".tl__item").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          onEnter: () => item.setAttribute("data-reached", ""),
          onLeaveBack: () => item.removeAttribute("data-reached"),
        });
      });
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section id="trajetoria" className="section" aria-labelledby="trajetoria-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="trajetoria-title" className="section__title">
            Trajetória
          </h2>
        </header>
        <div ref={listRef} className="tl-wrap">
        <span className="tl__track" aria-hidden="true">
          <span className="tl__fill" />
        </span>
        <ol className="tl">
          {timeline.map((t) => {
            const Icon = timelineIcons[t.icon];
            return (
            <li key={t.key} className="tl__item">
              <span className="tl__dot" aria-hidden="true">
                <Icon size={16} />
              </span>
              <p className="tl__period">{t.period}</p>
              <div>
                <h3 className="tl__title">{t.title}</h3>
                <p className="tl__place">{t.place}</p>
                <p className="tl__text">{t.text}</p>
              </div>
            </li>
            );
          })}
        </ol>
        </div>
      </div>
    </section>
  );
}
