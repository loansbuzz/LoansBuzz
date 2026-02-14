import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import logo from '../assets/logo.jpg';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger state change when scrolled more than 10px
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryNavLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Loans', path: '/loans' },
    { name: 'EMI Calculator', path: '/emi-calculator' },
<<<<<<< HEAD

=======
>>>>>>> 55ec53b10f30a870b345031071abe76ae7b404bb
    { name: 'Insurance', path: '/insurance' },
    { name: 'Credit Cards', path: '/credit-cards' },
    { name: 'Mutual Funds', path: '/mutual-funds' },
    
  ];

  const businessNavLinks = [{ name: 'DSA', path: '/dsa' }];
  const supportNavLinks = [{ name: 'Contact Us', path: '/contact' }];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    return location.pathname.startsWith(path);
  };

  // Shared Link Component
  const NavLink = ({ link }: { link: { name: string; path: string } }) => {
    const active = isActive(link.path);
    
    return (
      <Link
        to={link.path}
        className={`px-2 py-2 text-base font-medium transition-colors relative group ${
          active ? 'text-primary' : 'text-foreground hover:text-primary'
        }`}
      >
        {link.name}
        {active && (
          <motion.span 
            layoutId="nav-underline"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        {!active && (
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
        )}
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      // --- UPDATED CLASS LOGIC HERE ---
      // If isScrolled is true: Use 'bg-white' (Solid)
      // If isScrolled is false: Use 'bg-white/95' (Glass effect at top) or change to 'bg-white' if you want it solid always.
      className={`sticky top-0 z-50 border-b border-border transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md' // Solid white background when scrolled
          : 'bg-white/95 backdrop-blur-md shadow-sm' // Slight transparency at the top
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-24 md:h-28' : 'h-28 md:h-32'
          }`}
        >
          {/* LEFT — LOGO */}
          <div className="flex items-center flex-shrink-0 w-[260px] md:w-[340px]">
            <Link to="/" className="flex items-center">
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src={logo}
                sizes='50px'
                width={150}
                height={100}
                alt="Loans Buzz"
                className={`w-auto object-contain transition-all duration-300 ${
                    isScrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'
                }`}
              />
            </Link>
          </div>

          {/* CENTER — NAV LINKS */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-6 whitespace-nowrap">
            {primaryNavLinks.map((link) => (
              <NavLink key={link.path} link={link} />
            ))}

            <div className="h-5 w-px bg-border" />

            {businessNavLinks.map((link) => (
              <NavLink key={link.path} link={link} />
            ))}

            <div className="h-5 w-px bg-border" />

            {supportNavLinks.map((link) => (
              <NavLink key={link.path} link={link} />
            ))}
          </div>

          {/* RIGHT — CTAs */}
          <div className="hidden lg:flex items-center justify-end gap-6 w-[260px] md:w-[340px]">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-base px-6 shadow-sm hover:shadow-md transition-all"
              >
                <Link to="/become-partner">Become a Partner</Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-primary text-white hover:bg-primary/90 text-base px-6 shadow-md hover:shadow-lg transition-all"
              >
                <Link to="/check-cibil">Check CIBIL Score</Link>
              </Button>
            </motion.div>
          </div>

          {/* MOBILE TOGGLE */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden ml-auto p-2 rounded-md text-foreground hover:bg-muted"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-border bg-white" // Added bg-white here to ensure mobile menu is solid too
            >
              <div className="py-4 flex flex-col space-y-1">
                {[...primaryNavLinks, ...businessNavLinks, ...supportNavLinks].map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block py-3 px-3 text-base font-medium transition-colors rounded-md ${
                        isActive(link.path)
                          ? 'text-primary bg-primary/5 border-l-4 border-primary pl-2'
                          : 'text-foreground hover:bg-muted'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4 mt-4 border-t border-border space-y-3"
                >
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white text-base py-6"
                  >
                    <Link to="/become-partner" onClick={() => setMobileMenuOpen(false)}>
                      Become a Partner
                    </Link>
                  </Button>

                  <Button
                    asChild
                    className="w-full bg-primary text-white hover:bg-primary/90 text-base py-6 shadow-md"
                  >
                    <Link to="/check-cibil" onClick={() => setMobileMenuOpen(false)}>
                      Check CIBIL Score
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
