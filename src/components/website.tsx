import AlexandriaResume, { type WebsitePage } from "@/registry/alexandria/resume";

export default function Website({ page = "home", projectSlug }: { page?: WebsitePage; projectSlug?: string }) {
  return <AlexandriaResume page={page} projectSlug={projectSlug} portraitUrl="/images/homepage-portrait.jpg" imageUrls={[
    "/images/service-architecture.jpg", "/images/service-interior.jpg", "/images/service-direction.jpg",
    "/images/work-courtyard.jpg", "/images/work-urban.jpg", "/images/work-lightwell.jpg",
    "/images/work-pavilion.jpg", "/images/work-retreat.jpg",
    "/images/study-facade.jpg", "/images/study-tower.jpg", "/images/study-planes.jpg",
    "/images/study-structure.jpg", "/images/study-concrete.jpg",
  ]} registryHref="/registry" />;
}
