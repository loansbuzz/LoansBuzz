import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import {
  Shield, CheckCircle2, TrendingUp, AlertCircle, BarChart3,
  FileText, Clock, Award, Zap, IndianRupee, Calendar,
  CreditCard, Eye, Lightbulb, TrendingDown, Users,
  ChevronDown, ChevronUp, Wallet, Building2, Percent, Activity
} from 'lucide-react';
import { motion, Variants, AnimatePresence, delay } from 'framer-motion';
import CibilScoreModal from './CibilScoreModal';

// --- ANIMATION VARIANTS (Consistent Global Styles) ---
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

// --- STATIC DATA ---
const SCORE_RANGES = [
  {
    range: '750-900',
    status: 'Excellent',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Excellent creditworthiness - highest approval rates and best interest rates',
    approval: 'Very High Approval Chances'
  },
  {
    range: '700-749',
    status: 'Good',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Good credit profile - high approval chances with competitive rates',
    approval: 'High Approval Chances'
  },
  {
    range: '650-699',
    status: 'Fair',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    description: 'Fair creditworthiness - moderate approval chances, may face higher rates',
    approval: 'Moderate Approval Chances'
  },
  {
    range: 'Below 650',
    status: 'Needs Improvement',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Poor credit history - difficult to get approvals, focus on improvement',
    approval: 'Low Approval Chances'
  }
];

const WHY_CHECK_SCORE = [
  {
    icon: TrendingUp,
    title: 'Better Loan Offers',
    description: 'Higher credit scores unlock lower interest rates and better terms'
  },
  {
    icon: CheckCircle2,
    title: 'Know Your Standing',
    description: 'Understand your creditworthiness before applying for loans'
  },
  {
    icon: Shield,
    title: 'Fraud Detection',
    description: 'Identify unauthorized credit inquiries or fraudulent accounts'
  }
];

const IMPORTANCE_POINTS = [
  {
    icon: Activity,
    title: 'Monitor Financial Health',
    description: 'Regular checks help you track your credit health and identify trends over time'
  },
  {
    icon: Eye,
    title: 'Identify Inaccuracies',
    description: 'Spot errors or fraudulent entries in your credit report early and dispute them'
  },
  {
    icon: TrendingUp,
    title: 'Early Improvement Opportunities',
    description: 'Understand weak areas and take corrective action before applying for loans'
  },
  {
    icon: Zap,
    title: 'Convenience of Online Access',
    description: 'Check your score anytime, anywhere without visiting bureaus physically'
  }
];

const CHECKING_STEPS = [
  {
    number: '1',
    title: 'Visit Check CIBIL Score Page',
    description: 'Navigate to the free CIBIL score check section'
  },
  {
    number: '2',
    title: 'Enter Personal Details',
    description: 'Fill in your PAN, mobile number, email, and date of birth'
  },
  {
    number: '3',
    title: 'Submit Form Securely',
    description: 'Your information is encrypted and processed securely'
  },
  {
    number: '4',
    title: 'View CIBIL Score Instantly',
    description: 'Receive your score and detailed report via email within 24 hours'
  }
];

const HIGH_SCORE_BENEFITS = [
  {
    icon: CheckCircle2,
    title: 'Easier Loan Approvals',
    description: 'Banks and NBFCs prioritize applicants with high credit scores'
  },
  {
    icon: Percent,
    title: 'Better Interest Rates',
    description: 'Save thousands in interest with lower APR offers on loans'
  },
  {
    icon: IndianRupee,
    title: 'Higher Credit Limits',
    description: 'Access larger loan amounts and credit card limits'
  },
  {
    icon: Clock,
    title: 'Faster Loan Processing',
    description: 'Quick approvals and faster disbursal for emergency needs'
  },
  {
    icon: Award,
    title: 'Premium Card Eligibility',
    description: 'Qualify for exclusive credit cards with best rewards'
  },
  {
    icon: Wallet,
    title: 'Negotiating Power',
    description: 'Leverage your score to negotiate better terms with lenders'
  }
];

const LOANS_BUZZ_HELP = [
  {
    icon: Shield,
    title: 'Free CIBIL Checks',
    description: 'Completely free credit score checks with no hidden charges or subscription fees'
  },
  {
    icon: Users,
    title: 'Expert Guidance',
    description: 'Personalized credit improvement advice from financial experts'
  },
  {
    icon: Building2,
    title: 'Access to 275+ Lenders',
    description: 'Connect with multiple financial products across loans, cards, and insurance'
  },
  {
    icon: TrendingUp,
    title: 'Credit Profile Support',
    description: 'Assistance in improving your credit score with actionable recommendations'
  }
];

