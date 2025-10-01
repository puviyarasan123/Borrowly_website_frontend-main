import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { FiMail, FiLock, FiUser, FiCalendar, FiPhone } from "react-icons/fi";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useNavigate } from 'react-router-dom';

import { GetCountries, GetState, GetCity } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import ad_1 from '../assets/Images/Login_ads_1.jpeg';
import ad_2 from '../assets/Images/Login_ads_2.jpeg';
import ad_3 from '../assets/Images/Login_ads_3.jpeg';

const registrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dob: z.string()
    .min(1, 'Date of Birth is required')
    .refine((value) => {
      const dobDate = new Date(value);
      if (isNaN(dobDate.getTime())) return false; // invalid date
      const today = new Date();
      const minAgeDate = new Date(
        today.getFullYear() - 15,
        today.getMonth(),
        today.getDate()
      );
      return dobDate <= minAgeDate;
    }, { message: 'You must be at least 15 years old' }),
  gender: z.enum(['Male', 'Female', 'Other'], 'Select a valid gender'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  phone: z.string().min(10, 'Enter a valid phone number').max(15),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the Terms & Conditions and Privacy Policy" }),
  }),
});

const extendedSchema = registrationSchema.extend({
  guideCode: z.string().optional(),
  promoCode: z.string().optional(),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the Terms & Conditions and Privacy Policy" }),
  }),
  isWhatsapp: z.boolean().optional(),
});

