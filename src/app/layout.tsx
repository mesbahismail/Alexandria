import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "Alexandria Klaus — Senior Architect",
 description: "Architecture shaped by context, light, and proportion. Explore senior architect Alexandria Klaus’s architectural design, interiors, and selected concept studies.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en"><body>{children}</body></html>;
}
