"use client";

import { projects, stack } from "@/lib/data";
import { groupIcons, TechIcon } from "@/lib/icons";
import { filterProjects } from "./Projects";

export function Stack() {
  const usage = (tech: string) => projects.filter((p) => p.stack.includes(tech)).length;

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="stack-title" className="section__title">
            Tecnologias
          </h2>
          <p className="section__lead">As ferramentas que uso no dia a dia. Clique em uma para ver os projetos feitos com ela.</p>
        </header>

        <div className="stack">
          {stack.map((g) => {
            const GroupIcon = groupIcons[g.icon];
            return (
              <div key={g.group} className="stack__group">
                <h3 className="stack__title">
                  <GroupIcon size={16} aria-hidden="true" />
                  {g.group}
                </h3>
                <ul className="stack__list">
                  {g.items.map((t) => {
                    const n = usage(t);
                    const label = (
                      <span className="tech__name">
                        <span className="tech__icon">
                          <TechIcon name={t} size={18} />
                        </span>
                        {t}
                      </span>
                    );
                    return (
                      <li key={t}>
                        {n > 0 ? (
                          <button type="button" className="tech" onClick={() => filterProjects(t)}>
                            {label}
                            <span className="tech__count">
                              {n} {n === 1 ? "projeto" : "projetos"}
                            </span>
                          </button>
                        ) : (
                          <span className="tech tech--static">{label}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
