import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Phone, Mail, MapPin, Clock, Shield, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { Toaster } from "sonner";
import { toast } from 'sonner';

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

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });




  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const API_BASE_URL = "https://loansbuzz.vercel.app";

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    await delay(2000); // your 2 sec loader

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      
    });

    toast.success("Message sent successfully!", {
      description: "Our team will contact you within 24 hours.",
    });

  } catch (err) {
    toast.error("Something went wrong", {
      description: "Please try again later.",
    });
  } finally {
    setLoading(false);
  }
};



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['1800-XXX-XXXX (Toll Free)', '+91 XXXXX XXXXX'],
      color: 'text-primary'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@loansbuzz.com', 'support@loansbuzz.com'],
      color: 'text-secondary'
    },
    {
      icon: MapPin,
      title: 'Head Office',
      details: ['123, Business Tower', 'Mumbai, Maharashtra 400001'],
      color: 'text-primary'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Saturday: 9:00 AM - 7:00 PM', 'Sunday: Closed'],
      color: 'text-secondary'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-secondary/10 py-16 md:py-24 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Get in Touch
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground leading-relaxed">
              Have questions? We're here to help. Reach out to our team and we'll respond as soon as possible.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <motion.div
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  className="h-full"
                >
                  <Card className="p-6 text-center h-full hover:shadow-xl transition-shadow border-slate-100">
                    <div className={`w-12 h-12 ${info.color === 'text-primary' ? 'bg-primary/10' : 'bg-secondary/10'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <info.icon className={`w-6 h-6 ${info.color}`} />
                    </div>
                    <h3 className="font-semibold mb-3 text-lg">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Send Us a Message</h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and our team will get back to you within 24 hours
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Card className="p-8 md:p-12 shadow-lg border-slate-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                      className="focus:ring-2 focus:ring-primary/20 transition-all"
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
                      className="focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                      className="focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="loan-inquiry">Loan Inquiry</option>
                      <option value="insurance">Insurance</option>
                      <option value="credit-card">Credit Card</option>
                      <option value="mutual-funds">Mutual Funds</option>
                      <option value="dsa-partner">DSA Partnership</option>
                      <option value="support">Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
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

              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Map or Additional Info */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            {[
              { val: '4,000+', title: 'Cities Covered', sub: 'Pan-India presence', color: 'text-primary' },
              { val: '24/7', title: 'Customer Support', sub: 'Always here to help', color: 'text-secondary' },
              { val: '25+ Years', title: 'Industry Experience', sub: 'Trusted expertise', color: 'text-primary' }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="p-8 border-none shadow-md hover:shadow-xl transition-all">
                    <div className={`text-3xl font-bold ${item.color} mb-2`}>{item.val}</div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.sub}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Compliance & Transparency Note */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Important: Official Communication Channels</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span><strong>No Charges for Support:</strong> Loans Buzz does not charge customers for enquiries, consultations, or support services.</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span><strong>Official Channels Only:</strong> We communicate only through the phone numbers, email addresses, and office address listed on this page.</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span><strong>Beware of Fraud:</strong> Do not share sensitive information with anyone claiming to represent Loans Buzz through unofficial channels.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact FAQs */}
      <section className="py-16 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-center"
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
            {/* FAQ Item 1 */}
            <motion.div variants={fadeInUp}>
              <Card className="overflow-hidden border-slate-200">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 0 ? null : 0)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold pr-4">When can I expect a response to my inquiry?</h3>
                  {openFAQ === 0 ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFAQ === 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-muted-foreground">
                      Our support team responds to all inquiries within 24 hours during business days (Monday-Saturday).
                      For urgent loan or credit-related queries, you can call our toll-free number for immediate assistance
                      during business hours (9:00 AM - 7:00 PM).
                    </p>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* FAQ Item 2 */}
            <motion.div variants={fadeInUp}>
              <Card className="overflow-hidden border-slate-200">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold pr-4">Which email should I use for loan-related queries?</h3>
                  {openFAQ === 1 ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFAQ === 1 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-muted-foreground">
                      For loan inquiries, credit cards, insurance, or mutual fund questions, please use <strong>info@loansbuzz.com</strong>.
                      For technical support or website-related issues, use <strong>support@loansbuzz.com</strong>.
                      Alternatively, you can fill out the contact form above with the appropriate subject for faster routing.
                    </p>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* FAQ Item 3 */}
            <motion.div variants={fadeInUp}>
              <Card className="overflow-hidden border-slate-200">
                <button
                  onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold pr-4">Do you charge for consultations or advisory services?</h3>
                  {openFAQ === 2 ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFAQ === 2 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-muted-foreground">
                      No, Loans Buzz does not charge customers for consultations, enquiries, or advisory services.
                      Our expert guidance on loans, credit cards, insurance, and mutual funds is completely free.
                      We earn commissions from partner banks and financial institutions upon successful loan disbursal or product enrollment.
                    </p>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
