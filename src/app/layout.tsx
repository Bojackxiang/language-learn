import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ExitModal from '@/components/modal/exit-modal';

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ExitModal />
        <body className={nunito.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
