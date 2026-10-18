"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { profile } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "stack", label: "Tecnologias" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "contato", label: "Contato" },
];

export function Nav() {
  const [shown, setShown] = useState(false);
  const [current, setCurrent] = useState("inicio");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    // desce junto com a entrada do main
    const timer = window.setTimeout(() => setShown(true), 250);

    // Seção atual
    const triggers = LINKS.map((l) =>
      ScrollTrigger.create({
        trigger: `#${l.id}`,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && setCurrent(l.id),
      }),
    );
    return () => {
      clearTimeout(timer);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <header className="nav" data-shown={shown || menu} data-menu={menu}>
      <div className="nav__inner wrap">
        <a href="#inicio" className="nav__brand" onClick={() => setMenu(false)}>
          {profile.name}
        </a>
        <nav aria-label="Principal">
          <ul className="nav__links" id="nav-links">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={current === l.id ? "true" : undefined}
                  onClick={() => setMenu(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={menu}
          aria-controls="nav-links"
          onClick={() => setMenu((m) => !m)}
        >
          {menu ? "Fechar" : "Menu"}
        </button>
      </div>
    </header>
  );
}
