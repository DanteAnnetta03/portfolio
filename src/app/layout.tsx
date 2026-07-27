import type { Metadata } from "next";
import { Public_Sans, Space_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";
import { getDocControl } from "@/lib/docControl";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  weight: ["400", "500"],
  subsets: ["latin"],
});

// Space Mono only ships 400/700 — never needs the 400/500 jump reserved for
// Public Sans, since mono type is already distinguished by color/tracking/case.
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dante Annetta — Portfolio",
  description:
    "Portfolio de Dante Annetta, estudiante de Ingeniería en Sistemas de Información especializado en seguridad ofensiva y desarrollo de software.",
};

// Applies the persisted theme before hydration to avoid a light/dark flash.
const themeInitScript = `
  try {
    const stored = localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (_) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const docControl = getDocControl();

  return (
    <html
      lang="es"
      className={`${publicSans.variable} ${spaceMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Providers docControl={docControl}>{children}</Providers>
      </body>
    </html>
  );
}
