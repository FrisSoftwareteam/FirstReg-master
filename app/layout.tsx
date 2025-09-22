import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/ReduxProvider";

export const metadata: Metadata = {
  title: "Project T",
  description: "Next.js + RTK + RTK Query + Persist + Tailwind + shadcn/ui + Zod",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
