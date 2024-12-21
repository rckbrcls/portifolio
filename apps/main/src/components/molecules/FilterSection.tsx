"use client";

import React from "react";
import { techStackIcons } from "../../../public/data/techStackIcons";
import { MultiSelect } from "../ui/multi-select";

type TechItem<T> = { name: T; active: boolean };

interface FilterSectionProps<T> {
  title: string;
  filter: TechItem<T>[];
  setFilter: React.Dispatch<React.SetStateAction<TechItem<T>[]>>;
}

export default function FilterSection<T>({
  title,
  filter,
  setFilter,
}: FilterSectionProps<T>) {
  const handleSelect = (index: number) => {
    setFilter((prevFilter) =>
      prevFilter.map((item, i) =>
        i === index ? { ...item, active: !item.active } : item,
      ),
    );
  };

  return (
    <div className="glass-dark flex flex-wrap items-start justify-start gap-2 rounded-lg p-4">
      <p className="mr-2 text-start text-xl font-bold">{title}</p>

      {filter.map((item, index) => (
        <button
          key={item.name as string}
          className={`glass-dark flex select-none items-center gap-2 rounded-full px-4 py-1 duration-500 active:scale-95 ${
            item.active
              ? "bg-blue-500 font-bold hover:bg-blue-800 active:bg-blue-800"
              : "hover:bg-zinc-900 active:bg-zinc-900"
          }`}
          onClick={() => handleSelect(index)}
        >
          {techStackIcons[item.name as keyof typeof techStackIcons]}
          <p className="text-sm font-bold">{String(item.name)}</p>
        </button>
      ))}
    </div>
  );
}
