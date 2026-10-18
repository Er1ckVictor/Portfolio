import { BriefcaseBusiness, MapPin, Target } from "lucide-react";
import { about, profile } from "@/lib/data";

export function About() {
  const facts = [
    { label: "Base", value: profile.location, Icon: MapPin },
    { label: "Foco", value: profile.focus, Icon: Target },
    {
      label: "Disponibilidade",
      value: profile.available ? "Aberto a propostas" : "Indisponível no momento",
      Icon: BriefcaseBusiness,
    },
  ];

  return (
    <section id="sobre" className="section" aria-labelledby="sobre-title">
      <div className="wrap about">
        <h2 id="sobre-title" className="section__title">
          Sobre mim
        </h2>
        <div className="about__body">
          <p className="about__lead">{about.lead}</p>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}

          <dl className="facts">
            {facts.map(({ label, value, Icon }) => (
              <div key={label} className="fact">
                <span className="fact__icon" aria-hidden="true">
                  <Icon size={18} />
                </span>
                <div>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
