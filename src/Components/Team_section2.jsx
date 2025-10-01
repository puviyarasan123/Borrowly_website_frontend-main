import { useNavigate } from 'react-router-dom';
import React from 'react'
import Apply_arrow from '../assets/Icons/Apply_arrow.svg'; 
import Team_connection from '../assets/Images/Team_connection.avif'

const Team_section2 = () => {
   const navigate = useNavigate();
  return (
    <div className='w-full py-24 cursor-default bg-[#F9F9F9]'>
       <div className='mx-auto px-5 max-w-screen-xl flex flex-col-reverse gap-10 md:flex-row'>
          <div className='flex-1 flex flex-col items-center md:items-start justify-center'>
             <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-center md:text-left mt-4 text-[28px] lg:text-[30px] leading-[1.1]`}>
              Meet the Experts Behind Our Success!
             </h1>
            <p style={{ fontFamily: 'PovetaracSansBold' }} className={`text-center md:text-left  mt-2 text-lg text-[#696868] `}>
             A dynamic team of innovators, strategists, and problem-solvers working together to create impactful solutions, drive growth, and shape the future of our industry.
            </p>         
           <div>
             <button style={{ fontFamily: 'PovetaracSansHeavy' }}  onClick={() => {
  navigate('/Carriers');
  window.scrollTo(0, 0);
}} className='flex-1 mt-5 py-3 px-5 bg-[#0CC066] flex items-center cursor-pointer hover:scale-102 justify-center text-white text-[16px] lg:text-[18px] '>
                <span className='mt-1'>Join Our Team</span>
                <img src={Apply_arrow} alt='Apply Arrow' className='inline w-[22px] ml-2' />
             </button>
           </div>
          </div>
          <div className='flex items-center flex-1 justify-center'>
             <img src={Team_connection} alt="" className='w-[300px] h-auto' />
          </div>
       </div>
    </div>
  )
}

export default Team_section2
