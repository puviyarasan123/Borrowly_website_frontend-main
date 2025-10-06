import React, { useEffect, useRef, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import BannerImage_1 from "../assets/Images/Signin_banner_1.avif";
import BannerImage_2 from "../assets/Images/Signin_banner_2.avif";
import BannerImage_3 from "../assets/Images/Signin_banner_3.avif";
import Logo from "/Company_icon.svg";

import { ApiBaseUrl } from "../../apiservice";

const images = [BannerImage_1, BannerImage_2, BannerImage_3];

const emailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const OTP_LENGTH = 6;
const RESEND_SECONDS = 28;

const AffiliateLogin = () => {
  const [current, setCurrent] = useState(0);
  const [stage, setStage] = useState(1); // 1=login,2=forgot,3=verify,4=reset
  const [resendTimer, setResendTimer] = useState(0);
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef(Array.from({ length: OTP_LENGTH }, () => React.createRef()));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [infoMessage, setInfoMessage] = useState(""); // success or info msgs
  const [forgotEmail, setForgotEmail] = useState(""); // email used for forgot/reset
  const [loading, setLoading] = useState(false); // general loader for actions
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", password: "" },
  });

  // Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Pick up browser autofill after mount
  useEffect(() => {
    // First try: small timeout then trigger validation (letting browser autofill finish)
    const t = setTimeout(async () => {
      try {
        // Read raw DOM values as a robust fallback (some browsers fill inputs without events)
        const emailEl = document.querySelector('input[type="email"]');
        const pwdEl = document.querySelector('input[type="password"]');

        if (emailEl?.value) {
          setValue("email", emailEl.value, { shouldValidate: true, shouldDirty: true });
        }
        if (pwdEl?.value) {
          setValue("password", pwdEl.value, { shouldValidate: true, shouldDirty: true });
        }

        // Trigger validation so RHF picks updated values (and resolver runs)
        await trigger();
      } catch (err) {
        // ignore
      }
    }, 350); // 350ms is usually enough; you can tweak if needed

    return () => clearTimeout(t);
  }, [trigger, setValue]);

  // Resend timer effect
  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(() => {
      setResendTimer((t) => (t <= 1 ? 0 : t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

  const handleOtpChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 1);
    setOtpValues((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
    if (val && idx < OTP_LENGTH - 1) otpRefs.current[idx + 1]?.current?.focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otpValues[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.current?.focus();
      setOtpValues((prev) => {
        const next = [...prev];
        next[idx - 1] = "";
        return next;
      });
    }
  };

  // LOGIN handler (keeps same behavior as before but surfaces error)
  const onSubmit = async (data) => {
    setLoginError("");
    setInfoMessage("");
    try {
      setLoading(true);
      const response = await fetch(`${ApiBaseUrl}/api/agents/AgentLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const msg = result?.message || `Login failed (${response.status})`;
        setLoginError(msg);
        return;
      }
      // success: handle token / redirect as desired
      setInfoMessage("Login successful.");
    } catch (error) {
      console.error("Network/login error", error);
      setLoginError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot password: request OTP
  const handleForgotSubmit = async () => {
    setLoginError("");
    setInfoMessage("");
    if (!forgotEmail) {
      setLoginError("Please enter your email.");
      return;
    }
    try {
      setLoading(true);
      // your backend expects GET with email query param
      const url = `${ApiBaseUrl}/api/agents/otp-change-request?email=${encodeURIComponent(forgotEmail)}`;
      const response = await fetch(url, { method: "GET" });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        // show backend message if provided
        const msg = body?.message || `Request failed (${response.status})`;
        setLoginError(msg);
        return;
      }
      // success => OTP generated
      setInfoMessage(body?.message || "OTP generated and sent. Check your email.");
      setResendTimer(RESEND_SECONDS);
      setStage(3); // move to verification
    } catch (err) {
      console.error(err);
      setLoginError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP: same endpoint
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setLoginError("");
    setInfoMessage("");
    if (!forgotEmail) {
      setLoginError("Email is required to resend OTP.");
      return;
    }
    try {
      setLoading(true);
      const url = `${ApiBaseUrl}/api/agents/otp-change-request?email=${encodeURIComponent(forgotEmail)}`;
      const response = await fetch(url, { method: "GET" });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        const msg = body?.message || `Resend failed (${response.status})`;
        setLoginError(msg);
        return;
      }
      setInfoMessage(body?.message || "OTP resent. Check your email.");
      setResendTimer(RESEND_SECONDS);
      setOtpValues(Array(OTP_LENGTH).fill(""));
    } catch (err) {
      console.error(err);
      setLoginError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setLoginError("");
    setInfoMessage("");
    const otp = otpValues.join("");
    if (otp.length !== OTP_LENGTH) {
      setLoginError("Please enter the full 6-digit code.");
      return;
    }
    try {
      setVerifyLoading(true);
      const response = await fetch(`${ApiBaseUrl}/api/agents/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, otp }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        // backend returns 400/404/401 with messages you listed
        const msg = body?.message || `Verification failed (${response.status})`;
        setLoginError(msg);
        return;
      }
      setInfoMessage(body?.message || "OTP verified. Please set your new password.");
      setStage(4);
    } catch (err) {
      console.error(err);
      setLoginError("Network error — please try again.");
    } finally {
      setVerifyLoading(false);
    }
  };

  // Reset password with OTP
  const handleResetPassword = async () => {
    setLoginError("");
    setInfoMessage("");
    const otp = otpValues.join("");
    if (!forgotEmail || !otp || !newPassword) {
      setLoginError("Email, OTP and new password are required.");
      return;
    }
    if (newPassword.length < 6) {
      setLoginError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setLoginError("Passwords do not match.");
      return;
    }

    try {
      setResetLoading(true);
      const response = await fetch(`${ApiBaseUrl}/api/agents/reset-password-with-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, otp, newPassword }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        const msg = body?.message || `Reset failed (${response.status})`;
        setLoginError(msg);
        return;
      }
      setInfoMessage(body?.message || "Password reset successfully. You can now log in.");
      // reset UI
      setStage(1);
      setNewPassword("");
      setConfirmPassword("");
      setOtpValues(Array(OTP_LENGTH).fill(""));
    } catch (err) {
      console.error(err);
      setLoginError("Network error — please try again.");
    } finally {
      setResetLoading(false);
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
        <div className="mt-4 flex md:flex-col gap-1.5 justify-center items-center md:items-start">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Show banner ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                current === index ? "bg-[#01367D]" : "bg-[#B7D1F5]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full flex-1 py-10 flex flex-col items-center justify-center p-6 md:p-12">
        <img src={Logo} className="w-[72px] md:w-[80px] mb-4" alt="Company logo" />
        <div className="text-center mb-6">
          <h1 className="text-[#052F5F] text-lg md:text-2xl leading-tight">
            {stage === 1 && "Agent Login to your account"}
            {stage === 2 && "Forgot Password"}
            {stage === 3 && "Verification"}
            {stage === 4 && "Reset Password"}
          </h1>
          <p className="text-[#7B7575 mx-auto text-[14px] mt-1">
            {stage === 1 && "Simple, fast, and secure access to your account"}
            {stage === 2 && "Enter your registered email to receive a reset code"}
            {stage === 3 && "Enter the 6-digit verification code sent to your email"}
            {stage === 4 && "Set your new password below"}
          </p>
        </div>

        {
          loginError === "Your account is awaiting approval. Please contact support." ? (
            <div className="w-full bg-[#fff4e5] border border-[#ffcc80] rounded-lg flex items-center justify-center text-center mb-6 max-w-[450px]">
              <p className="text-[#b36b00] py-3 text-sm">{loginError}</p>
            </div>
          ) :  loginError && (
            <div className="w-full bg-[#ffe5e5] border border-[#ffb3b3] rounded-lg flex items-center justify-center text-center mb-6 max-w-[450px]">
              <p className="text-red-700 py-3 text-sm">{loginError}</p>
            </div>
          )
        }

        {!loginError && infoMessage && (
          <div className="w-full bg-[#dff5e0] border border-[#b6e3b8] rounded-lg flex items-center justify-center text-center mb-6 max-w-[450px]">
            <p className="text-green-700 py-3 text-sm">{infoMessage}</p>
          </div>
        )}

        {/* Stage 1: Email Login */}
        {stage === 1 && (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[450px]">
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full border border-[#D5ECFF] rounded-xl px-3 py-3 mb-3 bg-[#F1F7FC]"
              {...register("email")}
              onChange={() => setLoginError("")}
            />
            {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>}

            <input
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full border border-[#D5ECFF] rounded-xl px-3 py-3 mb-3 bg-[#F1F7FC]"
              {...register("password")}
              onChange={() => setLoginError("")}
            />
            {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password.message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#003880] text-white font-medium"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="w-full flex justify-between items-center mt-3 text-sm max-w-[450px] mx-auto">
              <div className="flex gap-1">
                <p className="text-[#6E6D6D]">Don’t have an account?</p>
                <Link to="/register" className="text-[#015EDA] cursor-pointer">Register</Link>
              </div>
              <p onClick={() => { setStage(2); setInfoMessage(""); setLoginError(""); }}
                 className="text-[#015EDA] cursor-pointer">
                Forgot Password?
              </p>
            </div>
          </form>
        )}

        {/* Stage 2: Forgot Password */}
        {stage === 2 && (
          <div className="w-full max-w-[450px]">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-[#D5ECFF] rounded-xl px-3 py-3 mb-3 bg-[#F1F7FC]"
              value={forgotEmail}
              onChange={(e) => { setForgotEmail(e.target.value); setLoginError(""); setInfoMessage(""); }}
            />
            <button
              onClick={handleForgotSubmit}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#003880] text-white font-medium"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <p onClick={() => { setStage(1); setForgotEmail(""); setLoginError(""); setInfoMessage(""); }}
               className="text-sm text-[#015EDA] mt-3 cursor-pointer text-center">
              Back to Login
            </p>
          </div>
        )}

        {/* Stage 3: OTP */}
        {stage === 3 && (
          <div className="w-full max-w-[450px]">
            <div className="flex gap-2 justify-center">
              {otpValues.map((v, i) => (
                <input
                  key={i}
                  ref={otpRefs.current[i]}
                  value={v}
                  onChange={(e) => handleOtpChange(e, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  className="w-[48px] h-[48px] rounded-lg bg-[#EFEFEF] text-center text-lg outline-none"
                  inputMode="numeric"
                  maxLength={1}
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={otpValues.join("").length !== OTP_LENGTH || verifyLoading}
              className="w-full py-3 mt-4 rounded-xl bg-[#003880] text-white font-medium"
            >
              {verifyLoading ? "Verifying..." : "Verify"}
            </button>

            <div className="text-center mt-3 text-sm text-[#6E6D6D]">
              Didn’t get the code?
              <button
                onClick={handleResendOtp}
                disabled={resendTimer > 0 || loading}
                className={`ml-2 font-medium ${resendTimer > 0 ? "text-gray-400 cursor-not-allowed" : "text-[#015EDA]"}`}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : loading ? "Resending..." : "Resend"}
              </button>
            </div>

            <p
              onClick={() => { setStage(2); setOtpValues(Array(OTP_LENGTH).fill("")); setInfoMessage(""); setLoginError(""); }}
              className="text-sm text-[#015EDA] mt-3 cursor-pointer text-center"
            >
              Back
            </p>
          </div>
        )}

        {/* Stage 4: Reset Password */}
        {stage === 4 && (
          <div className="w-full max-w-[450px]">
            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-[#D5ECFF] rounded-xl px-3 py-3 mb-3 bg-[#F1F7FC]"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-[#D5ECFF] rounded-xl px-3 py-3 mb-3 bg-[#F1F7FC]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              disabled={resetLoading}
              className="w-full py-3 rounded-xl bg-[#003880] text-white font-medium"
            >
              {resetLoading ? "Resetting..." : "Submit"}
            </button>
            <p onClick={() => { setStage(1); setNewPassword(""); setConfirmPassword(""); setOtpValues(Array(OTP_LENGTH).fill("")); setForgotEmail(""); }}
               className="text-sm text-[#015EDA] mt-3 cursor-pointer text-center">
              Back to Login
            </p>
          </div>
        )}
        {stage === 4 && <>
          <div className="w-full mt-5 flex items-center justify-center">
            <p className="w-full max-w-[450px] text-xs text-center text-[#6E6D6D] leading-snug">
              By logging in, you agree to the following
              <br />
              <span className="text-[#015EDA] cursor-pointer">Credit Report Terms of Use, Terms of Use</span> and{" "}
              <span className="text-[#015EDA] cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </>}
      </div>
    </div>
  );
};

export default AffiliateLogin;
