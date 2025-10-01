import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Partinership from '../assets/Icons/Partnership.svg';

const Section_9 = ({ isDarkMode }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    gsap.to(slider, {
      x: '-50%',
      duration: 30,
      ease: 'linear',
      repeat: -1,
    });

    return () => gsap.killTweensOf(slider);
  }, []);

  return (
    <div className="cursor-default">
      <div className="max-w-screen-xl mx-auto py-12 md:py-18 flex flex-col items-center justify-center h-full">
        <p style={{ fontFamily: 'PovetaracSansBold' }}  className="text-[#084DB3] text-[14px] bg-[#DEE8F6] text-left rounded-full w-fit px-4 py-1.5" >
          OUR NETWORK
        </p>
        <h1 style={{ fontFamily: 'PovetaracSansBlack' }}  className={`text-center mt-4 text-[28px] lg:text-[36px] xl:text-[40px] leading-[1.1] ${  isDarkMode ? 'text-white' : 'text-black' }`} >
          In Partnership with
        </h1>
        <p style={{ fontFamily: 'PovetaracSansBold' }} className={`mt-2 px-5 w-full max-w-[900px] text-[14px] text-center lg:text-[14px] xl:text-lg ${ isDarkMode ? 'text-[#CCCCCC]' : 'text-[#696868]' }`} >
          Powered by our trusted lending partners. Get the best loan offers, all in one place — Borrowly.
        </p>
      </div>

      {/* Seamless Scrolling Container */}
      <div className="w-full overflow-hidden relative h-[150px] md:h-[250px] lg:h-[300px]">
        <div  ref={sliderRef}  className="flex w-[200%] h-full" style={{ position: 'absolute', top: 0, left: 0 }} >
          <img  src={Partinership} alt="Partner logos" className="h-full w-[100%] object-cover" />
          <img src={Partinership} alt="Partner logos duplicate" className="h-full w-[100%] object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Section_9;
