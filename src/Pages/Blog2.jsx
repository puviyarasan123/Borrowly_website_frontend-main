import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FiChevronRight, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

import blogBanner from '../assets/Images/Blog3.avif'; // Assuming a banner image for the blog page
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

const SmartBorrowerGuide = () => {
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
            The Smart Borrower’s Guide: Things to Know Before Taking a Loan
          </h1>
          <p
            style={{ fontFamily: "PovetaracSansBold" }}
            className='w-full max-w-[800px] text-[16px] text-left lg:text-[14px] xl:text-lg mt-2 text-[#6D6D6D]'
            variants={fadeUp}
          >
            Being a smart borrower means preparing carefully before applying for a loan.
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
          {/* Blog Content Section */}
          <motion.div variants={blogItem}>
            <h2 style={{ fontFamily: "PovetaracSansBlack" }} className="text-2xl text-[#084DB3]">
              Steps Every Borrower Should Take
            </h2>
            <ul className="mt-6 space-y-4">
              <motion.li variants={blogItem} className="flex items-start gap-3">
                <FiCheckCircle className="text-[#00C2CC] w-6 h-6 flex-shrink-0 mt-1" />
                <div style={{ fontFamily: "PovetaracSansBold" }}>
                  <h3 className="text-lg text-gray-900">Know Your Credit Score</h3>
                  <p className="text-gray-600 text-[16px] mt-1">
                    A higher credit score can help you secure better interest rates.
                  </p>
                </div>
              </motion.li>
              <motion.li variants={blogItem} className="flex items-start gap-3">
                <FiCheckCircle className="text-[#00C2CC] w-6 h-6 flex-shrink-0 mt-1" />
                <div style={{ fontFamily: "PovetaracSansBold" }}>
                  <h3 className="text-lg text-gray-900">Evaluate Loan Options</h3>
                  <p className="text-gray-600 text-[16px] mt-1">
                   Compare different lenders, including banks, NBFCs, and fintech platforms.
                  </p>
                </div>
              </motion.li>
              <motion.li variants={blogItem} className="flex items-start gap-3">
                <FiCheckCircle className="text-[#00C2CC] w-6 h-6 flex-shrink-0 mt-1" />
                <div style={{ fontFamily: "PovetaracSansBold" }}>
                  <h3 className="text-lg text-gray-900">Understand Total Repayment</h3>
                  <p className="text-gray-600 text-[16px] mt-1">
                    Be aware that the total repayment includes the principal, interest, and any other applicable charges.
                  </p>
                </div>
              </motion.li>
              <motion.li variants={blogItem} className="flex items-start gap-3">
                <FiCheckCircle className="text-[#00C2CC] w-6 h-6 flex-shrink-0 mt-1" />
                <div style={{ fontFamily: "PovetaracSansBold" }}>
                  <h3 className="text-lg text-gray-900">Set a Realistic Budget</h3>
                  <p className="text-gray-600 text-[16px] mt-1">
                   Make sure your EMIs do not exceed 40% of your monthly income.
                  </p>
                </div>
              </motion.li>
              <motion.li variants={blogItem} className="flex items-start gap-3">
                <FiCheckCircle className="text-[#00C2CC] w-6 h-6 flex-shrink-0 mt-1" />
                <div style={{ fontFamily: "PovetaracSansBold" }}>
                  <h3 className="text-lg text-gray-900">Keep Documentation Ready</h3>
                  <p className="text-gray-600 text-[16px] mt-1">
                    Have your ID proof, address proof, and income statements prepared in advance.
                  </p>
                </div>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={blogItem}>
            <p className="mt-4 italic text-sm text-gray-500">
              Tip: Preparation reduces delays and avoids surprises during the loan process.
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

export default SmartBorrowerGuide;