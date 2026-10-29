import AlexandriaResume, { type WebsitePage } from "@/registry/alexandria/resume";

export default function Website({ page = "home", projectSlug }: { page?: WebsitePage; projectSlug?: string }) {
  return <AlexandriaResume page={page} projectSlug={projectSlug} portraitUrl="/images/homepage-portrait.jpg" imageUrls={[
    "/images/service-product.jpg", "/images/service-visual.jpg", "/images/service-strategy.jpg",
    "/images/work-analytics.jpg", "/images/work-workspace.jpg", "/images/work-portfolio.jpg",
  ]} registryHref="/registry" />;
}
