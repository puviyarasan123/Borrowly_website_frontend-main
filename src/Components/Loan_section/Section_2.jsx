import React from 'react';
import Elgibility_check from '../../assets/Icons/Egibility_Check.svg'
import Elgibility_check_1 from '../../assets/Icons/Egibility_Check_2.svg'

const Section_2 = ({ description }) => {
  return (
     <div className=" py-5 text-sm leading-relaxed whitespace-pre-line">
        <h1 style={{ fontFamily: 'PovetaracSansBold' }} className="text-left mt-2 text-[14px] md:text-[16px] text-[#000000] ">
          {description}
        </h1>

        <div className="py-5 mt-6 flex items-center gap-3 flex-col md:flex-row justify-center">
          <div className="bg-[#00C2CC] py-3 w-full max-w-[350px] px-5 flex items-center gap-3 rounded-2xl">
            <img src={Elgibility_check} alt="" className="w-12"/>
            <div className="flex flex-col text-white">
              <h1 style={{ fontFamily: 'PovetaracSansBold' }} className="text-[22px]">Check your Eligibility</h1>
              <h1 style={{ fontFamily: 'PovetaracSansBold' }} className="text-[14px] -mt-0.5">Get Your Loan Eligibility Now!</h1>
            </div>
          </div>

          <div className="bg-[#00C2CC] py-3 w-full max-w-[350px] px-5 flex items-center gap-3 rounded-2xl">
            <img src={Elgibility_check_1} alt="" className="w-12"/>
            <div className="flex flex-col text-white">
              <h1 style={{ fontFamily: 'PovetaracSansBold' }} className="text-[22px]">Check your CIBIL Score</h1>
              <h1 style={{ fontFamily: 'PovetaracSansBold' }} className="text-[14px] -mt-0.5">Get Your Free CIBIL Report Now!</h1>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Section_2;
