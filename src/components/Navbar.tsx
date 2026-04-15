import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { downloadFile } from "../utils/download";
import { useLang, type Lang } from "../context/LangContext";

const handleDownload = () =>
  downloadFile("/resume.pdf", "Mateo_Calazans_Resume.pdf");

// ─── SVG Flag components — no emoji, no alignment issues ─────────────────────
function FlagBR({ size = 20 }: { size?: number }) {
  const h = Math.round(size * 0.7);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <rect width="20" height="14" rx="1.5" fill="#009C3B" />
      <polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#FFDF00" />
      <circle cx="10" cy="7" r="3.2" fill="#002776" />
      <path
        d="M7.1 8.1 C8 7.4 9.1 7 10.3 7 C11.4 7 12.4 7.3 13.2 7.9"
        stroke="white"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function FlagUS({ size = 20 }: { size?: number }) {
  const h = Math.round(size * 0.7);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <rect width="20" height="14" rx="1.5" fill="#B22234" />
      <rect y="1" width="20" height="1.08" fill="white" />
      <rect y="3.08" width="20" height="1.08" fill="white" />
      <rect y="5.15" width="20" height="1.08" fill="white" />
      <rect y="7.23" width="20" height="1.08" fill="white" />
      <rect y="9.31" width="20" height="1.08" fill="white" />
      <rect y="11.38" width="20" height="1.08" fill="white" />
      <rect width="8" height="7.54" rx="1.5" fill="#3C3B6E" />
    </svg>
  );
}

const FlagComponent: Record<Lang, typeof FlagBR> = {
  pt: FlagBR,
  en: FlagUS,
};

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function toggleLang() {
    setLang(lang === "en" ? "pt" : "en");
  }

  // Show the flag of the OTHER language (the one you'll switch TO)
  const nextLang: Lang = lang === "en" ? "pt" : "en";
  const NextFlag = FlagComponent[nextLang];
  const nextLabel = lang === "en" ? "Mudar para Português" : "Switch to English";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center gap-2 cursor-pointer"
            data-hoverable
          >
            <span className="inline-flex h-8 w-8 items-center justify-center border border-accent/30 text-accent text-xs font-bold tracking-widest">
              MC
            </span>
            <span className="text-sm font-medium text-muted group-hover:text-text transition-colors duration-200">
              mateo.dev
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm text-muted hover:text-text transition-colors duration-200 cursor-pointer group"
                data-hoverable
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Language toggle — flag only */}
            <button
              onClick={toggleLang}
              title={nextLabel}
              aria-label={nextLabel}
              className="border border-border/60 p-1.5 hover:border-accent/40 transition-all duration-200 cursor-pointer opacity-70 hover:opacity-100"
              data-hoverable
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={nextLang}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <NextFlag size={22} />
                </motion.div>
              </AnimatePresence>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 border border-accent text-accent px-4 py-2 text-sm font-medium hover:bg-accent hover:text-bg transition-all duration-200 cursor-pointer"
              data-hoverable
            >
              {t.nav.downloadCV}
            </button>
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLang}
              aria-label={nextLabel}
              className="border border-border/60 p-1.5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={nextLang}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <NextFlag size={20} />
                </motion.div>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-text cursor-pointer p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-16 bg-bg/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-2xl font-light text-muted hover:text-accent transition-colors cursor-pointer"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              onClick={() => {
                handleDownload();
                setMobileOpen(false);
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border border-accent text-accent px-6 py-3 text-lg font-medium hover:bg-accent hover:text-bg transition-all cursor-pointer"
            >
              {t.nav.downloadCV}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
