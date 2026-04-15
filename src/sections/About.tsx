import { motion } from "framer-motion";
import { Briefcase, Store, GraduationCap } from "lucide-react";

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stats = [
  { icon: Briefcase, label: "3+ Years Experience" },
  { icon: Store, label: "10+ Stores Delivered" },
  { icon: GraduationCap, label: "UFRN Graduate" },
];

export function About() {
  return (
    <section id="about" className="py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Photo Column */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative group">
              {/* Offset amber frame behind the photo */}
              <div
                className="absolute -inset-3 border border-accent/20 rounded-2xl transition-all duration-500 group-hover:border-accent/40 group-hover:-inset-4"
                aria-hidden="true"
              />

              {/* Photo */}
              <img
                src="/images/mateo.jpeg"
                alt="Mateo Calazans — Shopify Developer"
                className="relative w-72 h-[22rem] sm:w-80 sm:h-[26rem] lg:w-96 lg:h-[30rem] object-cover object-bottom rounded-2xl transition-shadow duration-500 group-hover:shadow-[0_0_40px_rgba(74,123,247,0.25)]"
                loading="lazy"
              />

              {/* Decorative accent line */}
              <div className="absolute -right-6 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent hidden lg:block" />
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
              01 — About
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">
              About Me
            </h2>
            <div className="space-y-5 text-muted leading-relaxed text-base sm:text-lg font-light">
              <p>
                I'm Mateo Calazans, a Shopify Developer based in Natal, Brazil.
                I hold a Technologist Degree in Systems Analysis and Development
                from the Federal University of Rio Grande do Norte (UFRN).
              </p>
              <p>
                I specialize in building scalable, high-converting Shopify
                storefronts — from custom Liquid themes to Shopify Functions,
                Extensions, and deep API integrations. I care obsessively about
                performance, clean code, and pixel-perfect execution.
              </p>
            </div>

            {/* Stat Badges */}
            <div className="flex flex-wrap gap-4 mt-10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2.5 border border-border bg-surface px-4 py-2.5 text-sm text-muted"
                >
                  <stat.icon
                    size={14}
                    className="text-accent"
                    strokeWidth={1.5}
                  />
                  {stat.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
