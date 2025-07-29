"use client";

import { useState } from "react";
import Link from "next/link";
import { LuCircleUser, LuMenu, LuX } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/all-products" },
    { name: "About Us", href: "/" },
    { name: "Contact", href: "/" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white px-4 md:px-8 lg:px-16 py-3 text-gray-700">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          LOGO
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              href="/"
              className="text-lg text-gray-500 hover:text-black transition"
            >
              {link.name}
            </Link>
          ))}

          
          <button className="border px-4 py-1.5 rounded-full text-sm hover:bg-gray-100">
            Seller Dashboard
          </button>
        </div>

        {/* Right Section - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <IoSearch className="text-xl cursor-pointer" />
          <button className="flex items-center gap-2 text-sm hover:text-black transition">
            <LuCircleUser className="text-xl" />
            Account
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <LuX /> : <LuMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 flex flex-col gap-4">
          
          {navLinks.map((link) => (
              <Link
              href="/"
              className="text-lg text-gray-500 hover:text-black transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button className="border px-4 py-1.5 rounded-full text-sm hover:bg-gray-100 w-fit">
            Seller Dashboard
          </button>
          <button className="flex items-center gap-2 text-sm mt-2 hover:text-black transition">
            <LuCircleUser className="text-xl" />
            Account
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
