import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed left-1/2 top-6 z-[80] flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm font-medium text-foreground shadow-elegant backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-secondary sm:top-8"
        >
          <ArrowUp className="h-4 w-4" />
          <span>Back to top</span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

