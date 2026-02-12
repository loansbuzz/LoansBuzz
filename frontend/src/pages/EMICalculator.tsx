import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function EMICalculator() {

  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(120);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const P = loanAmount;
    const N = tenure;
    const R = interestRate / 12 / 100;

    const emiValue =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    const totalPay = emiValue * N;
    const interest = totalPay - P;

    setEmi(Math.round(emiValue));
    setTotalPayable(Math.round(totalPay));
    setTotalInterest(Math.round(interest));
  };

  const data = [
    { name: "Principal", value: loanAmount },
    { name: "Interest", value: totalInterest },
  ];

  const COLORS = ["#22c55e", "#0f172a"];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-14 h-14 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <Calculator className="w-7 h-7 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">EMI Calculator</h1>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100">

          <div className="grid md:grid-cols-2 gap-12">

            {/* LEFT SIDE - SLIDERS */}
            <div className="space-y-8">

              {/* Loan Amount */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-medium">Loan Amount</label>
                  <span className="text-green-600 font-semibold">
                    ₹ {loanAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                <input
                  type="range"
                  min={100000}
                  max={1000000000}
                  step={100000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="custom-slider w-full"
                />

                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>₹1L</span>
                  <span>₹2Cr</span>
                  <span>₹5Cr</span>
                  <span>₹10Cr</span>
                </div>
              </div>

              {/* Interest */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-medium">Interest Rate</label>
                  <span className="text-green-600 font-semibold">
                    {interestRate} %
                  </span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={30}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="custom-slider w-full"
                />

                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>1%</span>
                  <span>10%</span>
                  <span>20%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="font-medium">Loan Tenure</label>
                  <span className="text-green-600 font-semibold">
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
                  className="custom-slider w-full"
                />

                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>6m</span>
                  <span>5y</span>
                  <span>15y</span>
                  <span>30y</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - RESULTS */}
            <div className="flex flex-col justify-between">

              <div className="grid grid-cols-1 gap-6 mb-6">

                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <p className="text-sm text-gray-600">Monthly EMI</p>
                  <p className="text-3xl font-bold text-green-700">
                    ₹ {emi.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <p className="text-sm text-gray-600">Total Interest</p>
                    <p className="font-semibold">
                      ₹ {totalInterest.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <p className="text-sm text-gray-600">Total Payable</p>
                    <p className="font-semibold">
                      ₹ {totalPayable.toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>
              </div>

              {/* Pie Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <div className="flex justify-center gap-8 mb-4 text-sm">

                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-4 h-4 rounded-full"
                        style={{ backgroundColor: "#22c55e" }}
                      ></span>                      
                      <span className="text-gray-600">Principal amount</span>
                    </div>

                    <div className="flex items-center gap-2">
<span
                        className="inline-block w-4 h-4 rounded-full"
                        style={{ backgroundColor: "#0d0101" }}
                      ></span>                      <span className="text-gray-600">Interest amount</span>
                    </div>

                  </div>

                  <PieChart>
                    <Pie
                      data={data}
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
