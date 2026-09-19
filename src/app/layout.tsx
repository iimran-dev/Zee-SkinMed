import type { Metadata, Viewport } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/skinmed/SmoothScroll";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr Zee's SKINMED | Luxury Dermatology & Cosmetology Clinic in Chennai",
  description:
    "Dr Zee's SKINMED is a premium dermatology and aesthetics clinic in Chennai led by Dr. Zeenath Begum, MBBS, MD. Expert care in acne, laser, pigmentation, hair restoration, anti-aging and skin rejuvenation. Trusted by 10,000+ happy patients.",
  keywords: [
    "Dermatology",
    "Cosmetology",
    "Skin Clinic Chennai",
    "Laser Dermatology",
    "Hair Restoration",
    "Acne Treatment",
    "Pigmentation",
    "Anti-Aging",
    "Skin Rejuvenation",
    "Dr Zee SKINMED",
    "Dr Zeenath Begum",
  ],
  authors: [{ name: "Dr Zee's SKINMED" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Dr Zee's SKINMED | Luxury Dermatology Clinic in Chennai",
    description:
      "Expert care. Advanced technology. Visible results. Welcome to a more confident you.",
    siteName: "Dr Zee's SKINMED",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr Zee's SKINMED | Luxury Dermatology Clinic in Chennai",
    description:
      "Expert care. Advanced technology. Visible results. Welcome to a more confident you.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F4EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${googleSans.variable} antialiased bg-skinmed-ivory text-skinmed-charcoal font-sans`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Toaster />
      </body>
    </html>
  );
}
