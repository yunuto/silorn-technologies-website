import { ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { useId, useLayoutEffect, useRef } from "react";
import type { CaseStudy } from "./caseStudies";
import "./case-study-dialog.css";

type CaseStudyDialogProps = {
  study: CaseStudy | null;
  onClose: () => void;
  onRequest: (study: CaseStudy) => void;
};

export default function CaseStudyDialog({ study, onClose, onRequest }: CaseStudyDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const headingId = useId();
  const comparisonId = useId();

  useLayoutEffect(() => {
    const element = dialog.current;
    if (!element || !study) return;

    const bodyStyle = document.body.style;
    const rootStyle = document.documentElement.style;
    const previousOverflow = bodyStyle.overflow;
    const previousGutter = rootStyle.scrollbarGutter;

    rootStyle.scrollbarGutter = "stable";
    bodyStyle.overflow = "hidden";
    element.showModal();
    element.scrollTop = 0;
    heading.current?.focus({ preventScroll: true });

    return () => {
      if (element.open) element.close();
      bodyStyle.overflow = previousOverflow;
      rootStyle.scrollbarGutter = previousGutter;
    };
  }, [study]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby={headingId}
      className="silorn-case-dialog"
      data-case-id={study?.id}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {study && (
        <div className="silorn-case-sheet">
          <header className="silorn-case-banner">
            <img
              src={study.image.src}
              alt={study.image.alt}
              style={{ objectPosition: study.image.position }}
              decoding="async"
            />
            <div className="silorn-case-banner-copy">
              <p className="silorn-case-overline">{study.client} <span aria-hidden="true">·</span> {study.year}</p>
              <h2 id={headingId} ref={heading} tabIndex={-1}>{study.title}</h2>
            </div>
            <button
              className="silorn-case-close grid place-items-center"
              type="button"
              onClick={onClose}
              aria-label="Projekt schließen"
            >
              <X size={21} aria-hidden="true" />
            </button>
          </header>

          <div className="silorn-case-content">
            <div className="silorn-case-intro">
              <p className="silorn-case-discipline">{study.discipline} <span aria-hidden="true">·</span> {study.sector}</p>
              {study.kind === "concept" && <p className="silorn-case-concept">Konzeptstudie · Beispielwerte</p>}
            </div>

            <div className="silorn-case-analysis">
              <section className="silorn-case-analysis-card">
                <h3>Ausgangslage</h3>
                <p>{study.challenge}</p>
              </section>
              <section className="silorn-case-analysis-card silorn-case-solution">
                <h3>Silorn. Lösung &amp; Umsetzung</h3>
                <p>{study.architecture}</p>
              </section>
            </div>

            {study.beforeAfter.length > 0 && (
              <section aria-labelledby={comparisonId}>
                <h3 id={comparisonId}>Vorher und nachher</h3>
                <div className="silorn-case-comparison" role="region" aria-labelledby={comparisonId} tabIndex={0}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Kennzahl</th>
                        <th scope="col">Vorher</th>
                        <th scope="col">Nachher</th>
                        <th scope="col">Wirkung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {study.beforeAfter.map(({ label, before, after, effect }) => (
                        <tr key={label}>
                          <th scope="row">{label}</th>
                          <td><s>{before}</s></td>
                          <td><strong>{after}</strong></td>
                          <td>{effect}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <section>
              <h3>{study.kind === "concept" ? "Erwartete Ergebnisse" : "Projektergebnisse"}</h3>
              <ul className="silorn-case-results">
                {study.impact.map((outcome) => (
                  <li key={outcome}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
              {study.link && (
                <a className="silorn-case-link" href={study.link.url}>
                  {study.link.label}<ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </section>
          </div>

          <footer className="silorn-case-footer">
            <div>
              <p className="silorn-case-stack-title">Technologie &amp; Formate</p>
              <ul className="silorn-case-stack">
                {study.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <button className="silorn-case-request" type="button" onClick={() => onRequest(study)}>
              Ähnliches Projekt anfragen <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </footer>
        </div>
      )}
    </dialog>
  );
}
