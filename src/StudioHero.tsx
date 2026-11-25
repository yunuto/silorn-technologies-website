import { Box, Workflow } from "lucide-react";
import { ArrowUpRight } from "./Header";
import { heroServices } from "./heroServices";
import "./studio-hero.css";

const serviceDiagrams = new Map([
  ["#webdesign", <span className="studio-diagram-web" />],
  ["#app-entwicklung", <span className="studio-diagram-app" />],
  ["#ki-automatisierung", <Workflow size={39} strokeWidth={1.45} />],
  ["#3d-modellierung", <Box size={41} strokeWidth={1.45} />],
]);

export default function StudioHero() {
  return (
    <section className="studio-hero" aria-labelledby="studio-hero-title">
      <div className="studio-hero-inner">
        <div className="studio-hero-intro">
          <h1 id="studio-hero-title">
            Du hast eine Idee. <em>Ich setze sie um.</em>
          </h1>
          <p>
            Ich entwickle Websites und Apps für dein Unternehmen und setze KI dort ein, wo sie dir Routinearbeit abnimmt.
          </p>
          <a className="studio-hero-request" href="#kontakt">
            <span className="studio-hero-request-surface">
              Projekt besprechen <span className="studio-hero-request-arrow"><ArrowUpRight /></span>
            </span>
          </a>
        </div>

        <nav className="studio-hero-services" id="leistungen" aria-label="Leistungen im Überblick">
          <ul>
            {heroServices.map(({ name, href }) => (
              <li key={href}>
                <a href={href}>
                  <span className="studio-service-diagram" aria-hidden="true">
                    <span>{serviceDiagrams.get(href)}</span>
                  </span>
                  <span className="studio-service-label">{name} <ArrowUpRight /></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
