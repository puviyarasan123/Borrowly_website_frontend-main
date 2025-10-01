import Social_icon_1 from '../assets/Icons/Social_icon_1.svg'
import Social_icon_2 from '../assets/Icons/Social_icon_2.svg'
import Social_icon_3 from '../assets/Icons/Social_icon_3.svg'
import Social_icon_4 from '../assets/Icons/Social_icon_4.svg'
import Social_icon_5 from '../assets/Icons/Social_icon_5.svg'

import Social_icon_dark_1 from '../assets/Icons/Social_icon_dark_1.svg'
import Social_icon_dark_2 from '../assets/Icons/Social_icon_dark_2.svg'
import Social_icon_dark_3 from '../assets/Icons/Social_icon_dark_3.svg'
import Social_icon_dark_4 from '../assets/Icons/Social_icon_dark_4.svg'
import Social_icon_dark_5 from '../assets/Icons/Social_icon_dark_5.svg'

import footer_craft from '../assets/Icons/Footer_Craft.svg'

const Footer = ({ isDarkMode }) => {
  return (
    <div className="cursor-default  pt-12 md:pt-24">
      <div className={`max-w-screen-xl mx-auto px-4 pb-10 flex flex-col md:flex-row flex-wrap gap-8`}>

        {/* Newsletter - FIRST on mobile, LAST on desktop */}
        <div className={`${ isDarkMode ? 'text-[#ffffff]' : 'text-[#000000]' } w-full md:max-w-full lg:max-w-md order-1 lg:order-4`}>
          <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-lg mb-2">
            Newsletter
          </h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-xl border bg-white border-[#D7D7D7] p-2">
            <input type="email" placeholder="Enter your email" className={` text-black placeholder-black outline-none px-2 py-2 flex-1`} />
            <button  style={{ fontFamily: 'PovetaracSansBold' }}  className="text-white cursor-pointer bg-[#0162D9] px-6 py-2 rounded-lg" >
              Subscribe
            </button>
          </div>
          <p  style={{ fontFamily: 'PovetaracSansBold' }}  className={`mt-3 text-[12px] md:text-sm text-left ${ isDarkMode ? 'text-[#CCCCCC]' : 'text-[#000000]' }`} >
            Get expert advice on managing inventory, marketing, and finance. The more you know, the faster your business grows.
          </p>
          <div className='py-4 flex items-center gap-2'>
             {
                isDarkMode ? (
                  <>
                    <img src={Social_icon_dark_1} alt="Social Icon" className='w-6 hover:scale-103 cursor-pointer' />
                    <img src={Social_icon_dark_2} alt="Social Icon" className='w-6 hover:scale-103 cursor-pointer' />
                    <img src={Social_icon_dark_3} alt="Social Icon" className='w-6 hover:scale-103 cursor-pointer' />
                    <img src={Social_icon_dark_4} alt="Social Icon" className='w-6 hover:scale-103 cursor-pointer' />
                    <img src={Social_icon_dark_5} alt="Social Icon" className='w-6 hover:scale-103 cursor-pointer' />
                  </>
                ) : (
                  <>
                    <img src={Social_icon_1} alt="Social Icon" className='w-6 hover:scale-103 cursor-pointer'/>
                    <img src={Social_icon_2} alt="Social Icon" className='w-6 hover:scale-103 cursor-pointer'/>
                    <img src={Social_icon_3} alt="Social Icon"  className='w-6 hover:scale-103 cursor-pointer'/>
                    <img src={Social_icon_4} alt="Social Icon" className='w-6 hover:scale-103 cursor-pointer'/>
                    <img src={Social_icon_5} alt="Social Icon" className='w-6 hover:scale-103 cursor-pointer' />
                  </>
                )
             }
          </div>
        </div>

        {/* Info Sections Wrapper */}
        <div className={`${ isDarkMode ? 'text-[#ffffff]' : 'text-[#000000]' } flex-1 flex flex-wrap order-2 lg:order-1`}>

          {/* Company Section */}
          <div className="flex-1 min-w-[150px] mb-4">
            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-[16px] md:text-lg mb-2">
              Company
            </h1>
            <div className="flex flex-col gap-1 text-[14px] md:text-[16px]">
              {['About us', 'Careers', 'Customers', 'Blog', 'Press'].map((item, i) => (
                <p className='cursor-pointer hover:scale-103'  key={i} style={{ fontFamily: 'PovetaracSansBold' }}>{item}</p>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div className="flex-1 min-w-[150px] mb-4">
            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-[16px] md:text-lg mb-2">
              Resources
            </h1>
            <div className="flex flex-col gap-1 text-[14px] md:text-[16px]">
              {[
                'Help center', 'Privacy policy', 'Cookie policy',
                'Security', 'Terms', 'Partner programs', 'Affiliates',
              ].map((item, i) => (
                <p className='cursor-pointer hover:scale-103' key={i} style={{ fontFamily: 'PovetaracSansBold' }}>{item}</p>
              ))}
            </div>
          </div>

          {/* Offices Section */}
          <div className="flex-1 min-w-[150px] mb-4">
            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-[16px] md:text-lg mb-2">
              Offices
            </h1>
            <div className="flex flex-col gap-1 text-[14px] md:text-[16px]">
              {['Chennai', 'Hyderabad', 'Delhi'].map((city, i) => (
                <p className='cursor-pointer hover:scale-103'  key={i} style={{ fontFamily: 'PovetaracSansBold' }}>{city}</p>
              ))}
            </div>
          </div>
        </div>
        
      </div>
      <div className='px-5 md:px-0'>
         <hr className={` max-w-screen-xl mx-auto px-4 pb-4 flex flex-col md:flex-row flex-wrap ${ isDarkMode ? 'border-[#ffffff]' : 'border-[#000000]' } gap-8`}></hr>
      </div>
      <div className='w-full'>
        <div style={{ fontFamily: 'PovetaracSansBold' }} className={` ${ isDarkMode ? 'text-[#ffffff]' : 'text-[#000000]' } pt-4 pb-5 text-center text-[12px] lg:text-[14px]`}>
            <h1>Copyright 2025 Borrowly. All Rights Reserved.</h1>
            <h1>Built with ❤️ by Pregasus Nexus</h1>
        </div>
        <div className='h-[100px]'>
            <img src={footer_craft} alt='' className='w-full h-full object-cover' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
