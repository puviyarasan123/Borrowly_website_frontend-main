import React, { useEffect, useRef, useState, useCallback } from 'react';
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

// --- Constants ---
const businessVintageOptions = [
    'Under 1 Year',
    '1 - 2 Years',
    '2 - 3 Years',
    '3 - 5 Years',
    'Over 5 Years',
];

const grossAnnualTurnoverOptions = [
    'Below ₹25 Lacs',
    '₹25 Lacs - ₹50 Lacs',
    '₹50 Lacs - ₹75 Lacs',
    '₹75 Lacs - ₹1 Cr',
    'Over ₹1 Cr',
];

const desiredLoanAmountOptions = [
    'Below ₹2 Lacs',
    '₹2 Lacs - ₹5 Lacs',
    '₹5 Lacs - ₹10 Lacs',
    '₹10 Lacs - ₹20 Lacs',
    'Above ₹20 Lacs',
];

const pledgeableAssets = [
    'Property (Home, Office, Factory etc.)',
    'Gold (Ornaments, Bars, Jewels etc.)',
    'Car',
    'Mutual Fund',
];

const loanReasonOptions = [
    'Working Capital Support',
    'Stock / Raw Material Purchase',
    'Machinery or Equipment Upgrade',
    'Office / Workspace Expansion',
    'Business Promotion & Marketing',
    'Repay Existing Loans / Credit Card Bills',
    'Home Purchase or Renovation',
    'Purpose not listed',
];

// NEW DROPDOWN OPTIONS
const companyTypeOptions = [
    'Proprietorship',
    'Partnership Firm',
    'Private Limited Company',
    'Public Limited Company',
    'Limited Liability Partnership',
    'Director applying as an individual',
    'Other',
];

const natureOfBusinessOptions = [
    'Manufacturer',
    'Trader/Wholesaler',
    'Retailer',
    'Service Provider',
    'Others',
];

const industryTypeOptions = [
    'Automobiles',
    'Computer',
    'Construction',
    'Entertainment and Leisure',
    'Finance',
    'Healthcare',
    'Health Care Providers',
    'Industrial Equipment',
    'Institutions and Trusts',
    'Media and Entertainment',
    'Photographic & Allied',
    'Professional services',
    'Other Services',
    'Transportation Logistics',
    'Others',
];

// Dynamic Sub-Industry Type Options based on Industry Type
const allSubIndustryTypeOptions = {
    Computer: [
        'Computer Education',
        'Computer Hardware & Software',
        'Network Infrastructure',
        'Cloud Computing',
        'Cyber Security',
        'Others',
    ],
    // Add more industry types and their sub-industries here
    // Example:
    // "Automobiles": ["Car Manufacturing", "Bike Manufacturing", "Automobile Parts", "Others"],
    "Others": ["General Sub-Industry"], // Fallback for "Others" industry type
};

// --- Zod Schema for Business Loan Flow ---
const businessLoanSchema = z
    .object({
        mobile: z.string().regex(/^\d{10}$/, '10 digit mobile number required'),
        fullName: z.string().min(2, 'Full name required').max(80),
        currentCompany: z.string().min(1, 'Company name required').max(80),
        residenceCity: z.string().min(1, 'City required').max(60),
        grossAnnualIncome: z.string().min(1, 'Income required'),
        employmentType: z.string().nonempty('Please select an employment type'),
        grossAnnualTurnover: z.string().min(1, 'Gross annual turnover is required'),
        yearsInBusiness: z.string().min(1, 'Business vintage is required'),
        loanReason: z.string().nonempty('Please select a reason for the loan'),
        companyType: z.string().nonempty('Company Type is required'),
        natureOfBusiness: z.string().nonempty('Nature of business is required'),
        industryType: z.string().nonempty('Industry Type is required'),
        subIndustryType: z.string().nonempty('Sub-Industry Type is required'),
        desiredLoanAmount: z.string().min(1, 'Desired loan amount required'),
        additionalLoan: z.string().nonempty('Please choose an option'),
        // pledgeAssets is only required if additionalLoan is 'yes'
        pledgeAssets: z.array(z.string()).optional(), // Keep as optional here
    }).superRefine((data, ctx) => {
        // Custom validation for pledgeAssets if additionalLoan is 'yes'
        if (data.additionalLoan === 'yes' && (!data.pledgeAssets || data.pledgeAssets.length === 0)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Please select at least one asset to pledge',
                path: ['pledgeAssets'],
            });
        }
    });


