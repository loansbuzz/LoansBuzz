import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Heart,
  Shield,
  Building2,
  CheckCircle2,
  Users,
  Clock,
  IndianRupee,
  Car,
  Home,
  Plane,
  Briefcase,
  AlertCircle,
  FileText,
  TrendingUp,
  Activity,
  Umbrella,
  DollarSign,
  Hospital,
  LifeBuoy,
  UserPlus,
  Scale,
  ShieldCheck,
  ClipboardCheck,
  ArrowRight
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion, Variants } from 'framer-motion';
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

export function Insurance() {
  const [contactForm, setContactForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    insuranceType: ''
  });

  const insuranceProducts = [
    {
      icon: Heart,
      name: 'Life Insurance',
      description: 'Secure your family\'s financial future with comprehensive life coverage',
      features: [
        'Cover up to ₹2 Crore',
        'Tax benefits under 80C',
        'Flexible premium options',
        'Starting from ₹450/month*'
      ],
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      icon: Shield,
      name: 'Health Insurance',
      description: 'Protect yourself and your family from medical emergencies',
      features: [
        'Cashless hospitalization',
        'Cover up to ₹1 Crore',
        'Pre and post hospitalization',
        'Starting from ₹450/month*'
      ],
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Building2,
      name: 'General Insurance',
      description: 'Comprehensive protection for your assets and liabilities',
      features: [
        'Home insurance',
        'Motor insurance',
        'Travel insurance',
        'Starting from ₹450/month*'
      ],
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Multiple Options',
      description: 'Compare plans from 50+ insurance providers'
    },
    {
      icon: Clock,
      title: 'Instant Quotes',
      description: 'Get personalized quotes in seconds'
    },
    {
      icon: IndianRupee,
      title: 'Best Prices',
      description: 'Guaranteed lowest premiums in the market'
    }
  ];

  const lifeInsuranceTypes = [
    {
      icon: Shield,
      title: 'Basic Life Insurance Plans',
      description: 'Pure protection with term coverage for financial security of dependents'
    },
    {
      icon: AlertCircle,
      title: 'Life Insurance with Accidental Death Cover',
      description: 'Enhanced coverage with additional payout in case of accidental death'
    },
    {
      icon: Activity,
      title: 'Life Insurance with Critical Illness Cover',
      description: 'Protection against life-threatening illnesses with lump sum payout'
    },
    {
      icon: TrendingUp,
      title: 'Endowment & Savings Plans',
      description: 'Insurance combined with savings and investment components'
    }
  ];

  const generalInsuranceTypes = [
    {
      icon: Car,
      title: 'Auto Insurance',
      description: 'Comprehensive coverage for your car, bike, or commercial vehicle against damages and third-party liabilities'
    },
    {
      icon: Home,
      title: 'Home & Property Insurance',
      description: 'Protection for your home and belongings against fire, theft, natural disasters, and other risks'
    },
    {
      icon: Plane,
      title: 'Travel Insurance',
      description: 'Coverage for trip cancellations, medical emergencies, lost baggage, and other travel-related incidents'
    },
    {
      icon: Briefcase,
      title: 'Business Insurance',
      description: 'Protect your business assets, inventory, and operations from various commercial risks'
    }
  ];

  const healthCoverageAspects = [
    {
      icon: Hospital,
      title: 'Hospitalization Coverage',
      description: 'Covers in-patient treatment, room rent, ICU charges, and medical procedures'
    },
    {
      icon: FileText,
      title: 'Pre & Post Hospitalization',
      description: 'Coverage for medical expenses before and after hospitalization as per policy terms'
    },
    {
      icon: Users,
      title: 'Network Hospitals',
      description: 'Access to cashless treatment at thousands of partner hospitals across India'
    },
    {
      icon: Activity,
      title: 'Preventive Care',
      description: 'Annual health check-ups and preventive screenings included in many policies'
    },
    {
      icon: AlertCircle,
      title: 'Emergency Coverage',
      description: 'Ambulance services and emergency medical treatment covered'
    },
    {
      icon: Shield,
      title: 'Critical Illness Add-on',
      description: 'Optional coverage for specific critical illnesses with lump sum payout'
    }
  ];

  const importantAspects = [
    {
      icon: ShieldCheck,
      title: 'Coverage',
      description: 'Ensure the sum insured is adequate for your needs and family size'
    },
    {
      icon: IndianRupee,
      title: 'Premium & Cost',
      description: 'Compare premiums across insurers while considering coverage benefits'
    },
    {
      icon: DollarSign,
      title: 'Deductibles & Co-payments',
      description: 'Understand out-of-pocket expenses you\'ll need to bear during claims'
    },
    {
      icon: Hospital,
      title: 'Network Coverage',
      description: 'Check availability of network hospitals in your city for cashless treatment'
    },
    {
      icon: FileText,
      title: 'Claim Process',
      description: 'Review claim settlement ratio and ease of claim process'
    },
    {
      icon: AlertCircle,
      title: 'Exclusions',
      description: 'Read policy exclusions carefully to know what\'s not covered'
    },
    {
      icon: Clock,
      title: 'Waiting Periods',
      description: 'Be aware of initial waiting periods for specific diseases and treatments'
    },
    {
      icon: ClipboardCheck,
      title: 'Renewability',
      description: 'Check lifetime renewability and portability options'
    }
  ];

  const advantages = [
    {
      icon: Shield,
      title: 'Financial Protection',
      description: 'Safeguards you and your family from unexpected financial burdens'
    },
    {
      icon: Heart,
      title: 'Peace of Mind',
      description: 'Live worry-free knowing you\'re protected against life\'s uncertainties'
    },
    {
      icon: Users,
      title: 'Risk Sharing',
      description: 'Spreads financial risk across a large pool of policyholders'
    },
    {
      icon: Scale,
      title: 'Legal Compliance',
      description: 'Meets mandatory insurance requirements like motor third-party coverage'
    },
    {
      icon: TrendingUp,
      title: 'Long-term Financial Planning',
      description: 'Helps achieve financial goals through savings and investment-linked plans'
    },
    {
      icon: IndianRupee,
      title: 'Tax Benefits',
      description: 'Avail deductions under sections 80C, 80D of Income Tax Act'
    }
  ];
  const [loading, setloading] = useState<boolean>(false);
  const API_BASE_URL = "https://loansbuzz.vercel.app";

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setloading(true);

      console.log("Submitting form:", contactForm);

      const res = await fetch(`${API_BASE_URL}/api/insurance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit form");
      }
      await delay(2000); // your 2 sec loader

      // ✅ Success toast
      toast.success("Message sent successfully!", {
        duration: 2000,
      });

      // ✅ Clear form
      setContactForm({
        fullName: "",
        email: "",
        phone: "",
        insuranceType: "",

      });

    } catch (error: any) {
      console.error("CONTACT_FORM_ERROR:", error);

      toast.error(error.message || "Something went wrong", {
        duration: 2000,
      });
    } finally {
      setloading(false);
    }
  };


  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold">
                Protect What Matters Most
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-muted-foreground">
                Comprehensive insurance solutions to safeguard your family, health, and assets.
                Compare and choose from 50+ leading insurance providers.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/contact">Get Free Quote</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-64 md:h-96 lg:h-[400px]"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1659352786973-82ae3af461a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjBwcm90ZWN0aW9uJTIwZmFtaWx5fGVufDF8fHx8MTc2NzkwMzQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Insurance Protection"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insurance Inquiry Form */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 bg-white border-y border-border"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Get Your Free Insurance Quote</h2>
            <p className="text-muted-foreground">Fill in your details and our experts will contact you</p>
          </div>
          <Card className="p-6 md:p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={contactForm.fullName}
                  onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Enter your phone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Insurance Type</label>
                <select
                  required
                  value={contactForm.insuranceType}
                  onChange={(e) => setContactForm({ ...contactForm, insuranceType: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-white"
                >
                  <option value="">Select insurance type</option>
                  <option value="Life Insurance">Life Insurance</option>
                  <option value="Health Insurance">Health Insurance</option>
                  <option value="Motor Insurance">Motor Insurance</option>
                  <option value="Home Insurance">Home Insurance</option>
                  <option value="Travel Insurance">Travel Insurance</option>
                </select>

              </div>
              <div className="md:col-span-2">
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
                    "Submit Form"
                  )}
                </Button>

              </div>
            </form>
          </Card>
        </div>
      </motion.section>

      {/* Insurance in India - Introduction */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Insurance in India: Check & Compare</h2>
          <div className="space-y-4 text-lg text-muted-foreground text-center">
            <p>
              Insurance has become an essential part of financial planning for millions of Indian families. With rising
              healthcare costs, increasing life uncertainties, and growing asset values, having the right insurance coverage
              is no longer optional—it's a necessity.
            </p>
            <p>
              India's insurance sector offers a wide array of products designed to meet diverse needs—from protecting your
              family's future to securing your health, vehicles, home, and business. With over 50+ insurance providers in
              the market, comparing policies and making informed decisions can be overwhelming.
            </p>
            <p>
              At Loans Buzz, we simplify this process by providing unbiased comparisons, expert guidance, and complete
              transparency—helping you choose the best insurance coverage for your unique requirements.
            </p>
          </div>

        </motion.div>
      </section>

      {/* What is Insurance */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">What is Insurance?</h2>
            <Card className="p-8">
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  <strong>Insurance</strong> is a financial arrangement that provides protection against potential future losses
                  or unforeseen events. It is a contract (called a policy) between an individual or organization (the policyholder)
                  and an insurance company (the insurer).
                </p>
                <p>
                  Under this contract, the policyholder pays a regular amount called a <strong>premium</strong> to the insurance
                  company. In return, the insurer agrees to compensate the policyholder financially if a covered event—such as
                  illness, accident, death, or property damage—occurs.
                </p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-primary/10 p-6 rounded-lg border border-primary/20 mt-6"
                >
                  <p className="font-semibold text-foreground mb-2">Why Insurance Exists:</p>
                  <ul className="space-y-2">
                    {[
                      "To protect against financial loss from unexpected events",
                      "To provide financial security to dependents and family members",
                      "To enable affordable access to expensive medical treatments and services",
                      "To safeguard valuable assets like homes, vehicles, and businesses"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How Does Insurance Work */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            How Does Insurance Work?
          </motion.h2>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="p-8">
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Insurance operates on the principle of <strong>risk pooling</strong> and <strong>risk sharing</strong>.
                  Here's how it works in simple terms:
                </p>


                <div className="space-y-6 mt-6">
                  {[
                    { title: "Premium Pooling", desc: "Many individuals pay regular premiums to the insurance company. These premiums are pooled together to create a large fund." },
                    { title: "Risk Assessment", desc: "The insurance company evaluates the risk associated with each policyholder based on factors like age, health, lifestyle, and type of coverage." },
                    { title: "Claim Payout", desc: "When an insured event occurs (such as hospitalization, accident, or death), the policyholder or beneficiary files a claim." },
                    { title: "Risk Distribution", desc: "Since not all policyholders will file claims at the same time, the financial risk is distributed across the entire pool." }
                  ].map((step, i) => (
                    <motion.div key={i} variants={fadeInUp} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">{i + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                        <p>{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  variants={fadeInUp}
                  className="bg-secondary/10 p-6 rounded-lg border border-secondary/20 mt-6"
                >
                  <p className="font-semibold text-foreground">
                    In essence, insurance is a collective safety net where everyone contributes a small amount to protect
                    each other from large, unexpected financial losses.
                  </p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Key Insurance Concepts */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Key Insurance Concepts
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-8 h-full">
                <div className="flex items-start space-x-4 mb-4">
                  <IndianRupee className="w-10 h-10 text-primary flex-shrink-0" />
                  <h3 className="text-2xl font-bold">What is an Insurance Premium?</h3>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    An <strong>insurance premium</strong> is the amount you pay to the insurance company to keep your
                    policy active. It is the price of your insurance coverage.
                  </p>
                  <p>
                    Premiums can be paid monthly, quarterly, semi-annually, or annually. The amount is determined based on:
                  </p>
                  <ul className="space-y-2 ml-4">
                    {["Type and amount of coverage", "Your age, health status, and lifestyle", "Policy duration and benefits", "Risk factors associated with the coverage"].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8 h-full">
                <div className="flex items-start space-x-4 mb-4">
                  <FileText className="w-10 h-10 text-secondary flex-shrink-0" />
                  <h3 className="text-2xl font-bold">What is an Insurance Claim?</h3>
                </div>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    An <strong>insurance claim</strong> is a formal request made by the policyholder to
                    the insurance company for compensation or coverage for a covered loss or event.
                  </p>


                  [Image of insurance claim process flow chart]

                  <p>
                    When you experience an event covered by your policy, the claim process typically involves:
                  </p>
                  <ul className="space-y-2 ml-4">
                    {["Notifying the insurance company promptly", "Submitting necessary documents and proofs", "Claim verification and assessment by the insurer", "Approval and payment of the claim amount"].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Insurance Products */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Types of Insurance</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insurance in India is broadly categorized into three main types, each designed to protect different aspects of your life
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {insuranceProducts.map((product, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover">
                  <Card className="p-8 h-full transition-shadow hover:shadow-xl">
                    <div className={`w-16 h-16 ${product.bgColor} rounded-full flex items-center justify-center mb-6`}>
                      <product.icon className={`w-8 h-8 ${product.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                    <p className="text-muted-foreground mb-6">{product.description}</p>
                    <ul className="space-y-3 mb-6">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-secondary hover:bg-secondary/90 group">
                      Get Quote <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Life Insurance Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-red-500 mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold">Life Insurance</h2>
            </div>
            <Card className="p-8">
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  <strong>Life Insurance</strong> is a financial product that provides a lump sum payment to your
                  beneficiaries (usually family members) in the event of your death. It ensures that your loved ones
                  are financially secure even in your absence.
                </p>
                <p>
                  Life insurance serves multiple purposes: it replaces lost income, pays off debts and mortgages, covers
                  funeral expenses, funds children's education, and provides long-term financial stability to dependents.
                </p>
                <p>
                  In India, life insurance policies offer <strong>tax benefits under Section 80C</strong> for premium
                  payments and <strong>Section 10(10D)</strong> for maturity proceeds, making them an attractive tool for
                  both protection and tax planning.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Types of Life Insurance Plans */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Types of Life Insurance Plans
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {lifeInsuranceTypes.map((type, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover">
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <type.icon className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* General Insurance Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-6">
              <Building2 className="w-12 h-12 text-green-500 mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold">General Insurance</h2>
            </div>
            <Card className="p-8">
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  <strong>General Insurance</strong> provides coverage for assets and properties other than life. It protects
                  you against financial losses arising from damage to or loss of your belongings, vehicles, home, business,
                  and other valuable possessions.
                </p>
                <p>
                  Unlike life insurance, general insurance policies are typically short-term (usually one year) and need to
                  be renewed annually. They cover specific risks as mentioned in the policy document.
                </p>
                <p>
                  General insurance operates on the principle of <strong>indemnity</strong>—meaning the insurer compensates
                  you for the actual loss incurred, up to the sum insured.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Types of General Insurance Plans */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Types of General Insurance Plans
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {generalInsuranceTypes.map((type, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover">
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <type.icon className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Health Insurance Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-12 h-12 text-blue-500 mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold">Health Insurance</h2>
            </div>
            <Card className="p-8">
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  <strong>Health Insurance</strong> is a type of insurance that covers medical and surgical expenses incurred
                  by the insured. It provides financial protection against the rising costs of healthcare in India.
                </p>
                <p>
                  With hospitalization costs increasing by 10-15% annually, health insurance has become essential for every
                  family. It ensures that you can access quality medical treatment without depleting your savings.
                </p>
                <p>
                  Additionally, health insurance premiums qualify for <strong>tax deductions under Section 80D</strong> of the
                  Income Tax Act.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Health Insurance Coverage Details */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Health Insurance Coverage
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {healthCoverageAspects.map((aspect, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover">
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                      <aspect.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="font-semibold mb-2">{aspect.title}</h3>
                    <p className="text-sm text-muted-foreground">{aspect.description}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Important Aspects & Advantages */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Important Aspects While Buying Insurance</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Make informed decisions by considering these critical factors before purchasing any insurance policy
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {importantAspects.map((aspect, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <aspect.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{aspect.title}</h3>
                  <p className="text-sm text-muted-foreground">{aspect.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Advantages of Buying Insurance
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {advantages.map((advantage, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <advantage.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{advantage.title}</h3>
                  <p className="text-sm text-muted-foreground">{advantage.description}</p>
                </Card>
              </motion.div>
            ))}
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
            Get Your Free Insurance Quote Today
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Compare plans and find the perfect coverage for you and your family
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90 text-lg px-8 shadow-2xl">
              <Link to="/contact">Talk to an Expert</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}