import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Aboutus_section1 = () => {
  return (
    <motion.section
      className="text-center py-10"
      initial="hidden"
      animate="show" // 👈 animate on first load
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.15 } },
      }}
    >
      <motion.h1
        variants={fadeUp}
        style={{ fontFamily: "PovetaracSansBlack" }}
        className="text-center mt-4 text-[28px] md:text-[36px] xl:text-[40px] leading-[1.1]"
      >
        About us
      </motion.h1>

      <motion.p
        variants={fadeUp}
        style={{ fontFamily: "PovetaracSansBold" }}
        className="mt-2 px-5 w-full max-w-[800px] mx-auto text-[14px] md:text-lg"
      >
        Smart financial solutions, simplified for you.
      </motion.p>
    </motion.section>
  );
};

export default Aboutus_section1;
