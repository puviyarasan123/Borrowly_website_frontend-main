import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { IoIosArrowBack } from 'react-icons/io';

import LoanSidebar from '../../Components/LoanPage/LoanSidebar';
import leftbannerimage from '/PeronalLoan_image.avif';

import famicons_call from '../../assets/Icons/famicons_call.svg';
import iconoir_mail_solid from '../../assets/Icons/iconoir_mail-solid.svg';

import tickdone from '../../assets/Icons/tickdone.svg';
import IndiaIcon from '../../assets/Images/IndiaIcon.svg';

const allowedBusinessVintage = [
  '0-1 Year',
  '1-3 Years',
  '3-5 Years',
  '5-10 Years',
  '10+ Years',
];

const schema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Enter your full name')
      .max(80, 'Full name is too long')
      .regex(/^[A-Za-z\s'.-]+$/, 'Name can only contain letters, spaces, apostrophes, dots or hyphens'),
    mobile: z
      .string()
      .min(10, 'Enter a 10 digit mobile number')
      .max(10, 'Enter a 10 digit mobile number')
      .regex(/^\d{10}$/, 'Mobile must contain only digits'),
    currentCompany: z.string().min(1,'Company name required').max(80, 'Company name is too long'),
    residenceCity: z.string().min(1,'City required').max(60, 'City name is too long'),
    grossAnnualIncome: z.string().min(1, 'Income required'),

    employmentType: z.string().nonempty('Please select an employment type'),

    // pledgeAssets is optional by default; we enforce it conditionally below
    pledgeAssets: z.string().optional(),

    // Business / professional fields: keep optional by default
    CurrentBusinessVintage: z.string().optional(),

    ProfessionalType: z.string().max(80, 'Professional Type is too long').optional(),
    BusinessresidenceCity: z.string().max(60, 'City name is too long').optional(),
    BusinessgrossAnnualIncome: z.string().optional(),
    BusinessDesiredLoanAmount: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // If user is self_employed_business, require business fields
    if (data.employmentType === 'self_employed_business') {
      // CurrentBusinessVintage: required + must be one of allowed values
      if (!data.CurrentBusinessVintage || data.CurrentBusinessVintage.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['CurrentBusinessVintage'],
          message: 'Business vintage required',
        });
      } else if (!allowedBusinessVintage.includes(data.CurrentBusinessVintage)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['CurrentBusinessVintage'],
          message: 'Invalid business vintage',
        });
      }

      if (!data.BusinessresidenceCity || data.BusinessresidenceCity.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['BusinessresidenceCity'],
          message: 'City required',
        });
      }
      if (!data.BusinessgrossAnnualIncome || data.BusinessgrossAnnualIncome.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['BusinessgrossAnnualIncome'],
          message: 'Income required',
        });
      }
      if (!data.BusinessDesiredLoanAmount || data.BusinessDesiredLoanAmount.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['BusinessDesiredLoanAmount'],
          message: 'Desired Loan Amount required',
        });
      }

      // require pledgeAssets for self_employed_business
      if (!data.pledgeAssets || !['yes', 'no'].includes(data.pledgeAssets)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['pledgeAssets'],
          message: 'Please choose whether you wish to proceed',
        });
      }
    }

    // If user is self_employed_professional, require ProfessionalType plus business contact fields
    if (data.employmentType === 'self_employed_professional') {
      if (!data.ProfessionalType || data.ProfessionalType.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['ProfessionalType'],
          message: 'Professional Type required',
        });
      }
      if (!data.BusinessresidenceCity || data.BusinessresidenceCity.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['BusinessresidenceCity'],
          message: 'City required',
        });
      }
      if (!data.BusinessgrossAnnualIncome || data.BusinessgrossAnnualIncome.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['BusinessgrossAnnualIncome'],
          message: 'Income required',
        });
      }

      // require pledgeAssets for self_employed_professional
      if (!data.pledgeAssets || !['yes', 'no'].includes(data.pledgeAssets)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['pledgeAssets'],
          message: 'Please choose whether you wish to proceed',
        });
      }
    }
  });

