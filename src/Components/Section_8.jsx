import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

import reward_1 from '../assets/Images/Reward_1.png';
import reward_2 from '../assets/Images/Reward_2.png';
import reward_3 from '../assets/Images/Reward_1.png';

const rewards = [reward_1, reward_2, reward_3];

const Section_8 = ({ isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % rewards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: 300, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }
      );
    }
  }, [currentIndex]);

  return (
    <div className="cursor-default bg-[#F0F0F0] ">
      <div className="max-w-screen-xl mx-auto py-26 flex flex-col md:flex-row md:items-center justify-center h-full px-5 md:px-10">
        <div className="flex-1">
          <p
            style={{ fontFamily: 'PovetaracSansBold' }}
            className="text-[#084DB3] text-[14px] bg-[#DEE8F6] text-left rounded-full w-fit px-4 py-1.5"
          >
            Top Honors
          </p>
          <h1
            style={{ fontFamily: 'PovetaracSansBlack' }}
            className={`text-left mt-4 text-[28px] lg:text-[36px] xl:text-[40px] leading-[1.1] ${
              isDarkMode ? 'text-black' : 'text-black'
            }`}
          >
            Recognitions & Awards
          </h1>
          <p
            style={{ fontFamily: 'PovetaracSansBold' }}
            className={`mt-2 w-full max-w-[800px] text-[14px] text-left lg:text-[14px] xl:text-xl ${
              isDarkMode ? 'text-[#696868]' : 'text-[#696868]'
            }`}
          >
            Great things happen when trust meets excellence! Olyv has been recognized for making finance simpler,
            faster, and more accessible backed by industry leaders and loved by millions.
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-12">
          <img
            ref={imageRef}
            src={rewards[currentIndex]}
            alt={`Reward ${currentIndex + 1}`}
            className="w-full max-w-[300px]"
          />

          {/* Dots */}
          <div className="flex mt-4 space-x-2">
            {rewards.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  currentIndex === idx
                    ? 'bg-[#00C2CC] scale-125'
                    : isDarkMode
                    ? 'bg-gray-500'
                    : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section_8;
