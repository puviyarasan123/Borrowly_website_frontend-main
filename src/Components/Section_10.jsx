import React, { useState, useEffect, useRef } from 'react';
import {FaTimesCircle } from 'react-icons/fa';
import India_Map from '../assets/Icons/India_Map.svg';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUserCircle } from 'react-icons/fa'; // icon like in your image

gsap.registerPlugin(ScrollTrigger);



const cityData = [
  { name: 'Delhi', x: 303, y: 281, available: true, loanType: 'Personal Loan', amount: 35000, description: 'Used to study a digital course' },
  { name: 'Kurnool', x: 328, y: 652, available: true, loanType: 'Business Loan', amount: 50000, description: 'Startup investment' },
  { name: 'Bangalore', x: 305, y: 725, available: true, loanType: 'Education Loan', amount: 42000, description: 'College tuition fees' },
];




const Section_10 = ({ isDarkMode }) => {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const autoCycleRef = useRef();
  const interactionTimeout = useRef();


  const [stats, setStats] = useState({
  installs: 0,
  transactions: 0,
  credit: 0,
});

const statsRef = useRef(null);

useEffect(() => {
  if (!statsRef.current) return;

  const targets = {
    installs: 0,
    transactions: 0,
    credit: 0
  };

  ScrollTrigger.create({
    trigger: statsRef.current,
    start: "top 80%",
    onEnter: () => {
      gsap.to(targets, {
        duration: 2,
        installs: 10,         // 10 Lac
        transactions: 1,      // 1 Cr
        credit: 500,          // ₹500 Cr
        ease: "power1.out",
        onUpdate: () => {
          setStats({
            installs: Math.floor(targets.installs),
            transactions: Math.floor(targets.transactions),
            credit: Math.floor(targets.credit)
          });
        }
      });
    },
    once: true // Animate only once
  });
}, []);



  useEffect(() => {
    const checkTouchDevice = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);


  useEffect(() => {
    let index = 0;

    const cycleCities = () => {
      setHovered(index);
      index = (index + 1) % cityData.length;
    };

    autoCycleRef.current = gsap.timeline({ repeat: -1, paused: false });
    autoCycleRef.current.call(cycleCities).to({}, { duration: 5 });

    return () => {
      if (autoCycleRef.current) autoCycleRef.current.kill();
    };
  }, []);

  const handleInteraction = (index) => {
    if (isMobile) {
      setHovered((prev) => (prev === index ? null : index));
    } else {
      setHovered(index);
    }

    if (autoCycleRef.current) autoCycleRef.current.pause();

    clearTimeout(interactionTimeout.current);
    interactionTimeout.current = setTimeout(() => {
      autoCycleRef.current && autoCycleRef.current.resume();
    }, 4000);
  };


   const patchColor = isDarkMode ? "#006AEC" : "#25CBD3";
  const leftPatchRef = useRef(null);
  const rightPatchRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Animate patches
    gsap.to([leftPatchRef.current, rightPatchRef.current], {
      opacity: 0.3,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Animate content on scroll into view
    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          // Add these two lines to improve mobile reliability
          invalidateOnRefresh: true,
          markers: false, // Set to true for debugging
        },
      }
    );

    // Section trigger to manage visibility state
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => setIsInView(true),
      onLeave: () => setIsInView(false),
      onEnterBack: () => setIsInView(true),
      onLeaveBack: () => setIsInView(false),
      invalidateOnRefresh: true,
      markers: false,
    });

    // Refresh positions after setup (especially useful on mobile)
    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill()); // Optional: Clean up all triggers if needed
    };
  }, []);



  return (
    <div ref={sectionRef} className="relative cursor-default px-5 pt-12 md:mt-24">
     <div ref={leftPatchRef} className="absolute top-[25%] left-[5%] w-[200px] md:w-[400px] h-[400px] hidden md:block rounded-full blur-2xl md:blur-[140px] opacity-60 pointer-events-none z-0" style={{ backgroundColor: patchColor }}/>
      <div ref={rightPatchRef} className="absolute top-[25%] right-[5%] w-[200px] md:w-[400px] h-[400px] hidden md:block rounded-full blur-[140px] opacity-60 pointer-events-none z-0" style={{ backgroundColor: patchColor }}/>
      <div className="max-w-screen-xl mx-auto py-12 md:py-18 flex flex-col items-center justify-center h-full">
        <h1  style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-center mt-4 text-[28px] lg:text-[36px] xl:text-[40px] leading-[1.1] ${  isDarkMode ? 'text-white' : 'text-black' }`}>
          Crafted in India, designed for Indians
        </h1>
        <p style={{ fontFamily: 'PovetaracSansBold' }} className={`mt-2 px-5 w-full max-w-[900px] text-[14px] text-center lg:text-[14px] xl:text-lg ${  isDarkMode ? 'text-[#CCCCCC]' : 'text-[#696868]' }`}>
          120+ cities, 100+ PIN codes, unlimited taps
        </p>
      </div>

      {/* Map */}
      <div className='flex flex-col gap-16 md:gap-0 md:flex-row px-10 max-w-screen-xl mx-auto'>
        <div ref={statsRef} className='flex-1 flex flex-col items-center justify-center'>
           <div className='text-center pb-5 md:pb-10 w-full'>
             <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-4xl lg:text-5xl ${isDarkMode?'text-white':'text-black'}`}>
               {stats.installs}+ Lac.
             </h1>
             <h1 style={{ fontFamily: 'PovetaracSansBold' }} className={`text-xl lg:text-3xl ${isDarkMode?'text-white':'text-black'}`}>
               App Installs
             </h1>
           </div>
           <div className='text-center py-5 w-full'>
             <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-4xl lg:text-5xl ${isDarkMode?'text-white':'text-black'}`}>
               {stats.transactions}+ Cr.
             </h1>
             <h1 style={{ fontFamily: 'PovetaracSansBold' }} className={`text-xl lg:text-3xl ${isDarkMode?'text-white':'text-black'}`}>
               Credit Transactions
             </h1>
           </div>
           <div className='text-center pt-5 md:pt-10 w-full'>
             <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-4xl lg:text-5xl ${isDarkMode?'text-white':'text-black'}`}>
               ₹{stats.credit}+ Cr.
             </h1>
             <h1 style={{ fontFamily: 'PovetaracSansBold' }} className={`text-xl lg:text-3xl ${isDarkMode?'text-white':'text-black'}`}>
               Credit Disbursed
             </h1>
           </div>
         </div>
         
         <div className='flex-1'>
          <div className="relative max-w-[700px] mx-auto">
        <img src={India_Map} alt="India Map" className="w-full h-auto" />

        {cityData.map((city, index) => {
          const isActive = hovered === index;
          return (
            <div key={index} className="absolute group" style={{  left: `${(city.x / 900) * 100}%`, top: `${(city.y / 900) * 100}%`, transform: 'translate(-50%, -50%)',  }}
              onClick={() => handleInteraction(index)} >
              <div className="md:w-6 md:h-6 bg-[#ffffff] rounded-full cursor-pointer border-6 border-[#00C2CC] shadow-lg" />
               {isActive && (
                 <div className="absolute z-40 bg-white text-black rounded-lg shadow-lg mt-2 w-[220px] p-3 flex flex-col ">
                   <div className="flex justify-between items-center">
                     <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-[16px]">
                       {city.loanType}
                     </h1>
                     <FaUserCircle className="text-[#00C2CC] w-8 h-8" />
                   </div>
                   <h2 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-2xl font-bold">
                     ₹{city.amount.toLocaleString()}
                   </h2>
                   <p style={{ fontFamily: 'PovetaracSansBold' }} className="text-sm text-gray-500">
                     {city.description}
                   </p>
                 </div>
               )}

            </div>
          );
        })}
      </div>
         </div>
      </div>
    </div>
  );
};

export default Section_10;
