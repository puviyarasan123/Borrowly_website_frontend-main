import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const loanOptions = [
  {
    id: 'personal',
    loanName: 'Personal Loan',
    minAmount: 100000,    // 1L
    maxAmount: 30000000,  // 3Cr
    minRate: 9.99,
    maxRate: 24.14,
    minMonths: 6,
    maxMonths: 36,
  },
  {
    id: 'business',
    loanName: 'Business Loan',
    minAmount: 500000,     // 5L
    maxAmount: 100000000,  // 10Cr
    minRate: 9.65,
    maxRate: 38.0,
    minMonths: 12,
    maxMonths: 60,
  },
  {
    id: 'home',
    loanName: 'Home Loan',
    minAmount: 500000,     // 5L
    maxAmount: 100000000,  // 10Cr
    minRate: 7.35,
    maxRate: 18.0,
    minMonths: 60,
    maxMonths: 360,
  },
  {
    id: 'education',
    loanName: 'Education Loan',
    minAmount: 2000000,     // 20L
    maxAmount: 15000000,    // 1.5Cr
    minRate: 7.10,
    maxRate: 14.0,
    minMonths: 12,
    maxMonths: 180,
  },
  {
    id: 'vehicle',
    loanName: 'Vehicle Loan',
    minAmount: 100000,      // 1L
    maxAmount: 20000000,    // 2Cr
    minRate: 7.5,
    maxRate: 14.0,
    minMonths: 12,
    maxMonths: 84,
  },
  {
    id: 'gold',
    loanName: 'Gold Loan',
    minAmount: 100000,      // 1L
    maxAmount: 20000000,    // 2Cr
    minRate: 5.75,
    maxRate: 10.90,
    minMonths: 3,
    maxMonths: 12,
  },
];

// Helper to format in Lakhs / Crores
const formatAmount = (amount) => {
  if (amount >= 10000000) return (amount / 10000000).toFixed(2) + ' Cr';
  if (amount >= 100000) return (amount / 100000).toFixed(2) + ' L';
  return amount;
};

