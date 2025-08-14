"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const isSignedIn = !!session;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex items-center justify-between h-[12vh]">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={60}
              height={50}
              className="p-2 h-[100%] relative left-1"
            />
            <span className="text-xl font-medium text-black hidden sm:block">
              HallGrid
            </span>
          </Link>

          <nav className="hidden md:flex space-x-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md transition-colors duration-200 uppercase text-sm"
              >
                {item.name}
              </Link>
            ))}

            {isSignedIn ? (
              <button
                className="md:flex hidden text-gray-700 text-sm hover:text-blue-500 focus:outline-none uppercase px-3 py-2"
                onClick={() => signOut()}
              >
                SIGN OUT
              </button>
            ) : (
              <Link href={"/sign-in"} className="flex items-center gap-2">
                <span className="md:flex hidden text-gray-700 text-sm hover:text-blue-500 focus:outline-none uppercase px-3 py-2">
                  SIGN IN
                </span>
              </Link>
            )}
          </nav>

          <button
            className="md:hidden text-gray-700 hover:text-blue-500 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center bg-white py-4 space-y-3 shadow-md">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md transition-colors duration-200 "
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {isSignedIn ? (
              <button
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md transition-colors duration-200"
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
              >
                Sign Out
              </button>
            ) : (
              <Link
                href={"/sign-in"}
                className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
