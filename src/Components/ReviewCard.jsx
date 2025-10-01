import React, { useRef, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Review_Image from '../assets/Images/Review_Image.png';

gsap.registerPlugin(ScrollToPlugin);

const reviewList = [
  {
    name: "Singh brothers",
    age: 34,
    loanType: "Personal Loan",
    date: "14/03/25",
    rating: 5,
    quote: `“The Borrowly team made my personal loan process hassle-free. They explained everything clearly, compared lenders for me, and got me the best rate within 2 days. Truly appreciate their support.”`,
    image: "/review_1.avif",
  },
  {
    name: "Ritika Bansal",
    age: 29,
    loanType: "Business Loan",
    date: "10/02/25",
    rating: 5,
    quote: `“I needed funds to expand my retail business. Borrowly guided me through the documentation and got my loan approved quickly. Professional and reliable service!”`,
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Manoj Reddy",
    age: 38,
    loanType: "Home Loan",
    date: "22/01/25",
    rating: 5,
    quote: `“Getting a home loan seemed stressful now-a-days, but the Borrowly team made it simple. They helped me compare options, explained hidden charges, and got me the lowest EMI possible.”`,
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    name: "Rahul Choudhary",
    age: 27,
    loanType: "Education Loan",
    date: "18/12/24",
    rating: 5,
    quote: `“Borrowly supported me in arranging an education loan for my MBA abroad. They guided my parents through every step and made the process stress-free. Thank you!”`,
    image: "https://randomuser.me/api/portraits/men/20.jpg",
  },
  {
    name: "Karan and Pargat Singh",
    age: 31,
    loanType: "Car Loan",
    date: "05/01/25",
    rating: 5,
    quote: `“I purchased my first car with the help of Borrowly. The loan was approved quickly, the process was transparent, and I didn’t face any hidden surprises. Highly recommended.”`,
    image: "https://randomuser.me/api/portraits/men/70.jpg",
  },
  {
    name: "Sappogu Deepika",
    age: 36,
    loanType: "Gold Loan",
    date: "07/12/24",
    rating: 5,
    quote: `“I urgently needed funds and Borrowly’s gold loan service was a lifesaver. Quick valuation, instant disbursement, and very polite customer support.”`,
    image: "https://randomuser.me/api/portraits/women/30.jpg",
  },
];


const GAP = 20;
const VISIBLE_CARDS = 3;

const getCardWidth = (width) => {
  if (width >= 1024) return 800;
  if (width >= 768) return 600;
  return 350;
};

const ReviewCard = () => {
  const scrollRef = useRef(null);
  const isScrolling = useRef(false);
  const [, setTick] = useState(0);
  const [cardWidth, setCardWidth] = useState(getCardWidth(window.innerWidth));
  const [currentIndex, setCurrentIndex] = useState(1); // For dot tracking
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const reviews = [
    reviewList[reviewList.length - 1],
    ...reviewList,
    reviewList[0],
  ];

  useEffect(() => {
    const handleResize = () => {
      setCardWidth(getCardWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cardStep = cardWidth + GAP;
    container.scrollLeft = cardStep;

    const interval = setInterval(() => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      const currentScroll = container.scrollLeft;
      const maxScroll = (reviews.length - 1) * cardStep;
      const target = currentScroll + cardStep;

      gsap.to(container, {
        scrollTo: { x: target },
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          if (target >= maxScroll - cardStep / 2) {
            container.scrollLeft = cardStep;
          }
          isScrolling.current = false;
        },
      });
    }, 3000);

    const onScroll = () => {
      const index = getCenterIndex();
      setCurrentIndex(index);
      setTick((t) => t + 1);
    };
    container.addEventListener('scroll', onScroll);

    return () => {
      clearInterval(interval);
      container.removeEventListener('scroll', onScroll);
    };
  }, [cardWidth]);

  const scroll = (direction) => {
    if (isScrolling.current) return;
    isScrolling.current = true;

    const container = scrollRef.current;
    if (!container) return;

    const cardStep = cardWidth + GAP;
    const currentScroll = container.scrollLeft;
    const maxScroll = (reviews.length - 1) * cardStep;
    const target =
      direction === 'left'
        ? currentScroll - cardStep
        : currentScroll + cardStep;

    gsap.to(container, {
      scrollTo: { x: target },
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        if (direction === 'right' && target >= maxScroll - cardStep / 2) {
          container.scrollLeft = cardStep;
        } else if (direction === 'left' && target <= cardStep / 2) {
          container.scrollLeft = maxScroll - cardStep * 2;
        }
        isScrolling.current = false;
      },
    });
  };

  const getCenterIndex = () => {
    const container = scrollRef.current;
    if (!container) return 0;

    const cardStep = cardWidth + GAP;
    const scrollLeft = container.scrollLeft;
    return Math.round(scrollLeft / cardStep);
  };

  const getCardOpacity = (index) => {
    return index === getCenterIndex() ? 1 : 0.25;
  };

  const containerWidth = cardWidth * VISIBLE_CARDS + GAP * (VISIBLE_CARDS - 1);
  const sidePadding = (containerWidth - cardWidth) / 2;

  // Mobile swipe gesture handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        scroll('right');
      } else {
        scroll('left');
      }
    }
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center">
      <div
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex flex-row items-center px-5 pb-5 hide-scrollbar"
        style={{
          width: `${containerWidth}px`,
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          gap: `${GAP}px`,
          paddingLeft: `${sidePadding}px`,
          paddingRight: `${sidePadding}px`,
        }}
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className="h-[350px] md:h-[400px] flex-shrink-0 relative bg-[#F8F6F6] rounded-4xl p-3 transition-opacity duration-300"
            style={{
              scrollSnapAlign: 'center',
              opacity: getCardOpacity(index),
              width: `${cardWidth}px`,
            }}
          >
            {getCenterIndex() === index && (
              <>
                {/* Arrows visible only on md and above */}
                <button  className="absolute z-10 -left-6 top-1/2 transform cursor-pointer -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:scale-110 transition hidden md:flex"  onClick={() => scroll('left')}>
                  <IoIosArrowBack className="w-8 h-8" />
                </button>

                <button className="absolute z-10 -right-6 top-1/2 transform cursor-pointer -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:scale-110 transition hidden md:flex" onClick={() => scroll('right')} >
                  <IoIosArrowForward className="w-8 h-8" />
                </button>
              </>
            )}

            <div className="flex flex-row h-full">
              <img src={review.image} alt="" className="h-full hidden md:flex rounded-2xl" />
              <div className="flex-1 p-4 flex flex-col">
                <div className="flex-1 flex items-center">
                  <h1 style={{ fontFamily: 'PovetaracSansBold' }}>{review.quote}</h1>
                </div>
                <div className="py-6 flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img src={review.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col px-4">
                    <h1 className="text-lg" style={{ fontFamily: 'PovetaracSansBlack' }}>{review.name}</h1>
                    <h1 className="text-[14px]" style={{ fontFamily: 'PovetaracSansBold' }}>Age - {review.age}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots for mobile */}
      <div className="flex pb-3 justify-center md:hidden">
        {reviewList.map((_, index) => {
          const adjustedIndex = index + 1;
          return (
            <div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                currentIndex === adjustedIndex ? 'bg-black scale-125' : 'bg-gray-400'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ReviewCard;
