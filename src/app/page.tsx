"use client";

import * as React from "react";
import {
  Box,
  Container,
  Stack,
  Link,
  Card,
  Typography,
  Divider,
  CardContent,
  Grid,
  IconButton,
  Button,
} from "@mui/joy";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  TbArrowUp,
  TbBrandBluesky,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandX,
  TbChevronRight,
  TbDownload,
  TbMail,
  TbPaperclip,
} from "react-icons/tb";

export default function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Refs for section scrolling
  const benefitsRef = useRef<HTMLDivElement>(null);
  const integrationsRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({
      x: (clientX / window.innerWidth - 0.5) * 10,
      y: (clientY / window.innerHeight - 0.5) * 10,
    });
  };

  const layers = [
    { id: 3, bg: "transparent", border: "solid 4px #E1B77B", content: null },
    {
      id: 2,
      bg: "transparent",
      content: (
        <Image
          src="/hero-image.png"
          alt="Cover"
          fill
          priority
          quality={90}
          style={{ objectFit: "cover", borderRadius: "var(--joy-radius-sm)" }}
          sizes="520px"
        />
      ),
    },
    { id: 1, bg: "#444444", content: null },
  ];

  // Scroll handlers
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const offset = 72;
      const elementTop = ref.current.offsetTop - offset;
      window.scrollTo({ top: elementTop, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <Box sx={{ bgcolor: "#151516", minHeight: "100vh" }}>
      {/* Cover light */}
      <Box
        sx={{
          position: "absolute",
          width: "1000px",
          height: "600px",
          borderRadius: "50%",
          backgroundColor: "#242426",
          filter: "blur(500px)",
          zIndex: 0,
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <Container
        disableGutters
        sx={{ maxWidth: "1384px", position: "relative" }}
      >
        {/* Header */}
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
          <Typography level="h3" sx={{ color: "#ffffff", mt: 2 }}>
            ALEXANDRIA
          </Typography>

          <Stack
            direction="row"
            spacing={6}
            sx={{ alignItems: "center", pl: 4, pr: 4 }}
          >
            <Link
              component="button"
              level="body-sm"
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
              level="body-sm"
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
              level="body-sm"
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
              level="body-sm"
              underline="none"
              sx={{
                color: "#8696A1",
                fontWeight: 500,
                "&:hover": { color: "#fff" },
              }}
            >
              EXPERIENCE
            </Link>
          </Stack>

          <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
            <Typography
              level="body-sm"
              sx={{ color: "#8696A1", fontWeight: 500, mt: 2 }}
            >
              FOLLOW ME
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton>
                <TbBrandX size={24} />
              </IconButton>
              <IconButton>
                <TbBrandInstagram size={24} />
              </IconButton>
              <IconButton>
                <TbBrandLinkedin size={24} />
              </IconButton>
            </Stack>
          </Stack>

          <Button
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
            onClick={() => router.push("/sign")}
          >
            GET IN TOUCH
          </Button>
        </Stack>

        {/* Hero Section */}
        <Stack
          direction="row"
          spacing={8}
          sx={{ alignItems: "center", pt: 2, pr: 4 }}
        >
          <Stack
            direction="column"
            width={634}
            spacing={2}
            sx={{ mb: 2, mt: 4 }}
          >
            <Stack direction="column" spacing={0.5} sx={{ pb: 3 }}>
              <Typography level="h1" fontWeight="400" sx={{ color: "#ffffff" }}>
                ALEXANDRIA KLAUS
              </Typography>
              <Typography level="h4" fontWeight="400" sx={{ color: "#AAAAAA" }}>
                Product Designer
              </Typography>
            </Stack>

            <Box
              sx={{ width: "48px", height: "4px", backgroundColor: "#E1B77B" }}
            />

            <Typography level="body-md" sx={{ color: "#ffffff", pt: 3 }}>
              Ut vestibulum eu sem et laoreet. Fusce dui felis, consectetur ac
              mi quis, blandit viverra libero. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed id fermentum lectus, at sagittis
              velit. Quisque pharetra lacus vel enim porta malesuada.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ pt: 4 }}>
              <Button
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
                onClick={() => router.push("/sign")}
              >
                GET IN TOUCH
              </Button>
              <Button
                startDecorator={<TbDownload size={20} />}
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
                onClick={() => router.push("/sign")}
              >
                DOWNLOAD CV
              </Button>
            </Stack>
          </Stack>

          <Box
            sx={{ position: "relative", width: "600px", height: "600px" }}
            onMouseMove={handleMouseMove}
          >
            {layers.map((layer, index) => (
              <motion.div
                key={layer.id}
                style={{
                  position: "absolute",
                  top: `${index * 20}px`,
                  left: `${index * 20}px`,
                  width: "520px",
                  height: "520px",
                  border: index === 0 ? "2px solid #E1B77B" : "none",
                  borderRadius: "0px",
                  overflow: "hidden",
                  backgroundColor: layer.bg,
                  zIndex: layer.id,
                }}
                animate={{
                  x: mousePos.x * (layers.length - index) * 2,
                  y: mousePos.y * (layers.length - index) * 2,
                }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              >
                {layer.content}
              </motion.div>
            ))}
          </Box>
        </Stack>

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

        {/* Services Section */}
        <Box ref={benefitsRef} sx={{ py: 4 }}>
          <Stack
            direction="column"
            alignItems="center"
            spacing={2}
            sx={{ p: 2 }}
          >
            <Typography level="h1" fontWeight={400} sx={{ color: "#ffffff" }}>
              MY SERVICES
            </Typography>
            <Typography level="h4" fontWeight={400} sx={{ color: "#aaa" }}>
              Get to know more about me
            </Typography>
            <Box
              sx={{ width: "48px", height: "4px", backgroundColor: "#E1B77B" }}
            />
          </Stack>
          <Grid
            container
            spacing={3}
            sx={{
              maxWidth: "1352px",
              margin: "0 auto",
            }}
          >
            {[1, 2, 3].map((id) => (
              <Grid key={id} xs={12} sm={6} md={4}>
                <Stack direction="column" alignItems="center">
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "260px",
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
                      style={{ objectFit: "cover" }}
                      sizes="760px"
                    />
                  </Box>
                  <Card
                    variant="solid"
                    sx={{
                      width: "100%",
                      bgcolor: "transparent",
                      border: "2px solid #333333",
                      borderRadius: "0px",
                      p: 4,
                    }}
                  >
                    <CardContent>
                      <Typography level="title-lg" textColor="#ffffff">
                        Integrate today
                      </Typography>
                      <Typography textColor="#aaa">
                        A simple, elegant interface so you can start sending
                        emails in minutes. It fits right into your code with
                        SDKs for your favorite programming.
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

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
      </Container>
    </Box>
  );
}
