import React from "react";
import ArrowIcon from '../assets/Icons/ArrowIcon.svg'

const Contactus_section1 = () => {
  return (
    <div className="space-y-8 text-left lg:px-10 md:text-left">
      <div>
        <h3 style={{ fontFamily: 'PovetaracSansblack' }} className="text-lg font-bold">LOAN VERIFICATION & APPROVAL</h3>
        <p style={{ fontFamily: 'PovetaracSansbold' }} className="text-gray-500 text-sm sm:text-base">
          Manage and verify borrower applications. <br />
          Approve the Borrower Application.
        </p>
        <button  style={{ fontFamily: 'PovetaracSansbold' }}  className=" pt-5 cursor-pointer flex items-center gap-1 text-black font-semibold uppercase transition-transform duration-300 ease-in-out hover:scale-105">
          <div className="pr-1.5">
            <img src={ArrowIcon} alt="" className="w-8"/>
          </div>
          <span className="mt-1">Verify Applications</span>
        </button>
      </div>

      <div>
        <h3 style={{ fontFamily: 'PovetaracSansblack' }} className="text-lg font-bold">LOAN TRACKING & REPORTS</h3>
        <p style={{ fontFamily: 'PovetaracSansbold' }}  className="text-gray-500 text-sm sm:text-base">
          Stay updated with borrower repayments. Monitor disbursed loans.
        </p>

        <button  style={{ fontFamily: 'PovetaracSansbold' }}  className=" pt-5 cursor-pointer flex items-center gap-1 text-black font-semibold uppercase transition-transform duration-300 ease-in-out hover:scale-105">
          <div className="pr-1.5">
            <img src={ArrowIcon} alt="" className="w-8"/>
          </div>
          <span className="mt-1">VIEW REPORTS</span>
        </button>

      </div>
    </div>
  );
};

export default Contactus_section1;
