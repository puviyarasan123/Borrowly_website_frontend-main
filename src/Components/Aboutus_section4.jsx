import React from "react";
import { motion } from "framer-motion";
import Arrowup from "../assets/Icons/Arrow-up.svg";

import Service_icon_1 from '../assets/Icons/Service_icon_1.svg'
import Service_icon_2 from '../assets/Icons/Service_icon_2.svg'
import Service_icon_3 from '../assets/Icons/Service_icon_4.svg'
import Service_icon_4 from '../assets/Icons/Service_icon_5.svg'
import Service_icon_5 from '../assets/Icons/Service_icon_6.svg'
import Service_icon_6 from '../assets/Icons/Service_icon_7.svg'
import { useNavigate } from "react-router-dom";

const Aboutus_section4 = () => {

  const Navigate = useNavigate()
  const services = [
    {
      icon: <img src={Service_icon_1} alt="Easy Loan Applications" className="w-10" />,
      title: "Easy Loan Applications",
      desc: "Apply online in minutes. No lengthy paperwork, no delays.",
      bg: "bg-[#A3343D]",
    },
    {
      icon: <img src={Service_icon_2} alt="Fast Approvals" className="w-10" />,
      title: "Fast Approvals",
      desc: "Get loans verified and approved quickly with digital verification.",
      bg: "bg-[#FAAB63]",
    },
    {
      icon: <img src={Service_icon_3} alt="Flexible Repayment Options" className="w-10" />,
      title: "Flexible Repayment Options",
      desc: "Choose EMI plans that suit your budget. Pay conveniently every month.",
      bg: "bg-[#2881FC]",
    },
    {
      icon: <img src={Service_icon_4} alt="Secure & Transparent" className="w-10" />,
      title: "Secure & Transparent",
      desc: "Your data and transactions are always protected with bank-grade security.",
      bg: "bg-[#D81E5B]",
    },
    {
      icon: <img src={Service_icon_5} alt="24/7 Customer Support" className="w-10" />,
      title: "24/7 Customer Support",
      desc: "We are here to guide you at every step — from applying to repayment.",
      bg: "bg-[#BA31CE]",
    },
    {
      icon: <img src={Service_icon_6} alt="Competitive Interest Rates" className="w-10" />,
      title: "Competitive Interest Rates",
      desc: "Borrowly offers affordable loan options with low interest rates, ensuring borrowers get the best value without hidden charges. Our goal is to make borrowing cost-effective and stress-free.",
      bg: "bg-[#33524A]",
    },
  ];

  // Framer motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.3, ease: "easeOut" },
    }),
  };

  return (
    <section className="lg:max-w-screen-xl mx-auto px-6 md:px-12 py-12 grid md:grid-cols-2 gap-10 items-start">
      {/* Left Content - Sticky only on md+ screens */}
      <div className="md:sticky md:top-24 md:self-start md:h-fit">
        <h2 style={{ fontFamily: "PovetaracSansBlack" }} className="text-3xl mb-4">
          Our services are designed to make your borrowing experience seamless and efficient.
        </h2>
        <p style={{ fontFamily: "PovetaracSansBold" }} className="text-gray-600 text-[16px] mb-6">
          We provide end-to-end support — from loan applications to EMI tracking and customer support.
        </p>
        <button
           onClick={() => {
        Navigate("/Contact_us");
        window.scrollTo(0, 0);
      }}
          style={{ fontFamily: "PovetaracSansBold" }}
          className="px-8 py-3 bg-black flex items-center gap-2 cursor-pointer hover:scale-105 text-lg text-white rounded-xl hover:bg-gray-800 transition-all duration-300 ease-in-out"
        >
          <span className="mt-1.25 mr-2">Contact us</span>
          <img src={Arrowup} alt="" className="w-4" />
        </button>
      </div>

      {/* Right Services List - Scroll with animations */}
      <div className="space-y-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`flex items-start gap-4 px-5 py-8 rounded-2xl shadow-sm ${service.bg}`}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
          >
            <div className="text-white">{service.icon}</div>
            <div className="flex-1">
              <h3 style={{ fontFamily: "PovetaracSansBold" }} className="text-xl text-white">
                {service.title}
              </h3>
              <p style={{ fontFamily: "PovetaracSansBold" }} className="text-white text-[12px] lg:text-[16px]">
                {service.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Aboutus_section4;
