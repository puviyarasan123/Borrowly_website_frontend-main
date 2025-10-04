import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import CIBIL_Home_image from "../assets/Images/CIBIL_Home_image_new.avif";

import {ApiBaseUrl} from '../../apiservice'


const Footer_subscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupType, setPopupType] = useState(null); // ✅ success | exists | null

  const handleSubscribe = async () => {
    if (!email) return;

    try {
      setLoading(true);

      await axios.post(
        `${ApiBaseUrl}/api/newsletter`,
        { email_address: email }
      );

      setEmail("");
      setPopupType("success"); // ✅ success popup
    } catch (error) {
      console.error("❌ Subscription failed:", error.response || error);

      if (error.response?.status === 400) {
        setPopupType("exists"); // ⚠️ already subscribed popup
      } else {
        alert(
          error.response?.data?.error ||
            "Something went wrong. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-gradient-to-r from-[#08325D] to-[#1D6390]">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center lg:items-center px-5 gap-8">
        {/* Left Section */}
        <div className="flex-1 flex flex-col gap-4 justify-center text-center lg:text-left">
          <h1
            style={{ fontFamily: "PovetaracSansBlack" }}
            className="mt-2 text-[28px] lg:text-[32px] xl:text-[38px] leading-[1.2] text-white"
          >
            Launching soon Borrowly app – your loan journey made simple.
          </h1>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <img
              src="/Apple_download.svg"
              alt="Apple Download"
              className="w-[140px] sm:w-[150px]"
            />
            <img
              src="/Google_download.svg"
              alt="Google Download"
              className="w-[140px] sm:w-[150px]"
            />
          </div>

          <div>
            <p
              style={{ fontFamily: "PovetaracSansBold" }}
              className="mt-2 text-white max-w-[800px] text-[14px] sm:text-[15px] lg:text-[16px] xl:text-lg text-center lg:text-left"
            >
              or get the link on your phone
            </p>

            <div
              style={{ fontFamily: "PovetaracSansBold" }}
              className="bg-white flex flex-col sm:flex-row items-center mx-auto lg:mx-0 gap-2 w-full sm:w-fit mt-3 rounded-lg shadow-md border border-gray-200 p-2"
            >
              <div className="flex-1 w-full max-w-[500px]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 outline-none text-gray-700 placeholder-gray-400 rounded-md"
                  required
                />
              </div>
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-[#0CC066] cursor-pointer hover:bg-[#0aa956] transition text-white px-5 py-2 rounded-lg w-full sm:w-auto disabled:opacity-50"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
          <img
            src={CIBIL_Home_image}
            alt="Borrowly App Preview"
            className="w-full max-w-[350px] sm:max-w-[450px]"
          />
        </div>
      </div>

      {/* ✅ Popup Handler */}
      <AnimatePresence>
        {popupType && (
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
              {/* ✅ Success Popup */}
              {popupType === "success" && (
                <>
                  <motion.div
                    className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-green-100"
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
                  <h2 className="text-2xl font-bold text-[#003479] mb-4">
                    Subscription Successful!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    You’re now subscribed to our newsletter. 🎉 <br />
                    We’ll keep updating you with{" "}
                    <span className="font-semibold">ads & news</span> directly
                    to your email.
                  </p>
                </>
              )}

              {/* ⚠️ Already Subscribed Popup */}
              {popupType === "exists" && (
                <>
                  <motion.div
                    className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-yellow-500"
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.994-1.85L21 17V7c0-1.054-.816-1.918-1.85-1.994L19 5H5c-1.054 0-1.918.816-1.994 1.85L3 7v10c0 1.054.816 1.918 1.85 1.994L5 19z"
                      />
                    </motion.svg>
                  </motion.div>
                  <h2 className="text-2xl font-bold text-[#B7791F] mb-4">
                    Already Subscribed!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    This email is already in our list. <br />
                    You’ll continue receiving{" "}
                    <span className="font-semibold">ads & updates</span> from us.
                  </p>
                </>
              )}

              <button
                onClick={() => setPopupType(null)}
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
};

export default Footer_subscribe;
