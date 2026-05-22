import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rose — Computer Scientist & Full Stack Developer",
  description:
    "Personal portfolio of Rose, a Computer Scientist and Full Stack Developer specialising in modern web applications, systems design, and immersive digital experiences.",
  keywords: [
    "portfolio",
    "developer",
    "full stack",
    "computer scientist",
    "Next.js",
    "React",
  ],
  openGraph: {
    title: "Rose — Computer Scientist & Full Stack Developer",
    description:
      "Personal portfolio showcasing projects, skills, and experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0a] text-white antialiased">
        {/*
         * React 19 supports <link rel="stylesheet"> directly in JSX.
         * This avoids next/font/google injecting @import url() into the CSS
         * output, which breaks Tailwind v4's PostCSS pipeline.
         * See: https://react.dev/reference/react-dom/components/link
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=JetBrains+Mono:wght@400;500&display=swap"
          // React 19 hoists this to <head> and handles de-duplication
        />
        {children}
      </body>
    </html>
  );
}
