import {useEffect,useRef,useState} from 'react'

import Home_Earn_image from '../assets/Images/Home_Earn_image.png'
import tick from '../assets/Icons/Tick.svg'
import Apply_arrow from '../assets/Icons/Apply_arrow.svg';
import Affiliate_Icon_1 from '../assets/Icons/Affiliate_Rewards_Icons_1.svg'
import Affiliate_Icon_2 from '../assets/Icons/Affiliate_Rewards_Icons_2.svg'
import Affiliate_Icon_3 from '../assets/Icons/Affiliate_Rewards_Icons_3.svg'

import Affiliate_Sub_icon1 from '../assets/Icons/Affiliate_Sub_Icon_1.svg'
import Affiliate_Sub_icon2 from '../assets/Icons/Affiliate_Sub_Icon_2.svg'
import Affiliate_Sub_icon3 from '../assets/Icons/Affiliate_Sub_Icon_3.svg'
import Affiliate_Sub_icon4 from '../assets/Icons/Affiliate_Sub_Icon_4.svg'
import Affiliate_Sub_icon5 from '../assets/Icons/Affiliate_Sub_Icon_5.svg'
import Affiliate_Sub_icon6 from '../assets/Icons/Affiliate_Sub_Icon_6.svg'
import Affiliate_Sub_icon7 from '../assets/Icons/Affiliate_Sub_Icon_7.svg'
import { motion } from "framer-motion";

