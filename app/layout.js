// import Logo from "@/app/_components/Logo";

import { Exo } from "next/font/google";
const exo = Exo({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";

import SideNavigation from "./_components/SideNavigation";
import Header from "./_components/Header";
// import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: {
    template: "%s | The qr co",
    default: "The qr co",
  },
  description:
    "The QR co is your one stop shop for all your qr code needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${exo.className} antialiased min-h-screen text-primary-950 bg-white flex flex-col relative`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
