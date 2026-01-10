import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Target, 
  Briefcase, 
  TrendingUp, 
  BookOpen, 
  Zap, 
  Gift,
  Users,
  Award,
  Clock,
  IndianRupee,
  CheckCircle2,
  Home,
  Car,
  GraduationCap,
  Building2,
  User,
  Sparkles,
  FileText,
  Shield,
  Phone,
  Handshake,
  Camera,
  CreditCard,
  MapPin,
  Globe,
  ChevronDown,
  ChevronUp,
  Wallet,
  BarChart,
  UserCheck,
  Rocket,
  HeadphonesIcon,
  TrendingDown,
  Laptop,
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

export function DSA() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const benefits = [
    {
      icon: Target,
      title: 'Be Your Own Boss',
      description: 'Work independently and build your own financial services business'
    },
    {
      icon: Briefcase,
      title: 'Multiple Products',
      description: 'Offer loans, insurance, credit cards, and investments to your clients'
    },
    {
      icon: TrendingUp,
      title: 'High Commissions',
      description: 'Earn attractive payouts on every successful loan disbursal'
    },
    {
      icon: BookOpen,
      title: 'Training & Support',
      description: 'Comprehensive training programs and ongoing support'
    },
    {
      icon: Zap,
      title: 'Easy Onboarding',
      description: 'Simple registration process and quick approval'
    },
    {
      icon: Gift,
      title: 'Refer & Earn',
      description: 'Additional income through our referral program'
    }
  ];

  const requirements = [
    'Must be 21 years or older',
    'Valid PAN Card and Aadhaar Card',
    'Basic knowledge of financial products',
    'Good communication skills',
    'Commitment to ethical practices'
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Register Online',
      description: 'Fill out our simple online application form'
    },
    {
      step: '2',
      title: 'Get Verified',
      description: 'Submit your documents for quick verification'
    },
    {
      step: '3',
      title: 'Attend Training',
      description: 'Complete our comprehensive training program'
    },
    {
      step: '4',
      title: 'Start Earning',
      description: 'Begin sourcing loans and earning commissions'
    }
  ];

  const whoCanBecome = [
    { icon: User, title: 'Loan Agents', description: 'Experienced or aspiring loan professionals' },
    { icon: Building2, title: 'Ex-Bankers', description: 'Former banking professionals with industry knowledge' },
    { icon: BarChart, title: 'Financial Analysts', description: 'Finance experts and consultants' },
    { icon: TrendingUp, title: 'Mutual Fund Agents', description: 'Investment advisors and distributors' },
    { icon: FileText, title: 'Chartered Accountants', description: 'CAs and financial advisors' },
    { icon: Home, title: 'Builders & Developers', description: 'Real estate professionals' },
    { icon: Briefcase, title: 'Business Owners', description: 'Entrepreneurs looking for additional income' },
    { icon: Users, title: 'Other Professionals', description: 'Anyone motivated to succeed in finance' }
  ];

  const loanProducts = [
    { icon: User, title: 'Personal Loans', description: 'Quick loans for personal needs' },
    { icon: Home, title: 'Home Loans', description: 'Financing for dream homes' },
    { icon: Briefcase, title: 'Business Loans', description: 'Capital for business growth' },
    { icon: Car, title: 'Auto Loans', description: 'Vehicle financing solutions' },
    { icon: Building2, title: 'Loan Against Property', description: 'Leverage property value' },
    { icon: GraduationCap, title: 'Education Loans', description: 'Fund quality education' },
    { icon: Sparkles, title: 'Gold Loans', description: 'Instant cash against gold' },
    { icon: CreditCard, title: 'Credit Cards', description: 'Help clients get best cards' }
  ];

  const eligibilityCriteria = [
    { label: 'Age Requirement', value: 'Minimum 21 years (no upper age limit)' },
    { label: 'Residency', value: 'Indian Resident with valid address proof' },
    { label: 'Educational Qualification', value: 'No strict requirement - open to all backgrounds' },
    { label: 'Employment Status', value: 'Salaried, Self-employed, or Business Owner - all welcome' },
    { label: 'Documentation', value: 'Valid PAN, Aadhaar, and bank account' },
    { label: 'Communication Skills', value: 'Good interpersonal and communication abilities' }
  ];

  const registrationSteps = [
    {
      number: '1',
      title: 'Apply Online',
      description: 'Fill out the DSA registration form with your basic details',
      icon: FileText
    },
    {
      number: '2',
      title: 'Receive Call',
      description: 'Our team will contact you within 24-48 hours to discuss the opportunity',
      icon: Phone
    },
    {
      number: '3',
      title: 'Attend Meeting',
      description: 'Join an onboarding session to understand the program and expectations',
      icon: Users
    },
    {
      number: '4',
      title: 'Sign Agreement',
      description: 'Review and sign the DSA partnership agreement with clear terms',
      icon: Handshake
    },
    {
      number: '5',
      title: 'Start Earning',
      description: 'Begin sourcing loans and earning attractive commissions immediately',
      icon: Rocket
    }
  ];

  const documentsRequired = [
    {
      category: 'Identity Proof',
      documents: ['PAN Card (Mandatory)', 'Aadhaar Card', 'Passport', 'Voter ID']
    },
    {
      category: 'Address Proof',
      documents: ['Aadhaar Card', 'Passport', 'Utility Bills (not older than 3 months)', 'Rent Agreement']
    },
    {
      category: 'Photographs',
      documents: ['2 recent passport-sized photographs', 'Digital photo for portal registration']
    },
    {
      category: 'Financial Documents',
      documents: ['Bank Account Details', 'Cancelled Cheque', 'GST Certificate (if applicable)']
    },
    {
      category: 'Professional Proof',
      documents: ['Employment Letter (for salaried)', 'Business Registration (for self-employed)', 'Previous experience certificates (optional)']
    }
  ];

  const whyPartnerBenefits = [
    {
      icon: Wallet,
      title: 'Zero Investment Model',
      description: 'No franchise fees, no upfront costs - start earning immediately'
    },
    {
      icon: Zap,
      title: 'Instant Payouts',
      description: 'Fast commission payouts within 24-48 hours of loan disbursal'
    },
    {
      icon: TrendingUp,
      title: 'High-Growth Industry',
      description: 'Be part of India\'s booming fintech and lending sector'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Training',
      description: 'Product knowledge, sales techniques, and compliance training provided'
    },
    {
      icon: Award,
      title: 'Recognition & Rewards',
      description: 'Performance incentives, bonuses, and recognition programs'
    },
    {
      icon: HeadphonesIcon,
      title: 'Backend Support',
      description: 'Dedicated relationship manager and operations support team'
    }
  ];

  const programFeatures = [
    {
      icon: UserCheck,
      title: 'Lead Identification',
      description: 'Help clients identify their loan requirements and financial goals'
    },
    {
      icon: CheckCircle2,
      title: 'Lead Verification',
      description: 'Verify client documents and eligibility criteria before application'
    },
    {
      icon: Target,
      title: 'Lender Matching',
      description: 'Connect clients with the best lenders based on their profile'
    },
    {
      icon: Clock,
      title: 'Faster Disbursals',
      description: 'Track applications and ensure quick loan approval and disbursal'
    },
    {
      icon: Laptop,
      title: 'Digital Backend',
      description: 'Access to partner portal for tracking applications and commissions'
    },
    {
      icon: BookOpen,
      title: 'Ongoing Training',
      description: 'Regular product updates and skill development programs'
    }
  ];

  const reachStats = [
    { icon: MapPin, value: '4,000+', label: 'Cities Covered' },
    { icon: Globe, value: 'Pan-India', label: 'Nationwide Presence' },
    { icon: Users, value: '5,000+', label: 'Active Partners' },
    { icon: Building2, value: '275+', label: 'Partner Lenders' }
  ];

  const faqs = [
    {
      question: 'Who can become a Loan DSA?',
      answer: 'Anyone above 21 years of age with valid PAN and Aadhaar can become a Loan DSA. We welcome loan agents, ex-bankers, financial analysts, CAs, mutual fund agents, builders, business owners, and any motivated professional looking to earn in the financial services sector. No strict educational qualification is required.'
    },
    {
      question: 'How do DSAs earn income?',
      answer: 'DSAs earn commission on every successful loan disbursal. The commission varies based on the loan type, loan amount, and lender. Payouts are made within 24-48 hours of loan disbursal. Additionally, you can earn through our referral program and performance incentives.'
    },
    {
      question: 'What documents are required to become a DSA?',
      answer: 'You need: PAN Card (mandatory), Aadhaar Card, 2 passport photographs, bank account details with cancelled cheque, address proof, and employment/business proof. If you have GST registration, that should also be provided. Additional documents may be required based on your profile.'
    },
    {
      question: 'How long does the onboarding process take?',
      answer: 'The entire onboarding process typically takes 5-7 working days. After you submit your application, we will contact you within 24-48 hours. Once you complete the meeting, submit documents, and sign the agreement, you can start sourcing loans immediately.'
    },
    {
      question: 'What are the responsibilities of a Loan DSA?',
      answer: 'As a DSA, you are responsible for: identifying potential loan customers, advising them on suitable loan products, helping them complete application forms, collecting and verifying required documents, submitting applications to lenders, and following up until disbursal. You must ensure ethical practices and compliance with all regulations.'
    },
    {
      question: 'What kind of support does Loans Buzz provide to DSAs?',
      answer: 'We provide comprehensive training on loan products and processes, a dedicated relationship manager for ongoing support, access to a digital partner portal for tracking applications, marketing materials and tools, regular product updates, performance incentives, and backend operations support for smooth processing.'
    },
    {
      question: 'Are there any upfront fees to become a DSA?',
      answer: 'No, absolutely not. Loans Buzz operates on a zero-investment model. We do not charge any franchise fees, registration fees, or upfront costs. You can start your DSA business without any financial commitment. Beware of anyone asking for payment to become a DSA partner.'
    },
    {
      question: 'What are the performance expectations for DSAs?',
      answer: 'While there are no strict minimum targets initially, we encourage DSAs to actively source and submit quality loan applications. High-performing DSAs receive additional incentives, higher commission slabs, priority support, and recognition in our partner programs. Your earnings directly correlate with your efforts and performance.'
    },
    {
      question: 'Can I work as a DSA part-time?',
      answer: 'Yes, absolutely. Many of our successful DSAs work part-time alongside their primary jobs or businesses. The DSA model offers flexibility - you can dedicate as much or as little time as you want. However, consistent effort and client relationship building will lead to better earnings.'
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
              India's Leading Loan Distribution Partner Platform
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-8">
              Join India's leading loan marketplace and build a rewarding career in financial services. 
              Earn unlimited income while helping people achieve their financial goals across multiple loan products.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                <Link to="/become-partner">Become a Partner</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Users, val: '5,000+', lbl: 'Active Partners' },
              { icon: Award, val: '275+', lbl: 'Partner Lenders' },
              { icon: Clock, val: '24 Hours', lbl: 'Quick Payout' },
              { icon: IndianRupee, val: '₹50K+', lbl: 'Avg Monthly Earning' }
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold mb-1">{stat.val}</div>
                <div className="text-sm text-muted-foreground">{stat.lbl}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What is a Loan DSA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            What is a Loan DSA?
          </motion.h2>
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp}
            className="space-y-4 text-lg text-muted-foreground"
          >
            <p>
              A <strong>Loan Direct Selling Agent (DSA)</strong> is an authorized intermediary who connects potential borrowers 
              with banks and financial institutions. DSAs play a crucial role in the lending ecosystem by sourcing loan applications, 
              assisting customers with documentation, and facilitating the loan approval process.
            </p>
            
            <p>
              DSAs work independently or as part of a distribution network, representing multiple lenders and offering various loan 
              products including personal loans, home loans, business loans, auto loans, and more. They earn commission-based income 
              for every successful loan disbursal, making it a lucrative opportunity in India's growing financial services sector.
            </p>
            <p>
              At Loans Buzz, our DSA partners gain access to 275+ partner banks and NBFCs, allowing them to offer the best loan 
              products to their clients. The role involves identifying customer needs, providing expert guidance, and ensuring a 
              smooth loan application experience—all while earning attractive commissions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who Can Become a Loan DSA */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Can Become a Loan DSA?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Any motivated professional can become a DSA partner. We welcome individuals from diverse backgrounds.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whoCanBecome.map((role, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <role.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Loan Agent Partner */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            About Loan Agent Partner Role
          </motion.h2>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="p-8">
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                  As a <strong>Loan Agent Partner</strong> with Loans Buzz, you become a trusted financial advisor in your community. 
                  Your primary responsibility is to understand your clients' financial needs and help them select the right loan product 
                  from our wide range of offerings.
                </p>
                <div className="border-l-4 border-primary pl-6 my-6">
                  <h3 className="font-semibold text-foreground mb-2">Key Responsibilities:</h3>
                  <ul className="space-y-2">
                    {[
                      "Advise clients on suitable loan products based on their financial profile and requirements",
                      "Assist with loan application forms and documentation collection",
                      "Work across multiple loan categories - personal, home, business, education, auto, and more",
                      "Maintain ethical standards and ensure compliance with regulatory guidelines",
                      "Build long-term relationships with clients for repeat business and referrals"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-lg">
                  Unlike traditional employment, the DSA model offers complete flexibility. You can work from anywhere, set your own 
                  schedule, and scale your business as per your ambition. The more loans you source, the more you earn—there's no cap 
                  on your income potential.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Loan Products You Can Offer */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loan Products You Can Offer</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Earn commissions across a diverse range of financial products
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {loanProducts.map((product, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover">
                  <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <product.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-semibold mb-2">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Eligibility Criteria for Loan DSA Registration</h2>
            <p className="text-muted-foreground">
              Basic requirements to become a DSA partner. We have a welcoming and inclusive approach.
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
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loan DSA Registration Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple 5-step process to start your DSA journey with Loans Buzz
            </p>
          </motion.div>
          
          

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-5 gap-6 mt-8"
          >
            {registrationSteps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="relative">
                <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">{step.number}</span>
                  </div>
                  <step.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </Card>
                {index < registrationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-primary/20" style={{ width: 'calc(100% - 1.5rem)' }} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Documents Required to Become a Loan DSA</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Standard documentation needed for DSA registration. Documents may vary based on your profile.
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
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
              <strong>Note:</strong> All documents should be valid and up-to-date. Additional documents may be requested 
              based on your employment status and business profile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Partner With Loans Buzz */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Why Partner With Loans Buzz?
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {whyPartnerBenefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 hover:shadow-xl transition-shadow h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features & Earnings */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Features & Earnings of Loan DSA Program</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Structured support system to help you maximize your earnings
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {programFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 hover:shadow-lg transition-shadow h-full">
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

      {/* Nationwide Availability */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nationwide Availability</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our pan-India network of successful DSA partners
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            {reachStats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-8 text-center hover:shadow-lg transition-shadow h-full">
                  <stat.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits (Original Section) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Additional Partner Benefits
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 hover:shadow-xl transition-shadow h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works (Original Section) */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Quick Start Guide
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {howItWorks.map((item, index) => (
              <motion.div key={index} variants={fadeInUp} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary/20" style={{ width: 'calc(100% - 4rem)' }} />
                )}
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
          <p className="text-center text-muted-foreground mb-10">
            Find answers to common questions about becoming a DSA partner
          </p>
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
                          {/* Trigger for Income Diagram */}
                          {faq.question.includes("How do DSAs earn income?") && (
                            <div className="mt-4 text-xs text-primary">
                              
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

      {/* Requirements (Original Section) */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
          >
            Basic Requirements Summary
          </motion.h2>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="p-8">
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{requirement}</span>
                  </li>
                ))}
              </ul>
            </Card>
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
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of successful partners earning with Loans Buzz. Zero investment, unlimited potential.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90 text-lg px-8 shadow-2xl">
              <Link to="/become-partner">Become a Partner Today</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}