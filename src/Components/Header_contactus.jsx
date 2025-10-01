import React from "react";
import { motion } from "framer-motion";
import search_icon from "../assets/Icons/search_icon.svg";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const Header_contactus = () => {
  return (
    <header className="bg-white pt-12 lg:pt-24 px-5 pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"          // 👈 run on first render
      >
        {/* Title */}
        <motion.h1
          variants={fadeUp}
          style={{ fontFamily: "PovetaracSansBlack" }}
          className="text-3xl lg:text-4xl"
        >
          <span aria-hidden="true" className="inline-block">
            BORROWLY –{" "}
          </span>
          <br className="block md:hidden" />
          LET’S TALK FINANCE
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          style={{ fontFamily: "PovetaracSansBold" }}
          className="text-gray-500 text-sm mt-1.5"
        >
          Need help with your loan applications, repayment queries, or account setup?
          <br className="hidden lg:block" />
          Our finance experts are here to guide you every step of the way.
        </motion.p>

        {/* Search */}
        {/* <motion.div variants={fadeUp} className="relative py-6">
          <motion.div
            className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <img src={search_icon} alt="" className="w-10" />
          </motion.div>
          <motion.input
            type="text"
            placeholder="Search Support"
            aria-label="Search support"
            style={{ fontFamily: "PovetaracSansBold" }}
            className="block w-full lg:max-w-[500px] pl-14 text-lg py-3 border border-[#E0E7ED] rounded-full bg-[#FAFCFC] placeholder-[#7F8286] focus:outline-none focus:ring-2 focus:ring-blue-500"
            
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div> */}
      </motion.div>
    </header>
  );
};

export default Header_contactus;