const IMPROVEMENT_TIPS = [
  {
    icon: Calendar,
    title: 'Make Timely Payments',
    description: 'Pay all EMIs, credit card bills, and utility bills on or before the due date. Payment history is the most important factor affecting your score.'
  },
  {
    icon: Percent,
    title: 'Manage Credit Utilization',
    description: 'Keep your credit card utilization below 30% of the total limit. High utilization signals credit dependency and negatively impacts your score.'
  },
  {
    icon: BarChart3,
    title: 'Diversify Credit Mix',
    description: 'Maintain a healthy mix of secured loans (home, auto) and unsecured credit (personal loans, credit cards) to show responsible borrowing behavior.'
  },
  {
    icon: CreditCard,
    title: 'Use Secured Credit Cards',
    description: 'If your score is low, start with a secured credit card backed by fixed deposit to build or rebuild your credit history.'
  },
  {
    icon: Clock,
    title: 'Maintain Older Accounts',
    description: 'Keep your oldest credit accounts active. Longer credit history demonstrates stability and improves your score.'
  },
  {
    icon: FileText,
    title: 'Monitor Credit Reports',
    description: 'Check your credit report quarterly for errors, duplicate entries, or fraudulent accounts. Dispute inaccuracies immediately.'
  },
  {
    icon: TrendingDown,
    title: 'Avoid Frequent Hard Inquiries',
    description: 'Multiple loan or credit card applications in a short period result in hard inquiries that lower your score. Apply selectively.'
  },
  {
    icon: Lightbulb,
    title: 'Seek Professional Advice',
    description: 'If your score is significantly low, consult credit counselors or financial advisors for personalized improvement strategies.'
  }
];

const FAQS = [
  {
    question: 'What is a CIBIL score?',
    answer: 'A CIBIL score is a 3-digit number ranging from 300 to 900 that represents your creditworthiness. It is calculated by TransUnion CIBIL based on your credit history, repayment behavior, credit utilization, and other factors. Lenders use this score to assess the risk of lending to you. A higher score (750+) indicates better creditworthiness and increases your chances of loan approval with favorable terms.'
  },
  {
    question: 'What is the maximum CIBIL score possible?',
    answer: 'The maximum CIBIL score is 900, which represents perfect creditworthiness. However, scores above 750 are considered excellent and sufficient to qualify for the best loan offers and interest rates. Very few individuals achieve a score of 900, but maintaining a score above 750 ensures access to premium financial products.'
  },
  {
    question: 'How is my CIBIL score calculated?',
    answer: 'Your CIBIL score is calculated using multiple factors: Payment history (35%) - on-time vs delayed payments; Credit utilization (30%) - how much credit you use vs available limit; Length of credit history (15%) - age of your accounts; Credit mix (10%) - diversity of loan types; New credit inquiries (10%) - recent applications. Consistent on-time payments and low credit utilization are key to maintaining a high score.'
  },
  {
    question: 'What is the impact of late payments on my CIBIL score?',
    answer: 'Late payments have a significant negative impact on your CIBIL score. Even a single delay of 30+ days can reduce your score by 50-100 points depending on your overall credit profile. Multiple delays or defaults can severely damage your score and remain on your credit report for 7 years. Payment history is the most important factor (35%) in score calculation, so always prioritize timely repayments.'
  },
  {
    question: 'Does checking my own CIBIL score affect it?',
    answer: 'No, checking your own CIBIL score is considered a "soft inquiry" and does not affect your score at all. You can check your score as many times as you want without any negative impact. However, when lenders check your score during loan applications (hard inquiry), it may cause a small temporary decrease of 5-10 points. Multiple hard inquiries in a short period can impact your score more significantly.'
  },
  {
    question: 'What is the difference between a CIBIL score and a CIBIL report?',
    answer: 'A CIBIL score is a single 3-digit number (300-900) that summarizes your creditworthiness, while a CIBIL report is a comprehensive document containing your entire credit history. The report includes details of all your loans, credit cards, payment history, outstanding balances, credit inquiries, personal information, and public records. The score is derived from the information in your report. Think of the score as a summary grade and the report as the detailed report card.'
  },
  {
    question: 'Where can I check my CIBIL score for loans?',
    answer: 'You can check your CIBIL score through multiple channels: 1) Official CIBIL website (chargeable after first free check), 2) Financial platforms like Loans Buzz (free), 3) Bank mobile apps and internet banking (most banks offer free checks), 4) Credit card issuers often provide free monthly scores. Loans Buzz offers completely free CIBIL score checks with no hidden charges, making it convenient for regular monitoring.'
  },
  {
    question: 'What factors affect my CIBIL score?',
    answer: 'Key factors affecting your CIBIL score include: 1) Payment history - timely vs delayed payments, 2) Credit utilization ratio - percentage of credit limit used, 3) Length of credit history - age of oldest and newest accounts, 4) Credit mix - types of credit (secured/unsecured), 5) Hard inquiries - recent loan/card applications, 6) Outstanding debts - total amount owed, 7) Settled or written-off accounts, 8) Defaults, bankruptcies, or legal actions. Maintaining discipline across all these factors ensures a healthy credit score.'
  }
];

