// import Logo from "@/app/_components/Logo";

import { Exo } from "next/font/google";
const exo = Exo({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";

import Header from "../_components/Header";
import SideNavigation from "../_components/SideNavigation";
// import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: {
    template: "%s | The qr co",
    default: "The qr co",
  },
  description:
    "Create and manage dynamic qr codes easily",
};

export default function RootLayout({ children }) {
  return (
    <>
      <SideNavigation />

      <div className="flex-1 px-2">
        <main className="max-w-7xl md:max-w-2xl lg:min-w-[100%] mx-auto w-full">
          {children}
        </main>
      </div>
    </>
  );
}
