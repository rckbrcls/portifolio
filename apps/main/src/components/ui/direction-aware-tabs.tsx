"use client";

import { ReactNode, useMemo, useState, useEffect } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

type Tab = {
  id: number;
  label: string;
  content: ReactNode;
};

interface OgImageSectionProps {
  tabs: Tab[];
  className?: string;
  rounded?: string;
  onChange?: () => void;
  onLocalServerChange?: (value: boolean) => void;
  onTabChange?: (id: number) => void;
}

const STORAGE_KEY = "directionAwareTabs.activeTab";
const STORAGE_KEY_LOCAL = "directionAwareTabs.localServer";

function DirectionAwareTabs({
  tabs,
  className,
  rounded,
  onChange,
  onLocalServerChange,
  onTabChange,
}: OgImageSectionProps) {
  const [activeTab, setActiveTab] = useState<number>(() => {
    try {
      if (typeof window === "undefined") return 0;
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? parseInt(stored, 10) : 0;
    } catch (err) {
      return 0;
    }
  });
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ref, bounds] = useMeasure();
  const [localServer, setLocalServer] = useState<boolean>(() => {
    try {
      if (typeof window === "undefined") return false;
      const stored = sessionStorage.getItem(STORAGE_KEY_LOCAL);
      return stored ? stored === "1" : false;
    } catch (err) {
      return false;
    }
  });

  const content = useMemo(() => {
    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;
    return activeTabContent || null;
  }, [activeTab, tabs]);

  // Show local server button only for microfrontend tab (case-insensitive match)
  const activeTabLabel = tabs.find((t) => t.id === activeTab)?.label ?? "";
  const showLocalButton = activeTabLabel.toLowerCase().includes("micro");

  const handleTabClick = (newTabId: number) => {
    if (newTabId !== activeTab && !isAnimating) {
      const newDirection = newTabId > activeTab ? 1 : -1;
      setDirection(newDirection);
      setActiveTab(newTabId);
      try {
        if (typeof window !== "undefined")
          sessionStorage.setItem(STORAGE_KEY, String(newTabId));
      } catch (err) {
        /* ignore storage errors */
      }

      if (onChange) onChange();
    }
  };

  const toggleLocalServer = () => {
    const next = !localServer;
    setLocalServer(next);
    try {
      if (typeof window !== "undefined")
        sessionStorage.setItem(STORAGE_KEY_LOCAL, next ? "1" : "0");
    } catch (err) {
      /* ignore */
    }
  };

  // Persist activeTab whenever it changes (covers other ways state might change)
  useEffect(() => {
    try {
      if (typeof window !== "undefined")
        sessionStorage.setItem(STORAGE_KEY, String(activeTab));
    } catch (err) {
      /* ignore */
    }
  }, [activeTab]);

  // Persist localServer when it changes
  useEffect(() => {
    try {
      if (typeof window !== "undefined")
        sessionStorage.setItem(STORAGE_KEY_LOCAL, localServer ? "1" : "0");
    } catch (err) {
      /* ignore */
    }
    // Notify parent about the change
    try {
      if (onLocalServerChange) onLocalServerChange(localServer);
    } catch (err) {
      /* ignore callback errors */
    }
    // Notify parent about active tab change
    try {
      if (onTabChange) onTabChange(activeTab);
    } catch (err) {
      /* ignore */
    }
  }, [localServer]);

  // Notify parent when activeTab changes
  useEffect(() => {
    try {
      if (onTabChange) onTabChange(activeTab);
    } catch (err) {
      /* ignore */
    }
  }, [activeTab]);

  const variants = {
    initial: (direction: number) => ({
      x: 300 * direction,
      opacity: 0,
      filter: "blur(4px)",
    }),
    active: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      x: -300 * direction,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full items-center justify-start gap-4 max-sm:gap-2">
        <div
          className={cn(
            "shadow-inner-shadow flex cursor-pointer space-x-1 rounded-full px-[3px] py-[3.2px]",
            activeTab % 2 === 0
              ? "bg-gradient-to-r from-blue-500 to-purple-500"
              : "bg-gradient-to-r from-pink-500 to-purple-500",
            className,
            rounded,
          )}
        >
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold text-white transition focus-visible:outline-none focus-visible:outline-1 focus-visible:ring-1",
                activeTab === tab.id
                  ? "text-white"
                  : "text-white/80 hover:text-white/60",
                rounded,
              )}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className="shadow-inner-shadow absolute inset-0 z-10 bg-neutral-700/80 mix-blend-difference"
                  style={rounded ? { borderRadius: 9 } : { borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.19, duration: 0.4 }}
                />
              )}

              {tab.label}
            </button>
          ))}
        </div>

        {/* Local server button (ghost style) */}
        {showLocalButton && (
          <button
            type="button"
            aria-pressed={localServer}
            onClick={toggleLocalServer}
            className={cn(
              "rounded-full border px-3 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              // smooth color transition + subtle transform for interaction
              "transform-gpu transition-colors duration-500 ease-in-out hover:scale-[1.02] active:scale-95",
              // ghost default with subtle border
              "border-white/20 bg-transparent text-white/90 hover:bg-white/5",
              // active gradient orange -> pink with stronger border
              localServer
                ? "border-white/30 bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md"
                : "",
            )}
          >
            <span>localhost</span>
          </button>
        )}
      </div>
      <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}>
        <motion.div
          className="relative mx-auto h-full w-full overflow-hidden"
          initial={false}
          animate={{ height: bounds.height }}
        >
          <div className="pt-4" ref={ref}>
            <AnimatePresence
              custom={direction}
              mode="popLayout"
              onExitComplete={() => setIsAnimating(false)}
            >
              <motion.div
                key={activeTab}
                variants={variants}
                initial="initial"
                animate="active"
                exit="exit"
                custom={direction}
                onAnimationStart={() => setIsAnimating(true)}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
export { DirectionAwareTabs };
