import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Instagram,
  Send,
  Download,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { downloadFile } from "../utils/download";

const contactInfo = [
  {
    icon: Mail,
    label: "maateodtc@gmail.com",
    href: "mailto:maateodtc@gmail.com",
  },
  {
    icon: Phone,
    label: "+55 (84) 99818-0368",
    href: "https://wa.me/5584998180368",
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/mateocalazans",
    href: "https://www.linkedin.com/in/mateocalazans/",
  },
  {
    icon: Github,
    label: "github.com/MateoCalazans",
    href: "https://github.com/MateoCalazans",
  },
  {
    icon: Instagram,
    label: "@mateocalazans",
    href: "https://www.instagram.com/mateocalazans/",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:maateodtc@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section id="contact" className="py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
            06 — Contact
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted text-lg font-light max-w-xl">
            Have a project in mind? I'd love to hear about it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer"
                data-hoverable
              >
                <span className="flex items-center justify-center w-10 h-10 border border-border group-hover:border-accent/30 transition-colors duration-200">
                  <item.icon
                    size={16}
                    className="text-muted group-hover:text-accent transition-colors duration-200"
                    strokeWidth={1.5}
                  />
                </span>
                <span className="text-sm text-muted group-hover:text-text transition-colors duration-200">
                  {item.label}
                </span>
              </a>
            ))}

            {/* Download CV */}
            <div className="pt-6">
              <button
                onClick={() => downloadFile("/resume.pdf", "Mateo_Calazans_Resume.pdf")}
                className="group inline-flex items-center gap-3 bg-accent text-bg px-8 py-4 text-sm font-semibold hover:bg-accent-hover transition-colors duration-200 cursor-pointer"
                data-hoverable
              >
                <Download size={16} />
                Download CV
              </button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-muted uppercase tracking-wider mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  className="w-full bg-surface border border-border px-4 py-3 text-sm text-text placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors duration-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-muted uppercase tracking-wider mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  className="w-full bg-surface border border-border px-4 py-3 text-sm text-text placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors duration-200"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-muted uppercase tracking-wider mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-surface border border-border px-4 py-3 text-sm text-text placeholder-muted/40 focus:outline-none focus:border-accent/50 transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-2 border border-accent text-accent px-8 py-3 text-sm font-semibold hover:bg-accent hover:text-bg transition-all duration-200 cursor-pointer"
                data-hoverable
              >
                {submitted ? "Message Sent!" : "Send Message"}
                <Send
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
