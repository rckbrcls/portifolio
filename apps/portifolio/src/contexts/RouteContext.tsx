// contexts/RouteContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface RouteContextProps {
  savedRoute: string;
  setSavedRoute: (route: string) => void;
}

const RouteContext = createContext<RouteContextProps | undefined>(undefined);

export const RouteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [savedRoute, setSavedRoute] = useState<string>("");

  return (
    <RouteContext.Provider value={{ savedRoute, setSavedRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = (): RouteContextProps => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRoute must be used within a RouteProvider");
  }
  return context;
};
