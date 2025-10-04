import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import vector_down from '../assets/Icons/vector_down.svg';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import Person_loan_icon from '../assets/Icons/section_1Icons/Person_loan_Selected.svg'
import Loan_image_1 from '../assets/Images/Loan_image_1.avif'
import Loan_image_2 from '../assets/Images/Loan_image_2.avif'
import Loan_image_3 from '../assets/Images/Loan_image_3.avif'
import Loan_image_4 from '../assets/Images/Loan_image_4.avif'
import Loan_image_5 from '../assets/Images/Loan_image_5.avif'
import Loan_image_6 from '../assets/Images/Loan_image_6.avif'
import Gold_loan_image from '../assets/Images/Goldloanimage.avif'


import Education_loan_icon from '../assets/Icons/section_1Icons/Education_Loans.svg'
import Home_equity_icon from '../assets/Icons/section_1Icons/Home_equity_selected.svg'
import Insurance_icon from '../assets/Icons/section_1Icons/Insurance_selected.svg'
import Business_loan_icon from '../assets/Icons/section_1Icons/Business_Loans_selected.svg'
import Vechicle_loan_icon from '../assets/Icons/section_1Icons/Vechicle_loan_selected.svg'
import Gold_loan_icon from '../assets/Icons/section_1Icons/Goldloan_icon.svg'

import Business_Loan from '../assets/Icons/section_1Icons/Business_Loans.svg';
import Education_loan from '../assets/Icons/section_1Icons/Education_Loans_selected.svg'
import Home_Equity from '../assets/Icons/section_1Icons/Home_equity.svg';
import Insurance from '../assets/Icons/section_1Icons/Insurance.svg';
import Person_loan from '../assets/Icons/section_1Icons/Person_loan.svg';
import Vechicle_loan from '../assets/Icons/section_1Icons/Vechicle_loan.svg'
import Gold_loan from '../assets/Icons/section_1Icons/Gold_loan_icon.png'

import Downarrow from '../assets/Icons/section_1Icons/Downarrow.svg';
import Apply_arrow from '../assets/Icons/Apply_arrow.svg'; 
import Download_icon from '../assets/Icons/Download_icon.svg'; 
import { useNavigate } from 'react-router-dom';


