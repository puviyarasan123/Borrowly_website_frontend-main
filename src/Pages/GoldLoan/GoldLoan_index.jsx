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
const goldLoanBenefits = [
    'Instant & Hassle-Free Gold Loan Approvals',
    'Unlock up to 75% of your gold\'s market value instantly',
    'Safe home valuation with complete transparency and no branch visit'
];

// --- Zod Schema for Gold Loan Flow (UPDATED) ---
const goldLoanSchema = z
    .object({
        mobile: z.string().regex(/^\d{10}$/, '10 digit mobile number required'),
        fullName: z.string().min(2, 'Full name required').max(80),
        // --- UPDATED: Validate for a FileList object with at least one file ---
        panCard: z.any().refine(val => val instanceof FileList && val.length > 0, 'PAN card file is required'),
        aadharCard: z.any().refine(val => val instanceof FileList && val.length > 0, 'Aadhar card file is required'),
        email: z.string().email('Invalid email format'),
        currentAddress: z.string().min(5, 'Current address required'),
        permanentAddress: z.string().min(5, 'Permanent address required'),
        loanAmount: z.string().min(1, 'Loan amount required'),
        goldWeight: z.string().min(1, 'Gold weight required'),
        termsAndConditions: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
    });

// --- NEW STAGE FLOW DEFINITION ---
const figmaStepFields = {
    1: ['mobile'],
    2: ['fullName', 'panCard', 'aadharCard', 'email', 'currentAddress', 'permanentAddress', 'loanAmount', 'goldWeight', 'termsAndConditions'],
};

