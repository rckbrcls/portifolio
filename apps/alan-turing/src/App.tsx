import { Component } from "solid-js";
import ScrollButton from "./components/ScrollButton";
import ProfileSection from "./components/ProfileSection";
import { profiles } from "./data/profiles";
import { Header } from "./components/Header";
import { IntroductionSection } from "./components/IntroductionSection";
import { Timeline } from "./components/Timeline";
import { Concepts } from "./components/Concepts";
import { Applications } from "./components/Applications";
import { EducationalResources } from "./components/EducationalResources";
import { InfluenceAndLegacy } from "./components/Legacy";
import { TextContainer } from "./components/TextContainer";

const App: Component = () => {
  let mainDiv: HTMLDivElement | null = null;

  return (
    <>
      <div
        ref={(el) => (mainDiv = el)}
        class="z-0 md:h-screen md:flex-grow md:snap-y md:snap-mandatory md:overflow-y-scroll"
      >
        <IntroductionSection />
        <div>
          {profiles.map((profile) => (
            <ProfileSection
              image={profile.image}
              alt={profile.alt}
              title={profile.title}
              life={profile.life}
              contributions={profile.contributions}
              legacy={profile.legacy}
            />
          ))}
        </div>
        <Timeline />
        <Concepts />
        <Applications />
        <EducationalResources />
        <InfluenceAndLegacy />

        <TextContainer title="Formulário" className="items-center">
          <a
            href={
              "https://docs.google.com/forms/d/e/1FAIpQLSesJiSV_hgKwIK7McDH5n58am5284Bd7wUSyXMoygk9acq70w/viewform?usp=sf_link"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <p class="underline">
              Clique aqui para abrir o formulário no Google Forms
            </p>
          </a>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSesJiSV_hgKwIK7McDH5n58am5284Bd7wUSyXMoygk9acq70w/viewform?embedded=true"
            class="mt-5 h-svh w-full rounded-xl md:w-1/2"
          >
            Carregando…
          </iframe>
        </TextContainer>
      </div>
      <Header mainRef={mainDiv} />
      <ScrollButton mainRef={mainDiv} />
    </>
  );
};

export default App;
