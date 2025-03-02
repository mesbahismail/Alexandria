"use client";

import * as React from "react";
import { Stack, Button, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import Link from "@mui/joy/Link";

export default function Footer() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const router = useRouter(); // Use the router inside the component

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path); // Correctly using router.push()
  };

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"center"}
        spacing={2}
        sx={{ p: 2 }}
      >
        <Typography level="h1" sx={{ color: "#ffffff", mt: 2 }}>
          Geneva
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{ mb: 1, p: 1 }}
      >
        <Link
          href="/about"
          underline="none"
          sx={{
            color: "#8696A1",
            fontWeight: 500,
            "&:hover": {
              color: "#fff",
            },
          }}
        >
          About us
        </Link>
        <Link
          href="/contact"
          underline="none"
          sx={{
            color: "#8696A1",
            fontWeight: 500,
            "&:hover": {
              color: "#fff",
            },
          }}
        >
          Contact us
        </Link>
        <Link
          href="/terms"
          underline="none"
          sx={{
            color: "#8696A1",
            fontWeight: 500,
            "&:hover": {
              color: "#fff",
            },
          }}
        >
          Terms of use
        </Link>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2, p: 2 }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.629 12L16 7.82713V12H11.629ZM8.0179 11.8848L8.01735 11.8843L8.0168 11.8848V11.8837L0.035456 4.15701V0L8.01735 7.72728L15.9992 0V4.15701L8.0179 11.8837V11.8848ZM0 11.9661V7.81399L4.35425 11.9661H0Z"
              fill="white"
            />
          </svg>

          <Typography
            level="body-sm"
            fontWeight={500}
            sx={{ color: "#ffffff", mt: 2 }}
          >
            Designed with care by Ismail Mesbah
          </Typography>
        </Stack>

        <Typography
          level="body-sm"
          fontWeight={500}
          sx={{ color: "#ffffff", mt: 2 }}
        >
          © 2025 Geneva. All right reserved
        </Typography>
      </Stack>
    </Stack>
  );
}
