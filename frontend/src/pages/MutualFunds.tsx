import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  TrendingUp, 
  Target, 
  Shield, 
  Zap, 
  PieChart, 
  BarChart3, 
  CheckCircle2,
  Users,
  Briefcase,
  GraduationCap,
  Home,
  Calendar,
  AlertTriangle,
  Info,
  TrendingDown,
  Lock,
  FileText,
  IndianRupee,
  LineChart,
  Wallet,
  ChevronDown,
  ChevronUp,
  Clock,
  Award,
  BadgeCheck,
  HeadphonesIcon,
  Lightbulb,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
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

export function MutualFunds() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const fundCategories = [
    {
      icon: TrendingUp,
      name: 'Equity Funds',
      description: 'High growth potential through investments in stocks',
      risk: 'High Risk',
      returns: '12-15% p.a.*',
      horizon: '5+ years'
    },
    {
      icon: PieChart,
      name: 'Debt Funds',
      description: 'Stable returns through fixed income securities',
      risk: 'Low to Moderate Risk',
      returns: '7-9% p.a.*',
      horizon: '1-3 years'
    },
    {
      icon: BarChart3,
      name: 'Hybrid Funds',
      description: 'Balanced approach with equity and debt mix',
      risk: 'Moderate Risk',
      returns: '9-12% p.a.*',
      horizon: '3-5 years'
    },
    {
      icon: Target,
      name: 'Tax Saving Funds (ELSS)',
      description: 'Save tax under Section 80C while building wealth',
      risk: 'Moderate to High Risk',
      returns: '10-13% p.a.*',
      horizon: '3+ years (lock-in)'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Easy Investment',
      description: 'Start with as low as ₹500 per month'
    },
    {
      icon: Shield,
      title: 'Professional Management',
      description: 'Managed by expert fund managers'
    },
    {
      icon: PieChart,
      title: 'Diversification',
      description: 'Spread risk across multiple assets'
    },
    {
      icon: TrendingUp,
      title: 'High Returns',
      description: 'Potential for better returns than FDs'
    }
  ];

  const whyInvest = [
    'Beat inflation and grow your wealth',
    'Systematic Investment Plans (SIP) available',
    'High liquidity - withdraw anytime',
    'Tax benefits on ELSS funds',
    'Transparent and regulated by SEBI',
    'Professional fund management'
  ];

  const howItWorks = [
    {
      number: '1',
      title: 'Investment Pooling',
      description: 'Money from multiple investors is pooled together',
      icon: Users
    },
    {
      number: '2',
      title: 'Professional Management',
      description: 'Expert fund managers allocate funds to various assets',
      icon: Award
    },
    {
      number: '3',
      title: 'Asset Allocation',
      description: 'Investments are made in stocks, bonds, or other securities',
      icon: PieChart
    },
    {
      number: '4',
      title: 'NAV Calculation',
      description: 'Net Asset Value reflects your investment\'s current worth',
      icon: LineChart
    },
    {
      number: '5',
      title: 'Returns Over Time',
      description: 'Your investment grows through market appreciation and dividends',
      icon: TrendingUp
    }
  ];

  const whoShouldInvest = [
    {
      icon: Users,
      title: 'First-Time Investors',
      description: 'Beginners looking to start their investment journey with professional guidance'
    },
    {
      icon: Briefcase,
      title: 'Salaried Professionals',
      description: 'Individuals seeking disciplined monthly investments through SIP'
    },
    {
      icon: TrendingUp,
      title: 'Long-Term Wealth Builders',
      description: 'Investors aiming for retirement planning or major life goals'
    },
    {
      icon: FileText,
      title: 'Tax Planners',
      description: 'Those looking to save tax under Section 80C with ELSS funds'
    },
    {
      icon: Calendar,
      title: 'Retirement Planners',
      description: 'People building a corpus for post-retirement financial security'
    },
    {
      icon: GraduationCap,
      title: 'Goal-Based Savers',
      description: 'Parents saving for children\'s education or other specific goals'
    }
  ];

  const sipBenefits = [
    {
      icon: Calendar,
      title: 'Disciplined Investing',
      description: 'Automate monthly investments and build wealth systematically'
    },
    {
      icon: IndianRupee,
      title: 'Start Small',
      description: 'Begin with as low as ₹500 per month - no large lump sum needed'
    },
    {
      icon: TrendingUp,
      title: 'Rupee Cost Averaging',
      description: 'Buy more units when markets are low, fewer when high'
    },
    {
      icon: Clock,
      title: 'Power of Compounding',
      description: 'Long-term investments benefit from exponential growth'
    }
  ];

  const platformHelp = [
    {
      icon: HeadphonesIcon,
      title: 'Expert Advisory',
      description: 'Personalized investment guidance from certified financial advisors'
    },
    {
      icon: Target,
      title: 'Goal-Based Recommendations',
      description: 'Curated fund selection aligned with your financial objectives'
    },
    {
      icon: BadgeCheck,
      title: 'Access to Curated Funds',
      description: 'Handpicked mutual funds across categories from top AMCs'
    },
    {
      icon: Shield,
      title: 'Support Throughout Journey',
      description: 'Ongoing assistance for portfolio tracking and rebalancing'
    }
  ];

  const faqs = [
    {
      question: 'What is a mutual fund?',
      answer: 'A mutual fund is an investment vehicle that pools money from multiple investors to invest in diversified portfolios of stocks, bonds, or other securities. It is managed by professional fund managers who make investment decisions on behalf of investors. Each investor owns units of the fund proportional to their investment amount. Mutual funds offer diversification, professional management, and accessibility to retail investors.'
    },
    {
      question: 'What is the minimum amount required to invest in mutual funds?',
      answer: 'The minimum investment amount varies by fund and investment mode. For Systematic Investment Plans (SIP), you can start with as low as ₹500 per month in most mutual funds. For lump sum investments, the minimum amount typically ranges from ₹1,000 to ₹5,000 depending on the fund house and scheme. SIPs are recommended for beginners as they allow disciplined investing with smaller amounts.'
    },
    {
      question: 'What is the difference between SIP and lump sum investment?',
      answer: 'SIP (Systematic Investment Plan) involves investing a fixed amount at regular intervals (monthly/quarterly), while lump sum means investing a large amount at once. SIP offers rupee cost averaging (buying more units when prices are low), reduces market timing risk, and suits salaried individuals. Lump sum works well when you have surplus funds and markets are at attractive valuations. SIP is generally recommended for most retail investors due to its disciplined approach.'
    },
    {
      question: 'What are the different risk levels in mutual funds?',
      answer: 'Mutual funds have varying risk levels: 1) Low Risk - Liquid and debt funds with stable returns, 2) Moderate Risk - Hybrid/balanced funds mixing equity and debt, 3) High Risk - Equity funds investing primarily in stocks with potential for high returns but also higher volatility, 4) Very High Risk - Sectoral/thematic funds concentrated in specific sectors. Your risk appetite should match your investment horizon and financial goals.'
    },
    {
      question: 'What is the lock-in period for mutual funds?',
      answer: 'Most mutual funds have no lock-in period and offer high liquidity - you can redeem anytime. However, ELSS (Equity Linked Savings Scheme) tax-saving funds have a mandatory 3-year lock-in period. Some funds may have exit loads (fees) if you redeem within 1 year. Close-ended funds have a fixed maturity period (typically 3-5 years) but can be traded on stock exchanges. Always check the fund\'s exit load structure before investing.'
    },
    {
      question: 'How are mutual fund returns taxed?',
      answer: 'Taxation depends on fund type and holding period: Equity Funds - Long-term capital gains (held >1 year) above ₹1 lakh taxed at 10%, short-term gains taxed at 15%. Debt Funds - Long-term gains (held >3 years) taxed at 20% with indexation benefit, short-term gains added to income and taxed per slab. Dividends from mutual funds are taxable as per your income tax slab. ELSS investments qualify for Section 80C deduction up to ₹1.5 lakh.'
    },
    {
      question: 'When should I withdraw from my mutual fund investment?',
      answer: 'Withdraw when: 1) You achieve your financial goal for which you invested, 2) You need emergency funds (keep 6 months expenses in liquid funds), 3) Fund consistently underperforms its benchmark for 2+ years, 4) Your risk profile changes (e.g., nearing retirement - shift from equity to debt). Avoid withdrawing due to short-term market volatility. Stay invested for the long term (5-10+ years for equity funds) to benefit from compounding and ride out market cycles.'
    },
    {
      question: 'Who should invest in mutual funds?',
      answer: 'Mutual funds are suitable for: 1) Beginners lacking expertise in direct stock investing, 2) Salaried individuals wanting disciplined monthly investments via SIP, 3) Long-term wealth builders for retirement/goals, 4) Tax savers seeking Section 80C benefits through ELSS, 5) Those wanting professional fund management and diversification, 6) Investors willing to accept market-linked returns with associated risks. However, they may not suit those needing guaranteed returns or having very short investment horizons (less than 1 year).'
    }
  ];

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
                Grow Your Wealth with Smart Investments
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-muted-foreground">
                Explore curated mutual fund options aligned with your financial goals. 
                Start your investment journey with as low as ₹500/month.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/contact">Start Investing</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">Talk to an Advisor</Link>
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
                src="https://images.unsplash.com/photo-1761587941453-bd1790225d52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwZ3Jvd3RoJTIwY2hhcnR8ZW58MXx8fHwxNzY3OTUyNTA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Investment Growth"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introductory Context Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 bg-white border-b"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-muted-foreground">
            <strong>Mutual funds</strong> are proven long-term investment instruments designed to help you build wealth 
            and achieve financial goals. Whether you're saving for retirement, your child's education, buying a home, 
            or simply growing your savings, mutual funds offer professional management, diversification, and flexibility 
            to investors of all experience levels.
          </p>
          <p className="text-muted-foreground mt-4">
            With options ranging from conservative debt funds to high-growth equity funds, mutual funds cater to various 
            risk appetites and investment horizons. Start your wealth creation journey today with systematic, goal-based investing.
          </p>
        </div>
      </motion.section>

      {/* What Are Mutual Funds */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          >
            What Are Mutual Funds?
          </motion.h2>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="p-8">
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  A <strong>mutual fund</strong> is an investment vehicle that pools money from multiple investors and invests 
                  it in a diversified portfolio of stocks, bonds, government securities, or other financial instruments. Each 
                  investor owns units of the fund proportional to their investment amount.
                </p>
                
                <p>
                  Mutual funds are managed by professional <strong>fund managers</strong> who have expertise in analyzing markets, 
                  selecting securities, and making investment decisions on behalf of investors. This removes the need for individual 
                  investors to research and track markets constantly.
                </p>
                <p>
                  Unlike traditional savings instruments like fixed deposits, mutual fund returns are <strong>market-linked</strong> - 
                  they fluctuate based on the performance of underlying assets. This means:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>No Guaranteed Returns:</strong> Returns vary with market conditions</li>
                  <li><strong>Higher Return Potential:</strong> Historically outperform inflation and traditional savings</li>
                  <li><strong>Risk and Reward:</strong> Higher potential returns come with market volatility</li>
                  <li><strong>Long-Term Focus:</strong> Best suited for investment horizons of 3+ years</li>
                </ul>
                <div className="bg-secondary/10 p-6 rounded-lg border border-secondary/20 mt-6">
                  <p className="font-semibold text-foreground">
                    Mutual funds democratize investing by giving small investors access to professionally managed, 
                    diversified portfolios that were once available only to wealthy individuals and institutions.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How Mutual Funds Work */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Mutual Funds Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding the investment process from pooling to returns
            </p>
          </motion.div>
          
          

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-5 gap-6 mt-8"
          >
            {howItWorks.map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="relative">
                <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">{step.number}</span>
                  </div>
                  <step.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2 text-sm">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-primary/20" style={{ width: 'calc(100% - 1.5rem)' }} />
                )}
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            <Card className="p-6 bg-primary/10 border-primary/20">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div className="text-sm text-foreground">
                  <strong>NAV (Net Asset Value):</strong> The price per unit of a mutual fund, calculated by dividing the 
                  total value of all assets in the fund minus liabilities by the total number of outstanding units. 
                  NAV changes daily based on market movements.
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Mutual Fund Categories */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Mutual Fund Categories
            </h2>
            
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {fundCategories.map((category, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div variants={cardHover} initial="rest" whileHover="hover">
                  <Card className="p-8 h-full transition-shadow hover:shadow-xl">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <category.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Risk Level:</span>
                        <span className="text-sm font-semibold">{category.risk}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Expected Returns:</span>
                        <span className="text-sm font-semibold text-primary">{category.returns}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Investment Horizon:</span>
                        <span className="text-sm font-semibold">{category.horizon}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white group">
                      Explore Funds <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who Should Invest */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Should Invest in Mutual Funds?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mutual funds cater to diverse investor profiles and financial goals
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whoShouldInvest.map((persona, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <persona.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">{persona.title}</h3>
                  <p className="text-sm text-muted-foreground">{persona.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Why Invest in Mutual Funds?
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center h-full">
                  <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Benefits List */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
          >
            Key Benefits of Mutual Funds
          </motion.h2>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {whyInvest.map((benefit, index) => (
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

      {/* SIP Explained */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SIP (Systematic Investment Plan) Explained
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Build wealth systematically with disciplined monthly investments
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {sipBenefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  {/* Trigger for Rupee Cost Averaging Diagram */}
                  {benefit.title === 'Rupee Cost Averaging' && (
                    <div className="mt-2 text-xs text-primary">
                      
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8 bg-white shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-center">Start Your SIP Journey</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">₹500</div>
                  <div className="text-sm text-muted-foreground">Minimum Monthly Investment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">12-15%</div>
                  <div className="text-sm text-muted-foreground">Expected Annual Returns*</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">10+ Years</div>
                  <div className="text-sm text-muted-foreground">Recommended Investment Horizon</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Risk Disclosure */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Important: Market Risks & Suitability</h2>
            <p className="text-lg text-muted-foreground">
              Understanding risks is essential before investing
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="p-8 bg-accent/20 border-accent/40">
              <div className="flex items-start space-x-4 mb-6">
                <AlertTriangle className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div className="space-y-4">
                  <p className="text-foreground">
                    <strong>Mutual Fund investments are subject to market risks.</strong> Please read all scheme-related 
                    documents carefully before investing.
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <TrendingDown className="w-4 h-4 text-accent mr-2 flex-shrink-0 mt-1" />
                      <span><strong>Market-Linked Returns:</strong> Fund values fluctuate based on market performance. 
                      There are no guaranteed returns.</span>
                    </li>
                    <li className="flex items-start">
                      <Clock className="w-4 h-4 text-accent mr-2 flex-shrink-0 mt-1" />
                      <span><strong>Investment Horizon Matters:</strong> Equity funds are best suited for 5+ years. 
                      Short-term volatility is normal.</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="w-4 h-4 text-accent mr-2 flex-shrink-0 mt-1" />
                      <span><strong>Suitability Varies:</strong> Choose funds based on your risk appetite, investment goals, 
                      and time horizon.</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-accent mr-2 flex-shrink-0 mt-1" />
                      <span><strong>Past Performance ≠ Future Results:</strong> Historical returns are not indicative of 
                      future performance.</span>
                    </li>
                  </ul>
                  <p className="text-sm font-semibold text-foreground mt-4">
                    Consult a certified financial advisor to determine which mutual funds align with your financial goals 
                    and risk profile.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How Loans Buzz Helps */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Loans Buzz Helps You Invest</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner for smart, goal-based investing
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {platformHelp.map((help, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <help.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">{help.title}</h3>
                  <p className="text-sm text-muted-foreground">{help.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-white">
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
            Everything you need to know about mutual fund investing
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
                          {/* Trigger for Taxation Table */}
                          {faq.question.includes("taxed") && (
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
            Ready to Start Investing?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Talk to our investment experts and build a portfolio that's right for you
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90 text-lg px-8 shadow-2xl">
              <Link to="/contact">Get Started Today</Link>
            </Button>
          </motion.div>
          <p className="text-sm text-white/70 mt-6">
            * Returns are indicative and based on historical performance. Mutual fund investments are subject to market risks.
          </p>
        </motion.div>
      </section>
    </div>
  );
}