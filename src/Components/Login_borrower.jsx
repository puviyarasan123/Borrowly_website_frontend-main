import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import BannerImage_1 from '../assets/Images/Signin_banner_1.avif';
import BannerImage_2 from '../assets/Images/Signin_banner_2.avif';
import BannerImage_3 from '../assets/Images/Signin_banner_3.avif';
import IndiaIcon from '../assets/Images/IndiaIcon.svg';
import Logo from '/Company_icon.svg';

const images = [BannerImage_1, BannerImage_2, BannerImage_3];

const schema = z.object({
  mobile: z
    .string()
    .min(10, 'Enter a 10 digit mobile number')
    .max(10, 'Enter a 10 digit mobile number')
    .regex(/^\d{10}$/, 'Mobile must contain only digits'),
});

const OTP_LENGTH = 6;
const RESEND_SECONDS = 28;

const Login = () => {
  const [current, setCurrent] = useState(0);
  const [stage, setStage] = useState(1); // 1 = phone input, 2 = otp input
  const [isSubmittingMobile, setIsSubmittingMobile] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(''));
  const otpRefs = useRef(Array.from({ length: OTP_LENGTH }, () => React.createRef()));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { mobile: '' },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Countdown for resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(id);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

  const sendOtpApi = async (mobile) => {
    return new Promise((resolve) => setTimeout(resolve, 700));
  };

  const verifyOtpApi = async (mobile, otp) => {
    return new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 700));
  };

  const onSubmitMobile = async (data) => {
    const mobile = data.mobile;
    setIsSubmittingMobile(true);
    try {
      await sendOtpApi(mobile);
      setStage(2);
      setResendTimer(RESEND_SECONDS);
      setTimeout(() => otpRefs.current[0]?.current?.focus?.(), 100);
    } catch (err) {
      console.error('send otp failed', err);
    } finally {
      setIsSubmittingMobile(false);
    }
  };

  const handleOtpChange = (e, idx) => {
    const val = (e.target.value || '').replace(/\D/g, '').slice(0, 1);
    setOtpValues((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });

    if (val && idx < OTP_LENGTH - 1) {
      otpRefs.current[idx + 1]?.current?.focus?.();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otpValues[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.current?.focus?.();
      setOtpValues((prev) => {
        const next = [...prev];
        next[idx - 1] = '';
        return next;
      });
    }
    if (e.key === 'ArrowLeft' && idx > 0) {
      otpRefs.current[idx - 1]?.current?.focus?.();
    }
    if (e.key === 'ArrowRight' && idx < OTP_LENGTH - 1) {
      otpRefs.current[idx + 1]?.current?.focus?.();
    }
  };

  const handlePasteOtp = (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text') || '';
    const digits = paste.replace(/\D/g, '').slice(0, OTP_LENGTH).split('');
    if (digits.length > 0) {
      const next = Array(OTP_LENGTH).fill('');
      for (let i = 0; i < digits.length; i++) next[i] = digits[i];
      setOtpValues(next);
      // focus next empty or last
      const focusIndex = Math.min(digits.length, OTP_LENGTH - 1);
      setTimeout(() => otpRefs.current[focusIndex]?.current?.focus?.(), 50);
    }
  };

  const onVerifyOtp = async () => {
    const mobile = getValues('mobile');
    const otp = otpValues.join('');
    if (otp.length !== OTP_LENGTH) {
      return;
    }
    setIsVerifyingOtp(true);
    try {
      const res = await verifyOtpApi(mobile, otp);
      if (res && res.ok) {
        console.log('OTP verified, continue login flow');
      } else {
        console.warn('OTP verification failed', res);
      }
    } catch (err) {
      console.error('verify otp error', err);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const onResend = async () => {
    const mobile = getValues('mobile');
    if (!mobile) return;
    try {
      await sendOtpApi(mobile);
      setResendTimer(RESEND_SECONDS);
      setOtpValues(Array(OTP_LENGTH).fill(''));
      setTimeout(() => otpRefs.current[0]?.current?.focus?.(), 100);
    } catch (err) {
      console.error('resend failed', err);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-screen-lg mx-auto bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row h-auto md:h-[550px]"
    >
      <div className="w-full md:w-[400px] hidden md:flex flex-shrink-0 md:items-center md:justify-center bg-[#F6F6F6] p-6 md:p-10">
        <div className="w-full h-[160px] md:h-[400px] flex items-center justify-center">
          <img
            src={images[current]}
            alt="Banner"
            className="max-w-[240px] md:max-w-[250px] w-full h-full object-contain transition-all duration-500"
          />
        </div>
        <div className="mt-4 flex md:flex-col gap-1.5 justify-center items-center md:items-start md:justify-center">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Show banner ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                current === index ? 'bg-[#01367D]' : 'bg-[#B7D1F5]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right / content area */}
      <div className="w-full flex-1 py-10 flex flex-col items-center justify-center p-6 md:p-12">
        <img src={Logo} className="w-[72px] md:w-[80px] mb-4" alt="Company logo" />
        <div className="text-center mb-6">
          <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-[#052F5F] text-lg md:text-2xl leading-tight">
            {stage === 1 ? 'Login to your account' : 'Verification'}
          </h1>
          <p style={{ fontFamily: 'PovetaracSansBold' }} className="text-[#7B7575] md:w-[80%] mx-auto text-[14px] mt-1">
            {stage === 1
              ? 'Simple, fast, and secure access to your account'
              : `We’ve sent a 6-digit verification code to your phone number +91 ${getValues('mobile')} Please enter it below to verify your account`}
          </p>
        </div>

        {/* Stage 1: Mobile form */}
        {stage === 1 && (
          <>
            <form onSubmit={handleSubmit(onSubmitMobile)} className="w-full flex items-center justify-center">
              <div className="flex items-center w-full max-w-[450px] bg-[#F1F7FC] border border-[#D5ECFF] rounded-xl px-3 py-3 md:py-5 gap-3">
                <img src={IndiaIcon} alt="India" className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-gray-700 font-medium text-sm">+91</span>
                <div className="w-px h-6 bg-[#D5ECFF]" />

                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter mobile number"
                  className="flex-1 bg-transparent outline-none text-gray-800 text-sm"
                  aria-label="Mobile number"
                  aria-invalid={errors.mobile ? 'true' : 'false'}
                  maxLength={10}
                  {...register('mobile')}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    const val = el.value.replace(/[^0-9]/g, '');
                    el.value = val;
                    setValue('mobile', val, { shouldValidate: true, shouldDirty: true });
                  }}
                />
              </div>
            </form>

            <div className="w-full flex items-center justify-center mb-3">
              <div className="w-full max-w-[450px]">
                {errors.mobile ? <p className="text-red-500 text-xs mt-2">{errors.mobile.message}</p> : null}
              </div>
            </div>

            <div className="w-full flex items-center mt-3 justify-center mb-3">
              <button
                type="button"
                onClick={handleSubmit(onSubmitMobile)}
                disabled={isSubmittingMobile}
                className="w-full max-w-[450px] py-3 md:py-4 rounded-xl mx-auto text-white bg-[#003880] font-medium text-sm md:text-base disabled:opacity-60"
              >
                {isSubmittingMobile ? 'Sending...' : 'Get OTP'}
              </button>
            </div>
          </>
        )}

        {/* Stage 2: OTP input */}
        {stage === 2 && (
          <>
            <div className="w-full max-w-[450px] bg-transparent">
              <div
                className="flex gap-1.5 justify-center"
                onPaste={handlePasteOtp}
                aria-label="OTP input"
              >
                {otpValues.map((v, i) => (
                  <input
                    key={i}
                    ref={otpRefs.current[i]}
                    value={v}
                    onChange={(e) => handleOtpChange(e, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-lg bg-[#EFEFEF] text-center text-lg outline-none"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={1}
                    aria-label={`OTP digit ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center text-center ga-2 mt-4">
                <div className="text-sm text-[#6E6D6D]">
                  Didn't get the code?
                </div>
                <div className='px-2'>
                  <button
                    onClick={onResend}
                    disabled={resendTimer > 0}
                    className={`text-sm font-medium ${
                      resendTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#015EDA]'
                    }`}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend'}
                  </button>
                </div>
              </div>

              <div className="w-full flex items-center mt-6 justify-center">
                <button
                  type="button"
                  onClick={onVerifyOtp}
                  disabled={isVerifyingOtp || otpValues.join('').length !== OTP_LENGTH}
                  className="w-full py-3 md:py-4 rounded-xl mx-auto text-white bg-[#003880] font-medium text-sm md:text-base disabled:opacity-60"
                >
                  {isVerifyingOtp ? 'Verifying...' : 'Verify and Login'}
                </button>
              </div>
            </div>
          </>
        )}

        <div className="w-full mt-5 flex items-center justify-center">
          <p className="w-full max-w-[450px] text-xs text-center text-[#6E6D6D] leading-snug">
            By logging in, you agree to the following
            <br />
            <span className="text-[#015EDA] cursor-pointer">Credit Report Terms of Use, Terms of Use</span> and{' '}
            <span className="text-[#015EDA] cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
