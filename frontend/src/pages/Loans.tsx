import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Home, 
  User, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  Car, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  Users,
  FileText,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Calculator,
  DollarSign,
  Heart,
  Wrench,
  TrendingUp,
  GraduationCap as Education
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- Animation Variants (Consistent with System) ---
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

export function Loans() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 400;
      setIsNavSticky(window.scrollY > heroHeight);

      // Update active section based on scroll position
      const sections = ['overview', 'loan-types', 'features', 'eligibility', 'documents', 'emi-calculator', 'fees', 'reviews', 'faqs'];
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
    { id: 'loan-types', label: 'Loan Types' },
    { id: 'features', label: 'Features' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'documents', label: 'Documents' },
    { id: 'emi-calculator', label: 'EMI Calculator' },
    { id: 'fees', label: 'Fees & Charges' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faqs', label: 'FAQs' },
  ];

  const loanProducts = [
    {
      name: 'Personal Loan',
      icon: User,
      description: 'Quick personal loans for all your needs with instant approval and disbursal.',
      features: ['Up to ₹40 Lakhs', 'Tenure up to 5 years', 'No collateral required'],
      path: '/loans/personal'
    },
    {
      name: 'Home Loan',
      icon: Home,
      description: 'Finance your dream home with competitive interest rates starting from 8.5% p.a.',
      features: ['Up to ₹5 Crore', 'Tenure up to 30 years', 'Minimal documentation'],
      path: '/loans/home'
    },
    {
      name: 'Business Loan',
      icon: Briefcase,
      description: 'Fuel your business growth with flexible financing options.',
      features: ['Up to ₹75 Lakhs', 'Flexible repayment', 'Quick processing'],
      path: '/loans/business'
    },
    {
      name: 'Loan Against Property',
      icon: Building2,
      description: 'Unlock the value of your property with attractive loan rates.',
      features: ['Up to ₹10 Crore', 'Tenure up to 20 years', 'Retain ownership'],
      path: '/loans/lap'
    },
    {
      name: 'Education Loan',
      icon: GraduationCap,
      description: 'Invest in your future with comprehensive education financing.',
      features: ['Cover 100% fees', 'Moratorium period', 'Low interest rates'],
      path: '/loans/education'
    },
    {
      name: 'Car Loan',
      icon: Car,
      description: 'Drive home your dream car with easy EMI options.',
      features: ['Up to 90% funding', 'Tenure up to 7 years', 'Quick approval'],
      path: '/loans/car'
    },
    {
      name: 'Gold Loan',
      icon: Sparkles,
      description: 'Get instant cash against your gold jewelry at attractive rates.',
      features: ['Up to 75% of gold value', 'Flexible tenure', 'Same day disbursal'],
      path: '/loans/gold'
    }
  ];

  const keyFeatures = [
    {
      icon: Users,
      title: 'Wide Lender Network',
      description: 'Access to 275+ partner banks and NBFCs across India'
    },
    {
      icon: DollarSign,
      title: 'Flexible Loan Amounts',
      description: 'From small personal loans to large business financing'
    },
    {
      icon: TrendingUp,
      title: 'Competitive Interest Rates',
      description: 'Compare and choose the best rates available in the market'
    },
    {
      icon: Zap,
      title: 'Digital Application',
      description: 'Apply online in minutes with minimal documentation'
    },
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description: 'No hidden charges, complete clarity on all fees'
    },
    {
      icon: Clock,
      title: 'Quick Processing',
      description: 'Fast approval and disbursal within 24-48 hours'
    }
  ];

  const useCases = [
    { icon: Heart, title: 'Medical Emergencies', description: 'Cover unexpected healthcare expenses' },
    { icon: Wrench, title: 'Home Renovation', description: 'Upgrade your living space' },
    { icon: Briefcase, title: 'Business Expansion', description: 'Grow your business operations' },
    { icon: Education, title: 'Education', description: 'Invest in quality education' },
    { icon: User, title: 'Debt Consolidation', description: 'Simplify multiple debts into one EMI' },
    { icon: Heart, title: 'Life Events', description: 'Weddings, celebrations, and more' }
  ];

  const eligibilityCriteria = [
    { label: 'Age', value: '21 to 65 years' },
    { label: 'Employment', value: 'Salaried, Self-employed, or Business Owner' },
    { label: 'Monthly Income', value: 'Minimum ₹15,000 for salaried (varies by loan type)' },
    { label: 'Credit Score', value: '650+ (750+ recommended for best rates)' },
    { label: 'Residency', value: 'Indian Resident' },
    { label: 'Work Experience', value: 'Minimum 1-2 years in current employment' }
  ];

  const documentCategories = [
    {
      category: 'Identity Proof',
      documents: ['Aadhaar Card', 'PAN Card', 'Passport', 'Voter ID', 'Driving License']
    },
    {
      category: 'Address Proof',
      documents: ['Aadhaar Card', 'Passport', 'Utility Bills', 'Rent Agreement', 'Bank Statement']
    },
    {
      category: 'Income Proof',
      documents: ['Salary Slips (3-6 months)', 'Bank Statements (6 months)', 'Form 16', 'ITR (2 years)']
    },
    {
      category: 'Employment Proof',
      documents: ['Employment Letter', 'Appointment Letter', 'Business Registration (for self-employed)', 'GST Registration']
    }
  ];

  const feeTypes = [
    { type: 'Processing Fee', range: '1% - 3% of loan amount', note: 'One-time charge at loan disbursal' },
    { type: 'Prepayment Charges', range: '2% - 5% of outstanding amount', note: 'Applicable on early loan closure' },
    { type: 'Late Payment Fee', range: '₹500 - ₹1,000 per default', note: 'Charged on missed EMI payments' },
    { type: 'Bounce Charges', range: '₹300 - ₹750 per instance', note: 'For EMI bounce due to insufficient funds' },
    { type: 'Document Charges', range: '₹100 - ₹500', note: 'For physical document processing' }
  ];

  const reviews = [
    {
      name: 'Rajesh Kumar',
      rating: 5,
      comment: 'Got my personal loan approved within 24 hours. Excellent service and transparent process.',
      location: 'Mumbai'
    },
    {
      name: 'Priya Sharma',
      rating: 5,
      comment: 'The home loan process was smooth and hassle-free. The team helped me compare multiple options.',
      location: 'Bangalore'
    },
    {
      name: 'Amit Patel',
      rating: 4,
      comment: 'Quick business loan approval helped me expand my store. Competitive interest rates.',
      location: 'Ahmedabad'
    },
    {
      name: 'Sneha Reddy',
      rating: 5,
      comment: 'Education loan for my daughter\'s studies abroad was processed quickly. Very helpful staff.',
      location: 'Hyderabad'
    }
  ];

  const faqs = [
    {
      question: 'What credit score do I need to get a loan?',
      answer: 'While the minimum credit score requirement is typically 650, we recommend having a score of 750 or above to get the best interest rates and loan terms. However, eligibility depends on multiple factors including income, employment stability, and existing debts.'
    },
    {
      question: 'Can I apply for multiple loans at the same time?',
      answer: 'Yes, you can apply for multiple loans, but it\'s not always recommended. Multiple loan applications in a short period can negatively impact your credit score. It\'s better to compare offers through Loans Buzz and then apply for the loan that best suits your needs.'
    },
    {
      question: 'How is EMI calculated?',
      answer: 'EMI (Equated Monthly Installment) is calculated using the loan amount, interest rate, and tenure. The formula considers these factors to divide your total repayment into equal monthly installments. You can use our EMI calculator to get an accurate estimate.'
    },
    {
      question: 'Can I prepay my loan?',
      answer: 'Yes, most lenders allow loan prepayment. However, some lenders may charge prepayment penalties, typically ranging from 2-5% of the outstanding amount. Check your loan agreement for specific prepayment terms and charges.'
    },
    {
      question: 'How long does loan approval take?',
      answer: 'Loan approval time varies by loan type and lender. Personal loans can be approved within 24-48 hours, while home loans may take 7-15 days due to property verification. Complete documentation and good credit score can speed up the process.'
    },
    {
      question: 'Can I apply for a loan online?',
      answer: 'Yes, you can apply for most loan types completely online through Loans Buzz. Our digital platform allows you to compare offers, submit documents, and track your application status—all from the comfort of your home.'
    },
    {
      question: 'Do I need collateral for all types of loans?',
      answer: 'No, not all loans require collateral. Personal loans, education loans, and credit cards are typically unsecured. However, home loans, car loans, and loans against property require collateral. Gold loans require gold jewelry as security.'
    },
    {
      question: 'What happens if I miss an EMI payment?',
      answer: 'Missing an EMI payment can result in late payment charges and negatively impact your credit score. If you anticipate difficulty in payment, contact your lender immediately to discuss alternative arrangements or restructuring options.'
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
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              Loans for Every Need
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-8">
              Compare and choose from a wide range of loan products tailored to your needs. 
              Get the best interest rates from 275+ partner banks and NBFCs.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/check-cibil">Check Your Eligibility</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      {/* </section>

      {/* Sticky Navigation */}
      {/* <nav className={`bg-white border-b border-border transition-all duration-300 ${isNavSticky ? 'sticky top-16 md:top-18 z-40 shadow-md' : ''}`}>
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
      </nav> */}

      {/* Overview Section */}
      <section id="overview" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">Overview</motion.h2>
            <motion.div variants={fadeInUp} className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                Loans are financial products that provide you with funds to meet various personal, professional, or business needs. 
                Whether you're planning to buy a home, expand your business, fund education, or handle emergencies, loans offer 
                the financial flexibility to achieve your goals without depleting your savings.
              </p>
              <p className="text-lg">
                At Loans Buzz, we simplify the loan process by connecting you with 275+ partner banks and NBFCs across India. 
                Our platform allows you to compare interest rates, loan terms, and eligibility criteria from multiple lenders 
                in one place—helping you make informed decisions and secure the best loan offers.
              </p>
              <p className="text-lg">
                Each loan type comes with its own features, eligibility requirements, and documentation needs. Interest rates, 
                processing fees, and terms vary based on the lender, loan amount, tenure, and your credit profile. Our goal is 
                to provide you with complete transparency and support throughout your loan journey.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Loan Types Section */}
      <section id="loan-types" className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loan Types</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive range of loan products designed to meet every financial need
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {loanProducts.map((product, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover">
                  <Card className="p-6 h-full hover:shadow-xl transition-all border-slate-100">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <product.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                      <Link to={product.path}>
                        Check Eligibility <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Why thousands of customers trust Loans Buzz for their financing needs
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {keyFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Cases / Benefits */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Uses for Loans</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whatever your financial goal, we have a loan solution for you
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {useCases.map((useCase, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <useCase.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground">{useCase.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section id="eligibility" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Eligibility Criteria</h2>
              <p className="text-muted-foreground mb-10">
                General eligibility requirements for loans. Specific criteria may vary by loan type and lender.
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
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold mb-1">{criteria.label}</h3>
                        <p className="text-muted-foreground">{criteria.value}</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
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
              className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/20"
            >
              <p className="text-sm text-center">
                <strong>Note:</strong> Eligibility criteria may vary based on loan type and lender policies. 
                Final approval depends on credit assessment and lender discretion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section id="documents" className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Documents Required</h2>
              <p className="text-muted-foreground mb-10">
                Standard documentation needed for loan applications. Exact requirements depend on loan type.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {documentCategories.map((category, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="p-6 h-full">
                    <div className="flex items-start space-x-3 mb-4">
                      <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <h3 className="text-lg font-semibold">{category.category}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.documents.map((doc, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
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
              className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20"
            >
              <p className="text-sm text-center">
                Additional documents may be required based on the specific loan type, loan amount, and lender requirements. 
                All documents should be valid and up-to-date.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section id="emi-calculator" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">EMI Calculator</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8">
              Calculate your monthly EMI before applying for a loan. Our EMI calculator helps you plan your finances 
              and choose the right loan amount and tenure based on your budget.
            </motion.p>
            
            <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6 mb-10">
              {['Loan Amount', 'Interest Rate', 'Loan Tenure'].map((title, idx) => (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="p-6">
                    <h3 className="font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {idx === 0 ? 'Enter the amount you need' : idx === 1 ? 'Expected annual rate' : 'Repayment period in months/years'}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/emi-calculator">Calculate Your EMI</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fees & Charges */}
      <section id="fees" className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Fees & Charges</h2>
              <p className="text-muted-foreground mb-10">
                Typical fees and charges associated with loans. Actual charges vary by lender and loan type.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {feeTypes.map((fee, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-2 md:mb-0">
                        <h3 className="font-semibold mb-1">{fee.type}</h3>
                        <p className="text-sm text-muted-foreground">{fee.note}</p>
                      </div>
                      <div className="text-primary font-semibold">{fee.range}</div>
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
               className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/20"
            >
              <p className="text-sm text-center">
                <strong>Disclaimer:</strong> Fees and charges vary by lender and loan type. 
                Please refer to the specific loan agreement for accurate fee details. Some banks may waive certain charges.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section id="reviews" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from thousands of satisfied customers across India
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
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-muted-foreground mb-10">
                Find answers to common questions about loans and the application process
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
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
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
            Ready to Apply for a Loan?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Check your eligibility now and get the best loan offers from 275+ lenders
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90 shadow-lg">
                <Link to="/check-cibil">Check Eligibility</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90 shadow-lg">
                <Link to="/contact">Talk to an Expert</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
