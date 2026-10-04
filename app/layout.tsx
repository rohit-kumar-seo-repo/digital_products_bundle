import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalproductsbundle.in"),
  title: {
    default: "Digital Products Bundle — Premium Digital Products",
    template: "%s | Digital Products Bundle",
  },
  description: "Discover premium digital products, templates, tools and bundles built to save time and help you work smarter.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}