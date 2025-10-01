import React from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../assets/Icons/ArrowIcon.svg";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Contactus_section4 = () => {
  return (
    <motion.section
      className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 px-5 md:px-10 py-12 max-w-screen-xl mx-auto text-left"
      variants={container}
      initial="hidden"
      animate="show" // 👈 runs on first load
    >
      {/* Apply for a Loan */}
      <motion.div variants={fadeUp} className="pb-6 border-b md:border-b-0 md:pb-0">
        <h3 style={{ fontFamily: "PovetaracSansblack" }} className="text-lg">
          APPLY FOR A LOAN
        </h3>
        <p
          style={{ fontFamily: "PovetaracSansbold" }}
          className="text-[#838383] text-sm mt-1"
        >
          Submit your application online in minutes. Keep track of your
          application. Get loans in minutes.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ fontFamily: "PovetaracSansbold" }}
          className="pt-5 cursor-pointer flex items-center gap-1 text-black font-semibold uppercase"
        >
          <motion.div
            className="pr-1.5"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={ArrowIcon} alt="" className="w-8" />
          </motion.div>
          <span className="mt-1">CALCULATE THE INTEREST RATE</span>
        </motion.button>
      </motion.div>

      {/* Get the Support You Need */}
      <motion.div variants={fadeUp} className="pb-6 border-b md:border-b-0 md:pb-0">
        <h3 style={{ fontFamily: "PovetaracSansblack" }} className="text-lg">
          GET THE SUPPORT YOU NEED
        </h3>
        <p
          style={{ fontFamily: "PovetaracSansbold" }}
          className="text-[#838383] text-sm mt-1"
        >
          If you need assistance regarding Loans call us at
          <span className="font-medium">
            {" "}
            +91-9494545792 | +91-9494545137
          </span>
          or write to us at{" "}
          <a
            href="mailto:Support@Borrowly.in"
            className="text-blue-600 underline"
          >
            Support@Borrowly.in
          </a>
        </p>
        <p
          style={{ fontFamily: "PovetaracSansbold" }}
          className="text-[#838383] text-sm mt-1"
        >
          Toll free time is from <span className="font-semibold">9:00 am to 6:00 pm</span>
          <br />
          Monday to Saturday
        </p>
      </motion.div>

      {/* 24/7 Section */}
      <motion.div variants={fadeUp}>
        <h3 style={{ fontFamily: "PovetaracSansblack" }} className="text-lg">
          24/7
        </h3>
        <p
          style={{ fontFamily: "PovetaracSansbold" }}
          className="text-[#838383] text-sm mt-1"
        >
          No. 786, First Floor, Near Bharath Petrol Bunk, Dhargha Mohalla, Old Madras Road, Dooravani Nagar, Bengaluru – 560016.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ fontFamily: "PovetaracSansbold" }}
          className="pt-5 cursor-pointer flex items-center gap-1 text-black font-semibold uppercase"
        >
          <motion.div
            className="pr-1.5"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={ArrowIcon} alt="" className="w-8" />
          </motion.div>
          <span className="mt-1">TERMS AND CONDITIONS</span>
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default Contactus_section4;
