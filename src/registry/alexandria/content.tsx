"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { TbArrowLeft, TbArrowRight, TbArrowUpRight, TbCheck, TbMail } from "react-icons/tb";
import { defaultImages, projects, services } from "./data";
import styles from "./resume.module.css";

function PageHeading({ label, title, description, tone = "gold" }: { label: string; title: string; description: string; tone?: "gold" | "rose" }) {
  const split = title.lastIndexOf(" ");
  return <div className={styles.pageHeading} data-tone={tone}><span className={styles.eyebrow}>{label}</span><h1>{split >= 0 ? <>{title.slice(0, split)} <em className={styles.headlineAccent}>{title.slice(split + 1)}</em></> : title}</h1><p>{description}</p><span className={styles.goldRule} /></div>;
}

export function ServicesPage({ imageUrls }: { imageUrls: string[] }) {
  return <div className={styles.innerPage}>
    <PageHeading label="HOW I CAN HELP" title="My services" description="Thoughtful solutions, from the first question to the final detail." />
    <div className={styles.serviceRows}>{services.map((service, index) => <article key={service.title} className={styles.serviceRow}>
      <div className={styles.servicePhoto}><Image src={imageUrls[index] ?? defaultImages[index]} alt={service.alt} fill unoptimized sizes="(max-width: 700px) 90vw, 45vw" /></div>
      <div className={styles.serviceCopy}><span className={styles.eyebrow}>0{index + 1} / DESIGN SERVICES</span><h2>{service.title}</h2><p>{service.description}</p><ul>{service.deliverables.map(item => <li key={item}><TbCheck />{item}</li>)}</ul><Link href="/contact" className={styles.inlineLink}>Let’s discuss your project <TbArrowUpRight /></Link></div>
    </article>)}</div>
  </div>;
}

export function WorkPage({ imageUrls }: { imageUrls: string[] }) {
  return <div className={styles.innerPage}>
    <PageHeading label="SELECTED PROJECTS" title="Selected work" description="A closer look at the thinking, process, and details behind the design." />
    <div className={styles.workGallery}>{projects.map((project, index) => <Link href={`/work/${project.slug}`} key={project.slug} className={`${styles.workLink} ${styles.projectCard}`}>
      <div className={styles.workPhoto}><Image src={imageUrls[index + 3] ?? defaultImages[index + 3]} alt={project.alt} fill unoptimized sizes="(max-width: 700px) 90vw, 45vw" /><span className={styles.imageLabel}>CONCEPT PROJECT / 0{index + 1}</span></div>
      <div className={styles.workCaption}><div><span className={styles.eyebrow}>{project.category}</span><h2>{project.title}</h2><p>{project.summary}</p></div><span className={styles.roundArrow} aria-hidden="true"><TbArrowUpRight /></span></div>
      <span className={styles.caseStudyLink}>VIEW CASE STUDY <TbArrowRight /></span>
    </Link>)}</div>
  </div>;
}

