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
import Business_loan from '../assets/Images/Business_loan.avif';
import Check_1_1 from '../assets/Images/check_1_.avif';
import Check_2_1 from '../assets/Images/check_2_.avif';
import Featurn from '../assets/Images/Featurn_5.avif';

import img1 from '../assets/borrowly.avif/businessloan1.avif';
import img2 from '../assets/Images/Person_loan_appscreen_2.avif';
import img3 from '../assets/borrowly.avif/businessloan2.avif';

import Borrow from '../Components/Borrowbest';
import Bank from '../Components/Bankvsborrow';
import Fees from '../Components/Feestable';

import Tick from '../assets/Icons/tick_Send.svg';
import congrt from '../assets/Images/Congrt.avif';

const BusinessLoan = () => {
  return (
    <div className="cursor-default mx-auto">
      <div className="px-3 max-w-screen-2xl mx-auto">
        <Breadcrumbs/>
        <Section_1 
          loanType="Business Loan"
          tag="Business Loans"
          title="Empowering Every Step Towards Your Future"
          description="At Borrowly, we believe your business deserves more than just funding—it deserves a true partner. Our business loans are crafted to support your vision, whether you’re expanding operations, hiring talent, or making strategic investments. With flexible solutions and a commitment to your growth, we stand beside you at every step, helping turn today’s goals into tomorrow’s success."
          image={Business_loan}
        />
      </div>

      <div className="px-5 max-w-screen-2xl mx-auto">
     
        
        <Section_2 
          description='Business Loans Made Simple with Borrowly Get instant access to business loans online with competitive interest rates, flexible tenures, and pre-approved offers from 30+ banks and NBFCs—all in one place. 
          From working capital and equipment purchases to shop renovations and business expansion, Borrowly helps you choose the best loan, EMI, and repayment option that fits your goals.
At Borrowly, we go beyond funding—we deliver smarter financial solutions to power your growth.'/>
                <Section_3
  title="Get Your Business Loan in 4 Easy Steps"
  slides={[
    {
      title: "1. Install & Choose",
      text: "Download the Borrowly app, select your business loan amount, and set a tenure that works for your cash flow.",
      image: img1,
      light: true,
    },
    {
      title: "2. Verify & Apply",
      text: "Complete a simple verification with your mobile number, KYC, and business details to apply instantly.",
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
ftype="Business Loan Features & Benefits"
  featureImg={Featurn}
  loanType="Business Loan"
  whoCanApply={["21–65 years", "₹25,000 or more"]}
 whoCanApplyNote="We don’t discriminate between salaried or self–employed applicants — everyone is welcome!"
  requiredDocs={["PAN Card", "Aadhaar Card", "Income Proof","Business-related documents (GST, ITR, Registration, Bank Statements)"]}
  requiredDocsNote="Get credit easily in just 5 minutes! Keep these handy:"
  loanDetails={[
    { label: "Interest Rate", value: "Starting from 10.99% p.a. onwards" },
    { label: "Loan Amount", value: "From ₹1 lakh to ₹50 lakhs" },
    { label: "Tenure", value: "Flexible repayment terms ranging from 12 months to 5 years" },
    { label: "Processing Fees", value: "1% to 3% of loan amount (varies by lender)" },
    { label: "Coverage:", value: "Working Capital Loans | Equipment / Machinery Purchase | Shop / Office Renovation | Business Expansion" },

  ]}
  docSections={[
  {
    title: "Salaried Applicants",
    items: [
      { label: "ID Proof:", value: "PAN / Aadhaar / Passport / DL / Voter ID" },
      { label: "Address Proof:", value: "Aadhaar / Passport / Utility bill" },
      { label: "Income Proof:", value: "Latest 3–6 months salary slips / bank statements" }
    ]
  },
  {
    title: "Self-Employed",
    items: [
      { label: "ID Proof:", value: "PAN / Aadhaar / Passport / DL / Voter ID" },
      { label: "Address Proof:", value: "Aadhaar / Passport / Utility bill" },
      { label: "Income Proof:", value: "ITR + audited financials (last 2 yrs) & bank statements (6–12 months)" },
      { label: "Business Proof:", value: "GST certificate / Udyam / Business registration / Trade license" }
    ]
  },
  {
    title: "NRI Applicants",
    items: [
      { label: "Passport & Visa:", value: "Valid passport and visa" },
      { label: "Employment Proof:", value: "Official work email/HR email, salary slips" },
      { label: "Banking:", value: "NRE/NRO and salary account statements (last 6 months)" },
      { label: "KYC:", value: "ID, address, income & asset proof" },
      { label: "Photos:", value: "Recent passport-size (self & guarantor, if required)" },
      { label: "Business Proof:", value: "Investment / Ownership documents" }
    ]
  },
  {
    title: "Pro tips",
    tips: [
      { text: "Keep business financials and GST returns ready for faster approval.", bold: true },
      { text: "Ensure PAN details match KYC & business registration docs.", bold: true },
      { text: "Clear digital scans are acceptable — no originals needed online.", bold: true }
    ]
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
  selectedLoanId="business"
/>      </div>

      <div className="pt-10 px-5 w-fit mx-auto">
        <img src={Check_1_1} alt="" className="w-full max-w-[800px]"/>
      </div>

             <Section_11
  isDarkMode={false}
  title="Frequently Asked Questions"
  subtitle="WE’VE GOT YOU COVERED"
  faqs={
      [
  {
    question: 'What is the Borrowly Affiliate Program?',
    answer:
      `The Borrowly Affiliate Program allows anyone to earn income by referring users to our platform.\n\nYou’ll earn:\n- ₹500+ on every successful loan disbursal\n- 50% commission on every agent or course referral\n\nAll earnings are tracked in real time through your personal dashboard.`,
  },
  {
    question: 'How do I become a Borrowly Trusted Agent?',
    answer:
      `To become a verified Borrowly agent:\n\n- Enroll in our one-time ₹1499 certification program\n- Complete onboarding and get access to your affiliate dashboard\n- Start sharing your referral link to earn commissions\n\nOnce registered, you’ll be recognized as a Borrowly Trusted Agent with full access to our services and lifetime earnings.`,
  },
  {
    question: 'Do I need experience to join as an agent or affiliate?',
    answer:
      `No. Our platform is designed for everyone — students, freelancers, influencers, or full-time professionals.\n\nWe provide full support and tools to get you started, even if you have no prior experience.`,
  },
  {
    question: 'What is CIBIL, and why should I check it with Borrowly?',
    answer:
      `CIBIL is a credit score that reflects your financial health. Borrowly helps you check your CIBIL score instantly — for free or at a minimal cost — and understand your loan eligibility.\n\nChecking your score through Borrowly offers:\n- Better loan recommendations\n- Pre-approved offers based on your credit profile\n- Full transparency with zero hidden charges`,
  },
  {
    question: 'How does checking my CIBIL score help with loan approvals?',
    answer:
      `Lenders use your CIBIL score to evaluate your creditworthiness. A higher score increases your chances of getting loans at better interest rates.\n\nBorrowly ensures:\n- You understand your score\n- You apply for loans that match your profile\n- Your loan approval chances are maximized`,
  },
  {
    question: 'What types of loans can I refer or apply for through Borrowly?',
    answer:
      `Borrowly supports:\n- Personal loans\n- Business loans\n- Instant digital loans\n- NBFC and Bank tie-ups\n\nYou or your referrals can compare loan offers and apply directly through our app or website.`,
  },
  {
    question: 'How much can I earn as a Borrowly agent?',
    answer:
      `There’s no earning limit. Agents typically earn:\n- ₹500+ per approved loan\n- 50% commission on every course/agent referral\n- Ongoing income through our lifetime affiliate model\n\nTop performers earn ₹10,000–₹50,000+ monthly, depending on their network size and activity.`,
  },
  {
    question: 'Is this affiliate program legal and transparent?',
    answer:
      `Yes, Borrowly operates under Wiseway Consultants Pvt Ltd, a registered private limited entity.\n\nAll earnings, referrals, and payouts are tracked transparently. Payouts are direct and on time.`,
  },
  {
    question: 'How do I track my referrals and earnings?',
    answer:
      `You get a personal affiliate dashboard where you can:\n- View referrals and loan applications\n- Track course enrollments\n- Monitor your commission in real time\n- Request support and payout history`,
  },
  {
    question: 'What support do I get as a Borrowly Agent?',
    answer:
      `We provide:\n- Onboarding assistance\n- Training materials\n- Ongoing affiliate support\n- Marketing creatives (banners, links, PDFs)`,
  },
]}/>
      <ContactusBanner/>
      <Footer_subscribe/>
      <Footer_New/>
    </div>
  )
}

export default BusinessLoan;
