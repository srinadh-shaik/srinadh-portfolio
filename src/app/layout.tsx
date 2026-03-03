import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "Srinadh Shaik | Full Stack Developer",
  description: "Portfolio of Srinadh Shaik, a Competitive Programmer and Full Stack Web Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body 
        suppressHydrationWarning 
        className={`${inter.variable} ${orbitron.variable} font-sans bg-slate-950 text-slate-50 antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}