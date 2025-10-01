// src/components/Section_3.jsx
import React, { useEffect, useRef, useState } from "react";
import Tick from "../../assets/Icons/tick_Send.svg";

const Section_3 = ({ slides = [], title }) => {
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const scrollTo = (i) => {
    const target = cardRefs.current[i];
    target?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  // Observe visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (!isVisible || slides.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % slides.length;
        scrollTo(next);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible, slides]);

  // ✅ Fallback if no slides
  if (!slides || slides.length === 0) {
    return (
      <div ref={sectionRef} className="py-10 text-center">
        <h1
          style={{ fontFamily: "PovetaracSansBlack" }}
          className="text-center mt-5 text-black text-[28px] pb-5 lg:text-[32px] leading-[1.1]"
        >
          {title}
        </h1>
        <p className="text-gray-500">No slides available</p>
      </div>
    );
  }

  return (
    <div ref={sectionRef}>
      <h1
        style={{ fontFamily: "PovetaracSansBlack" }}
        className="text-center mt-5 text-black text-[28px] pb-5 lg:text-[32px] leading-[1.1]"
      >
        {title}
      </h1>

      {/* --- Mobile (<md) carousel --- */}
      <div className="md:hidden  mt-5">
        <div
          ref={scrollerRef}
          className="flex gap-3  overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollBehavior: "smooth" }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="snap-start w-full shrink-0 px-1"
            >
              <div
                className={`rounded-3xl overflow-hidden ${
                  s.light
                    ? "bg-[#F2F4FB]"
                    : "bg-gradient-to-b from-[#014094] to-[#015FDA] text-white"
                }`}
              >
                <div className="px-5 py-4">
                  {!s.light && <img src={Tick} alt="" className="w-12 mx-auto" />}
                  <h2
                    style={{ fontFamily: "PovetaracSansBlack" }}
                    className={`mt-4 ${
                      s.light ? "text-black" : "text-white text-center"
                    } text-xl leading-[1.1]`}
                  >
                    {s.title}
                  </h2>
                  <p
                    style={{ fontFamily: "PovetaracSansBold" }}
                    className={`mt-2 text-[16px] ${
                      s.light
                        ? "text-[#474040]"
                        : "text-white/90 text-center"
                    }`}
                  >
                    {s.text}
                  </p>
                </div>
                <div className="h-[500px] flex items-center justify-center">
                  <img src={s.image} alt="" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                index === i ? "w-6 bg-[#000000]" : "w-2 bg-[#cfcfcf]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* --- Desktop (md+) grid layout --- */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 py-5">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`rounded-3xl overflow-hidden ${
              s.light
                ? "bg-[#F2F4FB]"
                : "bg-gradient-to-b from-[#014094] to-[#015FDA] text-white flex flex-col"
            }`}
          >
            <div className="p-8 flex flex-col items-center justify-center">
              {!s.light && <img src={Tick} alt="" className="mb-4" />}
              <h3
                style={{ fontFamily: "PovetaracSansBlack" }}
                className={`mt-2 ${
                  s.light ? "text-black text-left" : "text-white"
                } text-xl w-full leading-[1.1] text-center`}
              >
                {s.title}
              </h3>
              <p
                style={{ fontFamily: "PovetaracSansBold" }}
                className={`mt-2 text-[16px] ${
                  s.light ? "text-[#474040]" : "text-white text-center"
                }`}
              >
                {s.text}
              </p>
            </div>
            <div className="h-[450px] flex items-center justify-center">
              <img src={s.image} alt="" className="w-full h-full object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section_3;
