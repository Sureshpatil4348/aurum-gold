import "./globals.css";
import ClientLayout from "../components/ClientLayout";

export const metadata = {
  title: "AURUM EA - Professional Trading System",
  description: "Automated execution for disciplined traders.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
