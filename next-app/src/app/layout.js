import "./globals.css";
import ClientLayout from "../components/ClientLayout";

export const metadata = {
  metadataBase: new URL("https://aurum-goldea.com"),
  title: "AURUM EA - Professional Gold Trading System | MyFXBook Verified",
  description:
    "AURUM Gold EA automates disciplined XAUUSD execution. Verified on MyFXBook with +107.67% gain and $530k+ tracked profit. MetaTrader 5 compatible.",
  openGraph: {
    title: "AURUM EA - MyFXBook Verified Gold Trading System",
    description:
      "Live MyFXBook-verified AURUM Gold EA performance: +107.67% gain, 5.48% monthly return, and transparent broker-synced results.",
    url: "https://aurum-goldea.com",
    siteName: "AURUM EA",
    type: "website",
    images: [
      {
        url: "/images/myfxbook-stats-profit-overview.png",
        width: 2184,
        height: 840,
        alt: "MyFXBook verified AURUM Gold EA Tradewize stats showing +107.67% gain and $530,678 profit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AURUM EA - MyFXBook Verified Gold Trading System",
    description:
      "Live MyFXBook-verified AURUM Gold EA performance: +107.67% gain and $530k+ tracked profit.",
    images: ["/images/myfxbook-stats-profit-overview.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
