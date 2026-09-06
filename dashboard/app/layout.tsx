import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "../components/app-shell";

export const metadata: Metadata = {
  title: { default: "MarketingOps AI Engineering", template: "%s | MarketingOps AI Engineering" },
  description: "A 36-week local-first bootcamp for safe security automation engineering.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><AppShell>{children}</AppShell></body>
    </html>
  );
}
