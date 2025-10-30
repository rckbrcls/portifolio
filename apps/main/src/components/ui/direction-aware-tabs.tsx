"use client";

import { ReactNode, useMemo, useState, useEffect, useRef } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

type Tab = {
  id: number;
  label: string;
  content: ReactNode;
};

const STORAGE_KEY = "direction-aware-tabs:last-active";

interface OgImageSectionProps {
  tabs: Tab[];
  className?: string;
  rounded?: string;
  onChange?: () => void;
  onTabChange?: (id: number) => void;
}

function DirectionAwareTabs({
  tabs,
  className,
  rounded,
  onChange,
  onTabChange,
}: OgImageSectionProps) {
  const fallbackTabId = tabs[0]?.id ?? 0;
  const [activeTab, setActiveTab] = useState<number>(fallbackTabId);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ref, bounds] = useMeasure();
  const hasRestoredRef = useRef(false);

  const content = useMemo(() => {
    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;
    return activeTabContent || null;
  }, [activeTab, tabs]);

  const handleTabClick = (newTabId: number) => {
    if (newTabId !== activeTab && !isAnimating) {
      const newDirection = newTabId > activeTab ? 1 : -1;
      setDirection(newDirection);
      setActiveTab(newTabId);

      if (onChange) onChange();
    }
  };

  useEffect(() => {
    if (
      hasRestoredRef.current ||
      !tabs.length ||
      typeof window === "undefined"
    ) {
      return;
    }

    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY);
      const storedId = storedValue ? Number.parseInt(storedValue, 10) : NaN;

      if (
        !Number.isNaN(storedId) &&
        tabs.some((tab) => tab.id === storedId) &&
        storedId !== activeTab
      ) {
        const newDirection = storedId > activeTab ? 1 : -1;
        setDirection(newDirection);
        setActiveTab(storedId);
      }
    } catch (err) {
      /* ignore */
    } finally {
      hasRestoredRef.current = true;
    }
  }, [activeTab, tabs]);

  useEffect(() => {
    if (!tabs.length) {
      return;
    }

    if (!tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab(tabs[0]?.id ?? 0);
    }
  }, [tabs, activeTab]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, String(activeTab));
    } catch (err) {
      /* ignore */
    }
  }, [activeTab]);

  // Notify parent when activeTab changes
  useEffect(() => {
    try {
      if (onTabChange) onTabChange(activeTab);
    } catch (err) {
      /* ignore */
    }
  }, [activeTab, onTabChange]);

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
      <div className="flex w-full items-center justify-end gap-4 max-sm:gap-2">
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
          {tabs.map((tab) => (
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
      </div>
      <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}>
        <motion.div
          className="relative mx-auto h-full w-full overflow-hidden"
          initial={false}
          animate={{ height: bounds.height }}
        >
          <div className="pt-6" ref={ref}>
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
