import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { ArrowUpRight, Moon, Settings2, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { headerBrandGreetings } from "@/lib/header-brand-greetings";
import { contactLinks, navigationLinks } from "@/lib/portfolio-content";
import { cn } from "@/lib/utils";

type PortfolioSectionSpacing =
  | "page-start"
  | "stack"
  | "stack-tight"
  | "stack-loose";

interface PortfolioLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

interface PortfolioPageIntroProps {
  kicker: string;
  title: string;
  titleVisual?: ReactNode;
  description?: string;
  action?: ReactNode;
}

interface PortfolioCollectionProps extends ComponentPropsWithoutRef<"div"> {
  columns: 1 | 2;
}

interface PortfolioEditorialStackProps extends ComponentPropsWithoutRef<"div"> {}

interface PortfolioSectionProps extends ComponentPropsWithoutRef<"section"> {
  spacing?: PortfolioSectionSpacing;
}

interface PortfolioSectionBodyProps extends ComponentPropsWithoutRef<"div"> {}

interface HeaderBrandAnimationProps {
  isActive: boolean;
  onInteractionChange: (isActive: boolean) => void;
}

const HEADER_BRAND_IDLE_FRAME = "/animation/piscar-sorrindo-1(igual).png";
const HEADER_BRAND_CLOSED_SMILE_FRAME = "/animation/fechar-sorriso-2.png";
const HEADER_BRAND_OPEN_SMILE_FRAME = "/animation/abrir-sorriso-2(igual).png";
const HEADER_BRAND_INITIAL_IDLE_HOLD_MS = 1600;
const HEADER_BRAND_GREETING_RECENT_LIMIT = 12;

const HEADER_BRAND_BLOCKS = {
  blinkSmiling: {
    frameStepMs: 110,
    cooldownMs: 1800,
    cooldownFrameSrc: HEADER_BRAND_IDLE_FRAME,
    frames: [
      HEADER_BRAND_IDLE_FRAME,
      "/animation/piscar-sorrindo-2.png",
      "/animation/piscar-sorrindo-3.png",
      "/animation/piscar-sorrindo-2.png",
      HEADER_BRAND_IDLE_FRAME,
    ],
  },
  closeSmile: {
    frameStepMs: 160,
    cooldownMs: 2200,
    cooldownFrameSrc: HEADER_BRAND_CLOSED_SMILE_FRAME,
    frames: [
      HEADER_BRAND_IDLE_FRAME,
      "/animation/fechar-sorriso-1.png",
      HEADER_BRAND_CLOSED_SMILE_FRAME,
    ],
  },
  openSmile: {
    frameStepMs: 170,
    cooldownMs: 2600,
    cooldownFrameSrc: HEADER_BRAND_OPEN_SMILE_FRAME,
    frames: [
      HEADER_BRAND_CLOSED_SMILE_FRAME,
      "/animation/abrir-sorriso-1.png",
      HEADER_BRAND_OPEN_SMILE_FRAME,
    ],
  },
} as const;

const HEADER_BRAND_MACRO_CYCLE = [
  "blinkSmiling",
  "closeSmile",
  "openSmile",
] as const;

type HeaderBrandBlockName = keyof typeof HEADER_BRAND_BLOCKS;

const portfolioKickerClassName =
  "m-0 font-mono text-[0.72rem] font-semibold leading-[1.1] tracking-normal text-portfolio-secondary uppercase";

const portfolioSectionHeadingClassName = "grid gap-3";

const portfolioEditorialStackClassName =
  "grid gap-y-20 pb-14 max-md:gap-y-16 max-md:pb-10 [&>section]:mt-0";

const sectionSpacingClassNames = {
  "page-start": "mt-0",
  stack:
    "mt-[var(--portfolio-section-stack-space)] max-md:mt-[var(--portfolio-section-stack-space-mobile)]",
  "stack-tight":
    "mt-[var(--portfolio-section-stack-space-tight)] max-md:mt-[var(--portfolio-section-stack-space-tight-mobile)]",
  "stack-loose":
    "mt-[var(--portfolio-section-stack-space-loose)] max-md:mt-[var(--portfolio-section-stack-space-loose-mobile)]",
} satisfies Record<PortfolioSectionSpacing, string>;

const getRandomHeaderBrandGreetingIndex = (
  recentGreetingIndexes: readonly number[],
  currentGreetingIndex: number,
) => {
  const greetingCount = headerBrandGreetings.length;

  if (greetingCount <= 1) {
    return 0;
  }

  const getCandidates = (blockedIndexes: readonly number[]) => {
    const candidates: number[] = [];

    for (let index = 0; index < greetingCount; index += 1) {
      if (blockedIndexes.indexOf(index) === -1) {
        candidates.push(index);
      }
    }

    return candidates;
  };

  let candidates = getCandidates(recentGreetingIndexes);

  if (candidates.length === 0) {
    const mostRecentGreetingIndex =
      recentGreetingIndexes[0] ?? currentGreetingIndex;
    candidates = getCandidates([mostRecentGreetingIndex]);
  }

  if (candidates.length === 0) {
    return currentGreetingIndex;
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
};

function HeaderBrandAnimation({
  isActive,
  onInteractionChange,
}: HeaderBrandAnimationProps) {
  const [frameSrc, setFrameSrc] = useState(HEADER_BRAND_IDLE_FRAME);
  const [greetingAnimationKey, setGreetingAnimationKey] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const recentGreetingIndexesRef = useRef<number[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preloadedFrames = Array.from(
      new Set(
        Object.values(HEADER_BRAND_BLOCKS).flatMap((block) => block.frames),
      ),
    ).map((src) => {
      const image = new window.Image();
      image.src = src;
      return image;
    });

    let timeoutId: number | null = null;

    const stopAnimation = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const scheduleTimeout = (callback: () => void, delayMs: number) => {
      timeoutId = window.setTimeout(() => {
        callback();
      }, delayMs);
    };

    const scheduleCycleStep = (cycleIndex: number) => {
      const blockName =
        HEADER_BRAND_MACRO_CYCLE[cycleIndex] ?? HEADER_BRAND_MACRO_CYCLE[0];

      playBlock(blockName, 0, cycleIndex);
    };

    const playBlock = (
      blockName: HeaderBrandBlockName,
      frameIndex: number,
      cycleIndex: number,
    ) => {
      const block = HEADER_BRAND_BLOCKS[blockName];
      const currentFrame = block.frames[frameIndex] ?? HEADER_BRAND_IDLE_FRAME;

      setFrameSrc(currentFrame);

      if (frameIndex < block.frames.length - 1) {
        scheduleTimeout(() => {
          playBlock(blockName, frameIndex + 1, cycleIndex);
        }, block.frameStepMs);
        return;
      }

      scheduleTimeout(() => {
        setFrameSrc(block.cooldownFrameSrc);

        scheduleTimeout(() => {
          const nextCycleIndex =
            (cycleIndex + 1) % HEADER_BRAND_MACRO_CYCLE.length;
          scheduleCycleStep(nextCycleIndex);
        }, block.cooldownMs);
      }, block.frameStepMs);
    };

    const syncAnimation = () => {
      stopAnimation();
      setFrameSrc(HEADER_BRAND_IDLE_FRAME);

      if (mediaQuery.matches) {
        return;
      }

      scheduleTimeout(() => {
        scheduleCycleStep(0);
      }, HEADER_BRAND_INITIAL_IDLE_HOLD_MS);
    };

    syncAnimation();

    const handleMediaChange = () => {
      syncAnimation();
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      stopAnimation();

      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }

      preloadedFrames.length = 0;
    };
  }, []);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    setGreetingAnimationKey((key) => key + 1);
    setGreetingIndex((index) => {
      const nextGreetingIndex = getRandomHeaderBrandGreetingIndex(
        recentGreetingIndexesRef.current,
        index,
      );
      const nextRecentGreetingIndexes = recentGreetingIndexesRef.current.slice(
        0,
        HEADER_BRAND_GREETING_RECENT_LIMIT - 1,
      );

      nextRecentGreetingIndexes.unshift(nextGreetingIndex);
      recentGreetingIndexesRef.current = nextRecentGreetingIndexes;

      return nextGreetingIndex;
    });
  }, [isActive]);

  const currentGreeting =
    headerBrandGreetings[greetingIndex] ?? "Shipping first. Panicking second.";

  const openGreeting = () => {
    onInteractionChange(true);
  };

  const closeGreeting = () => {
    onInteractionChange(false);
  };

  const handleGreetingMouseLeave = (event: MouseEvent<HTMLSpanElement>) => {
    const activeElement = document.activeElement;

    if (activeElement && event.currentTarget.contains(activeElement)) {
      return;
    }

    closeGreeting();
  };

  const handleGreetingBlur = (event: FocusEvent<HTMLSpanElement>) => {
    const nextFocusTarget = event.relatedTarget;

    if (
      nextFocusTarget instanceof Node &&
      event.currentTarget.contains(nextFocusTarget)
    ) {
      return;
    }

    if (event.currentTarget.matches(":hover")) {
      return;
    }

    closeGreeting();
  };

  return (
    <span
      className="absolute left-[0.72rem] top-[0.22rem] isolate z-[2] inline-flex -translate-y-[22%] items-start max-md:left-[0.64rem] max-md:top-[0.18rem] max-md:-translate-y-[18%]"
      data-greeting-open={isActive ? "true" : "false"}
      onMouseEnter={openGreeting}
      onMouseLeave={handleGreetingMouseLeave}
      onFocus={openGreeting}
      onBlur={handleGreetingBlur}
    >
      <Link
        href="/"
        className="relative z-[2] block leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-portfolio-accent"
        aria-label="Go to home"
      >
        <span className="block size-[3.1rem] shrink-0 overflow-hidden max-md:size-[2.72rem]">
          <img
            src={frameSrc}
            alt=""
            aria-hidden="true"
            className="block size-[3.1rem] shrink-0 object-cover object-top max-md:size-[2.72rem]"
          />
        </span>
      </Link>

      <span
        className={cn(
          "pointer-events-none absolute left-[-0.08rem] top-[calc(100%_+_0.3rem)] z-[3] w-max min-w-0 origin-left border border-portfolio-border bg-portfolio-surface px-[0.58rem] pb-[0.42rem] pt-[0.44rem] shadow-none transition-[opacity,transform,visibility] duration-portfolio-200 ease-portfolio motion-reduce:transform-none motion-reduce:transition-opacity motion-reduce:duration-portfolio-150 max-md:left-[-0.04rem] max-md:top-[calc(100%_+_0.24rem)] max-md:max-w-none max-md:px-2 max-md:pb-[0.36rem] max-md:pt-[0.38rem]",
          isActive
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-[0.2rem] opacity-0",
        )}
        aria-hidden="true"
      >
        <span className="absolute left-[0.92rem] top-[-0.38rem] size-[0.72rem] rotate-45 border-l border-t border-portfolio-border bg-portfolio-surface max-md:left-[0.78rem] max-md:top-[-0.34rem] max-md:size-[0.64rem]" />
        <span className="relative z-[1] block">
          {isActive ? (
            <TypingAnimation
              key={greetingAnimationKey}
              as="span"
              className="block whitespace-normal font-mono text-[0.68rem] font-semibold leading-[1.15] tracking-normal text-portfolio-primary max-md:text-[0.6rem]"
              delay={120}
              duration={42}
              startOnView={false}
              showCursor
            >
              {currentGreeting}
            </TypingAnimation>
          ) : null}
        </span>
      </span>
    </span>
  );
}

function HeaderConfigMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { isDark, mounted, toggleLabel, toggleTheme } = useThemeToggle();
  const ThemeIcon = mounted && isDark ? Sun : Moon;
  const nextThemeLabel = mounted && isDark ? "Light" : "Dark";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          aria-label="Open config"
          aria-haspopup="menu"
          aria-expanded={open}
          className="inline-flex min-w-[1.15rem] cursor-pointer appearance-none items-center justify-center border-0 border-b border-portfolio-surface bg-transparent pb-[0.24rem] font-mono text-[0.78rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-secondary transition-colors duration-150 ease-portfolio hover:border-portfolio-accent hover:text-portfolio-accent focus-visible:border-portfolio-accent focus-visible:text-portfolio-primary focus-visible:outline-none aria-expanded:border-portfolio-primary aria-expanded:text-portfolio-primary max-md:text-[0.72rem]"
        >
          <Settings2 className="size-[0.92rem] shrink-0" />
          <span className="sr-only">Config</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={8}
        sideOffset={10}
        className="!w-[9.5rem] !min-w-[9.5rem] !rounded-[var(--portfolio-radius-lg)] !border !bg-portfolio-surface !p-1 !font-mono"
        style={{
          borderColor: "var(--portfolio-floating-border)",
          boxShadow: "var(--portfolio-floating-shadow)",
        }}
      >
        <DropdownMenuItem
          className="!min-h-10 !cursor-pointer !rounded-[var(--portfolio-radius-md)] !px-[0.8rem] !py-[0.7rem] !font-mono !text-[0.78rem] !font-semibold !uppercase !leading-[1.1] !tracking-normal !text-portfolio-secondary !transition-colors !duration-150 !ease-portfolio data-[highlighted]:!bg-portfolio-highlight data-[highlighted]:!text-portfolio-primary"
          aria-label={toggleLabel}
          onSelect={() => {
            toggleTheme(triggerRef.current);
            setOpen(false);
          }}
        >
          <span className="inline-flex items-center gap-2 font-mono text-[0.78rem] font-semibold uppercase leading-[1.1] tracking-normal [font-variant-ligatures:none]">
            <ThemeIcon className="size-[0.82rem] shrink-0" />
            <span className="font-mono text-[0.78rem] font-semibold uppercase leading-[1.1] tracking-normal [font-variant-ligatures:none]">
              {nextThemeLabel}
            </span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PortfolioLayout({
  title,
  description,
  children,
}: PortfolioLayoutProps) {
  const router = useRouter();
  const [isHeaderBrandInteractionActive, setIsHeaderBrandInteractionActive] =
    useState(false);
  const [
    isHomeNavigationInteractionActive,
    setIsHomeNavigationInteractionActive,
  ] = useState(false);
  const isHeaderHomeGroupActive =
    isHeaderBrandInteractionActive || isHomeNavigationInteractionActive;
  const isHomePage = router.pathname === "/";
  const contentShellClassName = cn(
    "mx-auto w-[calc(100%_-_2rem)]",
    isHomePage ? "max-w-5xl" : "max-w-3xl",
  );
  const footerShellClassName =
    "mx-auto w-[calc(100%_-_2rem)] max-w-5xl";

  const handleHomeNavigationMouseLeave = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    const activeElement = document.activeElement;

    if (activeElement && event.currentTarget.contains(activeElement)) {
      return;
    }

    setIsHomeNavigationInteractionActive(false);
  };

  const handleHomeNavigationBlur = (event: FocusEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.matches(":hover")) {
      return;
    }

    setIsHomeNavigationInteractionActive(false);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="flex min-h-screen flex-col overflow-x-clip bg-portfolio-neutral text-portfolio-primary">
        <div className="fixed left-1/2 top-4 z-30 -translate-x-1/2 max-md:left-0 max-md:right-0 max-md:translate-x-0">
          <div className="w-fit max-w-[calc(100vw_-_2rem)] p-0 max-md:mx-auto max-md:w-[min(calc(100vw_-_1rem),24rem)] max-md:max-w-none">
            <header className="portfolio-floating-card relative flex min-h-[2.8rem] w-fit items-center justify-between gap-4 py-[0.6rem] pb-[0.54rem] pl-[4.28rem] pr-[0.96rem] max-md:min-h-[2.62rem] max-md:w-full max-md:gap-[0.56rem] max-md:py-[0.56rem] max-md:pb-2 max-md:pl-[3.64rem] max-md:pr-[0.72rem] max-[360px]:pl-[3.35rem] max-[360px]:pr-2">
              <HeaderBrandAnimation
                isActive={isHeaderHomeGroupActive}
                onInteractionChange={setIsHeaderBrandInteractionActive}
              />

              <nav
                className="flex w-full flex-1 items-center justify-between gap-[1.1rem] whitespace-nowrap max-md:gap-[0.48rem] max-[360px]:gap-1"
                aria-label="Primary navigation"
              >
                {navigationLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={
                      item.href === "/"
                        ? () => setIsHomeNavigationInteractionActive(true)
                        : undefined
                    }
                    onMouseLeave={
                      item.href === "/"
                        ? handleHomeNavigationMouseLeave
                        : undefined
                    }
                    onFocus={
                      item.href === "/"
                        ? () => setIsHomeNavigationInteractionActive(true)
                        : undefined
                    }
                    onBlur={
                      item.href === "/" ? handleHomeNavigationBlur : undefined
                    }
                    aria-current={
                      router.pathname === item.href ||
                      (item.href !== "/" &&
                        router.pathname.startsWith(`${item.href}/`))
                        ? "page"
                        : undefined
                    }
                    className={cn(
                      "border-b border-portfolio-surface pb-[0.24rem] font-mono text-[0.78rem] font-semibold leading-[1.1] tracking-normal text-portfolio-secondary no-underline transition-colors duration-150 ease-portfolio hover:border-portfolio-accent hover:text-portfolio-accent focus-visible:border-portfolio-accent focus-visible:text-portfolio-primary focus-visible:outline-none aria-[current=page]:border-portfolio-primary aria-[current=page]:text-portfolio-primary max-md:text-[0.68rem] max-[360px]:text-[0.62rem]",
                      item.preserveCase ? "normal-case" : "uppercase",
                      item.href === "/" &&
                        isHeaderHomeGroupActive &&
                        "border-portfolio-accent text-portfolio-accent",
                    )}
                  >
                    {item.number}. {item.label}
                  </Link>
                ))}

                <HeaderConfigMenu />
              </nav>
            </header>
          </div>
        </div>

        <div className={cn(contentShellClassName, "flex-1")}>
          <div className="relative mx-auto w-full px-[clamp(1rem,2.4vw,var(--portfolio-space-xl))] pb-32 pt-[var(--portfolio-header-offset)] max-md:px-4 max-md:pb-20 max-md:pt-[var(--portfolio-header-offset-mobile)]">
            <main className="min-w-0">{children}</main>
          </div>
        </div>

        <div
          className={cn(
            footerShellClassName,
            "mb-8 mt-auto px-[clamp(1rem,2.4vw,var(--portfolio-space-xl))] max-md:px-4",
          )}
        >
          <footer className="portfolio-floating-card w-full overflow-hidden p-0">
            <div
              className="grid gap-px bg-portfolio-border [grid-template-columns:repeat(var(--portfolio-footer-columns,1),minmax(0,1fr))] max-[900px]:grid-cols-1 max-md:grid-cols-1"
              style={
                {
                  "--portfolio-footer-columns": String(contactLinks.length),
                } as CSSProperties
              }
            >
              {contactLinks.map((item) => {
                const Icon = item.icon;
                const opensInNewTab =
                  item.href.startsWith("http") || item.href.endsWith(".pdf");

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={opensInNewTab ? "_blank" : undefined}
                    rel={opensInNewTab ? "noopener noreferrer" : undefined}
                    className="flex min-h-0 items-center justify-between gap-3 bg-portfolio-surface p-[0.9rem_1rem] text-inherit no-underline transition-colors duration-150 ease-portfolio hover:bg-portfolio-highlight hover:text-portfolio-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent"
                  >
                    <div className="flex w-full min-w-0 items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-[0.6rem]">
                        <Icon className="size-5 shrink-0 text-portfolio-accent" />
                        <div className="flex min-w-0 flex-wrap items-baseline gap-[0.35rem]">
                          <span className="inline text-[0.88rem] font-semibold leading-[1.4] text-portfolio-primary">
                            {item.title}
                          </span>
                          <span className="inline text-[0.68rem] leading-[1.35] text-portfolio-secondary [overflow-wrap:anywhere]">
                            {item.value}
                          </span>
                        </div>
                      </div>

                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </a>
                );
              })}
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export function PortfolioEditorialStack({
  children,
  className,
  ...props
}: PortfolioEditorialStackProps) {
  return (
    <div className={cn(portfolioEditorialStackClassName, className)} {...props}>
      {children}
    </div>
  );
}

