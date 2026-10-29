"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { editorialItem, EditorialReveal, LongArrow, AboutDetails, CaseStudyPage, ContactPage, ServicesPage, WorkPage } from "./content";
import { defaultImages } from "./data";
export type WebsitePage = "home" | "services" | "work" | "about" | "contact" | "case-study";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import styles from "./resume.module.css";
import "./fonts.css";

const defaultPortrait = "https://images.pexels.com/photos/30712814/pexels-photo-30712814.jpeg?auto=compress&cs=tinysrgb&w=1600";

function rememberContactReturn(path: string) {
  try { sessionStorage.setItem("alexandria-contact-return", path); } catch { /* Navigation still works when storage is unavailable. */ }
}

function BrandLogo() {
  return (<svg className={styles.brandLogo} aria-hidden="true" width="307" height="280" viewBox="0 0 307 280" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M225.174 78.5332C235.763 57.0285 273.543 27.6714 306.448 78.999C294.763 76.9668 269.3 90.9224 276.948 147.498C286.509 218.218 292.948 279.999 228.371 279.999C191.819 279.999 142.859 255.207 127.456 247.078C115.771 241.388 86.0273 228.149 63.1885 229.397C27.7325 231.335 2.75896 248.21 0 252.418C6.5192 242.219 43.0872 219.87 73.2803 219.87C134.75 219.87 157.398 243.919 201.448 247.078C243.948 250.126 259.448 203.96 259.448 133.499C259.448 81.0702 277.398 77.9084 283.948 70.999C279.168 63.6832 264.448 52.4987 251.21 58.084C238.132 63.602 226.946 75.5649 225.174 78.5332C225.097 78.6886 225.022 78.8436 224.948 78.998C224.981 78.885 225.057 78.7286 225.174 78.5332ZM31.4482 124.76C34.8098 127.92 49.513 132.345 65.6484 134.74C81.784 137.136 109.349 136.736 114.318 134.74C99.4105 154.203 74.71 155.035 63.4561 154.203C64.4791 156.366 66.3473 160.212 77.9258 166.18C101.164 178.157 110.226 179.488 118.703 180.652C113.003 182.815 81.6085 187.34 61.2637 172.169C40.9188 156.998 33.056 136.404 31.4482 124.76ZM44.1621 0C58.9238 17.4664 98.006 54.8942 136.24 64.875C174.474 74.8558 196.31 94.3191 202.448 102.803C172.631 91.8239 175.704 94.3186 124.403 85.835C83.3629 79.048 66.9642 54.8941 56.4395 38.9248C55.7087 41.5863 52.5823 40.0231 63.4561 72.3604C74.33 104.698 102.772 127.089 115.634 134.242C104.525 131.747 77.135 119.071 56.4395 88.3301C35.7439 57.5893 39.6313 16.6347 44.1621 0Z" fill="#E1B77B"/>
</svg>);
}

type CycleSection = "work" | "about" | "services";
const sectionOrder: CycleSection[] = ["work", "about", "services"];
const sectionLabels = { work: "Work", about: "About", services: "Services" };

function CycleNavigation({ section, onNavigate }: { section: CycleSection; onNavigate?: (direction: number) => void }) {
  const index = sectionOrder.indexOf(section);
  const previous = sectionOrder[(index + 2) % 3];
  const next = sectionOrder[(index + 1) % 3];
  return <nav className={styles.spreadNavigation} aria-label="Explore portfolio">
    {onNavigate ? <>
      <button onClick={() => onNavigate(-1)} className={styles.workDirection} aria-label={`Previous section: ${sectionLabels[previous]}`}><LongArrow left /><span>{sectionLabels[previous]}</span></button>
      <button onClick={() => onNavigate(1)} className={styles.servicesDirection} aria-label={`Next section: ${sectionLabels[next]}`}><span>{sectionLabels[next]}</span><LongArrow /></button>
    </> : <>
      <NextLink href={`/${previous}`} className={styles.workDirection}><LongArrow left /><span>{sectionLabels[previous]}</span></NextLink>
      <NextLink href={`/${next}`} className={styles.servicesDirection}><span>{sectionLabels[next]}</span><LongArrow /></NextLink>
    </>}
  </nav>;
}

