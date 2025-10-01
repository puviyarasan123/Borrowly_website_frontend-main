import React from "react";
import { motion } from "framer-motion";
import mobileImg from "../assets/Images/mobile.png";
import serviceImg from "../assets/Images/service.png";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const Contactus_section5 = () => {
  return (
    <section className="px-5 w-full max-w-[1200px] mx-auto py-10 flex flex-col gap-20">
      {/* ================= Mobile App Section ================= */}
      <motion.div
        className="flex flex-col lg:flex-row gap-10 items-center text-left"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }} // 👈 animates when this block is in view
      >
        {/* Image */}
        <motion.div className="flex justify-center lg:w-[500px]" variants={slideLeft}>
          <motion.img
            src={mobileImg}
            alt="Mobile App"
            className="w-full rounded-3xl shadow-lg object-cover"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
          />
        </motion.div>

        {/* Content */}
        <motion.div className="flex-1" variants={fadeUp}>
          <h2
            style={{ fontFamily: "PovetaracSansblack" }}
            className="text-2xl md:text-3xl mb-3"
          >
            Borrowly Mobile App
          </h2>

          <p
            style={{ fontFamily: "PovetaracSansbold" }}
            className="text-gray-600 mb-4 text-sm sm:text-base"
          >
            <strong style={{ fontFamily: "PovetaracSansblack" }} className="text-lg">
              Mobile Support Info
            </strong>
            <br />
            Manage your loans, make repayments, track your credit score, and
            chat with customer support — all from your phone.
          </p>

          <p
            style={{ fontFamily: "PovetaracSansbold" }}
            className="text-gray-600 mb-6 text-sm sm:text-base"
          >
            <strong style={{ fontFamily: "PovetaracSansblack" }} className="text-lg">
              Quick Smart App Access
            </strong>
            <br />
            Manage your Loans, EMI, and services via the Borrowly Smart App.
          </p>

          <div className="py-5">
            <motion.button
              style={{ fontFamily: "PovetaracSansbold" }}
              className="w-full lg:max-w-[300px] py-4 cursor-pointer bg-black text-white rounded-md hover:bg-gray-800 text-lg"
              whileHover={{ y: -2, boxShadow: "0 10px 24px rgba(0,0,0,0.12)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              Download Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* ================= Service Request Section ================= */}
      <motion.div
        className="flex flex-col-reverse lg:flex-row gap-10 items-center text-left"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }} // 👈 animates when this block is in view
      >
        {/* Left Content */}
        <motion.div className="flex-1" variants={fadeUp}>
          <h2
            style={{ fontFamily: "PovetaracSansblack" }}
            className="text-xl sm:text-3xl mb-3"
          >
            Fast. Reliable. Financial Help!
          </h2>

          <h3
            style={{ fontFamily: "PovetaracSansblack" }}
            className="text-lg text-gray-600 mb-2"
          >
            Service Request
          </h3>

          <p
            style={{ fontFamily: "PovetaracSansbold" }}
            className="text-gray-600 mb-2 text-sm sm:text-base"
          >
            For support, contact us at{" "}
            <a href="mailto:Support@Borrowly.in" className="text-blue-600 underline">
              Support@Borrowly.in <br/>
            </a>{" "}
            or call <span className="font-medium">
+91-9494545792 |   +91-9494545137
</span>
          </p>

          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Our team ensures quick loan processing and instant customer support,
            so you get the funds you need without delays.
          </p>

          <div className="py-5">
            <motion.button
              style={{ fontFamily: "PovetaracSansbold" }}
              className="w-full lg:max-w-[300px] py-4 cursor-pointer bg-black text-white rounded-md hover:bg-gray-800 text-lg"
              whileHover={{ y: -2, boxShadow: "0 10px 24px rgba(0,0,0,0.12)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              Book Service Now
            </motion.button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div className="flex justify-center lg:w-[500px]" variants={slideRight}>
          <motion.img
            src={serviceImg}
            alt="Customer Support"
            className="w-full rounded-3xl shadow-lg object-cover"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contactus_section5;
