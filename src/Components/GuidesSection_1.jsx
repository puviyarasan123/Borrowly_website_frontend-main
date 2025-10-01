import React from 'react'
import { FaArrowRight } from "react-icons/fa"; // ✅ Import arrow icon
import Personal_Loan_banner from '../assets/Images/Guide_short_banner_PL.avif'
import { useNavigate } from "react-router-dom";
const GuidesSection_1 = () => {
   const navigate = useNavigate();
  return (
    <div className='max-w-screen-lg mx-auto px-5'>
      <div className='border border-[#C4C4C4] p-3 rounded-2xl flex flex-col md:flex-row'>
        
        {/* Left Image */}
        <div className='flex-1'>
          <img src={Personal_Loan_banner} alt='' className='w-full rounded-2xl' />
        </div>

        {/* Right Content */}
        <div className='flex-1 py-4 px-2 flex flex-col justify-center md:p-4'>
          <p style={{ fontFamily: 'PovetaracSansBold' }}  className='text-[#fff] text-[14px] bg-[#3459FC] text-left rounded-full w-fit px-4 py-1.5'>
            Personal Loan
          </p>

          <h1 
            style={{ fontFamily: "PovetaracSansBlack" }} 
            className="text-left mt-4 text-lg lg:text-[22px] xl:text-[26px] leading-[1.1] text-black"
          >
            Personal Loan Guide: Everything You Need to Know Before Borrowing
          </h1>

          <p 
            style={{ fontFamily: "PovetaracSansBold" }}  
            className="mt-2 w-full max-w-[800px] text-[14px] text-left lg:text-[14px] xl:text-[16px] text-[#696868]"
          >
            Discover how personal loans work, their common uses, eligibility criteria, and required documents. Learn smart tips to secure lower interest rates and make informed borrowing decisions.
          </p>

          {/* Read More with Arrow */}
          <div className="mt-3 flex items-center gap-2 cursor-pointer group w-fit"   onClick={() => navigate("/Guides/Personal_loan_Guides")}>
            <h1 className='text-[#1438A0] text-lg group-hover:underline'>Read More</h1>
            <FaArrowRight className="text-[#1438A0] group-hover:translate-x-1 transition-transform duration-200" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default GuidesSection_1
