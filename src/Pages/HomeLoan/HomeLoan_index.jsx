import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { IoIosArrowBack } from 'react-icons/io';

// --- Imports (Retained) ---
import LoanSidebar from '../../Components/LoanPage/LoanSidebar'; 
import leftbannerimage from '/PeronalLoan_image.avif'; // Assuming correct path is used later
import famicons_call from '../../assets/Icons/famicons_call.svg';
import iconoir_mail_solid from '../../assets/Icons/iconoir_mail-solid.svg';
import tickdone from '../../assets/Icons/tickdone.svg';
import IndiaIcon from '../../assets/Images/IndiaIcon.svg';

// --- Home Loan Specific Constants (Retained) ---
const desiredLoanAmounts = [
    'Upto ₹15 Lacs', '₹15 Lacs - ₹20 Lacs', '₹20 Lacs - ₹30 Lacs', '₹30 Lacs - ₹50 Lacs', '₹50 Lacs - ₹75 Lacs', '₹75 Lacs +',
];
const propertyTypes = [
    'Residential Property', 'Commercial Property', 'Industrial Property', 'Agricultural Land', 'Gram Panchayat Land', 'Lal Dora Property', 'Khasra/Khatauni Land Record', 'Other Property Types',
];
const netAnnualIncomeOptions = [
    'Below ₹3 Lacs', '₹3 Lacs - ₹6 Lacs', '₹6 Lacs - ₹12 Lacs', '₹12 Lacs - ₹18 Lacs', 'Over ₹18 Lacs',
];
const overallWorkExperienceOptions = [
    '0 - 1 Year', '1 - 2 Years', '2 - 3 Years', '3+ Years',
];
const businessVintageOptions = [
    '0 - 1 Year', '1 - 3 Years', '3 - 5 Years', '5 - 10 Years', '10+ Years',
];
const primaryBankOptions = [
    'HDFC', 'Axis Bank', 'ICICI', 'Kotak', 'SBI', 'Yes Bank', 'Citi Bank', 'IDFC Bank'
];

// --- Zod Schema Modified for New Flow (Stage 3 includes FullName & City) ---
const homeLoanSchema = z
  .object({
    // Stage 1 Field
    mobile: z
      .string()
      .min(10, 'Enter a 10 digit mobile number')
      .max(10, 'Enter a 10 digit mobile number')
      .regex(/^\d{10}$/, 'Mobile must contain only digits'),

    // Stage 2 Field
    desiredLoanAmount: z.string().min(1, 'Desired loan amount is required'),

    // --- NEW Stage 3 Fields ---
    fullName: z
      .string()
      .min(2, 'Enter your full name')
      .max(80, 'Full name is too long')
      .regex(/^[A-Za-z\s'.-]+$/, 'Name can only contain letters, spaces, apostrophes, dots or hyphens'),
    residenceCity: z.string().min(1, 'City is required').max(60, 'City name is too long'),
    pinCode: z
      .string()
      .min(6, 'Enter a 6 digit PIN code')
      .max(6, 'Enter a 6 digit PIN code')
      .regex(/^\d{6}$/, 'PIN code must contain only digits'),
    // --- END NEW Stage 3 Fields ---

    // Stage 4 Field (was 4)
    propertyType: z.string().min(1, 'Property type is required'),

    // Stage 5 Field (was 5)
    employmentType: z.string().nonempty('Please select an employment type'),

    // Stage 6 Field (was 6)
    netAnnualIncome: z.string().min(1, 'Annual Income is required'),

    // Stage 7 Conditional Fields (was 7)
    overallWorkExperience: z.string().optional(),
    CurrentBusinessVintage: z.string().optional(), 
    
    // Stage 8 Field (Commented out in flow, but still defined here to prevent runtime errors if used elsewhere)
    primaryBankAccount: z.string().optional(), 
  })
  .superRefine((data, ctx) => {
    const isSalariedOrProfessional = data.employmentType === 'salaried' || data.employmentType === 'self_employed_professional';
    const isBusiness = data.employmentType === 'self_employed_business';

    // Stage 7 (Work Experience / Business Vintage)
    if (isSalariedOrProfessional && (!data.overallWorkExperience || data.overallWorkExperience.trim() === '')) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['overallWorkExperience'], message: 'Work experience is required' });
    }
    if (isBusiness && (!data.CurrentBusinessVintage || data.CurrentBusinessVintage.trim() === '')) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['CurrentBusinessVintage'], message: 'Business vintage is required' });
    }
    
    // NOTE: primaryBankAccount and fullName validation moved out of superRefine as they are now in earlier stages.
    // However, if primaryBankAccount becomes active again (Stage 8), uncomment this:
    /*
    if (!data.primaryBankAccount || data.primaryBankAccount.trim() === '') {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['primaryBankAccount'], message: 'Please select your primary bank account' });
    }
    */
  });

