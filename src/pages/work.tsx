import { WorkProjectCard } from "@/components/featured-project-card";
import {
  PortfolioCollection,
  PortfolioEditorialStack,
  PortfolioLayout,
  PortfolioPageIntro,
  PortfolioSection,
  PortfolioSectionBody,
} from "@/components/portfolio-shell";
import { ProfessionalWorkCard } from "@/components/professional-work-card";
import { WordRotate } from "@/components/ui/word-rotate";
import {
  orderedIndependentProjects,
  orderedProfessionalWork,
  orderedResearchProjects,
} from "@/lib/portfolio-content";

const WORK_TITLE_VARIANTS = ["Builds.", "Products.", "Systems.", "Projects."];

export default function WorkPage() {
  const researchIndexOffset = orderedProfessionalWork.length;
  const independentIndexOffset =
    orderedProfessionalWork.length + orderedResearchProjects.length;

  return (
    <PortfolioLayout
      title="Work | rckbrcls"
      description="Professional work, research, and independent projects by Erick Barcelos."
    >
      <PortfolioEditorialStack>
        <PortfolioPageIntro
          kicker="Work"
          title="Builds."
          titleVisual={<WordRotate words={WORK_TITLE_VARIANTS} />}
        />

        <PortfolioSection spacing="stack-tight">
          <PortfolioSectionBody>
            <PortfolioCollection columns={1}>
              {orderedProfessionalWork.map((item, index) => (
                <ProfessionalWorkCard
                  key={item.slug}
                  item={item}
                  index={index}
                />
              ))}
              {orderedResearchProjects.map((project, index) => (
                <WorkProjectCard
                  key={project.slug}
                  project={project}
                  index={researchIndexOffset + index}
                />
              ))}
              {orderedIndependentProjects.map((project, index) => (
                <WorkProjectCard
                  key={project.slug}
                  project={project}
                  index={independentIndexOffset + index}
                />
              ))}
            </PortfolioCollection>
          </PortfolioSectionBody>
        </PortfolioSection>
      </PortfolioEditorialStack>
    </PortfolioLayout>
  );
}
