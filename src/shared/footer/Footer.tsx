import { Link } from "react-router-dom";
import Logo from "../../components/logo";

const footerLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/features", label: "Features" },
  { path: "/contact", label: "Contact" },
  { path: "/faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-lg font-semibold">MyCompany</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Reliable ride-sharing platform built for Riders, Drivers, and
              Admins with safety and performance in mind.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Extra */}
          <div>
            <h3 className="text-base font-semibold mb-3">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@mycompany.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  support@mycompany.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MyCompany. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
