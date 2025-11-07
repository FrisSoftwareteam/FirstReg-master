import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/ReduxProvider";
import { Ubuntu, Poppins } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Project T",
  description: "Project T",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ubuntu.variable} ${poppins.variable}`}
    >
      <body className="font-sans antialiased">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
