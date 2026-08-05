import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import logo from '../assets/logo.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { clearAuthSession, getStoredAuth, AUTH_CHANGE_EVENT, type AuthUser } from '../lib/auth';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

const syncAuth = useCallback(() => {
  const session = getStoredAuth();

  console.log("Navbar syncAuth");
  console.log(session);

  setCurrentUser(session?.user ?? null);
}, []);
useEffect(() => {
  console.log("Navbar currentUser =", currentUser);
}, [currentUser]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', syncAuth);
    // Native 'storage' only fires in other tabs — this custom event
    // (dispatched by saveAuthSession/clearAuthSession) catches same-tab
    // login/logout so the navbar updates immediately without a navigation.
    window.addEventListener(AUTH_CHANGE_EVENT, syncAuth);

    syncAuth();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener(AUTH_CHANGE_EVENT, syncAuth);
    };
  }, [location.pathname, syncAuth]);

  const primaryNavLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Loans', path: '/loans' },
    { name: 'EMI Calculator', path: '/emi-calculator' },
    { name: 'Insurance', path: '/insurance' },
    { name: 'Credit Cards', path: '/credit-cards' },
    { name: 'Mutual Funds', path: '/mutual-funds' },
  ];

  const businessNavLinks = [{ name: 'DSA', path: '/dsa' }];
  const supportNavLinks = [{ name: 'Contact Us', path: '/contact' }];

  // Only shown once a user is logged in — kept separate from the static
  // nav groups above since its visibility depends on auth state.
  const accountNavLinks = currentUser ? [{ name: 'My Reports', path: '/my-reports' }] : [];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    clearAuthSession();
    setCurrentUser(null);
    setShowLogoutDialog(false);
    navigate('/', { replace: true });
  };

  const NavLink = ({ link }: { link: { name: string; path: string } }) => {
    const active = isActive(link.path);

    return (
      <Link
        to={link.path}
        className={`px-1.5 py-2 text-sm font-medium transition-colors relative group whitespace-nowrap ${
          active ? 'text-primary' : 'text-foreground hover:text-primary'
        }`}
      >
        {link.name}
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
        {!active && (
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
        )}
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-40 border-b border-border transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md'
            : 'bg-white/95 backdrop-blur-md shadow-sm'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? 'h-16 md:h-18' : 'h-18 md:h-20'
            }`}
          >
            {/* LEFT — LOGO */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  src={logo}
                  sizes="50px"
                  width={150}
                  height={100}
                  alt="Loans Buzz"
                  className={`w-auto object-contain transition-all duration-300 ${
                    isScrolled ? 'h-11 md:h-12' : 'h-12 md:h-14'
                  }`}
                />
              </Link>
            </div>

            {/* CENTER — NAV LINKS (only shown once there's real room, from xl up) */}
            <div className="hidden xl:flex flex-1 items-center justify-center gap-0.5 2xl:gap-2 px-3 min-w-0">
              {primaryNavLinks.map((link) => (
                <NavLink key={link.path} link={link} />
              ))}
              <div className="h-4 w-px bg-border shrink-0 mx-1" />
              {businessNavLinks.map((link) => (
                <NavLink key={link.path} link={link} />
              ))}
              <div className="h-4 w-px bg-border shrink-0 mx-1" />
              {supportNavLinks.map((link) => (
                <NavLink key={link.path} link={link} />
              ))}
              {accountNavLinks.length > 0 && (
                <>
                  <div className="h-4 w-px bg-border shrink-0 mx-1" />
                  {accountNavLinks.map((link) => (
                    <NavLink key={link.path} link={link} />
                  ))}
                </>
              )}
            </div>

            {/* RIGHT — CTAs (also gated to xl so it never fights the links for space) */}
            <div className="hidden xl:flex items-center justify-end gap-2 flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm px-3 shadow-sm hover:shadow-md transition-all whitespace-nowrap"
                >
                  <Link to="/become-partner">Become a Partner</Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="sm"
                  className="bg-primary text-white hover:bg-primary/90 text-sm px-3 shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                >
                  <Link to="/check-cibil">Check CIBIL Score</Link>
                </Button>
              </motion.div>

              {currentUser ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    Hi, {currentUser.name?.split(' ')[0] ?? 'User'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowLogoutDialog(true);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>

            {/* MOBILE / TABLET / SMALL-LAPTOP TOGGLE — shown any time we're below xl */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden ml-auto p-2 rounded-md text-foreground hover:bg-muted"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.button>
          </div>

          {/* SLIDE-DOWN MENU (covers mobile, tablet, and small laptop widths) */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="xl:hidden overflow-hidden border-t border-border bg-white"
              >
                <div className="py-4 flex flex-col space-y-1">
                  {[...primaryNavLinks, ...businessNavLinks, ...supportNavLinks, ...accountNavLinks].map((link, i) => (
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

                    {currentUser ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowLogoutDialog(true);
                          setTimeout(() => setMobileMenuOpen(false), 150);
                        }}
                      >
                        Logout
                      </Button>
                    ) : (
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                          Login
                        </Link>
                      </Button>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* ALERT DIALOG */}
      <AlertDialog
        open={showLogoutDialog}
        onOpenChange={(open) => setShowLogoutDialog(open)}
      >
        <AlertDialogContent className="z-[9999]">
          <AlertDialogHeader>
            <AlertDialogTitle>Log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out of your account. You can log in again anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleLogout}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}