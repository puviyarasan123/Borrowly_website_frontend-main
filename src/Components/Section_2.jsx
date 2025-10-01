import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import section_2_Dark from '../assets/Icons/Section_2_LightBG.svg';
import section_3_light from '../assets/Icons/Section_2_DarkBG.svg';


import Icon_1 from '../assets/Icons/section_2_icon_1.svg'
import Icon_2 from '../assets/Icons/section_2_icon_2.svg'
import Icon_3 from '../assets/Icons/section_2_icon_3.svg'
import Icon_4 from '../assets/Icons/section_2_icon_4.svg'

gsap.registerPlugin(ScrollTrigger);

const Section_2 = ({ isDarkMode }) => {
  // Use your client’s light/texture patterns here
  const bgImage = isDarkMode ? section_3_light : section_2_Dark;

  const containerRef = useRef(null);
  const statsRef = useRef([]);
  const headingRef = useRef(null);

  const numbers = [
    {icons:Icon_1, value: 18.7, suffix: '+', prefix: '₹', label: 'Cr Disbursed', decimal: true },
    { icons:Icon_2, value: 2500, suffix: '+', prefix: '', label: 'Happy Customers' },
    { icons:Icon_3, value: 30, suffix: '+', prefix: '', label: 'Cities Served' },
    { icons:Icon_4, value: 97, suffix: '%', prefix: '', label: 'Customer Satisfaction' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate heading
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animate counters
      statsRef.current.forEach((el, index) => {
        if (!el) return;
        const { value, suffix, prefix, decimal } = numbers[index];
        const obj = { count: value / 2 };

        gsap.to(obj, {
          count: value,
          duration: 2,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.innerText =
              (prefix || '') +
              (decimal ? obj.count.toFixed(1) : Math.floor(obj.count).toLocaleString()) +
              (suffix || '');
          },
        });
      });
    }, containerRef);

    return () => {
      ctx.revert(); // cleans up animations + ScrollTriggers
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${isDarkMode ? 'bg-white' : 'bg-[#001C40]'} cursor-default relative py-14 w-full overflow-hidden`}
    >
      {/* Optional soft gradient to keep text readable */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-[#001F47]  to-[#1E6592]`}
        aria-hidden="true"
      />

      <div className="relative max-w-screen-xl mx-auto h-full z-10 flex flex-col items-center justify-center">
        <h1 ref={headingRef} style={{ fontFamily: 'PovetaracSansBold' }} className={`text-3xl md:text-4xl text-center ${isDarkMode ? 'text-black' : 'text-white'}`}>
          Trusted by Thousands.<br className="block md:hidden" /> Built on Results.
        </h1>
        <p style={{ fontFamily: 'PovetaracSansBold' }} className={`mt-2 px-4 w-full max-w-[800px] text-[14px] text-center lg:text-[14px] xl:text-lg  ${ isDarkMode ? ' text-[#696868]' : 'text-[#CCCCCC]' }`}>
          Delivering speed, security, and  satisfaction <br className="block md:hidden" /> every single day.
        </p>

        <div className="text-center py-3 px-2 flex items-center justify-center flex-wrap mt-8 gap-16 md:gap-24">
          {numbers.map((item, index) => (
            <div key={index} className={`${isDarkMode ? 'text-black' : 'text-white'}`}>
              <div className='w-full pb-5 flex items-center justify-center'>
                <img src={item.icons} alt='' className='w-8 h-8' />
              </div>
              <h1
                ref={(el) => (statsRef.current[index] = el)}
                style={{ fontFamily: 'PovetaracSansBold' }}
                className="text-4xl md:text-5xl"
              >
                0{item.suffix}
              </h1>
              <p
                style={{ fontFamily: 'PovetaracSansbold' }}
                className="text-xl md:text-lg text-[#ffffff]"
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section_2;
