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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="#ffffff"
            d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
          />
        </svg>
      </button>
      <button
        onClick={scrollToNext}
        class="flex h-5 w-5 items-center justify-center gap-4 rounded-lg border border-zinc-800/50 bg-zinc-950 px-6 py-4 text-center font-bold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="#ffffff"
            d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollButton;
