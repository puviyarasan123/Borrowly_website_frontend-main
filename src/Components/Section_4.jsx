import { useState, useEffect } from "react";
import EmiCalculator from "./EmiCalculator";

const loanTitles = {
  personal: {
    title: "Personal Loan Calculator",
    subtitle: "Find the ideal loan plan for you using our easy-to-use Personal Loan Calculator.",
  },
  business: {
    title: "Business Loan Calculator",
    subtitle: "Find the ideal loan plan for you using our easy-to-use Business Loan Calculator.",
  },
  home: {
    title: "Home Loan Calculator",
    subtitle: "Find the ideal loan plan for you using our easy-to-use Home Loan Calculator.",
  },
  education: {
    title: "Education Loan Calculator",
    subtitle: "Find the ideal loan plan for you using our easy-to-use Education Loan Calculator.",
  },
  vehicle: {
    title: "Vehicle Loan Calculator",
    subtitle: "Find the ideal loan plan for you using our easy-to-use Vehicle Loan Calculator.",
  },
  gold: {
    title: "Gold Loan Calculator",
    subtitle: "Quick estimates for loans against your gold assets.",
  },
};

const Section_4 = ({
  isDarkMode,
  options = true,
  title,
  subtitle,
  selectedLoanId = null, // ✅ Start with no specific loan
}) => {
  const [activeLoanId, setActiveLoanId] = useState(selectedLoanId);
  const [dynamicTitle, setDynamicTitle] = useState("");
  const [dynamicSubtitle, setDynamicSubtitle] = useState("");

  useEffect(() => {
    if (activeLoanId && loanTitles[activeLoanId]) {
      setDynamicTitle(title || loanTitles[activeLoanId].title);
      setDynamicSubtitle(subtitle || loanTitles[activeLoanId].subtitle);
    } else {
      setDynamicTitle(title || "Loan EMI Calculator");
      setDynamicSubtitle(subtitle || "Easily calculate loan EMIs for different types.");
    }
  }, [activeLoanId, title, subtitle]);

  return (
    <div className={`md:py-0 relative overflow-hidden cursor-default bg-[#F0F0F0]`}>
      <div className="max-w-screen-xl py-24 mx-auto flex flex-col items-center justify-center h-full">
        <p
          style={{ fontFamily: "PovetaracSansBold" }}
          className="text-[#084DB3] text-[14px] bg-[#DEE8F6] text-left rounded-full w-fit px-4 py-1.5"
        >
          FINANCE MADE EASY
        </p>

        <h1
          style={{ fontFamily: "PovetaracSansBlack" }}
          className="text-center mt-4 text-[28px] lg:text-[36px] xl:text-[40px] leading-[1.1] text-black"
        >
          {dynamicTitle}
        </h1>

        <p
          style={{ fontFamily: "PovetaracSansBold" }}
          className="mt-2 px-4 w-full max-w-[800px] text-[14px] text-center lg:text-[14px] xl:text-lg text-[#696868]"
        >
          {dynamicSubtitle}
        </p>

        <div className="w-full max-w-screen-xl pt-6 md:py-10">
          <EmiCalculator
            isDarkMode={isDarkMode}
            options={options}
            selectedLoanId={selectedLoanId}
            onLoanTypeChange={(loanId) => setActiveLoanId(loanId)}
          />
        </div>

        <div className="text-[#525252] flex flex-row items-center gap-1 px-5 pt-5 md:pt-0">
          <h1
            style={{ fontFamily: "PovetaracSansBold" }}
            className="text-left mt-0.5 text-[12px] md:text-[14px] lg:text-[16px]"
          >
            Note: This EMI calculation is for reference purposes only. Final values may vary based on your bank’s terms and verification.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Section_4;
