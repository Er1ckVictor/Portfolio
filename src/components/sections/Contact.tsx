"use client";

import { useState } from "react";
import { profile, socials } from "@/lib/data";
import { socialIcons } from "@/lib/icons";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail } from "lucide-react";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contato" className="section contact" aria-labelledby="contato-title">
      <div className="wrap">
        <h2 id="contato-title" className="contact__title">
          Vamos construir algo juntos?
        </h2>
        <p className="contact__lead">Conte sobre o seu projeto ou vaga. Respondo em até dois dias úteis.</p>

        <div className="contact__mail">
          <a href={`mailto:${profile.email}`} className="contact__email">
            <Mail className="contact__mail-icon" aria-hidden="true" />
            {profile.email}
          </a>
          <button type="button" className="btn btn--ghost" onClick={copy} aria-live="polite">
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? "E-mail copiado" : "Copiar e-mail"}
          </button>
        </div>

        <ul className="contact__socials">
          {socials.map((s) => {
            const Icon = socialIcons[s.key];
            return (
              <li key={s.key}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  <Icon size={22} aria-hidden="true" className="contact__social-icon" />
                  <span className="contact__social-text">
                    <span>{s.label}</span>
                    <span className="contact__handle">{s.handle}</span>
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" className="contact__social-arrow" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <footer className="wrap">
        <div className="footer">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Feito com Next.js e GSAP</p>
        <a href="#inicio" className="link footer__top">
          <ArrowUp size={14} aria-hidden="true" />
          Voltar ao topo
        </a>
        </div>
      </footer>
    </section>
  );
}