const PersonalLoan_Index = () => {
const {register,handleSubmit,setValue,watch,getValues,trigger,formState: { errors, isValid, isDirty }} = useForm({
    resolver: zodResolver(schema),
      defaultValues: {
      mobile: '',
      fullName: '',
      currentCompany: '',
      residenceCity: '',
      grossAnnualIncome: '',
      employmentType: '',
      CurrentBusinessVintage: '',
      ProfessionalType: '',
      BusinessresidenceCity: '',
      BusinessgrossAnnualIncome: '',
      BusinessDesiredLoanAmount: '',
      pledgeAssets: 'no',
    },
    mode: 'onChange',
  });

  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(1); 
  const mobileRef = useRef(null);
  const fullNameRef = useRef(null);
  const companyRef = useRef(null);
  const cityRef = useRef(null);
  const incomeRef = useRef(null);
  const CurrentBusinessVintageRef = useRef(null);
  const BusinessresidenceCityRef = useRef(null);
  const BusinessgrossAnnualIncomeRef = useRef(null);
  const BusinessDesiredLoanAmountRef = useRef(null);
  const ProfessionalTypeRef = useRef(null);
  const [focusedField, setFocusedField] = useState('');
  const watchMobile = watch('mobile');
  const watchFullName = watch('fullName');
  const watchCurrentCompany = watch('currentCompany');
  const watchResidenceCity = watch('residenceCity');
  const watchGrossAnnualIncome = watch('grossAnnualIncome');
  const watchEmploymentType = watch('employmentType');
  const watchCurrentBusinessVintage = watch('CurrentBusinessVintage');
  const watchBusinessresidenceCity = watch('BusinessresidenceCity');
  const watchBusinessgrossAnnualIncome = watch('BusinessgrossAnnualIncome');
  const watchBusinessDesiredLoanAmount = watch('BusinessDesiredLoanAmount');
  const watchProfessionalType = watch('ProfessionalType');
  const watchpledgeAssets = watch('pledgeAssets');
  const mobileIsValid = /^\d{10}$/.test(watchMobile || '');

  const benefits = [
    'Curated loan options tailored to your profile',
    'Quick approval with pre-approved offers',
    'Instant sanction & seamless disbursal',
    '100% digital, hassle-free process',
  ];

  const stepFields = {
     1: ['mobile'],
     2: ['fullName', 'currentCompany', 'residenceCity', 'grossAnnualIncome'],
     3: ['employmentType'], 
   };
   

  

   useEffect(() => {
     if (mobileRef.current) mobileRef.current.focus();
   }, []);
  
   const onNext = async () => {
       console.log("hi")
     const ok = await trigger(stepFields[stage]);
     if (!ok) {
       console.log(ok)
       return;
     }
     setStage((s) => s + 1);
   };
   
   const onFinalSubmit = (data) => {
     console.log('Form Data:', data);
   };
   
       
   const selectEmployment = (value) => {
     setValue('employmentType', value, { shouldValidate: true, shouldDirty: true });
   
     if (value === 'salaried') {
       setValue('CurrentBusinessVintage', '');
       setValue('ProfessionalType', '');
       setValue('BusinessresidenceCity', '');
       setValue('BusinessgrossAnnualIncome', '');
       setValue('BusinessDesiredLoanAmount', '');
       setValue('pledgeAssets', 'no');
     }
     if (value === 'self_employed_business') {
       setValue('ProfessionalType', '');
       setValue('BusinessresidenceCity', '');
       setValue('BusinessgrossAnnualIncome', '');
       setValue('BusinessDesiredLoanAmount', '');
     }
     if (value === 'self_employed_professional') {
       setValue('CurrentBusinessVintage', '');
       setValue('BusinessresidenceCity', '');
       setValue('BusinessgrossAnnualIncome', '');
       setValue('BusinessDesiredLoanAmount', '');
     }
   };
   
   const selectpledgeAssets = (value) => {
    setValue('pledgeAssets', value, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="h-[100dvh] flex flex-col md:flex-row">
      <LoanSidebar
        mainTitle="Borrowly"
        subTitle="Personal Loan"
        img={leftbannerimage}
        features={[
          { title: 'Get Tailored Loan Options', description: 'Offers matched to your profile' },
          { title: 'Instant Eligibility Check', description: 'Know how much you can borrow in seconds' },
          { title: 'Smart Approval Insights', description: "Improve your chances with Borrowly’s guidance" },
        ]}
      />

      <div className="p-5 md:p-10 h-full flex-1">
        {/* Header */}
        <div className="w-full items-center justify-end hidden md:flex">
          <div className="flex flex-col lg:flex-row items-end gap-4 text-sm">
            <div className="flex items-center space-x-1">
              <img src={famicons_call} alt="call icon" className="w-4 h-4" />
              <div className="flex gap-3">
                <a href="tel:18003134151">+91-9494545792</a>/<a href="tel:8980685509">+91-9494545137</a>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <img src={iconoir_mail_solid} alt="mail icon" className="w-4 h-4" />
              <a href="mailto:Support@Borrowly.in">Support@Borrowly.in</a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 h-full flex items-center justify-center">
          {/* Stage-1 */}
          {stage === 1 && (
            <div className="w-full max-w-[500px]">
              <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">
                Unlock Exclusive Borrowly
              </h1>
              <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-3xl md:text-4xl">
                Personal Loan Offers
              </h1>
              <hr className="py-0.5 bg-[#025FDA] w-full max-w-[120px] rounded-full border-[#025FDA] mt-2" />

              <div className="mt-4 flex flex-col gap-3">
                {benefits.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <div>
                      <img src={tickdone} alt="tick" className="w-5" />
                    </div>
                    <div className="flex-1 text-black">
                      <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm">
                        {item}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>

              <div className="py-5">
                  <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px] mb-2">
                    Phone Number
                  </h1>
                  <div className="flex items-center w-full max-w-[500px] bg-[#F1F7FC] border border-[#D5ECFF] rounded-xl px-3 py-3 md:py-4 gap-3">
                    <img src={IndiaIcon} alt="India" className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-gray-700 font-medium text-sm">+91</span>
                    <div className="w-px h-6 bg-[#394249]" />
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="Enter mobile number"
                      className="flex-1 bg-transparent outline-none text-gray-800 text-sm"
                      aria-label="Mobile number"
                      aria-invalid={errors.mobile ? 'true' : 'false'}
                      maxLength={10}
                      value={watchMobile}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setValue('mobile', raw, { shouldValidate: true, shouldDirty: true });
                      }}
                      ref={mobileRef}
                    />
                  </div>

                  <div className="w-full flex mb-3">
                    <div className="w-full max-w-[500px]">
                      {errors.mobile ? <p className="text-red-500 text-xs mt-2">{errors.mobile.message}</p> : null}
                    </div>
                  </div>

                  <div className="w-full flex mt-5 mb-3">
                    <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 md:py-4 rounded-xl text-white bg-[#003880] font-medium text-sm md:text-base disabled:opacity-60" disabled={!mobileIsValid || loading}>
                      {loading ? 'Sending OTP...' : 'Next'}
                    </button>
                  </div>
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
          )}

          {/* Stage-2 */}
          {stage === 2 && (
            <div className="w-full max-w-[500px] cursor-default">
              <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={() => setStage(1)}>
                <IoIosArrowBack size={20} />
                <p>Back</p>
              </div>

              <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">
                Please verify your details!
              </h1>
              <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                This information is critical to get accurate offers from lenders
              </h1>

              <div className="flex flex-col gap-3 w-full">
                {/* Full name */}
                <div className="w-full">
                  <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                    onClick={() => {
                      setFocusedField('fullName');
                      fullNameRef.current?.focus();
                    }}
                  >
                    <p className={`absolute left-5 transition-all duration-200 ${
                        focusedField === 'fullName' || watchFullName ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                      }`} style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}>
                      Full name
                    </p>
                    <input
                      {...register('fullName')}
                      type="text"
                      ref={(e) => {
                        register('fullName').ref(e);
                        fullNameRef.current = e;
                      }}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => !getValues('fullName') && setFocusedField('')}
                      className="w-full bg-transparent outline-none text-[18px]"
                      style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                      aria-invalid={errors.fullName ? 'true' : 'false'}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs mt-1 text-red-600">{errors.fullName.message}</p>}
                </div>

                {/* Current Company */}
                <div className="w-full">
                  <div
                    className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                    onClick={() => {
                      setFocusedField('currentCompany');
                      companyRef.current?.focus();
                    }}
                  >
                    <p
                      className={`absolute left-5 transition-all duration-200 ${
                        focusedField === 'currentCompany' || watchCurrentCompany ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                      }`}
                      style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                    >
                      Current Company
                    </p>
                    <input
                      {...register('currentCompany')}
                      type="text"
                      ref={(e) => {
                        register('currentCompany').ref(e);
                        companyRef.current = e;
                      }}
                      onFocus={() => setFocusedField('currentCompany')}
                      onBlur={() => !getValues('currentCompany') && setFocusedField('')}
                      className="w-full bg-transparent outline-none text-[18px]"
                      style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                      aria-invalid={errors.currentCompany ? 'true' : 'false'}
                    />
                  </div>
                  {errors.currentCompany && <p className="text-xs mt-1 text-red-600">{errors.currentCompany.message}</p>}
                </div>

                {/* Residence City */}
                <div className="w-full">
                  <div
                    className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                    onClick={() => {
                      setFocusedField('residenceCity');
                      cityRef.current?.focus();
                    }}
                  >
                    <p
                      className={`absolute left-5 transition-all duration-200 ${
                        focusedField === 'residenceCity' || watchResidenceCity ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                      }`}
                      style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                    >
                      Residence City
                    </p>
                    <input
                      {...register('residenceCity')}
                      type="text"
                      ref={(e) => {
                        register('residenceCity').ref(e);
                        cityRef.current = e;
                      }}
                      onFocus={() => setFocusedField('residenceCity')}
                      onBlur={() => !getValues('residenceCity') && setFocusedField('')}
                      className="w-full bg-transparent outline-none text-[18px]"
                      style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                      aria-invalid={errors.residenceCity ? 'true' : 'false'}
                    />
                  </div>
                  {errors.residenceCity && <p className="text-xs mt-1 text-red-600">{errors.residenceCity.message}</p>}
                </div>

                {/* Gross Annual Income */}
                <div className="w-full">
                   <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text" onClick={() => {
                       setFocusedField('grossAnnualIncome');
                       incomeRef.current?.focus();
                     }}
                   >
                     <p className={`absolute left-5 transition-all duration-200 ${ focusedField === 'grossAnnualIncome' || watchGrossAnnualIncome
                           ? 'top-2 text-xs text-[#797979]'
                           : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                       }`}
                       style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                     >
                       Gross Annual Income
                     </p>
                 
                     <select
                       {...register('grossAnnualIncome')}
                       ref={(e) => {
                         register('grossAnnualIncome').ref(e);
                         incomeRef.current = e;
                       }}
                       onFocus={() => setFocusedField('grossAnnualIncome')}
                       onBlur={() => !getValues('grossAnnualIncome') && setFocusedField('')}
                       className="w-full bg-transparent outline-none text-[18px]"
                       style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                       aria-invalid={errors.grossAnnualIncome ? 'true' : 'false'}
                     >
                       <option value="" hidden></option>
                       <option value="1-2 Lakh">1 – 2 Lakh</option>
                       <option value="2-3 Lakh">2 – 3 Lakh</option>
                       <option value="3-5 Lakh">3 – 5 Lakh</option>
                       <option value="5-10 Lakh">5 – 10 Lakh</option>
                       <option value="10+ Lakh">10+ Lakh</option>
                     </select>
                   </div>
                 
                   {errors.grossAnnualIncome && (
                     <p className="text-xs text-red-600">{errors.grossAnnualIncome.message}</p>
                   )}
                 </div>
              </div>
              <div className="w-full flex mt-5 mb-3">
                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 md:py-4 rounded-xl text-white bg-[#003880] font-medium text-sm md:text-base disabled:opacity-60">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Stage-3 */}
          {stage === 3 && (
            <>
              <div className="w-full max-w-[500px] cursor-default">
                <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={() => setStage(2)}>
                  <IoIosArrowBack size={20} />
                  <p>Back</p>
                </div>
                <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">
                  Employment Type
                </h1>
                <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                  Pick your job type to move ahead
                </h1>

                <div className="flex flex-col gap-2">
                  {/* Option: Salaried */}
                  <div
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl border ${
                      watchEmploymentType === 'salaried' ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
                    } cursor-pointer`}
                    onClick={() => selectEmployment('salaried')}
                  >
                    <input
                      {...register('employmentType')}
                      type="radio"
                      name="employmentType"
                      value="salaried"
                      checked={watchEmploymentType === 'salaried'}
                      onChange={() => selectEmployment('salaried')}
                      className="w-5 h-5 accent-[#025FDA] cursor-pointer"
                    />
                    <div>
                      <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">
                        Salaried
                      </h1>
                      <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm text-[#6E6D6D]">
                        Received fixed amount of income every month
                      </h1>
                    </div>
                  </div>

                  {/* Option: Self-Employed Business */}
                  <div
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl border ${
                      watchEmploymentType === 'self_employed_business' ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
                    } cursor-pointer`}
                    onClick={() => selectEmployment('self_employed_business')}
                  >
                    <input
                      {...register('employmentType')}
                      type="radio"
                      name="employmentType"
                      value="self_employed_business"
                      checked={watchEmploymentType === 'self_employed_business'}
                      onChange={() => selectEmployment('self_employed_business')}
                      className="w-5 h-5 accent-[#025FDA] cursor-pointer"
                    />
                    <div>
                      <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">
                        Self-Employed Business
                      </h1>
                      <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm text-[#6E6D6D]">
                        Run a business
                      </h1>
                    </div>
                  </div>

                  {/* Option: Self-Employed Professional */}
                  <div
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl border ${
                      watchEmploymentType === 'self_employed_professional' ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
                    } cursor-pointer`}
                    onClick={() => selectEmployment('self_employed_professional')}
                  >
                    <input
                      {...register('employmentType')}
                      type="radio"
                      name="employmentType"
                      value="self_employed_professional"
                      checked={watchEmploymentType === 'self_employed_professional'}
                      onChange={() => selectEmployment('self_employed_professional')}
                      className="w-5 h-5 accent-[#025FDA] cursor-pointer"
                    />
                    <div>
                      <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">
                        Self-Employed Professional
                      </h1>
                      <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm text-[#6E6D6D]">
                        Engage in a profession
                      </h1>
                    </div>
                  </div>
                </div>

                {/* validation error for employmentType */}
                {errors.employmentType && <p className="text-xs text-red-600 mt-2">{errors.employmentType.message}</p>}

               <div className="w-full flex mt-5 mb-3">
                <button
                  type="button"
                  onClick={onNext}
                  className="w-full max-w-[500px] cursor-pointer py-4 md:py-4 rounded-xl text-white bg-[#003880] font-medium text-sm md:text-base disabled:opacity-60"
                >
                  Next
                </button>
              </div>
              </div>
            </>
          )}

          {/* Stage-4 (placeholder) */}
          {stage === 4 && (
             <form
                 onSubmit={handleSubmit(
                   (data) => {
                     console.log('onFinalSubmit called — data:', data);
                     onFinalSubmit(data); // your existing submit handler
                   },
                   (errors) => {
                     console.log('Validation failed — errors:', errors);
                   }
                 )}
                 className="w-full max-w-[500px]"
               >
               
              <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={() => setStage(3)}>
                <IoIosArrowBack size={20} />
                <p>Back</p>
              </div>

              {
                watchEmploymentType =='salaried' && <>
                  <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">
                    Please verify your details!
                  </h1>
                  <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                    This information is critical to get accurate offers from lenders
                  </h1>

                  <div className="flex flex-col gap-3 w-full">
                      {/* Full name */}
                      <div className="w-full">
                        <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                          onClick={() => {setFocusedField('fullName');fullNameRef.current?.focus();}}>
                          <p
                            className={`absolute left-5 transition-all duration-200 ${
                              focusedField === 'fullName' || watchFullName ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                            }`}
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                          >
                            Full name
                          </p>
                          <input
                            {...register('fullName')}
                            type="text"
                            ref={(e) => {
                              register('fullName').ref(e);
                              fullNameRef.current = e;
                            }}
                            onFocus={() => setFocusedField('fullName')}
                            onBlur={() => !getValues('fullName') && setFocusedField('')}
                            className="w-full bg-transparent outline-none text-[18px]"
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                            aria-invalid={errors.fullName ? 'true' : 'false'}
                          />
                        </div>
                        {errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}
                      </div>
                      {/* Current Company */}
                      <div className="w-full">
                        <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                          onClick={() => {setFocusedField('currentCompany');companyRef.current?.focus();}}>
                          <p
                            className={`absolute left-5 transition-all duration-200 ${
                              focusedField === 'currentCompany' || watchCurrentCompany ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                            }`}
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                          >
                            Current Company
                          </p>
                          <input
                            {...register('currentCompany')}
                            type="text"
                            ref={(e) => {
                              register('currentCompany').ref(e);
                              companyRef.current = e;
                            }}
                            onFocus={() => setFocusedField('currentCompany')}
                            onBlur={() => !getValues('currentCompany') && setFocusedField('')}
                            className="w-full bg-transparent outline-none text-[18px]"
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                            aria-invalid={errors.fullName ? 'true' : 'false'}
                          />
                        </div>
                        {errors.currentCompany && <p className="text-xs text-red-600">{errors.currentCompany.message}</p>}
                      </div>
                      {/* Residence City */}
                      <div className="w-full">
                        <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                          onClick={() => {setFocusedField('residenceCity');cityRef.current?.focus();}}>
                          <p
                            className={`absolute left-5 transition-all duration-200 ${
                              focusedField === 'residenceCity' || watchResidenceCity ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                            }`}
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                          >
                            Residence City
                          </p>
                          <input
                            {...register('residenceCity')}
                            type="text"
                            ref={(e) => {
                              register('residenceCity').ref(e);
                              cityRef.current = e;
                            }}
                            onFocus={() => setFocusedField('residenceCity')}
                            onBlur={() => !getValues('residenceCity') && setFocusedField('')}
                            className="w-full bg-transparent outline-none text-[18px]"
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                            aria-invalid={errors.residenceCity ? 'true' : 'false'}
                          />
                        </div>
                        {errors.residenceCity && <p className="text-xs text-red-600">{errors.residenceCity.message}</p>}
                      </div>
                      {/* Gross Annual Income */}
                      <div className="w-full">
                         <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                           onClick={() => {
                             setFocusedField('grossAnnualIncome');
                             incomeRef.current?.focus();
                           }}
                         >
                           <p className={`absolute left-5 transition-all duration-200 ${
                               focusedField === 'grossAnnualIncome' || watchGrossAnnualIncome
                                 ? 'top-2 text-xs text-[#797979]'
                                 : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                             }`} style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}>
                             Gross Annual Income
                           </p>
                       
                           <select
                             {...register('grossAnnualIncome')}
                             ref={(e) => {
                               register('grossAnnualIncome').ref(e);
                               incomeRef.current = e;
                             }}
                             onFocus={() => setFocusedField('grossAnnualIncome')}
                             onBlur={() => !getValues('grossAnnualIncome') && setFocusedField('')}
                             className="w-full bg-transparent outline-none text-[18px]"
                             style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                             aria-invalid={errors.grossAnnualIncome ? 'true' : 'false'}
                           >
                             <option value="" hidden></option>
                             <option value="1-2 Lakh">1 – 2 Lakh</option>
                             <option value="2-3 Lakh">2 – 3 Lakh</option>
                             <option value="3-5 Lakh">3 – 5 Lakh</option>
                             <option value="5-10 Lakh">5 – 10 Lakh</option>
                             <option value="10+ Lakh">10+ Lakh</option>
                           </select>
                         </div>
                       
                         {errors.grossAnnualIncome && (
                           <p className="text-xs text-red-600">{errors.grossAnnualIncome.message}</p>
                         )}
                       </div>
                       
                  </div>
                </>
              }


              {
                watchEmploymentType =='self_employed_business' && <>
                  <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">
                    Please verify your details!
                  </h1>
                  <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                    This information is critical to get accurate offers from lenders
                  </h1>

                    <div className="flex flex-col gap-3 w-full">
                      {/* Full name */}
                      <div className="w-full">
                        <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                          onClick={() => {setFocusedField('fullName');fullNameRef.current?.focus();}}>
                          <p
                            className={`absolute left-5 transition-all duration-200 ${
                              focusedField === 'fullName' || watchFullName ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                            }`}
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                          >
                            Full name
                          </p>
                          <input
                            {...register('fullName')}
                            type="text"
                            ref={(e) => {
                              register('fullName').ref(e);
                              fullNameRef.current = e;
                            }}
                            onFocus={() => setFocusedField('fullName')}
                            onBlur={() => !getValues('fullName') && setFocusedField('')}
                            className="w-full bg-transparent outline-none text-[18px]"
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                            aria-invalid={errors.fullName ? 'true' : 'false'}
                          />
                        </div>
                        {errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}
                      </div>
                      {/* Full name */}
                     <div className="w-full">
                         <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                           onClick={() => {
                             setFocusedField('CurrentBusinessVintage');
                             CurrentBusinessVintageRef.current?.focus();
                           }}>
                           <p className={`absolute left-5 transition-all duration-200 ${
                               focusedField === 'CurrentBusinessVintage' || watchCurrentBusinessVintage
                                 ? 'top-2 text-xs text-[#797979]'
                                 : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                             }`}
                             style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                           >
                             Current Business Vintage
                           </p>
                       
                           <select
                             {...register('CurrentBusinessVintage')}
                             ref={(e) => {
                               register('CurrentBusinessVintage').ref(e);
                               CurrentBusinessVintageRef.current = e;
                             }}
                             onFocus={() => setFocusedField('CurrentBusinessVintage')}
                             onBlur={() =>
                               !getValues('CurrentBusinessVintage') && setFocusedField('')
                             }
                             className="w-full bg-transparent outline-none text-[18px]"
                             style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                             aria-invalid={errors.CurrentBusinessVintage ? 'true' : 'false'}
                           >
                             <option value="" hidden></option>
                             <option value="0-1 Year">0 – 1 Year</option>
                             <option value="1-3 Years">1 – 3 Years</option>
                             <option value="3-5 Years">3 – 5 Years</option>
                             <option value="5-10 Years">5 – 10 Years</option>
                             <option value="10+ Years">10+ Years</option>
                           </select>
                         </div>
                       
                         {errors.CurrentBusinessVintage && (
                           <p className="text-xs mt-1 text-red-600">
                             {errors.CurrentBusinessVintage.message}
                           </p>
                         )}
                       </div>
                       
                      {/* Full name */}
                      <div className="w-full">
                        <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                          onClick={() => {setFocusedField('BusinessresidenceCity');BusinessresidenceCityRef.current?.focus();}}>
                          <p
                            className={`absolute left-5 transition-all duration-200 ${
                              focusedField === 'BusinessresidenceCity' || watchBusinessresidenceCity ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                            }`}
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                          >
                            Residence City
                          </p>
                          <input
                            {...register('BusinessresidenceCity')}
                            type="text"
                            ref={(e) => {
                              register('BusinessresidenceCity').ref(e);
                              BusinessresidenceCityRef.current = e;
                            }}
                            onFocus={() => setFocusedField('BusinessresidenceCity')}
                            onBlur={() => !getValues('BusinessresidenceCity') && setFocusedField('')}
                            className="w-full bg-transparent outline-none text-[18px]"
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                            aria-invalid={errors.BusinessresidenceCity ? 'true' : 'false'}
                          />
                        </div>
                        {errors.BusinessresidenceCity && <p className="text-xs text-red-600">{errors.BusinessresidenceCity.message}</p>}
                      </div>
                      {/* Full name */}
                      <div className="w-full">
                          <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                            onClick={() => {
                              setFocusedField('BusinessgrossAnnualIncome');
                              BusinessgrossAnnualIncomeRef.current?.focus();
                            }}>
                            <p className={`absolute left-5 transition-all duration-200 ${
                                focusedField === 'BusinessgrossAnnualIncome' || watchBusinessgrossAnnualIncome
                                  ? 'top-2 text-xs text-[#797979]'
                                  : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                              }`}
                              style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                            >
                              Gross Annual Turnover
                            </p>
                        
                            <select
                              {...register('BusinessgrossAnnualIncome')}
                              ref={(e) => {
                                register('BusinessgrossAnnualIncome').ref(e);
                                BusinessgrossAnnualIncomeRef.current = e;
                              }}
                              onFocus={() => setFocusedField('BusinessgrossAnnualIncome')}
                              onBlur={() =>
                                !getValues('BusinessgrossAnnualIncome') && setFocusedField('')
                              }
                              className="w-full bg-transparent outline-none text-[18px]"
                              style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                              aria-invalid={errors.BusinessgrossAnnualIncome ? 'true' : 'false'}
                            >
                              <option value="" hidden></option>
                              <option value="0-5 Lakh">0 – 5 Lakh</option>
                              <option value="5-10 Lakh">5 – 10 Lakh</option>
                              <option value="10-25 Lakh">10 – 25 Lakh</option>
                              <option value="25-50 Lakh">25 – 50 Lakh</option>
                              <option value="50 Lakh - 1 Crore">50 Lakh – 1 Crore</option>
                              <option value="1-5 Crore">1 – 5 Crore</option>
                              <option value="5+ Crore">5+ Crore</option>
                            </select>
                          </div>
                        
                          {errors.BusinessgrossAnnualIncome && (
                            <p className="text-xs text-red-600">
                              {errors.BusinessgrossAnnualIncome.message}
                            </p>
                          )}
                        </div>
                        

                      {/* Full name */}
                      <div className="w-full">
                          <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                            onClick={() => {
                              setFocusedField('BusinessDesiredLoanAmount');
                              BusinessDesiredLoanAmountRef.current?.focus();
                            }}
                          >
                            <p className={`absolute left-5 transition-all duration-200 ${
                                focusedField === 'BusinessDesiredLoanAmount' || watchBusinessDesiredLoanAmount
                                  ? 'top-2 text-xs text-[#797979]'
                                  : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                              }`}
                              style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                            >
                              Desired Loan Amount
                            </p>
                        
                            <select
                              {...register('BusinessDesiredLoanAmount')}
                              ref={(e) => {
                                register('BusinessDesiredLoanAmount').ref(e);
                                BusinessDesiredLoanAmountRef.current = e;
                              }}
                              onFocus={() => setFocusedField('BusinessDesiredLoanAmount')}
                              onBlur={() =>
                                !getValues('BusinessDesiredLoanAmount') && setFocusedField('')
                              }
                              className="w-full bg-transparent outline-none text-[18px]"
                              style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                              aria-invalid={errors.BusinessDesiredLoanAmount ? 'true' : 'false'}
                            >
                              <option value="" hidden></option>
                              <option value="50k-1 Lakh">₹50k – 1 Lakh</option>
                              <option value="1-3 Lakh">₹1 – 3 Lakh</option>
                              <option value="3-5 Lakh">₹3 – 5 Lakh</option>
                              <option value="5-10 Lakh">₹5 – 10 Lakh</option>
                              <option value="10-25 Lakh">₹10 – 25 Lakh</option>
                              <option value="25-50 Lakh">₹25 – 50 Lakh</option>
                              <option value="50 Lakh - 1 Crore">₹50 Lakh – 1 Crore</option>
                              <option value="1+ Crore">₹1+ Crore</option>
                            </select>
                          </div>
                        
                          {errors.BusinessDesiredLoanAmount && (
                            <p className="text-xs text-red-600">{errors.BusinessDesiredLoanAmount.message}</p>
                          )}
                        </div>
                        
                    </div>
                     <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mt-3 mb-5 text-[#6E6D6D]">
                      Get access to additional financing at attractive interest rates by pledging your assets such as Property, Gold, Car, or Mutual Funds. Do you wish to proceed?
                     </h1>
                   <div className="flex flex-col md:flex-row w-full gap-2">
                       {/* YES option */}
                       <div className={`flex items-center flex-1 gap-3 py-3 px-4 rounded-xl border ${
                           watchpledgeAssets === 'yes' ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
                         } cursor-pointer`}
                         onClick={() => selectpledgeAssets('yes')}>
                         <input
                           {...register('pledgeAssets')}
                           type="radio"
                           name="pledgeAssets"
                           value="yes"
                           checked={watchpledgeAssets === 'yes'}
                           onChange={() => selectpledgeAssets('yes')}
                           className="w-5 h-5 accent-[#025FDA] cursor-pointer"
                         />
                         <div>
                           <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">
                             Yes
                           </h1>
                         </div>
                       </div>
                     
                       {/* NO option */}
                       <div
                         className={`flex items-center flex-1 gap-3 py-3 px-4 rounded-xl border ${
                           watchpledgeAssets === 'no' ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
                         } cursor-pointer`}
                         onClick={() => selectpledgeAssets('no')}
                       >
                         <input
                           {...register('pledgeAssets')}
                           type="radio"
                           name="pledgeAssets"
                           value="no"
                           checked={watchpledgeAssets === 'no'}
                           onChange={() => selectpledgeAssets('no')}
                           className="w-5 h-5 accent-[#025FDA] cursor-pointer"
                         />
                         <div>
                           <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">
                             No
                           </h1>
                         </div>
                       </div>
                     </div>
                     
                </>
              }

              {
                watchEmploymentType =='self_employed_professional' && <>
                  <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">
                    Please verify your details!
                  </h1>
                  <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                    This information is critical to get accurate offers from lenders
                  </h1>

                    <div className="flex flex-col gap-3 w-full">
                      {/* Full name */}
                      <div className="w-full">
                        <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                          onClick={() => {setFocusedField('fullName');fullNameRef.current?.focus();}}>
                          <p
                            className={`absolute left-5 transition-all duration-200 ${
                              focusedField === 'fullName' || watchFullName ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                            }`}
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                          >
                            Full name
                          </p>
                          <input
                            {...register('fullName')}
                            type="text"
                            ref={(e) => {
                              register('fullName').ref(e);
                              fullNameRef.current = e;
                            }}
                            onFocus={() => setFocusedField('fullName')}
                            onBlur={() => !getValues('fullName') && setFocusedField('')}
                            className="w-full bg-transparent outline-none text-[18px]"
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                            aria-invalid={errors.fullName ? 'true' : 'false'}
                          />
                        </div>
                        {errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}
                      </div>
                      {/* Full name */}
                      <div className="w-full">
                          <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                            onClick={() => {
                              setFocusedField('ProfessionalType');
                              ProfessionalTypeRef.current?.focus();
                            }}
                          >
                            <p
                              className={`absolute left-5 transition-all duration-200 ${
                                focusedField === 'ProfessionalType' || watchProfessionalType
                                  ? 'top-2 text-xs text-[#797979]'
                                  : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                              }`}
                              style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                            >
                              Professional Type
                            </p>
                        
                            <select
                              {...register('ProfessionalType')}
                              ref={(e) => {
                                register('ProfessionalType').ref(e);
                                ProfessionalTypeRef.current = e;
                              }}
                              onFocus={() => setFocusedField('ProfessionalType')}
                              onBlur={() => !getValues('ProfessionalType') && setFocusedField('')}
                              className="w-full bg-transparent outline-none text-[18px]"
                              style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                              aria-invalid={errors.ProfessionalType ? 'true' : 'false'}
                            >
                              <option value="" hidden></option>
                              <option value="Doctor">Doctor</option>
                              <option value="Chartered Accountant">Chartered Accountant (CA)</option>
                              <option value="Engineer">Engineer</option>
                              <option value="Lawyer">Lawyer</option>
                              <option value="Teacher">Teacher</option>
                              <option value="IT Professional">IT Professional</option>
                              <option value="Business Owner">Business Owner</option>
                              <option value="Self-Employed Professional">Self-Employed Professional</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        
                          {errors.ProfessionalType && (
                            <p className="text-xs text-red-600">{errors.ProfessionalType.message}</p>
                          )}
                        </div>
                        
                      {/* Full name */}
                      <div className="w-full">
                        <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                          onClick={() => {setFocusedField('BusinessresidenceCity');BusinessresidenceCityRef.current?.focus();}}>
                          <p
                            className={`absolute left-5 transition-all duration-200 ${
                              focusedField === 'BusinessresidenceCity' || watchBusinessresidenceCity ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                            }`}
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                          >
                            Residence City
                          </p>
                          <input
                            {...register('BusinessresidenceCity')}
                            type="text"
                            ref={(e) => {
                              register('BusinessresidenceCity').ref(e);
                              BusinessresidenceCityRef.current = e;
                            }}
                            onFocus={() => setFocusedField('BusinessresidenceCity')}
                            onBlur={() => !getValues('BusinessresidenceCity') && setFocusedField('')}
                            className="w-full bg-transparent outline-none text-[18px]"
                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                            aria-invalid={errors.BusinessresidenceCity ? 'true' : 'false'}
                          />
                        </div>
                        {errors.BusinessresidenceCity && <p className="text-xs text-red-600">{errors.BusinessresidenceCity.message}</p>}
                      </div>
                      {/* Full name */}
                      <div className="w-full">
                          <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                            onClick={() => {
                              setFocusedField('BusinessgrossAnnualIncome');
                              BusinessgrossAnnualIncomeRef.current?.focus();
                            }}
                          >
                            <p className={`absolute left-5 transition-all duration-200 ${
                                focusedField === 'BusinessgrossAnnualIncome' || watchBusinessgrossAnnualIncome
                                  ? 'top-2 text-xs text-[#797979]'
                                  : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                              }`}
                              style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                            >
                              Gross Annual Turnover
                            </p>
                        
                            <select
                              {...register('BusinessgrossAnnualIncome')}
                              ref={(e) => {
                                register('BusinessgrossAnnualIncome').ref(e);
                                BusinessgrossAnnualIncomeRef.current = e;
                              }}
                              onFocus={() => setFocusedField('BusinessgrossAnnualIncome')}
                              onBlur={() =>
                                !getValues('BusinessgrossAnnualIncome') && setFocusedField('')
                              }
                              className="w-full bg-transparent outline-none text-[18px]"
                              style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                              aria-invalid={errors.BusinessgrossAnnualIncome ? 'true' : 'false'}
                            >
                              <option value="" hidden></option>
                              <option value="0-5 Lakh">0 – 5 Lakh</option>
                              <option value="5-10 Lakh">5 – 10 Lakh</option>
                              <option value="10-25 Lakh">10 – 25 Lakh</option>
                              <option value="25-50 Lakh">25 – 50 Lakh</option>
                              <option value="50 Lakh - 1 Crore">50 Lakh – 1 Crore</option>
                              <option value="1-5 Crore">1 – 5 Crore</option>
                              <option value="5+ Crore">5+ Crore</option>
                            </select>
                          </div>
                        
                          {errors.BusinessgrossAnnualIncome && (
                            <p className="text-xs text-red-600">
                              {errors.BusinessgrossAnnualIncome.message}
                            </p>
                          )}
                        </div>
                        
                        <div className="w-full">
                          <div
                            className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                            onClick={() => {
                              setFocusedField('BusinessDesiredLoanAmount');
                              BusinessDesiredLoanAmountRef.current?.focus();
                            }}
                          >
                            <p
                              className={`absolute left-5 transition-all duration-200 ${
                                focusedField === 'BusinessDesiredLoanAmount' || watchBusinessDesiredLoanAmount
                                  ? 'top-2 text-xs text-[#797979]'
                                  : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                              }`}
                              style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                            >
                              Desired Loan Amount
                            </p>
                        
                            <select
                              {...register('BusinessDesiredLoanAmount')}
                              ref={(e) => {
                                register('BusinessDesiredLoanAmount').ref(e);
                                BusinessDesiredLoanAmountRef.current = e;
                              }}
                              onFocus={() => setFocusedField('BusinessDesiredLoanAmount')}
                              onBlur={() =>
                                !getValues('BusinessDesiredLoanAmount') && setFocusedField('')
                              }
                              className="w-full bg-transparent outline-none text-[18px]"
                              style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                              aria-invalid={errors.BusinessDesiredLoanAmount ? 'true' : 'false'}
                            >
                              <option value="" hidden></option>
                              <option value="50k-1 Lakh">₹50k – 1 Lakh</option>
                              <option value="1-3 Lakh">₹1 – 3 Lakh</option>
                              <option value="3-5 Lakh">₹3 – 5 Lakh</option>
                              <option value="5-10 Lakh">₹5 – 10 Lakh</option>
                              <option value="10-25 Lakh">₹10 – 25 Lakh</option>
                              <option value="25-50 Lakh">₹25 – 50 Lakh</option>
                              <option value="50 Lakh - 1 Crore">₹50 Lakh – 1 Crore</option>
                              <option value="1+ Crore">₹1+ Crore</option>
                            </select>
                          </div>
                        
                          {errors.BusinessDesiredLoanAmount && (
                            <p className="text-xs text-red-600">{errors.BusinessDesiredLoanAmount.message}</p>
                          )}
                        </div>
                        
                    </div>
                     <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mt-3 mb-5 text-[#6E6D6D]">
                      Get access to additional financing at attractive interest rates by pledging your assets such as Property, Gold, Car, or Mutual Funds. Do you wish to proceed?
                     </h1>
                       <div className="flex flex-col md:flex-row w-full gap-2">
                     {/* YES option */}
                     <div className={`flex items-center flex-1 gap-3 py-3 px-4 rounded-xl border ${
                         watchpledgeAssets === 'yes' ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
                       } cursor-pointer`}
                       onClick={() => selectpledgeAssets('yes')}
                     >
                       <input
                         {...register('pledgeAssets')}
                         type="radio"
                         name="pledgeAssets"
                         value="yes"
                         checked={watchpledgeAssets === 'yes'}
                         onChange={() => selectpledgeAssets('yes')}
                         className="w-5 h-5 accent-[#025FDA] cursor-pointer"
                       />
                       <div>
                         <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">
                           Yes
                         </h1>
                       </div>
                     </div>
                   
                     {/* NO option */}
                     <div className={`flex items-center flex-1 gap-3 py-3 px-4 rounded-xl border ${
                         watchpledgeAssets === 'no' ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
                       } cursor-pointer`}
                       onClick={() => selectpledgeAssets('no')}
                     >
                       <input
                         {...register('pledgeAssets')}
                         type="radio"
                         name="pledgeAssets"
                         value="no"
                         checked={watchpledgeAssets === 'no'}
                         onChange={() => selectpledgeAssets('no')}
                         className="w-5 h-5 accent-[#025FDA] cursor-pointer"
                       />
                       <div>
                         <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">
                           No
                         </h1>
                       </div>
                     </div>
                   </div>
                </>
              }
              <div className="w-full flex mt-5 mb-3">
                <button type="submit" className="w-full max-w-[500px] cursor-pointer py-4 md:py-4 rounded-xl text-white bg-[#003880] font-medium text-sm md:text-base">
                  Continue
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalLoan_Index;
