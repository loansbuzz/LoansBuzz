import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { useRef } from "react";
import {
  CheckCircle2,
  Home,
  Briefcase,
  User,
  Building2,
  Car,
  GraduationCap,
  Sparkles,
  CreditCard,
  Shield,
  FileText,
  Phone,
  Users,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  Clock,
  IndianRupee,
  Zap,
  BarChart,
  Handshake,
  Rocket,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
  Wallet,
  Globe,
  HeadphonesIcon,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { toast } from 'sonner';

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

export function BecomePartner() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
    panNumber: "",
    aadhaarNumber: "",
    message: "",
  });


  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const formRef = useRef<HTMLDivElement | null>(null);

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  const API_BASE_URL = "https://loansbuzz.vercel.app";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);

    const res = await fetch(`${API_BASE_URL}/api/partner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    await delay(2000); // your 2 sec loader

    const data = await res.json();

    if (data.success) {
      setloading(false);

      toast.success("Message sent successfully!", {
        description: "Our team will contact you within 24 hours.",
      });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        experience: "",
        panNumber: "",
        aadhaarNumber: "",
        message: "",
      });
    } else {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    }
  };


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };




  const benefits = [
    'Unlimited earning potential',
    'Work from anywhere',
    'Comprehensive training program',
    'Dedicated support team',
    'Marketing materials provided',
    'Fast commission payouts'
  ];

  const loanProducts = [
    { icon: Home, title: 'Home Loans', description: 'Help families buy their dream homes' },
    { icon: Briefcase, title: 'Business Loans', description: 'Support businesses with capital' },
    { icon: User, title: 'Personal Loans', description: 'Quick loans for personal needs' },
    { icon: Building2, title: 'Loan Against Property', description: 'Leverage property for funds' },
    { icon: Car, title: 'Auto Loans', description: 'Vehicle financing solutions' },
    { icon: GraduationCap, title: 'Education Loans', description: 'Fund quality education' },
    { icon: Sparkles, title: 'Gold Loans', description: 'Instant cash against gold' },
    { icon: CreditCard, title: 'Credit Cards', description: 'Help clients get best cards' },
    { icon: Shield, title: 'Insurance', description: 'Comprehensive protection plans' }
  ];

  const whoCanJoin = [
    { icon: User, title: 'Loan Agents', description: 'Experienced or aspiring professionals' },
    { icon: Building2, title: 'Ex-Bankers', description: 'Former banking professionals' },
    { icon: BarChart, title: 'Financial Analysts', description: 'Finance experts and consultants' },
    { icon: TrendingUp, title: 'Mutual Fund Agents', description: 'Investment advisors' },
    { icon: FileText, title: 'Chartered Accountants', description: 'CAs and financial advisors' },
    { icon: Home, title: 'Builders', description: 'Real estate professionals' },
    { icon: Briefcase, title: 'Business Owners', description: 'Entrepreneurs seeking extra income' },
    { icon: Users, title: 'Other Professionals', description: 'Anyone with entrepreneurial spirit' }
  ];

  const responsibilities = [
    {
      icon: Users,
      title: 'Identifying Potential Customers',
      description: 'Actively source and connect with individuals or businesses seeking loans'
    },
    {
      icon: Lightbulb,
      title: 'Guiding Borrowers',
      description: 'Advise clients on suitable loan options based on their needs and eligibility'
    },
    {
      icon: FileText,
      title: 'Ensuring Documentation',
      description: 'Help customers gather and submit complete, accurate documentation'
    },
    {
      icon: CheckCircle2,
      title: 'Closing Loan Cases',
      description: 'Coordinate with lenders to ensure smooth loan approval and disbursal'
    }
  ];

  const documentsRequired = [
    { label: 'Contact Number', description: 'Active mobile number for communication' },
    { label: 'PAN Card', description: 'Mandatory for all applicants' },
    { label: 'Aadhaar Card', description: 'For individual applicants' },
    { label: 'GST Documents', description: 'For firms and registered businesses' },
    { label: 'Additional Documents', description: 'Based on profile (employment/business proof)' }
  ];

  const registrationSteps = [
    {
      number: '1',
      title: 'Apply & Submit Details',
      description: 'Fill out the partner registration form',
      icon: FileText
    },
    {
      number: '2',
      title: 'Receive Call',
      description: 'Our team will contact you within 24-48 hours',
      icon: Phone
    },
    {
      number: '3',
      title: 'Attend Meeting',
      description: 'Onboarding session and program explanation',
      icon: Users
    },
    {
      number: '4',
      title: 'Sign Agreement',
      description: 'Review and sign DSA partnership agreement',
      icon: Handshake
    },
    {
      number: '5',
      title: 'Start Earning',
      description: 'Begin sourcing loans and earning commissions',
      icon: Rocket
    }
  ];

  const whyPartner = [
    {
      icon: Wallet,
      title: 'Investment-Free Model',
      description: 'Zero franchise fees or upfront costs - start earning immediately'
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
      icon: Award,
      title: 'Channel Partner Recognition',
      description: 'Official recognition and certification as an authorized partner'
    },
    {
      icon: BookOpen,
      title: 'Easy Onboarding',
      description: 'Simple registration with comprehensive training and support'
    }
  ];

  const lifestyleBenefits = [
    {
      icon: IndianRupee,
      title: 'Unlimited Earning Potential',
      description: 'No cap on income - earn more as you grow your business'
    },
    {
      icon: User,
      title: 'Be Your Own Boss',
      description: 'Work independently with flexible schedules and goals'
    },
    {
      icon: Zap,
      title: 'Hassle-Free Business',
      description: 'No inventory, no overhead - just connect and earn'
    },
    {
      icon: Globe,
      title: 'Network Expansion',
      description: 'Build valuable relationships across the financial ecosystem'
    },
    {
      icon: TrendingUp,
      title: 'Professional Growth',
      description: 'Develop expertise in financial services and business development'
    }
  ];

  const faqs = [
    {
      question: 'Who can become a partner with Loans Buzz?',
      answer: 'Anyone above 21 years with valid PAN and Aadhaar can become a partner. We welcome loan agents, ex-bankers, financial analysts, CAs, mutual fund agents, builders, business owners, and any professional with entrepreneurial spirit. No strict educational qualification is required.'
    },
    {
      question: 'What documents are required for partner registration?',
      answer: 'Required documents include: Active contact number, PAN Card (mandatory), Aadhaar Card (for individuals), GST documents (for firms), and additional documents based on your profile such as employment or business proof. Soft copies are accepted initially.'
    },
    {
      question: 'What are the eligibility criteria?',
      answer: 'Basic eligibility: Minimum 21 years of age, Indian Resident with valid address proof, no mandatory educational qualification, and open to salaried, self-employed, or business owners. The focus is on motivation and willingness to learn rather than strict qualifications.'
    },
    {
      question: 'What is the registration process?',
      answer: 'The process has 5 simple steps: 1) Submit partner registration form, 2) Receive call from our team within 24-48 hours, 3) Attend onboarding meeting, 4) Review and sign DSA partnership agreement, 5) Complete training and start earning. The entire process takes 5-7 working days.'
    },
    {
      question: 'What are the benefits of partnering with Loans Buzz?',
      answer: 'Key benefits include: Zero investment model (no franchise fees), instant commission payouts within 24-48 hours, access to 275+ lenders, comprehensive training, dedicated backend support, marketing materials, partner recognition, and unlimited earning potential.'
    },
    {
      question: 'How and when will I receive my earnings?',
      answer: 'You earn commission on every successful loan disbursal. The commission varies by loan type, amount, and lender. Payouts are processed within 24-48 hours of loan disbursal directly to your registered bank account. You can track all your earnings through the partner portal.'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}

      {/* 🔥 FIXED CTA BUTTON */}
      {/* 🔥 FIXED VERTICAL CENTER CTA */}
      {/* Centered Floating Button Container */}
      <div className="fixed top-50 bottom-10 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <button
          onClick={() =>
            formRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          className="
    mt-8
    pointer-events-auto
    px-8 py-4
    bg-primary
    text-white
    rounded-full
    font-bold
    text-lg
    shadow-2xl
    hover:bg-primary/90
    hover:-translate-y-1
    active:scale-95
    transition-all
    duration-300
  "
        >
          Fill the Form
        </button>
      </div>
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Start Your Loan Distribution Business
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-2"
            >Partner Registration

              Become a DSA partner with Loans Buzz and start earning from day one.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground"
            >
              Higher commissions. Instant payouts. Nationwide support.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Join Us as a DSA Partner */}
      <section className="py-16 md:py-20 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us as a DSA Partner</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Welcome to <strong>Loans Buzz</strong> - India's leading online DSA registration and loan distribution
              platform. With over 25 years of experience in the financial services sector, we connect borrowers with
              275+ partner banks and NBFCs across the country.
            </p>
            <p>
              Our DSA partners earn attractive commissions by distributing a wide range of financial products including
              home loans, personal loans, business loans, credit cards, and insurance. With presence in 4,000+ cities
              and a proven track record, we provide the perfect platform to build your loan distribution business.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Who is a DSA */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            Who is a DSA?
          </motion.h2>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="p-8">
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  A <strong>Direct Selling Agent (DSA)</strong> is an authorized intermediary who acts as a bridge between
                  borrowers and lending institutions. DSAs play a crucial role in the lending ecosystem by identifying
                  potential customers, guiding them through the loan application process, and facilitating successful
                  loan disbursals.
                </p>

                <p>
                  DSAs work on a <strong>commission-based earning model</strong> - they earn a percentage of the loan
                  amount as commission for every successful loan disbursal. This makes it a lucrative business opportunity
                  with unlimited income potential.
                </p>
                <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mt-6">
                  <p className="font-semibold text-foreground">
                    The role requires no inventory, no infrastructure investment, and offers complete flexibility in working
                    hours and location - making it an ideal entrepreneurial opportunity.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Responsibilities of a DSA Partner */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Responsibilities of a DSA Partner
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {responsibilities.map((resp, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <resp.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{resp.title}</h3>
                      <p className="text-sm text-muted-foreground">{resp.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
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

      {/* Who Can Become a Partner */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Can Become a Partner?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We welcome motivated professionals from all backgrounds. No strict qualifications required.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whoCanJoin.map((who, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <who.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{who.title}</h3>
                  <p className="text-sm text-muted-foreground">{who.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DSA Registration Process */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">DSA Registration Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple 5-step process to start your partnership journey
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

      {/* Why Partner With Loans Buzz */}
      <section className="py-16 md:py-20 bg-white">
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
            {whyPartner.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 hover:shadow-xl transition-shadow h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partner Advantages / Lifestyle Benefits */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Partner Advantages & Lifestyle Benefits</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Build the lifestyle and career you've always wanted
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {lifestyleBenefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  {benefit.title === 'Unlimited Earning Potential' && (
                    <div className="mt-4 text-xs text-primary">

                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            Documents Required for Registration
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="space-y-4">
              {documentsRequired.map((doc, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">{doc.label}</h3>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            Frequently Asked Questions
          </motion.h2>
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

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">Partner Benefits Summary</h2>
                <Card className="p-8">
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <Card className="p-8 bg-primary/5 border-primary/20">
                <h3 className="text-xl font-bold mb-4">What Happens Next?</h3>
                <ol className="space-y-4">
                  {[
                    { title: "Application Review", desc: "We'll review your application within 24-48 hours" },
                    { title: "Document Verification", desc: "Submit required documents for verification" },
                    { title: "Training", desc: "Attend our comprehensive training program" },
                    { title: "Start Earning", desc: "Begin sourcing loans and earning commissions" }
                  ].map((step, i) => (
                    <li key={i} className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">{i + 1}</span>
                      <div>
                        <div className="font-semibold">{step.title}</div>
                        <div className="text-sm text-muted-foreground">{step.desc}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6" ref={formRef}>Partner Registration</h2>
              <Card className="p-8 shadow-xl border-t-4 border-t-primary">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="bg-slate-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="bg-slate-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="bg-slate-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="Enter your city"
                      className="bg-slate-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Industry Experience</Label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50"
                    >
                      <option value="">Select experience</option>
                      <option value="0">No experience</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>

                  {/* DOCUMENTS REQUIRED */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Documents Required for Registration
                    </h3>

                    {/* PAN CARD */}
                    <div className="space-y-2">
                      <Label htmlFor="panFile">PAN Card *</Label>
                      <Input
                        id="panFile"
                        name="panNumber"
                        type="text"
                        value={formData.panNumber}
                        onChange={handleChange}
                        required
                        className="bg-slate-50"
                      />
                      <p className="text-xs text-muted-foreground">
                        Mandatory for all applicants
                      </p>
                    </div>

                    {/* AADHAAR CARD */}
                    <div className="space-y-2">
                      <Label htmlFor="aadhaarFile">Aadhaar Card *</Label>
                      <Input
                        id="aadhaarFile"
                        name="aadhaarNumber"
                        type="text"
                        value={formData.aadhaarNumber}
                        onChange={handleChange}
                        required
                        className="bg-slate-50"
                      />
                      <p className="text-xs text-muted-foreground">
                        For individual applicants
                      </p>
                    </div>

                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about yourself (Optional)</Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50"
                      placeholder="Share your background, skills, or any questions..."
                    />
                  </div>


                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className={`w-full text-lg py-6 shadow-lg transition-all duration-300
    ${loading
                        ? "bg-primary text-white opacity-90 cursor-not-allowed"
                        : "bg-primary hover:bg-primary/90 text-white shadow-primary/20 hover:shadow-primary/40"
                      }
  `}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2 text-white">
                        <svg
                          className="w-5 h-5 animate-spin text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8"
                            strokeWidth="4"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
