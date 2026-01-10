import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Users, 
  Target, 
  Award, 
  Heart,
  Shield,
  CreditCard,
  Building2,
  TrendingUp,
  MapPin,
  Globe,
  Laptop,
  Calculator,
  CheckCircle2,
  Lightbulb,
  Clock,
  IndianRupee,
  Sparkles,
  FileText,
  ChevronDown,
  ChevronUp,
  Zap,
  Eye,
  Compass,
  BarChart,
  Trophy,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- Animation Variants (Consistent with Home Page) ---
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

export function About() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const values = [
    {
      icon: Users,
      title: 'Customer First',
      description: 'We prioritize our customers\' financial well-being above all else.'
    },
    {
      icon: Target,
      title: 'Transparency',
      description: 'Clear, honest communication in every interaction.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Delivering exceptional service and expert guidance.'
    },
    {
      icon: Heart,
      title: 'Trust',
      description: 'Building lasting relationships based on integrity.'
    }
  ];

  const services = [
    {
      icon: IndianRupee,
      title: 'Loans',
      description: 'Personal, Home, Business, Education, and more',
      link: '/loans'
    },
    {
      icon: CreditCard,
      title: 'Credit Cards',
      description: 'Compare and apply for the best credit cards',
      link: '/credit-cards'
    },
    {
      icon: Shield,
      title: 'Insurance',
      description: 'Life, Health, and General Insurance solutions',
      link: '/insurance'
    },
    {
      icon: TrendingUp,
      title: 'Mutual Funds',
      description: 'Smart investment options for wealth growth',
      link: '/mutual-funds'
    },
    {
      icon: Users,
      title: 'DSA Partnership',
      description: 'Earn by becoming our distribution partner',
      link: '/dsa'
    }
  ];

  const impactMetrics = [
    { icon: Users, value: '10 Lakh+', label: 'Customers Served' },
    { icon: Building2, value: '275+', label: 'Partner Institutions' },
    { icon: MapPin, value: '4,000+', label: 'Cities Covered' },
    { icon: IndianRupee, value: '₹1.4 Lakh Cr+', label: 'Loans Facilitated' }
  ];

  const technologyFeatures = [
    {
      icon: Calculator,
      title: 'Smart Calculators',
      description: 'EMI, eligibility, and comparison tools for informed decisions'
    },
    {
      icon: BarChart,
      title: 'Real-time Comparison',
      description: 'Compare interest rates and terms from 275+ lenders instantly'
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Digital application with 24-48 hour approval timelines'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Bank-grade security for all your personal and financial data'
    }
  ];

  const platformBenefits = [
    {
      icon: Eye,
      title: 'Complete Transparency',
      description: 'No hidden charges, all fees disclosed upfront'
    },
    {
      icon: CheckCircle2,
      title: 'Easy Navigation',
      description: 'User-friendly platform designed for simplicity'
    },
    {
      icon: Lightbulb,
      title: 'Informed Decisions',
      description: 'Educational content and tools to help you choose wisely'
    },
    {
      icon: Sparkles,
      title: 'Simplified Access',
      description: 'One platform for all your financial needs'
    },
    {
      icon: Clock,
      title: 'Quick Service',
      description: 'Fast application processing and instant approvals'
    },
    {
      icon: Heart,
      title: 'Customer Support',
      description: '24/7 assistance throughout your financial journey'
    }
  ];

  const timeline = [
    {
      year: '1998',
      title: 'Foundation',
      description: 'Started as a financial advisory firm in Mumbai'
    },
    {
      year: '2005',
      title: 'Digital Transformation',
      description: 'Launched online platform for loan comparisons'
    },
    {
      year: '2012',
      title: 'National Expansion',
      description: 'Expanded operations to 1,000+ cities across India'
    },
    {
      year: '2018',
      title: 'Product Diversification',
      description: 'Added insurance and mutual funds to our offerings'
    },
    {
      year: '2022',
      title: 'DSA Program Launch',
      description: 'Introduced partner program for financial advisors'
    },
    {
      year: '2026',
      title: 'Industry Leader',
      description: 'Serving 4,000+ cities with 275+ partner institutions'
    }
  ];

  const recognitions = [
    { icon: Trophy, title: 'Best Fintech Platform 2025', org: 'BFSI Awards' },
    { icon: Award, title: 'Customer Choice Award', org: 'Finance India' },
    { icon: Shield, title: 'ISO 27001 Certified', org: 'Information Security' },
    { icon: CheckCircle2, title: 'RBI Compliant', org: 'Reserve Bank of India' }
  ];

  const faqs = [
    {
      question: 'What is Loans Buzz?',
      answer: 'Loans Buzz is India\'s leading fintech marketplace that connects borrowers with 275+ banks and NBFCs. We offer a comprehensive platform for loans, credit cards, insurance, and mutual funds—helping users compare options and make informed financial decisions.'
    },
    {
      question: 'Why should I choose Loans Buzz?',
      answer: 'We offer complete transparency with no hidden charges, access to 275+ lenders for the best rates, quick digital processing, expert guidance, and a customer-first approach. Our platform simplifies the entire financial journey from comparison to approval.'
    },
    {
      question: 'How does Loans Buzz make money?',
      answer: 'Loans Buzz earns commission from our partner banks and financial institutions when loans are successfully disbursed or products are activated. Our services are completely free for customers—we never charge borrowers any fees.'
    },
    {
      question: 'What services does Loans Buzz offer?',
      answer: 'We offer a comprehensive range of financial services including Personal Loans, Home Loans, Business Loans, Education Loans, Car Loans, Gold Loans, Credit Cards, Life and Health Insurance, Mutual Funds, and DSA Partnership opportunities.'
    },
    {
      question: 'How do I get started with Loans Buzz?',
      answer: 'Getting started is simple: 1) Check your CIBIL score for free on our platform, 2) Browse and compare loan/product options, 3) Fill out a simple online application, 4) Submit required documents digitally, 5) Get approval and disbursal within 24-48 hours.'
    },
    {
      question: 'Is my information safe with Loans Buzz?',
      answer: 'Yes, absolutely. We use bank-grade encryption and security protocols to protect all your personal and financial information. We are ISO 27001 certified for information security and comply with all RBI guidelines.'
    },
    {
      question: 'Do I need to pay any fees to use Loans Buzz?',
      answer: 'No, our platform is completely free for customers. We do not charge any fees for using our comparison tools, checking eligibility, or applying for financial products. We earn commission from our partner institutions only after successful loan disbursal.'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-16 md:py-24 relative overflow-hidden">
        <motion.div 
           initial="hidden"
           animate="visible"
           variants={staggerContainer}
           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              About Loans Buzz
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground">
              Your trusted partner in financial solutions, connecting you with India's leading banks and NBFCs for over 25 years.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Compliance / Trust Notice */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="py-8 bg-secondary/10 border-y border-secondary/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-4">
            <Shield className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Important Notice</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Loans Buzz does not charge customers any fees</strong> for loan comparison, application, or processing services. 
                All our services are completely free for borrowers. We earn commission only from our partner institutions. 
                If anyone demands payment on behalf of Loans Buzz, please report immediately via our official contact channels.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Who We Are */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">Who We Are</motion.h2>
            <motion.div variants={fadeInUp} className="mb-8">
              <p className="text-xl font-medium text-primary mb-4">
                A Modern Fintech Platform for Smart Borrowing & Investing
              </p>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Loans Buzz is India's leading financial marketplace, simplifying access to loans, credit cards, insurance, and investment products. 
                  With over 25 years of industry experience, we've built a trusted platform that connects millions of Indians with the right financial solutions.
                </p>
                <p>
                  Our mission is to empower every Indian with transparent, accessible, and efficient financial services—backed by cutting-edge 
                  technology and a customer-first approach.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Services We Offer
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.slice(0, 5).map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover">
                  <Card className="p-6 h-full hover:shadow-xl transition-all border-slate-100">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <Button asChild variant="link" className="p-0 h-auto text-primary group">
                      <Link to={service.link}>
                        Learn More 
                        <ArrowRight className="w-4 h-4 ml-1 inline-block transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nationwide Reach */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nationwide Reach</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Serving customers across the length and breadth of India with seamless digital access
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-8 text-center h-full hover:shadow-lg transition-shadow">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">4,000+ Cities</h3>
                <p className="text-muted-foreground">
                  Pan-India presence covering metros, tier-2, and tier-3 cities
                </p>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="p-8 text-center h-full hover:shadow-lg transition-shadow">
                <Globe className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">100% Digital</h3>
                <p className="text-muted-foreground">
                  Accessible from anywhere with complete online processing
                </p>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="p-8 text-center h-full hover:shadow-lg transition-shadow">
                <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">All States Covered</h3>
                <p className="text-muted-foreground">
                  Operations in all Indian states and union territories
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Expertise & Experience */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Expertise & Experience
          </motion.h2>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-6 h-full hover:shadow-md transition-shadow">
                <Clock className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">25+ Years of Experience</h3>
                <p className="text-muted-foreground">
                  Over two decades of deep industry knowledge in the Indian financial services sector, understanding evolving market dynamics and customer needs.
                </p>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="p-6 h-full hover:shadow-md transition-shadow">
                <FileText className="w-10 h-10 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Financial Domain Expertise</h3>
                <p className="text-muted-foreground">
                  Specialized knowledge across lending, insurance, investments, and credit products with expert advisors guiding every customer interaction.
                </p>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="p-6 h-full hover:shadow-md transition-shadow">
                <Laptop className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Technology-Driven Approach</h3>
                <p className="text-muted-foreground">
                  Modern fintech platform leveraging AI, data analytics, and automation to deliver seamless, efficient, and personalized financial solutions.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Client Trust & Impact Metrics */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Numbers that reflect our commitment to serving India's financial needs
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            {impactMetrics.map((metric, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="p-8 text-center hover:shadow-lg transition-shadow border-none bg-slate-50/50">
                    <metric.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                    <div className="text-3xl font-bold text-foreground mb-2">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technology & Innovation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leveraging modern technology to simplify financial decision-making
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {technologyFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow border-slate-100">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Benefits that make Loans Buzz your preferred financial partner
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {platformBenefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Our Core Values
          </motion.h2>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover">
                  <Card className="p-6 text-center h-full shadow-sm hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Our Mission & Vision
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 bg-primary/5 border-primary/20 h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <Compass className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  To democratize access to financial services by providing a transparent, efficient, and customer-centric platform that connects 
                  borrowers with the best financial solutions tailored to their needs. We are committed to educating users and promoting 
                  responsible borrowing, not just selling products.
                </p>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 bg-secondary/5 border-secondary/20 h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="w-8 h-8 text-secondary" />
                  <h3 className="text-2xl font-bold text-secondary">Our Vision</h3>
                </div>
                <p className="text-lg text-muted-foreground">
                  To become India's most trusted and preferred financial marketplace, empowering every Indian with easy access to credit, 
                  insurance, and investment opportunities. We envision a future where financial decisions are informed, transparent, 
                  and accessible to all.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founding Philosophy */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <Lightbulb className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Philosophy</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Loans Buzz was founded on the belief that every Indian deserves access to clear, unbiased financial information and services. 
            We saw a market dominated by complexity, hidden fees, and limited choices—and we set out to change that.
          </p>
          <p className="text-lg text-muted-foreground">
            Our philosophy is simple: <strong>empower, educate, and enable</strong>. We empower users with choice, educate them with 
            transparent information and tools, and enable them to make the best financial decisions for their unique circumstances. 
            This principle guides everything we do.
          </p>
        </motion.div>
      </section>

      {/* Growth Journey / Timeline */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Growth Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our journey to becoming India's trusted financial marketplace
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {timeline.map((milestone, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 relative overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"></div>
                  <Calendar className="w-8 h-8 text-primary mb-3" />
                  <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                  <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recognition & Credibility */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recognition & Trust</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Industry recognition and certifications that validate our commitment to excellence
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {recognitions.map((recognition, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <recognition.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{recognition.title}</h3>
                  <p className="text-sm text-muted-foreground">{recognition.org}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-muted-foreground mb-10"
          >
            Learn more about Loans Buzz and how we can help you achieve your financial goals
          </motion.p>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="overflow-hidden border-slate-200">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <h3 className="font-semibold pr-4 text-slate-800">{faq.question}</h3>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-muted-foreground pt-2 border-t border-slate-100">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join millions of Indians who trust Loans Buzz for their financial needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90 shadow-lg">
                <Link to="/check-cibil">Check CIBIL Score</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90 shadow-lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}