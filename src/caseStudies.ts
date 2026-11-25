type Metric = {
  value: string;
  label: string;
};

type Comparison = {
  label: string;
  before: string;
  after: string;
  effect: string;
};

export type CaseStudy = {
  id: string;
  index: number;
  client: string;
  sector: string;
  year: number;
  title: string;
  subtitle: string;
  image: { src: string; alt: string; position?: string; overlay?: string };
  primaryMetric?: Metric;
  secondaryMetrics?: [Metric, Metric, Metric];
  tags: string[];
  challenge: string;
  architecture: string;
  impact: string[];
  beforeAfter: Comparison[];
  stack: string[];
  kind: "reference" | "concept";
  hiddenFromGallery?: boolean;
  discipline: string;
  requestType: "Webdesign" | "3D-Modellierung & CAD" | "App-Entwicklung" | "KI-Automatisierung";
  link?: { url: string; label: string };
};

// Das Jahr bezeichnet den Stand dieser Projektvorstellung.
export const caseStudies: CaseStudy[] = [
  {
    id: "roft",
    index: 1,
    client: "ROFT",
    sector: "Automobil und Community",
    year: 2026,
    title: "Die Community-App für die Auto- und Tuning-Szene",
    subtitle: "ROFT bringt Auto-, Motorrad- und Tuningfans zusammen. Zeig dein Fahrzeug, entdecke Treffen in deiner Nähe und tausche dich mit der Community aus.",
    image: {
      src: "assets/roft-roter-nachtglanz.webp",
      alt: "ROFT-Logo mit rotem Akzent vor einem nächtlichen Autotreffen",
    },
    tags: [],
    challenge: "Fahrzeugprofile, lokale Treffen und der Austausch unter Fans sollen über dieselbe App erreichbar sein.",
    architecture: "ROFT verbindet eine digitale Garage für Fahrzeugprofile mit einer Übersicht für Treffen in der Nähe und einem Community-Feed. Die App ist im deutschen App Store verfügbar.",
    impact: [
      "Mitglieder können ihre Fahrzeuge in der digitalen Garage präsentieren.",
      "Fahrzeugtreffen lassen sich nach Nähe entdecken.",
      "Beiträge und Gespräche finden im Community-Feed zusammen.",
    ],
    beforeAfter: [
      { label: "Fahrzeuge", before: "Fahrzeugprofile abbilden", after: "Digitale Garage", effect: "Eigene Fahrzeuge zeigen" },
      { label: "Veranstaltungen", before: "Treffen auffindbar machen", after: "Treffen in der Nähe", effect: "Lokale Termine entdecken" },
      { label: "Austausch", before: "Community-Beiträge bündeln", after: "Community-Feed", effect: "Beiträge verfolgen" },
    ],
    stack: ["iOS-App", "App Store", "Projektwebsite"],
    kind: "reference",
    discipline: "App-Entwicklung",
    requestType: "App-Entwicklung",
    link: { url: "https://apps.apple.com/de/app/roft/id6783463007", label: "ROFT im App Store ansehen" },
  },
  {
    id: "primus",
    index: 2,
    client: "PRIMUS Gebäudeservice",
    sector: "Gebäudereinigung",
    year: 2026,
    title: "Vom Reinigungsangebot zur Anfrage",
    subtitle: "Die Firmenwebsite zeigt das Reinigungsangebot in Berlin und Brandenburg und führt auf dem Desktop und dem Smartphone direkt zur Angebotsanfrage.",
    image: {
      src: "assets/primus-digitale-praesenz.webp?v=2",
      alt: "Die schwarz-goldene Website von PRIMUS Gebäudeservice auf einem Laptop und einem Smartphone",
    },
    tags: ["Firmenwebsite", "Desktop & Mobil", "Angebotsanfrage"],
    challenge: "Interessenten sollen schnell erkennen, ob PRIMUS die gewünschte Reinigungsleistung anbietet und in ihrer Region tätig ist.",
    architecture: "Für mein erstes Webdesign-Projekt habe ich den Auftritt von PRIMUS gestaltet und entwickelt. Die Seite bündelt Leistungen und Einsatzgebiete und macht die Angebotsanfrage auch auf dem Smartphone direkt erreichbar.",
    impact: [
      "Ein zentraler Webauftritt stellt das Reinigungsangebot vor.",
      "Berlin und Brandenburg sind als Einsatzgebiete erkennbar.",
      "Die Angebotsanfrage ist Teil des Wegs durch die Website.",
    ],
    beforeAfter: [],
    stack: ["Webdesign", "Responsive Umsetzung", "Leistungsübersicht"],
    kind: "reference",
    discipline: "Webentwicklung",
    requestType: "Webdesign",
    link: { url: "https://primusgebaeudeservice.de/", label: "PRIMUS-Website ansehen" },
  },
  {
    id: "hiram",
    index: 3,
    client: "HIRAM by Memo",
    sector: "Gastronomie",
    year: 2026,
    title: "Ein digitaler Auftritt für HIRAM",
    subtitle: "Eine Restaurantwebsite mit Speisekarte und Anfragebereich – für Gäste auf Smartphone und Desktop.",
    image: {
      src: "assets/hiram-webdesign.webp",
      alt: "HIRAM-Website auf Laptop und Smartphone",
    },
    tags: [],
    challenge: "Das Restaurantangebot soll online leicht zu entdecken sein.",
    architecture: "Die Website präsentiert das Restaurant, die Speisekarte und den Anfragebereich auf mobilen Geräten und am Desktop.",
    impact: ["Das Angebot und die Speisekarte sind online einsehbar."],
    beforeAfter: [],
    stack: ["Webdesign", "Restaurantwebsite"],
    kind: "reference",
    discipline: "Webentwicklung",
    requestType: "Webdesign",
    link: { url: "https://hiram-by-memo-berlin.yunus6529.chatgpt.site/", label: "HIRAM-Website ansehen" },
  },
  {
    id: "doenerkueche",
    index: 4,
    client: "Konzeptstudie",
    sector: "Gastronomie",
    year: 2026,
    title: "Ein Raumkonzept für eine Dönerküche",
    subtitle: "Eine 3D-Visualisierung einer Dönerküche mit Theke, Arbeitsflächen und Küchengeräten.",
    image: {
      src: "assets/doenerkueche-3d.webp?v=2",
      alt: "3D-Visualisierung einer Dönerküche mit Theke und Geräten",
    },
    tags: [],
    challenge: "Die Anordnung einer Gastronomieküche anschaulich darstellen.",
    architecture: "Die Visualisierung zeigt Theke, Arbeitsbereiche und Geräte zusammen in einem Raumkonzept.",
    impact: ["Das Raumkonzept macht die Anordnung der Küche sichtbar."],
    beforeAfter: [],
    stack: ["3D-Modellierung", "Innenraumkonzept"],
    kind: "concept",
    discipline: "3D-Modellierung",
    requestType: "3D-Modellierung & CAD",
    link: { url: "#3d-modellierung", label: "3D-Modellierung entdecken" },
  },
  {
    id: "cad-baugruppe",
    index: 5,
    hiddenFromGallery: true,
    client: "Konzeptstudie",
    sector: "Technische Konstruktion",
    year: 2026,
    title: "Eine Baugruppe für Fertigung und Montage",
    subtitle: "Das Beispiel zeigt, wie aus Skizze und Maßen ein Baugruppenmodell, eine Explosionsansicht und eine bemaßte Zeichnung entstehen.",
    image: {
      src: "assets/case-cad.webp",
      alt: "Technische Konzeptvisualisierung einer Baugruppe mit getrennten Bauteilen",
    },
    primaryMetric: { value: "3", label: "Unterlagen im Beispiel" },
    secondaryMetrics: [
      { value: "1", label: "Baugruppenmodell" },
      { value: "1", label: "Explosionsansicht" },
      { value: "1", label: "Maßzeichnung" },
    ],
    tags: ["3D-Modellierung", "Technische Zeichnung", "Montage"],
    challenge: "Eine Skizze mit Maßen beschreibt die Form. Für die Abstimmung mit Fertigung und Montage braucht es zusätzlich Ansichten, die Bauteile und ihre Lage eindeutig zeigen.",
    architecture: "Das Konzept modelliert die Einzelteile als Baugruppe. Daraus werden eine Explosionsansicht für die Montagereihenfolge und eine bemaßte Zeichnung für die technische Abstimmung abgeleitet.",
    impact: [
      "Das Baugruppenmodell zeigt die Lage der Einzelteile zueinander.",
      "Die Explosionsansicht macht verdeckte Bauteile sichtbar.",
      "Die Zeichnung bündelt relevante Maße für die Abstimmung.",
    ],
    beforeAfter: [
      { label: "Geometrie", before: "Skizze", after: "3D-Baugruppe", effect: "Bauteile räumlich prüfen" },
      { label: "Maße", before: "Einzelmaße", after: "Bemaßte Zeichnung", effect: "Maße nachvollziehen" },
      { label: "Montage", before: "Bauteilliste", after: "Explosionsansicht", effect: "Einbaupositionen erkennen" },
    ],
    stack: ["CAD-Modell", "Explosionsdarstellung", "Technische Zeichnung"],
    kind: "concept",
    discipline: "3D-Modellierung",
    requestType: "3D-Modellierung & CAD",
  },
  {
    id: "ki-anfrage",
    index: 6,
    hiddenFromGallery: true,
    client: "Konzeptstudie",
    sector: "Anfragebearbeitung",
    year: 2026,
    title: "Projektanfragen prüfen und weiterleiten",
    subtitle: "In der Simulation werden eingehende Anfragen auf Projektart und Kontakt geprüft. Bei fehlenden Angaben bereitet der Ablauf eine Rückfrage vor.",
    image: {
      src: "assets/case-automation.webp",
      alt: "Konzeptvisualisierung eines Arbeitsablaufs für eingehende Projektanfragen",
    },
    primaryMetric: { value: "2", label: "Simulierte Ablaufpfade" },
    secondaryMetrics: [
      { value: "2", label: "Eingangskanäle" },
      { value: "2", label: "Geprüfte Angaben" },
      { value: "1", label: "Entscheidungsschritt" },
    ],
    tags: ["KI-Automatisierung", "Klassifizierung", "Weiterleitung"],
    challenge: "Projektanfragen kommen über Formular oder E-Mail. Fehlen Projektart oder Kontaktangabe, muss das Team erst nachfragen.",
    architecture: "Das Beispiel prüft zwei Angaben und verzweigt: Vollständige Anfragen gehen ans Team. Bei fehlenden Angaben bereitet der Ablauf eine gezielte Rückfrage vor.",
    impact: [
      "Das Beispiel macht die Prüfung vom Eingangskanal unabhängig.",
      "Vollständige und unvollständige Anfragen nehmen getrennte Wege.",
      "Eine vorbereitete Rückfrage nennt, welche Angaben fehlen.",
    ],
    beforeAfter: [
      { label: "Anfrageeingang", before: "Formular oder E-Mail", after: "Gemeinsamer Prüfablauf", effect: "Einheitliche Behandlung" },
      { label: "Vollständigkeit", before: "Projektart und Kontakt offen", after: "Zwei Angaben geprüft", effect: "Fehlende Angaben erkennen" },
      { label: "Nächster Schritt", before: "Jede Anfrage einzeln sichten", after: "Weiterleitung oder Rückfrage", effect: "Passenden Schritt vorbereiten" },
    ],
    stack: ["E-Mail und Formular", "Feldprüfung", "Regelbasierte Verzweigung"],
    kind: "concept",
    discipline: "KI-Automatisierung",
    requestType: "KI-Automatisierung",
  },
];