const MobileAccordionItem = ({ item, isExpanded, onToggle }) => {
  const contentRef = useRef();

  useEffect(() => {
    if (!contentRef.current) return;

    if (isExpanded) {
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isExpanded]);

  return (
    <div className="border border-[#C5D3E5] bg-[#F4F6FA] rounded-xl overflow-hidden">
      <div onClick={onToggle} className="flex items-center justify-between px-4 py-3 cursor-pointer">
        <div className="flex items-center gap-3">
          <img src={isExpanded ? item.Normal_icon : item.Normal_icon} alt={`${item.name} Icon`} className="w-[40px] h-[40px]" />
          <span style={{ fontFamily: 'PovetaracSansBold' }} className={`text-lg mt-1 ${isExpanded ? 'text-[#3C3B3B]' : 'text-[#3C3B3B]'}`}>
            {item.name}
          </span>
        </div>
        {isExpanded ? (
          <FaChevronUp className="text-[#0CC066]" />
        ) : (
          <FaChevronDown className="text-[#3C3B3B]" />
        )}
      </div>

      <div
        ref={contentRef}
        className="px-4 text-[14px] text-[#3C3B3B] overflow-hidden h-0 opacity-0"
      >
        <div className="py-4">
           <div className='pb-4'>
             <img src={item.image}   alt={`${item?.name} Banner`}  className='w-[450px] mx-auto lg:w-full  h-full object-cover rounded-2xl'/>
          </div>

          <h1  style={{ fontFamily: 'PovetaracSansHeavy' }} className='text-left text-2xl pb-2'>{item.headline}</h1>
          <p style={{ fontFamily: 'PovetaracSansBold' }} className='text-left text-[14px] text-[#7c7c7c]'>{item.description}</p>
          <div className='flex items-center gap-2 mt-4'>
            <button style={{ fontFamily: 'PovetaracSansHeavy' }} className='flex-1 py-3 bg-[#0CC066] flex items-center justify-center text-white text-[16px] '>
              Apply Loan
              <img src={Apply_arrow} alt="Apply Arrow" className='inline w-[22px] ml-2' />
            </button>
            <button  style={{ fontFamily: 'PovetaracSansHeavy' }} className='flex-1 flex items-center justify-center py-3 bg-transparent border border-[#55575B] text-[16px] '>
              <img src={Download_icon} alt="Download Icon" className='inline w-[22px] mr-2' />
               Download
            </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};



const Section_1 = ({ isDarkMode }) => {
  const wordsloop = ['Best Rate.', 'lowest EMI', 'Fastest approval', 'Smartest loan'];
  const wordRef = useRef(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(wordRef.current, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          setCurrentWordIndex(prev => (prev + 1) % wordsloop.length);
          gsap.to(wordRef.current, { opacity: 1, duration: 0.4 });
        },
      });
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  const [selectedId, setSelectedId] = useState(1);
  const [menulist, setMenulist] = useState([
  {
    name: 'Personal Loan',
    Selected_icon: Person_loan_icon,
    image: Loan_image_1,
    Normal_icon: Person_loan,
    id: 1,
    link: '/PersonalLoan_index',
    headline: 'Smart Loan Choices, Trusted Support — Today and Always.',
    description: 'Need funds for something important? Whether it’s a personal milestone or an unexpected need, our loans are designed around you. At Borrowly, we go beyond approval — we build lasting trust. Let’s grow your financial confidence together.'
  },
  {
    name: 'Home Loan',
    Selected_icon: Home_equity_icon,
     image: Loan_image_3,
    Normal_icon: Home_Equity,
    id: 2,
     link: '/HomeLoan_index',
    headline: 'Turning Blueprints Into Reality — With Trust and Ease',
    description: 'At Borrowly, we believe a home loan is more than just financing — it’s the foundation of a future well-lived. Whether it’s your first home or your next big move, we make the process seamless with personalized support, transparent guidance, and rates that bring your dream home closer than ever.'
  },
  {
    name: 'Business Loan',
    Selected_icon: Business_loan_icon,
     image: Loan_image_6,
    Normal_icon: Business_Loan,
    id: 3,
    link: '/BusinessLoan_index',
    headline: 'For Every Leap You Take, We’re Right Behind You.',
    description: `Your business deserves more than just funding — it deserves a partner. At Borrowly, our business loans are built around your goals. Whether you're expanding operations, hiring talent, or investing in equipment, we provide tailored solutions, fast approvals, and relationship-driven support that grows with you.`
  },
   {
    name: 'Gold Loan',
    Selected_icon: Gold_loan,
     image: Gold_loan_image,
    Normal_icon: Gold_loan_icon,
    id: 4,
    link: '/Gold_loan',
    headline: 'For Every Leap You Take, We’re Right Behind You.',
    description: `Your business deserves more than just funding — it deserves a partner. At Borrowly, our business loans are built around your goals. Whether you're expanding operations, hiring talent, or investing in equipment, we provide tailored solutions, fast approvals, and relationship-driven support that grows with you.`
  },
  {
    name: 'Education Loan',
    Selected_icon: Education_loan,
     image: Loan_image_4,
    Normal_icon:  Education_loan_icon,
    id: 5,
     link: '/EducationLoan_index',
    headline: 'Turning Study Abroad Plans Into Reality.',
    description: 'Studying overseas is a life-changing experience — we make it financially possible. At Borrowly, our Foreign Education Loans cover tuition, living costs, travel, and more, with fast approvals and expert guidance every step of the way. Start your global journey with us.'
  },
   {
    name: 'Vehicle Loan',
    Selected_icon: Vechicle_loan_icon,
    Normal_icon: Vechicle_loan,
     image: Loan_image_2,
    id: 6,
     link: '/VehicleLoan_index',
    headline: 'From First Rides to Fleet Upgrades — We Make It Easy',
    description: 'Whether it’s your dream car, a two-wheeler for daily travel, or commercial vehicles to grow your business — Borrowly’s vehicle loans are tailored for speed, simplicity, and support. Enjoy competitive rates, flexible tenures, and a seamless experience from application to approval.'
  },
  {
    name: 'Insurance',
    Selected_icon: Insurance_icon,
     image: Loan_image_5,
    Normal_icon: Insurance,
    id: 7,
    link: '/Insurence_index',
    headline: 'From First Rides to Fleet Upgrades — We Make It Easy',
    description: 'Whether it’s your dream car, a two-wheeler for daily travel, or commercial vehicles to grow your business — Borrowly’s vehicle loans are tailored for speed, simplicity, and support. Enjoy competitive rates, flexible tenures, and a seamless experience from application to approval.'
  }
  ]);


  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? menulist : menulist.slice(0, 4);
  const selectedItem = menulist.find(item => item.id === selectedId);

  return (
    <div className={` pt-7 flex items-end pb-4 cursor-default justify-center`}>
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Title  */}
          <div className="flex flex-col items-center md:gap-3">
            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-2xl lg:text-3xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
              We compete for your loan. You get the 
              <span ref={wordRef} style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-3xl lg:text-4xl ml-3 ${isDarkMode ? 'text-white' : 'text-black'}`} >
                {wordsloop[currentWordIndex]}
              </span>
            </h1>
            <div className='md:ml-auto'>
              <img src={vector_down} alt="Vector Down" className="md:-mt-2" />
            </div>
          </div>
          {/* Selection */}
          <div className='w-full hidden  md:block max-w-screen-xl  mx-auto mt-5'>
             <div className='relative w-full max-w-screen-lg flex overflow-visible  h-[100px] mx-auto bg-[#F4F6FA] border border-[#C5D3E5] rounded-lg'>
                {menulist.map((item) => {
                  const isSelected = selectedId === item.id;
                  return (
                    <div key={item.id} onClick={() => setSelectedId(item.id)} className={`relative cursor-pointer flex-1 h-full`}>
                      <div className={`flex flex-col items-center justify-center h-full gap-3 transition-all duration-300 
                      ${item.id === 1 ? 'rounded-l-lg' : ''} 
                      ${ isSelected ? 'bg-[#00C2CC] text-white' : 'text-[#3C3B3B]' }`} >
                        <img  src={isSelected ? item.Selected_icon : item.Normal_icon} alt={`${item.name} Icon`} className='w-[40px] lg:w-[37.5px] mx-auto' />
                        <h1 style={{ fontFamily: 'PovetaracSansBold' }} className='text-[14px] lg:text-[16px]'> {item.name}</h1>
                      </div>
                     {isSelected && (
                        <img src={Downarrow} alt="Down Arrow" className='absolute -bottom-[14px] left-1/2 -translate-x-1/2 w-[20px] z-10' /> )}
                     </div>
                  );
                })}
                {/* <div className='flex-1 border-l border-[#55575B]'>
                   <div className='flex flex-col items-center justify-center cursor-pointer h-full gap-3 transition-all duration-300 '>
                     <img  src={more_icon} alt={`more_icon Icon`} className='w-[35px] md:w-[40px] mx-auto' />
                     <h1 style={{ fontFamily: 'PovetaracSansHeavy' }} className='text-[16px]  hidden lg:block'>More Options</h1>
                   </div>
                </div> */}
              </div>
              <div className='relative w-full max-w-screen-lg h-[450px] flex flex-col md:flex-row overflow-visible mx-auto rounded-2xl'>
                <div className='p-5 w-[550px] flex flex-col justify-center'>
                <p style={{ fontFamily: 'PovetaracSansBold' }} className="text-[#000000] text-[14px] border border-[#CFCCCC] rounded-full w-fit px-4 py-1.5 flex items-center justify-center">
                   {selectedItem?.name}
                 </p>
                 
                  <h1
                    style={{ fontFamily: 'PovetaracSansBlack' }}
                    className={`text-left mt-4 text-[28px] lg:text-[30px] leading-[1.1] ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {selectedItem?.headline}
                  </h1>
                  <p
                    style={{ fontFamily: 'PovetaracSansBold' }}
                    className={`text-left mt-2 text-[14px] text-[#696868] ${
                      isDarkMode ? 'text-[#CCCCCC]' : 'text-black'
                    }`}
                  >
                    {selectedItem?.description}
                  </p>
                  <div className='flex items-center gap-2 mt-4'>
                    <button
                      onClick={()=>{navigate(`${selectedItem?.link}`)}}
                      style={{ fontFamily: 'PovetaracSansHeavy' }}
                      className='flex-1 py-3 bg-[#0CC066] flex items-center cursor-pointer hover:scale-102 justify-center text-white text-[16px] lg:text-[18px] '
                    >
                      <span className='mt-1'>Apply Loan</span>
                      <img src={Apply_arrow} alt='Apply Arrow' className='inline w-[22px] ml-2' />
                    </button>
                    <button
                      style={{ fontFamily: 'PovetaracSansHeavy' }}
                      className={`flex-1 cursor-pointer hover:scale-102 ${
                        isDarkMode ? 'text-white  border border-[#ffffff]' : 'text-black border border-[#55575B]'
                      } flex items-center justify-center py-3 bg-transparent text-[16px] lg:text-[18px] `}
                    >
                      <img src={Download_icon} alt='Download Icon' className='inline w-[22px] mr-2' />
                      <span className='mt-1'>Download</span>
                    </button>
                  </div>
                  <div className='flex flex-row items-center pt-12 gap-1'>
                    <h1 className={`text-center mt-0.5 text-[12px] md:text-[14px] lg:text-[16px] ${isDarkMode ?'text-white  opacity-80':'text-black  opacity-40'} `}>
                      Privacy Secured | Advertising Disclosures
                    </h1>
                  </div>
                </div>
                <div className='flex-1'>
                    <img src={selectedItem?.image}  alt={`${selectedItem?.name} Banner`} className=' mx-auto w-full object-contain h-full rounded-2xl' />
                </div>
              </div>

          </div>
          {/* Mobile Accordion List */}
             <div className="w-full md:hidden mt-6 pb-5 space-y-0.75">
                  {visibleItems.map((item) => {
                    const isExpanded = selectedId === item.id;
                    return (
                      <MobileAccordionItem
                        key={item.id}
                        item={item}
                        isExpanded={isExpanded}
                        onToggle={() => setSelectedId(isExpanded ? null : item.id)}
                      />
                    );
                  })}
             
                  {menulist.length > 4 && (
                    <div className="text-center pt-4">
                      <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-[#00C2CC] font-medium hover:underline"
                      >
                        {showAll ? 'Show Less' : 'More Loan Options'}
                      </button>
                    </div>
                  )}
                  <div className='flex flex-row items-center justify-center gap-1 '>
                    <h1 className={`text-center mt-0.5 text-[12px] md:text-[14px] lg:text-[16px]  ${isDarkMode ?'text-white opacity-80':'text-black opacity-40'}`}>Privacy Secured | Advertising Disclosures</h1>
                  </div>
             </div>
          </div>
        </div>
    </div>
  );
};

export default Section_1;
