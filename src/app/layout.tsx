import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapJS from "@/components/BootstrapJS";
import React from "react";

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
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                🧠 Достижатор 💪
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {/*<li className="nav-item">*/}
                  {/*  <a className="nav-link" href="#">*/}
                  {/*    Link*/}
                  {/*  </a>*/}
                  {/*</li>*/}
                </ul>
              </div>
            </div>
          </nav>

          {children}
        </div>
        <BootstrapJS />
      </body>
    </html>
  );
}
