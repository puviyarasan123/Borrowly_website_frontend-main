import React, { useEffect, useRef, useState } from "react";
import step_1 from "../assets/Images/Step_1.avif";
import step_2 from "../assets/Images/Step_2.avif";
import step_3 from "../assets/Images/Step_3.avif";
import step_4 from "../assets/Images/Step_4.avif";

const Simple_steps = () => {
  const steps = [
    {
      id: "step1",
      title: "STEP - 1",
      heading: "Submit loan application with necessary documents.",
      caption:
        "Completing the loan application with accurate and up-to-date information and supporting documents can help expedite the loan approval process.",
      image: step_1,
    },
    {
      id: "step2",
      title: "STEP - 2",
      heading: "Get instant approval with a single click.",
      caption:
        "Our advanced AI technology analyzes your application and provides instant approval decisions, saving you time and effort.",
      image: step_2,
    },
    {
      id: "step3",
      title: "STEP - 3",
      heading: "KYC verification & quick agreement e-sign.",
      caption:
        "Verify your identity securely and e-sign the agreement in minutes to keep things moving without paperwork.",
      image: step_3,
    },
    {
      id: "step4",
      title: "STEP - 4",
      heading: "Fast disbursal straight to your bank.",
      caption:
        "Once approved and verified, funds are deposited to your linked bank account swiftly and securely.",
      image: step_4,
    },
  ];

  // Unified active index (desktop: via sections; mobile: via scroll position)
  const [activeIndex, setActiveIndex] = useState(0);

  // ===== Desktop refs + observer =====
  const sectionRefs = useRef(steps.map(() => React.createRef()));

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)"); // md breakpoint
    if (!mq.matches) return; // Only run on desktop/tablet (md+)

    const observers = [];
    sectionRefs.current.forEach((ref, idx) => {
      if (!ref.current) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveIndex(idx);
          });
        },
        { threshold: 0.45 }
      );
      obs.observe(ref.current);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ===== Mobile carousel =====
  const trackRef = useRef(null);
  const autoTimerRef = useRef(null);
  const isUserInteractingRef = useRef(false);

  // Keep activeIndex in sync from scroll on mobile
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const width = el.clientWidth;
      if (width === 0) return;
      const idx = Math.round(el.scrollLeft / width);
      setActiveIndex(Math.max(0, Math.min(steps.length - 1, idx)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [steps.length]);

  // Auto-scroll on mobile only
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)"); // mobile only
    const el = trackRef.current;
    if (!mq.matches || !el) return;

    const start = () => {
      stop(); // clear any existing
      autoTimerRef.current = setInterval(() => {
        if (isUserInteractingRef.current) return;
        const width = el.clientWidth;
        const next = (activeIndex + 1) % steps.length;
        el.scrollTo({ left: next * width, behavior: "smooth" });
      }, 3500);
    };
    const stop = () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    };

    start();

    // Pause on user interaction
    const pause = () => {
      isUserInteractingRef.current = true;
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
    const resume = () => {
      isUserInteractingRef.current = false;
      start();
    };

    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("mousedown", pause);
    el.addEventListener("touchend", resume, { passive: true });
    el.addEventListener("mouseup", resume);
    el.addEventListener("mouseleave", resume);

    return () => {
      stop();
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("mousedown", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("mouseup", resume);
      el.removeEventListener("mouseleave", resume);
    };
  }, [activeIndex, steps.length]);

  // Click dots to navigate (works both mobile & desktop)
  const goTo = (idx) => {
    setActiveIndex(idx);
    const el = trackRef.current;
    // If on mobile carousel, scroll the track
    if (el && window.matchMedia("(max-width: 767.98px)").matches) {
      const width = el.clientWidth;
      el.scrollTo({ left: idx * width, behavior: "smooth" });
    } else {
      // On desktop, smooth scroll to the section
      const ref = sectionRefs.current[idx]?.current;
      if (ref) ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const active = steps[activeIndex];

  return (
    <div className="w-full px-5 py-12 md:py-24 cursor-default">
      <div className="w-full max-w-screen-xl mx-auto">

        {/* ===== Desktop / Tablet (md+) layout ===== */}
        <div className="hidden md:grid grid-cols-2 gap-10">
          {/* LEFT: Sticky content */}
          <div className="md:sticky md:top-54 self-start">
            <h1
              style={{ fontFamily: "PovetaracSansBlack" }}
              className="text-left mt-2 text-[28px] lg:text-[26px] xl:text-[32px] leading-[1.1] text-black"
            >
              How Borrowly Works in 4 Simple Steps
            </h1>

            <p
              style={{ fontFamily: "PovetaracSansBold" }}
              className="mt-2 w-full max-w-[800px] text-[14px] text-left lg:text-[14px] xl:text-lg text-[#696868]"
            >
              Smart comparisons, instant decisions, secure disbursal.
            </p>

            <div className="mt-5">
              <p
                style={{ fontFamily: "PovetaracSansBold" }}
                className="text-[16px] border text-[#098F4C] border-[#098F4C] bg-[#CDFFE6] rounded-full w-fit px-6 py-1 flex items-center justify-center"
              >
                {active.title}
              </p>
            </div>

            <h2
              style={{ fontFamily: "PovetaracSansBlack" }}
              className="text-left mt-4 text-[28px] lg:text-[32px] xl:text-[38px] leading-[1.1] bg-gradient-to-r from-[#003478] to-[#9DE8EB] bg-clip-text text-transparent"
            >
              {active.heading}
            </h2>

            <div className="py-6">
              <hr className="w-full max-w-[220px] h-[6px] border-0 bg-gradient-to-r from-[#003478] to-[#9DE8EB]" />
            </div>

            <p
              style={{ fontFamily: "PovetaracSansBold" }}
              className="mt-2 w-full max-w-[800px] text-[14px] text-left lg:text-[14px] xl:text-lg text-[#696868]"
            >
              {active.caption}
            </p>

            {/* Dots */}
            <div className="mt-8 flex items-center gap-3">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={[
                    "h-2.5 w-2.5 rounded-full transition-all duration-300",
                    i === activeIndex ? "scale-125 bg-[#003478]" : "bg-[#9DE8EB]",
                  ].join(" ")}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Scrollable image sections */}
          <div className="flex flex-col">
            {steps.map((s, i) => (
              <section
                key={s.id}
                ref={sectionRefs.current[i]}
                className="relative min-h-[90vh] flex items-center justify-center"
              >
                {/* Glow patches */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -top-6 -left-6 w-[220px] h-[220px] bg-[#00C2CC] rounded-full opacity-30 blur-3xl" />
                  <div className="absolute -bottom-6 -right-6 w-[220px] h-[220px] bg-[#00C2CC] rounded-full opacity-30 blur-3xl" />
                </div>

                <img
                  src={s.image}
                  alt={s.heading}
                  className={[
                    "w-[360px] sm:w-[420px] md:w-[440px] xl:w-[480px] transition-all duration-500 ease-out relative z-10",
                    i === activeIndex ? "opacity-100 translate-y-0" : "opacity-60 translate-y-2",
                  ].join(" ")}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </section>
            ))}
          </div>
        </div>

        {/* ===== Mobile (< md) Carousel ===== */}
        <div className="md:hidden">
          <h1
            style={{ fontFamily: "PovetaracSansBlack" }}
            className="text-center md:text-left mt-6 text-3xl md:text-[24px] leading-[1.1] text-black"
          >
            How Borrowly Works in <br className="block md:hidden"></br> 4 Simple Steps
          </h1>
          <p
            style={{ fontFamily: "PovetaracSansBold" }}
            className="mt-2 text-center md:text-left text-[13px] text-[#696868]"
          >
            Smart comparisons, instant decisions,<br className="block md:hidden"></br>  secure disbursal.
          </p>

          {/* Track */}
          <div
            ref={trackRef}
            className="mt-6 relative overflow-x-auto snap-x snap-mandatory flex no-scrollbar"
            style={{ scrollBehavior: "smooth" }}
            aria-roledescription="carousel"
          >
            {steps.map((s, i) => (
              <div
                key={s.id}
                className="snap-start shrink-0 w-full px-1"
                aria-label={`Slide ${i + 1} of ${steps.length}`}
              >
                <div className="relative mx-1 rounded-2xl  bg-white p-5">
                  {/* Glow patches */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-6 -left-6 w-[180px] h-[180px] bg-[#00C2CC] rounded-full opacity-30 blur-3xl" />
                    <div className="absolute -bottom-6 -right-6 w-[180px] h-[180px] bg-[#00C2CC] rounded-full opacity-30 blur-3xl" />
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src={s.image}
                      alt={s.heading}
                      className={[
                        "w-[82%] max-w-[380px] transition-all duration-500 ease-out relative z-10",
                        i === activeIndex ? "opacity-100 translate-y-0" : "opacity-80 translate-y-1",
                      ].join(" ")}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />

                    <div className="mt-4 w-full">
                      <span
                        style={{ fontFamily: "PovetaracSansBold" }}
                        className="text-[12px] border text-[#098F4C] border-[#098F4C] bg-[#CDFFE6] rounded-full px-4 py-1"
                      >
                        {s.title}
                      </span>

                      <h3
                        style={{ fontFamily: "PovetaracSansBlack" }}
                        className="mt-3 text-[20px] leading-snug bg-gradient-to-r from-[#003478] to-[#9DE8EB] bg-clip-text text-transparent"
                      >
                        {s.heading}
                      </h3>

                      <div className="py-4">
                        <hr className="w-[160px] h-[5px] border-0 bg-gradient-to-r from-[#003478] to-[#9DE8EB]" />
                      </div>

                      <p
                        style={{ fontFamily: "PovetaracSansBold" }}
                        className="text-[13px] text-[#696868]"
                      >
                        {s.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-5 flex items-center justify-center gap-3">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={[
                  "h-2.5 w-2.5 rounded-full transition-all duration-300",
                  i === activeIndex ? "scale-125 bg-[#003478]" : "bg-[#9DE8EB]",
                ].join(" ")}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simple_steps;
