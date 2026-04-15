import { motion } from "framer-motion";
import { Code, ShoppingBag, Zap } from "lucide-react";

const skills = [
  "Liquid",
  "JavaScript",
  "TypeScript",
  "Shopify",
  "HTML",
  "CSS",
  "React",
  "Node.js",
  "Shopify Functions",
  "Shopify Extensions",
  "Metaobjects",
  "SEO",
  "CRO",
  "Shopify APIs",
  "Git",
];

const categories = [
  {
    icon: ShoppingBag,
    title: "Shopify Ecosystem",
    items: [
      "Liquid",
      "Shopify CLI",
      "Theme Architecture",
      "Shopify Functions",
      "Extensions",
      "Metaobjects",
      "Storefront API",
    ],
  },
  {
    icon: Code,
    title: "Frontend",
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "HTML5",
      "CSS3",
      "Tailwind",
      "Responsive Design",
    ],
  },
  {
    icon: Zap,
    title: "Performance & Growth",
    items: [
      "Core Web Vitals",
      "CRO",
      "SEO",
      "Accessibility",
      "Third-party Integrations",
    ],
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

export function Skills() {
  const doubledSkills = [...skills, ...skills];

  return (
    <section id="skills" className="py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
            02 — Skills
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Tech Stack
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden mb-20">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10" />

        <div className="flex animate-marquee">
          {doubledSkills.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="mx-3 shrink-0 border border-border px-5 py-2.5 text-sm font-medium text-muted hover:text-accent hover:border-accent/30 transition-colors duration-200 cursor-default whitespace-nowrap"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Category Cards */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1 }}
              className="group border border-border bg-surface hover:border-accent/20 transition-all duration-300 p-8 cursor-pointer"
              data-hoverable
            >
              <cat.icon
                size={24}
                className="text-accent mb-6"
                strokeWidth={1.5}
              />
              <h3 className="text-lg font-semibold mb-4 group-hover:text-accent transition-colors duration-200">
                {cat.title}
              </h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-muted flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-accent/40 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
