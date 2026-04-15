import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Shopify Developer.",
  "Frontend Engineer.",
  "Theme Architect.",
  "CRO Specialist.",
];

export function TypewriterEffect() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && text === currentWord) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(
        isDeleting
          ? currentWord.substring(0, text.length - 1)
          : currentWord.substring(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={wordIndex}
        className="text-accent inline-block"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
      >
        {text}
        <span className="animate-pulse text-accent/60">|</span>
      </motion.span>
    </AnimatePresence>
  );
}
