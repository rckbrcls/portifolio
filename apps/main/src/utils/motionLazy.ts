// Lazy imported motion components
import { lazy } from "react";

export const MotionDiv = lazy(() => 
  import("framer-motion").then(module => ({ default: module.motion.div }))
);

export const MotionH1 = lazy(() => 
  import("framer-motion").then(module => ({ default: module.motion.h1 }))
);

export const AnimatePresence = lazy(() => 
  import("framer-motion").then(module => ({ default: module.AnimatePresence }))
);

// For hooks, export them directly
export { useInView, useMotionValue, useMotionTemplate } from "framer-motion";
