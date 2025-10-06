import Breadcrumbs from "../Components/Breadcrumbs";
import Section_1 from "../Components/Loan_section/Section_1";
import Section_2 from "../Components/Loan_section/Section_2";
import Section_3 from "../Components/Loan_section/Section_3";
import Section_4 from "../Components/Loan_section/Section_4";
import ContactusBanner from '../Components/ContactusBanner';
import Section_11 from "../Components/Section_11";
import Footer_New from "../Components/Footer_New";
import Footer_subscribe from "../Components/Footer_subscribe";
import Check_1_1 from '../assets/Images/check_1_.avif';
import Check_2_1 from '../assets/Images/check_2_.avif';
import Featurn from '../assets/Images/Featurn_6.avif';
import Gold_loan from '../assets/Images/GoldloanBanner.avif';

import img1 from '../assets/borrowly.avif/insuranceloan1.avif';
import img2 from '../assets/Images/Person_loan_appscreen_2.avif';
import img3 from '../assets/borrowly.avif/insuranceloan2.avif';

import Borrow from '../Components/Borrowbest';
import Bank from '../Components/Bankvsborrow';
import Fees from '../Components/Feestable';
import congrt from '../assets/Images/Congrt.avif';

const InsuranceLoan = () => {
  return (
    <div className="cursor-default mx-auto">
      <div className="px-3 max-w-screen-2xl mx-auto">
        <Breadcrumbs/>
        <Section_1 
          loanType="Insurance"
          tag="Insurance"
          title="From First Rides to Fleet Upgrades We Make It Easy"
          description="Protect What Matters Most – Your Life, Health, Assets & Vehicles
Borrowly provides comprehensive insurance solutions with flexible plans, quick approvals, and easy claims. Get complete protection under one roof."
          image={Gold_loan}
        />
      </div>

      <div className="px-5 max-w-screen-2xl mx-auto">
     
        
        <Section_2 
          description='Now get insurance online at your fingertips with affordable premiums and wide coverage options. What’s more, you can explore pre-approved insurance plans from 30+ trusted providers, all in one place.

Borrowly provides smarter financial protection for your health, life, vehicle, and home. Whether it’s securing your family’s future, covering medical expenses, or safeguarding your assets — find the best plans, premiums, and benefits, all online.'/>
                <Section_3
  title="🚀 3 Steps. Instant Loan. Zero Hassle."
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
      title: "3. Get Money in Your Account",
      text: "Once approved, your eligible loan amount is instantly credited to your bank account—fast, safe, stress-free.",
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
  loanType="Insurance"
  whoCanApply={["18–65 years", "Salaried, self-employed, or business"," health, life, vehicle, or property coverage"]}
 whoCanApplyNote="We don’t discriminate between salaried or self–employed applicants — everyone is welcome!"
  requiredDocs={["PAN Card", "Aadhaar Card", "Income Proof","Insurance-specific documents"]}
  requiredDocsNote="Get credit easily in just 5 minutes! Keep these handy:"
  loanDetails={[
    { label: "Premiums", value: "Starting from as low as ₹500 per month" },
    { label: "Coverage Amount", value: "From ₹1 lakh to ₹1 crore+" },
    { label: "Tenure", value: "Flexible policy terms from 1 year to lifetime cover" },
    { label: "Processing Fees", value: "Zero to minimal (varies by insurer)" },
    { label: "Coverage:", value: "Health Insurance | Life Insurance | Vehicle Insurance | Property / Home Insurance" },

  ]}
  docSections={ [
  {
    title: "Salaried Applicants",
    items: [
      { label: "ID Proof:", value: "PAN / Aadhaar / Passport / DL / Voter ID" },
      { label: "Address Proof:", value: "Aadhaar / Passport / Utility bill" },
      {
        label: "Income Proof:",
        value: "Salary slips / Bank statements (if required for policy type)",
      },
      {
        label: "Medical Proof:",
        value: "Health reports (for applicable policies)",
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
        value: "ITR / Bank statements (6–12 months)",
      },
      {
        label: "Medical Proof:",
        value: "Health check-up reports (for certain health/life policies)",
      },
    ],
  },
  {
    title: "NRI Applicants",
    items: [
      { label: "Passport & Visa:", value: "Valid passport and visa" },
      { label: "Employment Proof:", value: "Work contract / HR letter" },
      {
        label: "Banking:",
        value: "NRE/NRO account statements (last 6 months)",
      },
      { label: "KYC:", value: "ID, address, income & asset proof" },
      {
        label: "Insurance Proof:",
        value: "Medical or property-related documents depending on plan",
      },
    ],
  },
  {
    title: "Pro tips",
    tips: [
      {
        text: "Clear scans are fine — no originals needed online",
        bold: true,
      },
      {
        text: "Health insurance may require medical tests depending on age & sum assured",
        bold: true,
      },
      {
        text: "Ensure PAN & Aadhaar are updated for faster approval",
        bold: true,
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

export default InsuranceLoan;
