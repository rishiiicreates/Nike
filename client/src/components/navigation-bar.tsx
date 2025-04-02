import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Search, Heart, ShoppingBag, X } from "lucide-react";
import NikeLogo from "./ui/nike-logo";
import { mainNavItems } from "@/lib/data";
import { cn } from "@/lib/utils";

const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#f5f5f5] py-2 text-xs text-center hidden md:block">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex space-x-4">
            <a href="#" className="text-[#111] hover:opacity-70">Find a Store</a>
            <span>|</span>
            <a href="#" className="text-[#111] hover:opacity-70">Help</a>
            <span>|</span>
            <a href="#" className="text-[#111] hover:opacity-70">Join Us</a>
            <span>|</span>
            <a href="#" className="text-[#111] hover:opacity-70">Sign In</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white py-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="w-16">
              <Link href="/">
                <a>
                  <NikeLogo />
                </a>
              </Link>
            </div>

            {/* Center Links - Desktop */}
            <div className="hidden md:flex space-x-10 text-base">
              {mainNavItems.map((item, index) => (
                <div className="dropdown relative group" key={index}>
                  <Link href={item.link}>
                    <a className="nav-link pb-2 font-medium group-hover:text-[#111] group-hover:border-b-2 group-hover:border-[#111]">
                      {item.title}
                    </a>
                  </Link>
                  <div className="dropdown-content hidden group-hover:block absolute bg-white w-full left-0 shadow-md z-50 p-5">
                    <div className="grid grid-cols-4 gap-6 container mx-auto">
                      {item.columns.map((column, colIndex) => (
                        <div key={colIndex}>
                          <h3 className="font-bold mb-4">{column.title}</h3>
                          <ul className="space-y-2">
                            {column.links.map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <Link href={link.link}>
                                  <a className="hover:text-[#757575]">{link.text}</a>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
              {/* Search */}
              <div className="relative hidden md:block">
                <form onSubmit={handleSearch} className="flex items-center bg-[#f5f5f5] rounded-full px-4 py-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent border-none outline-none ml-2 w-full text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>

              {/* Icons */}
              <div className="flex items-center space-x-4">
                <a href="#" className="text-[#111] hover:opacity-70">
                  <Heart className="h-6 w-6" />
                </a>
                <a href="#" className="text-[#111] hover:opacity-70">
                  <ShoppingBag className="h-6 w-6" />
                </a>
                <button
                  onClick={toggleMobileMenu}
                  className="md:hidden text-[#111] hover:opacity-70"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-50 md:hidden transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-6">
            <Link href="/">
              <a>
                <NikeLogo />
              </a>
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-[#111] hover:opacity-70"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex items-center bg-[#f5f5f5] rounded-full px-4 py-2">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none outline-none ml-2 w-full text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <div className="space-y-4">
            {mainNavItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <Link href={item.link}>
                  <a className="block text-xl font-medium mb-2">{item.title}</a>
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  {item.columns.slice(0, 2).map((column, colIndex) => (
                    <div key={colIndex}>
                      <h3 className="font-bold text-sm mb-2">{column.title}</h3>
                      <ul className="space-y-1">
                        {column.links.slice(0, 3).map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <Link href={link.link}>
                              <a className="text-sm text-gray-600">{link.text}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <a href="#" className="block text-[#111] font-medium">Sign In</a>
            <a href="#" className="block text-[#111] font-medium">Join Us</a>
            <a href="#" className="block text-[#111] font-medium">Find a Store</a>
            <a href="#" className="block text-[#111] font-medium">Help</a>
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-[#f5f5f5] py-3 text-center text-sm">
        <div className="container mx-auto">
          <p className="font-medium">Free Shipping & Returns | Nike Members get free shipping and free 60-day returns. <a href="#" className="underline">Join Now</a> <a href="#" className="underline">Learn More</a></p>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
