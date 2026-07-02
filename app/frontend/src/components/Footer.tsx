import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Cross } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://mgx-backend-cdn.metadl.com/generate/images/1391967/2026-07-02/rvyrlyacaipq/lion-logo-brand.png"
                alt="Lolashi Logo"
                className="h-10 w-10 object-contain brightness-200"
              />
              <span className="font-serif text-xl font-bold text-white">
                Lolashi
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Spreading the everlasting gospel of the Lord Jesus Christ through
              the written word.
            </p>
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <Cross size={12} />
              <span>Soli Deo Gloria</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { path: "/", label: "Home" },
                { path: "/book", label: "The Book" },
                { path: "/about", label: "About Author" },
                { path: "/order", label: "Order Now" },
                { path: "/track-order", label: "Track Order" },
                { path: "/contact", label: "Contact" },
                { path: "/terms", label: "Terms & Conditions" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">
              Connect
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:samtiliindje@gmail.com"
                className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-sm"
              >
                <Mail size={16} />
                samtiliindje@gmail.com
              </a>
              <a
                href="https://facebook.com/sam.tiliindje"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-sm"
              >
                <Facebook size={16} />
                Sam Tiliindje
              </a>
              <a
                href="https://instagram.com/babylonhavefallen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-sm"
              >
                <Instagram size={16} />
                @babylonhavefallen
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Sam Tiliindje. All rights reserved.
          </p>
          <Link
            to="/terms"
            className="text-white/50 hover:text-primary transition-colors text-sm"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}