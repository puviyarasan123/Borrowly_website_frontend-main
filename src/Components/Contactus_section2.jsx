import React from "react";
import ArrowIcon from '../assets/Icons/ArrowIcon.svg'
const Contactus_section2 = () => {
  return (
    <div className="space-y-8 lg:px-10 text-left md:text-left">
      <div>
        <h3 style={{ fontFamily: 'PovetaracSansblack' }}  className="text-[18px]">LOAN APPLICATION</h3>
        <p  style={{ fontFamily: 'PovetaracSansbold' }}  className="text-gray-500 text-sm sm:text-base">
          Apply for loans quickly and securely. Choose from personal,
          education, business, or home loans.
        </p>
         <button  style={{ fontFamily: 'PovetaracSansbold' }}  className=" pt-5 cursor-pointer flex items-center gap-1 text-black font-semibold uppercase transition-transform duration-300 ease-in-out hover:scale-105">
           <div className="pr-1.5">
             <img src={ArrowIcon} alt="" className="w-8"/>
           </div>
           <span className="mt-1">Apply Now</span>
         </button>
      </div>

      <div>
        <h3 style={{ fontFamily: 'PovetaracSansblack' }}  className="text-[18px]">EMI CALCULATOR</h3>
        <p style={{ fontFamily: 'PovetaracSansbold' }}  className="text-gray-500 text-sm sm:text-base">
          Plan your repayments before borrowing. Calculate monthly EMIs instantly.
        </p>
        <button  style={{ fontFamily: 'PovetaracSansbold' }}  className=" pt-5 cursor-pointer flex items-center gap-1 text-black font-semibold uppercase transition-transform duration-300 ease-in-out hover:scale-105">
           <div className="pr-1.5">
             <img src={ArrowIcon} alt="" className="w-8"/>
           </div>
           <span className="mt-1">CALCULATE EMI</span>
         </button>
      </div>
    </div>
  );
};

export default Contactus_section2;
