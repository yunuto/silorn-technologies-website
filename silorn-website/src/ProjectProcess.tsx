import { useEffect, useRef, useState } from "react";
import { ArrowRight, FileCheck2, Focus, PackageCheck, PenTool } from "lucide-react";
import "./project-process.css";

const steps = [
  {
    title: "Ziel klären",
    description: "Du erzählst mir von deinem Vorhaben. Gemeinsam legen wir fest, was das Ergebnis leisten soll und womit wir starten.",
    Icon: Focus,
  },
  {
    title: "Rahmen & Rechte klären",
    description: "Vor der Umsetzung halten wir Leistungsumfang, Abnahme und Nutzungsrechte schriftlich fest.",
    Icon: FileCheck2,
  },
  {
    title: "Entwurf ansehen",
    description: "Du bekommst einen ersten Entwurf, einen Prototyp oder ein 3D-Modell. Dein Feedback fließt in die nächste Version ein.",
    Icon: PenTool,
  },
  {
    title: "Umsetzen & übergeben",
    description: "Ich setze den abgestimmten Stand um, prüfe das Ergebnis und übergebe dir die vereinbarten Dateien oder Zugänge.",
    Icon: PackageCheck,
  },
];

export default function ProjectProcess() {
  const timeline = useRef<HTMLOListElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!timeline.current || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setEntered(true);
      observer.disconnect();
    }, { rootMargin: "0px 0px -36% 0px" });

    observer.observe(timeline.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="project-process-heading" data-site-reveal="copy">
        <p className="eyebrow">Zusammenarbeit</p>
        <h2 id="process-title">So läuft dein Projekt ab.</h2>
      </header>
      <ol className="project-process-timeline" role="list" ref={timeline} data-entered={entered || undefined}>
        {steps.map(({ title, description, Icon }, index) => (
          <li className="project-process-step" key={title}>
            <span className="project-process-node" aria-hidden="true"><Icon size={23} strokeWidth={1.6} /></span>
            {index < steps.length - 1 && (
              <span className="project-process-connector" aria-hidden="true"><ArrowRight size={14} strokeWidth={1.4} /></span>
            )}
            <div className="project-process-copy">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
