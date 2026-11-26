import { useEffect, useState, type FormEvent, type MouseEvent } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { heroServices } from "./heroServices";
import "./contact-form.css";

function serviceFromHash() {
  return heroServices.find(({ href }) => href === window.location.hash)?.name;
}

export default function ContactForm() {
  const [service, setService] = useState(() => serviceFromHash() ?? "");
  const [estimate, setEstimate] = useState<{ minimum: number; maximum: number; complexity: string; reason: string } | null>(null);
  const [estimating, setEstimating] = useState(false);
  const [estimateError, setEstimateError] = useState("");

  async function estimateCost(event: MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!form) return;
    const fields = new FormData(form);
    const brief = String(fields.get("brief") ?? "").trim();
    setEstimate(null);
    if (!service || service === "Noch offen" || brief.length < 30) {
      setEstimateError("Bitte wähle eine Projektart und beschreibe dein Vorhaben mit mindestens 30 Zeichen.");
      return;
    }
    setEstimateError("");
    setEstimating(true);
    const inputIsCurrent = () => {
      const currentFields = new FormData(form);
      return currentFields.get("service") === service && String(currentFields.get("brief") ?? "").trim() === brief;
    };
    try {
      const response = await fetch("https://silorn-kostenrechner.yunus6529.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, brief }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Die Schätzung ist gerade nicht verfügbar.");
      if (!Number.isFinite(data.minimum) || !Number.isFinite(data.maximum) || typeof data.reason !== "string") {
        throw new Error("Die Schätzung ist gerade nicht verfügbar.");
      }
      if (inputIsCurrent()) setEstimate(data);
    } catch (error) {
      if (inputIsCurrent()) {
        const message = error instanceof Error && !["TimeoutError", "SyntaxError", "TypeError"].includes(error.name)
          ? error.message : "Die Schätzung ist gerade nicht verfügbar. Bitte versuche es später erneut.";
        setEstimateError(message);
      }
    } finally {
      setEstimating(false);
    }
  }

  useEffect(() => {
    function selectService() {
      const fromHash = serviceFromHash();
      if (fromHash) {
        setService(fromHash);
        setEstimate(null);
        setEstimateError("");
      }
    }
    window.addEventListener("hashchange", selectService);
    return () => window.removeEventListener("hashchange", selectService);
  }, []);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const service = String(fields.get("service") ?? "");
    const brief = String(fields.get("brief") ?? "").trim();
    const draft = new URLSearchParams({
      subject: `Projektanfrage: ${service}`,
      body: `Name: ${name}\r\nE-Mail: ${email}\r\nProjektart: ${service}\r\n\r\n${brief.replace(/\r?\n/g, "\r\n")}`,
    });
    window.location.href = `mailto:business@silorn-technologies.de?${draft.toString().replace(/\+/g, "%20")}`;
  }

  return (
    <form className="contact-form" aria-labelledby="contact-title" onSubmit={prepareEmail}>
      <div className="contact-form-heading"><h3>Dein Projekt</h3></div>
      <div className="contact-form-fields">
        <label>
          <span>Dein Name</span>
          <input name="name" autoComplete="name" maxLength={100} pattern=".*\S.*" placeholder="Vor- und Nachname" required />
        </label>
        <label>
          <span>E-Mail-Adresse</span>
          <input type="email" name="email" autoComplete="email" maxLength={254} placeholder="name@beispiel.de" required />
        </label>
        <label className="contact-form-wide">
          <span>Projektart</span>
          <select name="service" value={service} onChange={(event) => {
            setService(event.currentTarget.value);
            setEstimate(null);
            setEstimateError("");
            if (serviceFromHash()) window.history.replaceState(window.history.state, "", "#kontakt");
          }} required>
            <option value="" disabled>Projektart auswählen</option>
            {heroServices.map(({ name }) => <option key={name}>{name}</option>)}
            <option>Shopify-Onlineshop</option>
            <option>Noch offen</option>
          </select>
        </label>
        <label className="contact-form-wide">
          <span>Dein Vorhaben</span>
          <textarea name="brief" rows={4} maxLength={1500} placeholder="Was möchtest du umsetzen? Welche Funktionen sind dir wichtig?" onChange={() => { setEstimate(null); setEstimateError(""); }} required />
        </label>
      </div>
      <div className="contact-estimate">
        <button className="contact-estimate-button" type="button" onClick={estimateCost} disabled={estimating}><Sparkles size={17} aria-hidden="true" /> {estimating ? "Wird eingeschätzt …" : "Kosten mit KI einschätzen"}</button>
        <small>Für die Schätzung gehen Projektart und Beschreibung an Cloudflare Workers AI. Lass vertrauliche Angaben bitte weg.</small>
        {estimateError && <p className="contact-estimate-error" role="alert">{estimateError}</p>}
        {estimate && <div className="contact-estimate-result" role="status"><span>Unverbindliche Orientierung · {estimate.complexity}</span><strong>{estimate.minimum.toLocaleString("de-DE")} – {estimate.maximum.toLocaleString("de-DE")} €</strong><p>{estimate.reason}</p><small>Die tatsächlichen Kosten hängen vom genauen Umfang ab und werden persönlich besprochen.</small></div>}
      </div>
      <div className="contact-form-submit">
        <button type="submit" aria-describedby="contact-form-hint">E-Mail vorbereiten <ArrowUpRight size={18} aria-hidden="true" /></button>
        <small id="contact-form-hint">Dein E-Mail-Programm öffnet sich mit einem Entwurf, den du dort abschicken kannst.</small>
      </div>
    </form>
  );
}
