import Image from "next/image";
import Link from "next/link";
import {
  PortfolioEditorialStack,
  PortfolioLayout,
  PortfolioSection,
} from "@/components/portfolio-shell";

const narrativeLinkClassName =
  "mx-[0.04em] inline-block whitespace-nowrap rounded-[var(--portfolio-radius-lg)] border border-[color:var(--portfolio-action-border)] bg-portfolio-accent px-[0.22em] py-[0.04em] align-baseline text-white no-underline [box-shadow:var(--portfolio-floating-shadow)] transition-[background-color,border-color,color] duration-portfolio-180 ease-portfolio-hover hover:border-[color:var(--portfolio-action-border-hover)] hover:bg-portfolio-accent-hover hover:text-white focus-visible:border-[color:var(--portfolio-action-border-hover)] focus-visible:bg-portfolio-accent-hover focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent";

const narrativeParagraphClassName =
  "mx-auto my-0 w-full text-center text-[clamp(1.25rem,2.5vw,2.25rem)] font-medium leading-[1.28] tracking-[-0.015em] text-portfolio-primary";

const heroImageShellClassName =
  "relative grid w-full place-items-center justify-self-stretch [--portfolio-hero-image-width:min(100%,27rem)] max-[900px]:w-[min(100%,22rem)] max-[900px]:justify-self-center max-[900px]:[--portfolio-hero-image-width:min(100%,22rem)] max-md:w-[min(72vw,18rem)] max-md:[--portfolio-hero-image-width:min(72vw,18rem)]";

const heroImageHitAreaClassName =
  "peer absolute inset-0 z-[2] m-auto aspect-[1019/917] h-auto w-[var(--portfolio-hero-image-width)] [clip-path:polygon(13%_21%,47%_0%,79%_22%,82%_36%,89%_44%,90%_68%,100%_74%,100%_92%,88%_100%,62%_100%,44%_84%,24%_86%,2%_67%,0%_43%)]";

const heroImageShadowClassName =
  "pointer-events-none absolute inset-0 m-auto aspect-[1019/917] h-auto w-[var(--portfolio-hero-image-width)] translate-y-1 scale-[0.985] bg-portfolio-primary opacity-0 transition-[opacity,transform] duration-[280ms] ease-portfolio [-webkit-mask:url(/images/turing.png)_center/contain_no-repeat] [mask:url(/images/turing.png)_center/contain_no-repeat] [@media(hover:hover)_and_(pointer:fine)]:peer-hover:translate-y-[0.55rem] [@media(hover:hover)_and_(pointer:fine)]:peer-hover:scale-100 [@media(hover:hover)_and_(pointer:fine)]:peer-hover:opacity-[0.18] motion-reduce:transform-none motion-reduce:transition-opacity motion-reduce:duration-portfolio-150 motion-reduce:peer-hover:transform-none";

const heroImageClassName =
  "pointer-events-none relative z-[1] block h-auto w-[var(--portfolio-hero-image-width)] transition-transform duration-[280ms] ease-portfolio [@media(hover:hover)_and_(pointer:fine)]:peer-hover:-translate-y-[0.4rem] motion-reduce:transform-none motion-reduce:transition-none motion-reduce:peer-hover:transform-none";

export default function Home() {
  return (
    <PortfolioLayout
      title="rckbrcls | Portfolio"
      description="Erick Barcelos is a software engineer in São Paulo. I ship production software, research tools, and small products I actually want to use."
    >
      <PortfolioEditorialStack>
        <PortfolioSection spacing="page-start">
          <div className="grid justify-items-center text-center">
            <div className={heroImageShellClassName}>
              <span aria-hidden="true" className={heroImageHitAreaClassName} />
              <span aria-hidden="true" className={heroImageShadowClassName} />
              <Image
                src="/images/turing.png"
                alt="Line illustration of a Turing machine"
                width={1019}
                height={917}
                priority
                sizes="(min-width: 1200px) 384px, (min-width: 901px) 32vw, (min-width: 769px) 300px, 72vw"
                className={heroImageClassName}
              />
            </div>
          </div>
        </PortfolioSection>

        <PortfolioSection spacing="stack-loose">
          <div className="grid justify-items-center gap-[clamp(2rem,5vw,4.5rem)] text-center">
            <h1 className={narrativeParagraphClassName}>
              I am Erick Barcelos. I like turning messy ideas into software that
              holds up. Backend and distributed systems are where I feel most at
              home, but I move around the stack when that is what the problem
              needs.
            </h1>

            <p className={narrativeParagraphClassName}>
              At{" "}
              <Link href="/work/btg-pactual" className={narrativeLinkClassName}>
                BTG Pactual
              </Link>
              , my official title is IT Assistant. Day to day I ship
              foreign-exchange software with domain experts and other engineers:
              shaping how a feature should work, writing frontend and backend
              code, and getting it ready for production.
            </p>

            <p className={narrativeParagraphClassName}>
              At the University of São Paulo I have studied Computer Science and
              Information Systems, and I have built research software in
              information retrieval and geospatial computing. One of those
              projects is{" "}
              <Link href="/work/urbanus" className={narrativeLinkClassName}>
                Urbanus
              </Link>
              : a web platform that turns public map data, elevation, and an
              edited street graph into gravity-aware routing for early
              sanitation planning.
            </p>

            <p className={narrativeParagraphClassName}>
              Outside work and research I build tools I actually want open on my
              own machine.{" "}
              <Link href="/work/dost" className={narrativeLinkClassName}>
                DOST
              </Link>{" "}
              is my clothing brand and the store I engineered for it.{" "}
              <Link href="/labs/duplizen" className={narrativeLinkClassName}>
                Duplizen
              </Link>{" "}
              is a browser game I made so friends could play impostor from their
              own phones.{" "}
              <Link href="/labs/sparky" className={narrativeLinkClassName}>
                Sparky
              </Link>{" "}
              is a local-first macOS app I built for ideas, reminders, and focus
              sessions.
            </p>

            <p className={narrativeParagraphClassName}>
              I write about what I am learning, and I have helped with
              programming education and volunteer software around the university.
              Away from the keyboard I care about martial arts, cinema, and
              football. I was born in Belém, Pará, and I live in São Paulo now.
            </p>
          </div>
        </PortfolioSection>
      </PortfolioEditorialStack>
    </PortfolioLayout>
  );
}
