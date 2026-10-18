"use client";

import { useEffect, useMemo, useState } from "react";
import { projects } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { TechIcon } from "@/lib/icons";
import { Check, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const OPEN_EVENT = "devfolio:open-project";
const FILTER_EVENT = "devfolio:filter";

/** Transforma o slug em um id válido no HTML (ex.: "Landing page" -> "landing-page"). */
const domId = (slug: string) =>
  slug
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Abre um projeto na lista e rola até ele (usado pelos botões do main). */
export function openProject(slug: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: slug }));
  requestAnimationFrame(() => scrollToTarget(`#projeto-${domId(slug)}`, { offset: -120 }));
}

/** Filtra os projetos por tecnologia (usado pela seção Stack). */
export function filterProjects(tech: string | null) {
  window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: tech }));
  requestAnimationFrame(() => scrollToTarget("#projetos", { offset: -40 }));
}

export function Projects() {
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const techs = useMemo(() => {
    const count = new Map<string, number>();
    projects.forEach((p) => p.stack.forEach((t) => count.set(t, (count.get(t) ?? 0) + 1)));
    return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t);
  }, []);

  const visible = filter ? projects.filter((p) => p.stack.includes(filter)) : projects;

  useEffect(() => {
    const onOpen = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      setFilter(null);
      setOpen(slug);
    };
    const onFilter = (e: Event) => {
      setFilter((e as CustomEvent<string | null>).detail);
      setOpen(null);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener(FILTER_EVENT, onFilter);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener(FILTER_EVENT, onFilter);
    };
  }, []);

  return (
    <section id="projetos" className="section" aria-labelledby="projetos-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="projetos-title" className="section__title">
            Projetos
          </h2>
          <p className="section__lead">
            Uma seleção do que construí. Abra um projeto para ver os detalhes, ou filtre pela tecnologia.
          </p>
        </header>

        <div className="filters" role="group" aria-label="Filtrar por tecnologia">
          <button type="button" className="chip" aria-pressed={filter === null} onClick={() => setFilter(null)}>
            Todos <span className="chip__count">{projects.length}</span>
          </button>
          {techs.map((t) => (
            <button key={t} type="button" className="chip" aria-pressed={filter === t} onClick={() => setFilter(filter === t ? null : t)}>
              <TechIcon name={t} size={14} />
              {t}
            </button>
          ))}
        </div>

        <ul className="plist">
          {visible.map((p) => {
            const isOpen = open === p.slug;
            return (
              <li key={p.slug} id={`projeto-${domId(p.slug)}`} className="prow" data-open={isOpen}>
                <button
                  type="button"
                  className="prow__head"
                  aria-expanded={isOpen}
                  aria-controls={`detalhes-${domId(p.slug)}`}
                  onClick={() => setOpen(isOpen ? null : p.slug)}
                >
                  <span className="prow__name">{p.name}</span>
                  <span className="prow__summary">
                    {p.summary}
                    <span className="prow__icons" aria-hidden="true">
                      {p.stack.map((t) => (
                        <TechIcon key={t} name={t} size={16} />
                      ))}
                    </span>
                  </span>
                  <span className="prow__year">{p.year}</span>
                  <span className="prow__toggle" aria-hidden="true" />
                </button>
                <div id={`detalhes-${domId(p.slug)}`} className="prow__body" role="region" aria-label={`Detalhes de ${p.name}`}>
                  <div className="prow__inner">
                    <div className="prow__cols">
                      <div>
                        <h3 className="prow__sub">O que entreguei</h3>
                        <ul className="prow__highlights">
                          {p.highlights.map((h) => (
                            <li key={h}>
                              <Check size={16} aria-hidden="true" className="prow__check" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="prow__sub">Tecnologias</h3>
                        <ul className="tags">
                          {p.stack.map((t) => (
                            <li key={t} className="tag">
                              <TechIcon name={t} size={14} />
                              {t}
                            </li>
                          ))}
                        </ul>
                        <div className="prow__links">
                          {p.repo && (
                            <a className="btn btn--ghost" href={p.repo} target="_blank" rel="noopener noreferrer" tabIndex={isOpen ? 0 : -1}>
                              <FaGithub size={16} aria-hidden="true" />
                              Ver código
                            </a>
                          )}
                          {p.live && (
                            <a className="btn" href={p.live} target="_blank" rel="noopener noreferrer" tabIndex={isOpen ? 0 : -1}>
                              <ExternalLink size={16} aria-hidden="true" />
                              Abrir projeto
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {visible.length === 0 && (
          <p className="empty">
            Nenhum projeto com {filter} ainda.{" "}
            <button type="button" className="link" onClick={() => setFilter(null)}>
              Mostrar todos
            </button>
          </p>
        )}
      </div>
    </section>
  );
}
