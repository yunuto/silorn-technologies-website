import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./experience.css";
import Header from "./Header";
import Dialogs from "./Dialogs";
import ReferenceGallery from "./ReferenceGallery";
import ProjectHero from "./ProjectHero";
import ServiceHero from "./ServiceHero";
import StudioHero from "./StudioHero";
import ProjectProcess from "./ProjectProcess";
import ContactForm from "./ContactForm";
import { useSiteReveal } from "./useSiteReveal";

const draft = new URLSearchParams(window.location.search).get("entwurf");
const Hero = draft === "projekt" ? ProjectHero : draft === "leistungen" ? ServiceHero : StudioHero;

function Experience({ heroTarget, referencesTarget }: { heroTarget: HTMLElement; referencesTarget: HTMLElement }) {
  useSiteReveal();
  const [mode, setMode] = useState<"search" | "request" | null>(null);
  const onSearch = useCallback(() => setMode("search"), []);
  const onClose = useCallback(() => {
    setMode(null);
  }, []);

  useEffect(() => {
    function openShortcut(event: KeyboardEvent) {
      if (!(event.metaKey || event.ctrlKey) || event.altKey || event.key.toLowerCase() !== "k") return;
      event.preventDefault();
      onSearch();
    }
    window.addEventListener("keydown", openShortcut);
    return () => window.removeEventListener("keydown", openShortcut);
  }, [onSearch]);

  return (
    <>
      <Header />
      {createPortal(<Hero />, heroTarget)}
      {createPortal(<ReferenceGallery />, referencesTarget)}
      {processTarget && createPortal(<ProjectProcess />, processTarget)}
      {contactTarget && createPortal(<ContactForm />, contactTarget)}
      <Dialogs mode={mode} onClose={onClose} requestContext={null} />
    </>
  );
}

const headerTarget = document.getElementById("silorn-header");
const heroTarget = document.getElementById("silorn-hero");
const referencesTarget = document.getElementById("projekte");
const processTarget = document.getElementById("ablauf");
const contactTarget = document.getElementById("silorn-contact-form");
if (headerTarget && heroTarget && referencesTarget) {
  createRoot(headerTarget).render(<Experience heroTarget={heroTarget} referencesTarget={referencesTarget} />);
}
