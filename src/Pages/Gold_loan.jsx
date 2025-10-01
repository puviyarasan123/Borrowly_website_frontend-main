import Breadcrumbs from "../Components/Breadcrumbs";
import Section_1 from "../Components/Loan_section/Section_1";
import Section_2 from "../Components/Loan_section/Section_2";
import Section_3 from "../Components/Loan_section/Section_3";
import Section_4 from "../Components/Loan_section/Section_4";
import ContactusBanner from '../Components/ContactusBanner';
import EmiCalculator from '../Components/Section_4';
import Section_11 from "../Components/Section_11";
import Footer_New from "../Components/Footer_New";
import Footer_subscribe from "../Components/Footer_subscribe";
import Gold_loan from '../assets/Images/Goldloanimage.avif';
import Check_1_1 from '../assets/Images/check_1_.avif';
import Check_2_1 from '../assets/Images/check_2_.avif';
import Featurn from '../assets/Images/Featurn_5.avif';

import img1 from '../assets/Images/Goldloan1.avif';
import img2 from '../assets/Images/Person_loan_appscreen_2.avif';
import img3 from '../assets/Images/Goldloan2.avif';

import Borrow from '../Components/Borrowbest';
import Bank from '../Components/Bankvsborrow';
import Fees from '../Components/Feestable';

import Tick from '../assets/Icons/tick_Send.svg';
import congrt from '../assets/Images/Congrt.avif';

