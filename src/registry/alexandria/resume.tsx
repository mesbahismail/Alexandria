"use client";

import {
  Box,
  Container,
  Stack,
  Link,
  Typography,
  IconButton,
} from "@mui/joy";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { CaseStudyPage, ContactPage, ServicesPage, WorkPage } from "./content";
import { defaultImages } from "./data";
export type WebsitePage = "home" | "services" | "work" | "about" | "contact" | "case-study";
import { useReducedMotion } from "framer-motion";
import Footer from "./footer";
import styles from "./resume.module.css";
import "./fonts.css";
import {
  TbArrowUp,
  TbArrowUpRight,
} from "react-icons/tb";

const defaultPortrait = "https://images.pexels.com/photos/30712814/pexels-photo-30712814.jpeg?auto=compress&cs=tinysrgb&w=1600";

function LongArrow({ left = false }: { left?: boolean }) {
  return <svg className={styles.longArrow} viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true"><path d={left ? "M399 12H2M13 1L2 12l11 11" : "M1 12h397M387 1l11 11-11 11"} fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" /></svg>;
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

  function navigate(direction: number) {
    const target = rail.current;
    if (!target || moving.current) return;
    moving.current = true;
    target.scrollTo({ left: target.clientWidth * (activeIndex.current + direction), behavior: reduceMotion ? "instant" : "smooth" });
    settleTimer.current = setTimeout(settle, reduceMotion ? 0 : 900);
  }

  return <div className={`${styles.site} ${styles.editorialSite}`}>
    <a className={styles.skipLink} href="#main-content">Skip to content</a>
    <NextLink href="/contact" className={styles.contactTab}>Contact me <TbArrowUpRight aria-hidden="true" /></NextLink>
    <main id="main-content" ref={rail} className={styles.spreadRail} aria-label="Portfolio sections" onScroll={event => {
      const target = event.currentTarget;
      const index = Math.round(target.scrollLeft / target.clientWidth);
      activeIndex.current = index;
      setActive(index);
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(settle, 180);
    }}>
      {panels.map((section, index) => <section key={index} tabIndex={-1} aria-label={sectionLabels[section]} inert={active !== index} className={`${styles.spreadPanel} ${section === "about" ? styles.editorialHome : styles.destinationPanel}`}>
        {section === "about" ? <>
          <header className={styles.editorialHeader}><NextLink href="/" className={styles.editorialLogo} aria-label="Alexandria home">ALEXANDRIA</NextLink></header>
          <div className={styles.editorialCopy}>
            <h1>Alexandria<br /><em>Klaus</em></h1>
            <p className={styles.editorialRole}>Product Designer</p>
            <div className={styles.editorialBio}><div><p>I turn complex ideas into thoughtful digital experiences through research, visual craft, and prototyping.</p><p>Working at the intersection of strategy, interaction, and visual craft — to make the everyday feel a little more considered.</p></div></div>
          </div>
          <figure className={styles.editorialPortrait}><div className={styles.portraitFrame}><Image src={portraitUrl} alt="Black-and-white portrait of a woman against a dark background" fill priority unoptimized sizes="(max-width: 700px) 100vw, 50vw" /></div></figure>
        </> : <>
          <div className={styles.panelTop}><button onClick={() => navigate(section === "work" ? 1 : -1)}>ALEXANDRIA</button></div>
          {section === "work" ? <WorkPage imageUrls={imageUrls} /> : <ServicesPage imageUrls={imageUrls} />}
        </>}
      </section>)}
    </main>
    <div className={styles.sectionAnnouncement} role="status" aria-live="polite">{sectionLabels[panels[active]]}</div>
    <CycleNavigation section={panels[active]} onNavigate={navigate} />
  </div>;
}

