"use client";

import {
  Box,
  Container,
  Stack,
  Link,
  Typography,
  IconButton,
  Button,
} from "@mui/joy";
import { useState, useEffect, type MouseEvent } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { AboutPage, CaseStudyPage, ContactPage, ServicesPage, WorkPage } from "./content";
import { defaultImages } from "./data";
export type WebsitePage = "home" | "services" | "work" | "about" | "contact" | "case-study";
import { motion, useReducedMotion } from "framer-motion";
import Footer from "./footer";
import styles from "./resume.module.css";
import "./fonts.css";
import {
  TbArrowUp,
  TbMail,
} from "react-icons/tb";

export default function AlexandriaResume({ portraitUrl = "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=85", imageUrls = defaultImages, registryHref = "https://github.com/mesbahismail/Alexandria", page = "home", projectSlug }: { portraitUrl?: string; imageUrls?: string[]; registryHref?: string; page?: WebsitePage; projectSlug?: string }) {
  const reduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    setMousePos({
      x: (event.clientX / window.innerWidth - 0.5) * 10,
      y: (event.clientY / window.innerHeight - 0.5) * 10,
    });
  }
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

  return (
    <Box id="top" className={`${styles.site} ${page === "home" ? styles.homePage : ""}`} sx={{ bgcolor: "#09090a", minHeight: "100vh" }}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      {/* Cover light */}
      {page !== "home" && <Box
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


          <Button
            component={NextLink}
            href="/contact"
            aria-current={page === "contact" ? "page" : undefined}
            startDecorator={<TbMail size={20} />}
            sx={{
              backgroundColor: "transparent",
              border: "2px solid #E1B77B",
              color: "#fff",
              borderRadius: "0px",
              minHeight: "48px",
              padding: "0px 16px",
              width: "fit-content",
              minWidth: "unset",
              transition: "background-color 0.3s ease, transform 0.2s ease",
              "&:hover": {
                backgroundColor: "#E1B77B",
                color: "#111",
                border: "2px solid #E1B77B",
              },
              "&&": { fontWeight: 600 },
            }}
          >
            GET IN TOUCH
          </Button>
        </Stack>

        <main id="main-content">
        {page === "home" && (
        <Stack id="about" className={styles.hero}
          direction="row"
          spacing={8}
          sx={{ alignItems: "center", pt: 2, pr: 4 }}
        >
          <Stack
            direction="column"
            width={634}
            spacing={2}
            sx={{ mb: 2, mt: 4 }}
            className={styles.heroCopy}
          >
            <Stack direction="column" spacing={0.5} sx={{ pb: 3 }}>
              <Typography className={styles.heroName} level="h1" fontWeight="400" sx={{ color: "#ffffff" }}>
                Alexandria<br /><span className={styles.headlineAccent}>Klaus</span>
              </Typography>
              <Typography level="h4" fontWeight="400" sx={{ color: "#AAAAAA" }}>
                Product Designer
              </Typography>
            </Stack>

            <Box
              sx={{ width: "48px", height: "4px", backgroundColor: "#E1B77B" }}
            />

            <Typography className={styles.heroIntro} level="body-md" sx={{ color: "#ffffff", pt: 3 }}>
              I turn complex ideas into thoughtful digital experiences through
              research, visual craft, and prototyping.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ pt: 4 }}>
              <Button
                component={NextLink}
                href="/contact"
                startDecorator={<TbMail size={20} />}
                sx={{
                  backgroundColor: "transparent",
                  border: "2px solid #E1B77B",
                  color: "#fff",
                  borderRadius: "0px",
                  minHeight: "48px",
                  padding: "0px 16px",
                  width: "fit-content",
                  minWidth: "unset",
                  transition: "background-color 0.3s ease, transform 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#E1B77B",
                    color: "#111",
                    border: "2px solid #E1B77B",
                  },
                  "&&": { fontWeight: 600 },
                }}
              >
                GET IN TOUCH
              </Button>

            </Stack>
          </Stack>

          <Box
            className={styles.portrait}
            sx={{ position: "relative", width: "600px", height: "600px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          >
            {[3, 2, 1].map((layer, index) => (
              <motion.div
                key={layer}
                style={{
                  position: "absolute",
                  top: `${index * 20}px`,
                  left: `${index * 20}px`,
                  width: "520px",
                  height: "520px",
                  border: index === 0 ? "2px solid #E1B77B" : "none",
                  borderRadius: 0,
                  overflow: "hidden",
                  backgroundColor: index === 2 ? "#444444" : "transparent",
                  zIndex: layer,
                }}
                animate={{ x: reduceMotion ? 0 : mousePos.x * (3 - index) * 2, y: reduceMotion ? 0 : mousePos.y * (3 - index) * 2 }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              >
                {index === 1 && <Image src={portraitUrl} alt="Alexandria Klaus portrait" fill priority unoptimized quality={90} sizes="(max-width: 900px) 90vw, 520px" style={{ objectFit: "cover" }} />}
              </motion.div>
            ))}
          </Box>
        </Stack>

        )}
        {page === "services" && <ServicesPage imageUrls={imageUrls} />}
        {page === "work" && <WorkPage imageUrls={imageUrls} />}
        {page === "about" && <AboutPage portraitUrl={portraitUrl} />}
        {page === "contact" && <ContactPage />}
        {page === "case-study" && projectSlug && <CaseStudyPage slug={projectSlug} imageUrls={imageUrls} />}
        </main>

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
        {page !== "home" && <Footer registryHref={registryHref} compact={page === "contact"} />}
      </Container>
    </Box>
  );
}
