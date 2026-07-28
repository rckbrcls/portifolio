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
      description="Erick Barcelos is a software engineer based in São Paulo, working across professional work, research software, independent engineering, and usable product experiments."
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
              I am Erick Barcelos. I enjoy taking software from an early idea to
              something people can rely on. I feel most at home in backend and
              distributed systems, but I am comfortable moving across the stack
              when the work calls for it.
            </h1>

            <p className={narrativeParagraphClassName}>
              At{" "}
              <Link href="/work/btg-pactual" className={narrativeLinkClassName}>
                BTG Pactual
              </Link>
              , I work as an IT Assistant on mission-critical FX workflows. I
              help shape the technical architecture of features and implement
              capabilities across both frontend and backend, working with domain
              experts and engineering teams to turn complex requirements into
              production software.
            </p>

            <p className={narrativeParagraphClassName}>
              My academic path at the University of São Paulo includes Computer
              Science and Information Systems. At USP, I have worked on research
              software in information retrieval and geospatial computing,
              including{" "}
              <Link href="/work/urbanus" className={narrativeLinkClassName}>
                Urbanus
              </Link>
              , a geospatial decision-support platform combining public data,
              graph algorithms, and expert feedback for preliminary sanitation
              planning.
            </p>

            <p className={narrativeParagraphClassName}>
              My independent engineering projects include{" "}
              <Link href="/work/dost" className={narrativeLinkClassName}>
                DOST
              </Link>
              , a full-stack commerce platform spanning catalog, checkout,
              shipping, and orders. I have also built{" "}
              <Link href="/labs/duplizen" className={narrativeLinkClassName}>
                Duplizen
              </Link>
              , a browser-based social-deduction game, and{" "}
              <Link href="/labs/sparky" className={narrativeLinkClassName}>
                Sparky
              </Link>
              , a local-first macOS companion for memories, planning, and focus.
            </p>

            <p className={narrativeParagraphClassName}>
              I write about what I learn and have supported programming
              education and volunteer software projects through university
              initiatives. Away from code, I enjoy martial arts, cinema, and
              football. I was born in Belém, Pará, and now live in São Paulo.
            </p>
          </div>
        </PortfolioSection>
      </PortfolioEditorialStack>
    </PortfolioLayout>
  );
}
