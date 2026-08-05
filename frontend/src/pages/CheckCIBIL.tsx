import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import {
  Shield, CheckCircle2, TrendingUp, AlertCircle, BarChart3,
  FileText, Clock, Award, Zap, IndianRupee, Calendar,
  CreditCard, Eye, Lightbulb, TrendingDown, Users,
  ChevronDown, ChevronUp, Wallet, Building2, Percent, Activity,
  ExternalLink, Loader
} from 'lucide-react';
import { motion, Variants, AnimatePresence, delay } from 'framer-motion';
import CibilScoreModal from './CibilScoreModal';
import { getAuthToken, API_BASE_URL } from '../lib/auth';

// --- ANIMATION VARIANTS ---
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
    dob: '',
    gender: '',
    employmentType: '',
    reportType: '',
    consent: '',
    salaryAmount: '',
    address: '',
    state: '',
    pincode: '',
  });

  const [loading, setLoading] = useState(false);
  const [scoreData, setScoreData] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);

  // --- Email OTP verification state ---
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // --- FORM VALIDATION ---
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
    if (!emailVerified) newErrors.email = "Please verify your email before submitting";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Please select your gender";

    if (!formData.employmentType) {
      newErrors.employmentType = "Please select your employment type";
    }

    // Salary is only required once an employment type is chosen
    if (formData.employmentType) {
      if (!formData.salaryAmount || !formData.salaryAmount.toString().trim()) {
        newErrors.salaryAmount =
          formData.employmentType === "salaried"
            ? "Monthly salary is required"
            : "Monthly income is required";
      } else if (isNaN(Number(formData.salaryAmount)) || Number(formData.salaryAmount) <= 0) {
        newErrors.salaryAmount = "Please enter a valid amount";
      }
    }

    if (!formData.reportType) newErrors.reportType = "Please select a report type";

    // --- CONDITIONAL VALIDATION FOR EQUIFAX ---
    if (formData.reportType === "equifax-pdf") {
      if (!formData.address.trim()) newErrors.address = "Full address is required for Equifax";
      if (!formData.state) newErrors.state = "State code is required for Equifax";
      if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = "Valid 6-digit pincode is required for Equifax";
      }
    }

    if (formData.consent !== "Y") {
      newErrors.consent = "Please accept the consent to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- OTP HANDLERS ---
  const handleSendOtp = async () => {
    if (!formData.email.includes('@')) {
      setErrors(prev => ({ ...prev, email: "Enter a valid email before requesting a code" }));
      return;
    }
    setOtpSending(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/email/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
      } else {
        setErrors(prev => ({ ...prev, email: data.error || "Could not send verification code" }));
      }
    } catch (err) {
      console.error(err);
      setErrors(prev => ({ ...prev, email: "Could not send verification code" }));
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpVerifying(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/email/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailVerified(true);
        setErrors(prev => ({ ...prev, email: '' }));
      } else {
        setErrors(prev => ({ ...prev, email: data.error || "Invalid code, please try again" }));
      }
    } catch (err) {
      console.error(err);
      setErrors(prev => ({ ...prev, email: "Invalid code, please try again" }));
    } finally {
      setOtpVerifying(false);
    }
  };

  // --- MAIN FORM SUBMISSION ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!emailVerified) {
      setErrors(prev => ({ ...prev, email: "Please verify your email before submitting" }));
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    setGeneratingReport(true);

    try {
      // 1️⃣ Register user (internal backend)
      await fetch("https://api.loansbuzz.in/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(err => console.log("User registration (non-critical):", err));

      // 2️⃣ GET AUTH TOKEN
      const authToken = typeof window !== "undefined" ? getAuthToken() : null;
      if (!authToken) {
        setErrors(prev => ({ ...prev, reportType: "Please log in to generate a report" }));
        setLoading(false);
        setGeneratingReport(false);
        return;
      }

      // 3️⃣ CALL GENERATE REPORT ENDPOINT
      const payload: Record<string, any> = {
        name: formData.fullName,
        mobile: formData.mobile,
        pan_card: formData.pan,
        gender: formData.gender,
        consent: formData.consent,
        reportType: formData.reportType,
        dob: formData.dob,
      };

      // Add optional fields for Equifax
      if (formData.reportType === "equifax-pdf") {
        payload.address = formData.address;
        payload.state = formData.state;
        payload.pincode = formData.pincode;
      }

      const res = await fetch(`${API_BASE_URL}/api/generate-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        setErrors(prev => ({ ...prev, reportType: data.error || "Failed to generate report" }));
        setLoading(false);
        setGeneratingReport(false);
        return;
      }

      // 4️⃣ HANDLE RESPONSE BASED ON REPORT TYPE
      if (formData.reportType === "cibil-score-only") {
        // Score-only: just show modal with score
        setScoreData(data);
        setShowResult(true);
        setSuccessMessage('✅ CIBIL Score retrieved successfully!');
      } else {
        // PDF Reports: open in new tab
        if (data.reportUrl && !data.reportUrl.startsWith("score:")) {
          window.open(data.reportUrl, "_blank", "noopener,noreferrer");
          setSuccessMessage(`✅ ${formData.reportType.toUpperCase()} report opened in a new tab!`);
        }
        setScoreData(data);
      }

      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          mobile: '',
          pan: '',
          dob: '',
          gender: '',
          employmentType: '',
          reportType: '',
          consent: '',
          salaryAmount: '',
          address: '',
          state: '',
          pincode: '',
        });
        setEmailVerified(false);
        setOtpSent(false);
        setOtp('');
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrors(prev => ({
        ...prev,
        reportType: "An error occurred while generating the report. Please try again."
      }));
    } finally {
      setLoading(false);
      setGeneratingReport(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Auto capitalize PAN
    const finalValue = name === 'pan' ? value.toUpperCase() : value;

    setFormData({
      ...formData,
      [name]: finalValue
    });

    // Editing the email invalidates any prior verification
    if (name === 'email') {
      setEmailVerified(false);
      setOtpSent(false);
      setOtp('');
    }

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
      <CibilScoreModal showResult={showResult} setShowResult={setShowResult} scoreData={scoreData} />

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
              Check Your Credit Reports for Free
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-8">
              Get CIBIL, Experian, CRIF & Equifax reports instantly.
              No hidden charges, completely secure and confidential.
            </motion.p>
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={scrollToForm} size="lg" className="text-lg px-8 shadow-lg shadow-primary/20">
                Get Your Report Now
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
            <strong>Loans Buzz</strong> provides free access to your credit reports from multiple bureaus.
            Choose from CIBIL, Experian, CRIF, or Equifax reports, or get your CIBIL score instantly.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Our platform connects you with 275+ lenders and provides personalized credit improvement advice.
            Start your credit journey today with a free report check.
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
                  ranging from <strong>300 to 900</strong>. It is calculated by TransUnion CIBIL based on your credit history and repayment behavior.
                </p>
                <div className="py-4 flex justify-center opacity-80">
                  <div className="w-full max-w-md h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-primary/20"></div>
                  </div>
                </div>
                <p>
                  When you apply for any form of credit, lenders check your CIBIL score to assess lending risk.
                  A higher score indicates responsible credit management.
                </p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Check Your Credit Reports?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Regular credit monitoring is essential for financial health
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
              Understand what your score means for loan eligibility
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
              <h2 className="text-3xl font-bold mb-6">Get Your Credit Report</h2>
              
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-green-800">{successMessage}</p>
                </motion.div>
              )}

              <Card className="p-8 shadow-xl border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
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

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        disabled={emailVerified}
                        className={`focus:ring-2 focus:ring-primary/20 ${errors.email ? "border-red-500" : ""}`}
                      />
                      {!emailVerified && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleSendOtp}
                          disabled={otpSending || !formData.email.includes('@')}
                          className="whitespace-nowrap"
                        >
                          {otpSending ? "Sending..." : otpSent ? "Resend" : "Send Code"}
                        </Button>
                      )}
                    </div>

                    {otpSent && !emailVerified && (
                      <div className="flex gap-2 pt-1">
                        <Input
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                        />
                        <Button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={otpVerifying || otp.length === 0}
                          className="whitespace-nowrap"
                        >
                          {otpVerifying ? "Verifying..." : "Verify"}
                        </Button>
                      </div>
                    )}

                    {emailVerified && (
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Email verified
                      </p>
                    )}
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Mobile */}
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
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

                  {/* PAN */}
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

                  {/* DOB */}
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

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <div className="flex gap-3">
                      <label
                        className={`flex-1 flex items-center justify-center gap-2 rounded-lg border py-3 px-4 cursor-pointer text-sm font-medium transition-all ${formData.gender === "male"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-foreground hover:bg-muted"
                          }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === "male"}
                          onChange={handleChange}
                          className="sr-only"
                          required
                        />
                        Male
                      </label>
                      <label
                        className={`flex-1 flex items-center justify-center gap-2 rounded-lg border py-3 px-4 cursor-pointer text-sm font-medium transition-all ${formData.gender === "female"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-foreground hover:bg-muted"
                          }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === "female"}
                          onChange={handleChange}
                          className="sr-only"
                          required
                        />
                        Female
                      </label>
                    </div>
                    {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
                  </div>

                  {/* Employment Type */}
                  <div className="space-y-2">
                    <Label>Employment Type *</Label>
                    <div className="flex gap-3">
                      <label
                        className={`flex-1 flex items-center justify-center gap-2 rounded-lg border py-3 px-4 cursor-pointer text-sm font-medium transition-all ${formData.employmentType === "salaried"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-foreground hover:bg-muted"
                          }`}
                      >
                        <input
                          type="radio"
                          name="employmentType"
                          value="salaried"
                          checked={formData.employmentType === "salaried"}
                          onChange={handleChange}
                          className="sr-only"
                          required
                        />
                        Salaried
                      </label>
                      <label
                        className={`flex-1 flex items-center justify-center gap-2 rounded-lg border py-3 px-4 cursor-pointer text-sm font-medium transition-all ${formData.employmentType === "self-employed"
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border text-foreground hover:bg-muted"
                          }`}
                      >
                        <input
                          type="radio"
                          name="employmentType"
                          value="self-employed"
                          checked={formData.employmentType === "self-employed"}
                          onChange={handleChange}
                          className="sr-only"
                          required
                        />
                        Self-Employed
                      </label>
                    </div>
                    {errors.employmentType && <p className="text-xs text-red-500">{errors.employmentType}</p>}
                  </div>

                  {/* Salary/Income */}
                  <div className="space-y-2">
                    <Label htmlFor="salaryAmount">
                      {formData.employmentType === "self-employed" ? "Monthly Income *" : "Monthly Salary *"}
                    </Label>
                    <Input
                      id="salaryAmount"
                      name="salaryAmount"
                      type="number"
                      value={formData.salaryAmount}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 45000"
                      className={`focus:ring-2 focus:ring-primary/20 ${errors.salaryAmount ? "border-red-500" : ""}`}
                    />
                    {errors.salaryAmount && <p className="text-xs text-red-500">{errors.salaryAmount}</p>}
                  </div>

                  {/* Report Type */}
                  <div className="space-y-2">
                    <Label htmlFor="reportType">Select Report *</Label>
                    <select
                      id="reportType"
                      name="reportType"
                      value={formData.reportType}
                      onChange={handleChange}
                      required
                      className={`w-full h-10 rounded-md border bg-background px-3 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none ${errors.reportType ? "border-red-500" : "border-input"
                        }`}
                    >
                      <option value="" disabled>
                        Choose a report type
                      </option>
                      <option value="cibil-pdf">📊 CIBIL PDF Report</option>
                      {/* <option value="experian-pdf">📊 Experian PDF Report</option> */}
                      {/* <option value="crif-pdf">📊 CRIF PDF Report</option> */}
                      {/* <option value="equifax-pdf">📊 Equifax PDF Report</option> */}
                      {/* <option value="cibil-score-only">⚡ CIBIL Score Only (Instant)</option> */}
                    </select>
                    {errors.reportType && <p className="text-xs text-red-500">{errors.reportType}</p>}
                  </div>

                  {/* Conditional Equifax Fields */}
                  {formData.reportType === "equifax-pdf" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <p className="text-sm font-semibold text-blue-900">Equifax requires additional details:</p>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Full Address *</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="House no, street, area, etc."
                          className={`focus:ring-2 focus:ring-primary/20 ${errors.address ? "border-red-500" : ""}`}
                        />
                        {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State Code *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="e.g., HR, CH, MH"
                          maxLength={2}
                          className={`uppercase focus:ring-2 focus:ring-primary/20 ${errors.state ? "border-red-500" : ""}`}
                        />
                        {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="6-digit pincode"
                          maxLength={6}
                          className={`focus:ring-2 focus:ring-primary/20 ${errors.pincode ? "border-red-500" : ""}`}
                        />
                        {errors.pincode && <p className="text-xs text-red-500">{errors.pincode}</p>}
                      </div>
                    </motion.div>
                  )}

                  {/* Security Info */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start"
                  >
                    <AlertCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      Your information is completely secure and encrypted. We follow industry-standard security protocols.
                    </p>
                  </motion.div>

                  {/* Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={formData.consent === "Y"}
                      onChange={(e) =>
                        handleChange({
                          target: { name: "consent", value: e.target.checked ? "Y" : "" },
                        } as any)
                      }
                      required
                      className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary/20"
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground">
                      I authorize Loans Buzz to fetch my credit report from the selected bureau(s). I confirm the details provided above are accurate.
                    </label>
                  </div>
                  {errors.consent && <p className="text-xs text-red-500">{errors.consent}</p>}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2"
                    disabled={loading || !emailVerified}
                  >
                    {generatingReport ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Generating Report...
                      </>
                    ) : !emailVerified ? (
                      "Verify Email to Continue"
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4" />
                        Get Report (Opens in New Tab)
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By clicking submit, you consent to Loans Buzz fetching your credit report and agree to the ₹199 processing fee.
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
                <h2 className="text-3xl font-bold mb-6">Why Check Your Report?</h2>
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
                              <p className="text-muted-foreground text-sm">{item.description}</p>
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
            <p className="text-muted-foreground">Everything you need to know about credit reports</p>
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