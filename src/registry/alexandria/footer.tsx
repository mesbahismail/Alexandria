"use client";

import { Box, Button, Divider, Link, Stack, Typography } from "@mui/joy";
import { TbMail } from "react-icons/tb";
import NextLink from "next/link";
import styles from "./resume.module.css";
import { EditorialReveal, LongArrow } from "./content";

export default function Footer({ registryHref = "https://github.com/mesbahismail/Alexandria", compact = false }: { registryHref?: string; compact?: boolean }) {
  return <Box component="footer" id="contact" className={styles.footer} sx={{ pt: compact ? 0 : 6, pb: 3 }}>
    <EditorialReveal>
    {!compact && <>
    <Divider sx={{ bgcolor: "#333333", mb: 5 }} />
    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={3} sx={{ pb: 5 }}>
      <Stack gap={1.5}>
        <Typography level="h3" fontWeight={400} sx={{ color: "#ffffff" }}>Let’s work <span className={styles.headlineAccent}>together.</span></Typography>
        <Box sx={{ width: "48px", height: "4px", bgcolor: "#E1B77B" }} />
        <Typography sx={{ color: "#aaa", maxWidth: 480 }}>Have a site, a brief, or a space in mind? Let’s start a conversation.</Typography>
      </Stack>
      <Button component={NextLink} href="/contact" startDecorator={<TbMail size={20} />} sx={{ backgroundColor: "transparent", border: "2px solid #E1B77B", color: "#fff", borderRadius: 0, minHeight: 48, px: 2, "&:hover": { bgcolor: "#E1B77B", color: "#111" } }}>GET IN TOUCH</Button>
    </Stack>
    </>}
    <Divider sx={{ bgcolor: "#333333" }} />
    <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} gap={2} sx={{ py: 3 }}>
      <Typography level="title-lg" sx={{ color: "#fff" }}>ALEXANDRIA</Typography>
      <Typography level="body-sm" sx={{ color: "#aaa" }}>© {new Date().getFullYear()} Alexandria Klaus. All rights reserved.</Typography>
      <Stack direction="row" gap={3}>
        <Link href={registryHref} underline="none" sx={{ color: "#aaa", fontSize: 13, "&:hover": { color: "#E1B77B" } }}>Component registry</Link>
        <Link href="#top" underline="none" endDecorator={<LongArrow compact direction="up" />} sx={{ color: "#aaa", fontSize: 13, "&:hover": { color: "#E1B77B" } }}>Back to top</Link>
      </Stack>
    </Stack>
    <Typography level="body-xs" sx={{ color: "#888" }}>Designed with care by Ismail Mesbah · Photography via Unsplash</Typography>
    </EditorialReveal>
  </Box>;
}