export function AboutPage({ portraitUrl }: { portraitUrl: string }) {
  return <div className={styles.innerPage}>
    <PageHeading label="THE PERSON BEHIND THE WORK" title="About Alexandria" tone="rose" description="Curiosity, care, and a considered approach to digital design." />
    <section className={styles.aboutIntro}><div className={styles.aboutPortrait}><Image src={portraitUrl} alt="Alexandria Klaus portrait" fill unoptimized sizes="(max-width: 700px) 90vw, 35vw" /></div><div><span className={styles.eyebrow}>PRODUCT DESIGNER</span><h2>Good design begins<br />with <em className={styles.headlineAccent}>understanding.</em></h2><p>I’m Alexandria Klaus, a product designer interested in the way people experience the digital world. I bring research, structure, and visual craft together to make complex ideas feel simple.</p><p>I enjoy working across disciplines, asking useful questions, and paying attention to the details that turn a functional interface into a thoughtful experience.</p><Link href="/contact" className={styles.outlineLink}>GET IN TOUCH <TbArrowUpRight /></Link></div></section>
    <section className={styles.aboutExperience}><div><span className={styles.eyebrow}>SKILLS & EXPERIENCE</span><h2>The craft behind<br />the <em className={styles.roseAccent}>experience.</em></h2><p>From early exploration to detailed interfaces, my design practice connects strategy, interaction, and visual expression.</p></div><div className={styles.expertiseList}>{[
      { title: "Product & UX design", text: "Research synthesis, information architecture, wireframing, and user flows." },
      { title: "Visual & interface design", text: "Interface design, typography, visual identities, and reusable design systems." },
      { title: "Prototyping & collaboration", text: "Interactive prototypes, motion studies, presentations, and developer handoff." },
    ].map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>
    <div className={styles.toolkit}><span className={styles.eyebrow}>TOOLS & METHODS</span>{["Figma", "Wireframing", "User research", "Design systems", "Prototyping", "Interaction design"].map(tool => <span className={styles.skillTag} key={tool}>{tool}</span>)}</div>
  </div>;
}

export function CaseStudyPage({ slug, imageUrls }: { slug: string; imageUrls: string[] }) {
  const index = projects.findIndex(project => project.slug === slug);
  const project = projects[index];
  if (!project) return null;
  const next = projects[(index + 1) % projects.length];
  return <article className={styles.innerPage}>
    <Link href="/work" className={styles.inlineLink}><TbArrowLeft /> Back to work</Link>
    <PageHeading label={`${project.category.toUpperCase()} / CONCEPT CASE STUDY`} title={project.title} description={project.summary} />
    <div className={styles.caseHero}><Image src={imageUrls[index + 3] ?? defaultImages[index + 3]} alt={project.alt} fill priority unoptimized sizes="90vw" /></div>
    <div className={styles.projectMeta}><div><span>PROJECT TYPE</span><p>Independent design concept</p></div><div><span>ROLE</span><p>{project.role}</p></div><div><span>FOCUS</span><p>{project.category}</p></div></div>
    <div className={styles.caseSections}>{[
      { title: "The challenge", content: project.challenge },
      { title: "The approach", content: project.approach },
      { title: "The design direction", content: project.direction },
    ].map((section, i) => <section key={section.title}><span className={styles.eyebrow}>0{i + 1}</span><h2>{section.title}</h2><p>{section.content}</p></section>)}</div>
    <div className={styles.caseDeliverables}><h2>What the concept explores</h2><ul>{project.details.map(item => <li key={item}><TbCheck />{item}</li>)}</ul><p>This is illustrative template content, with stock photography. Replace it with your own project process, visuals, and verified outcomes.</p></div>
    <Link className={styles.nextProject} href={`/work/${next.slug}`}><div><span className={styles.eyebrow}>NEXT PROJECT</span><h2>{next.title}</h2></div><TbArrowUpRight /></Link>
  </article>;
}

export function ContactPage() {
  const [prepared, setPrepared] = useState(false);
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `${data.get("service")}: ${data.get("name")}`;
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
    window.location.href = `mailto:hello@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  return <div className={styles.innerPage}>
    <PageHeading label="LET’S START A CONVERSATION" title="Get in touch" tone="rose" description="A new project, a collaboration, or a good question. I’d love to hear from you." />
    <div className={styles.contactGrid}><div><h2>Tell me what<br />you have in <em className={styles.headlineAccent}>mind.</em></h2><p>Share a little about your idea, what you’re hoping to achieve, and where you need a hand.</p><a className={styles.contactEmail} href="mailto:hello@example.com"><TbMail />hello@example.com</a><div className={styles.contactNote}><span className={styles.eyebrow}>A THOUGHTFUL START</span><p>A project overview, your ideal timing, and any useful references are a great place to begin.</p></div></div>
    <form className={styles.contactForm} onSubmit={prepareEmail}>
      <div className={styles.formRow}><label>Your name<input name="name" autoComplete="name" placeholder="Alex Morgan" required maxLength={100} /></label><label>Email address<input type="email" name="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} /></label></div>
      <label>What can I help with?<select name="service" defaultValue="" required><option value="" disabled>Select a service</option><option>Product Design</option><option>Visual Design</option><option>Design Strategy</option><option>Something else</option></select></label>
      <label>A little about your project<textarea name="message" placeholder="Your idea, goals, and anything else I should know…" rows={6} required maxLength={5000} /></label>
      <button className={styles.outlineLink} type="submit">PREPARE EMAIL <TbArrowUpRight /></button>
      <p className={styles.formHint}>Opens your email app with a draft. This template uses a sample email address.</p>
      {prepared && <p role="status" className={styles.formStatus}>If your email app opened, review and send your draft there. Otherwise, email hello@example.com directly.</p>}
    </form></div>
  </div>;
}
