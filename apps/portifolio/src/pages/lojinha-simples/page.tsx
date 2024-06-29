"use client";

import dynamic from "next/dynamic";
import React, { ComponentType, useEffect, useState } from "react";

const LojinhaSimplesPage = () => {
  const [Component, setComponent] = useState<ComponentType<{}> | undefined>(
    undefined
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const component = dynamic(() => import("lojinha_simples/App"), {
        ssr: false,
      });

      setComponent(component);
    }
  }, []);

  return <div>{Component && <Component />}</div>;
};

export default LojinhaSimplesPage;
