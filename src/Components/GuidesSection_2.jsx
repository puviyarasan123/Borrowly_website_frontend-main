import React from 'react'
import { FaArrowRight } from "react-icons/fa";

// ✅ Import images
import Loan_2 from '../assets/Images/Loan_2.avif'
import Loan_3 from '../assets/Images/Loan_3.avif'
import Loan_4 from '../assets/Images/Loan_4.avif'
import Loan_5 from '../assets/Images/Loan_5.avif'
import Loan_6 from '../assets/Images/Loan_6.avif'
import { useNavigate } from 'react-router-dom';

const GuidesSection_2 = () => {
  const navigate = useNavigate()
  const guidesList = [
    {
      id: 1,
      image: Loan_2,
      tag: "Home Loan",
      title: "Home Loan Guide: A Complete Step-by-Step Process",
      description: "Understand the basics of home loans, interest rates, eligibility, and documents required to make your dream home a reality.",
      link:'/Home_loan_Guides'
    },
    {
      id: 2,
      image: Loan_3,
      tag: "Business Loan",
      title: "Business Loan Guide: Fuel Your Business Growth",
      description: "Understand how business loans work and how to secure funding for your enterprise.",
       link:'/Businees_loan_Guides'
    },
    {
      id: 3,
      image: Loan_4,
      tag: "Education Loan",
      title: "Education Loan Guide: Invest in Your Future",
      description: "Financing your studies? Learn how education loans work, from eligibility to repayment options.",
       link:'/Education_loan_Guides'
    },
    {
      id: 4,
      image: Loan_5,
      tag: "Vehicle Loan",
      title: "Vehicle Loan Guide: Drive Your Dream Car with Confidence",
      description: "Planning to buy a car or bike? This guide explains how vehicle loans work.",
       link:'/Vehical_loan_Guides'
    },
      {
      id: 5,
      image: Loan_6,
      tag: "Insurance",
      title: "Insurance Guide: Protect What Matters Most",
      description: "Insurance isn’t just paperwork—it’s financial protection. Learn the basics here.",
       link:'/insurance_loan_Guides'
    },
     {
      id: 6,
      image: Loan_6,
      tag: "Gold Loan",
      title: "Gold Loan Guide: Unlock Cash with Your Gold",
      description: "Gold loans aren’t just about borrowing—they’re a quick and secure way to get funds using your gold as collateral. Learn how you can access cash without selling your valuables.",
       link:'/gold_loan_Guides'
    },
  ];

  return (
    <div className='max-w-screen-lg mx-auto px-5 py-5'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {guidesList.map((guide) => (
          <div 
            key={guide.id} 
            className='border border-[#C4C4C4] overflow-hidden flex flex-col rounded-2xl '
          >
            {/* Image */}
            <div className='flex-1 overflow-hidden'>
              <img src={guide.image} alt={guide.title} className='w-full object-cover rounded-t-2xl' />
            </div>

            {/* Content */}
            <div className='p-3 py-4 flex flex-1 flex-col'>
              <p 
                style={{ fontFamily: 'PovetaracSansBold' }} 
                className='text-[#fff] text-[10px] bg-[#3459FC] text-left rounded-full w-fit px-4 py-1'
              >
                {guide.tag}
              </p>

              <h1 
                style={{ fontFamily: "PovetaracSansBlack" }} 
                className="text-left mt-4 text-lg lg:text-[18px] leading-[1.1] text-black"
              >
                {guide.title}
              </h1>

              <p 
                style={{ fontFamily: "PovetaracSansBold" }}  
                className="mt-2 text-[14px] text-left lg:text-[12px] text-[#696868]"
              >
                {guide.description}
              </p>

              {/* Read More with Arrow */}
             <div
               className="mt-3 flex items-center gap-2 cursor-pointer group"
               onClick={() => {
                 navigate(`/Guides${guide.link}`);
                 window.scrollTo(0, 0);
               }}
             >
             
                <h1 className='text-[#1438A0] text-[16px] group-hover:underline'>Read More</h1>
                <FaArrowRight className="text-[#1438A0] group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GuidesSection_2
