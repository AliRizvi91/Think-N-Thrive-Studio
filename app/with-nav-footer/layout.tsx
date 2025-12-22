"use client"; // MUST for hooks

import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";

interface WithNavFooterLayoutProps {
  children: React.ReactNode;
}

  export default function WithNavFooterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

