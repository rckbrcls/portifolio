import { LabProductCard } from "@/components/labs/lab-product-card";
import {
  PortfolioCollection,
  PortfolioEditorialStack,
  PortfolioLayout,
  PortfolioPageIntro,
  PortfolioSection,
  PortfolioSectionBody,
} from "@/components/portfolio-shell";
import { orderedLabProducts } from "@/lib/labs";

export default function LabsPage() {
  return (
    <PortfolioLayout
      title="Labs | rckbrcls"
      description="Small products by Erick Barcelos that you can play, install, or explore."
    >
      <PortfolioEditorialStack>
        <PortfolioPageIntro
          kicker="Labs"
          title="Products you can use."
          description="Small products you can play, install, or explore."
        />

        <PortfolioSection spacing="stack-tight">
          <PortfolioSectionBody>
            <PortfolioCollection columns={1}>
              {orderedLabProducts.map((product, index) => (
                <LabProductCard
                  key={product.slug}
                  product={product}
                  index={index}
                />
              ))}
            </PortfolioCollection>
          </PortfolioSectionBody>
        </PortfolioSection>
      </PortfolioEditorialStack>
    </PortfolioLayout>
  );
}
