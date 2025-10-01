import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CIBIL_Home_image from '../assets/Images/CIBIL_Home_image_new.avif';
import BlupIcon from '../assets/Icons/BlupIcon.svg';
import Apply_arrow from '../assets/Icons/Apply_arrow.svg';

gsap.registerPlugin(ScrollTrigger);

const Section_3 = ({ isDarkMode }) => {
  const cibilRefs = useRef([]);
  const sectionRef = useRef(null);
  cibilRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cibilRefs.current.includes(el)) {
      cibilRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cibilRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animatedText = "CIBIL Score,".split('').map((char, index) => (
    <span
      key={index}
      ref={addToRefs}
      className="inline-block opacity-0 will-change-transform"
    >
      {char}
    </span>
  ));

  return (
    <div ref={sectionRef} className="md:py-24 cursor-default md:px-5 flex items-center">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-5">
        <div className="flex-1 p-10">
          <img src={CIBIL_Home_image} alt="" className="" />
        </div>
        <div className="flex-1 px-5 md:px-10 lg:px-0">
            <p style={{ fontFamily: 'PovetaracSansBold' }} className="text-[#000000] text-[14px] border border-[#CFCCCC] rounded-full w-fit px-4 py-1.5 flex items-center justify-center">
              CIBIL Check
            </p>
          <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-left mt-4 text-[28px] lg:text-[36px] xl:text-[40px] leading-[1.1] ${  isDarkMode ? 'text-white' : 'text-black'}`} >
            Your{' '}
            <span className="text-[33px] lg:text-[41px] xl:text-[45px] text-[#0B3762] whitespace-nowrap">
              {animatedText}
            </span>{' '}
            in your hands. Stay informed, stay ahead.
          </h1>
          <div className={`flex items-center gap-1 mt-3 w-fit px-3 py-1.5 rounded-xl ${isDarkMode?'bg-white':'bg-white'} border border-[#D7D7D7]`}>
            <img src={BlupIcon} alt="" className="w-5 md:w-6" />
            <p style={{ fontFamily: 'PovetaracSansBold' }} className="text-[#676868] text-xs md:text-[14px] mt-2">
              Don’t worry! Checking your own CIBIL Score won’t lower it.
            </p>
          </div>
          <div className="py-7 md:py-10">
            <hr className={`w-full max-w-[200px] border ${isDarkMode?'border-white':'border-black'} `} />
          </div>
          <div style={{ fontFamily: 'PovetaracSansBold' }} className={`text-[15px] md:text-xl ${isDarkMode?'text-white':'text-black'}`}>
            <h1>Become credit ready today!</h1>
            <h1> Already have an account?{' '}
              <span className="text-[#00C2CC] underline underline-offset-8">
                Log in
              </span>
            </h1>
          </div>
          <div className="w-full py-4 md:py-6">
            <button style={{ fontFamily: 'PovetaracSansHeavy' }} className="flex-1 py-4 md:py-3 w-full md:max-w-[500px] cursor-pointer hover:scale-102 bg-[#00C2CC] flex items-center justify-center text-white text-[16px] lg:text-[18px] rounded-lg">
              <span className="mt-1">GET YOUR CIBIL SCORE</span>
              <img src={Apply_arrow} alt="Apply Arrow"  className="inline w-[22px] ml-2"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section_3;
