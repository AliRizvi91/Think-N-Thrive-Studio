"use client"; // MUST for hooks

import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import MainLoading from "@/components/pocket/MainLoading";
import { useAppSelector } from "@/components/reduxComponents/ReduxHook";
import { AnimatePresence } from "framer-motion";

interface WithNavFooterLayoutProps {
  children: React.ReactNode;
}

  export default function WithNavFooterLayout({ children }: { children: React.ReactNode }) {
  const { appLoaded } = useAppSelector((state) => state.StoreOfUser);
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