function EditorialHome({ portraitUrl, imageUrls, initialSection = "about" }: { portraitUrl: string; imageUrls: string[]; initialSection?: CycleSection }) {
  // Matching end panels allow either direction to wrap without crossing another section.
  const panels: CycleSection[] = ["services", "work", "about", "services", "work"];
  const initialIndex = sectionOrder.indexOf(initialSection) + 1;
  const rail = useRef<HTMLDivElement>(null);
  const aboutPanel = useRef<HTMLElement>(null);
  const aboutHero = useRef<HTMLDivElement>(null);
  const aboutDetails = useRef<HTMLElement>(null);
  const { scrollYProgress: aboutProgress } = useScroll({ container: aboutPanel, target: aboutHero, offset: ["start start", "end start"] });
  const portraitOffset = useTransform(aboutProgress, [0, 1], [0, 48]);
  const copyOffset = useTransform(aboutProgress, [0, 1], [0, -36]);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(initialIndex);
  const activeIndex = useRef(initialIndex);
  const moving = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function settle() {
    const target = rail.current;
    if (!target) return;
    let index = Math.round(target.scrollLeft / target.clientWidth);
    if (index === 0) index = 3;
    else if (index === 4) index = 1;
    target.scrollTo({ left: target.clientWidth * index, behavior: "instant" });
    activeIndex.current = index;
    setActive(index);
    moving.current = false;
    if (settleTimer.current) clearTimeout(settleTimer.current);
  }

  useLayoutEffect(() => {
    const target = rail.current;
    if (!target) return;
    activeIndex.current = initialIndex;
    setActive(initialIndex);
    target.scrollTo({ left: target.clientWidth * initialIndex, behavior: "instant" });
    const observer = new ResizeObserver(() => {
      target.scrollTo({ left: activeIndex.current * target.clientWidth, behavior: "instant" });
    });
    observer.observe(target);
    return () => {
      observer.disconnect();
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [initialIndex]);

  function exploreAbout() {
    const panel = aboutPanel.current;
    const details = aboutDetails.current;
    if (!panel || !details) return;
    const top = details.getBoundingClientRect().top - panel.getBoundingClientRect().top + panel.scrollTop;
    details.focus({ preventScroll: true });
    panel.scrollTo({ top, behavior: reduceMotion ? "instant" : "smooth" });
  }

  function navigate(direction: number) {
    const target = rail.current;
    if (!target || moving.current) return;
    moving.current = true;
    target.scrollTo({ left: target.clientWidth * (activeIndex.current + direction), behavior: reduceMotion ? "instant" : "smooth" });
    settleTimer.current = setTimeout(settle, reduceMotion ? 0 : 900);
  }

  return <div className={`${styles.site} ${styles.editorialSite}`}>
    <a className={styles.skipLink} href="#main-content">Skip to content</a>
    <NextLink href="/contact" className={styles.contactTab} onClick={() => rememberContactReturn(`/${panels[active]}`)}><span>Contact me</span><LongArrow /></NextLink>
    <main id="main-content" ref={rail} className={styles.spreadRail} aria-label="Portfolio sections" onScroll={event => {
      const target = event.currentTarget;
      const index = Math.round(target.scrollLeft / target.clientWidth);
      activeIndex.current = index;
      setActive(index);
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(settle, 180);
    }}>
      {panels.map((section, index) => <section key={index} ref={section === "about" ? aboutPanel : undefined} tabIndex={-1} aria-label={sectionLabels[section]} inert={active !== index} className={`${styles.spreadPanel} ${section === "about" ? styles.aboutPanel : `${styles.destinationPanel} ${section === "services" ? styles.servicesPanel : ""}`}`}>
        {section === "about" ? <>
          <div ref={aboutHero} className={styles.editorialHome}>
          <header className={styles.editorialHeader}><NextLink href="/" className={styles.editorialLogo} aria-label="Alexandria home"><BrandLogo /></NextLink></header>
          <motion.div className={styles.editorialCopy} style={{ y: reduceMotion ? 0 : copyOffset }}>
            <EditorialReveal>
            <motion.h1 variants={reduceMotion ? undefined : editorialItem}>Alexandria<br /><em>Klaus</em></motion.h1>
            <motion.p variants={reduceMotion ? undefined : editorialItem} className={styles.editorialRole}>Senior Architect</motion.p>
            <motion.div variants={reduceMotion ? undefined : editorialItem} className={styles.editorialBio}><div><p>I shape thoughtful spaces through an understanding of context, proportion, and the way people live.</p><p>From the first sketch to the final detail, I bring a clear architectural vision to places made for everyday life.</p></div></motion.div>
            <motion.button variants={reduceMotion ? undefined : editorialItem} type="button" className={`${styles.aboutScrollArrow} ${styles.aboutArrowMobile}`} onClick={exploreAbout} aria-label="Explore skills and experience" aria-controls="about-details">
              <LongArrow down />
            </motion.button>
            </EditorialReveal>
          </motion.div>
          <button type="button" className={`${styles.aboutScrollArrow} ${styles.aboutArrowDesktop}`} onClick={exploreAbout} aria-label="Explore skills and experience" aria-controls="about-details"><LongArrow down /></button>
          <figure className={styles.editorialPortrait}><div className={styles.portraitFrame}><motion.div className={styles.portraitParallax} style={{ y: reduceMotion ? 0 : portraitOffset }}><motion.div className={styles.portraitImageEntrance} initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .1 }} transition={{ duration: reduceMotion ? 0 : 1.3, ease: [.22, 1, .36, 1] }}><Image src={portraitUrl} alt="Black-and-white portrait of a woman against a dark background" fill priority unoptimized sizes="(max-width: 700px) 100vw, 50vw" /></motion.div></motion.div></div></figure>
          </div>
          <section id="about-details" ref={aboutDetails} tabIndex={-1} className={styles.aboutDetails} aria-label="Skills and experience"><AboutDetails /></section>
        </> : <>
          <div className={styles.panelTop}><button onClick={() => navigate(section === "work" ? 1 : -1)} aria-label="Alexandria home"><BrandLogo /></button></div>
          {section === "work" ? <WorkPage imageUrls={imageUrls} /> : <ServicesPage imageUrls={imageUrls} />}
        </>}
      </section>)}
    </main>
    <div className={styles.sectionAnnouncement} role="status" aria-live="polite">{sectionLabels[panels[active]]}</div>
    <CycleNavigation section={panels[active]} onNavigate={navigate} />
  </div>;
}

export default function AlexandriaResume({ portraitUrl = defaultPortrait, imageUrls = defaultImages, page = "home", projectSlug }: { portraitUrl?: string; imageUrls?: string[]; registryHref?: string; page?: WebsitePage; projectSlug?: string }) {
  if (page === "home" || page === "about" || page === "work" || page === "services") return <EditorialHome portraitUrl={portraitUrl} imageUrls={imageUrls} initialSection={page === "home" ? "about" : page} />;

  return <div id="top" className={`${styles.site} ${page === "contact" ? styles.contactSite : styles.projectSite}`}>
    <a className={styles.skipLink} href="#main-content">Skip to content</a>
    <main id="main-content">
      {page === "contact" ? <ContactPage /> : projectSlug ? <CaseStudyPage slug={projectSlug} imageUrls={imageUrls} /> : null}
    </main>
  </div>;
}
