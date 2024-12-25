"use client";

import React from "react";
import { techStackIcons } from "../../../public/data/techStackIcons";
import { Text } from "../atoms/Text";

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
    <div className="flex flex-wrap items-center justify-start gap-2 rounded-lg">
      <Text className="mr-2 text-start font-black">{title}</Text>

      {filter.map((item, index) => (
        <button
          key={item.name as string}
          className={`glass-dark flex items-center gap-2 rounded-full px-4 py-0.5 duration-500 active:scale-95 md:py-1 ${
            item.active
              ? "bg-blue-500 font-bold hover:bg-blue-800 active:bg-blue-800"
              : "hover:scale-[1.01] hover:bg-zinc-800 active:bg-zinc-800"
          }`}
          onClick={() => handleSelect(index)}
        >
          {techStackIcons[item.name as keyof typeof techStackIcons]}
          <Text className="max-md:text-sm">{String(item.name)}</Text>
        </button>
      ))}
      <hr className="my-1 w-full border-t border-zinc-700/30 md:my-3" />
    </div>
  );
}