// Employment-specific fields (Retained)
const employmentExperienceFields = {
    'salaried': 'overallWorkExperience',
    'self_employed_professional': 'overallWorkExperience',
    'self_employed_business': 'CurrentBusinessVintage', 
    '': null
};

// --- UPDATED Stage flow for 7 active stages (1, 2, 3, 4, 5, 6, 7) + Final (8) ---
const figmaStepFields = {
    1: ['mobile'],
    2: ['desiredLoanAmount'],
    3: ['fullName', 'residenceCity', 'pinCode'], // NEW COMBINED STAGE
    4: ['propertyType'],             // Old Stage 4 -> New Stage 4
    5: ['employmentType'],           // Old Stage 5 -> New Stage 5
    6: ['netAnnualIncome'],          // Old Stage 6 -> New Stage 6
    7: (employmentType) => {         // Old Stage 7 -> New Stage 7 (Conditional)
        const field = employmentExperienceFields[employmentType];
        return field ? [field] : [];
    },
    // STAGE 8 (Bank) is skipped
    // STAGE 9 (Full Name) is now Stage 3
};


const HomeLoan_Index = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(homeLoanSchema),
        defaultValues: {
            mobile: '',
            desiredLoanAmount: '',
            // New defaults
            fullName: '',
            residenceCity: '',
            pinCode: '', 
            
            propertyType: '',
            employmentType: '',
            netAnnualIncome: '',
            overallWorkExperience: '',
            CurrentBusinessVintage: '',
            primaryBankAccount: '', // Kept in default to match schema, even if stage is skipped
        },
        mode: 'onChange',
    });

    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(1);
    const [focusedField, setFocusedField] = useState('');

    // --- Refs and Watchers ---
    const mobileRef = useRef(null);
    const pinCodeRef = useRef(null);
    const fullNameRef = useRef(null);
    const cityRef = useRef(null); // New Ref for residenceCity
    
    const watchedFields = watch();
    const { 
        mobile: watchMobile, 
        desiredLoanAmount: watchDesiredLoanAmount,
        pinCode: watchPinCode,
        fullName: watchFullName, // Now watched for Stage 3
        residenceCity: watchResidenceCity, // New watched variable
        
        propertyType: watchPropertyType,
        employmentType: watchEmploymentType,
        netAnnualIncome: watchNetAnnualIncome,
        overallWorkExperience: watchOverallWorkExperience,
        CurrentBusinessVintage: watchCurrentBusinessVintage,
        primaryBankAccount: watchPrimaryBankAccount,
    } = watchedFields;

    const mobileIsValid = /^\d{10}$/.test(watchMobile || '');
    const pinCodeIsValid = /^\d{6}$/.test(watchPinCode || '');


    const benefits = [
        'Compare deals from leading banks & NBFCs',
        'Get the lowest interest rates available',
        'Flexible tenure up to 30 years for easy EMIs',
    ];

    useEffect(() => {
        if (stage === 1 && mobileRef.current) mobileRef.current.focus();
    }, [stage]);

    // --- Utility Functions ---

    const handleInputClick = (fieldName, ref) => {
        setFocusedField(fieldName);
        ref.current?.focus();
    };
    
    const handleInputBlur = (fieldName, value) => {
        if (!value) setFocusedField('');
    };
    
    const selectValue = (fieldName, value) => {
        setValue(fieldName, value, { shouldValidate: true, shouldDirty: true });
    };

    const goToPreviousStage = () => {
        // If current stage is 8 (Bank), skip back to Stage 7. Otherwise, simply go back one stage.
        const targetStage = stage === 8 ? 7 : stage - 1;
        if (targetStage >= 1) {
            setStage(targetStage);
        }
    };

    const onNext = async () => {
        let fieldsToValidate = figmaStepFields[stage];
        
        // Handle conditional fields for Stage 7
        if (stage === 7) {
            fieldsToValidate = figmaStepFields[7](watchEmploymentType);
        }
        
        // Stage 8 is the old bank stage. We skip it by immediately going to Stage 9 (which is implicitly the final step).
        if (stage === 7) {
            // After Stage 7 validation, skip the commented-out Stage 8 (Bank) and go to the end (Stage 9 logic/10 success)
            const ok = await trigger(fieldsToValidate);
            if (ok) {
                // Since Stage 8 is commented out, we treat 7's "next" as moving to the final submit stage (Stage 9 logic/10 success)
                setStage(9); 
            }
            return;
        }

        // Handle normal flow
        const ok = await trigger(fieldsToValidate);
        
        if (!ok) {
           console.log('Validation failed at Stage ' + stage, errors);
           return;
        }
        
        // Special case: If moving from the old Stage 3 (New Stage 3, combined fields) or old Stage 7 (New Stage 7, conditional fields)
        if (stage === 3) { // After Stage 3, go to Stage 4 (Property Type)
             setStage(4);
        } else if (stage === 7) {
            // This case should be handled by the block above now, but keeping it simple:
            // Stage 7 automatically skips to Stage 9/10 based on the current implementation.
            setStage(9);
        } 
        else if (stage === 6) {
             setStage(7);
        }
        else {
             setStage((s) => s + 1);
        }
    };

    const selectEmployment = (value) => {
        setValue('employmentType', value, { shouldValidate: true, shouldDirty: true });
        setValue('overallWorkExperience', '');
        setValue('CurrentBusinessVintage', '');
    };

    const onFinalSubmit = (data) => {
        setLoading(true);
        // Log all collected data to the console
        console.log('Form Data:', data); 
        
        setTimeout(() => {
            setLoading(false);
            setStage(10); 
        }, 1500);
    };

    // --- Reusable UI Components (Retained) ---

    const RadioOption = ({ fieldName, value, display, currentWatchedValue, subtitle = '' }) => (
        <div
            className={`flex flex-col gap-1 py-3 px-4 rounded-xl border ${
                currentWatchedValue === value ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
            } cursor-pointer`}
            onClick={() => selectValue(fieldName, value)}
        >
            <div className="flex items-center gap-3">
                <input
                    {...register(fieldName)}
                    type="radio"
                    name={fieldName}
                    value={value}
                    checked={currentWatchedValue === value}
                    onChange={() => selectValue(fieldName, value)}
                    className="w-5 h-5 accent-[#025FDA] cursor-pointer"
                />
                <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">
                    {display}
                </h1>
            </div>
            {subtitle && <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm text-[#6E6D6D] ml-8">{subtitle}</h1>}
        </div>
    );
    
    // Explicit Input Field structure (incorporates cursor fix)
    const ExplicitInputField = ({ fieldName, label, type, maxLength, inputRef, watchValue, error, extraContent }) => (
        <div className="w-full">
            <div 
                className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                onClick={() => {
                    setFocusedField(fieldName);
                    inputRef.current?.focus();
                }}
            >
                <p 
                    className={`absolute left-5 transition-all duration-200 ${
                        focusedField === fieldName || watchValue ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                    }`}
                    style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                >
                    {label}
                </p>
                <input
                    {...register(fieldName)}
                    type={type}
                    inputMode={type === 'tel' ? 'numeric' : 'text'}
                    maxLength={maxLength}
                    onClick={(e) => e.stopPropagation()} 
                    ref={(e) => {
                        register(fieldName).ref(e);
                        inputRef.current = e;
                    }}
                    onFocus={() => setFocusedField(fieldName)}
                    onBlur={() => !getValues(fieldName) && setFocusedField('')}
                    className="w-full bg-transparent outline-none text-[18px]"
                    style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                    aria-invalid={error ? 'true' : 'false'}
                />
                {extraContent && <span className='absolute top-3 right-5 text-xs text-[#797979]'>{extraContent}</span>}
            </div>
            {error && <p className="text-xs mt-1 text-red-600">{error.message}</p>}
        </div>
    );

    // --- Main Component Render ---
    return (
        <div className="h-[100dvh] flex flex-col md:flex-row">
            <LoanSidebar
                mainTitle="Borrowly"
                subTitle="Home Loan"
                img={leftbannerimage}
                features={[
                    { title: 'Personalized Home Loan Offers', description: 'Compare plans designed to match your dream home purchase' },
                    { title: 'Instant Eligibility Check', description: 'Quickly know how much loan you can avail' },
                    { title: 'Flexible Tenure & EMIs', description: 'Repay with comfort, up to 30 years of easy installments' },
                ]}
            />

            <div className="p-5 md:p-10 h-full flex-1">
                {/* Header - Contact Details (Retained) */}
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

                {/* Main Content Area */}
                <div className="flex-1 h-full flex items-center justify-center">
                    
                    {/* STAGE 1: Mobile Number */}
                    {stage === 1 && (
                        <div className="w-full max-w-[500px]">
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Unlock Exclusive Borrowly</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-3xl md:text-4xl mb-5">Home Loan Offers</h1>
                            <div className="mt-4 flex flex-col gap-3">
                                {benefits.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <div><img src={tickdone} alt="tick" className="w-5" /></div>
                                        <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm flex-1 text-black">{item}</h1>
                                    </div>
                                ))}
                            </div>
                            <div className="py-5">
                                <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px] mb-2">Phone Number</h1>
                                <div className="flex items-center w-full max-w-[500px] bg-[#F1F7FC] border border-[#D5ECFF] rounded-xl px-3 py-3 md:py-4 gap-3">
                                    <img src={IndiaIcon} alt="India" className="w-5 h-5 md:w-6 md:h-6" />
                                    <span className="text-gray-700 font-medium text-sm">+91</span>
                                    <div className="w-px h-6 bg-[#394249]" />
                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        placeholder="Enter mobile number"
                                        className="flex-1 bg-transparent outline-none text-gray-800 text-sm"
                                        maxLength={10}
                                        value={watchMobile}
                                        onChange={(e) => selectValue('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        ref={mobileRef}
                                    />
                                </div>
                                {errors.mobile && <p className="text-red-500 text-xs mt-2">{errors.mobile.message}</p>}
                                <div className="w-full flex mt-5 mb-3">
                                    <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60" disabled={!mobileIsValid || loading}>
                                        {loading ? 'Processing...' : 'Proceed'}
                                    </button>
                                </div>
                                <div className="w-full mt-5 flex items-center justify-center">
                                    <p className="w-full max-w-[450px] text-xs text-center text-[#6E6D6D] leading-snug">
                                        By clicking Proceed you allow Borrowly to access your past loan data and continue with the loan process.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STAGE 2: Desired Loan Amount */}
                    {stage === 2 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Select Your Desired Loan Amount
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {desiredLoanAmounts.map((amount) => (
                                    <RadioOption key={amount} fieldName="desiredLoanAmount" value={amount} display={amount} currentWatchedValue={watchDesiredLoanAmount}/>
                                ))}
                            </div>
                            {errors.desiredLoanAmount && <p className="text-xs mt-2 text-red-600">{errors.desiredLoanAmount.message}</p>}
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}
                    
                     {/* STAGE 3: Full Name, City, and Pin Code (NEW COMBINED STAGE - USING RAW JSX) */}
                    {stage === 3 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Where are you planning to purchase your property?
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                
                                {/* --- Full Name Field --- */}
                                <div className="w-full">
                                    <div 
                                        className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                                        onClick={() => { setFocusedField('fullName'); fullNameRef.current?.focus(); }}
                                    >
                                        <p 
                                            className={`absolute left-5 transition-all duration-200 ${
                                                focusedField === 'fullName' || watchFullName ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                                            }`}
                                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                                        >
                                            Full Name
                                        </p>
                                        <input
                                            {...register('fullName')}
                                            type="text"
                                            maxLength={80}
                                            onClick={(e) => e.stopPropagation()} 
                                            ref={(e) => { register('fullName').ref(e); fullNameRef.current = e; }}
                                            onFocus={() => setFocusedField('fullName')}
                                            onBlur={() => !getValues('fullName') && setFocusedField('')}
                                            className="w-full bg-transparent outline-none text-[18px]"
                                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                                            aria-invalid={errors.fullName ? 'true' : 'false'}
                                        />
                                    </div>
                                    {errors.fullName && <p className="text-xs mt-1 text-red-600">{errors.fullName.message}</p>}
                                </div>
                                {/* --- End Full Name Field --- */}

                                {/* --- Residence City Field --- */}
                                <div className="w-full">
                                    <div 
                                        className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                                        onClick={() => { setFocusedField('residenceCity'); cityRef.current?.focus(); }}
                                    >
                                        <p 
                                            className={`absolute left-5 transition-all duration-200 ${
                                                focusedField === 'residenceCity' || watchResidenceCity ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                                            }`}
                                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                                        >
                                            City
                                        </p>
                                        <input
                                            {...register('residenceCity')}
                                            type="text"
                                            maxLength={60}
                                            onClick={(e) => e.stopPropagation()} 
                                            ref={(e) => { register('residenceCity').ref(e); cityRef.current = e; }}
                                            onFocus={() => setFocusedField('residenceCity')}
                                            onBlur={() => !getValues('residenceCity') && setFocusedField('')}
                                            className="w-full bg-transparent outline-none text-[18px]"
                                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                                            aria-invalid={errors.residenceCity ? 'true' : 'false'}
                                        />
                                    </div>
                                    {errors.residenceCity && <p className="text-xs mt-1 text-red-600">{errors.residenceCity.message}</p>}
                                </div>
                                {/* --- End Residence City Field --- */}
                                
                                {/* --- Pin Code Field --- */}
                                <div className="w-full">
                                    <div 
                                        className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                                        onClick={() => { setFocusedField('pinCode'); pinCodeRef.current?.focus(); }}
                                    >
                                        <p 
                                            className={`absolute left-5 transition-all duration-200 ${
                                                focusedField === 'pinCode' || watchPinCode ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                                            }`}
                                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                                        >
                                            Pin Code
                                        </p>
                                        <input
                                            {...register('pinCode')}
                                            type="tel"
                                            inputMode="numeric"
                                            maxLength={6}
                                            onClick={(e) => e.stopPropagation()} 
                                            ref={(e) => { register('pinCode').ref(e); pinCodeRef.current = e; }}
                                            onFocus={() => setFocusedField('pinCode')}
                                            onBlur={() => !getValues('pinCode') && setFocusedField('')}
                                            className="w-full bg-transparent outline-none text-[18px]"
                                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                                            aria-invalid={errors.pinCode ? 'true' : 'false'}
                                        />
                                        <span className='absolute top-3 right-5 text-xs text-[#797979]'>{watchPinCode ? watchPinCode.length : 0}/6 Digits</span>
                                    </div>
                                    {errors.pinCode && <p className="text-xs mt-1 text-red-600">{errors.pinCode.message}</p>}
                                </div>
                                {/* --- End Pin Code Field --- */}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60" disabled={!watchFullName || !watchResidenceCity || !pinCodeIsValid}>
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}
                    {/* STAGE 4: Property Type (Flow Adjusted) */}
                    {stage === 4 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">
                                Select Your Property Type
                            </h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Choose the category of your property to help us customize the best loan options for you.
                            </h1>
                            <div className="grid grid-cols-2 gap-3 w-full">
                                {propertyTypes.map((type) => (
                                    <div key={type} className="col-span-1">
                                        <RadioOption fieldName="propertyType" value={type} display={type} currentWatchedValue={watchPropertyType}/>
                                    </div>
                                ))}
                            </div>
                            {errors.propertyType && <p className="text-xs mt-2 text-red-600">{errors.propertyType.message}</p>}
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STAGE 5: Employment Type (Flow Adjusted) */}
                    {stage === 5 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Employment Type</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">Pick your job type to move ahead</h1>
                            <div className="flex flex-col gap-2">
                                <RadioOption fieldName="employmentType" value="salaried" display="Salaried" subtitle="Received fixed amount of income every month" currentWatchedValue={watchEmploymentType} />
                                <RadioOption fieldName="employmentType" value="self_employed_business" display="Self-Employed Business" subtitle="Run a business" currentWatchedValue={watchEmploymentType} />
                                <RadioOption fieldName="employmentType" value="self_employed_professional" display="Self-Employed Professional" subtitle="Engage in a profession" currentWatchedValue={watchEmploymentType} />
                            </div>
                            {errors.employmentType && <p className="text-xs text-red-600 mt-2">{errors.employmentType.message}</p>}
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* STAGE 6: Net Annual Income (Flow Adjusted) */}
                    {stage === 6 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Select Your Net Annual Income
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {netAnnualIncomeOptions.map((income) => (
                                    <RadioOption key={income} fieldName="netAnnualIncome" value={income} display={income} currentWatchedValue={watchNetAnnualIncome}/>
                                ))}
                            </div>
                            {errors.netAnnualIncome && <p className="text-xs mt-2 text-red-600">{errors.netAnnualIncome.message}</p>}
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* STAGE 7: Overall Work Experience / Business Vintage (Conditional - Flow Adjusted) */}
                    {stage === 7 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                {watchEmploymentType === 'self_employed_business' ? 'Business Vintage' : 'Overall Work Experience'}
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {/* Salaried/Professional Experience */}
                                {(watchEmploymentType === 'salaried' || watchEmploymentType === 'self_employed_professional') && (
                                    <>
                                        {overallWorkExperienceOptions.map((exp) => (
                                            <RadioOption key={exp} fieldName="overallWorkExperience" value={exp} display={exp} currentWatchedValue={watchOverallWorkExperience}/>
                                        ))}
                                        {errors.overallWorkExperience && <p className="text-xs mt-2 text-red-600">{errors.overallWorkExperience.message}</p>}
                                    </>
                                )}
                                
                                {/* Self-Employed Business Vintage */}
                                {watchEmploymentType === 'self_employed_business' && (
                                    <>
                                        {businessVintageOptions.map((vintage) => (
                                            <RadioOption key={vintage} fieldName="CurrentBusinessVintage" value={vintage} display={vintage} currentWatchedValue={watchCurrentBusinessVintage}/>
                                        ))}
                                        {errors.CurrentBusinessVintage && <p className="text-xs mt-2 text-red-600">{errors.CurrentBusinessVintage.message}</p>}
                                    </>
                                )}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* STAGE 8: Primary Bank Account (COMMENTED OUT/SKIPPED) */}
                    {/* The logic for stage 7 onNext now skips directly to stage 9/10, effectively commenting out the UI for Stage 8. */}

                    {/* STAGE 9: Final Submit (Flow Adjusted - Now handles submission directly) */}
                    {stage === 9 && (
                        <form
                            onSubmit={handleSubmit(onFinalSubmit, (errors) => {
                                console.log('Validation failed on final submit:', errors);
                            })}
                            className="w-full max-w-[500px]"
                        >
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Review & Submit
                            </h1>
                            
                            <p className="text-sm text-[#6E6D6D] mb-5">
                                You are ready to submit your application. Press continue to receive personalized offers.
                            </p>
                            
                            <div className="w-full flex mt-5 mb-3">
                                <button type="submit" 
                                    className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60"
                                    disabled={isSubmitting || loading}>
                                    {loading ? 'Processing...' : 'Continue'}
                                </button>
                            </div>
                        </form>
                    )}
                    
                    {/* STAGE 10: Thank You/Success Screen */}
                    {stage === 10 && (
                        <div className="w-full max-w-[500px] text-center">
                            <img src={tickdone} alt="Success" className="w-20 h-20 mx-auto mb-5"/>
                            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-3xl md:text-4xl mb-3 text-[#025FDA]">Application Received!</h1>
                            <p className="text-lg text-[#6E6D6D]">Thank you for submitting your Home Loan application.</p>
                            <p className="text-lg text-[#6E6D6D] mt-2">We are reviewing your details and will get back to you with personalized offers shortly.</p>
                            <button onClick={() => setStage(1)} className="mt-8 py-3 px-6 rounded-xl text-white bg-[#003880] font-medium text-sm">Start New Application</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeLoan_Index;