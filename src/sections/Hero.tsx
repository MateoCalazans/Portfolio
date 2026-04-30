import { motion } from "framer-motion";
import UnicornScene from "unicornstudio-react";
import { TypewriterEffect } from "../components/TypewriterEffect";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLang } from "../context/LangContext";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Unicorn Studio Background */}
      <div className="absolute inset-0 z-0">
        <UnicornScene
          projectId="XPU7SDEMuE5zDgGahmEh"
          width="100%"
          height="100vh"
          scale={1}
          dpi={1.5}
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.9/dist/unicornStudio.umd.js"
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg/40 via-bg/20 to-bg" />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-8 pt-24 pb-16"
      >
        {/* Available badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-medium tracking-wider uppercase text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            {t.hero.available}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-7xl lg:text-[8rem] font-black leading-[0.9] tracking-tighter mb-6"
        >
          Mateo
          <br />
          <span className="text-accent">Calazans</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={fadeUp}
          className="text-xl sm:text-2xl lg:text-3xl font-light mb-6 h-10"
        >
          <TypewriterEffect />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg text-muted max-w-xl mb-10 font-light leading-relaxed"
        >
          {t.hero.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 bg-accent text-bg px-6 py-3 text-sm font-semibold hover:bg-accent-hover transition-colors duration-200 cursor-pointer"
            data-hoverable
          >
            {t.hero.viewWork}
            <ArrowDown
              size={16}
              className="group-hover:translate-y-0.5 transition-transform"
            />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 border border-border text-text px-6 py-3 text-sm font-medium hover:border-accent/50 hover:text-accent transition-all duration-200 cursor-pointer"
            data-hoverable
          >
            {t.hero.getInTouch}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </a>
        </motion.div>
      </motion.div>

      {/* Watermark Overlays to hide Unicorn Studio logo */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-bg z-[5] pointer-events-none" />
      <div className="absolute bottom-12 left-0 w-full h-24 bg-gradient-to-t from-bg to-transparent z-[5] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 mx-auto w-[500px] h-24 bg-bg z-[5] blur-md pointer-events-none transform-gpu will-change-transform" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent relative z-20"
        />
      </motion.div>
    </section>
  );
}
