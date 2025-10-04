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
const VISA_STATUSES = ['Applied', 'Approved', 'Pending', 'Not Applicable'];

// --- Utility Functions for Stage 7 Calculations ---
const parseCurrency = (value) => {
    if (typeof value !== 'string') return 0;
    const num = parseFloat(value.replace(/[^0-9]/g, ''));
    return isNaN(num) ? 0 : num;
};

const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value) || value === 0) return '0';
    return value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

// --- Zod Schema ---
const educationLoanSchema = z
    .object({
        mobile: z.string().regex(/^\d{10}$/, '10 digit mobile number required'),
        studentFullName: z.string().min(2, 'Full name required').max(80),
        passportNumber: z.string().min(6, 'Passport number required').max(20),
        panCard: z.string().min(10, 'PAN required').max(10),
        aadharCard: z.string().min(12, 'Aadhar required').max(12),
        email: z.string().email('Invalid email format'),
        currentAddress: z.string().min(5, 'Current address required'),
        permanentAddress: z.string().min(5, 'Permanent address required'),
        emergencyContact: z.string().regex(/^\d{10}$/, '10 digit emergency contact required'),

        university: z.string().min(3, 'University name required'),
        courseName: z.string().min(2, 'Course name required'),
        courseDuration: z.string().min(1, 'Course duration required'),
        visaStatus: z.string().min(1, 'Visa status required'),
        lastQualification: z.string().min(2, 'Qualification required'),
        passedOutYear: z.string().regex(/^\d{4}$/, 'Year required'),
        ieltsScore: z.string().optional(),
        greGmatScore: z.string().optional(),

        tuitionFees: z.string().min(1, 'Tuition fees required'),
        livingExpenses: z.string().min(1, 'Living expenses required'),
        travelVisaExpenses: z.string().min(1, 'Travel/Visa expenses required'),
        insurance: z.string().min(1, 'Insurance cost required'),
        booksEquipment: z.string().min(1, 'Books/Equipment cost required'),
        proposedRepaymentTenure: z.string().min(1, 'Tenure required'),
        totalLoanRequired: z.string().optional(), 
        
        relationWithApplicant: z.string().min(1, 'Relation required'),
        coApplicantFullName: z.string().min(2, 'Co-Applicant name required'),
        coApplicantPan: z.string().min(10, 'PAN required').max(10),
        coApplicantAadhar: z.string().min(12, 'Aadhar required').max(12),
        occupationType: z.string().min(1, 'Occupation required'),
        monthlyIncome: z.string().min(1, 'Monthly income required'),
        annualIncome: z.string().min(1, 'Annual income required'),
        coApplicantAddress: z.string().min(5, 'Address required'),
        coApplicantContact: z.string().regex(/^\d{10}$/, '10 digit contact required'),

        admissionStatus: z.any().optional().refine(file => file && file.length > 0, "Admission Letter required"), 
        studentPassportDoc: z.any().optional().refine(file => file && file.length > 0, "Passport document required"), 
        studentVisaDoc: z.any().optional().refine(file => file && file.length > 0, "Visa document required"),
        admissionLetterDoc: z.any().optional().refine(file => file && file.length > 0, "Admission letter required"),
        feeStructureDoc: z.any().optional().refine(file => file instanceof FileList && file.length > 0, "Fee structure document required"),
        academicRecordsDoc: z.any().optional().refine(file => file && file.length > 0, "Academic records required"),
        coApplicantPanDoc: z.any().optional().refine(file => file && file.length > 0, "Co-applicant PAN required"),
        coApplicantAadharDoc: z.any().optional().refine(file => file && file.length > 0, "Co-applicant Aadhar required"),
        incomeProofDoc: z.any().optional().refine(file => file && file.length > 0, "Income proof required"),
    });

