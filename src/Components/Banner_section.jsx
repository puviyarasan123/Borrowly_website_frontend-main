import React from 'react'
import Banner_image from '../assets/Icons/Banner_icons.svg'

const Banner_section = ({isDarkMode}) => {
  return (
      <div className="cursor-default">
         <div className="max-w-screen-xl mx-auto pb-10 px-5 flex flex-col items-center justify-center h-full">
            <div className={`px-5 w-full flex flex-col md:flex-row max-w-[1200px]  overflow-hidden lg:h-[400px] rounded-4xl ${isDarkMode ? 'bg-[#EAEEF6] ':'bg-gradient-to-tl from-[#3750E7]  to-[#8092f5]'} `}>
                <div className='flex-1 flex justify-center flex-col pt-6 lg:px-10'>
                     <p  style={{ fontFamily: 'PovetaracSansBlack' }}  className={`text-[14px] ${isDarkMode ? 'text-[#1556B7] bg-[#DEE8F6]':'bg-[#ffffff] text-black'} text-left rounded-lg w-fit px-4 py-1.5`} >
                       Get Easy loan
                     </p>
                     <h1  style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-left mt-4 text-[24px] lg:text-[28px]  leading-[1.1] ${ isDarkMode ? 'text-black' : 'text-white' }`} >
                       Borrow Smarter with Borrowly Compare top loan offers in seconds
                     </h1>
                     <p style={{ fontFamily: 'PovetaracSansBold' }} className={`mt-2 w-full max-w-[900px] text-[14px] text-left lg:text-[14px] xl:text-lg ${ isDarkMode ? 'text-[#495F7A]' : 'text-[#e0e0e0]' }`} >
                        Get instant access to India’s most trusted lending partners. All in one app. Quick. Safe. Transparent.
                     </p>
                     <h1  style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-left md:mt-4 text-[32px] py-6 lg:text-[46px]  leading-[1.1] ${ isDarkMode ? 'text-black' : 'text-white' }`} >
                       Launching Soon..
                     </h1>
                </div>
                <div className='flex w-full max-w-[400px] lg:max-w-[500px]  items-end justify-center px-12 mx-auto'>
                    <img src={Banner_image} alt="" className='w-full h-[80%] ' />
                </div>
            </div>
         </div>
      </div>
  )
}

export default Banner_section