const Registration = () => {
  const ads = [ad_1, ad_2, ad_3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [active, setActive] = useState(0);
  const highlightRef = useRef(null);
  const imageRef = useRef(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate()

  // Country, State, City data lists
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(extendedSchema),
  });

  // Watch country and state selection to fetch dependent dropdowns
  const selectedCountry = watch('country');
  const selectedState = watch('state');

  // Animate ad image fade in and slide from right on ad change
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentIndex]);

  // Auto-slide ads every 4 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [ads.length]);

  const onDotClick = (index) => {
    setCurrentIndex(index);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 4000);
  };

  // Animate the toggle highlight for Borrow / Agent
  useEffect(() => {
    if (highlightRef.current) {
      gsap.to(highlightRef.current, {
        x: active === 0 ? 0 : '100%',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [active]);

  // Load countries on mount, default country = India, load states for India
  useEffect(() => {
    GetCountries().then((countries) => {
      setCountryList(countries);
      const india = countries.find(c => c.name === 'India');
      if (india) {
        setValue('country', india.name);
        GetState(india.id).then(states => {
          setStateList(states);
        });
      }
    });
  }, [setValue]);

  // Load states when country changes
  useEffect(() => {
    if (!selectedCountry) {
      setStateList([]);
      setCityList([]);
      setValue('state', '');
      setValue('city', '');
      return;
    }
    const country = countryList.find(c => c.name === selectedCountry);
    if (country) {
      GetState(country.id).then(states => {
        setStateList(states);
        setCityList([]);
        setValue('state', '');
        setValue('city', '');
      });
    }
  }, [selectedCountry, countryList, setValue]);

  // Load cities when state changes
  useEffect(() => {
    if (!selectedState) {
      setCityList([]);
      setValue('city', '');
      return;
    }
    const country = countryList.find(c => c.name === selectedCountry);
    const state = stateList.find(s => s.name === selectedState);
    if (country && state) {
      GetCity(country.id, state.id).then(cities => {
        setCityList(cities);
        setValue('city', '');
      });
    }
  }, [selectedState, selectedCountry, stateList, countryList, setValue]);

  const onSubmit = (data) => {
    const submitData = { ...data, role: active === 0 ? 'Borrow' : 'Agent' };
    console.log('Registration form data:', submitData);
  };

  return (
    <div className="bg-white cursor-default ">
      <div className="flex flex-col h-full">
        <div className="flex flex-1 w-full py-10 flex-col-reverse gap-10 lg:gap-0 px-5  lg:flex-row h-full lg:container mx-auto">

          {/* Left - Ads */}
          <div className="flex-1 flex items-center justify-center pb-3">
            <div className="w-full max-w-[500px] mx-auto">
              <div className="flex-1 flex items-center justify-center">
                <img
                  key={currentIndex}
                  ref={imageRef}
                  src={ads[currentIndex]}
                  alt={`ad_${currentIndex + 1}`}
                  className="w-full"
                  style={{ opacity: 0 }}
                />
              </div>
              <div className="flex justify-center mt-3 space-x-3">
                {ads.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onDotClick(index)}
                    className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-[#00C2CC]' : 'bg-gray-400'}`}
                    aria-label={`Show ad ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Registration Form */}
          <div className="w-full lg:max-w-[625px] mx-auto flex items-center justify-center">
            <div className="rounded-2xl lg:rounded-3xl lg:border lg:border-[#e2e2e2] w-full md:p-5 bg-white">
              <img src="/Company_icon.svg" alt="Company Logo" className="w-[110px] h-[110px] mx-auto" />

              <div className="py-5  md:px-10">
                {/* Title */}
                <div className="pb-5">
                  <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-center text-3xl">
                    Create Account
                  </h1>
                </div>

                {/* Borrow / Agent toggle */}
                <div className="relative bg-[#F0EFF2] mx-auto h-[53px] w-full max-w-[375px] rounded-2xl flex p-1 select-none mb-4">
                  <div
                    ref={highlightRef}
                    className="absolute top-1 bottom-1 bg-white rounded-xl shadow-md"
                    style={{ left: '4px', width: 'calc(50% - 5px)', willChange: 'transform' }}
                  />
                  <button
                    style={{ fontFamily: 'PovetaracSansBlack' }}
                    onClick={() => {
                      setActive(0);
                    }}
                    className={`relative flex-1 rounded-xl text-center ${active === 0 ? 'text-black' : 'text-gray-600 hover:cursor-pointer'}`}
                    type="button"
                  >
                    Borrow
                  </button>
                  <button
                    style={{ fontFamily: 'PovetaracSansBlack' }}
                    onClick={() => {
                      setActive(1);
                      setValue('promoCode', ''); // Clear promo code on Agent select
                    }}
                    className={`relative flex-1 rounded-xl text-center ${active === 1 ? 'text-black' : 'text-gray-600 hover:cursor-pointer'}`}
                    type="button"
                  >
                    Agent
                  </button>
                </div>

                {/* Subtitle */}
                <p className="text-center text-sm text-gray-500 mb-6" style={{ fontFamily: 'PovetaracSansBold' }}>
                  Please select your role and fill the details below
                </p>

                {/* Registration Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="py-6 w-full md:max-w-[620px] lg:max-w-[520px] mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                    {/* First Name */}
                    <div>
                      <div className="relative">
                        <FiUser className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#00C2CC] ml-1" size={20} />
                        <input
                          {...register('firstName')}
                          id="firstName"
                          type="text"
                          className="w-full border-b border-b-[#00C2CC] pt-3 pb-2 pl-8 text-[14px] focus:outline-0"
                          placeholder="First Name"
                        />
                      </div>
                      <p className="text-red-500 text-sm mt-1">{errors.firstName?.message}</p>
                    </div>

                    {/* Last Name */}
                    <div>
                      <div className="relative">
                        <FiUser className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#00C2CC] ml-1" size={20} />
                        <input
                          {...register('lastName')}
                          id="lastName"
                          type="text"
                          className="w-full border-b border-b-[#00C2CC] pt-3 pb-2 pl-8 text-[14px] focus:outline-0"
                          placeholder="Last Name"
                        />
                      </div>
                      <p className="text-red-500 text-sm mt-1">{errors.lastName?.message}</p>
                    </div>

                    {/* Date of Birth */}
                   <div className="flex items-center border-b border-b-[#00C2CC] h-[40px] md:h-auto pt-3 pb-2 text-[14px]">
                     <FiCalendar className="text-[#00C2CC] ml-1 md:mr-2" size={20} />
                     <input
                       {...register('dob')}
                       id="dob"
                       type="date"
                       className="w-full focus:outline-0"
                     />
                   </div>
                   
                    

                    {/* Gender */}
                    <div>
                      <select
                        {...register('gender')}
                        id="gender"
                        className="w-full border-b border-b-[#00C2CC] h-[40px] md:h-auto pt-3 pb-2 text-[14px] focus:outline-0"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <p className="text-red-500 text-sm mt-1">{errors.gender?.message}</p>
                    </div>

                    {/* State */}
                    <div>
                      <select
                        {...register('state')}
                        id="state"
                        className="w-full border-b border-b-[#00C2CC] pt-3 h-[40px] md:h-auto pb-2 text-[14px] focus:outline-0"
                        disabled={stateList.length === 0}
                      >
                        <option value="">Select State</option>
                        {stateList.map((state) => (
                          <option key={state.id} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-red-500 text-sm mt-1">{errors.state?.message}</p>
                    </div>

                    {/* City */}
                    <div>
                      <select
                        {...register('city')}
                        id="city"
                        className="w-full border-b border-b-[#00C2CC] pt-3 h-[40px] md:h-auto pb-2 text-[14px] focus:outline-0"
                        disabled={cityList.length === 0}
                      >
                        <option value="">Select City</option>
                        {cityList.map((city) => (
                          <option key={city.id} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-red-500 text-sm mt-1">{errors.city?.message}</p>
                    </div>

                    {/* Phone Number */}
                    <div className='md:col-span-2'>
                      <div className="relative">
                        <FiPhone className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#00C2CC] ml-1" size={20} />
                        <input
                          {...register('phone')}
                          id="phone"
                          type="tel"
                          className="w-full border-b border-b-[#00C2CC] pt-3 pb-2 pl-8 text-[14px] focus:outline-0"
                          placeholder="Phone Number"
                        />
                      </div>
                      <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>

                      {/* WhatsApp checkbox */}
                      <div className="flex items-center mt-3">
                        <input
                          {...register('isWhatsapp')}
                          id="isWhatsapp"
                          type="checkbox"
                          className="mr-2 cursor-pointer"
                        />
                        <label htmlFor="isWhatsapp" className="text-sm cursor-pointer text-gray-700">
                          This is my WhatsApp number
                        </label>
                      </div>
                    </div>

                    {/* Email */}
                    <div className='md:col-span-2'>
                      <div className="relative">
                        <FiMail className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#00C2CC] ml-1" size={20} />
                        <input
                          {...register('email')}
                          id="email"
                          type="email"
                          className="w-full border-b border-b-[#00C2CC] pt-3 pb-2 pl-8 text-[14px] focus:outline-0"
                          placeholder="you@gmail.com"
                        />
                      </div>
                      <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                    </div>

                    {/* Password */}
                    <div className='md:col-span-2'>
                      <div className="relative">
                        <FiLock className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#00C2CC] ml-1" size={20} />
                        <input
                          {...register('password')}
                          id="password"
                          type="password"
                          className="w-full border-b border-b-[#00C2CC] pt-3 pb-2 pl-8 text-[14px] focus:outline-0"
                          placeholder="••••••••"
                        />
                      </div>
                      <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
                    </div>

                    {/* Guide Code */}
                    <div className={`${active==1&&'md:col-span-2'}`}>
                      <input
                        {...register('guideCode')}
                        id="guideCode"
                        type="text"
                        className="w-full border-b border-b-[#00C2CC] pt-3 pb-2 text-[14px] focus:outline-0"
                        placeholder="Guide Code (Optional)"
                      />
                      <p className="text-red-500 text-sm mt-1">{errors.guideCode?.message}</p>
                    </div>

                    {/* Promo Code - Show only if Borrow (active === 0) */}
                    {active === 0 && (
                      <div>
                        <input
                          {...register('promoCode')}
                          id="promoCode"
                          type="text"
                          className="w-full border-b border-b-[#00C2CC] pt-3 pb-2 text-[14px] focus:outline-0"
                          placeholder="Promo Code (Optional)"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.promoCode?.message}</p>
                      </div>
                    )}

                  </div>

                  <div className="flex items-center mt-6">
                    <input
                      {...register('agreeTerms')}
                      id="agreeTerms"
                      type="checkbox"
                      className="mr-2"
                    />
                    <label htmlFor="agreeTerms" className="text-xs text-gray-500 cursor-pointer">
                      I agree to the <a href="/terms" target="_blank" className="text-[#00C2CC] underline">Terms & Conditions</a> and <a href="/privacy" target="_blank" className="text-[#00C2CC] underline">Privacy Policy</a>
                    </label>
                  </div>
                  <p className="text-red-500 text-sm mt-1">{errors.agreeTerms?.message}</p>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#00C2CC] py-3 mt-6 text-white font-semibold text-lg hover:brightness-110 transition"
                  >
                    Register
                  </button>

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
    </div>
  );
};

export default Registration;
