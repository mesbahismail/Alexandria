"use client";

import * as React from "react";
import {
  Box,
  Container,
  Stack,
  Link,
  Card,
  Avatar,
  Typography,
  AspectRatio,
  Button,
  Divider,
  CardContent,
  TabList,
  Tabs,
  List,
  ListItem,
  Grid,
  IconButton,
} from "@mui/joy";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary, {
  accordionSummaryClasses,
} from "@mui/joy/AccordionSummary";
import AvatarGroup from "@mui/joy/AvatarGroup";
import { TbArrowUp, TbBrandBluesky, TbChevronRight } from "react-icons/tb";
import { TbCheck } from "react-icons/tb";
import { TbPlus } from "react-icons/tb";

export default function Home() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Add this useEffect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const router = useRouter();
  const benefitsRef = useRef<HTMLDivElement>(null);
  const integrationsRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const offset = 72;
      const elementTop = ref.current.offsetTop - offset;
      window.scrollTo({
        top: elementTop,
        behavior: "smooth",
      });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10); // Adjust the threshold as needed
    };

    // Add event listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const tolerance = 5; // Pixel tolerance for edge detection

    setIsAtStart(scrollLeft <= tolerance);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - tolerance);
  };

  useEffect(() => {
    if (!containerRef.current?.style.scrollBehavior) {
      containerRef.current?.style.setProperty(
        "scroll-behavior",
        "smooth",
        "important"
      );
    }
  }, []);

  useEffect(() => {
    const currentContainer = containerRef.current;
    // Initial check with timeout to ensure layout
    setTimeout(checkScrollPosition, 100);

    currentContainer?.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();
    return () => {
      currentContainer?.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Box
      sx={{
        bgcolor: "#151516",
        minHeight: "100vh",
      }}
    >
      {/* Cover light - Positioned before header */}
      <Box
        sx={{
          position: "absolute",
          width: "1000px",
          height: "600px",
          borderRadius: "50%",
          backgroundColor: "#242426",
          filter: "blur(500px)",
          zIndex: 0,
          // Position 200px above header start
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <Container
        disableGutters
        sx={{
          maxWidth: "1384px",
          position: "relative",
        }}
      >
        {/* Header Section */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            height: "72px",
            position: "sticky",
            top: 0,
            backgroundColor: isScrolled
              ? "rgba(4, 13, 19, 0.48)"
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
                ? "rgba(4, 13, 19, 0.64)"
                : "transparent",
              backdropFilter: isScrolled ? "blur(10px)" : "none",
              zIndex: -1,
            },
          }}
        >
          <Typography level="h2" sx={{ color: "#ffffff", mt: 2 }}>
            ALEXANDRIA
          </Typography>

          <Stack direction="row" spacing={4}>
            <Link
              component="button"
              onClick={() => scrollToSection(benefitsRef)}
              underline="none"
              sx={{
                color: "#8696A1",
                fontWeight: 500,
                "&:hover": { color: "#fff" },
              }}
            >
              ABOUT
            </Link>
            <Link
              component="button"
              onClick={() => scrollToSection(featuresRef)}
              underline="none"
              sx={{
                color: "#8696A1",
                fontWeight: 500,
                "&:hover": { color: "#fff" },
              }}
            >
              SERVICES
            </Link>
            <Link
              component="button"
              onClick={() => scrollToSection(integrationsRef)}
              underline="none"
              sx={{
                color: "#8696A1",
                fontWeight: 500,
                "&:hover": { color: "#fff" },
              }}
            >
              WORK
            </Link>
            <Link
              component="button"
              onClick={() => scrollToSection(howItWorksRef)}
              underline="none"
              sx={{
                color: "#8696A1",
                fontWeight: 500,
                "&:hover": { color: "#fff" },
              }}
            >
              EXPERIENCE{" "}
            </Link>

            <Link
              component="button"
              onClick={() => scrollToSection(pricingRef)}
              underline="none"
              sx={{
                color: "#8696A1",
                fontWeight: 500,
                "&:hover": { color: "#fff" },
              }}
            >
              REVIEWS
            </Link>
          </Stack>

          <Button
            color="primary"
            variant="solid"
            onClick={() => handleNavigation("/sign")}
          >
            GET IN TOUCH{" "}
          </Button>
        </Stack>

        {/* Hero Section */}
        <Stack
          direction="row"
          spacing={8}
          sx={{ alignContent: "center", alignItems: "center" }}
        >
          <Stack
            direction="column"
            justifyContent="left"
            width={634}
            alignItems="left"
            spacing={2}
            sx={{ mb: 2, mt: 4 }}
          >
            <Stack
              direction="column"
              justifyContent="left"
              alignItems="left"
              spacing={0.5}
              sx={{ pb: 3 }}
            >
              <Typography level="h1" fontWeight="400" sx={{ color: "#ffffff" }}>
                ALEXANDRIA KLAUS{" "}
              </Typography>
              <Typography level="h4" fontWeight="400" sx={{ color: "#AAAAAA" }}>
                Product Designer{" "}
              </Typography>
            </Stack>

            <Box
              sx={{ width: "48px", height: "4px", backgroundColor: "#E1B77B" }}
            ></Box>

            <Typography level="body-md" sx={{ color: "#ffffff", pt: 3 }}>
              Ut vestibulum eu sem et laoreet. Fusce dui felis, consectetur ac
              mi quis, blandit viverra libero. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed id fermentum lectus, at sagittis
              velit. Quisque pharetra lacus vel enim porta malesuada.{" "}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                color="primary"
                variant="solid"
                sx={{ minWidth: "auto", mt: 2 }}
                endDecorator={<TbChevronRight size={20} />}
              >
                Check my work
              </Button>
              <Button
                color="primary"
                variant="solid"
                sx={{ minWidth: "auto", mt: 2 }}
                endDecorator={<TbChevronRight size={20} />}
              >
                Download CV
              </Button>
            </Stack>
          </Stack>
          <Box
            sx={{
              position: "relative",
              width: "600px",
              height: "600px", // 760:400 = 76:40 ratio
              flexShrink: 0,
              borderRadius: "0px",
              overflow: "hidden",
            }}
          >
            <Image
              src="/hero-image.png"
              alt="Cover"
              fill
              priority
              quality={90}
              style={{
                objectFit: "cover",
                borderRadius: "var(--joy-radius-sm)",
              }}
              sizes="760px"
            />
          </Box>
        </Stack>

        {/* Divider */}
        <Box sx={{ py: 4 }}>
          <Divider
            sx={{
              width: "100%",
              maxWidth: "1352px",
              bgcolor: "#18242E",
              margin: "0 auto",
            }}
          />
        </Box>
        {/* Benefits Section */}
        <Box ref={benefitsRef} sx={{ py: 4 }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ p: 2 }}
          >
            <Typography level="h1" sx={{ color: "#ffffff" }}>
              Benefits
            </Typography>
          </Stack>
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",

              pt: 2,
              pb: 8,
            }}
          >
            <Card
              variant="solid"
              sx={{
                bgcolor: "transparent",
                borderRight: "1px solid", // Added 'solid' style
                borderBottom: "1px solid", // Fixed property name
                borderColor: "#18242E", // Now works as expected
                borderRadius: "0px",
                p: 4,
              }}
            >
              <CardContent>
                <TbBrandBluesky size="32" color="#34B3F1" />
                <Typography
                  level="title-lg"
                  textColor="#ffffff"
                  sx={{ mt: 2.5, mb: 1 }}
                >
                  Integrate today
                </Typography>
                <Typography textColor="#8696A1">
                  A simple, elegant interface so you can start sending emails in
                  minutes. It fits right into your code with SDKs for your
                  favorite programming.
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="solid"
              sx={{
                bgcolor: "transparent",
                borderRight: "1px solid", // Added 'solid' style
                borderBottom: "1px solid", // Fixed property name
                borderColor: "#18242E", // Now works as expected
                borderRadius: "0px",
                p: 4,
              }}
            >
              <CardContent>
                <TbBrandBluesky size="32" color="#34B3F1" />
                <Typography
                  level="title-lg"
                  textColor="#ffffff"
                  sx={{ mt: 2.5, mb: 1 }}
                >
                  Integrate today
                </Typography>
                <Typography textColor="#8696A1">
                  A simple, elegant interface so you can start sending emails in
                  minutes. It fits right into your code with SDKs for your
                  favorite programming.
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="solid"
              sx={{
                bgcolor: "transparent",
                borderBottom: "1px solid", // Fixed property name
                borderColor: "#18242E", // Now works as expected
                borderRadius: "0px",
                p: 4,
              }}
            >
              <CardContent>
                <TbBrandBluesky size="32" color="#34B3F1" />
                <Typography
                  level="title-lg"
                  textColor="#ffffff"
                  sx={{ mt: 2.5, mb: 1 }}
                >
                  Integrate today
                </Typography>
                <Typography textColor="#8696A1">
                  A simple, elegant interface so you can start sending emails in
                  minutes. It fits right into your code with SDKs for your
                  favorite programming.
                </Typography>
              </CardContent>
            </Card>{" "}
            <Card
              variant="solid"
              sx={{
                bgcolor: "transparent",
                borderRight: "1px solid", // Added 'solid' style
                borderColor: "#18242E", // Now works as expected
                borderRadius: "0px",
                p: 4,
              }}
            >
              <CardContent>
                <TbBrandBluesky size="32" color="#34B3F1" />
                <Typography
                  level="title-lg"
                  textColor="#ffffff"
                  sx={{ mt: 2.5, mb: 1 }}
                >
                  Integrate today
                </Typography>
                <Typography textColor="#8696A1">
                  A simple, elegant interface so you can start sending emails in
                  minutes. It fits right into your code with SDKs for your
                  favorite programming.
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="solid"
              sx={{
                bgcolor: "transparent",
                borderRight: "1px solid", // Added 'solid' style
                borderColor: "#18242E", // Now works as expected
                borderRadius: "0px",
                p: 4,
              }}
            >
              <CardContent>
                <TbBrandBluesky size="32" color="#34B3F1" />
                <Typography
                  level="title-lg"
                  textColor="#ffffff"
                  sx={{ mt: 2.5, mb: 1 }}
                >
                  Integrate today
                </Typography>
                <Typography textColor="#8696A1">
                  A simple, elegant interface so you can start sending emails in
                  minutes. It fits right into your code with SDKs for your
                  favorite programming.
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="solid"
              sx={{
                bgcolor: "transparent",
                borderColor: "#18242E", // Now works as expected
                borderRadius: "0px",
                p: 4,
              }}
            >
              <CardContent>
                <TbBrandBluesky size="32" color="#34B3F1" />
                <Typography
                  level="title-lg"
                  textColor="#ffffff"
                  sx={{ mt: 2.5, mb: 1 }}
                >
                  Integrate today
                </Typography>
                <Typography textColor="#8696A1">
                  A simple, elegant interface so you can start sending emails in
                  minutes. It fits right into your code with SDKs for your
                  favorite programming.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
        {/* Divider */}
        <Box sx={{ py: 4 }}>
          <Divider
            sx={{
              width: "100%",
              maxWidth: "1352px",
              bgcolor: "#18242E",
              margin: "0 auto",
            }}
          />
        </Box>

        {/* Features Section */}
        <Box ref={featuresRef} sx={{ py: 4 }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ pt: 4, pb: 4 }}
          >
            <Typography level="h1" sx={{ color: "#ffffff" }}>
              Features
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={12.5}
            sx={{ pb: 6, pt: 2 }}
          >
            <Stack
              spacing={2}
              sx={{
                width: "100%",
              }}
            >
              <Typography level="h4" sx={{ color: "#ffffff" }}>
                Yosemite National Park
              </Typography>
              <Typography sx={{ color: "#8696A1" }}>
                Etiam vestibulum fringilla nibh, at faucibus diam maximus
                tincidunt. Vivamus iaculis consectetur ultricies. Nam volutpat
                turpis ut augue euismod, vel vulputate lorem vehicula. Ut
                vestibulum eu sem et laoreet. Fusce dui felis, consectetur ac mi
                quis, blandit viverra libero. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed id fermentum lectus, at
                sagittis velit. Quisque pharetra lacus vel enim porta malesuada.
              </Typography>
            </Stack>

            <Card
              variant="plain"
              sx={{
                position: "relative",
                borderRadius: "25px",
                padding: "2px",
                background: "linear-gradient(45deg, #126CA8, #0A1E2B, #126CA8)",
                boxShadow: "0 0 64px rgba(52, 179, 241, 0.16)",
                animation: "gradientAnimation 6s linear infinite",
                backgroundSize: "300% 300%",
                transformStyle: "preserve-3d",
                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                "@keyframes gradientAnimation": {
                  "0%": {
                    backgroundPosition: "0% 50%",
                  },
                  "50%": {
                    backgroundPosition: "100% 50%",
                  },
                  "100%": {
                    backgroundPosition: "0% 50%",
                  },
                },
                "&:hover": {
                  transform: "perspective(600px) rotateX(2deg) rotateY(1deg)",
                },
              }}
            >
              <Box
                sx={{
                  width: 628,
                  height: 408,
                  border: "8px solid #040D13",
                  borderRadius: "24px",
                  overflow: "hidden",
                  position: "relative",
                  margin: "-1px",
                  zIndex: 1, // Ensure content stays above gradient
                }}
              >
                <Image
                  src="/screens/Dashboard.jpg"
                  alt="Screen"
                  layout="intrinsic"
                  width={628}
                  height={408}
                  style={{
                    display: "block",
                    objectFit: "contain",
                    position: "relative",
                  }}
                />
              </Box>
            </Card>
          </Stack>
        </Box>
        <Divider sx={{ width: "64px", bgcolor: "#18242E", margin: "0 auto" }} />

        {/* Divider */}
        <Box sx={{ py: 4 }}>
          <Divider
            sx={{
              width: "100%",
              maxWidth: "1352px",
              bgcolor: "#18242E",
              margin: "0 auto",
            }}
          />
        </Box>
        {/* Reviews Section */}
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ mt: 2, mb: 2, p: 2 }}
        >
          <Typography level="h1" sx={{ color: "#ffffff" }}>
            Reviews
          </Typography>
        </Stack>
        <Box
          sx={{
            position: "relative",
            bgcolor: "#040D13",
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: 0,
              height: "100%",
              width: "80px", // Increased width
              zIndex: 2, // Higher z-index
              pointerEvents: "none",
              transition: "opacity 0.2s ease",
            },
            "&::before": {
              left: 0,
              background:
                "linear-gradient(90deg, #040D13 30%, rgba(4,13,19,0) 100%)",
              opacity: isAtStart ? 0 : 1,
            },
            "&::after": {
              right: 0,
              background:
                "linear-gradient(270deg, #040D13 30%, rgba(4,13,19,0) 100%)",
              opacity: isAtEnd ? 0 : 1,
            },
          }}
        >
          <Grid
            container
            direction="row"
            spacing={2}
            flexWrap="nowrap"
            ref={containerRef} // CRITICAL: ref must be here
            sx={{
              overflowX: "auto",
              pb: 6,
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Grid xs={12} md={4} flexShrink={0}>
              <Stack
                spacing={2.5}
                sx={{
                  bgcolor: "#061620",
                  borderColor: "#18242E",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: "16px",
                  padding: 3,
                }}
              >
                <Typography level="title-md" textColor="#ffffff">
                  Cras blandit dolor mi, eget congue quam dignissim ac. Mauris
                  cursus purus ante, ut varius arcu…
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Avatar alt="Remy Sharp" src="/public/thumb-1.jpg" />

                  <Stack direction="column">
                    <Typography level="title-md" textColor="#ffffff">
                      Sarah Adams Stevens
                    </Typography>
                    <Typography level="body-sm" textColor="#8696A1">
                      Product Designer
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={4} flexShrink={0}>
              <Stack
                spacing={2.5}
                sx={{
                  bgcolor: "#061620",
                  borderColor: "#18242E",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: "16px",
                  padding: 3,
                }}
              >
                <Typography level="title-md" textColor="#ffffff">
                  Cras blandit dolor mi, eget congue quam dignissim ac. Mauris
                  cursus purus ante, ut varius arcu…
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Avatar alt="Remy Sharp" src="/public/thumb-1.jpg" />

                  <Stack direction="column">
                    <Typography level="title-md" textColor="#ffffff">
                      Sarah Adams Stevens
                    </Typography>
                    <Typography level="body-sm" textColor="#8696A1">
                      Product Designer
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={4} flexShrink={0}>
              <Stack
                spacing={2.5}
                sx={{
                  bgcolor: "#061620",
                  borderColor: "#18242E",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: "16px",
                  padding: 3,
                }}
              >
                <Typography level="title-md" textColor="#ffffff">
                  Cras blandit dolor mi, eget congue quam dignissim ac. Mauris
                  cursus purus ante, ut varius arcu…
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Avatar alt="Remy Sharp" src="/public/thumb-1.jpg" />

                  <Stack direction="column">
                    <Typography level="title-md" textColor="#ffffff">
                      Sarah Adams Stevens
                    </Typography>
                    <Typography level="body-sm" textColor="#8696A1">
                      Product Designer
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={4} flexShrink={0}>
              <Stack
                spacing={2.5}
                sx={{
                  bgcolor: "#061620",
                  borderColor: "#18242E",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: "16px",
                  padding: 3,
                }}
              >
                <Typography level="title-md" textColor="#ffffff">
                  Cras blandit dolor mi, eget congue quam dignissim ac. Mauris
                  cursus purus ante, ut varius arcu…
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Avatar alt="Remy Sharp" src="/public/thumb-1.jpg" />

                  <Stack direction="column">
                    <Typography level="title-md" textColor="#ffffff">
                      Sarah Adams Stevens
                    </Typography>
                    <Typography level="body-sm" textColor="#8696A1">
                      Product Designer
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={4} flexShrink={0}>
              <Stack
                spacing={2.5}
                sx={{
                  bgcolor: "#061620",
                  borderColor: "#18242E",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: "16px",
                  padding: 3,
                }}
              >
                <Typography level="title-md" textColor="#ffffff">
                  Cras blandit dolor mi, eget congue quam dignissim ac. Mauris
                  cursus purus ante, ut varius arcu…
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Avatar alt="Remy Sharp" src="/public/thumb-1.jpg" />

                  <Stack direction="column">
                    <Typography level="title-md" textColor="#ffffff">
                      Sarah Adams Stevens
                    </Typography>
                    <Typography level="body-sm" textColor="#8696A1">
                      Product Designer
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={4} flexShrink={0}>
              <Stack
                spacing={2.5}
                sx={{
                  bgcolor: "#061620",
                  borderColor: "#18242E",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: "16px",
                  padding: 3,
                }}
              >
                <Typography level="title-md" textColor="#ffffff">
                  Cras blandit dolor mi, eget congue quam dignissim ac. Mauris
                  cursus purus ante, ut varius arcu…
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Avatar alt="Remy Sharp" src="/public/thumb-1.jpg" />

                  <Stack direction="column">
                    <Typography level="title-md" textColor="#ffffff">
                      Sarah Adams Stevens
                    </Typography>
                    <Typography level="body-sm" textColor="#8696A1">
                      Product Designer
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        {/* Divider */}
        <Box sx={{ py: 4 }}>
          <Divider
            sx={{
              width: "100%",
              maxWidth: "1352px",
              bgcolor: "#18242E",
              margin: "0 auto",
            }}
          />
        </Box>
        {/* Integrations Section */}
        <Box ref={integrationsRef} sx={{ py: 4 }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ mt: 2, mb: 2 }}
          >
            <Typography level="h1" sx={{ color: "#ffffff" }}>
              Integrations
            </Typography>
            <Tabs
              aria-label="tabs"
              defaultValue={0}
              sx={{ bgcolor: "#040D13", p: 1 }}
            >
              <TabList
                disableUnderline
                sx={{
                  p: 0.5,
                  gap: 2,
                  borderRadius: "xl",
                  bgcolor: "#040D13",
                  "& .MuiTab-root": {
                    color: "#8696A1", // Default text color
                    borderColor: "#18242E",
                    "&:hover": {
                      color: "#8696A1",
                      bgcolor: "#18242E !important", // Hover color
                    },
                  },
                  '& .MuiTab-root[aria-selected="true"]': {
                    color: "#ffffff", // Selected text color
                    borderColor: "#ffffff",
                    boxShadow: "sm",
                    bgcolor: "#18242E",
                  },
                }}
              >
                <Tab disableIndicator>Feature</Tab>
                <Tab disableIndicator>Specifications</Tab>
                <Tab disableIndicator>Review</Tab>
                <Tab disableIndicator>Support</Tab>
              </TabList>
            </Tabs>

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={12.5}
              sx={{ pb: 6, pt: 2 }}
            >
              <Stack
                spacing={3}
                sx={{
                  width: "100%",
                }}
              >
                <Stack spacing={1.5}>
                  <Typography level="h4" sx={{ color: "#ffffff" }}>
                    Yosemite National Park
                  </Typography>
                  <Typography sx={{ color: "#8696A1" }}>
                    Etiam vestibulum fringilla nibh, at faucibus diam maximus
                    tincidunt. Vivamus iaculis consectetur ultricies. Nam
                    volutpat turpis ut augue euismod, vel vulputate lorem
                    vehicula. Ut vestibulum eu sem et laoreet. Fusce dui felis,
                    consectetur ac mi quis, blandit viverra libero. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed id
                    fermentum lectus, at sagittis velit. Quisque pharetra lacus
                    vel enim porta malesuada.
                  </Typography>
                </Stack>
                <Button
                  color="primary"
                  variant="solid"
                  endDecorator={<TbChevronRight size={20} />}
                  sx={{
                    width: "fit-content",
                    minWidth: "auto",
                  }}
                >
                  Get started
                </Button>
              </Stack>

              <Card
                variant="plain"
                sx={{
                  position: "relative",
                  borderRadius: "25px",
                  padding: "2px",
                  background:
                    "linear-gradient(45deg, #126CA8, #0A1E2B, #126CA8)",
                  boxShadow: "0 0 64px rgba(52, 179, 241, 0.16)",
                  animation: "gradientAnimation 6s linear infinite",
                  backgroundSize: "300% 300%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  "@keyframes gradientAnimation": {
                    "0%": {
                      backgroundPosition: "0% 50%",
                    },
                    "50%": {
                      backgroundPosition: "100% 50%",
                    },
                    "100%": {
                      backgroundPosition: "0% 50%",
                    },
                  },
                  "&:hover": {
                    transform: "perspective(600px) rotateX(2deg) rotateY(1deg)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 628,
                    height: 408,
                    border: "8px solid #040D13",
                    borderRadius: "24px",
                    overflow: "hidden",
                    position: "relative",
                    margin: "-1px",
                    zIndex: 1, // Ensure content stays above gradient
                  }}
                >
                  <Image
                    src="/screens/Dashboard.jpg"
                    alt="Screen"
                    layout="intrinsic"
                    width={628}
                    height={408}
                    style={{
                      display: "block",
                      objectFit: "contain",
                      position: "relative",
                    }}
                  />
                </Box>
              </Card>
            </Stack>
          </Stack>
        </Box>
        {/* Divider */}
        <Box sx={{ py: 4 }}>
          <Divider
            sx={{
              width: "100%",
              maxWidth: "1352px",
              bgcolor: "#18242E",
              margin: "0 auto",
            }}
          />
        </Box>
        {/* How it works Section */}
        <Box ref={howItWorksRef} sx={{ py: 4 }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={5}
            sx={{ mt: 3, mb: 6 }}
          >
            <Typography level="h1" fontWeight="400" sx={{ color: "#ffffff" }}>
              How it works
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={6}
            >
              <Stack
                direction="column"
                alignItems="center"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <Typography
                  level="h1"
                  sx={{
                    fontSize: "124px",
                    background:
                      "linear-gradient(0deg, #040D13 10%, #34B3F1 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textAlign: "center",

                    lineHeight: "0.8",
                  }}
                >
                  1
                </Typography>
                <Typography
                  level="h3"
                  textColor="#ffffff"
                  sx={{ textAlign: "center" }}
                >
                  Sign Up
                </Typography>
                <Typography textColor="#8696A1" sx={{ textAlign: "center" }}>
                  A simple, elegant interface so you can start sending emails in
                  minutes. It fits right into your workflow.
                </Typography>
              </Stack>

              <Box sx={{ alignContent: "center" }}>
                <Divider
                  orientation="vertical"
                  sx={{ height: "64px", bgcolor: "#18242E" }}
                />
              </Box>

              <Stack
                direction="column"
                alignItems="center"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <Typography
                  level="h1"
                  sx={{
                    fontSize: "124px",
                    background:
                      "linear-gradient(0deg, #040D13 10%, #34B3F1 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textAlign: "center",
                    lineHeight: "0.8",
                  }}
                >
                  2
                </Typography>
                <Typography
                  level="h3"
                  textColor="#ffffff"
                  sx={{ textAlign: "center" }}
                >
                  Sign Up
                </Typography>
                <Typography textColor="#8696A1" sx={{ textAlign: "center" }}>
                  A simple, elegant interface so you can start sending emails in
                  minutes. It fits right into your workflow.
                </Typography>
              </Stack>
              <Box sx={{ alignContent: "center" }}>
                <Divider
                  orientation="vertical"
                  sx={{ height: "64px", bgcolor: "#18242E" }}
                />
              </Box>

              <Stack
                direction="column"
                alignItems="center"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <Typography
                  level="h1"
                  sx={{
                    fontSize: "124px",
                    background:
                      "linear-gradient(0deg, #040D13 10%, #34B3F1 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textAlign: "center",

                    lineHeight: "0.8",
                  }}
                >
                  3
                </Typography>
                <Typography
                  level="h3"
                  textColor="#ffffff"
                  sx={{ textAlign: "center" }}
                >
                  Sign Up
                </Typography>
                <Typography textColor="#8696A1" sx={{ textAlign: "center" }}>
                  A simple, elegant interface so you can start sending emails in
                  minutes. It fits right into your workflow.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* Divider */}
        <Box sx={{ py: 4 }}>
          <Divider
            sx={{
              width: "100%",
              maxWidth: "1352px",
              bgcolor: "#18242E",
              margin: "0 auto",
            }}
          />
        </Box>
        {/* Pricing Section */}
        <Box ref={pricingRef} sx={{ py: 4 }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ mt: 2, mb: 2 }}
          >
            <Typography level="h1" fontWeight={400} sx={{ color: "#ffffff" }}>
              Pricing
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              pt: 4,
              pb: 4,
            }}
          >
            {/* Card 1 */}
            <Grid container columns={{ xs: 4, md: 12 }}>
              <Card
                sx={{
                  bgcolor: "#040D13",
                  borderColor: "#18242E",
                  borderWidth: 2,
                  borderStyle: "solid",
                  width: "440px",
                  borderRadius: "20px",
                }}
                size="lg"
                variant="outlined"
              >
                <Typography sx={{ color: "#ffffff" }} level="h2">
                  Basic
                </Typography>
                <Typography
                  sx={{ color: "#ffffff", mr: "auto" }}
                  level="title-lg"
                >
                  1.990€{" "}
                  <Typography sx={{ color: "#8696A1", fontSize: "sm" }}>
                    / month
                  </Typography>
                </Typography>
                <Divider
                  inset="none"
                  sx={{
                    Color: "#18242E",
                  }}
                />
                <Stack direction="column" spacing={3}>
                  <List
                    size="sm"
                    sx={{
                      backgroundColor: "#040D13",
                      color: "#ffffff",
                      p: 0,
                      m: 0,
                    }}
                  >
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Virtual Credit Cards
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Basic Analytics
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Virtual Credit Cards
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Basic Analytics
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Virtual Credit Cards
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Basic Analytics
                    </ListItem>
                  </List>

                  <Button
                    variant="solid"
                    color="primary"
                    sx={{ width: "100%" }}
                  >
                    Start now
                  </Button>
                </Stack>
              </Card>
            </Grid>
            <Grid container columns={{ xs: 4, md: 12 }}>
              <Card
                sx={{
                  bgcolor: "#040D13",
                  borderColor: "#34B3F1",
                  borderWidth: 2,
                  borderStyle: "solid",
                  width: "440px",

                  boxShadow: "0 0 128px rgba(52, 179, 241, 0.16)",
                  borderRadius: "20px",
                }}
                size="lg"
                variant="outlined"
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Typography
                    sx={{ color: "#ffffff", alignItems: "center" }}
                    level="h2"
                  >
                    Professional
                  </Typography>
                  <Stack
                    sx={{
                      pl: 1,
                      pr: 1,
                      height: "24px !important",
                      border: "1px solid #34B3F1",
                      borderRadius: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{ color: "#34B3F1" }}
                      level="body-xs"
                      fontWeight="600"
                    >
                      Best value
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  sx={{ color: "#ffffff", mr: "auto" }}
                  level="title-lg"
                >
                  5.990€{" "}
                  <Typography sx={{ color: "#8696A1", fontSize: "sm" }}>
                    / month
                  </Typography>
                </Typography>
                <Divider
                  inset="none"
                  sx={{
                    Color: "#18242E",
                  }}
                />
                <Stack direction="column" spacing={3}>
                  <List
                    size="sm"
                    sx={{
                      backgroundColor: "#040D13",
                      color: "#ffffff",
                      p: 0,
                      m: 0,
                    }}
                  >
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Virtual Credit Cards
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Basic Analytics
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Virtual Credit Cards
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Basic Analytics
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Virtual Credit Cards
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Basic Analytics
                    </ListItem>
                  </List>

                  <Button
                    variant="solid"
                    color="primary"
                    sx={{ width: "100%" }}
                  >
                    Start now
                  </Button>
                </Stack>
              </Card>
            </Grid>
            <Grid container columns={{ xs: 4, md: 12 }}>
              <Card
                sx={{
                  bgcolor: "#040D13",
                  borderColor: "#18242E",
                  borderWidth: 2,
                  borderStyle: "solid",
                  width: "440px",

                  borderRadius: "20px",
                }}
                size="lg"
                variant="outlined"
              >
                <Typography sx={{ color: "#ffffff" }} level="h2">
                  Basic
                </Typography>
                <Typography
                  sx={{ color: "#ffffff", mr: "auto" }}
                  level="title-lg"
                >
                  1.990€{" "}
                  <Typography sx={{ color: "#8696A1", fontSize: "sm" }}>
                    / month
                  </Typography>
                </Typography>
                <Divider
                  inset="none"
                  sx={{
                    Color: "#18242E",
                  }}
                />
                <Stack direction="column" spacing={3}>
                  <List
                    size="sm"
                    sx={{
                      backgroundColor: "#040D13",
                      color: "#ffffff",
                      p: 0,
                      m: 0,
                    }}
                  >
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Virtual Credit Cards
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Basic Analytics
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Virtual Credit Cards
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Basic Analytics
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Virtual Credit Cards
                    </ListItem>
                    <ListItem sx={{ color: "#ffffff", p: 0, m: 0 }}>
                      <TbCheck size="24" color="#8696A1" />
                      Basic Analytics
                    </ListItem>
                  </List>

                  <Button
                    variant="solid"
                    color="primary"
                    sx={{ width: "100%" }}
                  >
                    Start now
                  </Button>
                </Stack>
              </Card>
            </Grid>
          </Stack>
        </Box>

        {/* Partners Section */}
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          sx={{ pt: 6 }}
        >
          <Typography level="h3" sx={{ color: "#ffffff" }}>
            Meet partners who are happily using our app
          </Typography>

          {/* First row with 5 unique partner logos */}
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              {[...Array(5)].map((_, index) => (
                <Card
                  key={index}
                  variant="plain"
                  sx={{ width: 160, bgcolor: "initial", pt: 2, pb: 2 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="160"
                      height="60"
                      viewBox="0 0 160 60"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Replace these paths with the actual SVG paths for each unique logo */}
                      {index === 0 && (
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M88.7242 14.2808V16.8351C88.7242 17.1888 89.0386 17.4639 89.3923 17.4639H95.3263L88.4884 27.2492C88.0561 27.878 88.0561 28.5853 88.0561 28.9783V31.572C88.0561 31.965 88.4884 32.358 88.8814 32.1615C92.7326 30.0787 97.4091 30.2751 100.907 32.1222C101.339 32.358 101.732 31.9257 101.732 31.5327V28.8211C101.693 28.4674 101.575 28.0744 101.142 27.8387C99.1775 26.7383 96.8589 26.4239 94.6582 26.4632L100.553 18.0534C101.103 17.2674 101.418 16.7958 101.418 16.4422V14.2808C101.418 13.9271 101.103 13.652 100.749 13.652H89.353C88.9993 13.652 88.7242 13.8878 88.7242 14.2808ZM43.7277 32.6723H47.186C47.5789 32.6723 47.854 32.3972 47.8933 32.0829V22.6513C47.8933 22.5897 47.8933 22.5274 47.8932 22.4646C47.8909 20.4035 47.888 17.739 50.2905 17.739C52.4843 17.739 52.448 20.1283 52.419 22.0386C52.4158 22.25 52.4126 22.4555 52.4126 22.6513V32.0829C52.4126 32.3972 52.6877 32.6723 53.0414 32.7116H56.4996C56.8533 32.7116 57.1677 32.4365 57.1677 32.0829V22.6513C57.1677 22.5613 57.1674 22.4677 57.1671 22.3711C57.1638 21.3711 57.1596 20.0566 57.4821 19.2323C57.8358 18.3285 58.7397 17.7783 59.5649 17.7783C60.5867 17.7783 61.3333 18.132 61.6084 19.3109C61.7318 19.866 61.7099 21.1472 61.6948 22.0338C61.6907 22.277 61.687 22.4906 61.687 22.6513V32.0829C61.687 32.3972 61.9621 32.6723 62.3158 32.7116H65.7347C66.0884 32.7116 66.4028 32.4365 66.4028 32.0829V20.8436C66.4028 20.5569 66.408 20.2651 66.4133 19.971C66.4434 18.2893 66.4748 16.5343 65.5382 15.2632C64.5558 13.8878 62.9839 13.2983 61.5298 13.2983C59.4863 13.2983 57.5607 14.3594 56.7354 16.5994C55.7923 14.3594 54.4168 13.2983 52.2554 13.2983C50.1333 13.2983 48.5221 14.3594 47.6968 16.5994H47.6182V14.2808C47.5789 13.9664 47.3432 13.6913 46.9895 13.6913H43.767C43.4133 13.6913 43.0989 13.9664 43.0989 14.3201V32.0829C43.1382 32.3972 43.4133 32.633 43.7277 32.6723ZM119.18 23.3194C119.18 17.6997 116.39 13.2983 111.242 13.2983C106.212 13.2983 103.422 17.6211 103.461 23.1622C103.461 28.6639 106.212 33.0653 111.242 33.0653C116.115 33.0653 119.18 28.7425 119.18 23.3194ZM108.531 22.612C108.531 20.4506 108.688 16.953 111.242 16.953C112.342 16.953 113.128 17.4246 113.521 18.6822C113.954 20.0969 114.032 21.9046 114.032 23.398C114.032 25.6773 113.875 29.4106 111.203 29.4106C108.529 29.4106 108.53 24.9012 108.531 22.7034L108.531 22.612ZM122.364 32.6723H125.822C126.175 32.6723 126.49 32.3973 126.529 32.0436V22.4548C126.529 21.2365 126.608 20.1755 127.079 19.0752C127.472 18.2106 128.258 17.6604 129.084 17.6604C131.288 17.6604 131.266 20.0535 131.248 21.9663C131.246 22.1335 131.245 22.2969 131.245 22.4548V32.1222C131.284 32.3973 131.559 32.633 131.874 32.6723H135.332C135.686 32.6723 135.961 32.4366 136 32.1222V20.9222C136 19.193 136 16.7958 135.096 15.3811C134.114 13.8485 132.581 13.2983 131.048 13.2983C128.651 13.2983 127.315 14.438 126.333 16.8744H126.254V14.1629C126.175 13.8878 125.94 13.652 125.625 13.652H122.403C122.049 13.652 121.774 13.9271 121.735 14.2415V32.0436C121.735 32.358 122.01 32.633 122.364 32.6723ZM79.6465 24.3948C79.6464 24.325 79.6463 24.2548 79.6463 24.1839V23.4372C77.1312 23.4372 74.4982 23.9874 74.4982 26.9348C74.4982 28.4281 75.2842 29.4499 76.6203 29.4499C77.6028 29.4499 78.4674 28.8604 79.0175 27.878C79.6502 26.7243 79.6485 25.6411 79.6465 24.3948ZM82.3186 32.7116C82.5937 32.8688 82.9081 32.8295 83.1439 32.633C83.395 32.4238 83.7154 32.1502 84.0576 31.8579C84.6796 31.3268 85.3738 30.734 85.8554 30.3537C86.1305 30.1573 86.0912 29.7643 85.8554 29.4499C85.7796 29.3409 85.7033 29.2349 85.6276 29.1297C85.0753 28.3624 84.5586 27.6444 84.5586 26.2274V20.8436C84.5586 20.6636 84.5596 20.4847 84.5606 20.3069C84.5719 18.2326 84.5824 16.3181 83.026 14.8702C81.6898 13.5734 79.4891 13.1411 77.7993 13.1411C74.4982 13.1411 70.8435 14.3594 70.0575 18.4464C69.979 18.8787 70.2933 19.0751 70.5684 19.1537L73.9088 19.5074C74.2232 19.5074 74.4196 19.193 74.4982 18.8787C74.7733 17.4639 75.9523 16.7958 77.2884 16.7958C77.9958 16.7958 78.7818 17.0709 79.214 17.6997C79.6657 18.3251 79.6566 19.1655 79.6484 19.9222C79.6474 20.0214 79.6463 20.1191 79.6463 20.2148V20.6471C79.3202 20.6854 78.9775 20.7217 78.6241 20.7591C76.8051 20.9517 74.7022 21.1743 73.1228 21.8653C70.9614 22.8085 69.4288 24.6948 69.4288 27.5243C69.4288 31.1004 71.7081 32.9081 74.6161 32.9081C77.0526 32.9081 78.4281 32.3187 80.3144 30.393C80.4057 30.5244 80.4888 30.6466 80.5675 30.7624C81.0307 31.4439 81.3445 31.9055 82.3186 32.7116ZM34.2571 24.3948C34.257 24.325 34.2568 24.2548 34.2568 24.1839V23.4372C31.7418 23.4372 29.1088 23.9874 29.1088 26.9348C29.1088 28.4281 29.8947 29.4499 31.2309 29.4499C32.2133 29.4499 33.0779 28.8604 33.6281 27.878C34.2607 26.7243 34.259 25.6411 34.2571 24.3948ZM36.8898 32.7116C37.1649 32.8688 37.4793 32.8295 37.7151 32.633C37.9662 32.4238 38.2866 32.1502 38.6289 31.8579C39.2509 31.3268 39.945 30.734 40.4267 30.3537C40.7018 30.1573 40.6625 29.7643 40.4267 29.4499C40.3509 29.3409 40.2745 29.2349 40.1988 29.1297C39.6466 28.3624 39.1298 27.6444 39.1298 26.2274V20.8436C39.1298 20.6636 39.1308 20.4847 39.1318 20.3069C39.1431 18.2326 39.1536 16.3181 37.5972 14.8702C36.2611 13.5734 34.0604 13.1411 32.3705 13.1411C29.0695 13.1411 25.4147 14.3594 24.6288 18.4464C24.5502 18.8787 24.8646 19.0751 25.1396 19.1537L28.48 19.5074C28.7944 19.5074 28.9909 19.193 29.0695 18.8787C29.3446 17.4639 30.5235 16.7958 31.8596 16.7958C32.567 16.7958 33.353 17.0709 33.7853 17.6997C34.2369 18.3251 34.2278 19.1655 34.2197 19.9222C34.2186 20.0214 34.2175 20.1191 34.2175 20.2148V20.6471C33.8915 20.6854 33.5488 20.7217 33.1953 20.7591C31.3764 20.9517 29.2735 21.1743 27.694 21.8653C25.5326 22.8085 24 24.6948 24 27.5243C24 31.1004 26.2793 32.9081 29.1874 32.9081C31.6239 32.9081 32.9993 32.3187 34.8856 30.393C34.977 30.5244 35.06 30.6465 35.1388 30.7624C35.602 31.4439 35.9157 31.9055 36.8898 32.7116ZM96.1909 36.4057C95.3656 35.3446 90.6891 35.8948 88.6063 36.1699C87.9775 36.2485 87.8596 35.6983 88.4491 35.3053C92.1824 32.6723 98.2737 33.4583 98.981 34.3229C99.6884 35.1874 98.7845 41.318 95.287 44.226C94.7368 44.6583 94.2259 44.4225 94.4617 43.833L94.5041 43.727C95.3092 41.7155 97.0016 37.4866 96.1909 36.4057ZM93.4793 39.5104C86.9951 44.3048 77.5635 46.8592 69.4288 46.8592C58.0323 46.8592 47.8147 42.6543 40.0337 35.6592C39.4442 35.109 39.9551 34.3624 40.7017 34.7946C49.0723 39.6676 59.4077 42.5757 70.0968 42.5757C77.2884 42.5757 85.2267 41.0823 92.5361 37.9778C93.6365 37.5455 94.5403 38.7245 93.4793 39.5104Z"
                          fill="#888888"
                        />
                      )}
                      {index === 1 && (
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M67.2412 43.4103C63.1481 40.7736 57.5933 40.3109 48.6349 42.7964C47.269 43.1174 46.0333 43.4219 44.9063 43.6996L44.9062 43.6996L44.9061 43.6996C38.1533 45.3637 35.3022 46.0662 31.7185 43.5913C30.112 42.1725 29.536 39.8883 29.9661 36.5979C30.9637 31.234 33.6595 26.0721 38.448 20.3463C41.1208 17.3678 43.6002 14.8117 46.8739 13.7853C49.383 13.1413 49.1484 15.1132 48.8448 15.3952C48.5245 15.3952 47.9863 15.4457 47.5703 15.7171C47.2328 15.9789 46.3062 16.8243 46.2564 17.9614C46.1846 19.7022 47.986 19.3398 48.763 18.3841C49.6005 17.307 50.8383 15.2445 49.8647 13.3223C49.4566 12.6381 48.7515 12.1652 47.876 12.0042C44.8782 11.8329 42.0864 13.2619 39.5097 14.8418C33.8747 18.7563 29.367 24.1804 26.8164 30.1176C25.346 33.6999 24.0161 38.8314 26.0094 43.008C27.5516 45.9059 30.753 47.4453 34.5726 47.1234C36.8346 46.8857 39.4961 46.2314 41.5814 45.7188C41.9657 45.6243 42.3305 45.5347 42.6696 45.4533C42.8666 45.4059 43.137 45.3315 43.4686 45.2403L43.4689 45.2402C46.8047 44.322 56.3322 41.6996 59.6651 47.7682C59.6651 47.7682 60.8836 45.4028 63.9289 45.3524C66.4325 45.1214 70.0443 46.0771 72.6744 48.0089C71.7981 46.6911 69.3138 44.7489 67.2412 43.4103ZM49.772 21.0205C47.6861 19.652 43.4937 22.2684 40.1359 26.7562C37.0652 30.7818 35.7393 35.4605 37.1824 37.6241C39.3287 40.1699 43.3136 36.4669 45.0082 34.4848L45.2268 34.2531C46.3574 33.0388 47.2356 31.5823 48.0822 30.178L48.1312 30.0968C48.1312 30.0968 48.9232 28.7886 48.961 28.7281C49.4505 28.6379 50.0401 28.497 50.7045 28.3057C50.7039 28.3077 50.6918 28.3288 50.67 28.3671C50.3671 28.8984 48.1799 32.7345 48.4209 34.7052C48.429 34.7703 48.4357 34.8529 48.4435 34.9494L48.4435 34.9495C48.5131 35.8088 48.6722 37.7767 50.7389 38.4188C53.8029 38.9324 56.2496 36.5572 58.4081 34.444C58.4081 34.444 58.7759 34.0921 58.9839 33.8912C58.9313 34.1019 58.8627 34.3831 58.8627 34.3831C57.9656 37.5027 59.1748 38.1573 59.9312 38.3988C62.0962 39.0283 64.6604 36.0826 64.9332 35.7692L64.9332 35.7691C64.9484 35.7517 64.9565 35.7424 64.9569 35.7424C64.9496 35.8515 64.9407 35.9586 64.932 36.0637L64.9319 36.0641C64.8571 36.9673 64.7942 37.7263 65.7818 38.3483C66.8225 38.7209 67.8759 38.1528 68.6767 37.6194C71.5608 35.5869 73.8843 32.4054 75.7609 29.6555H74.5638C74.5624 29.6555 74.5338 29.6952 74.4815 29.7678C73.9918 30.447 71.4258 34.0058 69.7011 34.8425L69.6953 34.845C69.649 34.8664 69.3363 35.0107 69.1506 34.8797C68.9026 34.6684 69.0004 34.2288 69.1535 33.9175C69.1631 33.8973 76.524 21.1305 76.524 21.1305H73.0486C73.0486 21.1305 72.6689 21.7448 72.638 21.785C72.6251 21.774 72.6026 21.7372 72.5784 21.6979C72.5586 21.6656 72.5378 21.6316 72.5204 21.6088C70.3672 18.6302 65.491 23.2117 61.8199 28.5247C60.4065 30.5677 58.6071 32.868 56.7412 34.5283C56.7412 34.5283 53.9769 37.0621 52.7959 35.2416C52.3641 34.4767 52.497 33.3584 52.7405 32.624C54.1156 28.7094 56.4852 25.1568 59.1817 23.0133C59.9427 22.42 60.7702 22.2484 61.1806 22.5C61.572 22.7319 61.6351 23.305 61.3876 23.6975C60.7596 23.6775 60.2564 23.8683 59.8475 24.291C59.0417 25.1363 58.7617 25.9516 59.0179 26.7165C60.2624 28.4875 62.7444 24.9855 62.6244 22.8522C62.5815 22.0873 62.1735 21.3629 61.5644 21.0104C60.6568 20.4672 59.2721 20.6079 58.3761 21.0409C57.1764 21.4935 55.2776 23.0733 54.1692 24.3012C52.7739 25.841 50.3807 27.5515 49.6324 27.36C49.6554 27.2986 49.6939 27.2067 49.7432 27.0892C50.2196 25.953 51.6991 22.4248 49.772 21.0205ZM66.5279 27.1387C67.204 26.2031 69.1717 23.6973 69.6515 23.2747C71.2649 21.8553 71.9098 22.4798 71.9656 22.9223C70.4598 25.6191 68.6827 28.7086 67.0117 31.4861C67.0152 31.4762 66.4888 32.281 66.4888 32.281C65.7509 33.4076 65.0078 34.3739 63.7958 35.0479C63.6229 35.0986 63.338 35.1188 63.1484 34.9773C62.9202 34.8264 62.8301 34.5747 62.8558 34.3131C62.9286 33.4479 63.8094 30.8019 66.5279 27.1387ZM47.6209 28.7588C47.6209 28.7588 47.5906 28.8497 47.5757 28.8794C47.5719 28.8794 46.0603 31.3445 46.0603 31.3445L46.0386 31.3735C45.1301 32.5865 43.9979 34.0981 42.5856 34.8265C42.1636 34.9673 41.5802 35.0582 41.2829 34.6861C40.6527 33.9312 40.9775 32.8846 41.2414 32.0395L41.3349 31.7376C42.0914 29.685 43.2916 27.8733 44.4601 26.1927C44.4747 26.1828 44.5074 26.1728 44.5192 26.1728C44.5202 26.1763 44.5214 26.1785 44.5227 26.1809C44.525 26.1853 44.5274 26.1898 44.5287 26.2031C45.2619 27.6116 46.6366 28.2654 47.6647 28.5678C47.6709 28.5678 47.6776 28.5778 47.6776 28.598C47.6777 28.628 47.661 28.6686 47.6209 28.7588ZM49.0529 25.8509C49.0461 25.871 48.3797 27.4005 48.3797 27.4005C48.2876 27.4774 48.1444 27.4442 47.9796 27.4059L47.9563 27.4005L47.6571 27.3499C46.7176 27.0583 46.0089 26.4343 45.7904 25.6898C45.4891 24.2407 46.7271 23.1035 47.2724 22.6912C47.7957 22.3286 48.6093 22.1375 49.0817 22.5099C49.3731 22.8522 49.4835 23.2948 49.4835 23.7781C49.4837 24.4319 49.2818 25.1664 49.0529 25.8509ZM92.9896 30.5197C92.6544 29.7954 91.859 29.3324 91.0111 29.3826C88.258 29.6344 85.565 31.8984 84.151 35.1485C83.409 36.8192 83.0041 38.1976 82.7386 40.3913C83.5948 39.4054 85.3411 37.7854 87.3227 36.8997C87.3227 36.8997 87.5923 34.7967 88.9673 32.9249C89.4876 32.1498 90.5288 30.9021 91.698 31.234C92.7196 31.5763 92.3604 34.4041 91.0028 37.1406C89.9982 39.1535 88.4609 41.1666 86.9055 42.555C85.5304 43.7222 83.4958 45.131 81.7157 44.0444C80.5946 43.3805 80.0227 41.9914 80.1434 40.2003C80.6791 35.1187 82.9924 30.7916 86.3027 25.8608C89.716 21.2822 93.4786 16.5829 98.5472 14.0768C99.5811 13.5536 100.539 13.4329 101.366 13.7549C101.366 13.7549 96.6081 16.3713 94.34 21.2117L94.3148 21.2654C93.7401 22.4877 92.9723 24.1208 93.7687 25.5688C94.191 26.3334 94.9406 26.3939 95.5444 26.3536C98.3245 25.7094 100.121 23.1133 101.588 20.7387C102.439 18.9374 103.195 17.1462 103.195 15.1537C103.195 14.9122 103.183 14.5904 103.162 14.3486C104.491 13.6445 107.214 14.892 107.214 14.892C108.465 15.3062 110.547 16.6765 112.361 17.8706C113.633 18.708 114.773 19.4588 115.403 19.7324C116.149 18.8672 117.374 17.5591 118.064 16.9049L117.065 16.291C115.533 15.3556 113.917 14.4663 112.321 13.588L112.321 13.5879L112.112 13.4733C108.334 11.4107 105.258 12.135 103.693 12.6986C103.078 12.9199 102.516 13.1111 102.516 13.1111C101.354 11.8432 99.4492 11.9637 98.0455 12.3061C92.9973 13.755 88.3104 17.287 83.2854 23.4155C79.5911 28.2156 77.2995 32.3617 76.0781 36.4571C75.1366 39.2143 74.8505 43.2696 77.1484 45.6747C79.1021 47.717 81.6928 47.2745 83.5221 46.5403C87.4858 44.588 91.0483 40.3815 92.8234 35.5411C93.2518 34.1023 93.7272 32.0696 92.9896 30.5197ZM102.104 15.3551C101.579 21.3728 96.9018 24.9052 95.7443 25.1865C95.0429 25.3272 93.8461 25.0155 94.9146 22.49C96.4879 19.0884 99.1742 16.2006 102.056 14.7213C102.127 14.9729 102.125 15.1335 102.104 15.3551ZM129.851 16.1196C127.335 17.5488 124.727 18.4743 121.57 18.1524C120.695 19.1389 119.843 20.1551 119.057 21.2015C123.489 22.3286 128.187 19.8229 130.807 17.4383C133.579 15.0331 135 12.0044 135 12.0044C135 12.0044 132.922 14.379 129.851 16.1196ZM82.3002 21.1308H78.9997L77.1379 24.1558H80.4378L82.3002 21.1308ZM120.889 43.1928C120.703 43.7461 121.201 43.9317 121.556 43.6903C123.522 42.5354 125.099 40.1486 126.351 38.2535C126.398 38.1826 126.444 38.1123 126.49 38.0429H127.665C126.769 39.5554 123.318 44.7868 120.434 46.3568C120.321 46.4181 120.209 46.4808 120.099 46.5429C119.429 46.9191 118.805 47.2702 118.008 47.1229C116.654 46.9522 116.586 45.2411 116.834 44.2854C116.064 45.1002 114.405 46.6905 112.916 47.0928C111.62 47.3442 109.92 46.8306 110.389 43.5503C108.206 46.2879 105.522 48.3606 103.901 46.358C102.766 44.9393 103.322 42.5441 104.523 39.0224C104.523 39.0224 104.927 37.8145 104.972 37.664C104.961 37.6575 104.955 37.655 104.95 37.6541C104.947 37.6536 104.944 37.6536 104.94 37.6536C104.281 37.8232 103.445 37.8713 103.151 37.8882C103.095 37.8914 103.059 37.8935 103.047 37.895C101.153 41.2159 98.7487 44.8484 95.3083 46.6598C94.8021 46.9212 93.5138 47.4648 92.4902 46.9419C91.4947 46.3782 91.1048 45.251 91.2963 43.5004C91.5683 41.266 92.5504 39.3147 93.5355 37.4929C95.3671 34.6253 97.9053 31.1432 101.301 29.7344C102.059 29.3926 103.184 29.1811 104.093 29.634C104.869 30.1972 105.077 31.0121 105.077 31.8782C105.077 32.2806 105.029 32.6929 104.978 33.0956C104.683 34.5044 104.092 35.8028 103.623 36.7686C103.849 36.9198 105.179 36.6075 105.524 36.3462C110.274 26.4241 115.708 19.1586 122.144 14.117L122.194 14.0871C123.446 13.2314 125.002 12.1751 126.429 12.4468C126.867 12.5274 127.202 12.8795 127.28 13.3425C127.514 14.7812 126.88 15.9891 126.308 17.0653C125.815 17.2267 125.065 17.3677 125.065 17.3677L125.595 16.2807C125.973 15.5362 126.302 14.8819 126.26 13.9966C126.15 13.7648 126.022 13.7547 125.923 13.7648C124.983 13.956 123.776 15.1233 122.612 16.2604L121.859 16.9851C117.073 21.7649 111.45 31.757 110.579 33.8506C112.544 32.8949 119.025 26.4744 122.192 22.0568C122.84 22.0369 123.389 21.9261 123.389 21.9261C122.882 22.9223 119.411 27.3801 115.295 31.3151C113.398 33.1364 111.311 34.7968 109.482 36.0646C108.583 38.0068 107.69 40.15 107.306 42.4045C107.263 42.7165 107.161 44.0555 108.155 43.9749C109.428 43.6929 111.721 39.9006 111.721 39.9006L111.805 39.7691C113.971 36.3774 116.711 32.0862 120.45 29.9004C121.321 29.4074 122.583 29.1503 123.443 29.6941C123.644 29.8246 124.131 30.4281 124.294 30.6995C124.294 30.6995 124.652 30.0681 124.82 29.7931H128.342L123.2 38.913C123.2 38.913 121.354 41.784 120.889 43.1928ZM95.4268 42.4499C95.4329 42.7711 95.4935 43.0681 95.6764 43.3399C97.2019 45.1109 100.858 40.0245 101.925 37.6495C101.066 37.277 99.6441 36.3931 99.0163 35.0181H99.0131C97.5147 36.9431 95.3917 40.4766 95.4268 42.4499ZM100.285 34.3942C100.632 36.0545 102.425 36.6586 102.526 36.5877C103.102 35.5857 103.545 34.5136 103.845 33.398L103.854 33.3273L103.858 33.296C103.896 32.9927 103.937 32.6625 103.937 32.3409C103.937 31.7984 103.823 31.2949 103.404 31.0126C102.952 30.8523 102.337 30.9626 101.928 31.2849C100.975 31.8478 99.9911 32.9647 100.285 34.3942ZM116.568 43.0078C116.568 43.0078 116.907 42.706 116.908 42.706C118.648 40.5421 120.04 38.0771 121.382 35.6922C121.461 35.5529 121.541 35.4129 121.62 35.2724C122.232 34.1953 122.86 33.0889 123.516 32.029C123.547 31.9788 123.601 31.818 123.601 31.7573C123.601 31.5663 123.463 31.3751 123.346 31.2645C122.833 31.053 122.348 31.3242 121.901 31.6469C119.292 33.7332 117.502 36.7236 115.965 39.2902L115.884 39.4251L115.746 39.7171L115.74 39.7284C115.201 40.8417 114.648 41.985 114.675 43.2186C114.703 43.3902 114.82 43.6115 114.986 43.6717C115.573 43.8981 116.062 43.4605 116.536 43.0364L116.568 43.0078Z"
                          fill="#888888"
                        />
                      )}
                      {index === 2 && (
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M75.6058 34.6951C76.0082 33.8499 76.7239 32.4704 77.0949 32.0181C77.5581 31.4549 78.1015 31.7965 78.101 32.2801L77.7389 52.3048C77.7389 52.7475 77.457 53.0289 77.1353 53.0289H75.3842C74.9818 53.0289 74.7606 52.868 74.7606 52.3048C74.7606 52.3048 75.0022 39.9479 75.0022 39.425C75.0022 38.902 74.5191 38.6401 74.1973 39.1834C73.7287 39.9738 72.7884 41.3165 71.9432 41.3165C71.0577 41.3165 70.5348 39.9883 70.4541 39.5853C70.3734 39.1829 70.0113 39.1426 69.7698 39.6257C68.4415 41.9605 67.3144 42.6448 66.4289 42.6851C65.5429 42.725 64.8586 41.1557 64.7381 40.7527C64.6176 40.3503 64.3755 40.31 64.1345 40.7129C63.9789 40.9717 63.7065 41.2809 63.371 41.6617C63.1855 41.8722 62.9808 42.1046 62.7659 42.3624C62.1617 43.0871 60.1093 44.8177 58.9419 43.852C57.6903 42.8161 58.3597 40.2423 59.1835 38.8612C60.5516 36.5672 61.6786 35.9631 62.846 36.0034C63.9391 36.2422 64.1335 35.96 64.3149 35.6969C64.3473 35.6498 64.3792 35.6034 64.4159 35.5607C64.6574 35.2788 65.261 35.0372 65.7441 35.0372C66.4284 35.0372 66.7507 35.601 66.791 36.2848C66.8309 36.9691 67.3946 39.1829 68.1591 39.1829C69.3669 39.1829 70.4536 35.5198 70.6548 34.6747C70.856 33.829 71.5403 33.588 71.7819 33.5476C72.0234 33.5073 72.5065 33.6278 72.5065 34.4331C72.5065 35.2385 72.6196 37.4517 73.513 37.4517C74.3048 37.4517 75.0966 35.7738 75.5243 34.8672C75.5532 34.8061 75.5804 34.7485 75.6058 34.6951ZM63.4099 39.9077L63.4103 39.9071C63.7724 39.3035 64.5777 37.8945 64.0139 37.5728C63.4203 37.2331 62.1224 38.5793 61.6796 39.4245C61.3843 39.9878 60.7941 41.5979 61.2369 41.8395C62.0817 42.1208 63.0471 40.5123 63.4099 39.9077ZM124.732 27.5677L124.738 27.5617C125.295 27.0751 125.483 27.743 125.12 28.2654C124.799 28.7889 123.732 30.4593 122.162 30.4593C120.897 30.4593 120.486 28.8339 120.224 27.7957C120.16 27.5457 120.106 27.3297 120.05 27.1787C119.848 26.6353 119.265 26.4341 118.903 27.1588C118.877 27.2097 118.847 27.2711 118.812 27.3414C118.289 28.4043 116.76 31.5062 115.401 31.5062C114.646 31.5062 114.501 30.6552 114.421 30.1866C114.412 30.1306 114.403 30.08 114.395 30.0369C114.314 29.6345 113.871 29.6948 113.63 30.1774C112.301 32.5122 111.578 32.7134 110.692 32.7537C109.806 32.7941 109.121 31.2243 109.001 30.8218C108.88 30.4189 108.639 30.3786 108.398 30.7815C108.242 31.0393 107.971 31.3471 107.638 31.7259C107.451 31.9377 107.245 32.1717 107.029 32.4315C106.425 33.1557 104.333 35.4098 103.165 34.4441C101.913 33.4082 102.905 30.5121 103.729 29.131C105.097 26.837 107.029 25.7498 108.196 25.7902C108.928 25.8944 109.057 25.7282 109.234 25.499C109.262 25.4632 109.29 25.4258 109.323 25.3877C109.565 25.1059 109.866 24.8648 110.33 24.8648C111.013 24.8648 111.255 25.71 111.295 26.3943C111.297 26.4292 111.299 26.468 111.302 26.5104C111.345 27.2985 111.455 29.2924 112.18 29.2924C113.161 29.2924 113.974 27.239 114.434 26.0782C114.531 25.8324 114.613 25.6266 114.676 25.4888C115.2 24.3613 115.884 23.3757 116.528 23.3757C117.091 23.3757 117.433 24.0595 117.414 24.6028C117.407 24.7896 117.388 24.9763 117.37 25.153C117.31 25.738 117.262 26.213 117.695 26.213C118.155 26.213 118.614 25.3741 118.849 24.9463C118.86 24.9247 118.872 24.9041 118.882 24.8847L120.11 22.9125C120.519 22.1998 121.652 22.1022 122.123 23.6571C122.266 24.1331 122.377 24.6213 122.482 25.0873C122.76 26.316 123.003 27.3905 123.732 27.6822C124.308 27.9405 124.571 27.7093 124.732 27.5677ZM105.66 31.6267C106.505 31.9086 107.31 30.5803 107.673 29.9767C107.723 29.8925 107.784 29.7955 107.851 29.6899C108.264 29.0378 108.882 28.0602 108.398 27.7828C107.803 27.4437 106.506 28.8093 106.063 29.6544C105.767 30.2182 105.217 31.3851 105.66 31.6267ZM95.5094 24.2447C96.4756 25.3713 99.8967 27.867 99.8967 27.867C101.547 29.1146 102.312 31.3284 100.499 33.6228C100.499 33.6228 94.2603 40.1436 92.8111 42.84C92.449 43.4441 91.8862 43.6852 91.4424 42.9606C90.9997 42.2364 89.7118 40.063 90.9598 38.7347C90.9598 38.7347 96.8362 32.8578 97.4005 30.6849C97.5609 29.9602 97.6819 28.994 96.5952 27.9073C95.5084 26.8206 94.4481 25.6507 94.0193 25.0496C93.4152 24.2044 93.1736 23.1575 94.2195 21.9503C94.3729 21.7734 94.592 21.5389 94.8561 21.2564C96.3939 19.6112 99.4556 16.3356 99.9355 13.2969C100.299 11.0024 99.6138 9.87533 99.1312 9.43257C98.6476 8.99031 96.8367 7.90309 95.0652 10.6C93.4495 13.0617 93.0936 15.8695 92.8723 17.6162C92.8511 17.7831 92.8312 17.9402 92.8116 18.0865C92.4495 20.7834 92.4086 32.8578 92.4086 33.5426C92.4086 33.5766 92.409 33.6134 92.4093 33.6527C92.4144 34.2427 92.4244 35.4063 91.4429 36.1992C90.3971 37.0438 88.1026 38.3318 88.8671 36.1583C89.0688 35.233 89.27 30.3228 89.27 28.5114C89.27 26.7001 89.3118 25.0491 89.3507 23.6008C89.5426 16.3231 90.187 15.131 91.5516 12.6062C91.6209 12.478 91.6921 12.3463 91.7652 12.2101C94.1 7.86325 98.7766 6.42193 100.983 7.1386C102.593 7.66204 104.833 10.9008 103.398 14.6251C101.923 18.4528 98.1957 20.9378 95.7788 22.5493L95.7106 22.5947C95.3082 22.9165 94.8605 23.4877 95.5094 24.2447ZM125.724 18.132C125.724 17.9636 125.649 17.7858 125.499 17.7016C125.349 17.613 125.181 17.6035 125.012 17.6035H124.142V19.6012H124.385V18.6793H124.834L125.405 19.6012H125.696L125.091 18.6793C125.448 18.6698 125.724 18.5249 125.724 18.132ZM124.76 18.4876H124.385V17.7813H124.956C125.204 17.7813 125.475 17.8187 125.475 18.1275C125.476 18.4975 125.115 18.4923 124.839 18.4883C124.812 18.4879 124.785 18.4876 124.76 18.4876ZM64.9677 48.0775L53.321 42.3904C53.0651 42.258 52.9331 41.9193 52.9381 41.6977L52.9689 38.558C52.9734 38.3369 53.0172 38.1098 53.3076 37.9016C53.3979 37.844 53.502 37.7794 53.6188 37.7068C55.1127 36.7788 58.6974 34.552 62.3918 29.16C67.6969 21.417 62.3918 14.9116 54.1005 16.6827C46.7365 18.2555 39.2395 22.2428 35.9878 24.4107C33.4605 26.0955 33.4432 28.0863 33.4269 29.9563C33.4246 30.2307 33.4222 30.5024 33.4119 30.7702C33.5728 31.6552 33.895 31.575 34.6197 30.6895C40.0129 25.6987 48.2241 21.9151 49.7536 21.2711C49.9629 21.1829 50.2115 21.0661 50.4956 20.9327L50.4957 20.9326C52.287 20.0909 55.4899 18.5859 59.1725 19.4194C63.2709 20.3477 62.2748 25.9198 61.0237 28.2745C59.6551 30.8504 55.751 34.5936 53.98 35.5195C53.3071 35.8711 53.0546 35.5195 53.0546 34.9557L53.3365 22.8404C53.3365 22.0356 52.9739 21.673 52.1691 21.9549L50.8812 22.5989C50.0595 23.0846 50.035 23.2928 49.9713 23.8349C49.9694 23.8505 49.9675 23.8664 49.9656 23.8826C49.9624 23.91 49.959 23.9383 49.9553 23.9675L49.7601 37.9345C49.7536 38.2358 49.6131 38.4778 49.4473 38.5491L45.2458 40.9123C44.2801 41.3954 44.5212 42.12 45.2458 42.3615L48.627 43.9712C49.4324 44.2929 49.6739 44.5345 49.6739 45.3393L49.5529 52.1017C52.572 51.4981 52.7727 50.0488 52.8534 49.0826V47.0297C52.9336 46.5466 53.2155 46.3857 53.6179 46.4664L63.4387 51.2157C64.3242 51.6186 64.8073 51.4567 65.4513 50.3307C66.0947 49.2046 66.1754 48.6413 64.9677 48.0775ZM82.1306 31.0162C80.766 31.8041 80.1345 33.2788 80.6723 34.2097C81.2092 35.141 82.8328 35.2974 84.1985 34.5085C85.5641 33.7201 86.1548 32.2857 85.6169 31.3549C85.08 30.4241 83.4962 30.2273 82.1306 31.0162ZM124.806 16.8169C124.332 16.8169 123.877 17.0052 123.542 17.3404C123.207 17.6755 123.018 18.1301 123.018 18.6041C123.018 19.0781 123.207 19.5327 123.542 19.8679C123.877 20.203 124.332 20.3913 124.806 20.3913C125.04 20.3911 125.273 20.3446 125.49 20.2543C125.707 20.1641 125.903 20.032 126.069 19.8655C126.235 19.699 126.366 19.5015 126.455 19.2842C126.544 19.0669 126.59 18.8342 126.589 18.5994C126.588 18.1266 126.401 17.6732 126.066 17.3389C125.732 17.0047 125.278 16.8169 124.806 16.8169ZM124.806 20.1762C124.599 20.1763 124.394 20.1356 124.203 20.0563C124.012 19.9771 123.838 19.8608 123.692 19.7143C123.546 19.5678 123.43 19.3939 123.352 19.2026C123.273 19.0112 123.233 18.8062 123.234 18.5994C123.234 18.3933 123.275 18.1892 123.354 17.9989C123.433 17.8085 123.549 17.6357 123.695 17.4901C123.841 17.3446 124.014 17.2293 124.205 17.1508C124.395 17.0723 124.599 17.0321 124.806 17.0325C125.221 17.0325 125.62 17.1976 125.913 17.4915C126.207 17.7853 126.372 18.1838 126.372 18.5994C126.373 18.8059 126.334 19.0106 126.255 19.2017C126.177 19.3929 126.062 19.5667 125.916 19.7132C125.771 19.8596 125.598 19.976 125.407 20.0554C125.217 20.1349 125.012 20.1759 124.806 20.1762Z"
                          fill="#888888"
                        />
                      )}
                      {index === 3 && (
                        <path
                          d="M118.9 43.0246C120.432 43.1731 121.963 43.3326 123.49 43.4976L126.863 35.1699L130.069 44.2658C131.714 44.4718 133.358 44.6882 134.997 44.914L129.376 28.9637L134.999 15.0802H130.237L130.188 15.1484L127.15 22.6486L124.484 15.0813H119.783L124.636 28.8551L118.9 43.0246H118.9ZM115.344 42.6983V15.0802H110.645V42.3107C112.212 42.4317 113.78 42.5619 115.344 42.6983ZM80.0414 41.1539C81.3101 41.1539 82.5773 41.1634 83.8423 41.1737V31.0273H89.4879V26.7065H83.8427V19.4061H90.3448V15.0802H79.1248V41.1575C79.4295 41.1575 79.7356 41.1528 80.0414 41.1539ZM65.4503 41.4179C67.016 41.3621 68.5831 41.3152 70.1524 41.2771V19.4069H74.5451V15.0813H61.0576V19.4069H65.451V41.4179H65.4503ZM29.5082 44.3299V27.8758L35.0727 43.6655C36.7839 43.4734 38.4977 43.2926 40.2163 43.1218V15.0806H35.707V32.1243L29.7025 15.0806H25V44.9214H25.0282C26.518 44.7153 28.0129 44.5195 29.5082 44.3299ZM56.526 19.4058V15.0806H45.3049V42.6543C49.0383 42.332 52.7759 42.0617 56.5168 41.8436V37.5143C54.3476 37.6405 52.1828 37.7857 50.0232 37.9474V31.0291H55.6687V26.7057H50.0232V19.4058H56.526ZM99.6585 37.3075V15.0791H94.9384V41.4336C98.693 41.5715 102.433 41.7636 106.161 42.0056V37.6738C103.997 37.5341 101.83 37.4131 99.6585 37.3075Z"
                          fill="#888888"
                        />
                      )}
                      {index === 4 && (
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M46.6083 14.4979C40.4569 21.722 34.5589 30.6805 34.4998 37.3766C34.4767 39.8961 35.2811 42.0955 37.2104 43.7615C39.9869 46.1608 43.0461 47.0068 46.0904 47.0118C50.5391 47.018 54.9567 45.2232 58.4156 43.8393C64.2408 41.5097 128.633 13.5467 128.633 13.5467C129.254 13.2354 129.138 12.8476 128.36 13.0412C128.046 13.1196 58.2593 32.032 58.2593 32.032C56.9375 32.4059 55.5715 32.6014 54.1978 32.6135C48.8346 32.6452 44.0621 29.6682 44.1007 23.3948C44.1157 20.9401 44.8671 17.9799 46.6083 14.4979Z"
                          fill="#888888"
                        />
                      )}
                    </svg>
                  </Box>
                </Card>
              ))}
            </Stack>
            {/* Second row with 4 unique partner logos */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ pb: 6, justifyContent: "center", alignItems: "center" }}
            >
              {[...Array(4)].map((_, index) => (
                <Card
                  key={index}
                  variant="plain"
                  sx={{ width: 160, bgcolor: "initial", pt: 2, pb: 2 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <svg width="160" height="60" viewBox="0 0 160 60">
                      {/* Replace these paths with the actual SVG paths for each unique logo */}
                      {index === 0 && (
                        <path
                          d="M71.8048 32.2976H79.7342L75.5415 25.552L67.8462 37.7482H64.3442L73.704 23.0979C74.1109 22.5061 74.7891 22.1484 75.5415 22.1484C76.269 22.1484 76.9473 22.4937 77.342 23.0733L86.7388 37.7482H83.2367L81.5844 35.0229H73.5563L71.8051 32.2976H71.8048ZM108.184 35.0227V22.2963H105.212V36.2684C105.212 36.6506 105.36 37.0207 105.643 37.3043C105.927 37.5879 106.309 37.7482 106.729 37.7482H120.281L122.033 35.0229H108.184L108.184 35.0227ZM59.0166 32.7413C61.9025 32.7413 64.2455 30.4106 64.2455 27.525C64.2455 24.6391 61.9025 22.2961 59.0166 22.2961H46.0152V37.7484H48.9861V25.0219H58.8195C60.2007 25.0219 61.3105 26.1443 61.3105 27.5255C61.3105 28.9064 60.2007 30.0286 58.8195 30.0286L50.4413 30.0164L59.3127 37.7484H63.6289L57.6603 32.7417H59.0169L59.0166 32.7413ZM27.7273 37.7482C23.4617 37.7484 20 34.2954 20 30.0286C20 25.7616 23.4617 22.2966 27.7273 22.2966H36.7086C40.9752 22.2966 44.4343 25.7616 44.4343 30.0286C44.4343 34.2954 40.9752 37.7482 36.7084 37.7482H27.7273ZM36.5089 35.0229C39.2724 35.0229 41.5107 32.7907 41.5107 30.0284C41.5107 27.2663 39.2724 25.0219 36.5089 25.0219H27.9261C25.1635 25.0219 22.9241 27.2663 22.9241 30.0286C22.9241 32.7907 25.1635 35.0229 27.9259 35.0229H36.5087H36.5089ZM92.9417 37.7482C88.6752 37.7482 85.2097 34.2954 85.2097 30.0286C85.2097 25.7616 88.6752 22.2966 92.9417 22.2966H103.609L101.87 25.0219H93.1391C90.3767 25.0219 88.1323 27.2663 88.1323 30.0286C88.1323 32.7907 90.3767 35.0229 93.1391 35.0229H103.855L102.104 37.7482H92.9417ZM129.284 35.0229C127.003 35.0229 125.066 33.4938 124.475 31.3849H137.176L138.927 28.6596H124.475C125.066 26.5631 127.003 25.0219 129.284 25.0219H138.003L139.766 22.2961H129.086C124.82 22.2961 121.354 25.7613 121.354 30.0281C121.354 34.2952 124.82 37.748 129.086 37.748H138.249L140 35.0229H129.284H129.284Z"
                          fill="#888888"
                        />
                      )}
                      {index === 1 && (
                        <path
                          d="M36.5954 11.4043C26.3256 11.4043 18 19.7297 18 29.9994C18 40.2702 26.3256 48.5952 36.5954 48.5952C46.8655 48.5952 55.1907 40.2703 55.1907 29.9994C55.1907 19.7304 46.866 11.4052 36.5951 11.4052L36.5954 11.4043ZM45.1231 38.2238C44.7891 38.7716 44.0754 38.9433 43.5294 38.6095C39.1627 35.9407 33.6665 35.3378 27.1936 36.8164C26.5699 36.9595 25.9481 36.5684 25.806 35.9449C25.6633 35.3211 26.0525 34.6994 26.6778 34.5573C33.7613 32.9378 39.8373 33.6349 44.7387 36.6299C45.2849 36.9652 45.4581 37.678 45.1228 38.2243L45.1231 38.2238ZM47.3991 33.1612C46.9785 33.8436 46.0863 34.0577 45.4049 33.6386C40.4076 30.5668 32.7874 29.677 26.8752 31.4717C26.1085 31.7032 25.2986 31.2711 25.0659 30.5057C24.835 29.739 25.2673 28.9307 26.0328 28.6975C32.786 26.6484 41.1814 27.641 46.9215 31.1683C47.6032 31.588 47.8186 32.4807 47.3989 33.1615L47.3991 33.1612ZM47.5945 27.8888C41.6004 24.3291 31.7133 24.0018 25.9912 25.7385C25.0724 26.0171 24.1007 25.4984 23.8222 24.5796C23.5438 23.6603 24.062 22.6892 24.9815 22.4099C31.5501 20.4159 42.4695 20.8011 49.3696 24.8973C50.1961 25.3878 50.4672 26.4552 49.9773 27.2806C49.4888 28.1071 48.4185 28.3795 47.5947 27.8888H47.5945ZM68.5918 28.571C65.3811 27.8053 64.8096 27.268 64.8096 26.1388C64.8096 25.0721 65.8139 24.3542 67.3074 24.3542C68.7552 24.3542 70.1908 24.8993 71.6959 26.0216C71.7414 26.0556 71.7985 26.0691 71.8546 26.0602C71.9108 26.0518 71.9606 26.0209 71.9934 25.9745L73.5611 23.7646C73.6255 23.6736 73.608 23.5481 73.5212 23.4786C71.7299 22.0413 69.7127 21.3425 67.355 21.3425C63.8883 21.3425 61.4668 23.4229 61.4668 26.3995C61.4668 29.5915 63.5557 30.7218 67.1654 31.5942C70.2377 32.3019 70.7562 32.8948 70.7562 33.9546C70.7562 35.1291 69.7076 35.8592 68.0203 35.8592C66.1461 35.8592 64.6175 35.2279 62.9075 33.747C62.8651 33.7104 62.8069 33.6937 62.7532 33.6968C62.6966 33.7015 62.6448 33.7277 62.6088 33.771L60.8511 35.863C60.7774 35.9498 60.7867 36.0795 60.872 36.1545C62.8615 37.9307 65.3086 38.8689 67.9492 38.8689C71.6848 38.8689 74.0987 36.8278 74.0987 33.6686C74.1054 31.0018 72.5089 29.5251 68.5985 28.5739L68.5918 28.571ZM82.55 25.4045C80.9309 25.4045 79.6027 26.0422 78.5076 27.349V25.8781C78.5076 25.762 78.4134 25.6674 78.2975 25.6674H75.4226C75.3065 25.6674 75.2125 25.762 75.2125 25.8781V42.2216C75.2125 42.3378 75.3065 42.4324 75.4226 42.4324H78.2975C78.4134 42.4324 78.5076 42.3378 78.5076 42.2216V37.0627C79.603 38.292 80.9313 38.8926 82.55 38.8926C85.5586 38.8926 88.6043 36.5766 88.6043 32.1493C88.6088 27.7209 85.5622 25.4043 82.5534 25.4043L82.55 25.4045ZM85.2613 32.1493C85.2613 34.4039 83.8726 35.9771 81.8841 35.9771C79.9183 35.9771 78.4354 34.3323 78.4354 32.1493C78.4354 29.9666 79.9183 28.3216 81.8841 28.3216C83.8404 28.3214 85.2615 29.9308 85.2615 32.1491L85.2613 32.1493ZM96.4106 25.4045C92.536 25.4045 89.5005 28.388 89.5005 32.1975C89.5005 35.9655 92.5151 38.9177 96.3631 38.9177C100.251 38.9177 103.296 35.9442 103.296 32.1493C103.296 28.3676 100.272 25.4049 96.4104 25.4049L96.4106 25.4045ZM96.4106 35.9995C94.3497 35.9995 92.796 34.3437 92.796 32.1482C92.796 29.9435 94.296 28.3436 96.3631 28.3436C98.4373 28.3436 100.001 29.9994 100.001 32.1964C100.001 34.4007 98.4914 35.9995 96.4108 35.9995H96.4106ZM111.57 25.6674H108.407V22.433C108.407 22.3171 108.313 22.2225 108.197 22.2225H105.322C105.206 22.2225 105.111 22.3171 105.111 22.433V25.6674H103.729C103.614 25.6674 103.52 25.762 103.52 25.8781V28.3489C103.52 28.4648 103.614 28.5596 103.729 28.5596H105.111V34.9528C105.111 37.5363 106.397 38.8462 108.933 38.8462C109.965 38.8462 110.82 38.6333 111.627 38.1761C111.692 38.1394 111.733 38.0688 111.733 37.9938V35.6409C111.733 35.5683 111.695 35.4997 111.633 35.4617C111.57 35.4224 111.492 35.4204 111.428 35.4522C110.874 35.7308 110.339 35.8594 109.74 35.8594C108.818 35.8594 108.407 35.4406 108.407 34.502V28.5608H111.57C111.686 28.5608 111.78 28.4662 111.78 28.35V25.8795C111.784 25.7634 111.691 25.6688 111.573 25.6688L111.57 25.6674ZM122.593 25.6801V25.2828C122.593 24.1141 123.041 23.593 124.046 23.593C124.645 23.593 125.127 23.712 125.666 23.8919C125.732 23.9127 125.801 23.9023 125.855 23.8626C125.911 23.8228 125.942 23.7591 125.942 23.6916V21.269C125.942 21.1764 125.883 21.0944 125.793 21.0671C125.224 20.8977 124.495 20.7238 123.404 20.7238C120.749 20.7238 119.345 22.2191 119.345 25.0465V25.655H117.964C117.848 25.655 117.753 25.7495 117.753 25.8655V28.3489C117.753 28.4648 117.848 28.5596 117.964 28.5596H119.345V38.4208C119.345 38.5369 119.439 38.6315 119.555 38.6315H122.43C122.546 38.6315 122.64 38.5369 122.64 38.4208V28.5603H125.325L129.436 38.419C128.97 39.4549 128.511 39.6609 127.884 39.6609C127.377 39.6609 126.844 39.5097 126.299 39.2113C126.247 39.1831 126.187 39.1784 126.131 39.1955C126.076 39.2148 126.03 39.2557 126.007 39.309L125.033 41.4467C124.986 41.5477 125.026 41.6663 125.123 41.7187C126.14 42.2696 127.059 42.5048 128.193 42.5048C130.316 42.5048 131.49 41.516 132.524 38.8558L137.511 25.9678C137.537 25.903 137.529 25.8297 137.489 25.7722C137.45 25.7151 137.386 25.6807 137.316 25.6807H134.323C134.234 25.6807 134.154 25.7378 134.124 25.8219L131.058 34.5793L127.7 25.8162C127.67 25.7347 127.591 25.6807 127.504 25.6807H122.592L122.593 25.6801ZM116.202 25.6674H113.327C113.211 25.6674 113.117 25.762 113.117 25.8781V38.4208C113.117 38.5369 113.211 38.6315 113.327 38.6315H116.202C116.318 38.6315 116.413 38.5369 116.413 38.4208V25.879C116.413 25.8513 116.408 25.8238 116.397 25.7982C116.386 25.7726 116.371 25.7494 116.351 25.7298C116.332 25.7102 116.308 25.6947 116.283 25.6841C116.257 25.6736 116.23 25.6682 116.202 25.6683L116.202 25.6674ZM114.781 19.9564C113.642 19.9564 112.718 20.8784 112.718 22.0173C112.718 23.1569 113.642 24.08 114.781 24.08C115.919 24.08 116.843 23.1569 116.843 22.0173C116.843 20.8786 115.919 19.9564 114.782 19.9564H114.781ZM139.966 29.7001C138.828 29.7001 137.943 28.7863 137.943 27.6768C137.943 26.5672 138.84 25.643 139.977 25.643C141.115 25.643 142 26.5565 142 27.6652C142 28.7748 141.103 29.7001 139.966 29.7001H139.966ZM139.977 25.8442C138.941 25.8442 138.157 26.668 138.157 27.6768C138.157 28.6851 138.935 29.4978 139.967 29.4978C141.003 29.4978 141.788 28.6747 141.788 27.6652C141.788 26.6569 141.009 25.8442 139.978 25.8442H139.977ZM140.426 27.8733L140.998 28.6744H140.516L140 27.9394H139.557V28.6744H139.154V26.5507H140.101C140.594 26.5507 140.918 26.8032 140.918 27.2282C140.921 27.5764 140.719 27.7891 140.428 27.8733L140.426 27.8733ZM140.084 26.9151H139.557V27.5868H140.084C140.347 27.5868 140.504 27.4583 140.504 27.2507C140.504 27.0322 140.346 26.9151 140.084 26.9151L140.084 26.9151Z"
                          fill="#888888"
                        />
                      )}
                      {index === 2 && (
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M137.134 37.148C137.282 37.232 137.356 37.4082 137.356 37.5757C137.356 37.9661 137.083 38.1099 136.73 38.1199L137.329 39.0351H137.041L136.474 38.1199H136.028V39.0351H135.786V37.0509H136.65C136.818 37.0509 136.985 37.0596 137.134 37.148ZM136.027 37.9287H136.4C136.425 37.9287 136.451 37.9291 136.479 37.9295C136.753 37.9335 137.111 37.9387 137.111 37.5714C137.111 37.2644 136.84 37.2271 136.594 37.2271H136.027V37.9287ZM129.669 24.1073L126.039 27.9829C125.576 28.5127 125.08 28.4579 124.673 28.0352L121.251 24.3059C121.209 24.2513 121.161 24.1966 121.112 24.1412C120.958 23.966 120.797 23.7828 120.797 23.5662C120.797 23.2251 121.182 23.0545 122.092 23.0545H122.986V20.6077H110.43V23.0545C113.197 23.0545 113.381 23.2795 114.174 24.2496C114.273 24.3702 114.381 24.5024 114.504 24.6471L121.268 32.1287V35.9128C121.268 36.8809 120.778 37.2215 119.379 37.2215H117.211V39.5823H131.096V37.2215H128.928C127.528 37.2215 127.04 36.8809 127.04 35.9128V32.1287L132.782 25.9277C134.88 23.2817 135.16 23.0545 136.664 23.0545H137.967V20.6077H128.054V23.0545H128.97C129.739 23.0545 129.984 23.1684 129.984 23.4529C129.984 23.6235 129.879 23.8228 129.669 24.1073ZM44.8213 20.6071H41.7924C41.8005 22.1741 41.1979 22.1243 40.5553 21.7066C38.2356 20.3954 35.8187 20.0094 32.9299 20.0094C26.0746 20.0094 21.7389 22.4562 21.7389 26.3536C21.7389 30.1084 25.1662 31.1606 29.8736 31.8722L34.0449 32.5552C38.9578 33.3228 40.4825 33.6646 40.4825 35.0866C40.4825 36.5092 38.941 37.4892 34.4577 37.5334C31.4842 37.5626 28.2418 36.6518 26.8796 35.3998C26.7242 35.259 26.5662 35.1316 26.4079 35.0039C25.7659 34.4863 25.1184 33.9643 24.6215 32.5265H21.8123V39.5817H24.9178C25.0498 38.5899 25.3486 37.7986 26.0528 38.2052C28.2991 39.398 32.1062 40.1788 34.6221 40.1788C41.8895 40.1788 45.9364 37.8746 45.9364 33.7499C45.9364 29.1715 39.6038 28.3594 34.2713 27.6755C30.3932 27.1782 27.044 26.7487 27.044 24.9876C27.044 23.481 29.8319 22.4562 33.1353 22.4562C35.6948 22.4562 38.738 23.5314 40.1432 24.8226C40.2642 24.9339 40.3871 25.0407 40.5092 25.1469C41.1729 25.7238 41.8147 26.2818 42.024 27.4344H44.8213V20.6071ZM100.963 24.4497L100.903 32.0378L88.8625 20.7522H78.9285V23.113H80.8324C82.3123 23.113 82.8303 23.4542 82.8303 24.4497V36.0566C82.8303 37.0235 82.3123 37.3933 80.8324 37.3933H78.9285V39.7261H90.4184V37.3933H88.4933C87.0134 37.3933 86.4955 37.0241 86.4955 36.0566V26.4127L100.519 39.6919L104.849 39.7261V24.4497C104.849 23.4548 105.367 23.113 106.848 23.113H108.29V20.7522H97.2264V23.113H98.9653C100.445 23.113 100.963 23.4542 100.963 24.4497ZM49.5088 30.0219C49.5088 23.7642 55.028 19.8662 63.8451 19.8662C72.316 19.8662 78.0662 23.8495 78.0656 29.7093C78.0656 36.2241 72.7369 40.0356 63.5761 40.0356C54.9514 40.0356 49.5088 36.1674 49.5088 30.0219ZM55.9588 29.8799C55.9588 34.7448 58.7642 37.5614 63.6446 37.5614C68.6465 37.5614 71.493 34.8587 71.493 30.0798C71.493 25.1868 68.6876 22.313 63.8887 22.313C58.8862 22.313 55.9588 25.1296 55.9588 29.8799ZM135.756 36.3948C135.975 36.3076 136.21 36.2649 136.446 36.2694C136.678 36.2694 136.909 36.3152 137.123 36.4042C137.338 36.4932 137.533 36.6237 137.698 36.7882C137.862 36.9527 137.993 37.1479 138.082 37.3628C138.171 37.5777 138.216 37.808 138.216 38.0406C138.217 38.2738 138.172 38.5049 138.084 38.7206C137.995 38.9363 137.865 39.1324 137.7 39.2977C137.536 39.463 137.34 39.5942 137.125 39.6839C136.91 39.7735 136.679 39.8197 136.446 39.82C136.21 39.8244 135.975 39.7817 135.756 39.6945C135.537 39.6073 135.337 39.4772 135.169 39.3119C135 39.1466 134.866 38.9494 134.775 38.7318C134.684 38.5142 134.637 38.2806 134.637 38.0447C134.637 37.8087 134.684 37.5751 134.775 37.3575C134.866 37.1399 135 36.9427 135.169 36.7774C135.337 36.6121 135.537 36.4821 135.756 36.3948ZM135.847 39.4877C136.037 39.5663 136.24 39.6067 136.446 39.6064C136.651 39.6062 136.854 39.5654 137.043 39.4866C137.232 39.4077 137.404 39.2922 137.549 39.1467C137.694 39.0012 137.808 38.8286 137.886 38.6388C137.964 38.449 138.003 38.2457 138.002 38.0406C138.002 37.8362 137.962 37.6337 137.884 37.4448C137.806 37.2559 137.691 37.0842 137.546 36.9396C137.402 36.795 137.23 36.6803 137.041 36.6021C136.853 36.5238 136.65 36.4835 136.446 36.4835C136.241 36.483 136.038 36.5229 135.849 36.601C135.659 36.679 135.487 36.7936 135.342 36.9382C135.197 37.0829 135.082 37.2547 135.003 37.4438C134.925 37.633 134.884 37.8358 134.884 38.0406C134.883 38.2461 134.923 38.4497 135.001 38.6398C135.079 38.8298 135.194 39.0026 135.339 39.1481C135.485 39.2936 135.657 39.409 135.847 39.4877Z"
                          fill="#888888"
                        />
                      )}
                      {index === 3 && (
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M48.0534 11.3984H47.0396C44.1705 11.5706 41.3587 12.5078 39.0443 14.2102C36.6342 15.9317 34.7597 18.3991 33.7842 21.1917C32.7131 24.2521 32.7322 27.6951 33.8799 30.7364C35.104 34.0454 37.5906 36.8572 40.7084 38.5213C43.3097 39.9367 46.3319 40.4914 49.2584 40.2045C52.2805 39.9558 55.2453 38.6934 57.3876 36.5511C60.601 33.529 61.5956 28.7662 60.9071 24.539H47.5369V28.4793C49.6537 28.4921 51.7705 28.4878 53.8873 28.4836C54.9456 28.4814 56.004 28.4793 57.0624 28.4793C56.8329 30.4303 56.1252 32.4387 54.595 33.7585C52.644 35.633 49.8513 36.4555 47.1735 36.3025C44.3044 36.2068 41.5309 34.8296 39.7138 32.63C37.8201 30.3729 36.9977 27.3125 37.3993 24.4051C37.7628 21.4595 39.446 18.7051 41.9326 17.0793C44.2087 15.53 47.1352 15.0135 49.8513 15.5874C51.6876 15.9317 53.3708 16.9072 54.7671 18.1696C55.2806 17.6343 55.8065 17.1115 56.3342 16.5869L56.3343 16.5867C56.7306 16.1929 57.1278 15.798 57.5215 15.3961C55.0349 12.8904 51.5728 11.4749 48.0534 11.3984ZM127.834 12.3931H123.741C123.741 15.4185 123.743 18.444 123.745 21.4688L123.745 21.4992V21.5013V21.5034V21.5056V21.5077C123.749 27.5725 123.754 33.6345 123.741 39.688C124.76 39.7167 125.79 39.7131 126.815 39.7095C127.155 39.7084 127.495 39.7072 127.834 39.7072V12.3931ZM70.0118 21.8611C72.5366 21.3829 75.2718 21.9185 77.3567 23.4295C79.2504 24.7685 80.5701 26.8725 80.9718 29.1678C81.4883 31.8265 80.8379 34.7339 79.1165 36.8379C77.2611 39.1906 74.2198 40.453 71.255 40.2618C68.5389 40.1087 65.8993 38.7507 64.2926 36.5319C62.4755 34.0836 62.0356 30.7171 63.0302 27.848C64.0248 24.7685 66.8366 22.4158 70.0118 21.8611ZM70.5856 25.4953C69.5527 25.7631 68.5963 26.356 67.9077 27.1977C66.0524 29.4165 66.1671 33.0316 68.2138 35.0973C69.3806 36.2832 71.1403 36.8379 72.7661 36.5128C74.2772 36.245 75.597 35.2312 76.3238 33.8923C77.5863 31.6161 77.2228 28.4792 75.291 26.7003C74.0477 25.5527 72.2305 25.0745 70.5856 25.4953ZM98.4926 24.1372C96.3312 22.1097 93.1752 21.3063 90.2869 21.861C87.1691 22.3966 84.4148 24.6728 83.3627 27.6567C82.3107 30.5832 82.7124 34.0261 84.5678 36.5318C86.2127 38.808 88.948 40.1852 91.7215 40.2617C94.6289 40.3956 97.5745 39.1332 99.3916 36.8379C102.395 33.2036 102.012 27.2932 98.4926 24.1372ZM88.1829 27.1785C88.8715 26.356 89.8278 25.763 90.8607 25.4953C92.4866 25.0744 94.3037 25.5335 95.547 26.6812C97.498 28.46 97.8614 31.5969 96.6181 33.8922C95.8913 35.2312 94.5523 36.2258 93.0604 36.5127C91.3772 36.857 89.5601 36.2449 88.3933 35.0016C86.4231 32.9167 86.3466 29.359 88.1829 27.1785ZM107.483 22.9705C109.682 21.5933 112.609 21.2108 114.981 22.3967C115.727 22.7219 116.339 23.2766 116.932 23.8313C116.941 23.573 116.941 23.31 116.941 23.0446C116.941 22.7793 116.941 22.5115 116.951 22.2437C117.591 22.2532 118.232 22.2532 118.875 22.2532H118.876C119.519 22.2532 120.164 22.2532 120.814 22.2628V39.1333C120.795 41.6772 120.145 44.3742 118.309 46.2296C116.3 48.2762 113.221 48.9074 110.447 48.4866C107.483 48.0467 104.9 45.8853 103.753 43.1501C104.465 42.8056 105.2 42.5053 105.939 42.2036L105.939 42.2035C106.39 42.0194 106.842 41.8347 107.291 41.639C107.961 43.2074 109.319 44.5464 111.021 44.8524C112.723 45.1584 114.694 44.7376 115.803 43.3222C116.989 41.8685 116.989 39.8793 116.932 38.1004C116.052 38.9611 115.038 39.7262 113.814 40.0131C111.155 40.7591 108.229 39.841 106.182 38.043C104.116 36.245 102.892 33.4715 103.007 30.7172C103.064 27.5994 104.824 24.5964 107.483 22.9705ZM111.442 25.4188C110.275 25.6101 109.185 26.2605 108.439 27.1595C106.641 29.3017 106.641 32.7256 108.458 34.8296C109.491 36.0729 111.155 36.7615 112.762 36.5893C114.273 36.4363 115.669 35.4799 116.415 34.1601C117.678 31.9222 117.467 28.8809 115.765 26.9299C114.713 25.7249 113.03 25.1319 111.442 25.4188ZM141.53 22.2056C138.584 21.0771 135.045 21.804 132.75 23.9463C129.173 27.2553 128.867 33.4144 132.042 37.0869C133.974 39.4204 137.149 40.5681 140.133 40.2046C142.83 39.956 145.336 38.3875 146.828 36.1496C146.302 35.7957 145.776 35.4466 145.25 35.0975C144.724 34.7485 144.198 34.3994 143.672 34.0456C143.251 34.5812 142.811 35.1359 142.256 35.5567C140.86 36.6661 138.871 36.8765 137.207 36.2835C136.021 35.8818 135.141 34.8872 134.567 33.7969C136.643 32.9361 138.714 32.08 140.784 31.2239C142.855 30.3681 144.925 29.5122 147 28.6516C146.101 25.9164 144.322 23.2577 141.53 22.2056ZM133.898 30.6983C133.879 29.5697 134.146 28.4221 134.797 27.4848C135.81 25.9929 137.704 25.0174 139.521 25.3426C140.65 25.5147 141.759 26.165 142.218 27.2362C139.445 28.403 136.671 29.5506 133.898 30.6983Z"
                          fill="#888888"
                        />
                      )}
                    </svg>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Stack>
        {/* Divider */}
        <Box sx={{ py: 4 }}>
          <Divider
            sx={{
              width: "100%",
              maxWidth: "1352px",
              bgcolor: "#18242E",
              margin: "0 auto",
            }}
          />
        </Box>
        {/* FAQ Section */}
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          sx={{ m: 2 }}
        >
          <Typography level="h1" fontWeight={400} sx={{ color: "#ffffff" }}>
            Frequently asked questions
          </Typography>

          <AccordionGroup
            sx={{
              maxWidth: 800,
              width: "100%",
              "& .MuiAccordion-root": {
                backgroundColor: "transparent",
                boxShadow: "none",
                "&:before": { display: "none" },
              },
              "& .MuiAccordionSummary-root": {
                color: "#fff !important",
                fontSize: "1.1rem", // h1 size
                fontWeight: 500,
                pt: 2.2,
                pr: 1.6,
                pl: 1.6,
                minHeight: "auto",
                "&:hover": {
                  backgroundColor: "transparent !important",
                },
              },
              "& .MuiAccordionDetails-root": {
                pb: 2,
                fontSize: "1rem", // body-md
                fontWeight: 500,
                color: "#8696A1",
                lineHeight: 1.6,
              },
              [`& .${accordionSummaryClasses.indicator}`]: {
                color: "#fff",
                transition: "transform 0.2s",
                "& svg": {
                  fontSize: "1.1rem",
                },
              },
              [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]:
                {
                  transform: "rotate(45deg)",
                },
            }}
          >
            <Accordion>
              <AccordionSummary
                indicator={
                  <TbPlus style={{ color: "#fff", fontSize: "1.2rem" }} />
                }
              >
                How does the AI integration work?
              </AccordionSummary>
              <AccordionDetails>
                Our AI system seamlessly integrates with your existing
                infrastructure, providing real-time analytics and predictive
                insights through a simple API.
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                indicator={
                  <TbPlus style={{ color: "#fff", fontSize: "1.2rem" }} />
                }
              >
                What payment methods do you accept?
              </AccordionSummary>
              <AccordionDetails>
                We accept all major credit cards, bank transfers, and
                cryptocurrency. All transactions are securely processed through
                our PCI-compliant system.
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                indicator={
                  <TbPlus style={{ color: "#fff", fontSize: "1.2rem" }} />
                }
              >
                Can I upgrade my plan later?
              </AccordionSummary>
              <AccordionDetails>
                Yes, you can upgrade or downgrade your plan at any time through
                your account dashboard. Changes take effect immediately with
                prorated billing.
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </Stack>

        {/* Footer Section */}
      </Container>
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
          variant="solid"
          color="primary"
          onClick={scrollToTop}
          sx={{
            borderRadius: "50%",
            boxShadow: "md",
            "&:hover": {
              transform: "translateY(-2px)",
              bgcolor: "primary.600",
            },
          }}
        >
          <TbArrowUp size={24} />
        </IconButton>
      </Box>
    </Box>
  );
}
