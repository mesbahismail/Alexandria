import { notFound } from "next/navigation";
import Website from "@/components/website";
import { projects } from "@/registry/alexandria/data";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  return { title: project ? `${project.title} — Alexandria Klaus` : "Project not found", description: project?.summary };
}
export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!projects.some(project => project.slug === slug)) notFound();
  return <Website page="case-study" projectSlug={slug} />;
}
