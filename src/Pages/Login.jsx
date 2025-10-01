import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import OtpModal from '../Components/OtpModal'

import ad_1 from '../assets/Images/Login_ads_1.jpeg';
import ad_2 from '../assets/Images/Login_ads_2.jpeg';
import ad_3 from '../assets/Images/Login_ads_3.jpeg';

// Zod schema for login
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Zod schema for forgot password
const forgotSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const Login = () => {
  const ads = [ad_1, ad_2, ad_3];
  const [active, setActive] = useState(0);
  const [isForgot, setIsForgot] = useState(false);
  const highlightRef = useRef(null);
  const navigate = useNavigate();
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  // GSAP animation for toggle highlight
  useEffect(() => {
    if (!isForgot) {
      gsap.to(highlightRef.current, {
        xPercent: active * 100,
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  }, [active, isForgot]);

  // Ad carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [currentIndex]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const onDotClick = (index) => {
    setCurrentIndex(index);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 4000);
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(isForgot ? forgotSchema : loginSchema),
  });

  const onSubmit = (data) => {
    if (isForgot) {
      console.log('Forgot password email:', data.email);
      // API call to send OTP here
      setIsOtpModalOpen(true);
    } else {
      console.log('Login form data:', data);
    }
  };


  const handleOtpVerify = (otpCode) => {
  console.log("OTP Verified:", otpCode);
  if (otpCode === "123456") return true;
  return false;
  };

  
  const handlePasswordReset = (newPassword) => {
    console.log("New password set:", newPassword);
  };


  return (
    <div className="bg-white cursor-default md:h-[100dvh]">
      <div className="flex flex-col h-full">
        <div className="flex flex-1 w-full flex-col-reverse md:flex-col lg:flex-row h-full lg:container mx-auto">
          
          {/* Left - Ads */}
          <div className="flex-1 flex items-center justify-center pb-3">
            <div className="w-full max-w-[500px] mx-auto">
              <div className="flex-1 flex items-center justify-center">
                <img key={currentIndex}  ref={imageRef} src={ads[currentIndex]} alt={`ad_${currentIndex + 1}`}  className="w-full" style={{ opacity: 0 }}/>
              </div>
              <div className="flex justify-center mt-3 space-x-3">
                {ads.map((_, index) => (
                  <button key={index}  onClick={() => onDotClick(index)} className={`w-2 h-2 rounded-full ${  index === currentIndex ? 'bg-[#00C2CC]' : 'bg-gray-400' }`}  aria-label={`Show ad ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="w-full lg:max-w-[625px] mx-auto flex items-center justify-center">
            <div className="rounded-2xl lg:rounded-3xl lg:border lg:border-[#e2e2e2] w-full md:p-5 bg-white">
              
              <img src="/Company_icon.svg"  alt="" className="w-[110px] h-[110px] mx-auto" />

              <div className="py-5 px-5 md:px-10">
                {/* Title */}
                <div className="pb-5">
                  <h1   style={{ fontFamily: 'PovetaracSansBlack' }}  className="text-center text-3xl" >
                    {isForgot ? 'Change or Reset OTP' : 'Welcome Back'}
                  </h1>
                  <p style={{ fontFamily: 'PovetaracSansBold' }}  className="text-center text-[14px] text-gray-600" >
                    {isForgot
                      ? 'Enter your email address and we’ll send you an OTP to reset your password.'
                      : 'Welcome Back, Please enter Your details'}
                  </p>
                </div>

                {/* Toggle - hidden in forgot mode */}
                {!isForgot && (
                  <div className="relative bg-[#F0EFF2] mx-auto h-[53px] w-full max-w-[375px] rounded-2xl flex p-1 select-none">
                    <div ref={highlightRef}  className="absolute top-1 bottom-1 bg-white rounded-xl shadow-md"  style={{ left: '4px',  width: 'calc(50% - 5px)',  willChange: 'transform', }}
                    />
                    <button style={{ fontFamily: 'PovetaracSansBlack' }}  onClick={() => setActive(0)} className={`relative flex-1 rounded-xl text-center ${ active === 0 ? 'text-black' : 'text-gray-600 hover:cursor-pointer'}`} >
                      Borrow
                    </button>
                    <button style={{ fontFamily: 'PovetaracSansBlack' }} onClick={() => setActive(1)}    className={`relative flex-1 rounded-xl text-center ${ active === 1 ? 'text-black' : 'text-gray-600 hover:cursor-pointer' }`} >
                      Agent
                    </button>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="py-6 w-full md:max-w-[620px] lg:max-w-[420px] mx-auto" >
                  {/* Email */}
                  <div className="py-5">
                    <h1  style={{ fontFamily: 'PovetaracSansBlack' }} className="text-[16px] text-[#454545]" >
                      Email address
                    </h1>
                    <div className="relative">
                      <FiMail className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#00C2CC] ml-1" size={20} />
                      <input {...register('email')} style={{ fontFamily: 'PovetaracSansBold' }} type="text" className="w-full border-b border-b-[#00C2CC] pt-3 pb-2 pl-8 text-[14px] focus:outline-0" placeholder="you@example.com" />
                    </div>
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email?.message || ''}
                    </p>
                  </div>

                  {/* Password - only in login */}
                  {!isForgot && (
                    <div>
                      <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-[16px] text-[#454545]" >
                        Password
                      </h1>
                      <div className="relative">
                        <FiLock className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#00C2CC] ml-1" size={20}/>
                        <input {...register('password')} style={{ fontFamily: 'PovetaracSansBold' }} type="password" className="w-full border-b border-b-[#00C2CC] pt-3 pb-2 pl-8 text-[14px] focus:outline-0" placeholder="••••••••" />
                      </div>
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password?.message || ''}
                      </p>
                    </div>
                  )}

                  {/* Remember + Forgot - only in login */}
                  {!isForgot && (
                    <div  style={{ fontFamily: 'PovetaracSansBold' }}  className="flex items-center pt-3 justify-between select-none">
                      <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox"  className="h-4 w-4 text-blue-600 cursor-pointer focus:ring-blue-500 border-gray-300 rounded"/>
                        <label htmlFor="remember-me"  className="ml-2 mt-1 block text-[14px] text-gray-700 cursor-pointer" >
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <button type="button" onClick={() => {  setIsForgot(true); reset(); }} className="text-blue-600 cursor-pointer hover:text-blue-500 mt-1 text-[14px] transition-colors">
                          Forgot password?
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="pt-5">
                    <button style={{ fontFamily: 'PovetaracSansBlack' }} className="py-3.5 bg-[#0266FF] cursor-pointer hover:scale-101 text-white text-lg w-full rounded-2xl">
                      {isForgot ? 'Send OTP' : 'Submit'}
                    </button>
                  </div>

                  {/* Footer link */}
                  <div style={{ fontFamily: 'PovetaracSansBold' }}  className="py-5 text-center">
                    {isForgot ? (
                      <h1 className="text-[14px] md:text-[16px] cursor-pointer hover:scale-101"  onClick={() => {  setIsForgot(false); reset(); }} >
                        ← Back to Login
                      </h1>
                    ) : (
                      <h1 className="text-[14px] md:text-[16px]"> Don't have an account?{' '}
                        <strong onClick={()=>{navigate('/Registration')}} className="cursor-pointer text-blue-600 hover:scale-101">
                          Sign up
                        </strong>
                      </h1>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-5 md:pt-0 pb-5 px-2 md:px-5">
          <p className="text-[10px] md:text-[12px] text-center text-gray-600">
            Loan terms range from 3 to 36 months, with monthly interest rates
            ranging from 1.25% to 3%. The annual interest rate ranges from 15%
            to 36% *. The typical processing charge is between 2% and 3.5 % of
            the loan amount greater than or equal to Rs 25000. For example, a
            loan of Rs 100,000 at 15% APR for 12 months will cost Rs 8310 in
            total interest. *These figures are illustrative; the final interest
            rate or fee may differ from one user to the next, based on a credit
            evaluation.
          </p>
        </div>
      </div>

     {
       isOtpModalOpen && (
         <OtpModal
           onVerify={handleOtpVerify}
           onPasswordReset={handlePasswordReset}
           onClose={() => setIsOtpModalOpen(false)}
           onResend={() => console.log("Resend OTP triggered")}
         />
       )
     }
     
    </div>
  );
};

export default Login;
