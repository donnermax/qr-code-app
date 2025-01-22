import { Exo } from "next/font/google";
const exo = Exo({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body
          className={`${exo.className} antialiased min-h-screen text-primary-950 bg-white flex flex-col relative`}
        >
          {children}
        </body>
      </html>
    );
  }