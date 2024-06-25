import { FaSolidArrowDownLong, FaSolidArrowUpLong } from "solid-icons/fa";
import { Component } from "solid-js";

interface IProps {
  mainRef: HTMLDivElement | null;
}

const ScrollButton: Component<IProps> = ({ mainRef }) => {
  const scrollToNext = () => {
    if (mainRef) {
      const scrollableDiv = mainRef;
      const currentScroll = scrollableDiv.scrollTop;
      const windowHeight = window.innerHeight;

      const nextScroll = currentScroll + windowHeight;

      scrollableDiv.scrollTo({
        top: nextScroll,
        behavior: "smooth",
      });
    }
  };

  const scrollToPrevious = () => {
    if (mainRef) {
      const scrollableDiv = mainRef;
      const currentScroll = scrollableDiv.scrollTop;
      const windowHeight = window.innerHeight;

      const nextScroll = currentScroll - windowHeight;

      scrollableDiv.scrollTo({
        top: nextScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <div class="fixed bottom-4 right-6 z-10 m-auto hidden flex-col gap-1 md:flex">
      <button
        onClick={scrollToPrevious}
        class="flex h-5 w-5 items-center justify-center gap-4 rounded-lg border border-zinc-800/50 bg-zinc-950 px-6 py-4 text-center font-bold"
      >
        <FaSolidArrowUpLong />
      </button>
      <button
        onClick={scrollToNext}
        class="flex h-5 w-5 items-center justify-center gap-4 rounded-lg border border-zinc-800/50 bg-zinc-950 px-6 py-4 text-center font-bold"
      >
        <FaSolidArrowDownLong />
      </button>
    </div>
  );
};

export default ScrollButton;
