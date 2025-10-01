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
import Vehicle_loan from '../assets/Images/Vehicle_loan.avif';
import Check_1_1 from '../assets/Images/check_1_.avif';
import Check_2_1 from '../assets/Images/check_2_.avif';
import Featurn from '../assets/Images/Featurn_2.avif';

import img1 from '../assets/borrowly.avif/vehicleloan1.avif';
import img2 from '../assets/Images/Person_loan_appscreen_2.avif';
import img3 from '../assets/borrowly.avif/vehicleloan2.avif';

import Borrow from '../Components/Borrowbest';
import Bank from '../Components/Bankvsborrow';
import Fees from '../Components/Feestable';

import congrt from '../assets/Images/Congrt.avif';

const VehicleLoan = () => {
  return (
    <div className="cursor-default mx-auto">
      <div className="px-3 max-w-screen-2xl mx-auto">
        <Breadcrumbs/>
        <Section_1 
          loanType="Vehicle Loans"
          tag="Vehicle Loans"
          title="From First Ride to Dream Drive — We Make It Easy."
          description="From your dream car to a daily two-wheeler or even commercial vehicles for your business — Borrowly makes it simple. Get fast approvals, competitive rates, and flexible tenures with a hassle-free loan experience."
          image={Vehicle_loan}
        />
      </div>

      <div className="px-5 max-w-screen-2xl mx-auto">
        <Section_2 
          description="Get a vehicle loan online at your fingertips with competitive interest rates and flexible tenures. Explore pre-approved loans from 30+ banks and NBFCs, all in one place.

Borrowly makes it easy to finance your dream car, a two-wheeler for daily rides, or commercial vehicles to grow your business. Whether it’s your first bike, a family car, or a fleet upgrade, find the best offers, interest rates, and EMI options—all online." />
               <Section_3
  title="Get Your Vehicle Loan in 3 Easy Steps."
  slides={[
    {
      title: "Step 1: Apply Online",
      text: "Fill out a quick application form with your basic details. It only takes a few minutes!",
      image: img1,
      light: true,
    },
    {
      title: "Step 2: Get Instant Approval",
      text: "We check your eligibility and provide pre-approved offers from 30+ banks and NBFCs—fast and hassle-free.",
      image: img2,
      light: true,
    },
    {
      title: "Step 3: Receive Funds & Drive",
      text: "Choose your loan offer,finalize the documentation. Your dream vehicle is ready to hit the road!",
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
         ftype="Vehicle Loan Features & Benefits 🚗"
      featureImg={Featurn}
      loanType="Vehicle Loan"
      whoCanApply={[
        "Age: 18–65 years",
        "Loan Amount: ₹15,000 or more",
        "Eligibility: Both salaried and self-employed applicants are welcome!",
      ]}
       whoCanApplyNote="We don’t discriminate between salaried or self–employed applicants — everyone is welcome!"

      requiredDocs={[
        "PAN Card",
        "Aadhaar Card",
        "Income Proof",
        "Vehicle-related documents",
      ]}
        requiredDocsNote="Get credit easily in just 5 minutes! Keep these handy:"
loandesc="Get your dream vehicle with flexible loans, competitive rates, and a simple online process. Borrowly makes vehicle financing faster, smarter, and hassle-free."
      loanDetails={[
        { label: "Interest Rate", value: "Starting from 8.99% p.a. onwards" },
        { label: "Loan Amount", value: "From ₹50,000 to ₹25 lakhs" },
        { label: "Tenure", value: "Flexible terms ranging from 12 months to 7 years" },
        { label: "Processing Fees", value: " 0.5% to 3% of loan amount (varies by lender)" },
        { label: "Coverage:", value: " Car Loans | Two-Wheeler Loans | Commercial Vehicle Loans" },
      ]}
      docSections={[
  {
    title: "Salaried Applicants",
    items: [
      { label: "ID Proof:", value: "PAN / Aadhaar / Passport / DL / Voter ID" },
      { label: "Address Proof:", value: "Aadhaar / Passport / Utility bill" },
      { label: "Income Proof:", value: "Latest 3–6 months salary slips / bank statements" },
      { label: "Vehicle Proof:", value: "Quotation / Proforma Invoice from dealer" },
    ],
  },
  {
    title: "Self-Employed",
    items: [
      { label: "ID Proof:", value: "PAN / Aadhaar / Passport / DL / Voter ID" },
      { label: "Address Proof:", value: "Aadhaar / Passport / Utility bill" },
      { label: "Income Proof:", value: "ITR + audited financials (last 2 yrs) & bank statements (6–12 months)" },
      { label: "Vehicle Proof:", value: "Quotation / Invoice" },
    ],
  },
  {
    title: "NRI Applicants",
    items: [
      { label: "Passport & Visa:", value: "Valid passport and visa" },
      { label: "Employment Proof:", value: "Official work email/HR email, salary slips" },
      { label: "Banking:", value: "NRE/NRO and salary account statements (last 6 months)" },
      { label: "KYC:", value: "ID, address, income & asset proof" },
      { label: "Photos:", value: "Recent passport-size (self & guarantor, if required)" },
      { label: "Vehicle Proof:", value: "Proforma invoice / RC copy" },
    ],
  },
  {
    title: "Pro tips",
    tips: [
      { text: "Clear scans are fine — no originals needed online.", bold: true },
      { text: "Ensure your PAN matches your KYC & bank details.", bold: true },
    ],
  },
  {
    title:"Check Eligibility",
    items:[  
      {label:"Benefits of Borrowly Vehicle Loans"},
        {label:"⚡ Quick online approval "},
          {label:"💰 Flexible repayment options"},
          {label: "📉 Competitive interest rates"},
          {label:" 📄 Minimal documentation"},
          {label: "🏦 Pre-approved loan offers from multiple banks & NBFCs Compare Loan"},


    ],
  },
    {
    title: "🛠 3-Step Loan Process",
    items: [
      { label: "Apply Online:", value: "Fill in your details and upload documents." },
      { label: "Get Approval:", value: "Receive instant pre-approval from multiple lenders" },
      { label: "Disbursement:", value: " Loan amount is credited to your account or dealer." },
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
  selectedLoanId="vehicle"
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
    question: "What is a vehicle loan?",
    answer:
      "A vehicle loan is a financial product that helps you purchase a car, two-wheeler, or commercial vehicle by paying in installments over a fixed tenure, instead of paying the full amount upfront.",
  },
  {
    question: "Who can apply for a vehicle loan?",
    answer: (
      <ul className="list-disc pl-6 space-y-1">
        <li>Salaried individuals</li>
        <li>Self-employed professionals/business owners</li>
        <li>NRIs with valid passport and visa</li>
      </ul>
    ),
  },
  {
    question: "What is the minimum and maximum loan amount?",
    answer: (
      <div>
        <p>Minimum: ₹50,000</p>
        <p>Maximum: ₹25 Lakhs</p>
        <p className="mt-2 text-gray-700">
          Loan eligibility depends on your income, credit score, and the lender’s policies.
        </p>
      </div>
    ),
  },
  {
    question: "What is the tenure of a vehicle loan?",
    answer:
      "Flexible tenure options are available from 12 months up to 7 years, depending on the vehicle type and lender.",
  },
  {
    question: "What documents are required?",
    answer: (
      <div className="space-y-2">
        <p>
          <strong>Salaried Applicants:</strong> PAN, Aadhaar, Passport, Driving License, salary slips/bank statements, vehicle quotation.
        </p>
        <p>
          <strong>Self-Employed Applicants:</strong> PAN, Aadhaar, ITR, audited financials, bank statements, vehicle quotation.
        </p>
        <p>
          <strong>NRIs:</strong> Passport, visa, employment proof, NRE/NRO statements, KYC, vehicle proforma invoice/RC.
        </p>
      </div>
    ),
  },
  {
    question: "Can I apply for a vehicle loan online?",
    answer:
      "Yes! Borrowly allows a 100% online application, including document upload, instant pre-approval, and loan comparison.",
  },
  {
    question: "How is the interest rate calculated?",
    answer:
      "Interest rates start from 8.99% p.a. and are calculated on a reducing balance method for most lenders. The exact rate depends on your profile and lender.",
  },
  {
    question: "Are there any processing fees?",
    answer:
      "Yes, processing fees range from 0.5% to 3% of the loan amount, varying by lender.",
  },
  {
    question: "Can I prepay my vehicle loan?",
    answer:
      "Most lenders allow prepayment or part-payment of the loan, though some may charge a nominal prepayment fee.",
  },
  {
    question: "How long does loan approval take?",
    answer: (
      <ul className="list-disc pl-6 space-y-1">
        <li>Instant pre-approval: Within minutes online</li>
        <li>Final approval & disbursement: 1–7 business days, depending on document verification</li>
      </ul>
    ),
  },
  {
    question: "What is the benefit of choosing Borrowly over banks?",
    answer: (
      <ul className="list-disc pl-6 space-y-1">
        <li>Fast online approval</li>
        <li>Compare multiple lenders in one place</li>
        <li>Flexible EMIs & tenures</li>
        <li>Minimal documentation required</li>
      </ul>
    ),
  },
  {
    question: "Who can I contact for support or grievances?",
    answer: (
      <div className="space-y-2">
        <p>
          <strong>Customer Support:</strong> 📞 94945 45792 | 94945 45137
        </p>
        <p>
          <strong>Consumer Grievance:</strong> 📞 77606 57415
        </p>
      </div>
    ),
  },
]}
/>
      <ContactusBanner/>
      <Footer_subscribe/>
      <Footer_New/>
    </div>
  )
}

export default VehicleLoan;
