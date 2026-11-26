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
    const element = timeline.current;
    if (!element || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    setEntered(true);
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = element.getBoundingClientRect().top;
      const height = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (height * .85 - top) / (height * .65)));
      element.getAnimations({ subtree: true }).forEach((animation) => {
        animation.pause();
        animation.currentTime = progress * 2200;
      });
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const initial = window.requestAnimationFrame(schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(initial);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
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
