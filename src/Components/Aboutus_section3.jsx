import React from "react";
import { motion } from "framer-motion";

const Aboutus_section3 = () => {
  const items = [
    {
      id: "1",
      title: "Our Mission",
      desc: "Making finance accessible to everyone with quick loan approvals and transparent repayment options.",
    },
    {
      id: "2",
      title: "Our Values",
      desc: "Trust, transparency, and technology-driven solutions for secure borrowing and smart financial planning.",
    },
    {
      id: "3",
      title: "Our Vision",
      desc: "To become the most reliable digital financial partner, simplifying borrowing for individuals, students, and businesses.",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="max-w-screen-xl cursor-default mx-auto px-6 md:px-12 py-10 grid md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="flex gap-4 items-start"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={index}
        >
          {/* Number */}
          <div
            style={{ fontFamily: "PovetaracSansBlack" }}
            className="bg-blue-100 text-black font-bold w-24 h-10 flex items-center justify-center rounded-md"
          >
            <span className="mt-0.5">{item.id}</span>
          </div>

          {/* Text */}
          <div>
            <h3
              style={{ fontFamily: "PovetaracSansBlack" }}
              className="text-xl mb-1"
            >
              {item.title}
            </h3>
            <p
              style={{ fontFamily: "PovetaracSansBold" }}
              className="text-gray-600 text-[16px] leading-relaxed"
            >
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default Aboutus_section3;
