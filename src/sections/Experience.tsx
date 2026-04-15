import { motion } from "framer-motion";

const experiences = [
  {
    company: "E-smart Capitais",
    role: "Shopify Developer",
    period: "Apr 2025 – Present",
    description:
      "Maintaining and scaling storefronts for multiple brands, improving performance and accessibility, and developing custom features using Shopify Functions and Extensions.",
  },
  {
    company: "Organifi",
    role: "Shopify Developer",
    period: "",
    description:
      "Developed and customized Shopify themes focused on responsive design, performance, and SEO/CRO optimization. Integrated third-party apps and used metaobjects for tailored features.",
  },
  {
    company: "Case Mate",
    role: "Shopify Developer",
    period: "",
    description:
      "Contributed to theme development and optimization, focusing on performance, responsiveness, and conversion rate improvements. Delivered scalable, customized solutions using Shopify APIs.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-32 lg:py-40 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
            03 — Career
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8 lg:pl-12">
          {/* Vertical line */}
          <div className="timeline-line" />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-8 lg:-left-12 top-2 flex items-center justify-center">
                  <span className="w-3 h-3 border-2 border-accent bg-bg" />
                </div>

                {/* Card */}
                <div className="border border-border bg-bg p-6 sm:p-8 hover:border-accent/20 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{exp.company}</h3>
                      <p className="text-accent text-sm font-medium">
                        {exp.role}
                      </p>
                    </div>
                    {exp.period && (
                      <span className="text-xs text-muted font-mono tracking-wider">
                        {exp.period}
                      </span>
                    )}
                  </div>
                  <p className="text-muted text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
