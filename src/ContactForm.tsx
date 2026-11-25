import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { heroServices } from "./heroServices";
import "./contact-form.css";

function serviceFromHash() {
  return heroServices.find(({ href }) => href === window.location.hash)?.name;
}

export default function ContactForm() {
  const [service, setService] = useState(() => serviceFromHash() ?? "");

  useEffect(() => {
    function selectService() {
      const fromHash = serviceFromHash();
      if (fromHash) setService(fromHash);
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
      <div className="contact-form-fields">
        <label>
          <span>Dein Name</span>
          <input name="name" autoComplete="name" maxLength={100} pattern=".*\S.*" required />
        </label>
        <label>
          <span>E-Mail-Adresse</span>
          <input type="email" name="email" autoComplete="email" maxLength={254} required />
        </label>
        <label className="contact-form-wide">
          <span>Projektart</span>
          <select name="service" value={service} onChange={(event) => {
            setService(event.currentTarget.value);
            if (serviceFromHash()) window.history.replaceState(window.history.state, "", "#kontakt");
          }} required>
            <option value="" disabled>Projektart auswählen</option>
            {heroServices.map(({ name }) => <option key={name}>{name}</option>)}
            <option>Noch offen</option>
          </select>
        </label>
        <label className="contact-form-wide">
          <span>Dein Vorhaben</span>
          <textarea name="brief" rows={4} maxLength={600} placeholder="Worum geht es bei deinem Projekt?" required />
        </label>
      </div>
      <div className="contact-form-submit">
        <button type="submit" aria-describedby="contact-form-hint">E-Mail vorbereiten <ArrowUpRight size={18} aria-hidden="true" /></button>
        <small id="contact-form-hint">Dein E-Mail-Programm öffnet sich mit einem Entwurf, den du dort abschicken kannst.</small>
      </div>
    </form>
  );
}
