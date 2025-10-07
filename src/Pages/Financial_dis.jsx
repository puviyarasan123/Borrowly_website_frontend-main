import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

import blogBanner from '../assets/Images/Blog1.avif';
import Footer_New from '../Components/Footer_New'; // Assuming this is correctly imported

/* ---------- motion variants ---------- */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const slideUp = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};
const blogItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ---------- breadcrumbs (animated) ---------- */
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <motion.nav
      className="text-sm cursor-default text-gray-600 my-4"
      variants={fadeUp}
    >
      <ul style={{ fontFamily: "PovetaracSansBold" }} className="flex text-[12px] md:text-[16px] flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="hover:underline underline-offset-4 hover:text-[#00C2CC]">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label = value.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
          return (
            <li key={to} className="flex items-center gap-2">
              <FiChevronRight className="text-gray-400" />
              {isLast ? (
                <span className="font-medium text-black">{label}</span>
              ) : (
                <Link to={to} className="hover:underline underline-offset-4 hover:text-[#00C2CC]">{label}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};

const BlogsPage = () => {
  return (
    <>
      <motion.div
        className='max-w-screen-xl cursor-default mx-auto py-5 px-5'
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp}>
          <Breadcrumbs />
          <h1
            style={{ fontFamily: "PovetaracSansBlack" }}
            className="text-4xl xl:text-5xl pb-8 md:pb-12 mt-5"
            variants={fadeUp}
          >
            Borrowly Financial Insights
          </h1>
          <p
            style={{ fontFamily: "PovetaracSansBold" }}
            className='text-lg'
            variants={fadeUp}
          >
            Empowering Smarter Borrowing Decisions
          </p>
          <p
            style={{ fontFamily: "PovetaracSansBold" }}
            className='w-full max-w-[800px] text-[16px] text-left lg:text-[14px] xl:text-lg mt-2 text-[#6D6D6D]'
            variants={fadeUp}
          >
            A collection of professional blogs by Borrowly designed to educate and guide customers towards financial discipline, smart saving, and responsible borrowing across all types of loans.
          </p>
        </motion.div>

        <motion.div variants={slideUp} className="overflow-hidden rounded-2xl mt-8">
          <motion.img
            src={blogBanner}
                         alt="How to Choose a Loan Banner"
                         className="w-full h-auto max-h-[600px] object-cover rounded-2xl"
            initial={{ scale: 1.02 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div
          className="mt-12 space-y-12"
          variants={container}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Blog 1 */}
          <motion.div variants={blogItem}>
            <h2 style={{ fontFamily: "PovetaracSansBlack" }} className="text-2xl text-[#084DB3]">
              1. An Introduction to Financial Discipline and Its Benefits
            </h2>
            <p style={{ fontFamily: "PovetaracSansBold" }} className="text-lg mt-3 text-gray-700">
             Financial discipline is the foundation of stability, helping individuals and businesses take control of their financial future. It's about creating habits that ensure long-term stability and freedom.
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-600">
              <li>Reduces financial stress </li>
             <li>Improves creditworthiness </li>
            <li>Helps achieve long-term goals </li>
            </ul>
            <p className="mt-4 italic text-sm text-gray-500">
              Borrowly Insight: At Borrowly, we believe financial discipline is the first step before borrowing. When customers approach loans with a disciplined mindset, they borrow smartly and repay confidently.
            </p>
          </motion.div>

          {/* Blog 2 */}
          <motion.div variants={blogItem}>
            <h2 style={{ fontFamily: "PovetaracSansBlack" }} className="text-2xl text-[#084DB3]">
              2. 30 Smart Money-Saving Tips to Get Out of the Debt Trap
            </h2>
            <p style={{ fontFamily: "PovetaracSansBold" }} className="text-lg mt-3 text-gray-700">
            Debt can feel overwhelming, but with structure and commitment, anyone can overcome it.Here are 30 proven money-saving methods that help you recover financially and regain control.
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-600">
             <li>Create a detailed budget — track every expense </li>
              <li>Avoid impulse spending and lifestyle inflation </li>
            <li>Pay high-interest debts first </li>
            </ul>
            <p className="mt-4 italic text-sm text-gray-500">
             Borrowly Insight: Borrowly's personalized loan options can help consolidate and simplify repayments, reducing stress and helping rebuild credit faster.
            </p>
          </motion.div>

          {/* Blog 3 */}
          <motion.div variants={blogItem}>
            <h2 style={{ fontFamily: "PovetaracSansBlack" }} className="text-2xl text-[#084DB3]">
              3. The Smart Borrower's Guide: Things to Know Before Taking a Loan
            </h2>
            <p style={{ fontFamily: "PovetaracSansBold" }} className="text-lg mt-3 text-gray-700">
             Before signing any loan agreement, every borrower should understand what they're committing to. It is important to know your financial need, credit score, and to compare offers wisely before making a decision.
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-600">
              <li>Define your loan purpose clearly</li>
              <li>Compare interest rates and tenures </li>
              <li>Read the fine print carefully </li>
            </ul>
            <p className="mt-4 italic text-sm text-gray-500">
             Borrowly Insight: Borrowly simplifies the process by offering transparent comparisons and quick approvals, ensuring you borrow only what you need and can repay comfortably.
            </p>
          </motion.div>

          {/* Blog 4 */}
          <motion.div variants={blogItem}>
            <h2 style={{ fontFamily: "PovetaracSansBlack" }} className="text-2xl text-[#084DB3]">
              4. Understanding Different Types of Loans
            </h2>
            <p style={{ fontFamily: "PovetaracSansBold" }} className="text-lg mt-3 text-gray-700">
              Every financial goal needs the right loan. Understanding your options helps you borrow smartly and plan repayments efficiently.
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-600">
            <li>Home Loans – Build your dream home with smart repayment options</li>
           <li>Business Loans – Scale your enterprise efficiently </li>
              <li>Gold Loans – Secure short-term liquidity safely </li>
            </ul>
            <p className="mt-4 italic text-sm text-gray-500">
            Borrowly Insight: With Borrowly, customers can compare and apply for multiple loan types online, with faster approvals and complete transparency.
            </p>
          </motion.div>
          
          {/* Blog 5 */}
          <motion.div variants={blogItem}>
            <h2 style={{ fontFamily: "PovetaracSansBlack" }} className="text-2xl text-[#084DB3]">
              5. Five Credit Mistakes You Should Never Make
            </h2>
            <p style={{ fontFamily: "PovetaracSansBold" }} className="text-lg mt-3 text-gray-700">
            Your credit score defines your financial reputation. Avoiding key mistakes ensures long-term credit health.
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-600">
              <li>Never miss EMI payments </li>
              <li>Avoid maxing out your credit cards</li>
            <li>Regularly check your credit report for errors </li>
            </ul>
            <p className="mt-4 italic text-sm text-gray-500">
            Borrowly Insight: Borrowly helps customers understand and improve their credit profile before loan applications, ensuring better approval chances and lower interest rates.
            </p>
          </motion.div>

        </motion.div>
      </motion.div>
      <div className="pt-16">
        <Footer_New/>
      </div>
    </>
  );
};

export default BlogsPage;