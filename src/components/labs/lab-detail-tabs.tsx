"use client";

import { useEffect, useState, type ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LabContentView } from "@/lib/lab-content";

interface LabDetailTabsProps {
  product: ReactNode;
  engineering: ReactNode;
}

const isLabContentView = (value: string): value is LabContentView =>
  value === "product" || value === "engineering";

function readViewFromHash(): LabContentView {
  const hash = window.location.hash.replace(/^#/, "");
  return isLabContentView(hash) ? hash : "product";
}

export function LabDetailTabs({ product, engineering }: LabDetailTabsProps) {
  const [activeView, setActiveView] = useState<LabContentView>("product");

  useEffect(() => {
    const syncViewFromHash = () => {
      setActiveView(readViewFromHash());
    };

    syncViewFromHash();
    window.addEventListener("hashchange", syncViewFromHash);

    return () => {
      window.removeEventListener("hashchange", syncViewFromHash);
    };
  }, []);

  const handleValueChange = (value: string) => {
    if (!isLabContentView(value)) {
      return;
    }

    setActiveView(value);

    const nextUrl = `${window.location.pathname}${window.location.search}#${value}`;
    window.history.replaceState(window.history.state, "", nextUrl);
  };

  return (
    <Tabs
      value={activeView}
      onValueChange={handleValueChange}
      className="gap-portfolio-lg"
    >
      <TabsList
        variant="line"
        aria-label="Lab views"
        className="!h-auto gap-portfolio-lg bg-portfolio-neutral p-0"
      >
        <TabsTrigger
          value="product"
          className="data-active:border-portfolio-primary data-active:bg-portfolio-neutral data-active:text-portfolio-primary h-auto rounded-none border-0 border-b-2 border-transparent bg-portfolio-neutral px-0 py-3 font-mono text-[0.72rem] font-semibold uppercase leading-none tracking-normal text-portfolio-secondary shadow-none transition-[border-color,color] duration-portfolio-150 ease-portfolio after:hidden hover:text-portfolio-primary focus-visible:border-portfolio-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-accent focus-visible:ring-0 data-[state=active]:border-portfolio-primary data-[state=active]:bg-portfolio-neutral data-[state=active]:text-portfolio-primary motion-reduce:transition-none"
        >
          01. Product
        </TabsTrigger>
        <TabsTrigger
          value="engineering"
          className="data-active:border-portfolio-primary data-active:bg-portfolio-neutral data-active:text-portfolio-primary h-auto rounded-none border-0 border-b-2 border-transparent bg-portfolio-neutral px-0 py-3 font-mono text-[0.72rem] font-semibold uppercase leading-none tracking-normal text-portfolio-secondary shadow-none transition-[border-color,color] duration-portfolio-150 ease-portfolio after:hidden hover:text-portfolio-primary focus-visible:border-portfolio-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-accent focus-visible:ring-0 data-[state=active]:border-portfolio-primary data-[state=active]:bg-portfolio-neutral data-[state=active]:text-portfolio-primary motion-reduce:transition-none"
        >
          02. Engineering
        </TabsTrigger>
      </TabsList>

      <TabsContent value="product" className="mt-0">
        {product}
      </TabsContent>
      <TabsContent value="engineering" className="mt-0">
        {engineering}
      </TabsContent>
    </Tabs>
  );
}