// --- NEW STAGE FLOW DEFINITION ---
const figmaStepFields = {
    1: ['mobile'],
    2: [], // Eligibility Check (Visual, no validation)
    3: ['studentFullName', 'passportNumber', 'panCard', 'aadharCard', 'email', 'currentAddress', 'permanentAddress', 'emergencyContact'],
    4: ['university', 'courseName', 'courseDuration', 'admissionStatus', 'visaStatus', 'lastQualification', 'passedOutYear'],
    5: ['relationWithApplicant', 'coApplicantFullName', 'coApplicantPan', 'coApplicantAadhar', 'occupationType', 'monthlyIncome', 'annualIncome', 'coApplicantAddress', 'coApplicantContact'],
    6: ['studentPassportDoc', 'studentVisaDoc', 'admissionLetterDoc', 'feeStructureDoc', 'academicRecordsDoc', 'coApplicantPanDoc', 'coApplicantAadharDoc', 'incomeProofDoc'],
    7: ['tuitionFees', 'livingExpenses', 'travelVisaExpenses', 'insurance', 'booksEquipment', 'proposedRepaymentTenure'],
};

const EducationLoan_Index = () => {
    // 1. FORM HOOKS (MUST BE FIRST)
    const {
        register, handleSubmit, setValue, watch, getValues, trigger,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(educationLoanSchema),
        defaultValues: {
            mobile: '', studentFullName: '', passportNumber: '', panCard: '', aadharCard: '', email: '',
            currentAddress: '', permanentAddress: '', emergencyContact: '', university: '', courseName: '',
            courseDuration: '', admissionStatus: null, visaStatus: '', lastQualification: '', passedOutYear: '',
            tuitionFees: '0', livingExpenses: '0', travelVisaExpenses: '0', insurance: '0', booksEquipment: '0', 
            proposedRepaymentTenure: '10 years', totalLoanRequired: '0',
            relationWithApplicant: '', coApplicantFullName: '', coApplicantPan: '', coApplicantAadhar: '',
            occupationType: '', monthlyIncome: '', annualIncome: '', coApplicantAddress: '', coApplicantContact: '',
            studentPassportDoc: null, studentVisaDoc: null, admissionLetterDoc: null, feeStructureDoc: null, 
            academicRecordsDoc: null, coApplicantPanDoc: null, coApplicantAadharDoc: null, incomeProofDoc: null,
        },
        mode: 'onChange',
    });

    // 2. STATE DECLARATIONS
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(1);
    const [focusedField, setFocusedField] = useState('');

    // 3. REF DECLARATIONS (All unconditional refs must be here)
    const mobileRef = useRef(null);
    const studentFullNameRef = useRef(null);
    const currentAddressRef = useRef(null);
    const universityRef = useRef(null);
    const coApplicantNameRef = useRef(null);
    const passportNumberRef = useRef(null);
    const panCardRef = useRef(null);
    const aadharCardRef = useRef(null);
    const emailRef = useRef(null);
    const permanentAddressRef = useRef(null);
    const emergencyContactRef = useRef(null);
    const courseNameRef = useRef(null);
    const courseDurationRef = useRef(null);
    const lastQualificationRef = useRef(null);
    const passedOutYearRef = useRef(null);
    const ieltsScoreRef = useRef(null);
    const greGmatScoreRef = useRef(null);
    const tuitionFeesRef = useRef(null);
    const livingExpensesRef = useRef(null);
    const travelVisaExpensesRef = useRef(null);
    const insuranceRef = useRef(null);
    const booksEquipmentRef = useRef(null);
    const proposedRepaymentTenureRef = useRef(null);
    const relationWithApplicantRef = useRef(null);
    const coApplicantPanRef = useRef(null);
    const coApplicantAadharRef = useRef(null);
    const occupationTypeRef = useRef(null);
    const monthlyIncomeRef = useRef(null);
    const annualIncomeRef = useRef(null);
    const coApplicantAddressRef = useRef(null);
    const coApplicantContactRef = useRef(null);

    // 4. WATCH VARIABLES
    const watchedFields = watch();
    const { 
        mobile: watchMobile, studentFullName: watchStudentFullName, 
        tuitionFees: watchTuitionFees, livingExpenses: watchLivingExpenses, 
        travelVisaExpenses: watchTravelVisaExpenses, insurance: watchInsurance, 
        booksEquipment: watchBooksEquipment, totalLoanRequired: watchTotalLoanRequired,
        university: watchUniversity, courseName: watchCourseName, admissionStatus: watchAdmissionStatus,
        dob: watchDob,
        studentPassportDoc: watchStudentPassportDoc, studentVisaDoc: watchStudentVisaDoc, 
        admissionLetterDoc: watchAdmissionLetterDoc, feeStructureDoc: watchFeeStructureDoc,
        academicRecordsDoc: watchAcademicRecordsDoc, coApplicantPanDoc: watchCoApplicantPanDoc,
        coApplicantAadharDoc: watchCoApplicantAadharDoc, incomeProofDoc: watchIncomeProofDoc,
    } = watchedFields;

    // 5. DERIVED VARIABLES
    const mobileIsValid = /^\d{10}$/.test(watchMobile || '');
    
    // 6. CALLBACKS
    const calculateTotalLoan = useCallback(() => {
        const fields = ['tuitionFees', 'livingExpenses', 'travelVisaExpenses', 'insurance', 'booksEquipment'];
        let total = 0;
        fields.forEach(field => {
            total += parseCurrency(getValues(field));
        });
        setValue('totalLoanRequired', formatCurrency(total), { shouldValidate: true });
    }, [getValues, setValue]);

    // 7. EFFECTS
    
    // Autofocus effect
    useEffect(() => {
        if (stage === 1 && mobileRef.current) mobileRef.current.focus();
        if (stage === 3 && studentFullNameRef.current) studentFullNameRef.current.focus();
        if (stage === 7) {
            document.getElementById('tuitionFees')?.focus();
            calculateTotalLoan();
        }
    }, [stage, calculateTotalLoan, studentFullNameRef]);

    // Currency calculation effect (Stabilized hook)
    useEffect(() => {
        if (stage === 7) {
            const subscription = watch(['tuitionFees', 'livingExpenses', 'travelVisaExpenses', 'insurance', 'booksEquipment'], calculateTotalLoan);
            return () => {
                if (typeof subscription.unsubscribe === 'function') {
                    subscription.unsubscribe();
                }
            };
        }
    }, [stage, watch, calculateTotalLoan]); 

    // --- Utility Functions ---
    const benefits = [
        'Education loans tailored for overseas studies',
        'Fast sanction to secure your admission on time',
        'All major education expenses covered',
    ];

    const handleInputClick = (fieldName, ref) => {
        setFocusedField(fieldName);
        ref.current?.focus();
    };

    const handleInputBlur = (fieldName, value) => {
        if (!value) setFocusedField('');
    }; 
    
    const goToPreviousStage = () => {
        if (stage === 7) { setStage(6); } 
        else if (stage === 3) { setStage(2); } 
        else if (stage === 2) { setStage(1); }
        else if (stage > 1) { setStage((s) => s - 1); }
    };
    
    const onNext = async () => {
        let ok;
        // Stage 2 (Eligibility check) is a static review, it doesn't need validation
        if (stage === 2) {
             setStage(3);
             return;
        }

        // For all other stages, trigger validation for the fields in that stage
        ok = await trigger(figmaStepFields[stage]);
        
        if (!ok) {
           console.log('Validation failed at Stage ' + stage, errors);
           return;
        }
        
        // This is the final data entry screen, so we proceed directly to the final submit handler.
        if (stage === 7) {
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
            setStage(8); // Success screen (now Stage 8)
        }, 1500);
    };

    // --- Reusable UI Components and Render Helper ---
    
    const renderInput = (fieldName, label, type, maxLength, inputRef, error, isCurrency = false) => {
        const watchValue = watch(fieldName);

        const handleChange = (e) => {
            if (isCurrency) {
                const raw = e.target.value.replace(/[^0-9]/g, '');
                setValue(fieldName, formatCurrency(parseCurrency(raw)), { shouldValidate: true, shouldDirty: true });
            } else {
                register(fieldName).onChange(e);
            }
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
                        value={watchValue || ''}
                        ref={(e) => { register(fieldName).ref(e); inputRef.current = e; }}
                        onFocus={() => setFocusedField(fieldName)}
                        onBlur={() => handleInputBlur(fieldName, getValues(fieldName))}
                        className="w-full bg-transparent outline-none text-[18px]"
                        style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}
                        aria-invalid={error ? 'true' : 'false'}
                    />
                </div>
                {error && <p className="text-xs mt-1 text-red-600">{error.message}</p>}
            </div>
        );
    };

    const renderStaticField = (label, value) => (
        <div className="w-full">
            <div className={`relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 ${label.includes('loan') ? 'font-black' : ''}`}>
                <p className={`absolute left-5 transition-all duration-200 top-2 text-xs text-[#797979]`} style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}>
                    {label}
                </p>
                <div className="w-full bg-transparent outline-none text-[18px] py-1" style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}>
                    {value}
                </div>
            </div>
        </div>
    );
    
    const renderUploadField = (fieldName, label, error) => {
        const fileList = watch(fieldName); 
        const fileName = fileList && fileList.length > 0 ? fileList[0].name : null; 

        return (
            <div className="w-full">
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
    };


    // --- Main Component Render ---
    return (
        <div className="h-[100dvh] flex flex-col md:flex-row">
            <LoanSidebar
                mainTitle="Borrowly"
                subTitle="Education Loan"
                img={leftbannerimage}
                features={[
                    { title: 'Study at Top Global & Indian Institutions', description: 'Finance tuition, living, travel, and exam fees with ease.' },
                    { title: 'Quick Eligibility Check & Fast Sanction', description: 'Get instant approval so you don\'t miss admission deadlines.' },
                    { title: 'Flexible Repayment Options', description: 'Repay comfortably after course completion with affordable EMIs.' },
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
                    
                    {/* STAGE 1: Mobile Number (Figma 175) */}
                    {stage === 1 && (
                         <div className="w-full max-w-[500px]">
                                                     <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg">Unlock Exclusive Borrowly</h1>
                                                     <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-3xl md:text-4xl mb-5">Education Loan Offers</h1>
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

                    {/* STAGE 2: Eligibility Check (Figma 177 - REVIEW SCREEN) */}
                    {stage === 2 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Eligibility Check
                            </h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Quick screening to confirm basic loan eligibility
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderStaticField('Student Full Name', 'Rahul Sharma')}
                                {renderStaticField('Date of Birth (DD-MM-YYYY)', '15-08-2002')}
                                {renderStaticField('Nationality', 'Indian')}
                                {renderStaticField('Country of study', 'United States')}
                                {renderStaticField('University/College Name', 'University of California, Los Angeles')}
                                {renderStaticField('Course Type', 'PG')}
                                {renderStaticField('Admission Status', 'Provisional')}
                                {renderStaticField('Expected Loan Amount', '35,00,000')}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STAGE 3: Student & Contact Details (Figma 178) */}
                    {stage === 3 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Student & Contact Details
                            </h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Capture student's identity and communication details
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderInput('studentFullName', 'Student Full Name', 'text', 80, studentFullNameRef, errors.studentFullName)}
                                {renderInput('passportNumber', 'Passport Number', 'text', 20, passportNumberRef, errors.passportNumber)}
                                {renderInput('panCard', 'PAN Card', 'text', 10, panCardRef, errors.panCard)}
                                {renderInput('aadharCard', 'Aadhar Card', 'number', 12, aadharCardRef, errors.aadharCard)}
                                {renderStaticField('Mobile Number', `+91 ${watchMobile}`)}
                                {renderInput('email', 'Email ID', 'email', 80, emailRef, errors.email)}
                                {renderInput('currentAddress', 'Current Address', 'text', 100, currentAddressRef, errors.currentAddress)}
                                {renderInput('permanentAddress', 'Permanent Address', 'text', 100, permanentAddressRef, errors.permanentAddress)}
                                {renderInput('emergencyContact', 'Emergency Contact', 'tel', 10, emergencyContactRef, errors.emergencyContact)}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* STAGE 4: Academic & Admission Details (Figma 179) */}
                    {stage === 4 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Academic & Admission Details
                            </h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Provide course, admission, and academic background
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderInput('university', 'University Name', 'text', 100, universityRef, errors.university)}
                                {renderInput('courseName', 'Course Name', 'text', 80, courseNameRef, errors.courseName)}
                                {renderInput('courseDuration', 'Course Duration', 'text', 20, courseDurationRef, errors.courseDuration)}

                                {/* Admission Status - UPLOAD FIELD */}
                                {renderUploadField('admissionStatus', 'Admission Letter', errors.admissionStatus)}

                                <div className="w-full">
                                    <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text">
                                        <p className={`absolute left-5 transition-all duration-200 top-2 text-xs text-[#797979]`} style={{ fontFamily: 'PovetaracSansBold, sans-serif' }}>Visa Status</p>
                                        <select {...register('visaStatus')} className="w-full bg-transparent outline-none text-[18px]" style={{ fontFamily: 'PovetaracSansBold, sans-serif' }} aria-invalid={errors.visaStatus ? 'true' : 'false'}>
                                            <option value="" hidden></option>
                                            {VISA_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                                        </select>
                                    </div>
                                    {errors.visaStatus && <p className="text-xs mt-1 text-red-600">{errors.visaStatus.message}</p>}
                                </div>

                                {renderInput('lastQualification', 'Last Qualification', 'text', 80, lastQualificationRef, errors.lastQualification)}
                                {renderInput('passedOutYear', 'Passed Out Year (YYYY)', 'number', 4, passedOutYearRef, errors.passedOutYear)}
                                {renderInput('ieltsScore', 'IELTS Score', 'number', 4, ieltsScoreRef, errors.ieltsScore)}
                                {renderInput('greGmatScore', 'GRE/GMAT Score', 'number', 4, greGmatScoreRef, errors.greGmatScore)}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* STAGE 5: Co-Applicant Details (Figma 181) */}
                    {stage === 5 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Co-Applicant Details (Mandatory)
                            </h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Financial & personal details of guarantor/parent
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderInput('relationWithApplicant', 'Relation with applicant', 'text', 30, relationWithApplicantRef, errors.relationWithApplicant)}
                                {renderInput('coApplicantFullName', 'Your full name', 'text', 80, coApplicantNameRef, errors.coApplicantFullName)}
                                {renderInput('coApplicantPan', 'Pan Card', 'text', 10, coApplicantPanRef, errors.coApplicantPan)}
                                {renderInput('coApplicantAadhar', 'Aadhar Number', 'number', 12, coApplicantAadharRef, errors.coApplicantAadhar)}
                                {renderInput('occupationType', 'Occupation Type', 'text', 50, occupationTypeRef, errors.occupationType)}
                                {renderInput('monthlyIncome', 'Monthly Income', 'text', 10, monthlyIncomeRef, errors.monthlyIncome)}
                                {renderInput('annualIncome', 'Annual Income', 'text', 10, annualIncomeRef, errors.annualIncome)}
                                {renderInput('coApplicantAddress', 'Address', 'text', 100, coApplicantAddressRef, errors.coApplicantAddress)}
                                {renderInput('coApplicantContact', 'Contact details', 'tel', 10, coApplicantContactRef, errors.coApplicantContact)}
                                {renderUploadField('incomeProofDoc', 'Upload Income Proof', errors.incomeProofDoc)}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* STAGE 6: Document Upload (Figma 182) */}
                    {stage === 6 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Document Upload
                            </h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Upload all supporting student and co-applicant documents
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderUploadField('studentPassportDoc', 'Student Passport', errors.studentPassportDoc)}
                                {renderUploadField('studentVisaDoc', 'Student Visa receipt', errors.studentVisaDoc)}
                                {renderUploadField('admissionLetterDoc', 'Admission letter', errors.admissionLetterDoc)}
                                {renderUploadField('feeStructureDoc', 'Fee Structure', errors.feeStructureDoc)}
                                {renderUploadField('academicRecordsDoc', 'Academic Records', errors.academicRecordsDoc)}
                                {renderUploadField('coApplicantPanDoc', 'Co-applicant PAN Card', errors.coApplicantPanDoc)}
                                {renderUploadField('coApplicantAadharDoc', 'Co-applicant Aadhar Card', errors.coApplicantAadharDoc)}
                                {renderUploadField('incomeProofDoc', 'Income proof', errors.incomeProofDoc)}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* STAGE 7: Loan Requirement & Expenses (Figma 180 - MOVED TO END) */}
                    {stage === 7 && (
                        <div className="w-full max-w-[500px] cursor-default">
                            <div className="mb-4 flex items-center w-fit gap-1 cursor-pointer" onClick={goToPreviousStage}>
                                <IoIosArrowBack size={20} /><p>Back</p>
                            </div>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-lg mb-5">
                                Loan Requirement & Expenses
                            </h1>
                            <h1 style={{ fontFamily: 'PovetaracSansbold' }} className="text-sm mb-5 text-[#6E6D6D]">
                                Breakdown of education costs and requested amount
                            </h1>
                            <div className="flex flex-col gap-3 w-full">
                                {renderInput('tuitionFees', 'Tuition fees', 'text', 12, tuitionFeesRef, errors.tuitionFees, true)}
                                {renderInput('livingExpenses', 'Living expenses', 'text', 10, livingExpensesRef, errors.livingExpenses, true)}
                                {renderInput('travelVisaExpenses', 'Travel & Visa expenses', 'text', 10, travelVisaExpensesRef, errors.travelVisaExpenses, true)}
                                {renderInput('insurance', 'Insurance', 'text', 10, insuranceRef, errors.insurance, true)}
                                {renderInput('booksEquipment', 'Books & equipment', 'text', 10, booksEquipmentRef, errors.booksEquipment, true)}

                                {/* Derived/Total Loan Required Field */}
                                {renderStaticField('Total loan requested', `₹${watchTotalLoanRequired}`)}

                                {renderInput('proposedRepaymentTenure', 'Proposed repayment tenure', 'text', 10, proposedRepaymentTenureRef, errors.proposedRepaymentTenure)}
                            </div>
                            <div className="w-full flex mt-5 mb-3">
                                <button type="button" onClick={onNext} className="w-full max-w-[500px] cursor-pointer py-4 rounded-xl text-white bg-[#003880] font-medium text-sm disabled:opacity-60">
                                    Proceed
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* STAGE 8: Final Success/Confirmation Screen (old Stage 9) */}
                    {stage === 8 && (
                        <div className="w-full max-w-[500px] text-center">
                            <img src={tickdone} alt="Success" className="w-20 h-20 mx-auto mb-5"/>
                            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-3xl md:text-4xl mb-3 text-[#025FDA]">Application Submitted!</h1>
                            <p className="text-lg text-[#6E6D6D]">Your Education Loan application is being processed.</p>
                            <p className="text-lg text-[#6E6D6D] mt-2">We will contact you shortly with the outcome of the eligibility check.</p>
                            <button onClick={() => setStage(1)} className="mt-8 py-3 px-6 rounded-xl text-white bg-[#003880] font-medium text-sm">Start New Application</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EducationLoan_Index;