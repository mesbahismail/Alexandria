import Link from "next/link";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Alexandria — shadcn Registry" };

export default async function RegistryPage() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const command = `npx shadcn@latest add ${origin}/r/alexandria-website.json`;
  return <main className="mx-auto min-h-screen max-w-4xl px-6 py-20">
    <Link href="/" className="text-sm text-[#e1b77b]">← Back to Alexandria</Link>
    <p className="mt-16 text-xs tracking-[.2em] text-[#e1b77b]">THE COMPONENT REGISTRY</p>
    <h1 className="mt-5 text-5xl tracking-tight">Alexandria, ready to install.</h1>
    <p className="mt-6 max-w-2xl leading-7 text-neutral-400">The Alexandria senior architect portfolio, packaged for the shadcn registry. Includes Home, Services, Work, case studies, About, and Contact, with the original charcoal and gold identity.</p>
    <article className="mt-12 rounded-lg border border-white/15 p-7">
      <span className="text-xs text-[#e1b77b]">REGISTRY:BLOCK · NEXT.JS · MUI JOY</span>
      <h2 className="mt-4 text-2xl">Alexandria Website</h2>
      <p className="mt-3 leading-7 text-neutral-400">Run this command from a project with shadcn/ui configured, to install the website components and App Router pages. Review route files before replacing existing pages.</p>
      <pre className="my-6 overflow-x-auto rounded-md border border-white/10 bg-black/25 p-5 text-sm text-[#e1b77b]"><code>{command}</code></pre>
      <pre className="mb-6 overflow-x-auto text-sm leading-7 text-neutral-300"><code>{`import AlexandriaResume from "@/components/alexandria/resume";\n\nexport default function Page() {\n  return <AlexandriaResume />;\n}`}</code></pre>
      <div className="flex flex-wrap gap-3"><Button asChild><Link href="/">View live preview ↗</Link></Button><Button asChild variant="outline"><a href="/r/alexandria-website.json">View item JSON</a></Button><Button asChild variant="outline"><a href="/r/registry.json">Browse catalog</a></Button></div>
    </article>
    <p className="mt-8 text-sm leading-7 text-neutral-400">Replace the sample name, project content, and contact email before publishing your website. Pass your own portrait image URL with the <code>portraitUrl</code> prop. The smaller component-only item is also available at /r/alexandria-resume.json.</p>
    <p className="mt-5 text-sm text-neutral-500">Source: <a className="underline" href="https://github.com/mesbahismail/Alexandria">mesbahismail/Alexandria</a></p>
  </main>;
}
