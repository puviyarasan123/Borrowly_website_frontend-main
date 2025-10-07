import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FiChevronRight, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

import blogBanner from '../assets/Images/Blog2.avif';
import Footer_New from '../Components/Footer_New';

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
const chip = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
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

const BlogPage = () => {
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
            How to Choose the Right Loan for Your Needs
          </h1>
          <p
            style={{ fontFamily: "PovetaracSansBold" }}
            className='w-full max-w-[800px] text-[16px] text-left lg:text-[14px] xl:text-lg mt-2 text-[#6D6D6D]'
            variants={fadeUp}
          >
            A professional guide on loans, credit scores, and money management. Choosing the right loan is critical to financial well-being. Borrowers must assess their requirements, repayment capacity, and loan purpose.
          </p>
        </motion.div>

        <motion.div variants={slideUp} className="rounded-2xl mt-8">
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
          {/* Blog Content Section */}
          <motion.div variants={blogItem}>
            <h2 style={{ fontFamily: "PovetaracSansBlack" }} className="text-2xl text-[#084DB3]">
              Key Steps
            </h2>
            <ul className="mt-6 space-y-4">
              <motion.li variants={blogItem} className="flex items-start gap-3">
                <FiCheckCircle className="text-[#00C2CC] w-6 h-6 flex-shrink-0 mt-1" />
                <div style={{ fontFamily: "PovetaracSansBold" }}>
                  <h3 className="text-lg text-gray-900">Determine Your Loan Type</h3>
                  <p className="text-gray-600 text-[16px] mt-1">
                    First, determine the purpose of your loan, such as for personal use, business, education, or a home.
                  </p>
                </div>
              </motion.li>
              <motion.li variants={blogItem} className="flex items-start gap-3">
                <FiCheckCircle className="text-[#00C2CC] w-6 h-6 flex-shrink-0 mt-1" />
                <div style={{ fontFamily: "PovetaracSansBold" }}>
                  <h3 className="text-lg text-gray-900">Evaluate Interest Rates</h3>
                  <p className="text-gray-600 text-[16px] mt-1">
                    Compare both fixed and floating interest rates to see which one works best for your financial situation.
                  </p>
                </div>
              </motion.li>
              <motion.li variants={blogItem} className="flex items-start gap-3">
                <FiCheckCircle className="text-[#00C2CC] w-6 h-6 flex-shrink-0 mt-1" />
                <div style={{ fontFamily: "PovetaracSansBold" }}>
                  <h3 className="text-lg text-gray-900">Check Fees and Charges</h3>
                  <p className="text-gray-600 text-[16px] mt-1">
                    Be sure to look for any hidden costs, such as processing fees, prepayment penalties, and late payment charges.
                  </p>
                </div>
              </motion.li>
              <motion.li variants={blogItem} className="flex items-start gap-3">
                <FiCheckCircle className="text-[#00C2CC] w-6 h-6 flex-shrink-0 mt-1" />
                <div style={{ fontFamily: "PovetaracSansBold" }}>
                  <h3 className="text-lg text-gray-900">Assess Tenure & EMI</h3>
                  <p className="text-gray-600 text-[16px] mt-1">
                    Ensure the monthly installment (EMI) fits comfortably within your budget before committing to a loan.
                  </p>
                </div>
              </motion.li>
              <motion.li variants={blogItem} className="flex items-start gap-3">
                <FiCheckCircle className="text-[#00C2CC] w-6 h-6 flex-shrink-0 mt-1" />
                <div style={{ fontFamily: "PovetaracSansBold" }}>
                  <h3 className="text-lg text-gray-900">Review Lender Credibility</h3>
                  <p className="text-gray-600 text-[16px] mt-1">
                    Choose trusted banks or fintech lenders like Borrowly for faster approvals and a reliable experience.
                  </p>
                </div>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={blogItem}>
            <p className="mt-4 italic text-sm text-gray-500">
              Tip: Always read the fine print and fully understand all terms before committing.
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

export default BlogPage;