const Slider = ({ min, max, step = 1, value, setValue, unit }) => {
  const barRef = useRef(null);
  const thumbRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    const fill = fillRef.current;
    const thumb = thumbRef.current;

    const updateFromX = (x) => {
      const rect = bar.getBoundingClientRect();
      const relX = Math.min(Math.max(x - rect.left, 0), rect.width);
      const percent = relX / rect.width;
      const newValue = Math.round((min + percent * (max - min)) / step) * step;

      setValue(newValue);
      gsap.to(fill, { width: `${percent * 100}%`, duration: 0.2 });
      gsap.to(thumb, { duration: 0.2 });
    };

    Draggable.create(thumb, {
      type: 'x',
      bounds: bar,
      onDrag() {
        updateFromX(this.pointerX);
      },
      onPress(e) {
        updateFromX(e.clientX);
      },
    });

    const handleBarClick = (e) => {
      updateFromX(e.clientX);
    };

    bar.addEventListener('click', handleBarClick);
    return () => bar.removeEventListener('click', handleBarClick);
  }, [min, max, setValue, step]);

  return (
    <div className="py-5">
      <div ref={barRef} className="w-full h-3 bg-gray-200 rounded-full relative cursor-pointer">
        <div ref={fillRef} className="h-3 bg-[#08315C] rounded-full" style={{ width: `${((value - min) / (max - min)) * 100}%` }}></div>
        <div ref={thumbRef} className="w-7 h-7 bg-white border-6 border-[#0CC066] rounded-full absolute top-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

const EmiCalculator = ({ options = true, selectedLoanId = 'personal' }) => {
  const [selectedLoan, setSelectedLoan] = useState(() => {
    const loan = loanOptions.find((loan) => loan.id === selectedLoanId);
    return loan || loanOptions[0];
  });

  const [loanAmount, setLoanAmount] = useState(selectedLoan.minAmount);
  const [interestRate, setInterestRate] = useState(selectedLoan.minRate);
  const [emiMonths, setEmiMonths] = useState(selectedLoan.minMonths);

  // Reset values when loan type changes
  useEffect(() => {
    setLoanAmount(selectedLoan.minAmount);
    setInterestRate(selectedLoan.minRate);
    setEmiMonths(selectedLoan.minMonths);
  }, [selectedLoan]);

  const principal = loanAmount;
  const annualInterestRate = interestRate;
  const months = emiMonths;

  const monthlyRate = annualInterestRate / 12 / 100;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);

  const roundRupee = (x) => Math.round(x);
  const monthlyEMI = roundRupee(emi);
  const totalPayable = roundRupee(emi * months);
  const totalInterest = totalPayable - principal;

  return (
    <div className="px-5">
      {/* Loan Type Switcher (visible only on main page) */}
      {options && (
        <div className="w-full overflow-x-auto hide-scrollbar">
          <div className="flex pb-10 w-max gap-4 whitespace-nowrap mx-auto justify-center">
            {loanOptions.map((loan) => (
              <button
                key={loan.id}
                onClick={() => setSelectedLoan(loan)}
                style={{ fontFamily: 'PovetaracSansBold' }}
                className={`flex items-center justify-center py-3 md:py-3 px-4 md:px-8 text-[14px] md:text-sm lg:text-[16px] rounded-lg transition-all duration-200 ${
                  selectedLoan.id === loan.id
                    ? 'bg-[#1E6491] border border-[#1E6491] text-white'
                    : 'border border-[#C4C4C4] bg-white cursor-pointer text-black'
                }`}
              >
                {loan.loanName}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Version */}
      <div className="border border-[#C4C4C4] block lg:hidden gap-5 overflow-hidden bg-white">
        <div className="bg-gradient-to-b from-[#062D57] to-[#1E6592] py-8 text-white flex flex-col items-center gap-1.5 justify-center">
          <h1 className=" text-[14px] font-semibold">Your monthly instalment</h1>
          <h1 className="text-4xl font-bold">₹{monthlyEMI.toLocaleString()}</h1>
        </div>
        <div className="flex-1 flex flex-col gap-6 py-4 px-3 md:px-5">
          {/* Loan Amount */}
          <div>
            <div className="flex items-center">
              <h1 className="text-[16px] md:text-xl font-bold">Loan amount</h1>
              <div style={{ fontFamily: 'PovetaracSansBold' }} className="border ml-auto border-[#e6e6e6] py-1 md:py-2 px-4 md:px-8 text-[16px] rounded-full">
                ₹{formatAmount(loanAmount)}
              </div>
            </div>
            <Slider min={selectedLoan.minAmount} max={selectedLoan.maxAmount} value={loanAmount} setValue={setLoanAmount} step={10000} />
            <div style={{ fontFamily: 'PovetaracSansBold' }} className="flex justify-between text-[#838383] text-[14px] md:text-[18px]">
              <span>₹{formatAmount(selectedLoan.minAmount)}</span><span>₹{formatAmount(selectedLoan.maxAmount)}</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center">
              <h1 className="text-[16px] md:text-xl font-bold">Interest rate</h1>
              <div style={{ fontFamily: 'PovetaracSansBold' }} className="border ml-auto border-[#e6e6e6] py-1 md:py-2 px-4 md:px-8 text-[16px] rounded-full">
                {interestRate}%
              </div>
            </div>
            <Slider min={selectedLoan.minRate} max={selectedLoan.maxRate} value={interestRate} setValue={setInterestRate} step={0.1} />
            <div style={{ fontFamily: 'PovetaracSansBold' }} className="flex justify-between text-[#838383] text-[14px] md:text-[18px]">
              <span>{selectedLoan.minRate}%</span><span>{selectedLoan.maxRate}%</span>
            </div>
          </div>

          {/* EMI Duration */}
          <div>
            <div className="flex items-center">
              <h1 className="text-[16px] md:text-xl font-bold">Select EMI option</h1>
              <div style={{ fontFamily: 'PovetaracSansBold' }} className="border ml-auto border-[#e6e6e6] py-1 md:py-2 px-4 md:px-8 text-[16px] rounded-full">
                {emiMonths} Months
              </div>
            </div>
            <Slider min={selectedLoan.minMonths} max={selectedLoan.maxMonths} value={emiMonths} setValue={setEmiMonths} step={1} />
            <div style={{ fontFamily: 'PovetaracSansBold' }} className="flex justify-between text-[#838383] text-[14px] md:text-[18px]">
              <span>{selectedLoan.minMonths} Months</span><span>{selectedLoan.maxMonths} Months</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="py-6 px-5 bg-[#fafcff]">
          <div style={{ fontFamily: 'PovetaracSansBold' }} className="flex justify-between mb-2">
            <span className="text-[#838383] text-[16px]">Total interest</span>
            <h1 className="text-[16px] md:text-[20px] font-bold">₹{formatAmount(totalInterest)}</h1>
          </div>
          <div style={{ fontFamily: 'PovetaracSansBold' }} className="flex justify-between">
            <span className="text-[#838383] text-[16px]">Principal amount</span>
            <h1 className="text-[16px] md:text-[20px] font-bold">₹{formatAmount(loanAmount)}</h1>
          </div>
          <hr className="my-4 border-dashed border-[#C4C4C4]" />
          <div style={{ fontFamily: 'PovetaracSansBold' }} className="flex justify-between">
            <span className="text-[18px] font-bold">Total amount</span>
            <h1 className="text-[20px] font-bold">₹{formatAmount(totalPayable)}</h1>
          </div>
          <div className="pt-5">
            <button className="w-full text-lg py-4 text-white cursor-pointer bg-[#0CC066] font-bold">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="border border-[#C4C4C4] bg-white hidden lg:flex h-[470px] gap-5 p-5">
        <div className="flex-1 flex flex-col gap-6 py-4 px-5">
          {/* Loan Amount */}
          <div>
            <div className="flex items-center">
              <h1 className="text-[16px] md:text-xl font-bold">Loan amount</h1>
              <div style={{ fontFamily: 'PovetaracSansBold' }} className="border ml-auto border-[#e6e6e6] py-1 md:py-2 px-4 md:px-8 text-[16px] rounded-full">
                ₹{formatAmount(loanAmount)}
              </div>
            </div>
            <Slider min={selectedLoan.minAmount} max={selectedLoan.maxAmount} value={loanAmount} setValue={setLoanAmount} step={10000} />
            <div style={{ fontFamily: 'PovetaracSansBold' }} className="flex justify-between text-[#838383] text-[14px] md:text-[18px]">
              <span>₹{formatAmount(selectedLoan.minAmount)}</span><span>₹{formatAmount(selectedLoan.maxAmount)}</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div style={{ fontFamily: 'PovetaracSansBold' }} className="flex items-center">
              <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-xl">Interest rate</h1>
              <div className="border ml-auto border-[#e6e6e6] pt-2 pb-1 px-8 text-[18px] rounded-full">
                {interestRate}%
              </div>
            </div>
            <Slider min={selectedLoan.minRate} max={selectedLoan.maxRate} value={interestRate} setValue={setInterestRate} step={0.1} />
            <div className="flex justify-between text-[#838383] text-[18px]">
              <span>{selectedLoan.minRate}%</span><span>{selectedLoan.maxRate}%</span>
            </div>
          </div>

          {/* EMI Duration */}
          <div>
            <div style={{ fontFamily: 'PovetaracSansBold' }} className="flex items-center">
              <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-xl">Select EMI option</h1>
              <div className="border ml-auto border-[#e6e6e6] pt-2 pb-1 px-8 text-[18px] rounded-full">
                {emiMonths} Months
              </div>
            </div>
            <Slider min={selectedLoan.minMonths} max={selectedLoan.maxMonths} value={emiMonths} setValue={setEmiMonths} step={1} />
            <div className="flex justify-between text-[#838383] text-[18px]">
              <span>{selectedLoan.minMonths} Months</span><span>{selectedLoan.maxMonths} Months</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="w-full max-w-[325px]">
          <div className="border border-[#C4C4C4] overflow-hidden">
            <div style={{ fontFamily: 'PovetaracSansBold' }} className="bg-gradient-to-b from-[#062D57] to-[#1E6592] py-8 text-white flex flex-col items-center gap-1.5 justify-center">
              <h1 className="text-[14px]">Your monthly instalment</h1>
              <h1 className="text-5xl mt-2">₹{monthlyEMI.toLocaleString()}</h1>
            </div>
            <div style={{ fontFamily: 'PovetaracSansBold' }} className="py-6 px-5">
              <div className="flex justify-between mb-2">
                <span className="text-[#838383] text-[16px]">Total interest</span>
                <h1 className="text-[20px]">₹{formatAmount(totalInterest)}</h1>
              </div>
              <div className="flex justify-between">
                <span className="text-[#838383] text-[16px]">Principal amount</span>
                <h1 className="text-[20px]">₹{formatAmount(loanAmount)}</h1>
              </div>
              <hr className="my-4 border-dashed border-[#C4C4C4]" />
              <div className="flex justify-between">
                <span style={{ fontFamily: 'PovetaracSansBlack' }} className="text-[18px]">Total amount</span>
                <h1 className="text-[20px] font-bold">₹{formatAmount(totalPayable)}</h1>
              </div>
              <div className="pt-5">
                <button className="w-full text-lg py-4 text-white cursor-pointer bg-[#0CC066] font-bold">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
