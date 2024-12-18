"use client";

import React from "react";

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
    <div className="flex items-start justify-start rounded-xl glass-dark p-4 gap-2 flex-wrap">
      <p className="text-start font-bold text-xl mr-2">{title}</p>
      {filter.map((item, index) => (
        <button
          key={item.name as string}
          className={`glass-dark px-4 py-1 rounded-full active:scale-95 duration-500 select-none ${
            item.active
              ? "bg-blue-500 hover:bg-blue-800 active:bg-blue-800 font-bold"
              : "hover:bg-zinc-900 active:bg-zinc-900"
          }`}
          onClick={() => handleSelect(index)}
        >
          <p className="text-sm font-bold">{String(item.name)}</p>
        </button>
      ))}
    </div>
  );
}
