import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/Images/imgc1.avif";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Sec_carrier1 = () => {
  return (
    <section className="relative h-[650px] w-full flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background image */}
      <motion.div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${img1})` }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />

      {/* Content */}
      <motion.div
        className="max-w-screen-xl py-24 mx-auto relative z-10 flex flex-col items-center justify-center h-full"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.p
          variants={fadeUp}
          style={{ fontFamily: "PovetaracSansBold" }}
          className="text-[#084DB3] text-[14px] bg-[#DEE8F6] text-left rounded-full w-fit px-4 py-1.5"
        >
          Careers
        </motion.p>

        <motion.h1
          variants={fadeUp}
          style={{ fontFamily: "PovetaracSansBlack" }}
          className="text-center mt-4 text-[28px] text-white lg:text-[36px] xl:text-[40px] leading-[1.1]"
        >
          Join us to create finance that empowers,
          <br />
          not overwhelms.
        </motion.h1>
      </motion.div>
    </section>
  );
};

export default Sec_carrier1;
