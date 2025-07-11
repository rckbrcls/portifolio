"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ConnectionDebuggerProps {
  className?: string;
  enabled?: boolean;
}

export const ConnectionDebugger: React.FC<ConnectionDebuggerProps> = ({
  className,
  enabled = false,
}) => {
  const [stats, setStats] = useState({
    connectionUpdates: 0,
    transformEvents: 0,
    lastUpdate: Date.now(),
    performance: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let updateCount = 0;
    let transformCount = 0;
    let lastTime = Date.now();

    const handleConnectionUpdate = () => {
      updateCount++;
      const now = Date.now();
      const timeDiff = now - lastTime;

      setStats((prev) => ({
        connectionUpdates: updateCount,
        transformEvents: prev.transformEvents,
        lastUpdate: now,
        performance: timeDiff,
      }));

      lastTime = now;
    };

    const handleTransformUpdate = () => {
      transformCount++;
      setStats((prev) => ({
        ...prev,
        transformEvents: transformCount,
      }));
    };

    document.addEventListener("connection-update", handleConnectionUpdate);
    document.addEventListener("architecture-transform", handleTransformUpdate);

    return () => {
      document.removeEventListener("connection-update", handleConnectionUpdate);
      document.removeEventListener(
        "architecture-transform",
        handleTransformUpdate,
      );
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Botão toggle */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed right-4 top-4 z-50 rounded-lg border border-blue-500/50 bg-blue-500/20 px-3 py-2 text-blue-300 backdrop-blur-sm transition-all duration-200 hover:bg-blue-500/30"
        title="Toggle Connection Debugger"
      >
        Debug
      </button>

      {/* Painel de debug */}
      {isVisible && (
        <div
          className={cn(
            "fixed right-4 top-16 z-50 min-w-[250px] rounded-lg border border-blue-500/50 bg-black/80 p-4 text-blue-300 backdrop-blur-sm",
            className,
          )}
        >
          <h3 className="mb-3 text-sm font-bold text-blue-100">
            Connection Debugger
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Connection Updates:</span>
              <span className="font-mono text-green-400">
                {stats.connectionUpdates}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Transform Events:</span>
              <span className="font-mono text-yellow-400">
                {stats.transformEvents}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Last Update:</span>
              <span className="font-mono text-cyan-400">
                {new Date(stats.lastUpdate).toLocaleTimeString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Performance:</span>
              <span
                className={cn(
                  "font-mono",
                  stats.performance < 16
                    ? "text-green-400"
                    : stats.performance < 33
                      ? "text-yellow-400"
                      : "text-red-400",
                )}
              >
                {stats.performance}ms
              </span>
            </div>

            <div className="mt-3 border-t border-blue-500/30 pt-2">
              <div className="space-y-1 text-xs">
                <div className="text-green-400">
                  ✓ Excalidraw-style coordinates
                </div>
                <div className="text-green-400">✓ RAF-based updates</div>
                <div className="text-green-400">✓ Event-driven sync</div>
                <div
                  className={cn(
                    stats.performance < 16
                      ? "text-green-400"
                      : "text-yellow-400",
                  )}
                >
                  {stats.performance < 16 ? "✓" : "⚠"} 60fps performance
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setStats({
                  connectionUpdates: 0,
                  transformEvents: 0,
                  lastUpdate: Date.now(),
                  performance: 0,
                });
              }}
              className="mt-3 w-full rounded border border-blue-500/50 bg-blue-500/20 px-2 py-1 text-xs text-blue-300 hover:bg-blue-500/30"
            >
              Reset Stats
            </button>
          </div>
        </div>
      )}
    </>
  );
};