const GoldLoan = () => {
  return (
    <div className="cursor-default mx-auto">
      <div className="px-3 max-w-screen-2xl mx-auto">
        <Breadcrumbs/>
        <Section_1 
          loanType="Gold Loan"
          tag="Gold Loans"
          title="Get Instant Cash with Your Gold – Quick, Safe, and Transparent"
          description="Borrowly helps you unlock the value of your gold with flexible gold loans at competitive interest rates. Get funds instantly without selling your gold."
          image={Gold_loan}
        />
      </div>

      <div className="px-5 max-w-screen-2xl mx-auto">
     
        
        <Section_2 
          description='Unlock instant funds by pledging your gold assets—securely and seamlessly—with Borrowly. Access gold loans online at competitive interest rates, flexible repayment options, and fast disbursals from 30+ trusted banks and NBFCs—all in one place.
Whether you need money for emergencies, personal needs, education, or business, Borrowly helps you compare offers, calculate EMIs, and choose the best loan option that matches your golds value and your repayment capacity.
At Borrowly, we dont just help you borrow—we ensure your gold works smarter for you.'
/>
                <Section_3
  title="Get Your Gold Loan in 4 Easy Steps"
  slides={[
    {
      title: "1. Install & Choose",
      text: "Download the Borrowly app, select your Gold loan amount, and set a tenure that works for your cash flow.",
      image: img1,
      light: true,
    },
    {
      title: "2. Verify & Apply",
      text: "Complete a simple verification with your mobile number, KYC, and details to apply instantly.",
      image: img2,
      light: true,
    },
    {
      title: "3. Check Eligibility",
      text: "Based on your profile and credit check,view eligible loan offers from 30+ banks & flexible repayment options.",
      image: img3,
      light: true,
    },
    {
      title: "Instant Disbursement",
      text: "Once approved, your loan is directly credited to your bank account—helping you access funds quickly for expansion, working capital, or investments.",
      image: congrt,
      light: false,
    },
  ]}
/>

<Section_4
ftype="Gold Loan Features & Benefits"
  featureImg={Featurn}
  loanType="Gold Loan"
  whoCanApply={["21–65 years", "₹25,000 or more"]}
 whoCanApplyNote="We don’t discriminate between salaried or self–employed applicants — everyone is welcome!"
  requiredDocs={["PAN Card", "Aadhaar Card", "Income Proof","Business-related documents (GST, ITR, Registration, Bank Statements)"]}
  requiredDocsNote="Get credit easily in just 5 minutes! Keep these handy:"
  loanDetails={[
    { label: "Interest Rate", value: "Starting from 8.5% p.a. onwards" },
    { label: "Loan Amount", value: "₹5,000 – ₹50 Lakhs (depending on gold value)" },
    { label: "Tenure", value: "Flexible terms from 3 months to 36 months" },
    { label: "Processing Fees", value: " 0.5% – 2% of loan amount" },
    { label: "Coverage:", value: "Gold Jewelry (Necklaces, Chains, Rings, Earrings) Coins & Bars" },

  ]}
  docSections={[
  {
    title: "Documents Required",
    items: [
      { label: "ID Proof:", value: "PAN / Aadhaar / Passport / DL / Voter ID" },
      { label: "Address Proof:", value: "Aadhaar / Passport / Utility bill" },
      { label: "KYC Documents:", value: "For NRIs, valid passport & visa, bank statements" },
      { label: "Gold Ownership Proof:", value: "Original gold items to be pledged" }
    ]
  },
   {
    title: "Pro tips",
    tips: [
      { text: "Ensure gold is free from legal disputes", bold: true },
      { text: "Keep your PAN & bank details ready for faster processing", bold: true },
      { text: "Clear scans are sufficient for online applications", bold: true }
    ]
  },
  {
    title: "Benefits of Borrowly Gold Loans",
    items: [
      { label: "⚡ Instant Disbursal: ", value: "Funds credited within 24 hours" },
      { label: "💰 Flexible Repayment Options:", value: "Pay interest monthly or at maturity" },
      { label: "🔒 Safe Custody: ", value: "Your gold is insured and securely stored" },
      { label: "📄 Minimal Documentation:", value: "Hassle-free loan approval" },
      { label: "🏦 Trusted Lenders:", value: "Multiple options from banks and NBFCs" }
    ]
  },
  {
    title: "3-Step Gold Loan Process",
    items: [
      { label: "Apply Online:", value: "Fill your details and upload documents" },
      { label: "Gold Valuation:", value: "Gold is assessed for purity and value" },
      { label: "Receive Funds:", value: "Loan amount is disbursed instantly to your account" }
    ]
  },
 
]

}
/>

      </div>


 <div className="pt-10 gap-3 w-[85%] mx-auto my-auto ">
       
       
       <Borrow/>
       <Bank/>
       <Fees/>
      </div>
      <div className="pt-10 px-5 w-fit mx-auto">
        <img src={Check_2_1} alt="" className="w-full max-w-[800px]"/>
      </div>

      <div className="mt-5">
<EmiCalculator
  options={false}
  selectedLoanId="gold"
/>      </div>

      <div className="pt-10 px-5 w-fit mx-auto">
        <img src={Check_1_1} alt="" className="w-full max-w-[800px]"/>
      </div>

             <Section_11
  isDarkMode={false}
  title="Frequently Asked Questions"
  subtitle="WE’VE GOT YOU COVERED"
  faqs={ [
  {
    question: "What is a gold loan?",
    answer:
      "A gold loan is a secured loan where you pledge your gold jewelry or coins as collateral to get instant cash.",
  },
  {
    question: "How is the loan amount decided?",
    answer:
      "The loan amount is based on the weight, purity, and current market value of your gold.",
  },
  {
    question: "Can I repay the loan early?",
    answer:
      "Yes! Most lenders allow prepayment or part-payment with minimal charges.",
  },
  {
    question: "Is my gold safe?",
    answer:
      "Absolutely! Gold pledged for a loan is insured and securely stored by the lender.",
  },
  {
    question: "Who can apply for a gold loan?",
    answer:
      `- Salaried individuals\n- Self-employed professionals/business owners\n- NRIs with valid passport and visa`,
  },
  {
    question: "How fast is the disbursal?",
    answer:
      "Funds can be disbursed within 24 hours of loan approval.",
  },
  {
    question: "Who can I contact for support or grievances?",
    answer:
      `Customer Support: 📞 94945 45792 | 94945 45137\nConsumer Grievance: 📞 77606 57415`,
  },
]
}/>
      <ContactusBanner/>
      <Footer_subscribe/>
      <Footer_New/>
    </div>
  )
}

export default GoldLoan;
