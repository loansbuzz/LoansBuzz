import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import InfoModal from './model';
import { 
  Home as HomeIcon, 
  User, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  Car, 
  Sparkles, 
  CreditCard,
  Heart,
  Shield,
  TrendingUp,
  Users,
  Award,
  Zap,
  Gift,
  Target,
  BookOpen,
  Clock,
  MapPin,
  IndianRupee,
  ArrowRight
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from "react";
import VerticalInfoTicker from './VerticalInfoTicker';

// --- Animation Variants (Fully Typed) ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -5,
    transition: { type: "spring", stiffness: 400, damping: 25 } 
  }
};

const floatImage: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function Home() {
  const loanProducts = [
    { name: 'Home Loan', icon: HomeIcon, path: '/loans/home' },
    { name: 'Personal Loan', icon: User, path: '/loans/personal' },
    { name: 'Business Loan', icon: Briefcase, path: '/loans/business' },
    { name: 'Loan Against Property', icon: Building2, path: '/loans/lap' },
    { name: 'Education Loan', icon: GraduationCap, path: '/loans/education' },
    { name: 'Car Loan', icon: Car, path: '/loans/car' },
    { name: 'Gold Loan', icon: Sparkles, path: '/loans/gold' },
    { name: 'Credit Cards', icon: CreditCard, path: '/credit-cards' },
  ];

  const insuranceProducts = [
    { name: 'Life Insurance', icon: Heart, description: 'Starting from ₹450/month*' },
    { name: 'Health Insurance', icon: Shield, description: 'Starting from ₹450/month*' },
    { name: 'General Insurance', icon: Building2, description: 'Starting from ₹450/month*' },
  ];

  const trustMetrics = [
    { value: '25+ Years', label: 'Industry Experience', icon: Clock },
    { value: '275+ Partners', label: 'Banks & NBFCs', icon: Users },
    { value: '4,000+ Cities', label: 'Pan-India Reach', icon: MapPin },
    { value: '₹1.4 Lakh Cr+', label: 'Loans Disbursed', icon: IndianRupee },
  ];

  const dsaBenefits = [
    { title: 'Be Your Own Boss', icon: Target },
    { title: 'Multiple Products', icon: Briefcase },
    { title: 'High Commissions', icon: TrendingUp },
    { title: 'Training & Support', icon: BookOpen },
    { title: 'Easy Onboarding', icon: Zap },
    { title: 'Refer & Earn', icon: Gift },
  ];

  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("loanbuzz-info-accepted");
    if (!accepted) {
      setShowInfo(true);
    }
  }, []);

  return (
    <>
      
      <InfoModal 
        showInfo={showInfo} 
        setShowInfo={setShowInfo} 
      />
      {/* <VerticalInfoTicker/> */}
    

    <div className="min-h-screen overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-white to-secondary/5 py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Abstract Background Shape */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6 md:space-y-8"
            >
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900">
                Smart Loans. <br className="hidden lg:block"/>
                <span className="text-primary">Trusted Partners.</span> <br className="hidden lg:block"/>
                Faster Approvals.
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Compare loans, insurance, credit cards, and investments from India's leading financial institutions — all in one place.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                  <Link to="/check-cibil">Check CIBIL Score</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white text-lg px-8 py-6 transition-all duration-300">
                  <Link to="/loans">Explore Loans</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-64 md:h-96 lg:h-[500px]"
            >
              <motion.div variants={floatImage} animate="animate" className="w-full h-full">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1719464521902-4dc9595b182d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBncm93dGglMjBkaWdpdGFsfGVufDF8fHx8MTc2Nzk3NjMwOXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Financial Growth"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl ring-1 ring-black/5"
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-12 md:py-16 bg-white border-y border-border relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {trustMetrics.map((metric, index) => (
              <motion.div variants={fadeInUp} key={index}>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow border-none shadow-sm bg-slate-50/50">
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                    <metric.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{metric.label}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Offer - Loans */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Financial Solutions Tailored for You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from a wide range of loan products designed to meet your unique needs
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {loanProducts.map((product, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div 
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="p-6 cursor-pointer group h-full border-slate-100 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all">
                    <Link to={product.path} className="block h-full">
                      <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <product.icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold mb-3 text-lg">{product.name}</h3>
                      <div className="flex items-center text-primary text-sm font-medium">
                        Check Eligibility 
                        <motion.span 
                          className="ml-1 inline-block"
                          transition={{ type: "spring", stiffness: 400 }}
                          variants={{
                            hover: { x: 5 }
                          }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Insurance Solutions */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Protect What Matters Most
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive insurance solutions for you and your family
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {insuranceProducts.map((product, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="p-8 text-center h-full flex flex-col items-center border-slate-200/60 shadow-md hover:shadow-xl transition-shadow bg-white">
                    <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                      <product.icon className="w-8 h-8 text-secondary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground mb-6 flex-grow">{product.description}</p>
                    <Button asChild variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors">
                      <Link to="/insurance">Learn More</Link>
                    </Button>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DSA & Partner Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-white to-secondary/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative h-64 md:h-96 lg:h-[400px] order-2 lg:order-1"
            >
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1758599543152-a73184816eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHBhcnRuZXJzaGlwfGVufDF8fHx8MTc2Nzg3OTg3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Partnership"
                className="w-full h-full object-cover rounded-2xl shadow-xl rotate-1 hover:rotate-0 transition-transform duration-700"
              />
            </motion.div>

            <div className="space-y-8 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                  Earn With Loans Buzz
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join our network of successful partners and grow your income
                </p>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {dsaBenefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    variants={fadeInUp}
                    className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-slate-100 hover:border-primary/30 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary" strokeWidth={2} />
                    </div>
                    <span className="font-medium text-sm text-slate-700">{benefit.title}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 }}
              >
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-lg px-8 shadow-lg shadow-secondary/20">
                  <Link to="/become-partner">Become a Partner <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mutual Funds */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7 }}
               className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Grow Your Wealth with Smart Investments
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Explore curated mutual fund options aligned with your financial goals. Start your investment journey today with expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/mutual-funds">Explore Mutual Funds</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="group">
                  <Link to="/contact">
                    Talk to an Advisor 
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7 }}
               className="relative h-64 md:h-96 lg:h-[400px]"
            >
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1761587941453-bd1790225d52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwZ3Jvd3RoJTIwY2hhcnR8ZW58MXx8fHwxNzY3OTUyNTA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Investment Growth"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"
        />
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Not sure where to start?
          </h2>
          <p className="text-lg text-white/90 mb-6">
            Check your CIBIL score in seconds — it's free.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90 text-lg px-8 shadow-2xl">
              <Link to="/check-cibil">Check CIBIL Score <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
    </>
  );
}