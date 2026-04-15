import { Github, Linkedin, Instagram, MessageCircle } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/MateoCalazans",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mateocalazans/",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/mateocalazans/",
    label: "Instagram",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/5584998180368",
    label: "WhatsApp",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted">
            © 2025 Mateo Calazans · Built with{" "}
            <span className="text-accent">♥</span> in Brazil
          </p>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted hover:text-accent transition-colors duration-200 cursor-pointer"
                data-hoverable
              >
                <link.icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
