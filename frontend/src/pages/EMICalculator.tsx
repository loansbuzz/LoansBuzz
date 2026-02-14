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

    if (R === 0) {
      setEmi(Math.round(P / N));
      setTotalPayable(P);
      setTotalInterest(0);
      return;
    }

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPay = emiValue * N;
    const interest = totalPay - P;

    setEmi(Math.round(emiValue));
    setTotalPayable(Math.round(totalPay));
    setTotalInterest(Math.round(interest));
  };

  const data = [
    { name: "Principal Amount", value: loanAmount },
    { name: "Interest Amount", value: totalInterest },
  ];

  const COLORS = ["#22c55e", "#0f172a"];

  // Prevents leading zeros by converting to number then back to string
  const formatInput = (val) => {
    if (val === 0 || val === "") return "";
    return Number(val).toString();
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* INPUT SECTION */}
            <div className="space-y-10">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-gray-700">Loan Amount (₹)</label>
                  <input 
                    type="number"
                    value={formatInput(loanAmount)}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-32 border-b-2 border-green-500 focus:outline-none text-right font-bold text-green-600 bg-transparent text-lg"
                  />
                </div>
                <input
                  type="range"
                  min={100000}
                  max={100000000} 
                  step={200000}   
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="custom-slider w-full"

                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-2 font-medium">
                  <span>1L</span>
                  <span>2.5Cr</span>
                  <span>5Cr</span>
                  <span>7.5Cr</span>
                  <span>10Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-gray-700">Interest Rate (%)</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={formatInput(interestRate)}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-20 border-b-2 border-green-500 focus:outline-none text-right font-bold text-green-600 bg-transparent text-lg"
                  />
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
                <div className="flex justify-between text-[11px] text-gray-400 mt-2 font-medium">
                  <span>1%</span>
                  <span>10%</span>
                  <span>20%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="font-bold text-gray-700">Tenure (Months)</label>
                  <input 
                    type="number"
                    value={formatInput(tenure)}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-20 border-b-2 border-green-500 focus:outline-none text-right font-bold text-green-600 bg-transparent text-lg"
                  />
                </div>
                <input
                  type="range"
                  min={6}
                  max={360}
                  step={2}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="custom-slider w-full"

                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-2 font-medium">
                  <span>6m</span>
                  <span>10y</span>
                  <span>20y</span>
                  <span>30y</span>
                </div>
              </div>
            </div>

            {/* RESULTS SECTION */}
            <div className="flex flex-col items-center">
              <div className="w-full bg-green-50 p-6 rounded-xl text-center mb-8">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Monthly EMI</p>
                <p className="text-4xl font-black text-green-700">
                  ₹ {emi.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Pie Chart with Labels */}
              <div className="h-64 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* CHART LEGEND (The Labels) */}
              <div className="flex justify-center gap-8 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: COLORS[0] }}></div>
                  <span className="text-sm font-semibold text-gray-600">Principal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: COLORS[1] }}></div>
                  <span className="text-sm font-semibold text-gray-600">Interest</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-center">
                  <p className="text-[10px] uppercase text-gray-400 font-bold">Total Interest</p>
                  <p className="font-bold text-gray-700">₹{totalInterest.toLocaleString("en-IN")}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-center">
                  <p className="text-[10px] uppercase text-gray-400 font-bold">Total Payable</p>
                  <p className="font-bold text-gray-700">₹{totalPayable.toLocaleString("en-IN")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}