export function PortfolioPageIntro({
  kicker,
  title,
  titleVisual,
  description,
  action,
}: PortfolioPageIntroProps) {
  const hasSide = Boolean(action);

  return (
    <PortfolioSection spacing="page-start">
      <div
        className={cn(
          "grid items-end gap-portfolio-xl max-[900px]:grid-cols-1",
          hasSide
            ? "grid-cols-[minmax(0,1fr)_minmax(260px,0.65fr)]"
            : "grid-cols-1",
        )}
      >
        <div className={portfolioSectionHeadingClassName}>
          <p className={portfolioKickerClassName}>{kicker}</p>
          <h1
            className="m-0 text-[2rem] font-bold leading-[1.02] tracking-normal text-portfolio-primary md:text-[2.5rem] lg:text-[3rem]"
            aria-label={title}
          >
            {titleVisual ?? title}
          </h1>
          {description ? (
            <p className="m-0 text-sm leading-[1.65] text-portfolio-secondary">
              {description}
            </p>
          ) : null}
        </div>

        {hasSide ? (
          <div className="grid justify-items-start gap-portfolio-lg">
            {action ? <div>{action}</div> : null}
          </div>
        ) : null}
      </div>
    </PortfolioSection>
  );
}

export function PortfolioSection({
  children,
  className,
  spacing = "stack",
  ...props
}: PortfolioSectionProps) {
  return (
    <section
      className={cn(sectionSpacingClassNames[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function PortfolioSectionBody({
  children,
  className,
  ...props
}: PortfolioSectionBodyProps) {
  return (
    <div
      className={cn(
        "mt-[var(--portfolio-section-body-gap)] max-md:mt-[var(--portfolio-section-body-gap-mobile)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PortfolioCollection({
  children,
  className,
  columns,
  ...props
}: PortfolioCollectionProps) {
  return (
    <div
      className={cn(
        "grid gap-portfolio-sm data-[columns=1]:grid-cols-1 data-[columns=2]:grid-cols-2 max-[900px]:data-[columns=2]:grid-cols-1 [&>article>[data-portfolio-card-surface]]:h-full [&>article>[data-portfolio-card-surface]]:min-h-0 [&>article]:h-full [&>article]:min-w-0",
        className,
      )}
      data-columns={columns}
      {...props}
    >
      {children}
    </div>
  );
}
