import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/Icons/contact-banner.svg";
import SaveIcon from "../assets/Icons/SaveIcon.svg";

import {ApiBaseUrl} from '../../apiservice'
const BASE_URL = ApiBaseUrl()

// Animations
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const slideRight = {
  hidden: { opacity: 0, x: 24, scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function ContactUs() {
  const [formData, setFormData] = useState({
    loanStatus: "Yes",
    email: "",
    phone: "",
    question: "",
  });

  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false); // ✅ popup state

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Map frontend form → backend schema
      const payload = {
        phone_number: formData.phone,
        email_address: formData.email,
        message: formData.question,
        has_active_loan: formData.loanStatus === "Yes",
      };

      await axios.post(
        `${BASE_URL}/api/contact-us/`,
        payload
      );

      console.log("✅ Contact created:", payload);

      // Reset form
      setFormData({ loanStatus: "Yes", email: "", phone: "", question: "" });

      // Show popup
      setSuccessPopup(true);
    } catch (error) {
      console.error("❌ Contact form failed:", error.response || error);
      alert(
        error.response?.data?.error ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen cursor-default bg-white px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        className="text-center pb-12 md:pb-24"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <h1
          style={{ fontFamily: "PovetaracSansBlack" }}
          className="text-center mt-4 text-[36px] xl:text-[40px] leading-[1.1]"
        >
          Contact Us
        </h1>
        <p
          style={{ fontFamily: "PovetaracSansBold" }}
          className="mt-2 px-5 w-full max-w-[800px] text-[#797979] mx-auto text-[14px] md:text-lg"
        >
          Get in touch with us today—our team is ready to answer your questions
          <br className="hidden md:block" />
          and guide you toward the right financial solution.
        </p>
      </motion.div>

      {/* Main Grid */}
      <motion.div
        className="max-w-6xl mx-auto flex flex-col-reverse items-center md:items-start md:flex-row gap-8 sm:gap-12"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Left Column - Company Info */}
        <motion.div
          className="space-y-20 px-3 pt-8 md:pt-0 flex-1 text-gray-700"
          variants={slideLeft}
        >
          {/* Reach Us */}
          <motion.div variants={fadeUp}>
            <h2
              style={{ fontFamily: "PovetaracSansBlack" }}
              className="text-3xl font-semibold mb-3"
            >
              Reach us
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[#797979] font-semibold">CIN</p>
                <p className="text-black">U70200KA2023PTC176224</p>
              </div>
              <div>
                <p className="text-[#797979] font-semibold">Company Name</p>
                <p className="text-black">Wiseway Consultants Private Limited</p>
              </div>
              <div>
                <p className="text-[#797979] font-semibold">
                  Registered Office Address
                </p>
                <p className="text-black max-w-[450px]">
                 Site No. 2, H.L No. 786, First Floor, Near Bharath Petrol Bunk, Dhargha Mohalla, Old Madras Road, Dooravani Nagar, Bengaluru – 560016.
                </p>
              </div>
              <div>
                <p className="text-[#797979] font-semibold">Email ID</p>
                <p className="text-black">Support@Borrowly.in</p>
              </div>
              <div>
                <p className="text-[#797979] font-semibold">Contact No</p>
                <p className="text-black">+91-9494545792 | +91-9494545137</p>
              </div>
            </div>
          </motion.div>

          {/* Officer */}
          <motion.div variants={fadeUp}>
            <h2
              style={{ fontFamily: "PovetaracSansBlack" }}
              className="text-3xl font-semibold mb-3"
            >
              Grievance Redressal Officer
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[#797979] font-semibold">Name</p>
                <p className="text-black">Borrowly</p>
              </div>
              <div>
                <p className="text-[#797979] font-semibold">Address</p>
                <p className="text-black max-w-[450px]">
                 Site No. 2, H.L No. 786, First Floor, Near Bharath Petrol Bunk, Dhargha Mohalla, Old Madras Road, Dooravani Nagar, Bengaluru – 560016.
                </p>
              </div>
              <div>
                <p className="text-[#797979] font-semibold">Contact No</p>
                <p className="text-black">+91-7760657415</p>
              </div>
              <div>
                <p className="text-[#797979] font-semibold">Email ID</p>
                <p className="text-black">Support@Borrowly.in</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div
          className="bg-white w-full max-w-[500px] rounded-3xl shadow-lg overflow-hidden"
          variants={slideRight}
        >
          {/* Banner */}
          <div className="bg-cyan-500 text-white text-center relative">
            <div className="pt-8 px-4">
              <motion.h3
                style={{ fontFamily: "PovetaracSansBlack" }}
                className="text-3xl mb-4"
                variants={fadeUp}
              >
                Do you have
                <br /> any question?
              </motion.h3>
              <motion.p
                style={{ fontFamily: "PovetaracSansBold" }}
                className="text-black bg-white w-fit mx-auto py-3.5 text-sm px-7 rounded-full"
                variants={fadeUp}
              >
                Fill out the forms and we will answer all your questions
              </motion.p>
            </div>
            <motion.div
              className="flex justify-center -mt-2"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={img1} alt="Support Illustration" className="w-[280px]" />
            </motion.div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            {/* Loan Status */}
            <motion.div
              className="bg-[#F5F8FF] py-5 px-5 rounded-2xl"
              variants={fadeUp}
            >
              <p className="mb-2 text-gray-700 text-sm sm:text-base font-semibold">
                Do you have active loan?
              </p>
              <div className="flex mt-4 flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="loanStatus"
                    value="Yes"
                    checked={formData.loanStatus === "Yes"}
                    onChange={handleChange}
                  />
                  <span className="text-black text-[16px]">Yes, I have a loan</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="loanStatus"
                    value="No"
                    checked={formData.loanStatus === "No"}
                    onChange={handleChange}
                  />
                  <span className="text-black text-[16px]">No, I don’t have a loan</span>
                </label>
              </div>
            </motion.div>

            <motion.input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-5 rounded-xl bg-[#F5F8FF] focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
              variants={fadeUp}
            />

            <motion.input
              type="text"
              name="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-5 rounded-xl bg-[#F5F8FF] focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
              variants={fadeUp}
            />

            <motion.textarea
              name="question"
              placeholder="Write your question"
              value={formData.question}
              onChange={handleChange}
              rows="4"
              className="w-full p-5 rounded-xl bg-[#F5F8FF] focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
              variants={fadeUp}
            />

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer flex items-center justify-center space-x-2 bg-[#00C2CC] text-white py-4 rounded-full text-lg"
              variants={fadeUp}
              whileHover={{ y: -2, boxShadow: "0px 8px 20px rgba(0,0,0,0.12)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mt-1 text-xl">
                {loading ? "Saving..." : "Save"}
              </span>
              <img src={SaveIcon} alt="Save" className="w-6 h-6" />
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      {/* ✅ Success Popup */}
      <AnimatePresence>
        {successPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-[#003479] mb-4">
                Thank you for reaching out!
              </h2>
              <p className="text-gray-600 mb-6">
                Your query has been submitted successfully. Our customer care
                executive will call you within{" "}
                <span className="font-semibold">24 hours</span>.
              </p>
              <button
                onClick={() => setSuccessPopup(false)}
                className="px-6 py-2 rounded-lg bg-[#0160DD] text-white font-semibold hover:bg-[#0047a3] transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