const GoldLoan_Index = () => {
    const {
        register, handleSubmit, setValue, watch, getValues, trigger,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(goldLoanSchema),
        defaultValues: {
            mobile: '',
            fullName: '',
            panCard: null,
            aadharCard: null,
            email: '',
            currentAddress: '',
            permanentAddress: '',
            loanAmount: '',
            goldWeight: '',
            termsAndConditions: false,
        },
        mode: 'onChange',
    });

    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(1);
    const [focusedField, setFocusedField] = useState('');
    const [isSameAddress, setIsSameAddress] = useState(false);

    const mobileRef = useRef(null);
    const fullNameRef = useRef(null);
    const panCardRef = useRef(null);
    const aadharCardRef = useRef(null);
    const emailRef = useRef(null);
    const currentAddressRef = useRef(null);
    const permanentAddressRef = useRef(null);
    const loanAmountRef = useRef(null);
    const goldWeightRef = useRef(null);

    const watchedFields = watch();
    const {
        mobile: watchMobile,
        currentAddress: watchCurrentAddress,
        termsAndConditions: watchTermsAndConditions
    } = watchedFields;

    const mobileIsValid = /^\d{10}$/.test(watchMobile || '');

    const handleInputClick = useCallback((fieldName, ref) => {
        setFocusedField(fieldName);
        ref.current?.focus();
    }, []);

    const handleInputBlur = useCallback((fieldName, value) => {
        if (!value) setFocusedField('');
    }, []);

    const handleSameAddressChange = useCallback(() => {
        const newIsSameAddress = !isSameAddress;
        setIsSameAddress(newIsSameAddress);
        if (newIsSameAddress) {
            setValue('permanentAddress', getValues('currentAddress'), { shouldValidate: true, shouldDirty: true });
        } else {
            setValue('permanentAddress', '', { shouldValidate: true, shouldDirty: true });
        }
    }, [isSameAddress, getValues, setValue]);

    const goToPreviousStage = () => {
        if (stage > 1) {
            setStage((s) => s - 1);
        }
    };

    const onNext = async () => {
        const ok = await trigger(figmaStepFields[stage]);

        if (!ok) {
            console.log('Validation failed at Stage ' + stage, errors);
            return;
        }

        if (stage === 1) {
            setStage(2);
        }
    };

    const onFinalSubmit = (data) => {
        setLoading(true);
        console.log('Form Data (Final Submission):', data);

        setTimeout(() => {
            setLoading(false);
            setStage(3); // Final success screen
        }, 1500);
    };

    useEffect(() => {
        if (stage === 1 && mobileRef.current) mobileRef.current.focus();
        if (stage === 2 && fullNameRef.current) fullNameRef.current.focus();
    }, [stage]);

    // --- CORRECTED: The file upload component ---
    const renderUploadField = useCallback((fieldName, label, error) => {
        const fileList = watch(fieldName);
        const fileName = fileList && fileList.length > 0 ? fileList[0].name : null;

        return (
            <div className="w-full">
                {/* Hidden file input is now directly registered with react-hook-form */}
                <input
                    type="file"
                    id={`file-${fieldName}`}
                    {...register(fieldName)}
                    className="hidden"
                />

                <label
                    htmlFor={`file-${fieldName}`}
                    className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-4 pb-4 px-5 cursor-pointer flex items-center justify-between"
                >
                    <span className={`text-[16px] ${fileName ? 'text-black' : 'text-[#797979]'}`} style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}>
                        {fileName || label}
                    </span>
                    <span className="text-[#025FDA] text-sm">
                        {fileName ? 'Change' : 'Upload'}
                    </span>
                </label>
                {error && <p className="text-xs mt-1 text-red-600">{error.message}</p>}
            </div>
        );
    }, [watch, register]); // Dependency array updated

    const renderInput = useCallback((fieldName, label, type, maxLength, inputRef, error, isCurrency = false) => {
        const watchValue = watch(fieldName);

        const handleChange = (e) => {
            setValue(fieldName, e.target.value, { shouldValidate: true, shouldDirty: true });
        };

        const handleBlur = () => {
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
                            focusedField === fieldName || watchValue ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-sm text-[#797979]'
                        }`}
                        style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                    >
                        {label}
                    </p>
                    <input
                        {...register(fieldName)}
                        type={isCurrency ? 'text' : type}
                        maxLength={maxLength}
                        onClick={(e) => e.stopPropagation()}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={watchValue || ''}
                        ref={(e) => { register(fieldName).ref(e); inputRef.current = e; }}
                        onFocus={() => setFocusedField(fieldName)}
                        className="w-full bg-transparent outline-none text-base"
                        style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                        aria-invalid={error ? 'true' : 'false'}
                        disabled={fieldName === 'permanentAddress' && isSameAddress}
                    />
                </div>
                {error && <p className="text-xs mt-1 text-red-600">{error.message}</p>}
            </div>
        );
    }, [register, watch, setValue, getValues, focusedField, handleInputClick, handleInputBlur, isSameAddress]);


    return (
        <div className="h-[100dvh] flex flex-col md:flex-row">
            <LoanSidebar
                mainTitle="Borrowly"
                subTitle="Gold Loan"
                img={leftbannerimage}
                features={[
                    { title: 'Instant & Hassle-Free Gold Loan Approvals', description: 'Quick gold loan approvals from trusted RBI-registered NBFCs' },
                    { title: 'Safe Home Valuation by Verified Experts', description: 'Get up to 75% of your gold\'s market worth as a secure loan' },
                    { title: 'Highest Value, Full Trust', description: 'Home valuation by verified experts with full transparency' },
                ]}
            />

            <div className="p-5 md:p-10 h-full flex-1 flex flex-col">
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

                    {/* STAGE 1: Mobile Number (Figma 139) */}
                    {stage === 1 && (
                        <div className="w-full max-w-[500px] mx-auto">
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg md:text-xl">Unlock Exclusive Borrowly</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-3xl md:text-4xl mb-5">Gold Loan Offers</h1>
                            <hr className="py-0.5 bg-[#025FDA] w-full max-w-[120px] rounded-full border-[#025FDA] mt-2" />

                            <div className="mt-4 flex flex-col gap-3">
                                {goldLoanBenefits.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <div><img src={tickdone} alt="tick" className="w-5" /></div>
                                        <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm flex-1 text-black">{item}</h1>
                                    </div>
                                ))}
                            </div>

                            <div className="py-5">
                                <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-base mb-2">Phone Number</h1>

                                <div className="flex items-center w-full max-w-[500px] bg-[#F1F7FC] border border-[#D5ECFF] rounded-xl px-3 py-3 md:py-4 gap-3">
                                    <img src={IndiaIcon} alt="India" className="w-5 h-5 md:w-6 md:h-6" />
                                    <span className="text-gray-700 font-medium text-sm">+91</span>
                                    <div className="w-px h-6 bg-[#394249]" />
                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        placeholder="Enter mobile number"
                                        className="flex-1 bg-transparent outline-none text-gray-800 text-sm md:text-base"
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

                    {/* STAGE 2: Customer Application (Figma 172) */}
                    {stage === 2 && (
                        <form
                            onSubmit={handleSubmit(onFinalSubmit)}
                            className="w-full max-w-[500px] mx-auto p-4"
                        >
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg md:text-xl mb-5">Customer Application</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">Fill in your details to get started with your gold loan request.</h1>

                            <div className="flex flex-col gap-3 w-full">
                                {renderInput('fullName', 'Full Name (as per PAN)', 'text', 80, fullNameRef, errors.fullName)}
                                {renderUploadField('panCard', 'PAN Card', errors.panCard)}
                                {renderUploadField('aadharCard', 'Aadhar Number', errors.aadharCard)}
                                {renderInput('email', 'Email Address', 'email', 80, emailRef, errors.email)}
                                {renderInput('currentAddress', 'Current Address', 'text', 100, currentAddressRef, errors.currentAddress)}

                                {/* Same Address Checkbox */}
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={isSameAddress}
                                        onChange={handleSameAddressChange}
                                        className="w-4 h-4 accent-[#003880]"
                                    />
                                    <span className="text-sm">Same as Current Address</span>
                                </div>

                                {renderInput('permanentAddress', 'Permanent Address', 'text', 100, permanentAddressRef, errors.permanentAddress)}
                                {renderInput('loanAmount', 'Loan Amount (required)', 'text', 15, loanAmountRef, errors.loanAmount, true)}
                                {renderInput('goldWeight', 'Estimated Gold Weight (in grams)', 'text', 10, goldWeightRef, errors.goldWeight)}
                            </div>

                            <div className="flex items-center gap-2 mt-5">
                                <input
                                    {...register('termsAndConditions')}
                                    type="checkbox"
                                    checked={watchTermsAndConditions}
                                    className="w-4 h-4 accent-[#003880]"
                                />
                                <span className="text-sm">I agree to Borrowly's Terms & Privacy Policy</span>
                            </div>
                            {errors.termsAndConditions && <p className="text-xs mt-1 text-red-600">{errors.termsAndConditions.message}</p>}

                            <div className="w-full flex mt-5 mb-3">
                                <button type="submit" className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60" disabled={isSubmitting || loading}>
                                    {loading ? 'Processing...' : 'Proceed'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* STAGE 3: Final Success Page */}
                    {stage === 3 && (
                        <div className="w-full max-w-[500px] mx-auto text-center p-4">
                            <img src={tickdone} alt="Success" className="w-20 h-20 mx-auto mb-5" />
                            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-2xl md:text-4xl mb-3 text-[#025FDA]">Application Submitted!</h1>
                            <p className="text-base text-[#6E6D6D]">Your Gold Loan application is being processed.</p>
                            <p className="text-base text-[#6E6D6D] mt-2">We will contact you shortly with personalized offers.</p>
                            <button onClick={() => setStage(1)} className="mt-8 py-3 px-6 rounded-xl text-white bg-[#003880] font-medium text-sm">Start New Application</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GoldLoan_Index;