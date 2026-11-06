"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TbCheck, TbX } from "react-icons/tb";
import { defaultImages, projects, services } from "./data";
import styles from "./resume.module.css";

export function LongArrow({ left = false, down = false, compact = false, direction }: { left?: boolean; down?: boolean; compact?: boolean; direction?: "up" | "up-right" }) {
  const diagonal = direction === "up-right";
  const vertical = down || direction === "up";
  const endX = diagonal ? 21 : vertical ? "50%" : left ? 0 : "100%";
  const endY = diagonal ? 3 : vertical ? direction === "up" ? 0 : "100%" : "50%";
  const rotation = diagonal ? -45 : down ? 90 : direction === "up" ? -90 : left ? 180 : 0;
  // Both SVG viewports omit viewBox so the tip stays the same size at every shaft length.
  // Drawing at the endpoint also avoids document IDs that can differ during hydration.
  return <svg className={`${down ? styles.longArrowDown : styles.longArrow} ${compact ? styles.compactArrow : ""}`} fill="none" aria-hidden="true">
    <line x1={diagonal ? 3 : vertical ? "50%" : left ? "100%" : 0}
      y1={diagonal ? 21 : vertical ? direction === "up" ? "100%" : 0 : "50%"}
      x2={endX} y2={endY} stroke="currentColor" strokeWidth="1.8" strokeLinecap="butt" />
    <svg x={endX} y={endY} width="1" height="1" overflow="visible">
      <path d="M-8 -10L0 0 -8 10" transform={`rotate(${rotation})`} stroke="currentColor" strokeWidth="1.8" strokeLinecap="butt" strokeLinejoin="miter" fill="none" />
    </svg>
  </svg>;
}

const editorialEase = [.22, 1, .36, 1] as const;
export const editorialItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: .7, ease: editorialEase } },
};

export function EditorialReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className}
    initial={reduceMotion ? false : "hidden"} whileInView="visible"
    viewport={{ once: true, amount: .12 }}
    variants={reduceMotion ? { hidden: {}, visible: {} } : {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: .8, ease: editorialEase, delay, delayChildren: delay + .06, staggerChildren: .08 } },
    }}>{children}</motion.div>;
}

export function ParallaxImage({ src, alt, sizes, priority = false, onLoad }: { src: string; alt: string; sizes: string; priority?: boolean; onLoad?: () => void }) {
  const layer = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const offset = useMotionValue(0);
  const smoothOffset = useSpring(offset, { stiffness: 110, damping: 28, mass: .5 });

  useEffect(() => {
    const frameElement = layer.current?.parentElement;
    if (!frameElement || reduceMotion) {
      offset.set(0);
      return;
    }
    // Services and About scroll inside panels; case studies scroll in the window.
    let container: HTMLElement | null = frameElement.parentElement;
    while (container && !/(auto|scroll)/.test(getComputedStyle(container).overflowY)) container = container.parentElement;
    if (container === document.body || container === document.documentElement) container = null;
    const scrollTarget = container ?? window;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = frameElement.getBoundingClientRect();
      const viewport = container?.getBoundingClientRect();
      const top = viewport?.top ?? 0;
      const height = viewport?.height ?? window.innerHeight;
      const progress = (top + height / 2 - bounds.top - bounds.height / 2) / ((height + bounds.height) / 2);
      offset.set(Math.max(-28, Math.min(28, progress * 28)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    scrollTarget.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      scrollTarget.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [offset, reduceMotion]);

  return <motion.div ref={layer} className={styles.parallaxImageLayer} style={{ y: reduceMotion ? 0 : smoothOffset }}>
    <Image src={src} alt={alt} fill unoptimized sizes={sizes} priority={priority} onLoad={onLoad} onError={onLoad} />
  </motion.div>;
}

function PageHeading({ label, title, description }: { label: string; title: string; description: string }) {
  const split = title.lastIndexOf(" ");
  const reduceMotion = useReducedMotion();
  const item = reduceMotion ? undefined : editorialItem;
  return <EditorialReveal className={styles.pageHeading}>
    <motion.span variants={item} className={styles.eyebrow}>{label}</motion.span>
    <motion.h1 variants={item}>{split >= 0 ? <>{title.slice(0, split)} <em className={styles.headlineAccent}>{title.slice(split + 1)}</em></> : title}</motion.h1>
    <motion.p variants={item}>{description}</motion.p>
    <motion.span className={styles.goldRule} variants={reduceMotion ? undefined : { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: .9, ease: editorialEase } } }} style={{ originX: 0 }} />
  </EditorialReveal>;
}

function ServicePhoto({ src, alt }: { src: string; alt: string }) {
  const photo = useRef<HTMLDivElement>(null);
  const inView = useInView(photo, { once: true, amount: .15 });
  const reduceMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const revealed = reduceMotion || (inView && loaded);
  return <motion.div ref={photo} className={styles.servicePhoto}
    initial={reduceMotion ? false : { opacity: 0, y: 32 }}
    animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 32 }}
    transition={{ duration: reduceMotion ? 0 : 1, ease: editorialEase }}>
    <ParallaxImage src={src} alt={alt} sizes="(max-width: 700px) 100vw, 50vw" onLoad={() => setLoaded(true)} />
  </motion.div>;
}

