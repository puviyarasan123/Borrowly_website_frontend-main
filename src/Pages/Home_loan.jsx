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
import Home_loan from '../assets/Images/Home_loan.avif';
import Check_1_1 from '../assets/Images/check_1_.avif';
import Check_2_1 from '../assets/Images/check_2_.avif';
import Featurn from '../assets/Images/Featurn_3.avif';

import img1 from '../assets/borrowly.avif/homeloan1.avif';
import img2 from '../assets/Images/Person_loan_appscreen_2.avif';
import img3 from '../assets/borrowly.avif/homeloan2.avif';

import Borrow from '../Components/Borrowbest';
import Bank from '../Components/Bankvsborrow';
import Fees from '../Components/Feestable';

import congrt from '../assets/Images/Congrt.avif';

const HomeLoan = () => {
  return (
    <div className="cursor-default mx-auto">
      <div className="px-3 max-w-screen-2xl mx-auto">
        <Breadcrumbs/>
        <Section_1 
          loanType="Home Loan"
          tag="Home Loan"
          title="Turning Dreams Into Addresses, Backed by Trust and Ease."
          description="At Borrowly, we know buying a home isn’t just a financial decision — it’s a life milestone.
That’s why we combine professional expertise with a customer-first approach, making your journey from dream to address seamless, supportive, and stress-free."
          image={Home_loan}
        />
      </div>

      <div className="px-5 max-w-screen-2xl mx-auto">
     
        
        <Section_2 
          description='Buying, renovating, or investing in a home should be exciting, not stressful. At Borrowly, we make it effortless. Compare pre-approved offers from 30+ trusted banks and NBFCs, choose flexible EMIs, and enjoy competitive interest rates — all at your fingertips.
          We combine professional expertise with a customer-first approach, ensuring your journey from dream to address is seamless, supportive, and stress-free.'/>
    <Section_3
  title="3 Steps. Instant Loan. Zero Hassle."
  slides={[
    {
      title: "1. Install & Choose",
      text: "Get the Borrowly app, explore our home loan options, select your preferred loan amount, and set a repayment tenure that aligns with your financial goals.",
      image: img1,
      light: true,
    },
    {
      title: "2. Verify & Apply",
      text: "Verify your mobile number, complete your KYC, and provide a few essential details to securely proceed with your home loan application.",
      image: img2,
      light: true,
    },
    {
      title: "3. Eligible Loan Amount",
      text: `After KYC and credit assessment, view your eligible home loan amount and select repayment terms that best suit your needs.`,
      image: img3,
      light: true,
    },
    {
      title: "Loan Disbursement",
      text: "Once approved, your Borrowly Home Loan will be disbursed directly to your bank account—bringing you closer to your dream home with ease and confidence.",
      image: congrt,
      light: false,
    },
  ]}
/>


<Section_4
  featureImg={Featurn}
  ftype={'Loan Features & Benefits'}
  loanType="Home Loan"
  whodesc="Borrowly Home Loans are designed to be accessible and inclusive. Whether you’re a salaried professional, a self-employed individual, or a business owner, we’ve got you covered."
  whoCanApply={["Age: 18–65 years", "Minimum Income: ₹15,000 per month or more" ,"Eligible Profiles: Salaried, self-employed, and business owners "]}
 whoCanApplyNote="We believe in equal opportunities — no matter your profession, we’re here to support your homeownership journey."
  requiredDocs={["PAN Card", "Aadhaar Card", "Income Proof (Salary slips, bank statements, or ITR)","Property-related documents"]}
  requiredDocsNote="Our digital-first process ensures you can upload and verify documents quickly and securely — making your loan approval faster and stress-free.  ✨ Borrowly – Reliable, Transparent, and Always Customer-First ✨"
  loandesc="At Borrowly, we’re committed to making your homeownership journey smooth, transparent, and stress-free. With competitive rates and flexible options, our home loans are designed to meet every need."
  loanDetails={[
    { label: "🔹 Interest Rate", value: "Affordable financing with interest rates starting from just 7.35% p.a. onwards." },
    { label: "🔹 Loan Amount", value: "Generous funding support with loans ranging from ₹3 crores to ₹15 crores, tailored for both modest and premium housing needs." },
    { label: "🔹 Tenure", value: "Choose repayment terms that fit your lifestyle, with flexible options from 5 years up to 30 years." },
    { label: "🔹 Processing Fees", value: "Transparent charges between 0.25% to 1% of the loan amount, depending on the lender." },
    { 
    label: "Coverage", 
    value: `We provide all types of home loans under one roof:
✅ New Home Purchase
✅ Home Construction
✅ Home Renovation or Extension
✅ Plot + Construction Loans
✅ Balance Transfer & Top-Up Loans
` 
  }

  ]}

  
  docdesc="At Borrowly, we keep the process simple, transparent, and stress-free. Here’s what you’ll need to apply for a home loan:"
  docSections={[
  {
    title: "🏢 Salaried Applicants",
    items: [
      { label: "🆔 ID Proof:", value: "PAN / Aadhaar / Passport / DL / Voter ID" },
      { label: "📍 Address Proof:", value: "Aadhaar / Passport / Utility bill" },
      { label: "💰 Income Proof:", value: "Latest 3–6 months salary slips / bank statements" },
      { label: "🏠 Property Documents:", value: "Sale deed / Allotment letter / Builder agreement" },
    ],
  },
  {
    title: "💼 Self-Employed",
    items: [
      { label: "🆔 ID Proof:", value: "PAN / Aadhaar / Passport / DL / Voter ID" },
      { label: "📍 Address Proof:", value: "Aadhaar / Passport / Utility bill" },
      { label: "💰 Income Proof:", value: "ITR + audited financials (last 2 yrs) & bank statements (6–12 months)" },
      { label: "🏠 Property Documents:", value: "Sale deed / Title deed / NOC / Approved building plan" },
    ],
  },
  {
    title: "🌍  NRI Applicants",
    items: [
      { label: "🛂 Passport & Visa:", value: "Valid passport and visa" },
      { label: "📧 Employment Proof:", value: "Official work email/HR email, salary slips" },
      { label: "🏦  Banking:", value: "NRE/NRO and salary account statements (last 6 months)" },
      { label: "✅ KYC:", value: "ID, address, income & asset proof" },
      { label: "🏠 Property Documents:", value: "Sale deed / Allotment letter / Builder NOC" },
      { label: "📷 Photos:", value: "Recent passport-size photos (self & guarantor, if required)" },
    ],
  },
  {
    title: "💡 Pro Tips for Faster Approval",
    tips: [
      { text: "✔ Keep property-related documents ready for quick processing", bold: true ,},
      { text: "✔ Ensure your PAN matches your KYC & bank details", bold: true },
      { text: "✔ Clear digital scans are acceptable — no need for originals during online application", bold: true },
    ],
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
  selectedLoanId="home"
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
    question: "1. What is a Home Loan?", 
    answer: "A Home Loan is a secured loan provided by banks or financial institutions to help you purchase, construct, or renovate a house by pledging the property as collateral." 
  },
  { 
    question: "2. Who can apply for a Home Loan?", 
    answer: "Any salaried, self-employed, or business professional with a stable income and good credit history can apply for a home loan." 
  },
  { 
    question: "3. What is the maximum loan amount I can get?", 
    answer: "The loan amount depends on factors like your income, repayment capacity, property value, and credit score. Typically, lenders provide up to 75–90% of the property value." 
  },
  { 
    question: "4. What documents are required to apply?", 
    answer: "Commonly required documents include: Identity proof (Aadhar, PAN, Passport, etc.), Address proof (Utility bill, Passport, etc.), Income proof (Salary slips, ITR, Bank statements), Property documents, and Photographs." 
  },
  { 
    question: "5. What is the eligibility criteria for a Home Loan?", 
    answer: "Eligibility is determined based on: Age (usually 21–65 years), Monthly/annual income, Employment or business stability, Credit score (preferably 700+), and Property valuation." 
  },
  { 
    question: "6. How long does it take to get a Home Loan sanctioned?", 
    answer: "If all documents are in order, loan approval can take anywhere between 3 to 10 working days depending on the lender." 
  },
  { 
    question: "7. What is the tenure of a Home Loan?", 
    answer: "Home loan tenures generally range from 5 to 30 years depending on your repayment capacity and lender policies." 
  },
  { 
    question: "8. What is the interest rate on Home Loans?", 
    answer: "Interest rates vary based on the lender, loan amount, applicant’s credit profile, and tenure. They can be either fixed or floating." 
  },
  { 
    question: "9. Can I get tax benefits on a Home Loan?", 
    answer: "Yes. Under the Income Tax Act, you can avail deductions on both principal repayment (Section 80C) and interest paid (Section 24B), subject to applicable limits." 
  },
  { 
    question: "10. Can I prepay or foreclose my Home Loan?", 
    answer: "Yes. Most lenders allow part-prepayment or foreclosure of a home loan. Some may charge a small fee depending on the loan type (fixed/floating interest)." 
  },
  { 
    question: "11. Can I transfer my Home Loan to another bank?", 
    answer: "Yes, through Home Loan Balance Transfer, you can shift your loan to another bank/NBFC offering lower interest rates or better terms." 
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

export default HomeLoan;
