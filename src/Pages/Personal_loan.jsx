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
import Person_loan from '../assets/Images/Personal_loan.avif';
import Check_1_1 from '../assets/Images/check_1_.avif';
import Check_2_1 from '../assets/Images/check_2_.avif';
import Featurn from '../assets/Images/Featurn_1.avif';
import img1 from '../assets/Images/Person_loan_appscreen_1.avif';
import img2 from '../assets/Images/Person_loan_appscreen_2.avif';
import img3 from '../assets/Images/Person_loan_appscreen_3.avif';

import PersonalLoanRate from '../Components/Personal_loan_rate';
import Borrow from '../Components/Borrowbest';
import Bank from '../Components/Bankvsborrow';
import Fees from '../Components/Feestable';

import congrt from '../assets/Images/Congrt.avif';

const PersonalLoan = () => {
  return (
    <div className="cursor-default mx-auto">
      <div className="px-3 max-w-screen-2xl mx-auto">
        <Breadcrumbs/>
        <Section_1 
          loanType="Personal Loan"
          tag="Personal Loans"
          title="Get Instant Personal Loans with Borrowly – Your Loan, Your Way"
          description="Get a personal loan online with ease—right at your fingertips. Enjoy competitive interest rates, flexible repayment tenures, and access to 30+ banks and NBFCs offering pre-approved loan options designed to fit your needs."
          image={Person_loan}
        />
      </div>

      <div className="px-5 max-w-screen-2xl mx-auto">
     
        
        <Section_2 
          description="At Borrowly Loan, we provide smarter financial solutions to help you manage life’s important expenses—whether it’s for a wedding, medical emergency, travel, home renovation, education, or even purchasing a car.With quick approvals, transparent terms, and customized EMI options, Borrowly ensures you find the right loan offer in one place—without the stress of multiple applications. Explore trusted lenders, compare offers, and choose the personal loan that works best for you today."
/> 
        <Section_3
  title="3 Steps. Instant Loan. Zero Hassle."
  slides={[
    {
      title: "1. Install & Choose",
      text: "Download the Borrowly app, enter your loan requirement, and pick a repayment tenure that fits your lifestyle.",
      image: img1,
      light: true,
    },
    {
      title: "2. Verify & Apply",
      text: "Verify your mobile number, complete a quick KYC, and submit your application securely in just a few minutes.",
      image: img2,
      light: true,
    },
    {
      title: "3.Get Money in Your Account",
      text: "Once approved,your eligible loan amount is instantly credited to your bank account—fast,safe,stress-free.",
      image: img3,
      light: true,
    },
    {
      title: "Congratulations!",
      text: "With Borrowly, borrowing is now effortless—simple steps, quick approvals, and transparent terms.",
      image: congrt,
      light: false,
    },
  ]}
/>

<Section_4
  ftype="Simple eligibility, just 3 documents, and instant loan approvals in minutes"
  featureImg={Featurn}
  loanType="Personal Loan"
  whoCanApply={["Age: 18–65 years", "Income: ₹10,000 or more per month"]}
 whoCanApplyNote="No matter if you’re salaried or self-employed—Borrowly is for everyone."
  requiredDocs={["PAN Card", "Aadhaar Card", "Income Proof"]}
  requiredDocsNote="🚀 That’s it! With just these simple documents, you can get your loan approved and money in your account in as little as 5 minutes—fast, secure, and hassle-free."
  
  loanDetails={[
    { label: "💰 Interest Rate", value: "Enjoy competitive rates starting from 11.99% p.a. onwards, ensuring affordability for every borrower." },
    { label: "📌 Loan Amount", value: "Borrow as little as ₹10,000 or as much as ₹15 lakhs, tailored to your financial needs." },
    { label: "⏳ Tenure", value: "Choose flexible repayment terms from 6 months to 5 years—giving you the freedom to repay at your own pace." },
    { label: "⚡ Processing Fees", value: "Processing fees range from 0.5% to 4% of the loan amount (may vary across lenders), with complete transparency and no hidden charges." },
  ]}

  docdesc={"Applying for a personal loan with Borrowly is simple and hassle-free. Just keep these basic documents handy to ensure faster approval:"}
  docSections={[
  {
    title: "👨‍💼 Salaried Applicants",
    items: [
      { label: "ID Proof:", value: "PAN / Aadhaar / Passport / DL / Voter ID" },
      { label: "Address Proof:", value: "Aadhaar / Passport / Utility bill" },
      { label: "Income Proof:", value: " Last 3–6 months’ salary slips or bank statements (Form 16 if requested)" },
    ],
  },
  {
    title: "🏢 Self-Employed Applicants",
    items: [
      { label: "ID Proof:", value: "PAN / Aadhaar / Passport / DL / Voter ID" },
      { label: "Address Proof:", value: "Aadhaar / Passport / Utility bill" },
      { label: "Income Proof:", value: "ITR + audited financials (last 2 years) and bank statements (6–12 months)" },
    ],
  },
  {
    title: "🌍 NRI Applicants",
    items: [
      { label: "Passport & Visa:", value: "Valid passport and visa" },
      { label: "Employment Proof:", value: "Official work email/HR email, salary slips" },
      { label: "Banking:", value: "NRE/NRO and salary account statements (last 6 months)" },
      { label: "KYC:", value: "ID, address, income & asset proof" },
      { label: "Photos:", value: "Recent passport-size (self & guarantor, if required)" },
    ],
  },
  {
    title: "💡 Pro Tips",
    tips: [
      { text: "Clear scans/photos are accepted—no originals needed during online application", bold: true },
      { text: "Ensure your PAN matches your bank/KYC details to avoid delays.", bold: true },
    ],
  },
]
}
/>

      </div>

      <div className="pt-10 gap-3 w-[85%] mx-auto my-auto ">
       
       <PersonalLoanRate/>
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
  selectedLoanId="personal"
/>

      </div>

      <div className="pt-10 px-5 w-fit mx-auto">
        <img src={Check_1_1} alt="" className="w-full max-w-[800px]"/>
      </div>

     <Section_11
  isDarkMode={false}
  title="Frequently Asked Questions"
  subtitle="WE’VE GOT YOU COVERED"
  faqs={[
  { 
    question: "1. What is a Borrowly Personal Loan?", 
    answer: "A quick, hassle-free loan for your personal needs like travel, medical, education, or emergencies." 
  },
  { 
    question: "2. How much loan amount can I get?", 
    answer: "You can apply for amounts ranging from ₹50,000 to ₹25 Lakhs, depending on eligibility." 
  },
  { 
    question: "3. What is the tenure for repayment?", 
    answer: "Flexible repayment options from 12 months to 60 months." 
  },
  { 
    question: "4. What are the interest rates on Borrowly Personal Loans?", 
    answer: "Rates start as per the latest RBI guidelines and vary based on your credit score and profile." 
  },
  { 
    question: "5. How quickly can I get the loan?", 
    answer: "With instant approval and minimal paperwork, funds can be credited within 24–48 hours." 
  },
  { 
    question: "6. What documents are required?", 
    answer: "Basic KYC (ID & Address proof), income proof, and bank statements." 
  },
  { 
    question: "7. Can I prepay or foreclose my loan?", 
    answer: "Yes, Borrowly allows part-prepayment or full foreclosure with minimal charges." 
  },
  { 
    question: "8. What if I have a low CIBIL score?", 
    answer: "You can still apply. Borrowly helps find the best options, though interest rates may differ." 
  },
  { 
    question: "9. Are there any hidden charges?", 
    answer: "No. Borrowly ensures 100% transparency with all fees disclosed upfront." 
  }
]

}
/>

      <ContactusBanner/>
      <Footer_subscribe/>
      <Footer_New/>
    </div>
  )
}

export default PersonalLoan;