export function ServicesPage({ imageUrls }: { imageUrls: string[] }) {
  const reduceMotion = useReducedMotion();
  const item = reduceMotion ? undefined : editorialItem;
  return <div className={`${styles.innerPage} ${styles.servicesPage}`}>
    <PageHeading label="HOW I CAN HELP" title="My services" description="Architecture, interiors, and a clear design vision from brief to detail." />
    <div className={styles.serviceRows}>{services.map((service, index) => <article key={service.title} className={styles.serviceRow}>
      <ServicePhoto src={imageUrls[index] ?? defaultImages[index]} alt={service.alt} />
      <EditorialReveal className={styles.serviceCopy} delay={.1}><motion.span variants={item} className={styles.eyebrow}>0{index + 1} / ARCHITECTURAL SERVICES</motion.span><motion.h2 variants={item}>{service.title}</motion.h2><motion.p variants={item}>{service.description}</motion.p><ul>{service.deliverables.map(deliverable => <motion.li variants={item} key={deliverable}><TbCheck />{deliverable}</motion.li>)}</ul></EditorialReveal>
    </article>)}</div>
  </div>;
}

export function WorkPage({ imageUrls }: { imageUrls: string[] }) {
  const reduceMotion = useReducedMotion();
  return <div className={`${styles.innerPage} ${styles.workPage}`}>
    <PageHeading label="SELECTED PROJECTS" title="Selected work" description="Concept studies in architecture, interiors, and the spaces between." />
    <div className={styles.workGallery}>{projects.map((project, index) => <motion.div key={project.slug} className={styles.workCardReveal}
      style={{ gridColumn: index % 2 === 0 ? 2 : 1, gridRow: Math.floor((index + 1) / 2) + 1 }}
      initial={reduceMotion ? false : { opacity: 0, y: 36, clipPath: "inset(6% 0 0 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", transitionEnd: { clipPath: "none" } }}
      viewport={{ once: true, amount: .15 }}
      transition={{ duration: reduceMotion ? 0 : .95, delay: reduceMotion ? 0 : (index % 2) * .12, ease: [.22, 1, .36, 1] }}>
      <Link href={`/work/${project.slug}`} className={`${styles.workLink} ${styles.projectCard}`} aria-label={`View ${project.title} case study`}>
      <div className={styles.workPhoto}>
        <ParallaxImage src={imageUrls[index + 3] ?? defaultImages[index + 3]} alt={project.alt} sizes="(max-width: 700px) 90vw, 45vw" />
        <div className={styles.workCaption}>
          <div><span className={styles.eyebrow}>{project.category}</span><h2>{project.title}</h2></div>
          <span className={styles.workViewMore} aria-hidden="true"><LongArrow compact direction="up-right" /></span>
        </div>
      </div>
    </Link></motion.div>)}</div>
  </div>;
}

export function AboutDetails() {
  const reduceMotion = useReducedMotion();
  const item = reduceMotion ? undefined : editorialItem;
  return <div className={styles.aboutDetailsGrid}>
    <EditorialReveal className={styles.aboutDetailsColumn}>
      <span className={styles.eyebrow}>THE CRAFT</span><motion.h2 variants={item}>Skills</motion.h2>
      <p>My practice connects a strong spatial idea with the material, technical, and human details that give architecture its character.</p>
      <ul className={styles.aboutSkillsList}>{[
        "Site analysis & concept development",
        "Spatial planning & circulation",
        "Architectural design & detailing",
        "Material palettes & interior architecture",
        "Consultant coordination & design reviews",
        "Project leadership & architectural visualization",
      ].map(skill => <motion.li variants={item} key={skill}><TbCheck aria-hidden="true" /><span>{skill}</span></motion.li>)}</ul>
      <div className={styles.aboutTools}><span className={styles.eyebrow}>TOOLS & METHODS</span><p>Revit · AutoCAD · Rhino · SketchUp · Adobe Creative Suite</p></div>
    </EditorialReveal>
    <EditorialReveal className={styles.aboutDetailsColumn} delay={.14}>
      <span className={styles.eyebrow}>SELECTED PROJECT PRACTICE</span><motion.h2 variants={item}>Experience</motion.h2>
      <p>Concept studies spanning residential, commercial, and cultural spaces, with a consistent focus on context, light, and proportion.</p>
      <div className={styles.aboutExperienceList}>{projects.slice(0, 3).map((project, index) => <motion.article variants={item} key={project.slug}>
        <span className={styles.eyebrow}>0{index + 1} / {project.category} / CONCEPT</span>
        <h3>{project.title}</h3><p>{project.role}</p>
      </motion.article>)}</div>
    </EditorialReveal>
  </div>;
}

