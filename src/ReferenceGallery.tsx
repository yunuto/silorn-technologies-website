import { Apple, ArrowUpRight, Play } from "lucide-react";
import { caseStudies } from "./caseStudies";
import type { CaseStudy } from "./caseStudies";
import { useCaseStudyScroll } from "./useCaseStudyScroll";
import "./case-studies.css";

const formatIndex = (value: number) => String(value).padStart(2, "0");
const galleryStudies = caseStudies.filter((study) => !study.hiddenFromGallery);

function CaseVisual({ study, eager }: { study: CaseStudy; eager: boolean }) {
  const { src, alt, position } = study.image;
  const loading = eager ? "eager" : "lazy";

  return (
    <div className="silorn-case-image">
      <img className="silorn-case-photo" src={src} alt={alt} style={{ objectPosition: position }} loading={loading} decoding="async" />
    </div>
  );
}

export default function ReferenceGallery() {
  const { sectionRef, viewportRef, trackRef, activeIndex, revealCard } = useCaseStudyScroll(galleryStudies.length);

  return (
    <section className="silorn-cases" aria-labelledby="silorn-cases-title" ref={sectionRef}>
      <header className="silorn-cases-heading">
        <h2 id="silorn-cases-title">Projekte mit <em>Substanz</em>.</h2>
        <div className="silorn-cases-navigation" role="group" aria-label="Projekt in der Galerie auswählen">
          {galleryStudies.map((study, index) => {
            const label = study.kind === "reference" ? study.client : study.title;
            return (
              <button
                key={study.id}
                type="button"
                aria-label={label}
                aria-current={index === activeIndex ? "true" : undefined}
                title={label}
                onClick={() => revealCard(index, true)}
              >
                {formatIndex(index + 1)}
              </button>
            );
          })}
        </div>
      </header>
      <div className="silorn-cases-viewport" ref={viewportRef}>
        <div className="silorn-cases-track flex" ref={trackRef}>
          {galleryStudies.map((study, index) => (
            <article
              className="silorn-case-card group relative flex shrink-0 flex-col lg:flex-row"
              key={study.id}
              aria-labelledby={`project-${study.id}-title`}
              data-case-id={study.id}
            >
              <CaseVisual study={study} eager={index === 0} />
              <div className="silorn-case-card-copy">
                <div className="silorn-case-top">
                  <p>{study.discipline}</p>
                </div>
                <p className="silorn-case-client">{study.client}</p>
                <h3 id={`project-${study.id}-title`}>{study.title}</h3>
                <p className="silorn-case-summary">{study.subtitle}</p>
                {study.link && (
                  <div className="silorn-case-links">
                    {study.id === "roft" ? (
                      <>
                        <a className="silorn-case-store" href={study.link.url} target="_blank" rel="noopener noreferrer" aria-label="ROFT im App Store ansehen">
                          <Apple size={21} aria-hidden="true" />
                          <span><small>Laden im</small>App Store</span>
                        </a>
                        <span className="silorn-case-store silorn-case-store-pending" aria-label="Google Play, in Vorbereitung">
                          <Play size={19} aria-hidden="true" />
                          <span><small>In Vorbereitung</small>Google Play</span>
                        </span>
                      </>
                    ) : (
                      <a className="silorn-case-link" href={study.link.url} {...(study.link.url.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {study.link.label} <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </div>
              {study.id === "roft" && (
                <div className="silorn-roft-website" aria-hidden="true" inert>
                  <div className="silorn-case-image">
                    <img className="silorn-case-photo" src="assets/roft-website-laptop.webp" alt="ROFT-Webseite auf einem Laptop mit rotem Licht" loading="lazy" decoding="async" />
                  </div>
                  <div className="silorn-case-card-copy">
                    <div className="silorn-case-top"><p>Webentwicklung</p></div>
                    <p className="silorn-case-client">ROFT</p>
                    <h3>Die Website zur ROFT Community</h3>
                    <p className="silorn-case-summary">Ein digitaler Auftritt, der die App vorstellt und Einblicke in Funktionen und Community gibt.</p>
                    <div className="silorn-case-links">
                      <a className="silorn-roft-website-label" href="https://roftofficial.com/" target="_blank" rel="noopener noreferrer">Website ansehen <ArrowUpRight size={16} aria-hidden="true" /></a>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
