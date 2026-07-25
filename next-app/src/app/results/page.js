import ResultsPage from "../../pages_old/ResultsPage";

export const metadata = {
  title: "Verified Results | AURUM EA MyFXBook Performance",
  description:
    "See AURUM Gold EA Tradewize live MyFXBook results: +107.67% verified gain, $530k+ profit, 5.48% monthly return, 16.95% drawdown, and monthly analytics for 2025–2026.",
  openGraph: {
    title: "AURUM EA Verified MyFXBook Results",
    description:
      "Independent MyFXBook tracking for AURUM Gold EA — growth, profit, advanced stats, and monthly gains from the live Tradewize account.",
    url: "https://aurum-goldea.com/results",
    type: "website",
    images: [
      {
        url: "/images/myfxbook-growth-chart.png",
        width: 1604,
        height: 800,
        alt: "MyFXBook growth chart for AURUM Gold EA showing over 100% equity growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AURUM EA Verified MyFXBook Results",
    description:
      "Live MyFXBook results for AURUM Gold EA: +107.67% gain, $530k+ profit, and transparent monthly performance.",
    images: ["/images/myfxbook-growth-chart.png"],
  },
};

export default function Page() {
  return <ResultsPage />;
}