// --- NEW STAGE FLOW DEFINITION ---
const figmaStepFields = {
    1: ['mobile'],
    2: ['fullName', 'currentCompany', 'residenceCity', 'grossAnnualIncome'],
    3: ['employmentType'],
    4: ['grossAnnualTurnover'],
    5: ['yearsInBusiness'],
    6: ['loanReason'],
    7: ['companyType', 'natureOfBusiness', 'industryType', 'subIndustryType'],
    8: ['desiredLoanAmount'],
    9: ['additionalLoan', 'pledgeAssets'], // Added pledgeAssets for validation in this stage
    10: [], // Final Success Page
};

const BusinessLoan_Index = () => {
    const {
        register, handleSubmit, setValue, watch, getValues, trigger,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(businessLoanSchema),
        defaultValues: {
            mobile: '', fullName: '', currentCompany: '', residenceCity: '', grossAnnualIncome: '',
            employmentType: '',
            grossAnnualTurnover: '',
            yearsInBusiness: '',
            loanReason: '',
            companyType: '', natureOfBusiness: '', industryType: '', subIndustryType: '',
            desiredLoanAmount: '',
            additionalLoan: 'no',
            pledgeAssets: [], // Default empty array
        },
        mode: 'onChange',
    });

    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(1);
    const [focusedField, setFocusedField] = useState('');

    const mobileRef = useRef(null);
    const fullNameRef = useRef(null);
    const companyRef = useRef(null);
    const cityRef = useRef(null);
    const grossAnnualIncomeRef = useRef(null);
    const yearsInBusinessRef = useRef(null);
    const grossAnnualTurnoverRef = useRef(null);
    const loanReasonRef = useRef(null);
    const companyTypeRef = useRef(null);
    const natureOfBusinessRef = useRef(null);
    const industryTypeRef = useRef(null);
    const subIndustryTypeRef = useRef(null);
    const desiredLoanAmountRef = useRef(null);
    const additionalLoanRef = useRef(null);
    // No specific ref for pledgeAssets checkboxes as they are individually handled

    const watchedFields = watch();
    const {
        mobile: watchMobile,
        fullName: watchFullName,
        currentCompany: watchCurrentCompany,
        residenceCity: watchResidenceCity,
        grossAnnualIncome: watchGrossAnnualIncome,
        employmentType: watchEmploymentType,
        yearsInBusiness: watchYearsInBusiness,
        grossAnnualTurnover: watchGrossAnnualTurnover,
        loanReason: watchLoanReason,
        companyType: watchCompanyType,
        natureOfBusiness: watchNatureOfBusiness,
        industryType: watchIndustryType, // Watch industryType for dynamic sub-industry options
        subIndustryType: watchSubIndustryType,
        desiredLoanAmount: watchDesiredLoanAmount,
        additionalLoan: watchAdditionalLoan, // Watch additionalLoan for conditional rendering
        pledgeAssets: watchPledgeAssets
    } = watchedFields;

    const mobileIsValid = /^\d{10}$/.test(watchMobile || '');

    // Dynamically filter sub-industry options
    const currentSubIndustryOptions = watchIndustryType ? (allSubIndustryTypeOptions[watchIndustryType] || ['Others']) : [];

    const handlePledgeAssetsChange = (value) => {
        const currentPledged = new Set(watchPledgeAssets);
        if (currentPledged.has(value)) {
            currentPledged.delete(value);
        } else {
            currentPledged.add(value);
        }
        setValue('pledgeAssets', Array.from(currentPledged), { shouldValidate: true, shouldDirty: true });
    };

    useEffect(() => {
        if (stage === 1 && mobileRef.current) mobileRef.current.focus();
        if (stage === 2 && fullNameRef.current) fullNameRef.current.focus();
        if (stage === 3 && document.getElementById('employmentType')) document.getElementById('employmentType').focus();
        if (stage === 4 && grossAnnualTurnoverRef.current) grossAnnualTurnoverRef.current.focus();
        if (stage === 5 && yearsInBusinessRef.current) yearsInBusinessRef.current.focus();
        if (stage === 6 && loanReasonRef.current) loanReasonRef.current.focus();
        if (stage === 7 && companyTypeRef.current) companyTypeRef.current.focus();
        if (stage === 8 && desiredLoanAmountRef.current) desiredLoanAmountRef.current.focus();
        if (stage === 9 && additionalLoanRef.current) additionalLoanRef.current.focus();
    }, [stage]);

    // Reset subIndustryType when industryType changes
    useEffect(() => {
        setValue('subIndustryType', '');
    }, [watchIndustryType, setValue]);

    // Reset pledgeAssets if additionalLoan changes to 'no'
    useEffect(() => {
        if (watchAdditionalLoan === 'no') {
            setValue('pledgeAssets', []);
        }
    }, [watchAdditionalLoan, setValue]);


    const benefits = [
        'Customized Loan Solutions - Tailored offers designed to fit your business needs',
        'Quick Eligibility Check - Instantly know how much you can borrow',
        'Flexible Repayment Options - Repay at your pace with business-friendly plans',
    ];

    const handleInputClick = (fieldName, ref) => {
        setFocusedField(fieldName);
        ref.current?.focus();
    };

    const handleInputBlur = (fieldName, value) => {
        if (!value) setFocusedField('');
    };

    const goToPreviousStage = () => {
        if (stage > 1) {
            setStage((s) => s - 1);
        }
    };

    const onNext = async () => {
        const ok = await trigger(figmaStepFields[stage]);

        if (!ok) {
           console.log('Validation failed at Stage ' + stage, errors);
           // Log specific error for pledgeAssets if it exists
           if (errors.pledgeAssets) {
               console.log("Pledge Assets Error:", errors.pledgeAssets.message);
           }
           return;
        }

        if (stage === 9) {
            await handleSubmit(onFinalSubmit)();
        } else {
            setStage((s) => s + 1);
        }
    };

    const onFinalSubmit = (data) => {
        setLoading(true);
        console.log('Form Data (Final Submission):', data);

        setTimeout(() => {
            setLoading(false);
            setStage(10); // Success screen
        }, 1500);
    };

    const RadioOption = ({ fieldName, value, display, currentWatchedValue, subtitle = '' }) => (
        <div
            className={`flex flex-col gap-1 py-2 px-4 rounded-xl border ${
                currentWatchedValue === value ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
            } cursor-pointer`}
            onClick={() => setValue(fieldName, value, { shouldValidate: true, shouldDirty: true })}
        >
            <div className="flex items-center gap-3">
                <input
                    {...register(fieldName)}
                    type="radio"
                    name={fieldName}
                    value={value}
                    checked={currentWatchedValue === value}
                    onChange={() => setValue(fieldName, value, { shouldValidate: true, shouldDirty: true })}
                    className="w-5 h-5 accent-[#025FDA] cursor-pointer"
                />
                <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">
                    {display}
                </h1>
            </div>
            {subtitle && <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm text-[#6E6D6D] ml-8">{subtitle}</h1>}
        </div>
    );

    const renderSelect = (fieldName, label, options, inputRef, error) => {
        const watchValue = watch(fieldName);
        return (
            <div className="w-full">
                <div
                    id={fieldName}
                    className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                    onClick={() => handleInputClick(fieldName, inputRef)}
                >
                    <p
                        className={`absolute left-5 transition-all duration-200 ${
                            focusedField === fieldName || watchValue ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
                        }`}
                        style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                    >
                        {label}
                    </p>
                    <select
                        {...register(fieldName)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                            setValue(fieldName, e.target.value, { shouldValidate: true, shouldDirty: true });
                            // If industryType changes, reset subIndustryType
                            if (fieldName === 'industryType') {
                                setValue('subIndustryType', '');
                            }
                        }}
                        value={watchValue || ''}
                        ref={(e) => { register(fieldName).ref(e); inputRef.current = e; }}
                        onFocus={() => setFocusedField(fieldName)}
                        onBlur={() => handleInputBlur(fieldName, getValues(fieldName))}
                        className="w-full bg-transparent outline-none text-[18px] appearance-none"
                        style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                        aria-invalid={error ? 'true' : 'false'}
                    >
                        <option value="" hidden></option>
                        {options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                {error && <p className="text-xs mt-1 text-red-600">{error.message}</p>}
            </div>
        );
    };


    const renderInput = (fieldName, label, type, maxLength, inputRef, error, isCurrency = false) => {
        const watchValue = watch(fieldName);

        const handleChange = (e) => {
            const raw = e.target.value;
            setValue(fieldName, raw, { shouldValidate: true, shouldDirty: true });
        };

        const handleBlur = (e) => {
            handleInputBlur(fieldName, getValues(fieldName));
        };

        return (
            <div className="w-full">
                <div
                    id={fieldName}
                    className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                    onClick={() => handleInputClick(fieldName, inputRef)}
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
                        type={isCurrency ? 'text' : type}
                        maxLength={maxLength}
                        inputMode={isCurrency || type === 'tel' || type === 'number' ? 'numeric' : 'text'}
                        onClick={(e) => e.stopPropagation()}
                        onChange={isCurrency ? handleChange : register(fieldName).onChange}
                        onBlur={handleBlur}
                        value={watchValue || ''}
                        ref={(e) => { register(fieldName).ref(e); inputRef.current = e; }}
                        onFocus={() => setFocusedField(fieldName)}
                        className="w-full bg-transparent outline-none text-[18px]"
                        style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                        aria-invalid={error ? 'true' : 'false'}
                    />
                </div>
                {error && <p className="text-xs mt-1 text-red-600">{error.message}</p>}
            </div>
        );
    };

    // New CheckboxOption for pledgeable assets
    const CheckboxOption = ({ value, display }) => {
        const isChecked = Array.isArray(watchPledgeAssets) && watchPledgeAssets.includes(value);

        return (
            <div
                className={`flex items-center gap-3 py-3 px-4 rounded-xl border ${
                    isChecked ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
                } cursor-pointer`}
                onClick={() => handlePledgeAssetsChange(value)}
            >
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handlePledgeAssetsChange(value)} // Handled by parent click
                    className="w-5 h-5 accent-[#025FDA] cursor-pointer"
                />
                <span className="text-[16px]">{display}</span>
            </div>
        );
    };

    return (
        <div className="h-[100dvh] flex flex-col md:flex-row">
            <LoanSidebar
                mainTitle="Borrowly"
                subTitle="Business Loan"
                img={leftbannerimage}
                features={[
                    { title: 'Customized Loan Solutions', description: 'Tailored offers designed to fit your business needs' },
                    { title: 'Quick Eligibility Check', description: 'Instantly know how much you can borrow' },
                    { title: 'Flexible Repayment Options', description: 'Repay at your pace with business-friendly plans' },
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

                    {/* STAGE 1: Mobile Number */}
                    {stage === 1 && (
                           <div className="w-full max-w-[500px]">
                                                                              <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Unlock Exclusive Borrowly</h1>
                                                                              <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-3xl md:text-4xl mb-5">Business Loan Offers</h1>
                                                                              <div className="mt-4 flex flex-col gap-3">
                                                                                  {benefits.map((item, index) => (
                                                                                      <div key={index} className="flex gap-2">
                                                                                          <div><img src={tickdone} alt="tick" className="w-5" /></div>
                                                                                          <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm flex-1 text-black">
                                                                                              {item}
                                                                                          </h1>
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
                                        onChange={(e) => setValue('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
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
                                        By clicking Proceed, you allow Borrowly to access your past loan data and continue with the loan process.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STAGE 2: Personal Details */}
                    {stage === 2 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Please verify your details!</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                This information is critical to get accurate offers from lenders
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderInput('fullName', 'Your Full Name', 'text', 80, fullNameRef, errors.fullName)}
                                {renderInput('currentCompany', 'Current Company', 'text', 80, companyRef, errors.currentCompany)}
                                {renderInput('residenceCity', 'Residence City', 'text', 60, cityRef, errors.residenceCity)}
                                {renderInput('grossAnnualIncome', 'Gross Annual Income', 'text', 15, grossAnnualIncomeRef, errors.grossAnnualIncome, true)}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STAGE 3: Employment Type */}
                    {stage === 3 && (
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
                            {errors.employmentType && <p className="text-xs mt-2 text-red-600">{errors.employmentType.message}</p>}
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STAGE 4: Gross Annual Turnover */}
                    {stage === 4 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Gross Annual Turnover?
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {grossAnnualTurnoverOptions.map(option => (
                                    <RadioOption key={option} fieldName="grossAnnualTurnover" value={option} display={option} currentWatchedValue={watchGrossAnnualTurnover} />
                                ))}
                            </div>
                            {errors.grossAnnualTurnover && <p className="text-xs mt-2 text-red-600">{errors.grossAnnualTurnover.message}</p>}
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STAGE 5: Years in Current Business */}
                    {stage === 5 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Years in Current Business
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {businessVintageOptions.map(option => (
                                    <RadioOption key={option} fieldName="yearsInBusiness" value={option} display={option} currentWatchedValue={watchYearsInBusiness} />
                                ))}
                            </div>
                            {errors.yearsInBusiness && <p className="text-xs mt-2 text-red-600">{errors.yearsInBusiness.message}</p>}
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STAGE 6: Reason for Loan */}
                    {stage === 6 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Select your reason to apply for this loan
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {loanReasonOptions.map(option => (
                                    <RadioOption key={option} fieldName="loanReason" value={option} display={option} currentWatchedValue={watchLoanReason} />
                                ))}
                            </div>
                            {errors.loanReason && <p className="text-xs mt-2 text-red-600">{errors.loanReason.message}</p>}
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STAGE 7: Business Details (Now with Dropdowns) */}
                    {stage === 7 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Business details!
                            </h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Enter your business details to get the right loan offers.
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderSelect('companyType', 'Company Type', companyTypeOptions, companyTypeRef, errors.companyType)}
                                {renderSelect('natureOfBusiness', 'Nature of business', natureOfBusinessOptions, natureOfBusinessRef, errors.natureOfBusiness)}
                                {renderSelect('industryType', 'Industry Type', industryTypeOptions, industryTypeRef, errors.industryType)}
                                {renderSelect('subIndustryType', 'Sub-Industry Type', currentSubIndustryOptions, subIndustryTypeRef, errors.subIndustryType)}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STAGE 8: Desired Loan Amount */}
                    {stage === 8 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Desired Loan Amount
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {desiredLoanAmountOptions.map(option => (
                                    <RadioOption key={option} fieldName="desiredLoanAmount" value={option} display={option} currentWatchedValue={watchDesiredLoanAmount} />
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

                    {/* STAGE 9: Additional Loan against assets (Now with dynamic checkboxes) */}
                    {stage === 9 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">
                                Additional loan against assets
                            </h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Get access to additional financing at attractive interest rates by pledging your assets such as Property, Gold, Car, or Mutual Funds. Do you wish to proceed?
                            </h1>
                            <div className="flex flex-col md:flex-row w-full gap-2">
                                <div className={`flex items-center flex-1 gap-3 py-3 px-4 rounded-xl border ${
                                    watchAdditionalLoan === 'yes' ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
                                } cursor-pointer`} onClick={() => setValue('additionalLoan', 'yes')}>
                                    <input type="radio" name="additionalLoan" value="yes" checked={watchAdditionalLoan === 'yes'} onChange={() => setValue('additionalLoan', 'yes')} className="w-5 h-5 accent-[#025FDA] cursor-pointer"/>
                                    <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">Yes</h1>
                                </div>
                                <div className={`flex items-center flex-1 gap-3 py-3 px-4 rounded-xl border ${
                                    watchAdditionalLoan === 'no' ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
                                } cursor-pointer`} onClick={() => setValue('additionalLoan', 'no')}>
                                    <input type="radio" name="additionalLoan" value="no" checked={watchAdditionalLoan === 'no'} onChange={() => setValue('additionalLoan', 'no')} className="w-5 h-5 accent-[#025FDA] cursor-pointer"/>
                                    <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">No</h1>
                                </div>
                            </div>
                            {errors.additionalLoan && <p className="text-xs mt-2 text-red-600">{errors.additionalLoan.message}</p>}

                            {watchAdditionalLoan === 'yes' && (
                                <div className="mt-5">
                                    <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-3">
                                        What asset would you like to pledge? <span className="text-[#6E6D6D]">[Select all that apply]</span>
                                    </h1>
                                    <div className="flex flex-col gap-3">
                                        {pledgeableAssets.map(asset => (
                                            <CheckboxOption key={asset} value={asset} display={asset} />
                                        ))}
                                    </div>
                                    {errors.pledgeAssets && <p className="text-xs mt-2 text-red-600">{errors.pledgeAssets.message}</p>}
                                </div>
                            )}

                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STAGE 10: Final Success Page */}
                    {stage === 10 && (
                        <div className="w-full max-w-[500px] text-center">
                            <img src={tickdone} alt="Success" className="w-20 h-20 mx-auto mb-5"/>
                            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-3xl md:text-4xl mb-3 text-[#025FDA]">Application Submitted!</h1>
                            <p className="text-lg text-[#6E6D6D]">Your Business Loan application is being processed.</p>
                            <p className="text-lg text-[#6E6D6D] mt-2">We will contact you shortly with personalized offers.</p>
                            <button onClick={() => setStage(1)} className="mt-8 py-3 px-6 rounded-xl text-white bg-[#003880] font-medium text-sm">Start New Application</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BusinessLoan_Index;