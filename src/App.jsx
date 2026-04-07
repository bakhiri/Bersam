import { useState, useEffect, useMemo, useRef } from "react";

// ─── Utilities ──────────────────────────────────────────────────────────────
export const classNames = (...classes) => classes.filter(Boolean).join(" ");

// ─── Hook: Reveal on scroll ──────────────────────────────────────────────────
function useRevealOnScroll(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
}

// ─── Hook: Hash-based router ─────────────────────────────────────────────────
function useHashPath() {
  const getPath = () => {
    const hash = window.location.hash || "#/";
    const path = hash.startsWith("#") ? hash.slice(1) : hash;
    return path || "/";
  };
  const [path, setPath] = useState(getPath);
  useEffect(() => {
    const onHashChange = () => setPath(getPath());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return path;
}

// ─── Floating shapes background ─────────────────────────────────────────────
export function createShapes() {
  const shapes = ["circle", "triangle", "square", "hexagon"];
  const numShapes = 10;
  if (!document.querySelector("#scale-keyframe")) {
    const style = document.createElement("style");
    style.id = "scale-keyframe";
    style.textContent = `
      @keyframes scale {
        0%   { transform: scale(1); }
        100% { transform: scale(1.05); }
      }
    `;
    document.head.appendChild(style);
  }
  for (let i = 0; i < numShapes; i++) {
    const shape = document.createElement("div");
    shape.classList.add(
      "shape",
      shapes[Math.floor(Math.random() * shapes.length)],
    );

    const size = Math.random() * 30 + 15;
    if (
      shape.classList.contains("circle") ||
      shape.classList.contains("square")
    ) {
      shape.style.width = size + "px";
      shape.style.height = size + "px";
    } else if (shape.classList.contains("triangle")) {
      shape.style.borderBottomWidth = size / 1.75 + "px";
      shape.style.borderLeftWidth = size / 2 + "px";
      shape.style.borderRightWidth = size / 2 + "px";
    } else if (shape.classList.contains("hexagon")) {
      shape.style.width = size * 1.5 + "px";
      shape.style.height = size + "px";
    }

    shape.style.left = Math.random() * 100 + "%";
    shape.style.top = Math.random() * 100 + "%";

    const delay = Math.random() * 25;
    const duration = 20 + Math.random() * 20;
    shape.style.animationDelay = delay + "s";
    shape.style.animationDuration = duration + "s";

    if (Math.random() > 0.7) {
      shape.style.animation += ", scale 5s ease-in-out infinite alternate";
    }

    const container = document.getElementById("shapes-container");
    if (container) container.appendChild(shape);
  }
}

// ─── Shared image data ───────────────────────────────────────────────────────
const IMAGES = [
  {
    id: 2,
    tag: "bersam",
    category: "prestige",
    src: "photos/Bersam/Villa_Luxe_3.jpg",
    alt: "Villa d'Uzès : Électricité Générale & Automatisme",
    desc: "Villa à Uzès : Installation Électrique Complète. BERSAM a réalisé l'intégralité des travaux d'électricité pour cette villa. Le projet incluait notamment l'installation électrique générale, l'intégration d'une piscine à température régulable et la mise en place d'un portail automatisé. Ce succès met en lumière notre expertise à livrer des installations clés en main, assurant performance et fiabilité pour des projets résidentiels haut de gamme.",
  },
  {
    id: 5,
    tag: "bersam",
    category: "tertiaire",
    src: "photos/Bersam/TechnirelLaCiotat.jpg",
    alt: "Locaux Technirel : Installation Technique Globale",
    desc: "Locaux de l'entreprise Technirel : Installation Globale (Électricité, Courants Forts et Faibles). BERSAM a réalisé l'intégralité des installations dans les locaux de l'entreprise Technirel. Ce projet global englobait la rénovation électrique complète, l'installation de la baie informatique, et la mise en place de l'ensemble des courants faibles structurés (réseau, sécurité, etc.). Il témoigne de notre capacité à gérer des chantiers complexes, garantissant l'intégration parfaite de tous les systèmes techniques pour un environnement professionnel optimal.",
  },
  {
    id: 8,
    tag: "bersam",
    category: "tertiaire",
    src: "photos/Bersam/chausssoncler.jpg",
    alt: "Usine : Distribution Électrique Industrielle",
    desc: "Usine Chausson : Installation Électrique Complète. Nous avons réalisé l'intégralité du chantier électrique de cette unité de production à Clermont-l'Hérault. Le projet comprenait la pose d'armoires de distribution haute puissance, le câblage industriel des machines et l'éclairage des zones de stockage. Ce succès démontre notre expertise à concevoir des solutions robustes et sécurisées, adaptées aux contraintes techniques et à la productivité du secteur industriel.",
  },
  {
    id: 13,
    tag: "bersam",
    category: "prestige",
    src: "photos/Bersam/1.jpg",
    alt: "Cinéma Privé : Création d'Ambiance Lumineuse",
    desc: "Cinéma Privé : Ingénierie Sensorielle Complète\nBERSAM a assuré la conception et la réalisation intégrale de ce cinéma privé. De la puissance du système sonore à la précision de la vidéoprojection, chaque élément a été orchestré pour une immersion totale. Ce projet illustre notre savoir-faire global : transformer un espace par une intégration technologique sur mesure, où l'acoustique, l'image et l'ambiance lumineuse s'unissent pour créer une expérience cinématographique unique.",
  },
  {
    id: 14,
    tag: "bersam",
    category: "tertiaire",
    src: "photos/Bersam/hall.jpg",
    alt: "Parking Avignon : Système de Vidéosurveillance",
    desc: "Parking des Halles d'Avignon : Installation de Vidéosurveillance. BERSAM a mis en place l'intégralité des systèmes de vidéosurveillance pour le parking des Halles à Avignon. Ce dispositif assure la sécurité des lieux et des usagers. Ce projet souligne notre rigueur en matière de sécurité, déployant des solutions de surveillance robustes et conformes pour protéger efficacement les infrastructures publiques.",
  },
  {
    id: 15,
    tag: "bersam",
    category: "tertiaire",
    src: "photos/Bersam/bse.jpg",
    alt: "Entreprise BSE : Installation Photovoltaïque",
    desc: "Entreprise BSE : Installation de Panneaux Photovoltaïques. BERSAM a procédé à l'installation de panneaux solaires (photovoltaïque) pour l'entreprise BSE. Ce projet contribue à leur autonomie énergétique et à la transition écologique. Ce succès affirme notre rôle dans la transition énergétique, en fournissant à nos partenaires des solutions photovoltaïques fiables et durables pour optimiser leur production d'électricité.",
  },
  {
    id: 16,
    tag: "bersam",
    category: "renovations",
    src: "photos/Bersam/eglise.jpg",
    alt: "Église de Rognonas : Rénovation Lumière et Son",
    desc: "Église de Rognonas : Rénovation des Systèmes de Lumière et Sonore. BERSAM a entièrement rénové les systèmes d'éclairage et de sonorisation de cette église. Nous avons conçu et installé une solution moderne et adaptée pour mettre en valeur l'architecture et assurer une acoustique optimale lors des cérémonies. Ce chantier démontre notre finesse technique au service du patrimoine, où la précision de la lumière et du son améliore l'expérience du lieu.",
  },
  {
    id: 17,
    tag: "bersam",
    category: "tertiaire",
    src: "photos/Bersam/gymnase.jpg",
    alt: "Gymnase : Infrastructure Électrique & Éclairage Sportif",
    desc: "Gymnase : Installation Électrique Complète. Nous avons réalisé l'intégralité des travaux d'électricité pour ce complexe sportif. Le projet incluait notamment le déploiement de l'armoire de distribution générale, le câblage de puissance et la mise en place d'un système d'éclairage LED haute performance. Ce succès met en lumière notre expertise à livrer des installations clés en main, assurant performance et confort pour des infrastructures sportives modernes.",
  },
  {
    id: 18,
    tag: "bersam",
    category: "tertiaire",
    src: "photos/Bersam/arsilac.jpeg",
    alt: "Arsilac : Infrastructure Électrique & Maintenance Industrielle",
    desc: "Arsilac : Installation Électrique Complète. Nous avons réalisé l'intégralité du chantier électrique de ce site industriel situé à Monteux. Le projet comprenait la mise en place d'armoires de distribution de forte puissance, le câblage des équipements de production et l'installation d'un éclairage haute performance pour les zones techniques. Ce succès confirme notre savoir-faire à livrer des infrastructures robustes et sécurisées, adaptées aux exigences de fiabilité du secteur industriel.",
  },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────
const Lightbox = ({ isOpen, onClose, src, alt }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center lightbox-backdrop"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
        loading="eager"
      />
      <button
        className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-md px-3 py-1"
        onClick={onClose}
        aria-label="Fermer la lightbox"
      >
        Fermer
      </button>
    </div>
  );
};

// ─── Mentions Légales Modal ──────────────────────────────────────────────────
const MentionsLegalesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center lightbox-backdrop overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-sm shadow-2xl max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-graphite text-white px-8 py-6 flex items-center justify-between">
          <h2 className="font-display text-2xl">Mentions Légales</h2>
          <button
            className="text-2xl leading-none hover:text-bersam-primary transition-colors"
            onClick={onClose}
            aria-label="Fermer les mentions légales"
          >
            ✕
          </button>
        </div>
        <div className="px-8 py-6 text-graphite">
          <h3 className="text-xl font-display font-bold mb-3 mt-4">
            Éditeur du site
          </h3>
          <p className="mb-4">
            <strong style={{ color: "#c9d346" }}>BERSAM</strong> - SAS
            d'électricité générale
          </p>
          <h3 className="text-xl font-display font-bold mb-3 mt-4">Contact</h3>
          <p className="mb-2">
            <strong style={{ color: "#c9d346" }}>Adresse e-mail :</strong>{" "}
            contact@bersam.com
          </p>
          <p className="mb-2">
            <strong style={{ color: "#c9d346" }}>Téléphone :</strong>{" "}
            04.90.14.11.41
          </p>
          <p className="mb-2">
            <strong style={{ color: "#c9d346" }}>Adresse :</strong> 335 rue des
            Joncs des bois, 84000 AVIGNON
          </p>
          <p className="mb-2">
            <strong style={{ color: "#c9d346" }}>Forme juridique :</strong> SAS,
            société par actions simplifiée
          </p>
          <p className="mb-2">
            <strong style={{ color: "#c9d346" }}>Capital social :</strong>{" "}
            7622,45€
          </p>
          <p className="mb-2">
            <strong style={{ color: "#c9d346" }}>SIRET :</strong> 350 720 413
          </p>
          <p className="mb-4">
            <strong style={{ color: "#c9d346" }}>TVA :</strong> FR20350720413
          </p>
          <h3 className="text-xl font-display font-bold mb-3 mt-4">
            Hébergement
          </h3>
          <p className="mb-2">
            <strong style={{ color: "#c9d346" }}>Hébergeur :</strong> OVH
          </p>
          <p className="mb-4">
            <strong style={{ color: "#c9d346" }}>Adresse :</strong> 2, rue
            Kellermann, 59100 Roubaix, FRANCE
          </p>
          <h3 className="text-xl font-display font-bold mb-3 mt-4">
            Propriété intellectuelle
          </h3>
          <p className="mb-4 text-sm leading-relaxed">
            L'ensemble de ce site relève de la législation française et
            internationale sur le droit d'auteur et la propriété intellectuelle.
            Tous les droits de reproduction sont réservés. La reproduction de
            tout ou partie de ce site est formellement interdite sans
            autorisation expresse.
          </p>
          <h3 className="text-xl font-display font-bold mb-3 mt-4">
            Données personnelles
          </h3>
          <p className="mb-4 text-sm leading-relaxed">
            Conformément au RGPD, vous disposez d'un droit d'accès, de
            rectification et de suppression des données vous concernant.
            Veuillez nous contacter à contact@bersam.com.
          </p>
          <h3 className="text-xl font-display font-bold mb-3 mt-4">
            Limitation de responsabilité
          </h3>
          <p className="text-sm leading-relaxed">
            BERSAM s'efforce d'assurer l'exactitude des informations publiées.
            Cependant, elle ne peut garantir l'absence d'erreurs. BERSAM se
            réserve le droit de modifier le contenu sans préavis.
          </p>
        </div>
        <div className="px-8 py-4 border-t border-graphite/10 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-bersam-primary text-graphite font-semibold rounded-sm hover:opacity-90 transition-opacity"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Reusable components ─────────────────────────────────────────────────────
const Logo = ({ src, alt, className = "" }) => (
  <img
    src={src}
    alt={alt}
    className={classNames("block w-auto object-contain", className)}
  />
);

const GlowButton = ({ children, onClick, variant = "primary", href }) => {
  const base =
    "inline-flex items-center justify-center rounded-sm px-6 py-3 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-60";
  const styles =
    variant === "secondary"
      ? "bg-graphite text-cream hover:bg-graphite/90 border border-graphite"
      : "bg-bersam-primary text-graphite hover:bg-bersam-primary/90 border border-bersam-primary";
  const Comp = href ? "a" : "button";
  const props = href ? { href } : { onClick };
  return (
    <Comp {...props} className={classNames(base, styles)}>
      {children}
    </Comp>
  );
};

const SectionHeader = ({ kicker, title, subtitle, gradient = "bersam" }) => (
  <div className="mb-12">
    <div
      className={classNames(
        "inline-block rounded-xs px-3 py-1 text-xs font-semibold mb-4 uppercase tracking-wider",
        "bg-bersam-primary/15 text-graphite border border-bersam-primary/30",
      )}
    >
      {kicker}
    </div>
    <h2 className="font-display font-bold text-5xl lg:text-6xl tracking-tight text-graphite mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-graphite/70 text-base lg:text-lg leading-relaxed max-w-2xl">
        {subtitle}
      </p>
    )}
  </div>
);

