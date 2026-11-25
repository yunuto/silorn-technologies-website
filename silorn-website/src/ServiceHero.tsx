import { ArrowUpRight } from "./Header";
import { heroServices } from "./heroServices";
import "./service-hero.css";

export default function ServiceHero() {
  return (
    <section className="silorn-service-hero" aria-labelledby="silorn-service-hero-title">
      <div className="silorn-service-hero-inner">
        <div className="silorn-service-hero-intro">
          <h1 id="silorn-service-hero-title">Was soll entstehen?</h1>
          <p>Schau dir an, wobei ich dir helfen kann und was du am Ende bekommst.</p>
          <a className="silorn-service-hero-cta" href="#kontakt">
            Projekt anfragen <ArrowUpRight />
          </a>
        </div>

        <ul className="silorn-service-hero-list" id="leistungen" aria-label="Leistungen">
          {heroServices.map(({ name, href, description }) => (
            <li key={href}>
              <a className="silorn-service-hero-link" href={href}>
                <span className="silorn-service-hero-name">{name}</span>
                <span className="silorn-service-hero-description">{description}</span>
                <span className="silorn-service-hero-arrow"><ArrowUpRight /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
