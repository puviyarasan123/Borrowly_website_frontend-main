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
import Education_loan from '../assets/Images/Education_loan.avif';
import Check_1_1 from '../assets/Images/check_1_.avif';
import Check_2_1 from '../assets/Images/check_2_.avif';
import Featurn from '../assets/Images/Featurn_4.avif';

import img1 from '../assets/borrowly.avif/educationloan1.avif';
import img2 from '../assets/Images/Person_loan_appscreen_2.avif';
import img3 from '../assets/borrowly.avif/educationloan2.avif';

import Borrow from '../Components/Borrowbest';
import Bank from '../Components/Bankvsborrow';
import Fees from '../Components/Feestable';

import Tick from '../assets/Icons/tick_Send.svg';
import congrt from '../assets/Images/Congrt.avif';

const EducationLoan = () => {
  return (
    <div className="cursor-default mx-auto">
      <div className="px-3 max-w-screen-2xl mx-auto">
        <Breadcrumbs/>
        <Section_1 
          loanType="Education Loan"
          tag="🌍 Foreign Education Loans"
          title="Your Passport to Global Education"
          description="Studying abroad should be a life-changing experience, not a financial struggle. Borrowly’s Foreign Education Loans cover tuition, living costs, travel, and more—so you can focus on learning, not worrying."
          image={Education_loan}
        />
      </div>

      <div className="px-5 max-w-screen-2xl mx-auto">
     
        
        <Section_2 
          description='Now get an education loan online at your fingertips with competitive interest rates and flexible repayment options. What’s more, explore pre-approved education loans from 30+ banks and NBFCs—all in one place.

At Borrowly, we provide smarter financial solutions to help you pursue higher studies in India or abroad. From tuition fees and living expenses to study materials and travel, you’ll find the best loan offers, interest rates, and EMI options—all online, all hassle-free.

Key Benefits:
✔ Compare and choose from 30+ lenders
✔ Quick online application & fast approvals
✔ Covers tuition, accommodation, travel & more
✔ Flexible repayment terms to suit your future'/>

 <Section_3
  title="⚡ Get Your Loan in Just 3 Simple Steps"
  slides={[
    {
      title: "1. Install & Choose",
      text: "Download the Borrowly app, select your loan amount, and set a repayment tenure that works best for you.",
      image: img1,
      light: true,
    },
    {
      title: "2. Verify & Apply",
      text: "Complete quick verification by entering your mobile number and filling in basic details to submit your loan application.",
      image: img2,
      light: true,
    },
    {
      title: "3.Get Your Eligible Loan Amount",
      text: "Once approved,your eligible loan amount is instantly credited to your bank account—fast, simple, stress-free.",
      image: img3,
      light: true,
    },
    {
      title: "Congratulations!",
      text: "Your Borrowly loan will be disbursed directly to your bank account—quick, simple, and stress-free.",
      image: congrt,
      light: false,
    },
  ]}
/>

<Section_4
ftype="🎓 Education Loan Features & Benefits"
  featureImg={Featurn}
  loanType="Education Loan"
  whoCanApply={["Students aged 18–65 years (with parents/guardians as co-applicants if required)", "Minimum family income of ₹15,000 or more","Applicants pursuing higher studies in India or abroad"]}
 whoCanApplyNote="💡 Whether you’re a salaried professional, self-employed parent, or guardian—Borrowly makes higher education loans accessible to all.
"
  requiredDocs={["PAN Card (student/co-applicant)", "Aadhaar Card", "Income Proof (salary slips, bank statements, or ITR)","Admission Letter from the institution","Fee Structure / Prospectus"]}
  requiredDocsNote="
⚡ With these documents, your Education Loan can be approved in minutes—so you can focus on your future."
  loanDetails={[
    { label: "Interest Rate", value: "Starting from 8.99% p.a. onwards" },
    { label: "Loan Amount", value: "From ₹50,000 to ₹40 lakhs" },
    { label: "Tenure", value: "Flexible terms ranging from 1 year to 15 years" },
    { label: "Processing Fees", value: "0.5% to 2% of loan amount (varies by lender)" },
    { label: "Coverage:", value: "Tuition Fees | Hostel / Living Expenses | Study Materials & Equipment | Travel & Visa Expenses (for abroad studies)" },

  ]}
  docSections={[
    {
      title: "Salaried Applicants",
      items: [
        { label: "ID Proof:", value: "PAN / Aadhaar / Passport / DL / Voter ID" },
        { label: "Address Proof:", value: "Aadhaar / Passport / Utility bill" },
        {
          label: "Income Proof:",
          value: "Latest 3–6 months salary slips / bank statements, Form 16",
        },
      ],
    },
    {
      title: "Self-Employed",
      items: [
        { label: "ID Proof:", value: "PAN / Aadhaar / Passport / DL / Voter ID" },
        { label: "Address Proof:", value: "Aadhaar / Passport / Utility bill" },
        {
          label: "Income Proof:",
          value:
            "ITR + audited financials (last 2 yrs) & bank statements (6–12 months)",
        },
        {
          label: "Business Proof:",
          value:
            "GST certificate / Udyam / Business registration / Trade license",
        },
      ],
    },
    {
      title: "NRI Applicants",
      tips: [
        {
          text: "Passport & Visa",
          bold: true,
        },
        {
          text: "University Admission Letter",
          bold: true,
        },
        {
          text: "Bank Statements / Income Proof of Sponsor",
          bold: true,
        },
        {
          text: "Travel & Visa-related documents",
          bold: true,
        },
      ],
    },
    {
      title: "Pro tips",
      tips: [
        {
          text: "Keep your admission letter & fee structure handy — it’s mandatory.",
          bold: true,
        },
        {
          text: "Ensure co-applicant (parent/guardian) documents are ready for faster approval.",
          bold: true,
        },
        {
          text: "Clear scans are fine — no originals needed online.",
          bold: true,
        },
      ],
    },
    {
      title: "Student Applicants",
      items: [
        { label: "ID Proof:", value: "Aadhaar / Passport" },
        {
          label: "Admission Proof:",
          value: "Offer / Admission letter from university or college",
        },
        {
          label: "Academic Records:",
          value: "Mark sheets & certificates (10th, 12th, degree, etc.)",
        },
        {
          label: "Fee Structure:",
          value: "Official fee schedule from institution",
        },
      ],
    }
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
  selectedLoanId="education"
/></div>

      <div className="pt-10 px-5 w-fit mx-auto">
        <img src={Check_1_1} alt="" className="w-full max-w-[800px]"/>
      </div>

          <Section_11
  isDarkMode={false}
  title="Frequently Asked Questions"
  subtitle="WE’VE GOT YOU COVERED"
  faqs={ [
  {
    question: "What is an Education Loan?",
    answer:
      "An education loan is financial support provided to students for pursuing higher studies in India or abroad. It covers expenses like tuition fees, living costs, study materials, and travel.",
  },
  {
    question: "Who can apply for an education loan?",
    answer:
      "Students aged 18–65 years can apply. A parent or guardian usually acts as a co-applicant to support the loan. Both salaried and self-employed families are eligible.",
  },
  {
    question: "What expenses are covered under Borrowly’s Education Loan?",
    answer: (
      <ul className="list-disc pl-6 space-y-1">
        <li>Tuition fees</li>
        <li>Living and hostel expenses</li>
        <li>Books and study materials</li>
        <li>Travel expenses (for overseas education)</li>
        <li>Examination, library, and lab fees</li>
      </ul>
    ),
  },
  {
    question: "Do I need a co-applicant for my education loan?",
    answer:
      "Yes, in most cases a parent, guardian, or spouse acts as a co-applicant to provide financial security to the lender.",
  },
  {
    question: "Is collateral required for an education loan?",
    answer:
      "Collateral is not required for smaller loan amounts (limits vary by lender). For higher amounts, banks/NBFCs may request collateral such as property or fixed deposits.",
  },
  {
    question: "What is the repayment period for education loans?",
    answer:
      "Repayment usually begins after the course is completed, along with a moratorium period (6–12 months). Tenures can range from 5 to 15 years, depending on the loan.",
  },
  {
    question: "Are there tax benefits on education loans?",
    answer:
      "Yes ✅ Interest paid on education loans is eligible for tax deduction under Section 80E of the Income Tax Act.",
  },
  {
    question: "How long does loan approval take?",
    answer:
      "With Borrowly’s digital process, you can get instant eligibility checks and quick approvals. Traditional approvals may take a few working days.",
  },
  {
    question: "Can I apply for an education loan online?",
    answer:
      "Absolutely. With Borrowly, you can compare offers from 30+ banks & NBFCs and apply fully online—no branch visits needed.",
  },
]}
/>
      <ContactusBanner/>
      <Footer_subscribe/>
      <Footer_New/>
    </div>
  )
}

export default EducationLoan;
