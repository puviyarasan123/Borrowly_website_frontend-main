import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const TestimonialCard = ({ shouldPlay }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay) {
      video
        .play()
        .then(() => {
          setIsPlaying(!video.paused);
        })
        .catch((err) => {
          console.error("Autoplay failed:", err);
          setIsPlaying(false);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [shouldPlay]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  const [isMuted, setIsMuted] = useState(true); // This is okay to track state

  return (
    <div className="w-full flex flex-col gap-5 justify-center relative">
      {/* Left arrow */}
      <div className=" items-center hidden md:flex absolute z-10 -left-7 top-1/2 -translate-y-1/2">
        <button className=" bg-[#0C3B65] cursor-pointer w-14 h-14 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
          <IoIosArrowBack className="text-white w-7 h-7" />
        </button>
      </div>

      {/* Video */}
      <div className="relative w-full h-[500px] rounded-4xl overflow-hidden shadow-lg flex items-center justify-center flex-1">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          onClick={togglePlayPause}
        >
          <source
            src="https://storage.googleapis.com/digitalbillionaire-learning-videos/LinkedInGrowth/Course%20Intro.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Caption */}
        <div className="absolute bottom-0 w-full bg-white/10 backdrop-blur-xl px-5 md:px-10 py-6 text-white flex flex-col justify-end">
          <p
            style={{ fontFamily: "PovetaracSansBold" }}
            className="text-[16px] md:text-xl mb-2"
          >
            The best thing is you pay interest only on usage
          </p>
          <h3
            style={{ fontFamily: "PovetaracSansBlack" }}
            className="text-3xl mt-2"
          >
            Shankar Kumar
          </h3>
          <p
            style={{ fontFamily: "PovetaracSansBold" }}
            className="text-[14px] opacity-80"
          >
            Advertising Professional
          </p>
        </div>

        <button
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;

            video.muted = !video.muted;
            setIsMuted(video.muted);
          }}
          className="absolute top-6 right-6 cursor-pointer bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition"
        >
          {isMuted ? (
            <FaVolumeMute className="text-black w-4 h-4" />
          ) : (
            <FaVolumeUp className="text-black w-4 h-4" />
          )}
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className={`absolute cursor-pointer hidden md:flex md:bottom-6 md:right-6 bg-white w-18 h-18 rounded-full items-center justify-center shadow-md hover:scale-105 transition`}
        >
          {isPlaying ? (
            <FaPause className="text-black w-6 h-6 mx-auto" />
          ) : (
            <FaPlay className="text-black w-6 h-6 mx-auto" />
          )}
        </button>

        {!isPlaying && (
          <button
            onClick={togglePlayPause}
            className="absolute cursor-pointer md:bottom-6 md:right-6 bg-white w-18 h-18 rounded-full items-center justify-center shadow-md hover:scale-105 transition"
          >
            <FaPlay className="text-black w-6 h-6 mx-auto" />
          </button>
        )}

        {isPlaying && (
          <button
            onClick={togglePlayPause}
            className="absolute cursor-pointer hidden md:flex md:bottom-6 md:right-6 bg-white w-18 h-18 rounded-full items-center justify-center shadow-md hover:scale-105 transition"
          >
            <FaPause className="text-black w-6 h-6 mx-auto" />
          </button>
        )}
      </div>

      {/* Right arrow */}
      <div className="hidden md:flex items-center absolute z-10 -right-7 top-1/2 -translate-y-1/2">
        <button className="bg-[#0C3B65] cursor-pointer w-14 h-14 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
          <IoIosArrowForward className="text-white w-7 h-7" />
        </button>
      </div>



      <div className="flex  md:hidden px-5 gap-1 items-center justify-end">
         <button className=" bg-[#0C3B65] cursor-pointer w-14 h-14 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
          <IoIosArrowBack className="text-white w-7 h-7" />
         </button>
         <button className="bg-[#0C3B65] cursor-pointer w-14 h-14 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">
          <IoIosArrowForward className="text-white w-7 h-7" />
         </button>
      </div>
    </div>
  );
};






const Section_6 = ({ isDarkMode }) => {
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
    <div  ref={sectionRef} className="relative bg-[#F0F0F0] py-12 md:py-0 cursor-default flex items-center overflow-hidden]">
      {/* Patches */}
      <div ref={leftPatchRef} className="absolute top-[25%] left-[5%] w-[200px] md:w-[400px] h-[400px] hidden md:block rounded-full blur-2xl md:blur-[140px] opacity-60 pointer-events-none z-0" style={{ backgroundColor: patchColor }}/>
      <div ref={rightPatchRef} className="absolute top-[25%] right-[5%] w-[200px] md:w-[400px] h-[400px] hidden md:block rounded-full blur-[140px] opacity-60 pointer-events-none z-0" style={{ backgroundColor: patchColor }}/>
 
      {/* Scroll-animated content */}
      <div ref={contentRef} className="relative z-10 max-w-screen-xl mx-auto md:py-24 flex flex-col items-center h-full">
        <p style={{ fontFamily: "PovetaracSansBold" }} className="text-[#084DB3] text-[14px] bg-[#DEE8F6] text-left rounded-full w-fit px-4 py-1.5" >
          Our Customers Say
        </p>
        <h1 style={{ fontFamily: "PovetaracSansBlack" }} className={`text-center mt-4 text-[28px] lg:text-[36px] xl:text-[40px] leading-[1.1] ${ isDarkMode ? "text-white" : "text-black" }`} >
          Why do thousands of users love Borrowly
        </h1>
        <p style={{ fontFamily: "PovetaracSansBold" }} className={`mt-2 px-5 pb-8 w-full max-w-[800px] text-[14px] text-center lg:text-[14px] xl:text-lg ${  isDarkMode ? "text-[#CCCCCC]" : "text-[#696868]" }`} >
          Because we connect you with top lenders fast, fair, and transparent.
        </p>
        <div className="h-[550px] w-full px-2 md:px-5  md:max-w-[1000px]">
          <div className="w-full h-auto md:px-5">
            <TestimonialCard shouldPlay={isInView} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section_6;
