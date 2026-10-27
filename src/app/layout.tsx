import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title: "Alexandria Klaus — Product Designer",
 description: "A considered approach to digital design. Explore Alexandria Klaus’s services, selected case studies, and design approach.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en"><body>{children}</body></html>;
}
