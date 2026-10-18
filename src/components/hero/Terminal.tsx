"use client";

import { useEffect, useMemo, useRef } from "react";
import { profile, projects, stack, type Project } from "@/lib/data";

type Line = { kind: "cmd" | "out" | "muted" | "accent" | "gap"; text: string };

function bootLines(): Line[] {
  const main = stack.flatMap((g) => g.items).slice(0, 6).join("  ");
  return [
    { kind: "cmd", text: "whoami" },
    { kind: "out", text: `${profile.name.toLowerCase()}, ${profile.role.toLowerCase()}` },
    { kind: "gap", text: "" },
    { kind: "cmd", text: "cat stack.txt" },
    { kind: "out", text: main },
    { kind: "gap", text: "" },
    { kind: "cmd", text: "ls projetos/" },
    { kind: "accent", text: projects.map((p) => p.slug).join("   ") },
    { kind: "gap", text: "" },
    { kind: "muted", text: "Passe o mouse em um projeto para abrir aqui." },
  ];
}

function projectLines(p: Project): Line[] {
  return [
    { kind: "cmd", text: `cat projetos/${p.slug}.md` },
    { kind: "accent", text: `# ${p.name}` },
    { kind: "out", text: p.summary },
    { kind: "gap", text: "" },
    { kind: "muted", text: `papel   ${p.role}` },
    { kind: "muted", text: `ano     ${p.year}` },
    { kind: "muted", text: `stack   ${p.stack.join(", ")}` },
    { kind: "gap", text: "" },
    ...p.highlights.map((h) => ({ kind: "out" as const, text: `+ ${h}` })),
  ];
}

export function Terminal({ active, booted }: { active: string | null; booted: boolean }) {
  const project = useMemo(() => projects.find((p) => p.slug === active) ?? null, [active]);
  const lines = project ? projectLines(project) : bootLines();
  const panelRef = useRef<HTMLDivElement>(null);

  // inclinação sutil acompanhando o ponteiro (só com mouse)
  useEffect(() => {
    const el = panelRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `perspective(1200px) rotateY(${cx * -5}deg) rotateX(${cy * 4}deg)`;
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={panelRef} className="term" data-booted={booted ? "true" : "false"}>
      <div className="term__bar">
        <span className="term__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="term__title">erick@devfolio: ~{project ? `/projetos/${project.slug}` : ""}</span>
      </div>
      <div className="term__body" aria-live="polite" key={project?.slug ?? "boot"}>
        {lines.map((l, i) =>
          l.kind === "gap" ? (
            <div key={i} className="term__gap" />
          ) : (
            <div key={i} className={`term__line term__line--${l.kind}`} style={{ animationDelay: `${i * 45}ms` }}>
              {l.kind === "cmd" && <span className="term__prompt" aria-hidden="true">$</span>}
              {l.text}
            </div>
          ),
        )}
        <div className="term__line term__line--cmd" style={{ animationDelay: `${lines.length * 45}ms` }}>
          <span className="term__prompt" aria-hidden="true">$</span>
          <span className="term__caret" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
