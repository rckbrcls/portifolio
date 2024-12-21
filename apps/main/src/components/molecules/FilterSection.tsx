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
        i === index ? { ...item, active: !item.active } : item
      )
    );
  };

  return (
    <div className="flex items-start justify-start rounded-lg glass-dark p-4 gap-2 flex-wrap">
      <p className="text-start font-bold text-xl mr-2">{title}</p>

      {filter.map((item, index) => (
        <button
          key={item.name as string}
          className={`glass-dark px-4 py-1 flex items-center gap-2 rounded-full active:scale-95 duration-500 select-none ${
            item.active
              ? "bg-blue-500 hover:bg-blue-800 active:bg-blue-800 font-bold"
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
