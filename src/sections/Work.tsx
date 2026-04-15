import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const stores = [
  {
    name: "Case Mate",
    url: "https://case-mate.com",
    description:
      "Premium phone cases & accessories. Custom theme with advanced CRO features.",
    hasLink: true,
  },
  {
    name: "Organifi",
    url: "https://www.organifi.com",
    description:
      "Health & wellness brand. Performance-focused Liquid theme with metaobject-powered content.",
    hasLink: true,
  },
  {
    name: "Crimson Agility",
    url: "https://crimsonagility.us/",
    description:
      "Shopify storefront optimization and custom feature development.",
    hasLink: true,
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

export function Work() {
  return (
    <section id="work" className="py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
            04 — Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Stores I've Built On
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store, i) => (
            <motion.div
              key={store.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1 }}
              className="group relative border border-border bg-surface p-8 hover:border-accent/30 transition-all duration-300 cursor-pointer"
              data-hoverable
            >
              {/* Store initial as logo placeholder */}
              <div className="flex items-center justify-center w-12 h-12 border border-border bg-bg mb-6 text-accent font-bold text-lg">
                {store.name[0]}
              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-200">
                {store.name}
              </h3>

              <p className="text-muted text-sm leading-relaxed mb-6">
                {store.description}
              </p>

              {store.hasLink ? (
                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200"
                >
                  Visit Store
                  <ExternalLink size={14} />
                </a>
              ) : (
                <span className="text-sm text-muted/50 italic">
                  Private project
                </span>
              )}

              {/* Hover glow line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/50 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
