import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // ✅ for animations
import HeaderImg from "../assets/Images/applyloan.png";

import {ApiBaseUrl} from '../../apiservice'



const LoanFormModal = ({ isOpen, onClose, loanType }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    agree: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please accept terms and conditions.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Send request in correct DB format
      const response = await axios.post(
        `${ApiBaseUrl}/api/loan-applications/`,
        {
          full_name: formData.name,
          email_address: formData.email,
          contact_number: formData.contact,
          loan_type: loanType,
        }
      );

      console.log("✅ Loan Applied:", response.data);

      // Reset form
      setFormData({ name: "", email: "", contact: "", agree: false });
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Loan application failed:", error.response || error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[95%] md:w-[750px] lg:w-[850px] flex overflow-hidden">
        {/* Left side - image */}
        <div className="hidden md:block w-1/2 bg-[#003479] relative">
          <img
            src={HeaderImg}
            alt="Loan Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold text-[#003479] mb-6">
                Apply for {loanType} Loan
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#0160DD] outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#0160DD] outline-none"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                    pattern="[0-9]{10}"
                    maxLength="10"
                    required
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#0160DD] outline-none"
                  />
                </div>

                {/* Terms */}
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={formData.agree}
                    onChange={(e) =>
                      setFormData({ ...formData, agree: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#0160DD]"
                    required
                  />
                  I agree to the terms & conditions
                </label>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded-lg bg-[#0160DD] text-white font-semibold hover:bg-[#0047a3] transition disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            // ✅ Success message with animated tick
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* ✅ Animated Tick */}
              <motion.div
                className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-green-100"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>

              <h2 className="text-2xl font-bold text-[#003479]">
                Thank you for applying!
              </h2>
              <p className="text-gray-600">
                Your application has been submitted successfully. One of our
                representatives will reach out to you soon for your{" "}
                <span className="font-semibold">{loanType}</span> loan.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2 rounded-lg bg-[#0160DD] text-white font-semibold hover:bg-[#0047a3] transition"
              >
                Close
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanFormModal;
