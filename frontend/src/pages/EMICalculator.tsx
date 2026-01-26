import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";

export function EMICalculator() {
  const FIXED_INTEREST_RATE = 10.5; // % per annum

  const [loanAmount, setLoanAmount] = useState(500000);
  const [tenure, setTenure] = useState(120);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, tenure]);

  const calculateEMI = () => {
    const P = loanAmount;
    const N = tenure;
    const R = FIXED_INTEREST_RATE / 12 / 100;

    const emiValue =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    const totalPay = emiValue * N;
    const interest = totalPay - P;

    setEmi(Math.round(emiValue));
    setTotalPayable(Math.round(totalPay));
    setTotalInterest(Math.round(interest));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <Calculator className="w-7 h-7 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">EMI Calculator</h1>
          <p className="text-gray-600">
            Fixed Interest Rate:{" "}
            <span className="font-semibold text-green-600">
              {FIXED_INTEREST_RATE}% p.a.
            </span>
          </p>
        </div>

        {/* Sliders */}
        <div className="space-y-8">

          {/* Loan Amount Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">Loan Amount</label>
              <span className="font-semibold text-green-600">
                ₹ {loanAmount.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={5000000}
              step={100}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>₹10K</span>
              <span>₹50L</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium">Loan Tenure</label>
              <span className="font-semibold text-green-600">
                {tenure} months
              </span>
            </div>
            <input
              type="range"
              min={6}
              max={360}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>6 months</span>
              <span>30 years</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 text-center">

          <div className="p-6 rounded-xl bg-green-50 border">
            <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
            <p className="text-3xl font-bold text-green-700">
              ₹ {emi.toLocaleString()}
            </p>
          </div>

          <div className="p-6 rounded-xl border">
            <p className="text-sm text-gray-600 mb-1">Total Interest</p>
            <p className="text-2xl font-semibold">
              ₹ {totalInterest.toLocaleString()}
            </p>
          </div>

          <div className="p-6 rounded-xl border">
            <p className="text-sm text-gray-600 mb-1">Total Payable</p>
            <p className="text-2xl font-semibold">
              ₹ {totalPayable.toLocaleString()}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
