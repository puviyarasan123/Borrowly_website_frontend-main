import React from 'react'
import Apply_arrow from '../assets/Icons/BlackUpArrrow.svg'; 
import Contact_us_banner from '../assets/Images/Contact_us_banner.avif'
import { useNavigate } from 'react-router-dom';
const ContactusBanner = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full py-10 px-5'>
      <div className='w-full max-w-screen-2xl overflow-hidden mx-auto bg-[#00C2CC] rounded-4xl'>
        <div className='py-10 md:pt-12 lg:pt-24 text-white text-center'>
            <h1 style={{ fontFamily: "PovetaracSansBlack" }} className="mt-4 text-[30px] md:text-[36px] xl:text-[48px] leading-[1.1]">Meet the Experts Behind Borrowly</h1>
          <p  style={{ fontFamily: "PovetaracSansBold" }} className="mt-2 px-5 w-full max-w-[800px] mx-auto text-[12px] md:text-xl">
            A passionate team working to simplify your financial journey—offering clear guidance, honest options, and trusted support all the way.
          </p>
           <div className='w-fit mx-auto'>
                       <button style={{ fontFamily: 'PovetaracSansHeavy' }} onClick={() => {
  navigate('/Contact_us');
  window.scrollTo(0, 0);
}}
 className='flex-1 mt-5 py-3 px-5 bg-[rgb(255,255,255)] text-black flex items-center cursor-pointer hover:scale-102 justify-center text-[16px] lg:text-[18px] '>
                          <span className='mt-1'>Contact Us</span>
                          <img src={Apply_arrow} alt='Apply Arrow' className='inline w-[22px] ml-2' />
                       </button>
                     </div>
        </div>
         <img src={Contact_us_banner} className='' />
      </div>
    </div>
  )
}

export default ContactusBanner
