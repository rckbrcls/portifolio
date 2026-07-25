import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

type ThemeName = "light" | "dark";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    ready?: Promise<void>;
  };
};

interface UseThemeToggleOptions {
  duration?: number;
}

export function useThemeToggle({ duration = 300 }: UseThemeToggleOptions = {}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const syncDocumentTheme = useCallback((nextTheme: ThemeName) => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(nextTheme);
    root.style.colorScheme = nextTheme;
  }, []);

  const toggleTheme = useCallback(
    (origin?: HTMLElement | null) => {
      if (!mounted || typeof window === "undefined") {
        return;
      }

      const nextTheme: ThemeName = isDark ? "light" : "dark";
      const applyTheme = () => {
        setTheme(nextTheme);
        syncDocumentTheme(nextTheme);
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        applyTheme();
        return;
      }

      const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
      const viewportHeight =
        window.visualViewport?.height ?? window.innerHeight;
      const rect = origin?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : viewportWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : viewportHeight / 2;
      const maxRadius = Math.hypot(
        Math.max(x, viewportWidth - x),
        Math.max(y, viewportHeight - y),
      );

      const themeDocument = document as ViewTransitionDocument;

      if (typeof themeDocument.startViewTransition !== "function") {
        applyTheme();
        return;
      }

      const transition = themeDocument.startViewTransition(() => {
        flushSync(() => {
          applyTheme();
        });
      });

      const ready = transition?.ready;

      if (ready && typeof ready.then === "function") {
        void ready
          .then(() => {
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration,
                easing: "cubic-bezier(0.23, 1, 0.32, 1)",
                pseudoElement: "::view-transition-new(root)",
              },
            );
          })
          .catch(() => undefined);
      }
    },
    [duration, isDark, mounted, setTheme, syncDocumentTheme],
  );

  const toggleLabel = mounted
    ? isDark
      ? "Switch to light theme"
      : "Switch to dark theme"
    : "Toggle theme";

  return {
    isDark,
    mounted,
    toggleLabel,
    toggleTheme,
  };
}