export function CheckCIBIL() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    pan: '',
    dob: ''
  });

  const [loading, setLoading] = useState(false);
  const [scoreData, setScoreData] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);


  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Validation Logic
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // PAN Regex: 5 letters, 4 numbers, 1 letter (e.g., ABCDE1234F)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.pan)) {
      newErrors.pan = "Invalid PAN format. format: ABCDE1234F";
    }

    // Phone Regex: 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.mobile)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.includes('@')) newErrors.email = "Invalid email address";
    if (!formData.dob) newErrors.dob = "Date of birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Register user
      await fetch("https://api.loansbuzz.in/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // 2️⃣ Fetch credit score
      const res = await fetch(
        `https://api.loansbuzz.in/api/v1/credit-score/${formData.mobile}`
      );

      const data = await res.json();

      if (data.success) {
          await new Promise((resolve) => setTimeout(resolve, 2000));

        setScoreData(data.data);
        
        setShowResult(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Auto capitalize PAN
    const finalValue = name === 'pan' ? value.toUpperCase() : value;

    setFormData({
      ...formData,
      [name]: finalValue
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const scrollToForm = () => {
    document.getElementById('cibil-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden">
     <CibilScoreModal showResult={showResult} setShowResult={setShowResult} scoreData={scoreData}/>



      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-16 md:py-24 relative overflow-hidden">
        {/* Abstract Background Shape */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <Shield className="w-16 h-16 mx-auto mb-6 text-primary" />
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Check Your CIBIL Score for Free
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-8">
              Get your credit score and detailed report in minutes.
              No hidden charges, completely secure and confidential.
            </motion.p>
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={scrollToForm} size="lg" className="text-lg px-8 shadow-lg shadow-primary/20">
                Check My Score Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introductory Context Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-white border-b"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            <strong>Loans Buzz</strong> is your trusted financial partner offering completely free access to your CIBIL
            score and credit report. Whether you're planning to apply for a home loan, personal loan, credit card, or
            simply want to monitor your financial health, checking your CIBIL score is the first step.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Our platform connects you with 275+ lenders and provides personalized credit improvement advice to help you
            achieve your financial goals. Start your credit journey today with a free CIBIL check.
          </p>
        </div>
      </motion.section>

      {/* What is a CIBIL Score */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            What is a CIBIL Score?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 shadow-md hover:shadow-xl transition-shadow border-slate-100">
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  A <strong>CIBIL score</strong> is a three-digit numerical representation of your creditworthiness,
                  ranging from <strong>300 to 900</strong>. It is calculated by TransUnion CIBIL, one of India's leading
                  credit information companies, based on your credit history and repayment behavior.
                </p>

                {/* Visual Placeholder for layout balance */}
                <div className="py-4 flex justify-center opacity-80">
                  {/* Diagram placeholder: Credit Score Factors Chart would go here */}
                  <div className="w-full max-w-md h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-primary/20"></div>
                  </div>
                </div>

                <p>
                  When you apply for any form of credit - be it a home loan, personal loan, auto loan, or credit card -
                  lenders check your CIBIL score to assess the risk of lending to you. A higher score indicates that you
                  have been responsible with credit in the past and are more likely to repay on time.
                </p>
                <p>
                  Your CIBIL score directly impacts:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Loan Approval:</strong> Higher scores dramatically increase approval chances</li>
                  <li><strong>Interest Rates:</strong> Better scores unlock lower interest rates, saving you money</li>
                  <li><strong>Credit Limits:</strong> Higher scores qualify you for larger loan amounts</li>
                  <li><strong>Processing Speed:</strong> Good scores result in faster approvals and disbursals</li>
                </ul>
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 mt-6">
                  <p className="font-semibold text-foreground text-center">
                    A score of 750 or above is considered excellent and gives you access to the best loan offers,
                    lowest interest rates, and premium financial products across India's top banks and NBFCs.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Importance of Checking Your CIBIL Score Online */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Importance of Checking Your CIBIL Score Online</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Regular credit monitoring is essential for maintaining financial health
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {IMPORTANCE_POINTS.map((point, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover">
                  <Card className="p-6 h-full border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <point.icon className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-lg">{point.title}</h3>
                        <p className="text-sm text-muted-foreground">{point.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CIBIL Score Range & Meaning */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">CIBIL Score Range & Meaning</h2>
            <p className="text-lg text-muted-foreground">
              Understand what your score means for loan eligibility and interest rates
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {SCORE_RANGES.map((range, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div whileHover={{ scale: 1.01, x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className={`p-6 ${range.bgColor} border-none shadow-sm`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2 flex-wrap gap-2">
                          <div className={`text-2xl font-bold ${range.color} mr-4`}>{range.range}</div>
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${range.color} bg-white shadow-sm`}>
                            {range.status}
                          </div>
                        </div>
                        <p className="text-sm text-foreground mb-2">{range.description}</p>
                        <p className="text-xs font-semibold text-foreground/80 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {range.approval}
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-full ${range.color.replace('text', 'bg')} flex-shrink-0 mt-2`} />
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How to Check Your CIBIL Score for Free */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Check Your CIBIL Score for Free</h2>
            <p className="text-lg text-muted-foreground">
              Simple 4-step process to access your credit score instantly
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {CHECKING_STEPS.map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="relative">
                <motion.div variants={cardHover} initial="rest" whileHover="hover" className="h-full">
                  <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow border-slate-100 relative z-10 bg-white">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                      <span className="text-xl font-bold text-white">{step.number}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </Card>
                </motion.div>
                {/* Connecting Line (Desktop Only) */}
                {index < CHECKING_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-primary/10 -z-0" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits of a High CIBIL Score */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of a High CIBIL Score</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A score of 750+ unlocks premium financial benefits
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {HIGH_SCORE_BENEFITS.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover">
                  <Card className="p-6 h-full border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2 text-lg">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How Loans Buzz Helps Manage Your CIBIL Score */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Loans Buzz Helps Manage Your CIBIL Score</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner for credit health and financial success
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {LOANS_BUZZ_HELP.map((help, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover" className="h-full">
                  <Card className="p-6 text-center h-full hover:shadow-xl transition-all border-slate-100">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <help.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-semibold mb-2">{help.title}</h3>
                    <p className="text-sm text-muted-foreground">{help.description}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tips to Improve Your CIBIL Score */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tips to Improve Your CIBIL Score</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Actionable strategies to boost your creditworthiness
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {IMPROVEMENT_TIPS.map((tip, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="p-6 h-full border-slate-100 hover:shadow-lg transition-all">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <tip.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{tip.title}</h3>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section id="cibil-form-section" className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Get Your Free CIBIL Report</h2>
              <Card className="p-8 shadow-xl border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name (as per PAN) *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className={`focus:ring-2 focus:ring-primary/20 ${errors.fullName ? "border-red-500" : ""}`}
                    />
                    {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
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
                      className={`focus:ring-2 focus:ring-primary/20 ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      placeholder="98765 43210"
                      maxLength={10}
                      className={`focus:ring-2 focus:ring-primary/20 ${errors.mobile ? "border-red-500" : ""}`}
                    />
                    {errors.mobile && <p className="text-xs text-red-500">{errors.mobile}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number *</Label>
                    <Input
                      id="pan"
                      name="pan"
                      value={formData.pan}
                      onChange={handleChange}
                      required
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      className={`uppercase focus:ring-2 focus:ring-primary/20 ${errors.pan ? "border-red-500" : ""}`}
                    />
                    {errors.pan && <p className="text-xs text-red-500">{errors.pan}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className={`focus:ring-2 focus:ring-primary/20 ${errors.dob ? "border-red-500" : ""}`}
                    />
                    {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start"
                  >
                    <AlertCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      Your information is completely secure and will only be used to fetch your CIBIL score.
                      We follow industry-standard security protocols.
                    </p>
                  </motion.div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? "Processing Request..." : "Get My CIBIL Score"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By clicking submit, you consent to Loans Buzz fetching your credit report from CIBIL
                  </p>
                </form>
              </Card>
            </motion.div>

            {/* Why Check Side Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Check Your CIBIL Score?</h2>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {WHY_CHECK_SCORE.map((item, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <motion.div whileHover={{ x: 5 }} transition={{ type: "spring" }}>
                        <Card className="p-6 border-slate-100 hover:shadow-md transition-all">
                          <div className="flex items-start">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                              <item.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                              <p className="text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about CIBIL scores</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {FAQS.map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="overflow-hidden border-slate-200">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="font-semibold pr-4">{faq.question}</h3>
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
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-muted-foreground border-t pt-4 border-slate-100">{faq.answer}</p>
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
    </div>
  );
}