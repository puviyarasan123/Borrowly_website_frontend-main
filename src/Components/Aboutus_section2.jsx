import React,{useState} from "react";
import img1 from "../assets/Images/About1.png"; 
import img3 from "../assets/Images/About2.png"; 
import img2 from "../assets/Images/About3.png";


import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const AnimatedCounter = ({ from = 0, to, suffix = "", duration = 2 }) => {
  const [value, setValue] = useState(from);
  const count = useMotionValue(from);

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      onUpdate: (latest) => {
        setValue(Math.floor(latest)); // update React state with plain number
      },
    });

    return controls.stop;
  }, [to, duration, count]);

  return (
    <span style={{ fontFamily: 'PovetaracSansBlack' }} className="text-4xl" >
      {value}
      {suffix}
    </span>
  );
};



const Aboutus_section2 = () => {
  return (
    <section className="px-6 md:px-12 max-w-screen-xl mx-auto md:py-12 grid md:grid-cols-2 gap-10 items-center">
      
      {/* Left Images Grid */}
      <div className="grid grid-cols-2 gap-4">
        <img src={img1} alt="Borrowly service" className="rounded-lg shadow-md object-cover w-full h-48"/>
        <img
          src={img2}
          alt="Borrowly support"
          className="rounded-lg shadow-md object-cover w-full h-48"
        />
        <img
          src={img3}
          alt="Borrowly team"
          className="rounded-lg shadow-md object-cover w-full col-span-2 h-[300px]"
        />
      </div>

      {/* Right Content */}
      <div>
        <h3 style={{ fontFamily: 'PovetaracSansBlack' }}  className="text-2xl md:text-3xl xl:text-4xl font-bold mb-4">
          We lead the way in smart, reliable financial solutions.
        </h3>
        <p style={{ fontFamily: 'PovetaracSansBold' }}  className="text-gray-600 mb-4">
          Borrowly is a leading provider of personal loans, education loans, home
          loans, and business loans. Our goal is to make borrowing simple, fast,
          and transparent so that anyone can access financial help with confidence.
        </p>
        <p style={{ fontFamily: 'PovetaracSansBold' }} className="text-gray-600 mb-6">
          We believe that finance should empower people, not burden them. With
          Borrowly, loan applications, EMI calculations, and approvals are all
          digital-first, secure, and hassle-free — putting you in control of your
          financial journey.
        </p>

        {/* Stats */}
        <div className="flex gap-12 mt-6">
          <div>
            <AnimatedCounter to={98} duration={2} suffix="%" />
            <p style={{ fontFamily: 'PovetaracSansBold' }} className="text-sm text-gray-600 mt-1">Customer Satisfaction</p>
          </div>
          <div>
            <AnimatedCounter to={1000} duration={2.5} suffix="+" /> 
           <p style={{ fontFamily: 'PovetaracSansBold' }} className="text-sm text-gray-600  mt-1">Loan Approvals</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus_section2;
