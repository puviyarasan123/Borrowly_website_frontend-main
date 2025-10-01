import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Section_11 = ({ isDarkMode, title, subtitle, faqs = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // ✅ faqs is always an array (default = [])
  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="cursor-default pt-12 md:pt-24">
      <div className="max-w-screen-xl mx-auto pt-12 md:py-18 flex flex-col items-center justify-center h-full">
        {/* Subtitle */}
        {subtitle && (
          <p
            style={{ fontFamily: 'PovetaracSansBold' }}
            className="text-[#084DB3] text-[14px] bg-[#DEE8F6] text-left rounded-full w-fit px-4 py-1.5"
          >
            {subtitle}
          </p>
        )}

        {/* Title */}
        {title && (
          <h1
            style={{ fontFamily: 'PovetaracSansBlack' }}
            className={`text-center mt-4 text-[28px] lg:text-[36px] xl:text-[40px] leading-[1.1] ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            {title}
          </h1>
        )}

        {/* FAQs */}
        <div className="py-12 px-5 w-full max-w-[1000px]">
          {visibleFaqs.length === 0 ? (
            <p className="text-center text-gray-500">No FAQs available.</p>
          ) : (
            visibleFaqs.map((faq, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#C4D2E5] bg-[#F4F6FA] rounded-lg md:rounded-2xl mb-2 md:mb-4 overflow-hidden transition-all duration-300"
                >
                  {/* Question */}
                  <button
                    className="flex justify-between cursor-pointer items-center w-full py-4 md:py-6 px-4 md:px-6 lg:px-8 focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h2
                      style={{ fontFamily: 'PovetaracSansBlack' }}
                      className="text-black text-[14px] lg:text-xl text-left"
                    >
                      {faq.question}
                    </h2>
                    <span className="text-[#084DB3] text-sm md:text-lg">
                      {isActive ? <FaMinus /> : <FaPlus />}
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className={`px-4 md:px-6 lg:px-8 transition-all duration-300 ease-in-out overflow-hidden ${
                      isActive
                        ? 'max-h-[500px] opacity-100 pb-6'
                        : 'max-h-0 opacity-0 pt-0 pb-0'
                    }`}
                  >
                    <p
                      style={{ fontFamily: 'PovetaracSansBold' }}
                      className="text-[#696969] text-[14px] lg:text-lg whitespace-pre-line"
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          )}

          {/* Show More / Less */}
          {faqs.length > 5 && (
            <div className="flex justify-center mt-8">
              <button
                style={{ fontFamily: 'PovetaracSansBlack' }}
                onClick={() => setShowAll((prev) => !prev)}
                className="text-[#7a7a7a] font-medium hover:underline cursor-pointer underline-offset-4 text-xl"
              >
                {showAll ? 'Show Less' : 'Show More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section_11;
