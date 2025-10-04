import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { IoIosArrowBack } from 'react-icons/io';

// --- Imports (Adjusted for Insurance context) ---
import LoanSidebar from '../../Components/LoanPage/LoanSidebar'; 
import leftbannerimage from '/PeronalLoan_image.avif';
import famicons_call from '../../assets/Icons/famicons_call.svg';
import iconoir_mail_solid from '../../assets/Icons/iconoir_mail-solid.svg';
import tickdone from '../../assets/Icons/tickdone.svg';
import IndiaIcon from '../../assets/Images/IndiaIcon.svg';

// --- Insurance Specific Constants ---
const annualIncomeOptions = [
    'Below ₹3 Lacs',
    '₹3 Lacs - ₹6 Lacs',
    '₹6 Lacs - ₹12 Lacs',
    '₹12 Lacs - ₹18 Lacs',
    'Over ₹18 Lacs',
];
const employmentOptions = {
    'salaried': 'Received fixed amount of income every month',
    'self_employed_business': 'Run a business',
    'self_employed_professional': 'Engage in a profession',
};

// --- Zod Schema for the Strict 5-Screen Flow ---
const insuranceSchema = z
  .object({
    // Stage 1 Fields (Combined Mobile + Personal Details - Figma 170)
    fullName: z
      .string()
      .min(2, 'Enter your full name')
      .max(80, 'Full name is too long')
      .regex(/^[A-Za-z\s'.-]+$/, 'Name can only contain letters, spaces, apostrophes, dots or hyphens'),
    gender: z.string().nonempty('Gender is required'),
    dob: z.string().min(10, 'Enter your date of birth (DD-MM-YYYY)').max(10, 'Format is DD-MM-YYYY'),
    mobile: z
      .string()
      .min(10, 'Enter a 10 digit mobile number')
      .max(10, 'Enter a 10 digit mobile number')
      .regex(/^\d{10}$/, 'Mobile must contain only digits'),
    pincode: z
      .string()
      .min(6, 'Enter a 6 digit PIN code')
      .max(6, 'Enter a 6 digit PIN code')
      .regex(/^\d{6}$/, 'PIN code must contain only digits'),
    city: z.string().min(1, 'City is required').max(60, 'City name is too long'), // City is derived from Pincode/Manual in Figma

    // Stage 2 Field (Figma 172)
    employmentType: z.string().nonempty('Please select an employment type'),

    // Stage 3 Field (Figma 173)
    annualIncome: z.string().min(1, 'Annual Income is required'),

    // Stage 4 Field (Figma 174)
    tobaccoUsage: z.enum(['yes', 'no'], {
        errorMap: () => ({ message: "Please select Yes or No" })
    }),
  })
  .superRefine((data, ctx) => {
    // Basic date validation 
    if (data.dob && !/^\d{2}-\d{2}-\d{4}$/.test(data.dob)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['dob'], message: 'Format must be DD-MM-YYYY' });
    }
  });


// --- Stage flow definition ---
const stepFields = {
    1: ['fullName', 'gender', 'dob', 'mobile', 'pincode', 'city'], // COMBINED STAGE
    2: ['employmentType'],
    3: ['annualIncome'],
    4: ['tobaccoUsage'],
    5: [], // Final submit button is inside Stage 5 JSX
};