export function AboutPage({ portraitUrl }: { portraitUrl: string }) {
  return <div className={styles.innerPage}>
    <PageHeading label="THE PERSON BEHIND THE WORK" title="About Alexandria" description="Context, craft, and a considered approach to the built environment." />
    <section className={styles.aboutIntro}><div className={styles.aboutPortrait}><Image src={portraitUrl} alt="Alexandria Klaus portrait" fill unoptimized sizes="(max-width: 700px) 90vw, 35vw" /></div><div><span className={styles.eyebrow}>SENIOR ARCHITECT</span><h2>Good design begins<br />with <em className={styles.headlineAccent}>understanding.</em></h2><p>I’m Alexandria Klaus, a senior architect interested in the relationship between people, place, and the spaces we inhabit. I work from a clear concept toward architecture with a lasting sense of purpose.</p><p>I work across architectural design, interiors, and project direction, bringing care to the decisions that connect a building to its context and daily use.</p><Link href="/contact" className={styles.outlineLink}>GET IN TOUCH <LongArrow compact direction="up-right" /></Link></div></section>
    <section className={styles.aboutExperience}><div><span className={styles.eyebrow}>SKILLS & EXPERIENCE</span><h2>The craft behind<br />the <em className={styles.headlineAccent}>experience.</em></h2><p>My practice connects a strong spatial idea with the material, technical, and human details that give architecture its character.</p></div><div className={styles.expertiseList}>{[
      { title: "Architectural design", text: "Context studies, concept development, spatial planning, and architectural detailing." },
      { title: "Interior architecture", text: "Material palettes, interior planning, lighting concepts, and bespoke details." },
      { title: "Design leadership", text: "Consultant coordination, design reviews, technical development, and project collaboration." },
    ].map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>
    <div className={styles.toolkit}><span className={styles.eyebrow}>TOOLS & METHODS</span>{["Revit", "AutoCAD", "Rhino", "SketchUp", "Material studies", "Spatial planning"].map(tool => <span className={styles.skillTag} key={tool}>{tool}</span>)}</div>
  </div>;
}

function CloseControl({ href, label }: { href: string; label: string }) {
  return <Link href={href} className={styles.contactClose} aria-label={label}><TbX className={styles.closeIcon} aria-hidden="true" /></Link>;
}

export function CaseStudyPage({ slug, imageUrls }: { slug: string; imageUrls: string[] }) {
  const index = projects.findIndex(project => project.slug === slug);
  const project = projects[index];
  if (!project) return null;
  const next = projects[(index + 1) % projects.length];
  const split = project.title.lastIndexOf(" ");
  return <article className={`${styles.innerPage} ${styles.projectPage}`}>
    <Link href="/contact" className={styles.contactTab} onClick={() => {
      try { sessionStorage.setItem("alexandria-contact-return", `/work/${project.slug}`); } catch { /* Close falls back to the homepage without storage. */ }
    }}><span>Contact me</span><LongArrow /></Link>
    <div className={styles.projectOpening}>
      <EditorialReveal className={styles.projectIntro}>
        <span className={styles.eyebrow}>{project.category} / CONCEPT</span>
        <h1>{split >= 0 ? <>{project.title.slice(0, split)}<br /><em className={styles.headlineAccent}>{project.title.slice(split + 1)}</em></> : project.title}</h1>
        <p>{project.summary}</p>
        <div className={styles.projectRole}><span className={styles.eyebrow}>DESIGN ROLE</span><p>{project.role}</p></div>
      </EditorialReveal>
      <EditorialReveal className={styles.projectCover}><ParallaxImage src={imageUrls[index + 3] ?? defaultImages[index + 3]} alt={project.alt} priority sizes="(max-width: 700px) 100vw, 50vw" /></EditorialReveal>
    </div>
    <div className={styles.projectStory}>
      <EditorialReveal><span className={styles.eyebrow}>THE IDEA</span><h2>A considered response.</h2><p>{project.approach}</p></EditorialReveal>
      <EditorialReveal delay={.1}><span className={styles.eyebrow}>SCOPE</span><ul>{project.details.map(detail => <li key={detail}>{detail}</li>)}</ul><p className={styles.projectNote}>Concept study · Architectural reference photography</p></EditorialReveal>
    </div>
    <div className={styles.projectGallery} aria-label="Architectural reference studies">
      {project.gallery.map((study, studyIndex) => <EditorialReveal key={study.title} className={styles.projectGalleryItem} delay={studyIndex * .1}>
        <figure>
          <div className={styles.projectStudyPhoto}><ParallaxImage src={imageUrls[study.imageIndex] ?? defaultImages[study.imageIndex]} alt={study.alt} sizes="(max-width: 700px) 100vw, 50vw" /></div>
          <figcaption><span className={styles.eyebrow}>0{studyIndex + 1} / {study.title}</span><p>{study.caption}</p></figcaption>
        </figure>
      </EditorialReveal>)}
    </div>
    <div className={`${styles.projectStory} ${styles.projectDesignNotes}`}>
      <EditorialReveal><span className={styles.eyebrow}>CONTEXT</span><h2>The brief.</h2><p>{project.challenge}</p></EditorialReveal>
      <EditorialReveal delay={.1}><span className={styles.eyebrow}>DEVELOPMENT</span><h2>Design direction.</h2><p>{project.direction}</p></EditorialReveal>
    </div>
    <Link className={styles.projectNext} href={`/work/${next.slug}`} aria-label={`View next project: ${next.title}`}>
      <div><span className={styles.eyebrow}>NEXT PROJECT</span><h2>{next.title}</h2></div><span className={styles.workViewMore} aria-hidden="true"><LongArrow compact direction="up-right" /></span>
    </Link>
    <EditorialReveal className={styles.projectContact}>
      <div><span className={styles.eyebrow}>START A CONVERSATION</span><h2>Let’s shape<br /><em className={styles.headlineAccent}>what’s next.</em></h2><p>Tell me about your site, brief, or next project.</p></div>
      <Link href="/contact" className={styles.contactSend} onClick={() => {
        try { sessionStorage.setItem("alexandria-contact-return", `/work/${project.slug}`); } catch { /* Close falls back to the homepage without storage. */ }
      }}><span>Contact me</span><LongArrow /></Link>
    </EditorialReveal>
  </article>;
}

export function ContactPage() {
  const reduceMotion = useReducedMotion();
  const [prepared, setPrepared] = useState(false);
  const [returnTo, setReturnTo] = useState("/");
  useEffect(() => {
    try {
      const path = sessionStorage.getItem("alexandria-contact-return");
      if (path && /^\/(?:about|services|work(?:\/[a-z0-9-]+)?)?$/.test(path)) setReturnTo(path);
    } catch { /* Fall back to the homepage when storage is unavailable. */ }
  }, []);
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `${data.get("service")}: ${data.get("name")}`;
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
    window.location.href = `mailto:hello@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  return <div className={styles.contactContent}>
    <CloseControl href={returnTo} label="Close contact form and return to website" />
    <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .8, ease: editorialEase }}>Get in <em className={styles.headlineAccent}>touch</em></motion.h1>
    <motion.form className={styles.contactForm} onSubmit={prepareEmail} initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .75, delay: reduceMotion ? 0 : .14, ease: editorialEase }}>
      <div className={styles.formRow}><label>Your name<input name="name" autoComplete="name" placeholder="Alex Morgan" required maxLength={100} /></label><label>Email address<input type="email" name="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} /></label></div>
      <label>What are you planning?<select name="service" defaultValue="" required><option value="" disabled>Select a service</option>{services.map(service => <option key={service.title}>{service.title}</option>)}<option>Something else</option></select></label>
      <label>A little about your project<textarea name="message" placeholder="Your site, brief, scope, and ambitions…" rows={6} required maxLength={5000} /></label>
      <button className={styles.contactSend} type="submit"><span>Send</span><LongArrow /></button>
      {prepared && <p role="status" className={styles.formStatus}>If your email app opened, review and send your draft there. Otherwise, email hello@example.com directly.</p>}
    </motion.form>
  </div>;
}