export default function AlexandriaResume({ portraitUrl = defaultPortrait, imageUrls = defaultImages, registryHref = "https://github.com/mesbahismail/Alexandria", page = "home", projectSlug }: { portraitUrl?: string; imageUrls?: string[]; registryHref?: string; page?: WebsitePage; projectSlug?: string }) {
  const reduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  // Scroll handlers
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (page === "home" || page === "about" || page === "work" || page === "services") return <EditorialHome portraitUrl={portraitUrl} imageUrls={imageUrls} initialSection={page === "home" ? "about" : page} />;

  return (
    <Box id="top" className={`${styles.site} ${styles.persistentSite}`} sx={{ bgcolor: "#09090a", minHeight: "100vh" }}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
<NextLink href="/contact" className={styles.contactTab} aria-current={page === "contact" ? "page" : undefined}>Contact me <TbArrowUpRight aria-hidden="true" /></NextLink>
      {/* Cover light */}
      {<Box
        sx={{
          position: "absolute",
          width: "1000px",
          height: "600px",
          borderRadius: "50%",
          backgroundColor: "#111112",
          filter: "blur(500px)",
          zIndex: 0,
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />}

      <Container
        disableGutters
        sx={{ maxWidth: "1384px", position: "relative", px: { xs: 2, md: 0 } }}
      >
        {/* Header */}
        <Stack component="header" className={styles.header}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            height: "72px",
            position: "sticky",
            top: 0,
            backgroundColor: isScrolled
              ? "rgba(9, 9, 10, 0.78)"
              : "transparent",
            backdropFilter: isScrolled ? "blur(10px)" : "none",
            transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
            zIndex: 1000,
            width: "100%",
            margin: "0 auto",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: isScrolled
                ? "rgba(9, 9, 10, 0.40)"
                : "transparent",
              backdropFilter: isScrolled ? "blur(10px)" : "none",
              zIndex: -1,
            },
          }}
        >
          <Typography component={NextLink} href="/" level="h3" sx={{ color: "#ffffff", letterSpacing: "0.08em", textDecoration: "none" }}>
            ALEXANDRIA
          </Typography>

          <Stack
            direction="row"
            spacing={6}
            sx={{ alignItems: "center", pl: 4, pr: 4 }}
            className={styles.navigation}
            component="nav"
            aria-label="Main navigation"
          >
            {[
              { label: "SERVICES", href: "/services", key: "services" },
              { label: "WORK", href: "/work", key: "work" },
              { label: "ABOUT", href: "/about", key: "about" },
            ].map((item) => <Link
              key={item.href}
              component={NextLink}
              href={item.href}
              aria-current={page === item.key || (page === "case-study" && item.key === "work") ? "page" : undefined}
              level="body-sm"
              underline="none"
              sx={{ color: "#a5a5a5", fontWeight: 500, "&:hover": { color: "#fff" } }}
            >{item.label}</Link>)}
          </Stack>



        </Stack>

        <main id="main-content">
        {page === "contact" && <ContactPage />}
        {page === "case-study" && projectSlug && <CaseStudyPage slug={projectSlug} imageUrls={imageUrls} />}
        </main>

        <CycleNavigation section={page === "case-study" ? "work" : "about"} />

        {/* Scroll to Top Button */}
        <Box
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            opacity: showScrollTop ? 1 : 0,
            visibility: showScrollTop ? "visible" : "hidden",
            transition: "opacity 0.3s ease, visibility 0.3s ease",
            zIndex: 1000,
          }}
        >
          <IconButton
            aria-label="Back to top"
            variant="solid"
            color="primary"
            onClick={scrollToTop}
            sx={{
              borderRadius: "50%",
              backgroundColor: "#E1B77B",
              color: "#09090a",
              boxShadow: "md",
              "&:hover": {
                transform: "translateY(-2px)",
                bgcolor: "#E1B77B",
              },
            }}
          >
            <TbArrowUp size={24} />
          </IconButton>
        </Box>
        {<Footer registryHref={registryHref} compact={page === "contact"} />}
      </Container>
    </Box>
  );
}
