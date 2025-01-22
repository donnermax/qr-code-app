"use client"; // Mark this as a Client Component
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Ensure this is the correct client initialization
import {
  
  HomeIcon,
  UserIcon,
  XMarkIcon,
  Bars3Icon,
  QrCodeIcon,
} from "@heroicons/react/24/solid";
import {
  IoBoatOutline,
  IoCalendar,
  IoMap,
  IoTime,
  IoUmbrella,
} from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton"; // Ensure this component handles sign-out correctly
import SignInButtonNav from "./SignInButtonNav"; // Ensure this component handles sign-in correctly

// Initialize Supabase client
const supabase = createClient(); // Client-side Supabase initialization

const navLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <HomeIcon className="h-5 w-5 text-primary-200" />,
  },
  {
    name: "Your QR Codes",
    href: "/",
    icon: <QrCodeIcon className="h-5 w-5 text-primary-200" />,
  },
  {
    name: "Your Account",
    href: "/",
    icon: <UserIcon className="h-5 w-5 text-primary-200" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Hamburger Menu for Small Screens */}
      {isOpen ? (
        <button
          onClick={toggleSidebar}
          className="fixed z-[999] top-8 right-8 text-white active:border-none rounded-md animation-pulse focus:outline-none"
        >
          <XMarkIcon className="h-14 w-14" />
        </button>
      ) : (
        <button
          onClick={toggleSidebar}
          className="fixed z-[999] top-8 right-8 text-primary-blue active:border-none rounded-md animation-pulse focus:outline-none"
        >
          <Bars3Icon className="h-14 w-14" />
        </button>
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 z-[99] h-full w-64 bg-white transition-transform shadow-xl duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <ul className="flex align-middle justify-center flex-col h-full text-xl text-primary-blue md:mt-0">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`
                 py-5 px-8 hover:bg-primary-blue hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold ${
                   pathname === link.href ? " bg-primary-blue text-white" : ""
                 }`}
                href={link.href}
                onClick={closeSidebar} // Close sidebar when a link is clicked
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}

          <li>
            <SignOutButton closeSidebar={closeSidebar} />{" "}
            {/* Ensure this handles sign-out */}
          </li>
        </ul>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 z-[95] bg-black bg-opacity-50"
          onClick={closeSidebar} // Close sidebar when backdrop is clicked
        />
      )}
    </div>
  );
}

export default SideNavigation;
