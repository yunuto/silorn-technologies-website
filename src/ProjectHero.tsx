import { ArrowUpRight } from "./Header";
import { heroServices } from "./heroServices";
import "./project-hero.css";

export default function ProjectHero() {
  return (
    <section className="project-hero" aria-labelledby="project-hero-title">
      <div className="project-hero-frame">
        <div className="project-hero-intro">
          <h1 id="project-hero-title">Von der Idee zum Einsatz.</h1>
          <div className="project-hero-intro-copy">
            <p>Ob App, Website oder Prototyp, hier siehst du, wie ich Ideen umsetze.</p>
            <a className="project-hero-request" href="#kontakt">
              Projekt anfragen <ArrowUpRight />
            </a>
          </div>
        </div>

        <article className="project-hero-feature" aria-labelledby="project-hero-roft">
          <div className="project-hero-feature-copy">
            <p className="project-hero-type">Eigene App</p>
            <h2 id="project-hero-roft">ROFT</h2>
            <p className="project-hero-summary">Digitale Garage, Treffen und Community für Auto- und Motorradfans.</p>
            <a className="project-hero-more" href="#projekte">
              Projekte ansehen <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="project-hero-media">
            <img
              className="project-hero-community"
              src="assets/roft-community.webp"
              alt="Motorradbeitrag in der ROFT-Community"
              fetchPriority="high"
            />
            <img
              className="project-hero-events"
              src="assets/roft-screen.jpg"
              alt="Ansicht eines Fahrzeugtreffens in der ROFT-App"
            />
          </div>
        </article>

        <nav className="project-hero-services" id="leistungen" aria-label="Leistungen im Überblick">
          <ul>
            {heroServices.map(({ name, href }) => (
              <li key={href}>
                <a href={href}>{name} <ArrowUpRight /></a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