const Section_5 = ({isDarkMode}) => {

  const affiliateSteps = [
  {
    icon: Affiliate_Icon_1,
    title: "Join the Program",
    description: "Sign up and get instant access to your affiliate dashboard with performance tracking tools."
  },
  {
    icon: Affiliate_Icon_2,
    title: "Promote Your Unique Link",
    description: "Share your affiliate link through websites, YouTube, blogs, Instagram, WhatsApp, or ad platforms."
  },
  {
    icon: Affiliate_Icon_3,
    title: "Earn on Every Success",
    description: "Get ₹500 credited to your account for every verified loan disbursal from your referral — with no earning cap."
  }
];


 
 const affiliateSubFeatures = [
   { icon: Affiliate_Sub_icon1, title: "Secure System" },
   { icon: Affiliate_Sub_icon2, title: "Easy Setup" },
   { icon: Affiliate_Sub_icon3, title: "Real-Time Dashboard" },
   { icon: Affiliate_Sub_icon4, title: "Performance Based" },
   { icon: Affiliate_Sub_icon5, title: "Track Earnings" },
   { icon: Affiliate_Sub_icon6, title: "Passive Income" },
   { icon: Affiliate_Sub_icon7, title: "Instant Notifications" },
 ];

   const items = affiliateSubFeatures.concat(affiliateSubFeatures);

 const affiliateBenefits = [
  "50% Commission on Agent/Course Referrals","Guaranteed Payouts on Every Loan Disbursal","Lifetime Affiliate Earnings","Fully Digital Tracking & Support",
 ];




   const viewportRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const autoMs = 3500; 
  const slideCount = affiliateSteps.length;

  const goTo = (i) => {
    const el = viewportRef.current;
    if (!el) return;
    const clamped = (i + slideCount) % slideCount;
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    setIdx(clamped);
  };

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setIdx(Math.min(Math.max(i, 0), slideCount - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [slideCount]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let paused = false;
    const pause = () => (paused = true);
    const resume = () => (paused = false);

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });

    const id = setInterval(() => {
      if (!paused) goTo(idx + 1);
    }, autoMs);

    return () => {
      clearInterval(id);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, [idx, autoMs]);


  return (
    <div className="cursor-default mt-10 md:mt-5">
      <div className='bg-[#F0F0F0] py-12 md:py-0'>
 <div className="max-w-screen-xl  mx-auto md:py-16 flex flex-col items-center justify-center h-full">
            <p style={{ fontFamily: 'PovetaracSansBold' }} className='text-[#084DB3] text-[14px] bg-[#DEE8F6] text-left rounded-full w-fit px-4 py-1.5'>GROW WITH US</p>
            <h1  style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-center mt-4 text-[28px] lg:text-[36px] xl:text-[40px] leading-[1.1] ${ isDarkMode ? 'text-white' : 'text-black'}`}> Earn with Borrowly</h1>
            <p style={{ fontFamily: 'PovetaracSansBold' }} className={`mt-2 px-5 w-full max-w-[800px] text-[14px] text-center lg:text-[14px] xl:text-lg  ${ isDarkMode ? 'text-[#CCCCCC]' : 'text-[#696868]' }`}>
             Simplify earnings by joining India’s trusted loan affiliate network.
            </p>
             <div className="w-full max-w-[1200px] px-5 pt-6 gap-5 flex flex-col md:flex-row md:py-16">
                <div className='flex-1'>
                      <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-left mt-4 text-[28px] lg:text-[36px] xl:text-[40px] leading-[1.1] ${ isDarkMode ? 'text-white' : 'text-black'}`}>
                        Turn Your Network into a Passive Income Engine
                      </h1>
                      <p style={{ fontFamily: 'PovetaracSansBold' }} className={`text-left mt-4 text-[16px] lg:text-[14px] xl:text-[16px] ${ isDarkMode ? 'text-[#CCCCCC]' : 'text-[#696868]' }`} >
                        Join Borrowly’s Affiliate Partner Program and earn from two powerful income streams — get ₹500+ for every successful loan disbursal, and earn 50% commission on every course/agent referral. No investment beyond our one-time ₹1499 registration fee. Unlock lifetime earnings by simply connecting people with India’s trusted loan providers.
                      </p>
                      <div className={`${isDarkMode ? 'text-white' : 'text-black'} py-6 flex flex-col gap-2 md:gap-4`}>
                        {affiliateBenefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <img src={tick} alt="tick" className="w-8" />
                            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="md:text-lg lg:text-lg mt-1.5" >
                              {benefit}
                            </h1>
                          </div>
                        ))}
                      </div>
                       <div className="w-full py-4 md:py-6">
                         <button style={{ fontFamily: 'PovetaracSansHeavy' }} className="flex-1 py-4 md:py-3 w-full md:max-w-[500px] cursor-pointer hover:scale-102 bg-[#00C2CC] flex items-center justify-center text-white text-[16px] lg:text-[18px] rounded-lg">
                           <span className="mt-1">GET YOUR CIBIL SCORE</span>
                           <img src={Apply_arrow} alt="Apply Arrow"  className="inline w-[22px] ml-2"/>
                         </button>
                       </div>
                        <div className={`${ isDarkMode ? 'text-white' : 'text-black'} flex flex-row items-center gap-1 opacity-70`}>
                          <h1 className='text-center mt-0.5 text-[12px] md:text-[14px] lg:text-[16px]'>
                           No Limits. No Cap. Just Earnings.
                          </h1>
                        </div>
                </div>
                <div className='flex-1'>
                    <img src={Home_Earn_image} alt="" className='w-full h-full object-cover rounded-2xl' />
                </div>
            </div>
        </div>
      </div>
      <div className='py-12'>
                <div className="max-w-screen-xl  mx-auto flex flex-col items-center justify-center h-full">
            <p style={{ fontFamily: 'PovetaracSansBold' }} className='text-[#084DB3] text-[14px] bg-[#DEE8F6] text-left rounded-full w-fit px-4 py-1.5'>Affiliate Rewards</p>
            <h1  style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-center mt-4 text-[28px] lg:text-[36px] xl:text-[40px] leading-[1.1] ${ isDarkMode ? 'text-white' : 'text-black'}`}>How the Borrowly Affiliate Program Works</h1>
            <p style={{ fontFamily: 'PovetaracSansBold' }} className={`mt-2 px-5 w-full max-w-[800px] text-[14px] text-center lg:text-[14px] xl:text-lg  ${ isDarkMode ? 'text-[#CCCCCC]' : 'text-[#696868]' }`}>
             Get paid for every successful loan disbursal and course sign-up. It's easy, transparent, and built to scale.
            </p>
    <div className="w-full max-w-screen-xl px-5">
      {/* Mobile: swipeable carousel */}
      <div className="md:hidden pt-6">
        <div
          ref={viewportRef}
          className="relative w-full overflow-x-auto scroll-smooth snap-x snap-mandatory flex touch-pan-x"
          style={{ scrollbarWidth: "none" }}
        >
          {affiliateSteps.map((step, i) => (
            <div
              key={i}
              className={`snap-start shrink-0 w-full px-1`}
              style={{ scrollSnapAlign: "start" }}
            >
              <div
                className={`${i === 0 ? "bg-[#BB2FD2]" : i === 1 ? "bg-[#2B80FF]" : "bg-[#34524A]"}
                  p-1 rounded-2xl h-[350px] flex gap-3 flex-col items-center justify-center`}
              >
                <img src={step.icon} alt="" className="w-16" />
                <h1
                  style={{ fontFamily: "PovetaracSansBlack" }}
                  className="text-center mt-4 text-[28px] leading-[1.1] text-white"
                >
                  {step.title}
                </h1>
                <p
                  style={{ fontFamily: "PovetaracSansBold" }}
                  className="px-5 w-full max-w-[800px] text-[14px] text-center text-white"
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {affiliateSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300
                ${idx === i ? "w-6 bg-black" : "w-2 bg-black/50"}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop/Tablet: original grid */}
      <div className="hidden md:flex w-full max-w-screen-xl pt-16 gap-5 flex-wrap justify-center">
        {affiliateSteps.map((step, index) => (
          <motion.div
            key={index}
            className={`${index === 0 ? "bg-[#BB2FD2]" : index === 1 ? "bg-[#2B80FF]" : "bg-[#34524A]"}
              p-1 rounded-2xl h-[350px] flex gap-3 flex-col items-center justify-center
              w-full sm:w-[48%] md:w-[30%]`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.4 }}
          >
            <img src={step.icon} alt="" className="w-16" />
            <h1
              style={{ fontFamily: "PovetaracSansBlack" }}
              className="text-center mt-4 text-[28px] lg:text-2xl leading-[1.1] text-white"
            >
              {step.title}
            </h1>
            <p
              style={{ fontFamily: "PovetaracSansBold" }}
              className="px-5 w-full max-w-[800px] text-[14px] text-center lg:text-[16px] text-white"
            >
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
           <div className="md:hidden pt-5 relative w-full overflow-hidden">
  <motion.div
    className="flex items-center gap- whitespace-nowrap w-full"
    animate={{ x: ["-50%", "0%"] }}
    transition={{ duration: 10, ease: "linear", repeat: Infinity }}
    style={{ willChange: "transform" }}
  >
    {items.map((feature, index) => (
      <div
        key={index}
        style={{ fontFamily: "PovetaracSansBlack" }}
        className={`shrink-0 w-auto flex items-center gap-2 ${
          isDarkMode ? "text-white" : "text-black"
        } hover:scale-105 border border-[#DEDEDE] py-3 px-3 rounded-2xl mx-2 overflow-hidden`}
      >
        <img src={feature.icon} alt={feature.title} className="w-8 flex-none" />
        <span className="mt-1 whitespace-normal break-words [word-break:break-word] hyphens-auto">
          {feature.title}
        </span>
      </div>
    ))}
  </motion.div>
</div>


      {/* Desktop/Tablet: your original flex-wrap */}
      <div className="hidden md:flex w-full max-w-screen-xl px-5 gap-5 flex-wrap py-16 justify-center">
        {affiliateSubFeatures.map((feature, index) => (
          <div
            key={index}
            style={{ fontFamily: "PovetaracSansBlack" }}
            className={`w-fit flex text-[14px] items-center gap-2 ${
              isDarkMode ? "text-white" : "text-black"
            } hover:scale-102 border border-[#DEDEDE] py-3 px-3 md:px-6 rounded-2xl`}
          >
            <img src={feature.icon} alt={feature.title} className="w-8" />
            <span className="mt-1">{feature.title}</span>
          </div>
        ))}
      </div>
              <div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Section_5
