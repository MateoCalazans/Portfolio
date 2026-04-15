import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useLang } from "../context/LangContext";

export function Education() {
  const { t } = useLang();

  return (
    <section id="education" className="py-32 lg:py-40 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
            {t.education.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {t.education.heading}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-border bg-bg p-8 sm:p-10 max-w-2xl"
        >
          <div className="flex items-start gap-6">
            <div className="flex items-center justify-center w-14 h-14 border border-accent/20 shrink-0">
              <GraduationCap
                size={24}
                className="text-accent"
                strokeWidth={1.5}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-1">
                {t.education.degree}
              </h3>
              <p className="text-accent text-sm font-medium mb-3">
                {t.education.institution}
              </p>
              <p className="text-muted text-sm leading-relaxed">
                {t.education.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