const Insurance_Index = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(insuranceSchema),
        defaultValues: {
            mobile: '', fullName: '', gender: '', dob: '', pincode: '', city: '',
            employmentType: '', annualIncome: '', tobaccoUsage: '',
        },
        mode: 'onChange',
    });

    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(1);
    const [focusedField, setFocusedField] = useState('');

    // --- Refs and Watchers ---
    const mobileRef = useRef(null);
    const fullNameRef = useRef(null);
    const genderRef = useRef(null);
    const dobRef = useRef(null);
    const pincodeRef = useRef(null);
    const cityRef = useRef(null);
    
    const watchedFields = watch();
    const { 
        mobile: watchMobile, fullName: watchFullName, gender: watchGender, dob: watchDob, 
        pincode: watchPincode, city: watchCity, employmentType: watchEmploymentType, 
        annualIncome: watchAnnualIncome, tobaccoUsage: watchTobaccoUsage 
    } = watchedFields;

    const mobileIsValid = /^\d{10}$/.test(watchMobile || '');
    const pincodeIsValid = /^\d{6}$/.test(watchPincode || '');

    const benefits = [
        'Compare Top Insurers - Access plans from multiple trusted providers',
        'Affordable Premiums - Get coverage that fits your budget',
        'Instant Policy Issuance - Quick, paperless & hassle-free process',
    ];

    useEffect(() => {
        // Since Stage 1 is detailed, focus the first main input
        if (stage === 1 && fullNameRef.current) fullNameRef.current.focus(); 
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
        if (stage > 1) {
            setStage((s) => s - 1);
        }
    };

    const onNext = async () => {
        const fieldsToValidate = stage === 6 ? [] : stepFields[stage];
        
        // Trigger validation for the current stage fields
        const ok = await trigger(fieldsToValidate);
        
        if (!ok) {
           console.log('Validation failed at Stage ' + stage, errors);
           return;
        }
        
        setStage((s) => s + 1);
    };
    
    const onFinalSubmit = (data) => {
        setLoading(true);
        // Logs all collected data to the console
        console.log('Form Data (Final Submission):', data); 
        
        setTimeout(() => {
            setLoading(false);
            setStage(6); // Go to a final success/plans ready screen
        }, 1500);
    };

    // --- Reusable UI Components ---

    const RadioOption = ({ fieldName, value, display, currentWatchedValue, subtitle = '' }) => (
        <div
            className={`flex flex-col gap-1 py-2 px-4 rounded-xl border ${
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

    // Raw JSX Input Field creator with Floating Label logic (used for all inputs)
    const renderInput = (fieldName, label, type, maxLength, inputRef, error, extraContent = null, customStyle = {}) => {
        const watchValue = watch(fieldName);
        const inputType = type === 'date' ? 'text' : type;
        const isDisabled = ['mobile-display'].includes(type);

        return (
            <div className="w-full">
                <div 
                    className={`relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}`}
                    style={customStyle}
                    onClick={() => {
                        if (!isDisabled) handleInputClick(fieldName, inputRef);
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
                        type={inputType}
                        maxLength={maxLength}
                        inputMode={['tel', 'number', 'numeric'].includes(type) ? 'numeric' : 'text'}
                        onClick={(e) => e.stopPropagation()} 
                        ref={(e) => { register(fieldName).ref(e); inputRef.current = e; }}
                        onFocus={() => setFocusedField(fieldName)}
                        onBlur={() => !getValues(fieldName) && setFocusedField('')}
                        className="w-full bg-transparent outline-none text-[18px]"
                        style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                        aria-invalid={error ? 'true' : 'false'}
                        disabled={isDisabled}
                    />
                    {extraContent && <span className='absolute top-3 right-5 text-xs text-[#797979]'>{extraContent}</span>}
                </div>
                {error && <p className="text-xs mt-1 text-red-600">{error.message}</p>}
            </div>
        );
    };


    // --- Main Component Render ---
    return (
        <div className="h-[100dvh] flex flex-col md:flex-row">
            <LoanSidebar
                mainTitle="Borrowly"
                subTitle="Insurance" // Changed Subtitle
                img={leftbannerimage} 
                features={[
                    { title: 'Compare Top Insurers', description: 'Access plans from multiple trusted providers' },
                    { title: 'Affordable Premiums', description: 'Get coverage that fits your budget' },
                    { title: 'Instant Policy Issuance', description: 'Quick, paperless & hassle-free process' },
                ]}
            />

            <div className="p-5 md:p-10 h-full flex-1">
                {/* Header - Contact Details */}
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
                    
                    {/* STAGE 1: Personal Details + Mobile (Figma 170) */}
                    {stage === 1 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            {/* Figma does NOT show 'Back' here, but we show it if we arrived from a refresh/manual state change */}
                            {/* <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}><IoIosArrowBack size={20} /><p>Back</p></div> */}
                            
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Your Basic Details
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                
                                {/* Full Name Field */}
                                {renderInput('fullName', 'Your full name', 'text', 80, fullNameRef, errors.fullName)}

                                {/* Gender Field (Selection) */}
                                <div className="w-full">
                                    <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                                        onClick={() => handleInputClick('gender', genderRef)}
                                    >
                                        <p className={`absolute left-5 transition-all duration-200 ${
                                            focusedField === 'gender' || watchGender ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                                        }`} style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}>Gender</p>
                                        <select
                                            {...register('gender')}
                                            onClick={(e) => e.stopPropagation()}
                                            ref={(e) => { register('gender').ref(e); genderRef.current = e; }}
                                            onFocus={() => setFocusedField('gender')}
                                            onBlur={() => !getValues('gender') && setFocusedField('')}
                                            className="w-full bg-transparent outline-none text-[18px]"
                                            style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                                            aria-invalid={errors.gender ? 'true' : 'false'}
                                        >
                                            <option value="" hidden></option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    {errors.gender && <p className="text-xs mt-1 text-red-600">{errors.gender.message}</p>}
                                </div>
                                
                                {/* Date of Birth Field */}
                                {renderInput('dob', 'Date of Birth (DD-MM-YYYY)', 'date', 10, dobRef, errors.dob)}
                                
                                {/* Mobile Field (Figma has this displayed with flag/code) */}
                                <div className="w-full">
                                    <div className="flex items-center w-full max-w-[500px] bg-[#F1F7FC] border border-[#D5ECFF] rounded-xl px-3 py-3 md:py-4 gap-3">
                                        <img src={IndiaIcon} alt="India" className="w-5 h-5 md:w-6 md:h-6" />
                                        <span className="text-gray-700 font-medium text-sm">+91</span>
                                        <div className="w-px h-6 bg-[#394249]" />
                                        <input
                                            {...register('mobile')}
                                            type="tel"
                                            inputMode="numeric"
                                            placeholder="Mobile number"
                                            className="flex-1 bg-transparent outline-none text-gray-800 text-sm"
                                            maxLength={10}
                                            value={watchMobile}
                                            onChange={(e) => selectValue('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            ref={mobileRef}
                                        />
                                    </div>
                                    {errors.mobile && <p className="text-red-500 text-xs mt-2">{errors.mobile.message}</p>}
                                </div>
                                
                                {/* City Field (Figma has it before Pincode/Code is cleaner after) */}
                                {renderInput('city', 'City', 'text', 60, cityRef, errors.city)}
                                
                                {/* Pincode Field */}
                                {renderInput('pincode', 'Pincode', 'tel', 6, pincodeRef, errors.pincode)}

                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    View Plans
                                </button>
                            </div>
                            <div className="w-full mt-5 flex items-center justify-center">
                                <p className="w-full max-w-[450px] text-xs text-center text-[#6E6D6D] leading-snug">
                                    By clicking Proceed, you allow Borrowly to access your past loan data and continue with the loan process.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* STAGE 2: Employment Type (Figma 172) */}
                    {stage === 2 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Employment Type</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">Pick your job type to move ahead</h1>
                            <div className="flex flex-col gap-2">
                                {Object.keys(employmentOptions).map(key => (
                                     <RadioOption key={key} fieldName="employmentType" value={key} display={key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} subtitle={employmentOptions[key]} currentWatchedValue={watchEmploymentType} />
                                ))}
                            </div>
                            {errors.employmentType && <p className="text-xs text-red-600 mt-2">{errors.employmentType.message}</p>}
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* STAGE 3: Annual Income (Figma 173) */}
                    {stage === 3 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Select Your Annual Income
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {annualIncomeOptions.map((income) => (
                                    <RadioOption key={income} fieldName="annualIncome" value={income} display={income} currentWatchedValue={watchAnnualIncome}/>
                                ))}
                            </div>
                            {errors.annualIncome && <p className="text-xs mt-2 text-red-600">{errors.annualIncome.message}</p>}
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* STAGE 4: Tobacco Usage (Figma 174) */}
                    {stage === 4 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Have you used tobacco in the last 12 months?
                            </h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Select Yes if you smoke or chew tobacco. Select No if you don't
                            </h1>
                            <div className="flex flex-col md:flex-row w-full gap-2">
                                {/* YES option */}
                                <div className={`flex items-center flex-1 gap-3 py-3 px-4 rounded-xl border ${
                                    watchTobaccoUsage === 'yes' ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
                                } cursor-pointer`} onClick={() => selectValue('tobaccoUsage', 'yes')}>
                                    <input {...register('tobaccoUsage')} type="radio" name="tobaccoUsage" value="yes" checked={watchTobaccoUsage === 'yes'} onChange={() => selectValue('tobaccoUsage', 'yes')} className="w-5 h-5 accent-[#025FDA] cursor-pointer"/>
                                    <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">Yes</h1>
                                </div>
                                
                                {/* NO option */}
                                <div className={`flex items-center flex-1 gap-3 py-3 px-4 rounded-xl border ${
                                    watchTobaccoUsage === 'no' ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
                                } cursor-pointer`} onClick={() => selectValue('tobaccoUsage', 'no')}>
                                    <input {...register('tobaccoUsage')} type="radio" name="tobaccoUsage" value="no" checked={watchTobaccoUsage === 'no'} onChange={() => selectValue('tobaccoUsage', 'no')} className="w-5 h-5 accent-[#025FDA] cursor-pointer"/>
                                    <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">No</h1>
                                </div>
                            </div>
                            {errors.tobaccoUsage && <p className="text-xs mt-2 text-red-600">{errors.tobaccoUsage.message}</p>}
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* STAGE 5: Final Submit (Matches the 'View Plans' CTA on Figma 170/174) */}
                    {stage === 5 && (
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
                                Ready to View Plans
                            </h1>
                            
                            <p className="text-sm text-[#6E6D6D] mb-5">
                                Press 'View Plans' to see personalized quotes from top insurers.
                            </p>
                            
                            <div className="w-full flex mt-5 mb-3">
                                <button type="submit" 
                                    className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60"
                                    disabled={isSubmitting || loading}>
                                    {loading ? 'Processing...' : 'View Plans'}
                                </button>
                            </div>
                        </form>
                    )}
                    
                    {/* STAGE 6: Success Screen */}
                    {stage === 6 && (
                        <div className="w-full max-w-[500px] text-center">
                            <img src={tickdone} alt="Success" className="w-20 h-20 mx-auto mb-5"/>
                            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-3xl md:text-4xl mb-3 text-[#025FDA]">Plans Ready!</h1>
                            <p className="text-lg text-[#6E6D6D]">Your personalized insurance plans are being displayed.</p>
                            <p className="text-lg text-[#6E6D6D] mt-2">Thank you for choosing Borrowly.</p>
                            <button onClick={() => setStage(1)} className="mt-8 py-3 px-6 rounded-xl text-white bg-[#003880] font-medium text-sm">Start New Search</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Insurance_Index;