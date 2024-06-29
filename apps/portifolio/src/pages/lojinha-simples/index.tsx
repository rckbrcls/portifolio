"use client";

import React, { useEffect, useState } from "react";

const LojinhaSimplesPage: React.FC = () => {
  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadComponent = async () => {
        const mod = await import("lojinha_simples/App");
        setComponent(() => mod.default);
      };

      loadComponent();
    }
  }, []);

  return <div>{Component && <Component />}</div>;
};

export default LojinhaSimplesPage;
