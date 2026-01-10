import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  CreditCard, 
  Gift, 
  Shield, 
  Percent, 
  Zap, 
  Star, 
  CheckCircle2,
  ShoppingBag,
  Coffee,
  Fuel,
  Plane,
  Briefcase,
  Lock,
  DollarSign,
  TrendingUp,
  Calendar,
  AlertCircle,
  FileText,
  User,
  Phone,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- Animation Variants ---
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

export function CreditCards() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 400;
      setIsNavSticky(window.scrollY > heroHeight);

      // Update active section based on scroll position
      const sections = ['overview', 'card-types', 'features', 'eligibility', 'documents', 'reviews', 'faqs'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'card-types', label: 'Card Types' },
    { id: 'features', label: 'Features' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'documents', label: 'Documents' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faqs', label: 'FAQs' },
  ];

  const cardCategories = [
    {
      icon: Gift,
      name: 'Rewards Cards',
      description: 'Earn points, cashback, and rewards on every purchase',
      benefits: ['Up to 5% cashback', 'Reward points', 'Welcome bonus']
    },
    {
      icon: Percent,
      name: 'Low Interest Cards',
      description: 'Best cards with lowest interest rates and fees',
      benefits: ['Low APR', 'Balance transfer', 'Zero annual fee']
    },
    {
      icon: Zap,
      name: 'Lifestyle Cards',
      description: 'Premium benefits for travel, dining, and entertainment',
      benefits: ['Lounge access', 'Travel benefits', 'Dining privileges']
    },
    {
      icon: Star,
      name: 'Premium Cards',
      description: 'Exclusive cards with luxury benefits and concierge services',
      benefits: ['Concierge service', 'Golf privileges', 'Premium rewards']
    }
  ];

  const benefits = [
    'Compare 100+ credit cards',
    'Instant approval decisions',
    'No hidden charges',
    'Expert guidance',
    'Lifetime free cards available',
    'Check eligibility online'
  ];

  const creditCardTypes = [
    {
      icon: ShoppingBag,
      title: 'Shopping Credit Cards',
      description: 'Designed for online and offline shopping with exclusive discounts, cashback, and reward points on retail purchases'
    },
    {
      icon: Coffee,
      title: 'Lifestyle Credit Cards',
      description: 'Perfect for dining, movies, entertainment, and leisure activities with special offers and privileges'
    },
    {
      icon: Fuel,
      title: 'Fuel Credit Cards',
      description: 'Earn surcharge waivers and cashback on fuel purchases at petrol pumps across India'
    },
    {
      icon: Gift,
      title: 'Rewards Credit Cards',
      description: 'Accumulate reward points on every transaction that can be redeemed for products, vouchers, or travel'
    },
    {
      icon: Plane,
      title: 'Travel Credit Cards',
      description: 'Enjoy air miles, lounge access, travel insurance, and exclusive benefits for frequent travelers'
    },
    {
      icon: Briefcase,
      title: 'Business Credit Cards',
      description: 'Tailored for business owners and entrepreneurs with expense tracking and business-specific rewards'
    },
    {
      icon: Lock,
      title: 'Secured Credit Cards',
      description: 'Build or rebuild credit score with a fixed deposit-backed card, ideal for first-time users'
    },
    {
      icon: DollarSign,
      title: 'Cashback Credit Cards',
      description: 'Get a percentage of your spending back as cash directly credited to your account or statement'
    }
  ];

  const coreFeatures = [
    {
      icon: IndianRupee,
      title: 'Credit Limit',
      description: 'Pre-approved spending limit based on income and credit profile'
    },
    {
      icon: CreditCard,
      title: 'Cash Alternative',
      description: 'Make purchases without carrying physical cash'
    },
    {
      icon: BarChart3,
      title: 'Transaction Tracking',
      description: 'Monitor all expenses through monthly statements and mobile apps'
    },
    {
      icon: Gift,
      title: 'Rewards & Offers',
      description: 'Earn points, cashback, and exclusive discounts on purchases'
    }
  ];

  const detailedFeatures = [
    {
      icon: IndianRupee,
      title: 'Credit Limit',
      description: 'The maximum amount you can spend on your credit card. It is determined by your income, credit score, and repayment history. Credit limits can increase over time with responsible usage.'
    },
    {
      icon: TrendingUp,
      title: 'Outstanding Balance',
      description: 'The total amount you owe to the credit card issuer at any given time. This includes purchases, cash advances, interest charges, and any applicable fees.'
    },
    {
      icon: Percent,
      title: 'APR (Annual Percentage Rate)',
      description: 'The yearly interest rate charged on outstanding balances if not paid in full by the due date. In India, typical credit card APRs range from 24% to 48% per annum.'
    },
    {
      icon: Calendar,
      title: 'Grace Period',
      description: 'The interest-free period between the transaction date and payment due date, typically 15-50 days. Pay your full balance by the due date to avoid interest charges.'
    },
    {
      icon: AlertCircle,
      title: 'Credit Card Fees',
      description: 'Various charges including annual/renewal fees, late payment fees, over-limit fees, cash advance fees, and foreign transaction fees. Always review the fee structure before applying.'
    }
  ];

  const eligibilityCriteria = [
    {
      icon: User,
      title: 'Age Requirements',
      description: 'Minimum 18-21 years (varies by issuer), maximum 60-65 years for primary cardholders'
    },
    {
      icon: IndianRupee,
      title: 'Income Considerations',
      description: 'Minimum monthly income typically ranges from ₹15,000 to ₹50,000 depending on card type'
    },
    {
      icon: BarChart3,
      title: 'Credit Score Importance',
      description: 'Good credit score (750+) increases approval chances and unlocks better card options'
    },
    {
      icon: Shield,
      title: 'Residential Status',
      description: 'Must be a resident Indian with valid address proof and KYC documents'
    }
  ];

  const documentsRequired = [
    {
      category: 'Identity Proof',
      documents: ['PAN Card (Mandatory)', 'Aadhaar Card', 'Passport', 'Voter ID', 'Driving License']
    },
    {
      category: 'Address Proof',
      documents: ['Aadhaar Card', 'Passport', 'Utility Bills (recent)', 'Rent Agreement', 'Bank Statement']
    },
    {
      category: 'Income Proof',
      documents: ['Salary Slips (last 3 months)', 'Bank Statements (last 6 months)', 'Form 16 / ITR', 'Employment Letter']
    },
    {
      category: 'Additional Documents',
      documents: ['Passport-size photographs', 'Existing credit card statement (if any)', 'Business proof (for self-employed)']
    }
  ];

  const reviews = [
    {
      name: 'Ankit Sharma',
      rating: 5,
      comment: 'Got approved for my first credit card within 24 hours. The process was smooth and completely online.',
      location: 'Delhi',
      cardType: 'Rewards Card'
    },
    {
      name: 'Priya Mehta',
      rating: 5,
      comment: 'Excellent comparison tool helped me choose a card with the best cashback offers for my spending pattern.',
      location: 'Mumbai',
      cardType: 'Cashback Card'
    },
    {
      name: 'Rahul Verma',
      rating: 4,
      comment: 'Great travel benefits and airport lounge access. The annual fee is totally worth it for frequent flyers.',
      location: 'Bangalore',
      cardType: 'Travel Card'
    },
    {
      name: 'Sneha Gupta',
      rating: 5,
      comment: 'Applied through Loans Buzz and got a lifetime free card with amazing shopping discounts. Highly recommended!',
      location: 'Pune',
      cardType: 'Shopping Card'
    }
  ];

  const faqs = [
    {
      question: 'What is a credit score?',
      answer: 'A credit score is a three-digit number (ranging from 300 to 900 in India) that represents your creditworthiness. It is calculated based on your credit history, repayment behavior, credit utilization, and other factors. Lenders use this score to assess the risk of lending to you. A higher score indicates better creditworthiness and increases your chances of loan and credit card approval.'
    },
    {
      question: 'What is a credit report?',
      answer: 'A credit report is a detailed record of your credit history maintained by credit bureaus like CIBIL, Experian, Equifax, and CRIF High Mark. It contains information about your loans, credit cards, payment history, defaults, inquiries, and personal details. Lenders review your credit report to evaluate your financial behavior before approving credit applications.'
    },
    {
      question: 'How can I increase my credit score?',
      answer: 'To improve your credit score: 1) Pay all bills and EMIs on time, 2) Keep credit utilization below 30% of your limit, 3) Maintain a healthy mix of secured and unsecured credit, 4) Avoid multiple credit applications in a short period, 5) Check your credit report regularly for errors and dispute inaccuracies, 6) Keep old credit accounts active to build a longer credit history.'
    },
    {
      question: 'How is credit score calculated?',
      answer: 'Credit scores are calculated using multiple factors: Payment history (35%) - timely repayments vs defaults/delays; Credit utilization (30%) - how much of your available credit you use; Length of credit history (15%) - age of your oldest and newest accounts; Credit mix (10%) - diversity of loan types; New credit inquiries (10%) - recent applications. Different bureaus may use slightly different weightings.'
    },
    {
      question: 'What is the difference between credit score and credit report?',
      answer: 'A credit score is a single numerical value (300-900) summarizing your creditworthiness, while a credit report is a comprehensive document detailing your entire credit history. The credit score is derived from the information in your credit report. Think of the credit report as a detailed report card and the credit score as your final grade.'
    },
    {
      question: 'What factors affect my credit score?',
      answer: 'Key factors affecting your credit score include: payment history (on-time vs late payments), credit utilization ratio (amount used vs available limit), length of credit history, types of credit accounts (loans, credit cards), recent credit inquiries, outstanding debts, settled or written-off accounts, and any defaults or bankruptcies. Maintaining financial discipline across these areas improves your score.'
    },
    {
      question: 'How often is my credit score updated?',
      answer: 'Credit scores are typically updated monthly when lenders report your account activity to credit bureaus. However, the exact timing varies by lender and bureau. Some lenders report weekly, while others report monthly. Your score may change whenever new information is added to your credit report, such as new accounts, payments, or inquiries. Check your score quarterly to track changes.'
    },
    {
      question: 'What is the minimum credit score required for a credit card?',
      answer: 'While there\'s no universal minimum, most banks prefer a credit score of 750+ for premium cards and 650+ for basic cards. Secured credit cards may be available for scores below 650. First-time credit users with no credit history can apply for entry-level or secured cards to start building their credit profile.'
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
            <motion.div variants={fadeInUp}>
              <CreditCard className="w-16 h-16 mx-auto mb-6 text-primary" />
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect Credit Card
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-8">
              Compare and choose from 100+ credit cards from leading banks. 
              Get instant approval and start enjoying exclusive benefits today.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/check-cibil">Check Eligibility</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Sticky Navigation */}
      <nav className={`bg-white border-b border-border transition-all duration-300 ${isNavSticky ? 'sticky top-16 md:top-18 z-40 shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeSection === item.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* What is a Credit Card - Overview */}
      <section id="overview" className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            What is a Credit Card?
          </motion.h2>
          
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="p-8">
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  A <strong>credit card</strong> is a plastic or digital payment card issued by banks and financial institutions 
                  that allows you to borrow money for purchases up to a predetermined credit limit. Unlike debit cards that use 
                  your own funds, credit cards let you spend on credit and repay later.
                </p>
                <p>
                  When you use a credit card, you're essentially taking a short-term loan from the card issuer. You receive a 
                  monthly statement detailing all transactions, and you must repay at least the minimum amount due by the payment 
                  due date.
                </p>
                
                

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <motion.div variants={fadeInUp} className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center">
                      <IndianRupee className="w-5 h-5 mr-2 text-primary" />
                      Credit Limit & Billing Cycle
                    </h3>
                    <p className="text-sm">
                      Your credit limit is the maximum amount you can spend. It's based on your income and credit score. 
                      The billing cycle is typically 30 days, after which you receive a statement.
                    </p>
                  </motion.div>
                  <motion.div variants={fadeInUp} className="bg-secondary/10 p-6 rounded-lg border border-secondary/20">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-secondary" />
                      Interest-Free Period
                    </h3>
                    <p className="text-sm">
                      The grace period (15-50 days) is the time between transaction date and payment due date. If you pay 
                      the full balance by the due date, you pay no interest.
                    </p>
                  </motion.div>
                </div>
                <motion.div variants={fadeInUp} className="bg-accent/20 p-6 rounded-lg border border-accent/40 mt-6">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-accent" />
                    Minimum Due vs Full Payment
                  </h3>
                  <p className="text-sm">
                    <strong>Minimum Due:</strong> The smallest amount you must pay to keep your account active (usually 5% of total due). 
                    Paying only the minimum results in high interest charges on the remaining balance.
                    <br /><br />
                    <strong>Full Payment:</strong> Paying the entire outstanding amount by the due date avoids all interest charges 
                    and keeps your credit score healthy. This is always the recommended approach.
                  </p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Types of Credit Cards in India */}
      <section id="card-types" className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Types of Credit Cards in India</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from various credit card categories designed to match your lifestyle and spending patterns
            </p>
          </motion.div>

          {/* Card Type Categories */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {creditCardTypes.map((type, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover">
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <type.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{type.title}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Original Card Categories */}
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 text-center"
          >
            Popular Credit Card Categories
          </motion.h3>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {cardCategories.map((category, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover">
                  <Card className="p-8 h-full transition-shadow hover:shadow-xl">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <category.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                    <p className="text-muted-foreground mb-6">{category.description}</p>
                    <ul className="space-y-2 mb-6">
                      {category.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white group">
                      View Cards <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Credit Card Features */}
      <section id="features" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Credit Card Features
          </motion.h2>
          
          {/* Core Features */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {coreFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed Features & Benefits */}
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 text-center"
          >
            Features & Benefits Explained
          </motion.h3>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {detailedFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Credit Card Eligibility */}
      <section id="eligibility" className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Credit Card Eligibility</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Basic eligibility criteria for credit card applications in India
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {eligibilityCriteria.map((criteria, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <criteria.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{criteria.title}</h3>
                      <p className="text-sm text-muted-foreground">{criteria.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-accent/20 rounded-lg border border-accent/40"
          >
            <p className="text-sm text-center">
              <strong>Important:</strong> Meeting the eligibility criteria does not guarantee credit card approval. 
              Final approval depends on the issuer's credit assessment and internal policies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Documents Required */}
      <section id="documents" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Documents Required to Apply for a Credit Card</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Standard documentation needed for credit card applications
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {documentsRequired.map((category, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full">
                  <div className="flex items-start space-x-3 mb-4">
                    <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <h3 className="text-lg font-semibold">{category.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.documents.map((doc, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20 max-w-3xl mx-auto"
          >
            <p className="text-sm text-center">
              <strong>Note:</strong> Document requirements may vary by card issuer and card type. Premium cards may 
              require additional financial documents. Check with the specific issuer for exact requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section id="reviews" className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from users who found their perfect credit card through Loans Buzz
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {reviews.map((review, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic">"{review.comment}"</p>
                  <div className="border-t pt-3">
                    <p className="font-semibold text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                    <p className="text-xs text-primary mt-1">{review.cardType}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Learn more about credit cards, credit scores, and credit reports
            </p>
          </motion.div>

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
                          {/* Trigger for Credit Score Calculation Diagram */}
                          {faq.question.includes("How is credit score calculated?") && (
                             <div className="mt-4">
                               
                             </div>
                          )}
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

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Why Apply Through Loans Buzz?
          </motion.h2>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How to Choose */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
          >
            How to Choose the Right Card
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 text-lg text-muted-foreground"
          >
            <p>
              With so many credit cards available, choosing the right one can be overwhelming. 
              Here's what you should consider:
            </p>
            <div className="space-y-4">
              {[
                { title: "1. Your Spending Patterns", desc: "Analyze where you spend the most—fuel, groceries, dining, or online shopping. Choose a card that offers maximum rewards in your spending categories." },
                { title: "2. Annual Fees vs. Benefits", desc: "Calculate if the benefits you'll receive justify the annual fee. Sometimes a higher fee card offers more value through its benefits." },
                { title: "3. Interest Rates", desc: "If you plan to carry a balance, prioritize cards with lower interest rates. Otherwise, focus on rewards and benefits." },
                { title: "4. Credit Score Requirements", desc: "Check your credit score first and apply for cards that match your credit profile to increase approval chances." }
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Your Credit Card?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Check your eligibility and apply for the best credit cards in minutes
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90 text-lg px-8 shadow-2xl">
              <Link to="/check-cibil">Check Eligibility Now</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}