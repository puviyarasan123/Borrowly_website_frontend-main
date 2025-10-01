import React, { useState, useRef, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import banner from "../assets/Images/AgentBanner.avif";
import Logo from "/Company_icon.svg";
import IndiaIcon from '../assets/Images/IndiaIcon.svg';

const steps = [
  { id: 1, title: "Account", subtitle: "Stage 1" },
  { id: 2, title: "Profile", subtitle: "Stage 2" },
  { id: 3, title: "KYC", subtitle: "Stage 3" },
  { id: 4, title: "Terms", subtitle: "Stage 4" },
];

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/i;
const aadharRegex = /^\d{12}$/;
const passportRegex = /^[A-PR-WY][0-9]{7}$/i;
const pincodeRegex = /^\d{6}$/;

const schema = z.object({
  fullName: z
    .string()
    .min(2, 'Enter your full name')
    .max(100, 'Name too long')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name contains invalid characters'),
  email: z.string().email('Enter a valid email address'),
  mobile: z
    .string()
    .min(10, 'Enter a 10 digit mobile number')
    .max(10, 'Enter a 10 digit mobile number')
    .regex(/^\d{10}$/, 'Mobile must contain only digits'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long'),
  professionType: z.enum(
    ["salaried", "self-employed", "business", "freelancer", "student"],
    { required_error: "Select your profession type" }
  ),
  GovtID: z
    .string()
    .min(5, 'Enter a valid Govt ID')
    .max(20, 'Govt ID too long')
    .refine(
      (val) => panRegex.test(val) || aadharRegex.test(val) || passportRegex.test(val),
      { message: 'Enter a valid PAN, Aadhaar (12 digits) or Passport number' }
    ),
  doorNo: z.string().min(1, 'Enter Door / House number').max(100, 'Too long'),
  Referred: z.string().min(1, 'Enter Referral Code ').max(100, 'Too long'),
  state: z.string().min(2, 'Enter state').max(100, 'State name too long'),
  City: z.string().min(2, 'Enter City').max(100, 'City name too long'),
  pincode: z.string().regex(pincodeRegex, 'Pincode must be 6 digits'),

  
  panImage: z
    .any()
    .refine((files) => files && files.length > 0, { message: "PAN image is required" }),
  aadharImage: z
    .any()
    .refine((files) => files && files.length > 0, { message: "Aadhar image is required" }),
  selfie: z
    .any()
    .refine((files) => files && files.length > 0, { message: "Selfie is required" }),
});

export default function AgentRegistrationWithSteps() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    getValues,
    watch,
    trigger
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      professionType: '',
      GovtID: '',
      doorNo: '',
      state: '',
      City: '',
      pincode: '',
      Referred: '',
      
      panImage: null,
      aadharImage: null,
      selfie: null,
    },
  });

  const inputRefs = useRef({
    fullName: null,
    mobile: null,
    email: null,
    password: null,
    professionType: null,
    GovtID: null,
    doorNo: null,
    state: null,
    City: null,
    pincode: null,
    panImage: null,
    aadharImage: null,
    selfie: null,
  });

  // register objects for text fields
  const regFullName = register('fullName');
  const regMobile = register('mobile');
  const regEmail = register('email');
  const regPassword = register('password');
  const regProfessionType = register('professionType');
  const regGovtID = register('GovtID');
  const regDoorNo = register('doorNo');
  const regState = register('state');
  const regCity = register('City');
  const regPincode = register('pincode');
  const regReferred = register('Referred');

  // watch files for previews
  const panFiles = watch("panImage");
  const aadharFiles = watch("aadharImage");
  const selfieFiles = watch("selfie");

  const filePreviews = useMemo(() => {
    const makePreviews = (fileList) => {
      if (!fileList || fileList.length === 0) return [];
      return Array.from(fileList).map((f) => ({ name: f.name, url: URL.createObjectURL(f) }));
    };
    return {
      pan: makePreviews(panFiles),
      aadhar: makePreviews(aadharFiles),
      selfie: makePreviews(selfieFiles),
    };
  }, [panFiles, aadharFiles, selfieFiles]);

  // revoke object URLs on unmount
  useEffect(() => {
    return () => {
      ["pan", "aadhar", "selfie"].forEach((k) => {
        (filePreviews[k] || []).forEach((p) => URL.revokeObjectURL(p.url));
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePreviews.pan.length, filePreviews.aadhar.length, filePreviews.selfie.length]);

  // set FileList into RHF
  const handleFileChange = (e, fieldName) => {
    const files = e.target.files;
    setValue(fieldName, files, { shouldValidate: true, shouldDirty: true });
  };

  // helper to attach register ref + keep local ref
  const attachRef = (registerObj, fieldName) => (el) => {
    if (registerObj && typeof registerObj.ref === 'function') {
      registerObj.ref(el);
    } else if (registerObj) {
      registerObj(el);
    }
    inputRefs.current[fieldName] = el;
  };

  const [activeStep, setActiveStep] = useState(1);
  const [focusedField, setFocusedField] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleDivClick = (fieldKey) => {
    setFocusedField(fieldKey);
    const el = inputRefs.current?.[fieldKey];
    if (el && typeof el.focus === 'function') {
      el.focus();
      if (typeof el.setSelectionRange === 'function') {
        const len = (el.value?.length) ? el.value.length : 0;
        try { el.setSelectionRange(len, len); } catch (e) { /* ignore */ }
      }
    }
  };

  const toggleShowPassword = () => setShowPassword(s => !s);

  const onSubmitForm = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof FileList) {
        if (data[key].length > 0) {
          formData.append(key, data[key][0]); 
        }
      } else {
        formData.append(key, data[key]);
      }
    });
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };
  

  const fullNameVal = watch('fullName');
  const emailVal = watch('email');
  const passwordVal = watch('password');

  const stepFieldMap = {
    1: ['fullName','mobile','email','password'],
    2: ['professionType','GovtID','doorNo','state','City','pincode'],
    3: ['panImage','aadharImage','selfie'],
    4: [],
  };

  const handleNext = async () => {
    const fields = stepFieldMap[activeStep] || [];

    if (fields.length === 0) {
      if (activeStep === steps.length) {
        handleSubmit(onSubmitForm)();
      } else {
        setActiveStep(s => Math.min(s + 1, steps.length));
      }
      return;
    }

    const ok = await trigger(fields);
    if (ok) {
      if (activeStep === steps.length) {
        handleSubmit(onSubmitForm)();
      } else {
        setActiveStep(s => Math.min(s + 1, steps.length));
      }
    } else {
      const firstErrorField = Object.keys(errors)[0];
      const el = inputRefs.current?.[firstErrorField];
      if (el && typeof el.focus === 'function') el.focus();
    }
  };

  const handleBack = () => setActiveStep(s => Math.max(1, s - 1));

  const [referralVerified,setreferralverified]=useState(false)

  const handleVerify = () => {
  const code = getValues('Referred');
    if (code === "BORROWLY2025") {
      setreferralverified(true)
    } 
  };
  

  return (
    <div className="flex flex-col-reverse lg:flex-row  lg:h-[100dvh] cursor-default">
      <div className="bg-gradient-to-br from-[#013F92] to-[#015FDC] pt-10 lg:w-full lg:max-w-[600px] flex items-end">
        <img src={banner} alt="agent banner" className="w-full md:h-[90%] object-contain select-none"/>
      </div>

      <div className=" p-5 md:p-8 flex items-center mx-auto w-full overflow-scroll md:max-w-[900px] lg:max-w-[800px] justify-center">
        <div className="w-full md:max-w-[650px] lg:max-w-[550px]">
          <img src={Logo} alt="logo" className="w-24 md:w-28 h-auto mb-2 " />
          <p style={{ fontFamily: "PovetaracSansBold, sans-serif" }} className="text-[#8D909A] md:text-lg mb-1">
            Become a Borrowly Agent
          </p>
          <h1 style={{ fontFamily: "PovetaracSansBlack, sans-serif" }} className="text-[#052F5F]  text-2xl md:text-4xl leading-tight font-black">
            Create new account.
          </h1>
          <p style={{ fontFamily: "PovetaracSansBold, sans-serif" }} className="text-[#8D909A] mb-6 md:text-lg ">
            Already a Member?{" "}
            <Link to="/" className="text-[#1E8FFE] font-medium underline-offset-2 hover:underline">
              Log In
            </Link>
          </p>

          <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex flex-col items-start flex-1">
                <div className={`w-8 h-8 md:w-10 md:h-10 text-sm rounded-lg flex items-center justify-center ${activeStep >= step.id ? "bg-blue-600 text-white" : "bg-[#929EB7] text-[#fbfbfb]"}`}>
                  {step.id}
                </div>
                <span className="mt-2 text-xs font-medium text-[#8D909A]">{step.subtitle}</span>
                <span className="mt-1 text-sm font-medium text-black">{step.title}</span>
                {index < steps.length - 1 && (
                  <div className="absolute top-4 md:top-5 left-0 w-full h-0.5 bg-[#cfd6e4] -z-10">
                    <div className="h-0.5 bg-blue-600"
                      style={{
                        width: activeStep > step.id ? "100%" : activeStep === step.id ? "70%" : "0%",
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {activeStep === 1 && (
            <form onSubmit={handleSubmit(onSubmitForm)} className="mt-10 flex flex-col gap-3">
              {/* Full name */}
              <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text" onClick={() => handleDivClick('fullName')}>
                <p className={`absolute left-5 transition-all duration-200 ${focusedField === 'fullName' || fullNameVal ? "top-2 text-xs text-[#797979]" : "top-1/2 -translate-y-1/2 text-[14px] text-[#797979]"}`} style={{ fontFamily: "PovetaracSansBold, sans-serif" }}>
                  Full legal name
                </p>
                <input
                  {...regFullName}
                  ref={attachRef(regFullName, 'fullName')}
                  type="text"
                  style={{ fontFamily: "PovetaracSansBold, sans-serif" }}
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => !getValues('fullName') && setFocusedField('')}
                  className="w-full bg-transparent outline-none text-[18px]"
                  aria-invalid={errors.fullName ? 'true' : 'false'}
                />
              </div>
              {errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}

              {/* Mobile */}
              <div className="flex items-center w-full bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg px-3 py-3 md:py-4 gap-3 cursor-text" onClick={() => handleDivClick('mobile')}>
                <img src={IndiaIcon} alt="India" className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-gray-700 font-medium text-sm">+91</span>
                <div className="w-px h-6 bg-[#D5ECFF]" />

                <input
                  {...regMobile}
                  ref={attachRef(regMobile, 'mobile')}
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter mobile number"
                  className="flex-1 bg-transparent outline-none text-gray-800 text-lg"
                  aria-label="Mobile number"
                  aria-invalid={errors.mobile ? 'true' : 'false'}
                  maxLength={10}
                  onFocus={() => setFocusedField('mobile')}
                  onBlur={() => !getValues('mobile') && setFocusedField('')}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    const val = el.value.replace(/[^0-9]/g, '');
                    el.value = val.slice(0, 10);
                    setValue('mobile', el.value, { shouldValidate: true, shouldDirty: true });
                  }}
                />
              </div>
              {errors.mobile && <p className="text-xs text-red-600">{errors.mobile.message}</p>}

              {/* Email */}
              <div
                className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                onClick={() => handleDivClick('email')}
              >
                <p
                  className={`absolute left-5 transition-all duration-200 ${focusedField === 'email' || emailVal ? "top-2 text-xs text-[#797979]" : "top-1/2 -translate-y-1/2 text-[14px] text-[#797979]"}`}
                  style={{ fontFamily: "PovetaracSansBold, sans-serif" }}
                >
                  Email
                </p>
                <input
                  {...regEmail}
                  ref={attachRef(regEmail, 'email')}
                  type="text"
                  style={{ fontFamily: "PovetaracSansBold, sans-serif" }}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => !getValues('email') && setFocusedField('')}
                  className="w-full bg-transparent outline-none text-[18px]"
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
              </div>
              {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}

              {/* Password */}
              <div
                className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text"
                onClick={() => handleDivClick('password')}
              >
                <p
                  className={`absolute left-5 transition-all duration-200 ${focusedField === 'password' || passwordVal ? "top-2 text-xs text-[#797979]" : "top-1/2 -translate-y-1/2 text-[14px] text-[#797979]"}`}
                  style={{ fontFamily: "PovetaracSansBold, sans-serif" }}
                >
                  Password
                </p>
                <div className="relative">
                  <input
                    {...regPassword}
                    ref={attachRef(regPassword, 'password')}
                    type={showPassword ? "text" : "password"}
                    style={{ fontFamily: "PovetaracSansBold, sans-serif" }}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => !getValues('password') && setFocusedField('')}
                    className="w-full bg-transparent outline-none text-[18px] pr-10"
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggleShowPassword(); }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-0.5 top-1 cursor-pointer -translate-y-1/2 p-1"
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}

              <div className="flex justify-end items-center mt-4">
                <div className="flex items-end gap-2">
                  <button type="button" onClick={handleNext} className="flex cursor-pointer  p-2 items-center bg-[#1E8FFE] rounded-full text-white font-medium">
                    <p className="px-3">Next</p>
                    <div className="w-8 h-8 bg-white text-[#1E8FFE] flex items-center justify-center rounded-full">→</div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeStep === 2 && (
            <form onSubmit={handleSubmit(onSubmitForm)} className="mt-10 flex flex-col gap-3">
              <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-pointer" onClick={() => handleDivClick('professionType')}>
                <p className={`absolute left-5 transition-all duration-200  ${focusedField === 'professionType' || getValues('professionType')
                    ? "top-2 text-xs text-[#797979]": "top-1/2 -translate-y-1/2 text-[14px] text-[#797979]"}`} style={{ fontFamily: "PovetaracSansBold, sans-serif" }}>
                  Profession Type
                </p>
                <div className="relative">
                  <select {...regProfessionType} ref={attachRef(regProfessionType, 'professionType')} onFocus={() => setFocusedField('professionType')} onBlur={() => !getValues('professionType') && setFocusedField('')} className="w-full bg-transparent outline-none text-[18px] appearance-none pr-8">
                    <option value="" disabled hidden></option>
                    <option value="salaried">Salaried</option>
                    <option value="self-employed">Self Employed</option>
                    <option value="business">Business Owner</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="student">Student</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              {errors.professionType && <p className="text-xs text-red-600">{errors.professionType.message}</p>}

              <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text" onClick={() => handleDivClick('GovtID')}>
                <p className={`absolute left-5 transition-all duration-200 ${focusedField === 'GovtID' || getValues('GovtID') ? "top-2 text-xs text-[#797979]" : "top-1/2 -translate-y-1/2 text-[14px] text-[#797979]"}`} style={{ fontFamily: "PovetaracSansBold, sans-serif" }}>
                  PAN / Govt ID
                </p>
                <input
                  {...regGovtID}
                  ref={attachRef(regGovtID, 'GovtID')}
                  type="text"
                  style={{ fontFamily: "PovetaracSansBold, sans-serif" }}
                  onFocus={() => setFocusedField('GovtID')}
                  onBlur={() => !getValues('GovtID') && setFocusedField('')}
                  className="w-full bg-transparent outline-none text-[18px]"
                  aria-invalid={errors.GovtID ? 'true' : 'false'}
                />
              </div>
              {errors.GovtID && <p className="text-xs text-red-600">{errors.GovtID.message}</p>}

              {/* Door / House No. */}
              <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text" onClick={() => handleDivClick('doorNo')}>
                <p className={`absolute left-5 transition-all duration-200 ${focusedField === 'doorNo' || getValues('doorNo') ? "top-2 text-xs text-[#797979]" : "top-1/2 -translate-y-1/2 text-[14px] text-[#797979]"}`} style={{ fontFamily: "PovetaracSansBold, sans-serif" }}>
                  Door / House No.
                </p>
                <input
                  {...regDoorNo}
                  ref={attachRef(regDoorNo, 'doorNo')}
                  type="text"
                  style={{ fontFamily: "PovetaracSansBold, sans-serif" }}
                  onFocus={() => setFocusedField('doorNo')}
                  onBlur={() => !getValues('doorNo') && setFocusedField('')}
                  className="w-full bg-transparent outline-none text-[18px]"
                  aria-invalid={errors.doorNo ? 'true' : 'false'}
                />
              </div>
              {errors.doorNo && <p className="text-xs text-red-600">{errors.doorNo.message}</p>}

              {/* State / City */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text" onClick={() => handleDivClick('state')}>
                    <p className={`absolute left-5 transition-all duration-200 ${focusedField === 'state' || getValues('state') ? "top-2 text-xs text-[#797979]" : "top-1/2 -translate-y-1/2 text-[14px] text-[#797979]"}`} style={{ fontFamily: "PovetaracSansBold, sans-serif" }}>
                      State
                    </p>
                    <input
                      {...regState}
                      ref={attachRef(regState, 'state')}
                      type="text"
                      style={{ fontFamily: "PovetaracSansBold, sans-serif" }}
                      onFocus={() => setFocusedField('state')}
                      onBlur={() => !getValues('state') && setFocusedField('')}
                      className="w-full bg-transparent outline-none text-[18px]"
                      aria-invalid={errors.state ? 'true' : 'false'}
                    />
                  </div>
                  {errors.state && <p className="text-xs text-red-600">{errors.state.message}</p>}
                </div>
                <div className="flex-1">
                  <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text" onClick={() => handleDivClick('City')}>
                    <p className={`absolute left-5 transition-all duration-200 ${focusedField === 'City' || getValues('City') ? "top-2 text-xs text-[#797979]" : "top-1/2 -translate-y-1/2 text-[14px] text-[#797979]"}`} style={{ fontFamily: "PovetaracSansBold, sans-serif" }}>
                      City
                    </p>
                    <input
                      {...regCity}
                      ref={attachRef(regCity, 'City')}
                      type="text"
                      style={{ fontFamily: "PovetaracSansBold, sans-serif" }}
                      onFocus={() => setFocusedField('City')}
                      onBlur={() => !getValues('City') && setFocusedField('')}
                      className="w-full bg-transparent outline-none text-[18px]"
                      aria-invalid={errors.City ? 'true' : 'false'}
                    />
                  </div>
                  {errors.City && <p className="text-xs text-red-600">{errors.City.message}</p>}
                </div>
              </div>

              {/* Pincode */}
              <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text" onClick={() => handleDivClick('pincode')}>
                <p className={`absolute left-5 transition-all duration-200 ${focusedField === 'pincode' || getValues('pincode') ? "top-2 text-xs text-[#797979]" : "top-1/2 -translate-y-1/2 text-[14px] text-[#797979]"}`} style={{ fontFamily: "PovetaracSansBold, sans-serif" }}>
                  Pincode
                </p>
                <input
                  {...regPincode}
                  ref={attachRef(regPincode, 'pincode')}
                  type="tel"
                  inputMode="numeric"
                  maxLength={6}
                  style={{ fontFamily: "PovetaracSansBold, sans-serif" }}
                  onFocus={() => setFocusedField('pincode')}
                  onBlur={() => !getValues('pincode') && setFocusedField('')}
                  className="w-full bg-transparent outline-none text-[18px]"
                  aria-invalid={errors.pincode ? 'true' : 'false'}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    const val = el.value.replace(/[^0-9]/g, '');
                    el.value = val.slice(0,6);
                    setValue('pincode', el.value, { shouldValidate: true, shouldDirty: true });
                  }}
                />
              </div>
              {errors.pincode && <p className="text-xs text-red-600">{errors.pincode.message}</p>}

              <div className="flex justify-between items-center mt-4">
                 <button type="button" onClick={handleBack} className="flex cursor-pointer p-2 items-center rounded-full font-medium bg-white border-[#1E8FFE] text-[#1E8FFE]">
                  <div className="w-8 h-8 bg-[#1E8FFE] text-white flex items-center justify-center rounded-full">←</div>
                  <p className="px-3">Back</p>
                </button>

                <div className="flex items-end gap-2">
                  <button type="button" onClick={handleNext} className="flex cursor-pointer  p-2 items-center bg-[#1E8FFE] rounded-full text-white font-medium">
                    <p className="px-3">Next</p>
                    <div className="w-8 h-8 bg-white text-[#1E8FFE] flex items-center justify-center rounded-full">→</div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeStep === 3 && (
             <form onSubmit={handleSubmit(onSubmitForm)} className="mt-10">
      {/* PAN upload */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-800 mb-2">PAN image (front)</h3>
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 rounded-lg border-dashed border-2 border-gray-300 py-3 px-3 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {filePreviews.pan.length > 0 ? (
                <div className="flex items-center gap-2">
                  <img src={filePreviews.pan[0].url} alt="pan" className="w-12 h-8 object-cover rounded" />
                  <div className="text-xs">{filePreviews.pan[0].name}</div>
                </div>
              ) : (
                <>
                  Files here to upload
                  <div className="text-xs text-gray-400">or choose from your device</div>
                </>
              )}
            </div>

            <input
              id="panImage"
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleFileChange(e, "panImage")}
              className="hidden"
              aria-hidden="true"
              ref={(el) => (inputRefs.current.panImage = el)}
            />
            <label htmlFor="panImage" className="ml-3 px-5 py-2 bg-[#E7E7E7] rounded-md text-sm cursor-pointer">
              Browse files
            </label>
          </div>
        </div>
        {errors.panImage && <p className="text-xs text-red-600 mt-1">{errors.panImage.message}</p>}
      </div>

      {/* Aadhar */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-800 mb-2">Aadhar image (Front and Back)</h3>
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 rounded-lg border-dashed border-2 border-gray-300 py-3 px-3 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {filePreviews.aadhar.length > 0 ? (
                <div className="flex items-center gap-2">
                  {filePreviews.aadhar.map((p, idx) => (
                    <img key={idx} src={p.url} alt={`aadhar-${idx}`} className="w-12 h-8 object-cover rounded" />
                  ))}
                  <div className="text-xs">{aadharFiles && aadharFiles.length} file(s) selected</div>
                </div>
              ) : (
                <>
                  Files here to upload
                  <div className="text-xs text-gray-400">or choose from your device</div>
                </>
              )}
            </div>

            <input
              id="aadharImage"
              type="file"
              accept="image/*,application/pdf"
              multiple
              onChange={(e) => handleFileChange(e, "aadharImage")}
              className="hidden"
              aria-hidden="true"
              ref={(el) => (inputRefs.current.aadharImage = el)}
            />
            <label htmlFor="aadharImage" className="ml-3 px-5 py-2 bg-[#E7E7E7] rounded-md text-sm cursor-pointer">
              Browse files
            </label>
          </div>
        </div>
        {errors.aadharImage && <p className="text-xs text-red-600 mt-1">{errors.aadharImage.message}</p>}
      </div>

      {/* Selfie */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-800 mb-2">Selfie / liveness check</h3>
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 rounded-lg border-dashed border-2 border-gray-300 py-3 px-3 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {filePreviews.selfie.length > 0 ? (
                <div className="flex items-center gap-2">
                  <img src={filePreviews.selfie[0].url} alt="selfie" className="w-12 h-12 object-cover rounded-full" />
                  <div className="text-xs">{filePreviews.selfie[0].name}</div>
                </div>
              ) : (
                <>
                  Files here to upload
                  <div className="text-xs text-gray-400">or choose from your device</div>
                </>
              )}
            </div>

            <input
              id="selfie"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "selfie")}
              className="hidden"
              aria-hidden="true"
              ref={(el) => (inputRefs.current.selfie = el)}
            />
            <label htmlFor="selfie" className="ml-3 px-5 py-2 bg-[#E7E7E7] rounded-md text-sm cursor-pointer">
              Browse files
            </label>
          </div>
        </div>
        {errors.selfie && <p className="text-xs text-red-600 mt-1">{errors.selfie.message}</p>}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
                <button type="button" onClick={handleBack} className="flex cursor-pointer p-2 items-center rounded-full font-medium bg-white border-[#1E8FFE] text-[#1E8FFE]">
                  <div className="w-8 h-8 bg-[#1E8FFE] text-white flex items-center justify-center rounded-full">←</div>
                  <p className="px-3">Back</p>
                </button>

        <button
          type="submit"
          onClick={handleNext}
          className="flex cursor-pointer p-2 items-center bg-[#1E8FFE] rounded-full text-white font-medium"
        >
          <p className="px-3">Next</p>
          <div className="w-8 h-8 bg-white text-[#1E8FFE] flex items-center justify-center rounded-full">→</div>
        </button>
      </div>
    </form>
          )}

          {activeStep === 4 && (
            <form onSubmit={handleSubmit(onSubmitForm)} className="mt-10">
             <div className="relative bg-[#F1F7FC] border border-[#D5ECFF] rounded-lg pt-6 pb-1 px-5 cursor-text" onClick={() => handleDivClick('Referred')}>
              <p className={`absolute left-5 transition-all duration-200 ${
                  focusedField === 'Referred' || getValues('Referred')
                    ? "top-2 text-xs text-[#797979]"
                    : "top-1/2 -translate-y-1/2 text-[14px] text-[#797979]"
                }`}
                style={{ fontFamily: "PovetaracSansBold, sans-serif" }}
              >
                Referred by
              </p>
            
              <div className="flex items-center">
                <input
                  {...regReferred}
                  ref={attachRef(regReferred, 'Referred')}
                  type="text"
                  style={{ fontFamily: "PovetaracSansBold, sans-serif" }}
                  onFocus={() => setFocusedField('Referred')}
                  onBlur={() => !getValues('Referred') && setFocusedField('')}
                  className="w-full bg-transparent outline-none text-[18px] pr-20"
                  aria-invalid={errors.Referred ? 'true' : 'false'}
                />
                {
                  referralVerified == true ?  <p className=" absolute right-5 top-1/2 -translate-y-1/2 text-xs text-green-600">Verified</p> : <button
                  type="button"
                  onClick={handleVerify}
                  className="absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 bg-[#1E8FFE] text-white text-sm px-6 py-2 rounded-md"
                >
                  Verify
                </button>
                }
              </div>
            </div>

            {
              referralVerified == true && <p className="text-xs mt-2 text-green-600">Referred by Kiran kumar</p>
            }
            
            {errors.Referred && (
              <p className="text-xs mt-2 text-red-600">{errors.Referred.message}</p>
            )}
            

              <div  style={{ fontFamily: "PovetaracSansBold, sans-serif" }} className="flex items-start gap-2 mt-4">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  By registering, you agree to our{" "}
                  <a href="/credit-report-terms" className="text-blue-600 underline">
                    Credit Report Terms
                  </a>
                  ,{" "}
                  <a href="/terms-of-use" className="text-blue-600 underline">
                    Terms of Use
                  </a>
                  , and{" "}
                  <a href="/privacy-policy" className="text-blue-600 underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <button type="button" onClick={handleBack} className="flex cursor-pointer p-2 items-center rounded-full font-medium bg-white border-[#1E8FFE] text-[#1E8FFE]">
                  <div className="w-8 h-8 bg-[#1E8FFE] text-white flex items-center justify-center rounded-full">←</div>
                  <p className="px-3">Back</p>
                </button>

                <button type="submit" disabled={isSubmitting} className="flex cursor-pointer p-2 items-center bg-[#1E8FFE] rounded-full text-white font-medium">
                  <p className="px-3">Finish</p>
                  <div className="w-8 h-8 bg-white text-[#1E8FFE] flex items-center justify-center rounded-full">✓</div>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
