import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const productLinks = [
    { name: 'Loans', path: '/loans' },
    { name: 'Insurance', path: '/insurance' },
    { name: 'Credit Cards', path: '/credit-cards' },
    { name: 'Mutual Funds', path: '/mutual-funds' },
    { name: 'Check CIBIL Score', path: '/check-cibil' },
  ];

  const businessLinks = [
    { name: 'Become a Partner', path: '/become-partner' },
    { name: 'DSA', path: '/dsa' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Grievance Redressal', path: '/grievance' },
  ];

  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Column 1 - Brand */}
          <div className="flex flex-col space-y-4">
            <div className="text-2xl font-bold">
              Loans <span className="text-primary">Buzz</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Loans Buzz is a digital marketplace for loans, credit cards, insurance, and investments.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col space-y-3 pt-2">
              <a
                href="tel:1800-XXX-XXXX"
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-primary transition-colors group"
              >
                <Phone size={16} className="flex-shrink-0" />
                <span className="group-hover:underline">+91 90001 03922</span>
              </a>
              <a
                href="mailto:info@loansbuzz.com"
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-primary transition-colors group"
              >
                <Mail size={16} className="flex-shrink-0" />
                <span className="group-hover:underline">loansbuzz3@gmail.com
                </span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Products */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-semibold text-white">Products</h3>
            <div className="flex flex-col space-y-3">
              {productLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 - Business */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-semibold text-white">Business</h3>
            <div className="flex flex-col space-y-3">
              {businessLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4 - Legal & Support */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-semibold text-white">Legal & Support</h3>
            <div className="flex flex-col space-y-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500 text-center">
            © 2026 Loans Buzz. All rights reserved.
          </p>
        </div>
      </div>

      {/* Disclaimer Strip - Separate Bottom Section */}
      <div className="bg-black/30 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            <strong className="text-gray-400">Disclaimer:</strong> Loans Buzz is a loan marketplace. We do not provide loans directly. All loan approvals are subject to lender's terms and conditions. Interest rates and processing fees may vary.
          </p>
        </div>
      </div>
    </footer>
  );
}
