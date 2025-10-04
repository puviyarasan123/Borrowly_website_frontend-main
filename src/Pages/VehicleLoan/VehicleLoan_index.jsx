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
const monthlyIncomeOptions = [
    'Below ₹25,000',
    '₹25,000 - ₹50,000',
    '₹50,000 - ₹75,000',
    '₹75,000 - ₹1,00,000',
    'Over ₹1,00,000',
];

const loanAmountOptions = [
    'Below ₹2,00,000',
    '₹2,00,000 - ₹5,00,000',
    '₹5,00,000 - ₹10,00,000',
    '₹10,00,000 - ₹20,00,000',
    'Above ₹20,00,000',
];

const tenureOptions = [
    '12 months',
    '24 months',
    '36 months',
    '48 months',
    '60 months',
    '72 months',
    '84 months',
];

const insuranceOptions = ['Yes', 'No'];

const vehicleTypes = ['New', 'Used'];
const employmentTypes = ['Salaried', 'Self-Employed Business', 'Self-Employed Professional'];
const relations = ['Father', 'Mother', 'Spouse', 'Sibling', 'Other'];
const contactMethods = ['Email', 'Phone Call', 'SMS', 'WhatsApp'];

// --- Zod Schema for Vehicle Loan Flow ---
const vehicleLoanSchema = z
    .object({
        mobile: z.string().regex(/^\d{10}$/, '10 digit mobile number required'),
        // Stage 2 Fields
        employmentType: z.string().nonempty('Please select an employment type'),
        // Stage 3 Fields
        fullName: z.string().min(2, 'Full name required').max(80),
        dateOfBirth: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, 'Date of Birth required (DD-MM-YYYY)'),
        monthlyIncome: z.string().nonempty('Please select your monthly income'),
        loanAmountRequired: z.string().nonempty('Please select a loan amount'),
        vehicleType: z.string().nonempty('Please select a vehicle type'),
        cityOfResidence: z.string().min(1, 'City required').max(60),
        // Stage 4 Fields
        panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number'),
        aadhaarNumber: z.string().regex(/^\d{12}$/, 'Invalid Aadhaar number'),
        emailAddress: z.string().email('Invalid email address'),
        currentAddress: z.string().min(1, 'Current address required'),
        permanentAddress: z.string().min(1, 'Permanent address required'),
        isSameAsCurrent: z.boolean().default(false),
        preferredContactMethod: z.string().nonempty('Preferred contact method is required'),
        // Stage 5 Fields
        vehicleIntent: z.string().nonempty('Vehicle intent is required'),
        vehicleMakeModel: z.string().min(1, 'Make & Model required'),
        vehicleVariantFuel: z.string().min(1, 'Variant/Fuel type required'),
        onRoadPrice: z.string().min(1, 'On-road price is required'),
        dealerName: z.string().min(1, 'Dealer name required'),
        dealerContact: z.string().min(1, 'Dealer contact required'),
        bookingAmount: z.string().min(1, 'Booking amount required'),
        registrationNumber: z.string().optional(),
        // Stage 6 Fields
        downPayment: z.string().min(1, 'Downpayment amount required'),
        desiredLoanAmount: z.string().min(1, 'Desired loan amount required'),
        tenurePreference: z.string().nonempty('Tenure preference required'),
        emiPreference: z.string().min(1, 'EMI preference required'),
        insuranceRequired: z.string().nonempty('Insurance requirement is required'),
        // Stage 7 Fields (Conditional)
        hasCoApplicant: z.string().default('no'),
        coApplicantRelation: z.string().optional(),
        coApplicantFullName: z.string().optional(),
        coApplicantPan: z.string().optional(),
        coApplicantAadhaar: z.string().optional(),
        coApplicantMonthlyIncome: z.string().optional(),
        coApplicantContact: z.string().optional(),
        coApplicantEmail: z.string().optional(),
        // Stage 3a/3b Fields
        companyName: z.string().optional(),
        designation: z.string().optional(),
        netMonthlyTakehome: z.string().optional(),
        yearsInEmployment: z.string().optional(),
        businessName: z.string().optional(),
        businessNature: z.string().optional(),
        annualTurnover: z.string().optional(),
        yearsInBusiness: z.string().optional(),
        // Stage 9 Fields (Documents - using optional() to make it part of schema)
        applicantPanCard: z.string().optional(),
        applicantAadhaarCard: z.string().optional(),
        salarySlips: z.string().optional(),
        recentBankStatement: z.string().optional(),
        applicantPhoto: z.string().optional(),
        cancelledCheque: z.string().optional(),
        proformaInvoice: z.string().optional(),
        coApplicantPanCard: z.string().optional(),
        coApplicantAadhaarCard: z.string().optional(),
        coApplicantIncomeProof: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        // Custom validation based on employment type
        if (data.employmentType === 'Salaried' || data.employmentType === 'Self-Employed Professional') {
            if (!data.companyName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Company name is required', path: ['companyName'] });
            if (!data.designation) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Designation is required', path: ['designation'] });
            if (!data.netMonthlyTakehome) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Net monthly take-home is required', path: ['netMonthlyTakehome'] });
            if (!data.yearsInEmployment) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Years in employment is required', path: ['yearsInEmployment'] });
        }
        if (data.employmentType === 'Self-Employed Business') {
            if (!data.businessName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Business name is required', path: ['businessName'] });
            if (!data.businessNature) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Business nature is required', path: ['businessNature'] });
            if (!data.annualTurnover) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Annual turnover is required', path: ['annualTurnover'] });
            if (!data.yearsInBusiness) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Years in business is required', path: ['yearsInBusiness'] });
        }
        if (data.hasCoApplicant === 'yes') {
            if (!data.coApplicantRelation) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Co-applicant relation is required', path: ['coApplicantRelation'] });
            if (!data.coApplicantFullName) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Co-applicant name is required', path: ['coApplicantFullName'] });
            if (!data.coApplicantPan) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Co-applicant PAN is required', path: ['coApplicantPan'] });
            if (!data.coApplicantAadhaar) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Co-applicant Aadhaar is required', path: ['coApplicantAadhaar'] });
            if (!data.coApplicantMonthlyIncome) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Co-applicant income is required', path: ['coApplicantMonthlyIncome'] });
            if (!data.coApplicantContact) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Co-applicant contact is required', path: ['coApplicantContact'] });
            if (!data.coApplicantEmail) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Co-applicant email is required', path: ['coApplicantEmail'] });
        }
    });

// --- NEW STAGE FLOW DEFINITION ---
const figmaStepFields = {
    1: ['mobile'],
    2: ['employmentType'],
    '3a': ['companyName', 'designation', 'netMonthlyTakehome', 'yearsInEmployment'],
    '3b': ['businessName', 'businessNature', 'annualTurnover', 'yearsInBusiness'],
    4: ['fullName', 'dateOfBirth', 'monthlyIncome', 'loanAmountRequired', 'vehicleType', 'cityOfResidence'],
    5: ['fullName', 'panNumber', 'aadhaarNumber', 'emailAddress', 'currentAddress', 'permanentAddress', 'preferredContactMethod'],
    6: ['vehicleIntent', 'vehicleMakeModel', 'vehicleVariantFuel', 'onRoadPrice', 'dealerName', 'dealerContact', 'bookingAmount', 'registrationNumber'],
    7: ['downPayment', 'desiredLoanAmount', 'tenurePreference', 'emiPreference', 'insuranceRequired'],
    8: ['hasCoApplicant', 'coApplicantRelation', 'coApplicantFullName', 'coApplicantPan', 'coApplicantAadhaar', 'coApplicantMonthlyIncome', 'coApplicantContact', 'coApplicantEmail'],
    9: ['applicantPanCard', 'applicantAadhaarCard', 'salarySlips', 'recentBankStatement', 'applicantPhoto', 'cancelledCheque', 'proformaInvoice', 'coApplicantPanCard', 'coApplicantAadhaarCard', 'coApplicantIncomeProof'],
    10: [], // Final Success Page
};

const VehicleLoan_Index = () => {
    const {
        register, handleSubmit, setValue, watch, getValues, trigger,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(vehicleLoanSchema),
        defaultValues: {
            mobile: '',
            employmentType: '',
            fullName: '',
            dateOfBirth: '',
            monthlyIncome: '',
            loanAmountRequired: '',
            vehicleType: '',
            cityOfResidence: '',
            panNumber: '',
            aadhaarNumber: '',
            emailAddress: '',
            currentAddress: '',
            permanentAddress: '',
            isSameAsCurrent: false,
            preferredContactMethod: '',
            vehicleIntent: 'New',
            vehicleMakeModel: '',
            vehicleVariantFuel: '',
            onRoadPrice: '',
            dealerName: '',
            dealerContact: '',
            bookingAmount: '',
            registrationNumber: 'N/A (New Vehicle)',
            downPayment: '',
            desiredLoanAmount: '',
            tenurePreference: '',
            emiPreference: '',
            insuranceRequired: '',
            hasCoApplicant: 'no',
            coApplicantRelation: '',
            coApplicantFullName: '',
            coApplicantPan: '',
            coApplicantAadhaar: '',
            coApplicantMonthlyIncome: '',
            coApplicantContact: '',
            coApplicantEmail: '',
            companyName: '',
            designation: '',
            netMonthlyTakehome: '',
            yearsInEmployment: '',
            businessName: '',
            businessNature: '',
            annualTurnover: '',
            yearsInBusiness: '',
            applicantPanCard: '',
            applicantAadhaarCard: '',
            salarySlips: '',
            recentBankStatement: '',
            applicantPhoto: '',
            cancelledCheque: '',
            proformaInvoice: '',
            coApplicantPanCard: '',
            coApplicantAadhaarCard: '',
            coApplicantIncomeProof: '',
        },
        mode: 'onChange',
    });

    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(1);
    const [focusedField, setFocusedField] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState({
        applicantPanCard: '',
        applicantAadhaarCard: '',
        salarySlips: '',
        recentBankStatement: '',
        applicantPhoto: '',
        cancelledCheque: '',
        proformaInvoice: '',
        coApplicantPanCard: '',
        coApplicantAadhaarCard: '',
        coApplicantIncomeProof: '',
    });

    const mobileRef = useRef(null);
    const companyNameRef = useRef(null);
    const designationRef = useRef(null);
    const netMonthlyTakehomeRef = useRef(null);
    const yearsInEmploymentRef = useRef(null);
    const businessNameRef = useRef(null);
    const businessNatureRef = useRef(null);
    const annualTurnoverRef = useRef(null);
    const yearsInBusinessRef = useRef(null);
    const fullNameRef = useRef(null);
    const dateOfBirthRef = useRef(null);
    const monthlyIncomeRef = useRef(null);
    const loanAmountRequiredRef = useRef(null);
    const cityOfResidenceRef = useRef(null);
    const panNumberRef = useRef(null);
    const aadhaarNumberRef = useRef(null);
    const emailAddressRef = useRef(null);
    const currentAddressRef = useRef(null);
    const permanentAddressRef = useRef(null);
    const preferredContactMethodRef = useRef(null);
    const vehicleMakeModelRef = useRef(null);
    const vehicleVariantFuelRef = useRef(null);
    const onRoadPriceRef = useRef(null);
    const dealerNameRef = useRef(null);
    const dealerContactRef = useRef(null);
    const bookingAmountRef = useRef(null);
    const registrationNumberRef = useRef(null);
    const downPaymentRef = useRef(null);
    const desiredLoanAmountRef = useRef(null);
    const tenurePreferenceRef = useRef(null);
    const emiPreferenceRef = useRef(null);
    const coApplicantRelationRef = useRef(null);
    const coApplicantFullNameRef = useRef(null);
    const coApplicantPanRef = useRef(null);
    const coApplicantAadhaarRef = useRef(null);
    const coApplicantMonthlyIncomeRef = useRef(null);
    const coApplicantContactRef = useRef(null);
    const coApplicantEmailRef = useRef(null);

    const watchedFields = watch();
    const {
        mobile: watchMobile,
        employmentType: watchEmploymentType,
        isSameAsCurrent: watchIsSameAsCurrent,
        hasCoApplicant: watchHasCoApplicant,
    } = watchedFields;

    const mobileIsValid = /^\d{10}$/.test(watchMobile || '');

    useEffect(() => {
        if (stage === 1 && mobileRef.current) mobileRef.current.focus();
        if (stage === 2 && document.getElementById('employmentType-Salaried')) document.getElementById('employmentType-Salaried').focus();
        if (stage === '3a' && companyNameRef.current) companyNameRef.current.focus();
        if (stage === '3b' && businessNameRef.current) businessNameRef.current.focus();
        if (stage === 4 && fullNameRef.current) fullNameRef.current.focus();
        if (stage === 5 && panNumberRef.current) panNumberRef.current.focus();
        if (stage === 6 && vehicleMakeModelRef.current) vehicleMakeModelRef.current.focus();
        if (stage === 7 && downPaymentRef.current) downPaymentRef.current.focus();
        if (stage === 8 && document.getElementById('hasCoApplicant-yes')) document.getElementById('hasCoApplicant-yes').focus();
    }, [stage]);

    useEffect(() => {
        if (watchIsSameAsCurrent) {
            setValue('permanentAddress', getValues('currentAddress'), { shouldValidate: true });
        }
    }, [watchIsSameAsCurrent, getValues, setValue]);

    const benefits = [
        { title: 'Personalized Vehicle Loan Offers', description: 'Compare loan options for cars, bikes, and EVs tailored to your needs' },
        { title: 'Instant Approval & Eligibility Check', description: 'Quickly know your loan amount and get faster approvals' },
        { title: 'Flexible Tenure & EMIs', description: 'Repay with comfort, up to 7 years of affordable installments' },
    ];

    const handleInputClick = (fieldName, ref) => {
        setFocusedField(fieldName);
        if (ref && ref.current) {
            ref.current.focus();
        }
    };

    const handleInputBlur = (fieldName, value) => {
        if (!value) setFocusedField('');
    };

    const goToPreviousStage = () => {
        if (stage === '3a' || stage === '3b') {
            setStage(2);
        } else if (stage === 4) {
            if (watchEmploymentType === 'Salaried' || watchEmploymentType === 'Self-Employed Professional') {
                setStage('3a');
            } else if (watchEmploymentType === 'Self-Employed Business') {
                setStage('3b');
            }
        } else if (stage > 1) {
            setStage((s) => s - 1);
        }
    };

    const onNext = async () => {
        let ok = false;
        let fieldsToValidate = [];

        if (stage === 2) {
            ok = await trigger(figmaStepFields[2]);
            if (ok) {
                if (watchEmploymentType === 'Salaried' || watchEmploymentType === 'Self-Employed Professional') {
                    setStage('3a');
                } else if (watchEmploymentType === 'Self-Employed Business') {
                    setStage('3b');
                }
            }
        } else if (stage === '3a') {
            fieldsToValidate = figmaStepFields['3a'];
            ok = await trigger(fieldsToValidate);
            if (ok) setStage(4);
        } else if (stage === '3b') {
            fieldsToValidate = figmaStepFields['3b'];
            ok = await trigger(fieldsToValidate);
            if (ok) setStage(4);
        } else {
            fieldsToValidate = figmaStepFields[stage];
            ok = await trigger(fieldsToValidate);
            if (ok) {
                if (stage === 9) {
                    await handleSubmit(onFinalSubmit)();
                } else {
                    setStage((s) => s + 1);
                }
            }
        }
    };

    const onFinalSubmit = (data) => {
        setLoading(true);
        console.log('Form Data (Final Submission):', data);
        // Include uploaded files in the submission data
        console.log('Uploaded Files:', uploadedFiles);

        setTimeout(() => {
            setLoading(false);
            setStage(10); // Success screen
        }, 1500);
    };

    const onFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFiles(prev => ({ ...prev, [fieldName]: file.name }));
            setValue(fieldName, file.name); // You can set the file name or a path if needed
        } else {
            setUploadedFiles(prev => ({ ...prev, [fieldName]: '' }));
            setValue(fieldName, '');
        }
    };

    const renderInput = (fieldName, label, type, maxLength, inputRef, error, isCurrency = false, isReadonly = false) => {
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
                            focusedField === fieldName || watchValue || isReadonly ? 'top-2 text-xs text-[#797979]' : 'top-1/2 -translate-y-1/2 text-[14px] text-[#797979]'
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
                        ref={(e) => { register(fieldName).ref(e); if (inputRef) inputRef.current = e; }}
                        onFocus={() => setFocusedField(fieldName)}
                        readOnly={isReadonly}
                        className="w-full bg-transparent outline-none text-[18px]"
                        style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                        aria-invalid={error ? 'true' : 'false'}
                    />
                </div>
                {error && <p className="text-xs mt-1 text-red-600">{error.message}</p>}
            </div>
        );
    };

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
                        onChange={(e) => setValue(fieldName, e.target.value, { shouldValidate: true, shouldDirty: true })}
                        value={watchValue || ''}
                        ref={(e) => { register(fieldName).ref(e); if (inputRef) inputRef.current = e; }}
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

    const renderTextRadioGroup = (fieldName, title, options, subtitle = '') => (
        <div className="flex flex-col gap-2">
            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">{title}</h1>
            {subtitle && <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">{subtitle}</h1>}
            <div className="flex flex-col gap-2">
                {options.map((option) => (
                    <div
                        key={option.value}
                        className={`flex flex-col gap-1 py-2 px-4 rounded-xl border ${
                            watch(fieldName) === option.value ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'
                        } cursor-pointer`}
                        onClick={() => setValue(fieldName, option.value, { shouldValidate: true, shouldDirty: true })}
                    >
                        <div className="flex items-center gap-3">
                            <input
                                {...register(fieldName)}
                                type="radio"
                                name={fieldName}
                                value={option.value}
                                checked={watch(fieldName) === option.value}
                                onChange={() => setValue(fieldName, option.value, { shouldValidate: true, shouldDirty: true })}
                                className="w-5 h-5 accent-[#025FDA] cursor-pointer"
                            />
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">
                                {option.display}
                            </h1>
                        </div>
                        {option.subtitle && <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm text-[#6E6D6D] ml-8">{option.subtitle}</h1>}
                    </div>
                ))}
            </div>
            {errors[fieldName] && <p className="text-xs mt-2 text-red-600">{errors[fieldName].message}</p>}
        </div>
    );
    
    // New component for file upload input
    const FileInput = ({ fieldName, label, error }) => {
        const fileInputRef = useRef(null);
        const fileName = uploadedFiles[fieldName];

        const handleClick = () => {
            fileInputRef.current?.click();
        };

        return (
            <div className="w-full">
                <label
                    htmlFor={fieldName}
                    className="flex items-center justify-between bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg px-5 py-3 cursor-pointer"
                    onClick={handleClick}
                >
                    <span className="text-[16px] text-[#333] font-medium" style={{ fontFamily: 'PovetaracSansbold' }}>{label}</span>
                    <span className="text-sm text-[#6E6D6D]">{fileName || 'Upload file'}</span>
                </label>
                <input
                    id={fieldName}
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => onFileChange(e, fieldName)}
                    aria-invalid={error ? 'true' : 'false'}
                />
                {error && <p className="text-xs mt-1 text-red-600">{error.message}</p>}
            </div>
        );
    };

    return (
        <div className="h-[100dvh] flex flex-col md:flex-row">
            <LoanSidebar
                mainTitle="Borrowly"
                subTitle="Vehicle Loan"
                img={leftbannerimage}
                features={benefits}
            />
            <div className="p-5 md:p-10 h-full flex-1">
                <div className="w-full items-center justify-end hidden md:flex">
                    <div className="flex flex-col lg:flex-row items-end gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                            <img src={famicons_call} alt="call icon" className="w-4 h-4" />
                            <div className="flex gap-3">
                                <a href="tel:18003134151">1800 313 4151</a> / <a href="tel:8980685509">89806 85509</a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <img src={iconoir_mail_solid} alt="mail icon" className="w-4 h-4" />
                            <a href="mailto:Support@Borrowly.in">Support@Borrowly.in</a>
                        </div>
                    </div>
                </div>

                <div className="flex-1 h-full flex items-center justify-center">
                    {stage === 1 && (
                        <div className="w-full max-w-[500px]">
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Unlock Exclusive Borrowly</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-3xl md:text-4xl mb-5">Vehicle Loan Offers</h1>
                            <hr className="py-0.5 bg-[#025FDA] w-full max-w-[120px] rounded-full border-[#025FDA] mt-2" />
                            <div className="mt-4 flex flex-col gap-3">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <img src={tickdone} alt="tick" className="w-4 h-4" />
                                        <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm flex-1 text-black">
                                            {benefit.description}
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

                    {stage === 2 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            {renderTextRadioGroup(
                                'employmentType',
                                'Employment Type',
                                [
                                    { value: 'Salaried', display: 'Salaried', subtitle: 'Received fixed amount of income every month' },
                                    { value: 'Self-Employed Business', display: 'Self-Employed Business', subtitle: 'Run a business' },
                                    { value: 'Self-Employed Professional', display: 'Self-Employed Professional', subtitle: 'Engage in a profession' },
                                ],
                                'Pick your job type to move ahead'
                            )}
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {stage === '3a' && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Income & Employment</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Share basic income details to process your loan request.
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderInput('companyName', 'Company Name', 'text', 80, companyNameRef, errors.companyName)}
                                {renderInput('designation', 'Designation', 'text', 80, designationRef, errors.designation)}
                                {renderInput('netMonthlyTakehome', 'Net monthly take-home', 'text', 15, netMonthlyTakehomeRef, errors.netMonthlyTakehome, true)}
                                {renderInput('yearsInEmployment', 'Years in employment', 'text', 20, yearsInEmploymentRef, errors.yearsInEmployment)}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {stage === '3b' && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Income & Employment</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Share basic income details to process your loan request.
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderInput('businessName', 'Business Name', 'text', 80, businessNameRef, errors.businessName)}
                                {renderInput('businessNature', 'Business Nature', 'text', 80, businessNatureRef, errors.businessNature)}
                                {renderInput('annualTurnover', 'Annual turnover (in lakhs)', 'text', 15, annualTurnoverRef, errors.annualTurnover)}
                                {renderInput('yearsInBusiness', 'Years in business', 'text', 20, yearsInBusinessRef, errors.yearsInBusiness)}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {stage === 4 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Quick Pre-Qualification</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Share basic details so we can instantly check your eligibility.
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderInput('fullName', 'Your Full Name', 'text', 80, fullNameRef, errors.fullName)}
                                {renderInput('dateOfBirth', 'Date of Birth (DD-MM-YYYY)', 'text', 10, dateOfBirthRef, errors.dateOfBirth)}
                                {renderInput('employmentType', 'Employment Type', 'text', 80, null, errors.employmentType, false, true)}
                                {renderSelect('monthlyIncome', 'Monthly Income Range', monthlyIncomeOptions, monthlyIncomeRef, errors.monthlyIncome)}
                                {renderSelect('loanAmountRequired', 'Loan Amount required', loanAmountOptions, loanAmountRequiredRef, errors.loanAmountRequired)}
                                {renderSelect('vehicleType', 'Vehicle Type', vehicleTypes, null, errors.vehicleType)}
                                {renderInput('cityOfResidence', 'City of Residence', 'text', 60, cityOfResidenceRef, errors.cityOfResidence)}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {stage === 5 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Applicant Identity & Contact</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Capture official IDs and contact details used for KYC.
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderInput('fullName', 'Full Name (as per PAN)', 'text', 80, fullNameRef, errors.fullName)}
                                {renderInput('panNumber', 'PAN Number', 'text', 10, panNumberRef, errors.panNumber)}
                                {renderInput('aadhaarNumber', 'Aadhaar Number', 'tel', 12, aadhaarNumberRef, errors.aadhaarNumber)}
                                {renderInput('emailAddress', 'Email Address', 'email', 80, emailAddressRef, errors.emailAddress)}
                                {renderInput('currentAddress', 'Current Address', 'text', 200, currentAddressRef, errors.currentAddress)}
                                <div className="flex items-center gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        id="isSameAsCurrent"
                                        checked={watchIsSameAsCurrent}
                                        onChange={(e) => setValue('isSameAsCurrent', e.target.checked)}
                                        className="w-4 h-4 accent-[#025FDA]"
                                    />
                                    <label htmlFor="isSameAsCurrent" className="text-sm text-[#6E6D6D]">Same as Current Address</label>
                                </div>
                                {renderInput('permanentAddress', 'Permanent Address', 'text', 200, permanentAddressRef, errors.permanentAddress)}
                                {renderSelect('preferredContactMethod', 'Preferred Contact Method', contactMethods, preferredContactMethodRef, errors.preferredContactMethod)}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {stage === 6 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Vehicle & Purchase Details</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Enter the vehicle details and purchase info to process the loan.
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderSelect('vehicleIntent', 'Vehicle Intent', vehicleTypes, null, errors.vehicleIntent)}
                                {renderInput('vehicleMakeModel', 'Make & Model', 'text', 80, vehicleMakeModelRef, errors.vehicleMakeModel)}
                                {renderInput('vehicleVariantFuel', 'Variant / Fuel type', 'text', 80, vehicleVariantFuelRef, errors.vehicleVariantFuel)}
                                {renderInput('onRoadPrice', 'On-road price / Seller quoted price', 'text', 15, onRoadPriceRef, errors.onRoadPrice, true)}
                                {renderInput('dealerName', 'Dealer name', 'text', 80, dealerNameRef, errors.dealerName)}
                                {renderInput('dealerContact', 'Dealer contact', 'tel', 15, dealerContactRef, errors.dealerContact)}
                                {renderInput('bookingAmount', 'Booking Amount (advance)', 'text', 15, bookingAmountRef, errors.bookingAmount, true)}
                                {renderInput('registrationNumber', 'Registration Number', 'text', 20, registrationNumberRef, errors.registrationNumber)}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {stage === 7 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Loan Preference & Payment Plan
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderInput('downPayment', 'Downpayment amount', 'text', 15, downPaymentRef, errors.downPayment, true)}
                                {renderInput('desiredLoanAmount', 'Desired Loan Amount', 'text', 15, desiredLoanAmountRef, errors.desiredLoanAmount, true)}
                                {renderSelect('tenurePreference', 'Tenure preference', tenureOptions, tenurePreferenceRef, errors.tenurePreference)}
                                {renderInput('emiPreference', 'EMI Preference (monthly)', 'text', 15, emiPreferenceRef, errors.emiPreference, true)}
                                {renderTextRadioGroup(
                                    'insuranceRequired',
                                    'Insurance requirement',
                                    [{ value: 'Yes', display: 'Yes' }, { value: 'No', display: 'No' }]
                                )}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {stage === 8 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Co-Applicant Details (Conditional)</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Financial & personal details of guarantor/parent
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                <div className="flex flex-row w-full gap-2">
                                    <div className={`flex items-center flex-1 gap-3 py-3 px-4 rounded-xl border ${watchHasCoApplicant === 'yes' ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'} cursor-pointer`} onClick={() => setValue('hasCoApplicant', 'yes')}>
                                        <input id="hasCoApplicant-yes" type="radio" name="hasCoApplicant" value="yes" checked={watchHasCoApplicant === 'yes'} onChange={() => setValue('hasCoApplicant', 'yes')} className="w-5 h-5 accent-[#025FDA] cursor-pointer" />
                                        <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">Yes</h1>
                                    </div>
                                    <div className={`flex items-center flex-1 gap-3 py-3 px-4 rounded-xl border ${watchHasCoApplicant === 'no' ? 'border-[#025FDA] bg-[#F0F6FF]' : 'border-[#C6C2C2]'} cursor-pointer`} onClick={() => setValue('hasCoApplicant', 'no')}>
                                        <input id="hasCoApplicant-no" type="radio" name="hasCoApplicant" value="no" checked={watchHasCoApplicant === 'no'} onChange={() => setValue('hasCoApplicant', 'no')} className="w-5 h-5 accent-[#025FDA] cursor-pointer" />
                                        <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-[16px]">No</h1>
                                    </div>
                                </div>
                                {errors.hasCoApplicant && <p className="text-xs mt-2 text-red-600">{errors.hasCoApplicant.message}</p>}
                            </div>
                            {watchHasCoApplicant === 'yes' && (
                                <div className="flex flex-col gap-3 w-full mt-4">
                                    {renderSelect('coApplicantRelation', 'Relation with applicant', relations, coApplicantRelationRef, errors.coApplicantRelation)}
                                    {renderInput('coApplicantFullName', 'Your Full Name', 'text', 80, coApplicantFullNameRef, errors.coApplicantFullName)}
                                    {renderInput('coApplicantPan', 'PAN Card', 'text', 10, coApplicantPanRef, errors.coApplicantPan)}
                                    {renderInput('coApplicantAadhaar', 'Aadhaar Number', 'tel', 12, coApplicantAadhaarRef, errors.coApplicantAadhaar)}
                                    {renderInput('coApplicantMonthlyIncome', 'Net monthly income (Rupees)', 'text', 15, coApplicantMonthlyIncomeRef, errors.coApplicantMonthlyIncome, true)}
                                    {renderInput('coApplicantContact', 'Contact details', 'tel', 15, coApplicantContactRef, errors.coApplicantContact)}
                                    {renderInput('coApplicantEmail', 'Email Address', 'email', 80, coApplicantEmailRef, errors.coApplicantEmail)}
                                </div>
                            )}
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {stage === 9 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Document Upload</h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Upload your KYC, income, and vehicle documents in one place.
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                <FileInput fieldName="applicantPanCard" label="Applicant PAN Card" error={errors.applicantPanCard} />
                                <FileInput fieldName="applicantAadhaarCard" label="Applicant Aadhaar Card" error={errors.applicantAadhaarCard} />
                                <FileInput fieldName="salarySlips" label="Salary Slips" error={errors.salarySlips} />
                                <FileInput fieldName="recentBankStatement" label="Recent Bank Statement" error={errors.recentBankStatement} />
                                <FileInput fieldName="applicantPhoto" label="Applicant Passport-size Photo" error={errors.applicantPhoto} />
                                <FileInput fieldName="cancelledCheque" label="Cancelled Cheque" error={errors.cancelledCheque} />
                                <FileInput fieldName="proformaInvoice" label="Proforma Invoice" error={errors.proformaInvoice} />
                                {watchHasCoApplicant === 'yes' && (
                                    <>
                                        <FileInput fieldName="coApplicantPanCard" label="Co-applicant PAN Card" error={errors.coApplicantPanCard} />
                                        <FileInput fieldName="coApplicantAadhaarCard" label="Co-applicant Aadhaar Card" error={errors.coApplicantAadhaarCard} />
                                        <FileInput fieldName="coApplicantIncomeProof" label="Co-applicant Income Proof" error={errors.coApplicantIncomeProof} />
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

                    {stage === 10 && (
                        <div className="w-full max-w-[500px] text-center">
                            <img src={tickdone} alt="Success" className="w-20 h-20 mx-auto mb-5" />
                            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-3xl md:text-4xl mb-3 text-[#025FDA]">Application Submitted!</h1>
                            <p className="text-lg text-[#6E6D6D]">Your Vehicle Loan application is being processed.</p>
                            <p className="text-lg text-[#6E6D6D] mt-2">We will contact you shortly with personalized offers.</p>
                            <button onClick={() => setStage(1)} className="mt-8 py-3 px-6 rounded-xl text-white bg-[#003880] font-medium text-sm">Start New Application</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VehicleLoan_Index;