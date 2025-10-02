import React from "react";
import { CheckCircle } from "lucide-react";
import per from '../assets/Images/personal_panal.png';

export default function ChooseLoanSection() {
  const features = [
    {
      title: "Compare Instantly in the App",
      description:
        "Check available loan offers, interest rates, EMI options, and repayment timelines in minutes. Borrowly shows you exactly what you’ll pay—no hidden charges.",
    },
    {
      title: "Faster Than Banks & NBFCs",
      description:
        "Forget long paperwork and waiting days for approvals. With Borrowly, your KYC is digital, your approval is instant, and your money is credited directly to your bank account—often within minutes.",
    },
    {
      title: "Transparent Costs, No Surprises",
      description:
        "We disclose every charge upfront: processing, late fees, prepayment rules. No fine print, no hidden penalties—just full clarity so you know the exact cost of your loan.",
    },
    {
      title: "Flexible to Match Your Needs",
      description:
        "Pick a repayment tenure that suits your budget. Want to repay early? Borrowly allows low-cost or free prepayments so you can reduce your loan burden whenever you’re ready.",
    },
  ];

  return (
    <div style={{ fontFamily: "PovetaracSansBold" }}  className="bg-white px-4 pt-12 pb-16 lg:pt-8 lg:pb-10">
      <div className="flex flex-col md:flex-row gap-5">
        {/* LEFT CONTENT */}
        <div>
          <h2  style={{ fontFamily: "PovetaracSansBlack" }}  className="text-2xl md:text-2xl font-bold text-black mb-3 lg:mb-2">
            How to Choose the Best Loan with Borrowly?
          </h2>
          <p className="text-gray-600 mb-6 lg:mb-4 leading-relaxed ">
            Choosing the right loan should be simple, fast, and transparent. At Borrowly, we make it
            effortless to compare, apply, and manage your loan—all in one app. Here’s how Borrowly
            helps you make the best choice:
          </p>

          <div className="space-y-5 lg:space-y-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="text-green-500 w-6 h-6 shrink-0" />
                <div>
                  <h3 style={{ fontFamily: "PovetaracSansBlack" }} className="font-semibold text-black">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-[#F2F4FB] rounded-2xl w-full max-w-[350px] h-fit  p-6 lg:p-8 text-center shadow-md">
          <h3 style={{ fontFamily: "PovetaracSansBlack" }}  className="text-[16px] font-semibold text-black mb-4">
            Avail Personal Loan <br/>For All Your Needs
          </h3>
          <img
            src={per}
            alt="Loan Illustration"
            className="w-[60%] h-auto mx-auto mb-10"
          />
          <button className="bg-green-600 hover:bg-green-700 w-full text-white px-6 py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 mx-auto">
            Apply Now →
          </button>
        </div>
      </div>
    </div>
  );
}
