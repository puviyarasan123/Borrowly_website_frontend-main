import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { FiCheckCircle, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

// You can reuse the same assets for now, or replace with car-loan specific images later.
import personal_loan_banner from '../assets/Images/CarLoan_Banner.jpg';
import EmiCalculator from '../Components/EmiCalculator';
import Personal_laon_icons_2 from "../assets/Icons/carloan.png";
import Calulator_image from '../assets/Images/CalculatorImage_.avif';

import Personloan_required_1 from '../assets/Icons/Personloan_required_1.svg';
import Personloan_required_2 from '../assets/Icons/Personloan_required_2.svg';
import Personloan_required_3 from '../assets/Icons/Personloan_required_3.svg';
import Personloan_required_4 from '../assets/Icons/Personloan_required_4.svg';
import quote from '../assets/Icons/quote.svg';

import Footer_New from '../Components/Footer_New'

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

const CarLoanEmi = () => {
  return (
    <>
    <motion.div
      className='max-w-screen-xl cursor-default mx-auto py-5'
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className='px-5' variants={fadeUp}>
        <Breadcrumbs />
        <motion.h1
          style={{ fontFamily: "PovetaracSansBlack" }}
          className="text-4xl xl:text-5xl pb-8 md:pb-12 mt-5"
          variants={fadeUp}
        >
          Car Loan EMI Calculator
        </motion.h1>

        <motion.div variants={slideUp} className="overflow-hidden rounded-2xl">
          <motion.img
            src={personal_loan_banner}
            alt="Car Loan Banner"
            className="w-full"
            initial={{ scale: 1.02 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <h1
            style={{ fontFamily: "PovetaracSansBlack" }}
            className='pt-10 text-xl xl:text-2xl pb-5'
          >
            Calculate Your Car Loan EMI in Seconds
          </h1>
          <p
            style={{ fontFamily: "PovetaracSansBold" }}
            className='text-lg'
          >
            Buying a new or used car? Estimate your monthly EMI instantly. Enter the on-road price (or loan amount),
            interest rate, down payment, and tenure to plan a budget-friendly repayment schedule. Test different combinations,
            compare outcomes, and choose the option that fits your goals—no sign-ups, no guesswork.
          </p>
        </motion.div>
      </motion.div>

      {/* Calculator Section */}
      <motion.div
        className='pb-12 max-w-screen-lg mx-auto md:pb-24'
        variants={fadeUp}
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* If your EmiCalculator supports extra props for car loans, pass them here. */}
        <EmiCalculator options={false} />
      </motion.div>

      {/* Calculator details section */}
      <motion.div
        className="flex px-5 flex-col lg:flex-row gap-5 lg:gap-10"
        variants={container}
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Right: content (first visually) */}
        <motion.div className="flex-1" variants={fadeUp}>
          <h1
            className="text-xl xl:text-2xl pb-3"
            style={{ fontFamily: "PovetaracSansBlack" }}
          >
            How the Car Loan EMI Calculator Works
          </h1>

          <p
            className="text-base md:text-lg text-gray-700"
            style={{ fontFamily: "PovetaracSansBold" }}
          >
            Our car loan EMI calculator helps you estimate your monthly installment so you can shop with confidence.
            Enter your inputs and get instant results.
          </p>

          <motion.div className="mt-6" style={{ fontFamily: "PovetaracSansBold" }}>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={container}
            >
              {["Monthly EMI", "Total Interest", "Total Payable"].map((label) => (
                <motion.span
                  key={label}
                  variants={chip}
                  className="px-3 py-1.5 rounded-full bg-[#EAF2FF] text-[#084DB3] text-sm inline-flex items-center gap-2"
                >
                  <FiCheckCircle />
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Inputs list */}
          <motion.div className="mt-6 space-y-5" variants={container}>
            <motion.div className="flex items-start gap-3" variants={fadeUp}>
              <div>
                <p style={{ fontFamily: "PovetaracSansBlack" }} className="text-lg text-gray-900 py-2">On-road Price / Loan Amount</p>
                <p style={{ fontFamily: "PovetaracSansBold" }} className="text-gray-600 text-[18px]">
                  Either enter the car's on-road price and down payment, or directly enter the loan amount you plan to borrow.
                </p>
              </div>
            </motion.div>

            <motion.div className="flex items-start gap-3" variants={fadeUp}>
              <div>
                <p style={{ fontFamily: "PovetaracSansBlack" }} className="text-lg text-gray-900">Interest Rate</p>
                <ul className="text-gray-600 text-sm list-disc pl-5 space-y-1 pt-2">
                  <li className="text-lg">
                    <span>Fixed rate</span> — same EMI for the entire tenure.
                  </li>
                  <li className="text-lg">
                    <span>Floating rate</span> — varies with market/base rate; EMI may change.
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div className="flex items-start gap-3" variants={fadeUp}>
              <div>
                <p style={{ fontFamily: "PovetaracSansBlack" }} className="text-lg text-gray-900 ">Loan Tenure</p>
                <p style={{ fontFamily: "PovetaracSansBold" }} className="text-gray-600 text-[18px]">
                  Choose a repayment period. Car loan tenures typically range from <span className="font-medium">1 to 7 years</span> for new cars and <span className="font-medium">1 to 5 years</span> for used cars.
                </p>
              </div>
            </motion.div>

            <motion.div className="flex items-start gap-3" variants={fadeUp}>
              <div>
                <p style={{ fontFamily: "PovetaracSansBlack" }} className="text-lg text-gray-900 ">Down Payment (Optional)</p>
                <p style={{ fontFamily: "PovetaracSansBold" }} className="text-gray-600 text-[18px]">
                  A higher down payment lowers your loan amount and reduces EMI and total interest.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Left: fun visual panel */}
        <motion.div className="flex-1" variants={slideUp}>
          <div className="relative bg-[#00C2CC] py-5 rounded-3xl h-full flex flex-col items-center justify-center overflow-hidden">
            <div className='flex-1 flex px-2.5 py-3 items-center'>
              <motion.p
                style={{ fontFamily: "PovetaracSansBold" }}
                className="text-black bg-white w-fit mx-auto py-2.5 md:py-3.5 text-center text-sm px-4 md:px-7 rounded-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              >
                Enter price, rate & tenure — get your car EMI instantly.
              </motion.p>
            </div>
            <motion.div
              className="w-full flex items-end justify-center"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={Personal_laon_icons_2} alt='' className='w-[80%]' />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Formula section */}
      <motion.div
        className="flex flex-col-reverse lg:flex-row py-12 md:py-24 gap-12 items-center"
        variants={container}
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div className="flex justify-center px-10" variants={fadeUp}>
          <motion.img
            src={Calulator_image}
            alt="Calculator"
            className="w-[250px] rounded-xl"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          />
        </motion.div>

        <motion.div className="flex-1 px-5" variants={fadeUp}>
          <h2 className="text-xl xl:text-2xl mb-4" style={{ fontFamily: "PovetaracSansBlack" }}>
            The EMI Calculation Formula
          </h2>

          <p className="mb-6 text-xl" style={{ fontFamily: "PovetaracSansBold" }}>
            EMI = {" "}
            <span className="bg-[#F4F4F4] px-2 py-1 rounded">
              [P × R × (1+R)^N] / [(1+R)^N – 1]
            </span>
          </p>

          <motion.div className="space-y-4 text-gray-700 text-[18px]" variants={container}>
            {[
              <> <span className="font-semibold">P</span> → Principal loan amount </>,
              <> <span className="font-semibold">R</span> → Monthly interest rate. (If annual rate = <b>12%</b>, then R = 12 ÷ (12 × 100) = 0.01) </>,
              <> <span className="font-semibold">N</span> → Number of monthly installments </>,
            ].map((line, i) => (
              <motion.p key={i} variants={fadeUp}>{line}</motion.p>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Eligibility & Required Documents */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 px-5 gap-6 "
        variants={container}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Eligibility */}
        <motion.div className="bg-[#EBFFFF] p-6 py-10 rounded-2xl shadow-sm" variants={slideUp}>
          <h2 className="text-3xl mb-4 text-center" style={{ fontFamily: "PovetaracSansBlack" }}>
            Eligibility Criteria
          </h2>
          <div className='pb-5'><hr className='border-[#cacaca]' /></div>
          <motion.ul
            style={{ fontFamily: "PovetaracSansBold" }}
            className="space-y-6 px-4 py-5 text-gray-700 text-xl"
            variants={container}
          >
            {[
              <>Salaried: Minimum <span className="font-medium">₹25,000/month</span> take-home; stable employment for <span className="font-medium">6+ months</span>.</>,
              <>Self-employed: Business vintage of <span className="font-medium">12+ months</span> with monthly income ≥ <span className="font-medium">₹25,000</span>.</>,
              <>Age between <span className="font-medium">21 and 65</span> years.</>,
              <>Recommended credit score: <span className="font-medium">700+</span>.</>,
              <>Resident of eligible cities in India.</>,
            ].map((item, i) => (
              <motion.li key={i} variants={fadeUp}>{item}</motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Required Documents */}
        <motion.div className="bg-[#EBFFFF] p-6 py-10 rounded-2xl shadow-sm" variants={slideUp}>
          <h2 className="text-3xl mb-4 text-[#000] text-center" style={{ fontFamily: "PovetaracSansBlack" }}>
            Required Documents
          </h2>
          <div className='pb-5'><hr className='border-[#cacaca]' /></div>
          <motion.ul
            style={{ fontFamily: "PovetaracSansBold" }}
            className="space-y-6 px-4 py-5 text-[#000] text-xl"
            variants={container}
          >
            {[
              { icon: Personloan_required_1, text: <> <span className="font-medium">PAN Card</span> & <span className="font-medium">Aadhaar</span> </> },
              { icon: Personloan_required_2, text: <> <span className="font-medium">Recent Photograph / Selfie</span><br /><span className='text-[16px] text-[#818181]'> – may be taken on the app</span> </> },
              { icon: Personloan_required_3, text: <> <span className="font-medium">Address Proof</span><br /><span className='text-[16px] text-[#818181]'> – Driving License, Passport, Voter ID</span> </> },
              { icon: Personloan_required_4, text: <> <span className="font-medium">Income Proof</span><br /><span className='text-[16px] text-[#818181]'> – Salary slips/Form 16 (salaried) or Bank statements/ITR (self‑employed)</span> </> },
              { icon: quote, text: <> <span className="font-medium">Car Quotation / Proforma Invoice</span><br /><span className='text-[16px] text-[#818181]'> – from the dealer (new/used)</span> </> },
            ].map((row, i) => (
              <motion.li key={i} className='flex items-center gap-4' variants={fadeUp}>
                <img src={row.icon} alt='' className='w-10' />
                <p>{row.text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* What affects your car EMI */}
      <motion.div
        className="px-5 py-12 md:py-20"
        variants={container}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-2xl xl:text-3xl mb-6 text-center" style={{ fontFamily: "PovetaracSansBlack" }}>What Affects Your Car Loan EMI?</h2>
        <motion.ul className="grid grid-cols-1 md:grid-cols-2 gap-5" variants={container}>
          {[
            {t:"Down Payment", d:"Higher down payment = lower EMI and interest."},
            {t:"Tenure", d:"Longer tenure reduces EMI but increases total interest."},
            {t:"Interest Rate", d:"Even 0.5% change impacts EMI notably over years."},
            {t:"On-road Price", d:"Taxes, insurance & accessories raise the financed amount."},
            {t:"Credit Score", d:"A better score can get you a lower rate."},
            {t:"New vs Used", d:"Used car loans may have slightly higher rates and shorter tenures."},
          ].map((item, i) => (
            <motion.li key={i} variants={fadeUp} className="p-5 rounded-2xl border border-[#DDF7F9]">
              <p style={{ fontFamily: "PovetaracSansBlack" }} className="text-2xl text-[#003A70]">{item.t}</p>
              <p style={{ fontFamily: "PovetaracSansBold" }} className="text-[#707070] text-xl">{item.d}</p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* New vs Used */}
      <motion.div
        className="px-5 pb-12 md:pb-20"
        variants={container}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-2xl xl:text-3xl mb-6" style={{ fontFamily: "PovetaracSansBlack" }}>New Car vs Used Car Loans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div variants={slideUp} className="rounded-2xl p-6 bg-white border  border-[#DDF7F9]">
             <p style={{ fontFamily: "PovetaracSansBlack" }} className="text-2xl text-[#003A70]">New Car</p>
            <ul style={{ fontFamily: "PovetaracSansBold" }} className="list-disc pl-5 text-xl mt-3 space-y-2 text-[#707070]">
              <li>Lower interest rates, longer tenures (up to ~7 years).</li>
              <li>Higher LTV (loan-to-value), often up to 90–100% of on-road price.</li>
              <li>Wider lender options and faster processing.</li>
            </ul>
          </motion.div>
          <motion.div variants={slideUp} className="rounded-2xl p-6 bg-white border  border-[#DDF7F9]">
             <p style={{ fontFamily: "PovetaracSansBlack" }} className="text-2xl text-[#003A70]">Used Car</p>
            <ul style={{ fontFamily: "PovetaracSansBold" }} className="list-disc pl-5 mt-3 text-xl space-y-2 text-[#707070]">
              <li>Rates can be higher; tenure usually up to 5 years.</li>
              <li>LTV depends on car age, brand and valuation.</li>
              <li>Extra checks: RC, insurance, ownership transfer, inspection.</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Tips to reduce EMI */}
      <motion.div
        className="px-5 pb-16 md:pb-24"
        variants={container}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-2xl xl:text-3xl mb-6" style={{ fontFamily: "PovetaracSansBlack" }}>Smart Ways to Reduce Your EMI</h2>
        <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            "Increase down payment if possible",
            "Compare lenders and pre-approved offers",
            "Choose a slightly longer tenure (but prepay when you can)",
            "Maintain a strong credit score (700+)",
            "Foreclose/part-prepay when you receive bonuses",
            "Avoid unnecessary add-ons that inflate on-road price",
          ].map((tip, i) => (
            <motion.div key={i} variants={fadeUp} className="p-5 bg-[#F7FEFF] border border-[#DDF7F9] text-xl rounded-2xl" style={{ fontFamily: "PovetaracSansBold" }}>
              {tip}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

    </motion.div>
    <div>
        <Footer_New/>
      </div></>
  );
};

export default CarLoanEmi;