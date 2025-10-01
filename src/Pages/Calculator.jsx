import React from "react";
import { motion } from "framer-motion";
import EmiCalculator from "../Components/EmiCalculator.jsx";
import Personal_loan_Image_1 from "../assets/Images/Calulator_image_1.png";
import Car_loan_Image_1 from "../assets/Images/Calulator_image_2.png";
import { useNavigate } from "react-router-dom";

import Footer_New from '../Components/Footer_New.jsx'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const cardIn = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const LoanCalculatorCard = ({ image, title, description, onReadMore }) => {
  return (
    <motion.div className="flex-1 bg-[#F4F4F4] cursor-pointer rounded-4xl p-5"variants={cardIn}  whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 320, damping: 22 }}>
      <div className="relative overflow-hidden rounded-2xl" whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
        <img src={image} alt={title} className="w-full h-auto rounded-2xl" />
        {/* soft shine on hover */}
        <span className="pointer-events-none absolute inset-0" initial={{ background: "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, transparent 80%)" }} whileHover={{ background:
            "linear-gradient(120deg, transparent 10%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.25) 60%, transparent 90%)" }} transition={{ duration: 0.35 }}
        />
      </div>

      <div style={{ fontFamily: "PovetaracSansBold" }} className="py-5 px-3">
        <h1 style={{ fontFamily: "PovetaracSansBlack" }}  className="text-xl md:text-2xl">{title}</h1>
        <p className="text-[16px] mt-2 text-[#6D6D6D]">{description}</p>
        <motion.button onClick={onReadMore} className="pt-5 cursor-pointer text-lg underline underline-offset-4" whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
          Read more
        </motion.button>
      </div>
    </motion.div>
  );
};

const Calculator = () => {
   const Navigate = useNavigate()
  return (
    <>
    <motion.div initial="hidden" animate="show" variants={container}>
      <motion.div className="max-w-screen-lg mx-auto pt-10 px-5" variants={fadeUp}>
        <p style={{ fontFamily: "PovetaracSansBold" }} className="text-[#084DB3] text-[14px] bg-[#DEE8F6] text-left rounded-full w-fit px-4 py-1.5">
          Tools
        </p>
        <h1 style={{ fontFamily: "PovetaracSansBold" }} className="text-4xl mt-3">
          Calculators
        </h1>
        <p style={{ fontFamily: "PovetaracSansBold" }} className="w-full max-w-[800px] text-[14px] text-left lg:text-[14px] xl:text-lg">
          Your loan, your way—calculated instantly for smarter planning.
        </p>

        <motion.div className="flex flex-col md:flex-row gap-5 pt-10 py-5" variants={container}>
          <LoanCalculatorCard
            image={Personal_loan_Image_1}
            title="Personal Loan EMI Calculator"
            description="Check your EMI amount online using our personal loan calculator."
            onReadMore={() => Navigate("/Tools/personal-loan-emi-calculator")}
          />
          <LoanCalculatorCard
            image={Car_loan_Image_1}
            title="Car Loan EMI Calculator"
            description="Car loan EMI calculator is a free online tool that instantly calculates the car loan EMIs ..."
            onReadMore={() => Navigate("/Tools/emi-calculator-for-car-loans")}
          />
        </motion.div>
      </motion.div>
    </motion.div>
    <div className="pt-16">
      <Footer_New/>
    </div>
    </>
  );
};

export default Calculator;
