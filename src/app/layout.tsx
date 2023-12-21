import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapJS from "@/components/BootstrapJS";
import React from "react";
import { AuthProviders } from "@/components/AuthProviders";
import { Layout } from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Достижатор",
  description: "Сервис управления достижениями",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviders>
          <Layout>{children}</Layout>
        </AuthProviders>
        <BootstrapJS />
      </body>
    </html>
  );
}
