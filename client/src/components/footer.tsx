import { Link } from "wouter";
import { footerColumns, footerBottomLinks } from "@/lib/data";
import { Twitter, Facebook, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white pt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h4 className="text-sm font-bold mb-4 uppercase">{column.title}</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.link}>
                      <a className="hover:text-white transition-colors">{link.text}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Social Media Links */}
        <div className="flex space-x-6 mb-10">
          <a href="#" className="text-white hover:text-gray-400 transition-colors">
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-white hover:text-gray-400 transition-colors">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-white hover:text-gray-400 transition-colors">
            <Youtube className="h-6 w-6" />
          </a>
          <a href="#" className="text-white hover:text-gray-400 transition-colors">
            <Instagram className="h-6 w-6" />
          </a>
        </div>
        
        {/* Bottom Links */}
        <div className="border-t border-gray-700 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 text-xs text-gray-400 mb-4 md:mb-0">
            {footerBottomLinks.map((link, index) => (
              <Link key={index} href={link.link}>
                <a className="hover:text-white transition-colors">{link.text}</a>
              </Link>
            ))}
            <p>© 2023 Nike, Inc. All Rights Reserved</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Created by rishiicreates</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
