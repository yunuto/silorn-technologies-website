import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import type { CaseStudy } from "./caseStudies";

type DialogMode = "search" | "request" | null;
type RequestContext = Pick<CaseStudy, "title" | "requestType">;

type DialogProps = {
  mode: DialogMode;
  onClose: () => void;
  requestContext: RequestContext | null;
};

const searchItems = [
  { label: "Über mich", href: "#ueber-mich", keywords: "Yunus Firma Unternehmen ueber" },
  { label: "Referenzen", href: "#projekte", keywords: "Kunden Projekte ROFT PRIMUS Beispiele" },
  { label: "Leistungen", href: "#leistungen", keywords: "Dienstleistungen Angebot IT" },
  { label: "Arbeitsweise", href: "#ablauf", keywords: "Ablauf Zusammenarbeit Projekt" },
  { label: "App-Entwicklung", href: "#app-entwicklung", keywords: "Software Mobile iOS Android" },
  { label: "Webdesign", href: "#webdesign", keywords: "Website Homepage Landingpage" },
  { label: "KI-Automatisierung", href: "#ki-automatisierung", keywords: "KI AI Prozesse Workflow" },
  { label: "3D-Modellierung", href: "#3d-modellierung", keywords: "CAD technische Zeichnung Modell" },
  { label: "Anfrage", href: "#kontakt", keywords: "Kontakt E-Mail Beratung anfragen" },
];

const projectTypes = [
  "App-Entwicklung",
  "Webdesign",
  "KI-Automatisierung",
  "3D-Modellierung & CAD",
];

const fieldClass = "w-full rounded-xl border border-[var(--rule)] bg-white px-3.5 py-3 text-sm text-[color:var(--midnight)] outline-none focus:border-[var(--royal)] focus:ring-2 focus:ring-[var(--royal)]/20";

function normalize(value: string) {
  return value.toLocaleLowerCase("de").normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function Search({ onNavigate }: { onNavigate: () => void }) {
  const [query, setQuery] = useState("");
  const list = useRef<HTMLUListElement>(null);
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const results = searchItems.filter(({ label, keywords }) => {
    const text = normalize(`${label} ${keywords}`);
    return terms.every((term) => text.includes(term));
  });

  function handleSearchKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter" && event.key !== "ArrowDown") return;
    const firstResult = list.current?.querySelector<HTMLAnchorElement>("a");
    if (!firstResult) return;
    event.preventDefault();
    if (event.key === "ArrowDown") firstResult.focus();
    else firstResult.click();
  }

  return (
    <div className="px-5 pt-5 pb-4 sm:px-7">
      <label htmlFor="silorn-search-input" className="sr-only">Website durchsuchen</label>
      <input
        id="silorn-search-input"
        type="search"
        data-dialog-focus
        className={fieldClass}
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        onKeyDown={handleSearchKey}
        placeholder="Nach Themen oder Projekten suchen …"
        autoComplete="off"
      />
      <p role="status" className="sr-only">
        {results.length === 1 ? "1 Ergebnis" : `${results.length} Ergebnisse`}
      </p>
      {results.length ? (
        <ul ref={list} className="mt-3 grid list-none gap-0.5 p-0">
          {results.map(({ label, href }) => {
            const itemClass = "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[color:var(--midnight)] no-underline hover:bg-[var(--cool)] hover:text-[color:var(--royal)] focus-visible:bg-[var(--cool)]";
            const arrow = <span aria-hidden="true" className="text-[color:var(--royal)]">↗</span>;
            return (
              <li key={label}>
                <a href={href} onClick={onNavigate} className={itemClass}>{label}{arrow}</a>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="px-1 pt-5 pb-2 text-sm text-[color:var(--steel)]">Keine passenden Ergebnisse.</p>
      )}
    </div>
  );
}

function ProjectRequest({ context }: { context: RequestContext | null }) {
  function openDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const projectType = String(fields.get("projectType") ?? "");
    if (!projectTypes.includes(projectType)) return;
    const details = String(fields.get("projectDetails") ?? "").trim();
    const body = [`Projektart: ${projectType}`, context && `Projektbezug: ${context.title}`, details].filter(Boolean).join("\r\n\r\n");
    const draft = new URLSearchParams({
      subject: `Projektanfrage: ${projectType}`,
      body: body.replace(/\r?\n/g, "\r\n"),
    });
    window.location.href = `mailto:business@silorn-technologies.de?${draft.toString().replace(/\+/g, "%20")}`;
  }

  return (
    <form onSubmit={openDraft} className="grid gap-4 p-5 sm:p-7">
      <p className="text-sm leading-relaxed text-[color:var(--steel)]">
        Wählen Sie Ihr Thema und öffnen Sie einen vorausgefüllten E-Mail-Entwurf.
      </p>
      {context && (
        <p className="rounded-xl border border-[var(--rule)] bg-[var(--cool)] px-3.5 py-3 text-sm">
          <strong>Projektbezug</strong> · {context.title}
        </p>
      )}
      <div className="grid gap-1.5">
        <label htmlFor="silorn-project-type" className="text-sm font-semibold">Projektart</label>
        <select id="silorn-project-type" data-dialog-focus className={fieldClass} name="projectType" defaultValue={context?.requestType ?? ""} required>
          <option value="" disabled>Bitte auswählen</option>
          {projectTypes.map((projectType) => <option key={projectType}>{projectType}</option>)}
        </select>
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="silorn-project-details" className="text-sm font-semibold">
          Ihr Vorhaben <span className="font-normal text-[color:var(--steel)]">(optional)</span>
        </label>
        <textarea
          id="silorn-project-details"
          name="projectDetails"
          rows={4}
          maxLength={600}
          className={`${fieldClass} resize-y`}
          placeholder="Was möchten Sie umsetzen?"
        />
      </div>
      <button type="submit" className="mt-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--midnight)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--royal)] sm:justify-self-start">
        E-Mail-Entwurf öffnen <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

export default function Dialogs({ mode, onClose, requestContext }: DialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (!mode) {
      if (element.open) element.close();
      return;
    }
    if (!element.open) element.showModal();
    element.querySelector<HTMLElement>("[data-dialog-focus]")?.focus();
  }, [mode]);

  function followLink() {
    dialog.current?.close();
    onClose();
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby="silorn-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto h-fit max-h-[min(42rem,calc(100dvh_-_2rem))] w-[min(34rem,calc(100%_-_2rem))] overflow-y-auto rounded-[1.5rem] border border-[var(--rule)] bg-white p-0 text-[color:var(--midnight)] shadow-[0_24px_88px_rgba(11,27,54,0.24)] backdrop:bg-[#0b1b36]/35 backdrop:backdrop-blur-[3px]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--rule)] px-5 py-4 sm:px-7">
        <h2 id="silorn-dialog-title" className="m-0 text-xl font-bold tracking-tight">
          {mode === "request" ? "Projektanfrage" : "Schnellsuche"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dialog schließen"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--rule)] text-[color:var(--midnight)] hover:bg-[var(--cool)]"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="m5 5 10 10M15 5 5 15" />
          </svg>
        </button>
      </div>
      {mode === "search" && <Search onNavigate={followLink} />}
      {mode === "request" && <ProjectRequest context={requestContext} />}
    </dialog>
  );
}
