"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  User,
  LogIn,
  UserPlus,
  LogOut,
  HelpCircle,
  Hotel,
} from "lucide-react";
import { Input } from "./Input";
import Button from "./Button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Hotels", href: "/hotels" },
    { name: "About", href: "/about" },
  ];

  const accountItems = [
    { name: "Profile", icon: User, href: "/profile" },
    { name: "Sign In", icon: LogIn, href: "/signin" },
    { name: "Register", icon: UserPlus, href: "/register" },
    { name: "Help", icon: HelpCircle, href: "/help" },
    { name: "Log Out", icon: LogOut, href: "/logout" },
  ];

  return (
    <nav className="bg-teal-700 shadow-md m-3 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center">
              <Hotel />
              <span className="text-2xl font-medium text-white">
                HotelBooking
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="mx-4 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium  hover:text-gray-200 hover:border-gray-300  hover transition duration-150 ease-in-out text-white "
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <div className="relative mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search hotels..."
                className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ paddingLeft: "2.5rem" }} // Adjust left padding if needed
              />
            </div>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <User className="h-6 w-6 text-white hover:text-black" />
                <span className="sr-only">Open user menu</span>
              </Button>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden"
                >
                  {accountItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
              <div className="relative mt-3 mb-3">
                <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="       Search hotels..."
                  className="w-full pl-10 m pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              {accountItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-900 hover:bg-gray-50"
                >
                  <item.icon
                    className="mr-3 h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
