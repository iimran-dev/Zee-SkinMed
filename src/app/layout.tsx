import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={`${playfair.variable} ${poppins.variable} antialiased bg-skinmed-ivory text-skinmed-charcoal font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