const Card = ({
  children,
  accent = "bersam",
  hoverAccent = true,
  className,
}) => (
  <div
    className={classNames(
      "group relative overflow-hidden rounded-sm bg-white border border-graphite/10 p-6 transition-all duration-300 shadow-soft hover:shadow-architectural",
      hoverAccent && "hover:border-bersam-primary/40",
      className,
    )}
  >
    {children}
  </div>
);

const ServiceCard = ({ title, description, icon, accent = "bersam" }) => (
  <Card accent={accent}>
    <div className="flex items-start gap-4">
      <div
        className={classNames(
          "h-12 w-12 rounded-xs flex items-center justify-center border border-bersam-primary/30 bg-bersam-primary/10 text-bersam-primary flex-shrink-0",
        )}
      >
        <span className="text-xl" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div>
        <h3 className="font-semibold text-lg text-graphite">{title}</h3>
        <p className="mt-1 text-graphite/70 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </Card>
);

const Stat = ({ value, label }) => (
  <div className="text-center p-4 rounded-sm border border-graphite/10 bg-white shadow-soft">
    <div className="text-3xl font-bold text-graphite">{value}</div>
    <div className="text-graphite/70 mt-1">{label}</div>
  </div>
);

// ─── Page: Réalisation detail ────────────────────────────────────────────────
// Bug B fix: replaced all dark-theme classes (text-white/80, bg-white/5, border-white/10)
//            with light-theme equivalents (text-graphite/80, bg-graphite/5, border-graphite/10)
function RealisationDetail() {
  const path = useHashPath();
  const segments = path.split("/").filter(Boolean);
  const id = Number(segments[1]);
  const item = IMAGES.find((i) => i.id === id);

  if (!item) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Réalisation introuvable</h1>
          <p className="text-textDim mb-6">
            L'élément demandé n'existe pas ou a été déplacé.
          </p>
          <div className="flex gap-3 justify-center">
            <GlowButton variant="primary" href="#/">
              Retour à l'accueil
            </GlowButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8">
          {/* Bug B fix: was text-white/80 bg-white/5 border-white/10 */}
          <div className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4 bg-graphite/5 border border-graphite/10 text-graphite/80">
            {item.tag === "bersam" ? "BERSAM" : "Projet"}
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight mb-3 text-graphite">
            {item.alt}
          </h1>
          {item.desc && (
            <p className="text-textDim text-base lg:text-lg leading-relaxed max-w-3xl">
              {item.desc}
            </p>
          )}
        </div>
        {/* Bug B fix: was border-white/10 bg-white/5 */}
        <div className="overflow-hidden rounded-xl border border-graphite/10 bg-white">
          <img
            src={item.src}
            alt={item.alt}
            className={`w-full max-h-[70vh] object-cover ${item.id === 12 ? "scale-125" : ""}`}
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <GlowButton
            variant={item.tag === "bersam" ? "primary" : "secondary"}
            href="#/"
          >
            Retour à l'accueil
          </GlowButton>
          {item.tag && (
            <GlowButton
              variant={item.tag === "bersam" ? "primary" : "secondary"}
              href={`#/${item.tag}`}
            >
              Voir {item.tag.toUpperCase()}
            </GlowButton>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ links }) {
  const path = useHashPath();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <nav className="fixed top-0 w-full backdrop-blur-sm bg-graphite border-b border-graphite/10 text-white z-50 shadow-architectural">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative flex h-[84px] items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo
              src="photos/logo white avec bande jaune.svg"
              alt="Logo BERSAM"
              className="h-28 w-28 md:h-32 md:w-32 self-center"
            />
          </div>
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.to}
                href={`#${l.to}`}
                className={classNames(
                  "text-lg font-semibold transition-all duration-300 relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:transition-all after:duration-300",
                  path === l.to
                    ? "text-white after:bg-bersam-primary after:w-full"
                    : "text-white/70 hover:text-bersam-primary after:bg-bersam-primary after:w-0 hover:after:w-full",
                )}
              >
                {l.label}
              </a>
            ))}
          </div>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-xs p-3 hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu de navigation"
            aria-expanded={open}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.to}
                  href={`#${l.to}`}
                  className={classNames(
                    "px-2 py-2 rounded-xs hover:bg-white/10 hover:text-bersam-primary text-base transition-colors",
                    path === l.to
                      ? "text-white font-semibold"
                      : "text-white/70",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const heroRef = useRef(null);
  const [showCTAs, setShowCTAs] = useState(true);

  useEffect(() => {
    if (!heroRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setShowCTAs(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section
        id="accueil"
        ref={heroRef}
        className="relative min-h-[calc(100vh-64px)] flex flex-col items-center pt-16 sm:pt-20 md:pt-28"
      >
        <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none" />

        <div className="w-full flex justify-center items-center mt-4 sm:mt-6 md:mt-8 px-4">
          <div className="w-full max-w-[700px] md:max-w-[900px] aspect-[16/9] bg-white/5 rounded-lg mx-auto overflow-hidden relative">
            <HeroSlideshow />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Logo
                src="photos/logo white avec bande jaune.svg"
                alt="Logo BERSAM"
                className="h-32 sm:h-36 md:h-44 lg:h-52 w-auto drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {showCTAs && (
          <div className="mt-4 sm:mt-5 md:mt-6 pointer-events-auto px-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#/tertiaire"
                className="inline-flex items-center px-6 sm:px-8 py-3 bg-bersam-primary text-graphite font-semibold rounded-lg hover:bg-bersam-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Découvrir nos projets
              </a>
              <a
                href="#/contact"
                className="inline-flex items-center px-6 sm:px-8 py-3 bg-graphite text-white font-semibold rounded-lg hover:bg-graphite/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Nous contacter
              </a>
            </div>
            <a
              href="#section-suivante"
              className="scroll-indicator hidden sm:grid place-items-center mt-2"
              aria-label="Scroller vers le bas"
            >
              <svg
                className="scroll-arrow"
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{ width: "34px", height: "34px", fill: "#000" }}
              >
                <path d="M12 16.5l-7-7 1.4-1.4L12 13.7l5.6-5.6L19 9.5l-7 7z" />
              </svg>
            </a>
          </div>
        )}

        <div className="text-center max-w-3xl relative z-20 mt-6 sm:mt-8 md:mt-10 pt-0 px-4">
          <p className="text-2xl md:text-3xl font-display font-semibold text-graphite mb-3">
            Réactivité • Expertise
          </p>
          <p className="mt-4 text-textDim text-base lg:text-lg leading-relaxed text-center">
            BERSAM prend en charge vos installations courants forts, courants
            faibles et communication IP, de la conception au support technique,
            pour une infrastructure performante et sécurisée.
          </p>
        </div>
      </section>
    </>
  );
}

// ─── HeroSlideshow ───────────────────────────────────────────────────────────
function HeroSlideshow() {
  const bersamImages = IMAGES.filter((i) => i.tag === "bersam");
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (bersamImages.length <= 1) return;
    if (paused) return;
    const t = setInterval(
      () => setIdx((i) => (i + 1) % bersamImages.length),
      3500,
    );
    return () => clearInterval(t);
  }, [bersamImages.length, paused]);

  const handlePrev = () => {
    setPaused(true);
    setIdx((i) => (i - 1 + bersamImages.length) % bersamImages.length);
  };
  const handleNext = () => {
    setPaused(true);
    setIdx((i) => (i + 1) % bersamImages.length);
  };

  if (!bersamImages.length) {
    return <div className="text-textDim">Aucune image BERSAM trouvée</div>;
  }

  const current = bersamImages[idx];
  return (
    <a
      href={`#/realisation/${current.id}`}
      className="absolute inset-0 w-full h-full block cursor-pointer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <img
        key={current.id}
        src={current.src}
        alt={current.alt}
        className="w-full h-full object-cover rounded-lg slide-fade"
        loading="eager"
      />
      <div className="absolute left-3 bottom-3 bg-black/40 text-white text-xs px-2 py-1 rounded">
        {current.alt}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePrev();
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
        aria-label="Image précédente"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleNext();
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
        aria-label="Image suivante"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </a>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  const { ref, visible } = useRevealOnScroll();
  return (
    <section id="presentation" ref={ref} className="pt-20 pb-40">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={classNames(
            "transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <SectionHeader
            kicker="BERSAM"
            title="Votre partenaire local depuis 1989"
            gradient="bersam"
          />
          <div className="mb-8">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 leading-relaxed text-sm text-textDim">
              <p className="mb-2">
                <span className="font-semibold text-bersam-primary">
                  Depuis 1989
                </span>
                , BERSAM accompagne entreprises et particuliers d'Avignon dans
                leurs projets électriques.
              </p>
              <p className="mb-2">
                BERSAM réalise vos installations électriques, solutions de
                sécurité et projets photovoltaïques, avec un bureau d'études
                intégré pour un suivi sur mesure.
              </p>
              <p className="mb-0">
                Une expertise locale pour des solutions fiables et
                personnalisées en électricité et réseaux.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Stat value="35+" label="Années d'expérience" />
            <Stat value="300+" label="Projets livrés" />
            <Stat value="200+" label="Clients accompagnés" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BERSAM section ──────────────────────────────────────────────────────────
function BERSAM() {
  const { ref, visible } = useRevealOnScroll();
  const expertises = useMemo(
    () => [
      {
        title: "Électricité générale",
        icon: "⚡",
        description: "Installation et maintenance pour tous types de locaux.",
      },
      {
        title: "Automatismes industriels",
        icon: "🏭",
        description:
          "Gestion technique et programmation pour optimiser vos processus.",
      },
      {
        title: "Sécurité électronique",
        icon: "🔐",
        description: "Protection et surveillance de vos sites sensibles.",
      },
      {
        title: "Réseaux informatiques",
        icon: "🌐",
        description: "Câblage structuré et connectivité haute performance.",
      },
      {
        title: "Télécom",
        icon: "📡",
        description: "Réseaux et systèmes de communication IP.",
      },
      {
        title: "Bureau d'études intégré",
        icon: "📐",
        description:
          "Notes de calcul, conception, analyse technique, suivi de projet.",
      },
    ],
    [],
  );
  return (
    <section id="bersam" ref={ref} className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Logo
              src="photos/logo black.svg"
              alt="Logo BERSAM"
              className="h-16 w-16 md:h-20 md:w-20 self-center ml-2 md:ml-3"
            />
            <div className="h-6 w-px bg-white/10" />
            <span className="text-textDim text-sm">électricité</span>
          </div>
          <SectionHeader
            kicker="BERSAM"
            title="L'électricité au service de votre performance"
            subtitle="Des solutions électriques sur mesure pour votre activité"
            gradient="bersam"
          />
        </div>
        <div
          className={classNames(
            "grid gap-4 md:grid-cols-2 lg:grid-cols-3 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          {expertises.map((e) => (
            <ServiceCard
              key={e.title}
              title={e.title}
              description={e.description}
              icon={e.icon}
              accent="bersam"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery (home page) ─────────────────────────────────────────────────────
// a11y fix: added aria-pressed to all filter buttons.
function Gallery() {
  const { ref, visible } = useRevealOnScroll();
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });

  const images = useMemo(() => IMAGES, []);
  const filtered = images.filter(
    (img) => filter === "all" || img.tag === filter,
  );

  return (
    <section id="realisations" ref={ref} className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          kicker="Réalisations"
          title="Une sélection de projets"
          subtitle="Découvrez quelques projets représentatifs de nos différents domaines d'intervention."
          gradient="bersam"
        />
        <div className="flex flex-wrap gap-3 mb-8">
          {/* a11y: aria-pressed reflects the current active filter */}
          <button
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
            className={classNames(
              "px-4 py-2 rounded-md border text-sm transition-all",
              filter === "all"
                ? "border-white/30 bg-white/10"
                : "border-white/10 hover:bg-white/10",
            )}
          >
            Tout
          </button>
          <button
            onClick={() => setFilter("bersam")}
            aria-pressed={filter === "bersam"}
            className={classNames(
              "px-4 py-2 rounded-md border text-sm transition-all",
              filter === "bersam"
                ? "border-bersam-primary/40 bg-bersam-primary/10 text-bersam-accent"
                : "border-white/10 hover:bg-white/10",
            )}
          >
            BERSAM
          </button>
        </div>
        <div
          className={classNames(
            "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          {filtered.map((img) => (
            <div
              key={img.id}
              className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5"
            >
              <div className="group">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full h-80 object-cover transition-transform duration-500 ${
                    img.id === 12 ? "scale-125" : "group-hover:scale-[1.03]"
                  }`}
                  style={
                    img.id === 1 ? { objectPosition: "50% 30%" } : undefined
                  }
                  onClick={() =>
                    setLightbox({ open: true, src: img.src, alt: img.alt })
                  }
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-3 border-t border-white/10">
                <h4 className="text-base font-semibold mb-2">{img.alt}</h4>
                <p className="text-sm text-textDim">{img.desc || "Projet"}</p>
              </div>
            </div>
          ))}
        </div>
        <Lightbox
          isOpen={lightbox.open}
          onClose={() => setLightbox({ open: false, src: "", alt: "" })}
          src={lightbox.src}
          alt={lightbox.alt}
        />
      </div>
    </section>
  );
}

// ─── Category galleries (BERSAM sub-pages) ───────────────────────────────────
const createCategoryGallery = (category, title, kicker) => {
  function CategoryGallery() {
    const { ref, visible } = useRevealOnScroll();
    const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });

    const images = useMemo(
      () =>
        IMAGES.filter(
          (img) => img.tag === "bersam" && img.category === category,
        ),
      [],
    );

    return (
      <section id="realisations" ref={ref} className="py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            kicker={kicker}
            title={title}
            subtitle="Découvrez quelques projets représentatifs de nos différents domaines d'intervention."
            gradient="bersam"
          />
          <div
            className={classNames(
              "grid gap-8 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            {images.map((img) => (
              <div
                key={img.id}
                className="relative overflow-hidden rounded-sm border border-graphite/10 bg-white shadow-soft hover:shadow-architectural transition-all duration-300 cursor-pointer group"
              >
                <div className="overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    style={
                      img.id === 1 ? { objectPosition: "50% 30%" } : undefined
                    }
                    onClick={() =>
                      setLightbox({ open: true, src: img.src, alt: img.alt })
                    }
                  />
                </div>
                <div className="p-6 border-t border-graphite/10">
                  <h4 className="text-base font-semibold mb-2 text-graphite group-hover:text-bersam-primary transition-colors duration-300">
                    {img.alt}
                  </h4>
                  <p className="text-sm text-graphite/70">
                    {img.desc || "Projet"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Lightbox
            isOpen={lightbox.open}
            onClose={() => setLightbox({ open: false, src: "", alt: "" })}
            src={lightbox.src}
            alt={lightbox.alt}
          />
        </div>
      </section>
    );
  }
  return CategoryGallery;
};

const TertiaryGallery = createCategoryGallery(
  "tertiaire",
  "Projets Tertiaire",
  "Tertiaire",
);
const RenovationsGallery = createCategoryGallery(
  "renovations",
  "Projets Rénovations",
  "Rénovations",
);
const PrestigeGallery = createCategoryGallery(
  "prestige",
  "Projets Prestige",
  "Prestige",
);

// ─── ContactForm ─────────────────────────────────────────────────────────────
// Security fix: API key read from import.meta.env.VITE_WEB3FORMS_KEY
// Bug A fix: replaced stale submitMessage closure in setTimeout with a local `succeeded` flag
// a11y fix: submitMessage container always present in DOM with role="status" aria-live="polite"
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Bug A fix: use a local variable instead of the stale state reference in setTimeout
    let succeeded = false;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Security fix: API key from environment variable
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "Nouvelle demande de projet - BERSAM",
        }),
      });

      if (response.ok) {
        succeeded = true;
        setSubmitMessage(
          "✅ Votre demande a été envoyée avec succès ! Nous vous répondrons dans les plus brefs délais.",
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        const subject = encodeURIComponent(
          `Demande de projet - ${formData.name}`,
        );
        const body = encodeURIComponent(
          `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
        );
        window.location.href = `mailto:contact@bersam.com?subject=${subject}&body=${body}`;
        setSubmitMessage(
          "📧 Votre client mail va s'ouvrir pour envoyer votre demande...",
        );
      }
    } catch (error) {
      const subject = encodeURIComponent(
        `Demande de projet - ${formData.name}`,
      );
      const body = encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      );
      window.location.href = `mailto:contact@bersam.com?subject=${subject}&body=${body}`;
      setSubmitMessage(
        "📧 Votre client mail va s'ouvrir pour envoyer votre demande...",
      );
    }

    // Bug A fix: read `succeeded` (local variable) instead of stale `submitMessage` state
    setTimeout(() => {
      setIsSubmitting(false);
      if (succeeded) {
        setSubmitMessage("");
      }
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Votre nom"
          required
          className="w-full px-4 py-3 rounded-lg border border-graphite/20 bg-white/50 text-graphite placeholder-textDim/70 focus:outline-none focus:ring-2 focus:ring-bersam-primary focus:border-transparent"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Votre email"
          required
          className="w-full px-4 py-3 rounded-lg border border-graphite/20 bg-white/50 text-graphite placeholder-textDim/70 focus:outline-none focus:ring-2 focus:ring-bersam-primary focus:border-transparent"
        />
      </div>
      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Décrivez votre projet..."
          rows={4}
          required
          className="w-full px-4 py-3 rounded-lg border border-graphite/20 bg-white/50 text-graphite placeholder-textDim/70 focus:outline-none focus:ring-2 focus:ring-bersam-primary focus:border-transparent resize-none"
        />
      </div>

      {/* a11y fix: always rendered in DOM so aria-live announcements work;
          role="status" + aria-live="polite" for screen-reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`text-sm text-center p-3 rounded-lg min-h-[2.5rem] ${
          submitMessage
            ? submitMessage.includes("succès")
              ? "bg-green-100 text-green-700 border border-green-200"
              : "text-bersam-primary animate-pulse"
            : "invisible"
        }`}
      >
        {submitMessage}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-bersam-primary text-graphite font-semibold py-3 px-6 rounded-lg hover:bg-bersam-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-bersam-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer votre demande"}
      </button>
    </form>
  );
}

// ─── Contact section ─────────────────────────────────────────────────────────
function Contact() {
  const { ref, visible } = useRevealOnScroll();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    dest: "bersam",
  });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Nom requis";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email invalide";
    if (
      form.message &&
      form.message.trim().length > 0 &&
      form.message.trim().length < 10
    )
      e.message = "Message trop court";
    return e;
  }, [form.name, form.email, form.message]);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  const Field = ({ id, label, children }) => (
    <div className="relative">
      <label
        htmlFor={id}
        className="absolute -top-2 left-3 bg-night px-1 text-xs text-textDim"
      >
        {label}
      </label>
      {children}
      {touched[id] && errors[id] && (
        <p className="mt-1 text-xs text-red-400">{errors[id]}</p>
      )}
    </div>
  );

  return (
    <section id="contact" ref={ref} className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          kicker="Contact"
          title="Entrons en contact"
          gradient="bersam"
        />

        <div
          className={classNames(
            "grid gap-6 lg:grid-cols-1 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <Card
            accent="bersam"
            className="lg:col-span-1 xl:col-span-1 w-full min-h-[300px] py-8 px-6"
          >
            <h3 className="font-semibold text-3xl mb-4 text-bersam-accent">
              Vous avez un projet ?
            </h3>
            <p className="text-textDim text-lg leading-relaxed mb-3">
              Un besoin d'ordre électrique ? Parlons-en !
            </p>
            <div className="flex flex-col space-y-2 mb-6">
              <p className="text-textDim text-base">📞 04 90 14 11 41</p>
              <p className="text-textDim text-base">✉️ contact@bersam.com</p>
            </div>
            <ContactForm />
          </Card>
        </div>

        <div
          className={classNames(
            "mt-8 transition-all duration-700",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <Card accent="bersam" className="p-0 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.7641372418148!2d4.798873076640863!3d43.92285703494782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b5ebfc5eb3ff3d%3A0xe4c89e7832304a36!2sBERSAM%20TELEPHONE!5e0!3m2!1sfr!2sfr!4v1772545495457!5m2!1sfr!2sfr"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="Carte BERSAM Avignon"
            />
          </Card>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer({ onMentionsClick }) {
  return (
    <footer className="border-t border-graphite/10 bg-graphite text-white pb-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:grid md:grid-cols-3 md:h-[84px] md:items-center py-6 md:py-0 gap-6">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <Logo
              src="photos/logo white avec bande jaune.svg"
              alt="Logo BERSAM"
              className="h-28 w-28 md:h-32 md:w-32 self-center ml-2 md:ml-3"
            />
          </div>
          <div className="text-white/70 text-xs md:text-sm text-center flex items-center justify-center">
            <button
              onClick={onMentionsClick}
              className="hover:text-white transition-colors cursor-pointer bg-none border-none text-current"
            >
              Mentions légales
            </button>{" "}
            • Certifications • Partenariats
          </div>
          <div className="flex items-center justify-center md:justify-end gap-6 text-white/70 text-sm">
            <div className="flex flex-col items-center">
              <a
                href="https://www.linkedin.com/company/bersam-electricite/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-bersam-primary transition-colors inline-flex items-center"
                aria-label="LinkedIn BERSAM"
              >
                <svg
                  className="h-5 w-5 md:h-6 md:w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7.06 20.45H3.89V9.04h3.17v11.41zM5.47 7.53c-1.02 0-1.85-.83-1.85-1.85s.83-1.85 1.85-1.85 1.85.83 1.85 1.85-.83 1.85-1.85 1.85zM20.45 20.45h-3.16v-5.55c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.64h-3.16V9.04h3.03v1.56h.04c.42-.8 1.45-1.64 2.98-1.64 3.19 0 3.78 2.1 3.78 4.83v6.66z" />
                </svg>
              </a>
              <span className="mt-1 text-xs">BERSAM</span>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-white/60 pb-3">
          © {new Date().getFullYear()} BERSAM. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

// ─── App (root) ───────────────────────────────────────────────────────────────
function App() {
  const [mentionsOpen, setMentionsOpen] = useState(false);
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => {
        document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
          const src = img.getAttribute("src");
          if (src) {
            const i = new Image();
            i.src = src;
          }
        });
      });
    }
  }, []);
  const path = useHashPath();

  useEffect(() => {
    if (path === "/") {
      document.body.classList.add("home");
      document.body.classList.remove("no-home");
      createShapes();
    } else {
      document.body.classList.remove("home");
      document.body.classList.add("no-home");
      document
        .querySelectorAll("#shapes-container .shape")
        .forEach((s) => s.remove());
    }
  }, [path]);

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, [path]);

  const links = [
    { to: "/", label: "Accueil" },
    { to: "/tertiaire", label: "Tertiaire" },
    { to: "/renovations", label: "Rénovations" },
    { to: "/prestige", label: "Prestige" },
    { to: "/contact", label: "Contact" },
  ];

  const routes = {
    "/": (
      <>
        <Hero />
        <BERSAM />
        <About />
      </>
    ),
    "/tertiaire": <TertiaryGallery />,
    "/renovations": <RenovationsGallery />,
    "/prestige": <PrestigeGallery />,
    "/contact": <Contact />,
  };

  const content = (() => {
    if (path.startsWith("/realisation/")) return <RealisationDetail />;
    if (
      path === "/tertiaire" ||
      path === "/renovations" ||
      path === "/prestige"
    ) {
      return <div className="force-visible">{routes[path] || routes["/"]}</div>;
    }
    return routes[path] || routes["/"];
  })();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none" />
      <Navbar links={links} />
      <main className="pt-[84px] space-y-0 flex-1">
        <div className="bg-transparent">
          <div className="mx-auto max-w-7xl px-4">{content}</div>
        </div>
      </main>
      <Footer onMentionsClick={() => setMentionsOpen(true)} />
      <MentionsLegalesModal
        isOpen={mentionsOpen}
        onClose={() => setMentionsOpen(false)}
      />
    </div>
  );
}

export default App;
