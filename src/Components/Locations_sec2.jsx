import { useState } from "react";
import { motion } from "framer-motion";
import img1 from "../assets/Icons/contact-banner.svg"; // Adjust if needed
import SaveIcon from "../assets/Icons/SaveIcon.svg";

// Define the animation for fadeUp
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ContactUs() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    question: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Your query has been submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Left Column - Company Info */}
        <div className="flex-1 space-y-6 text-gray-700">
          {/* Reach Us */}
          <div>
            <h2 className="text-3xl font-semibold mb-4">Reach us</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-[#797979]">CIN</p>
                <h1 className="text-[16px] text-black">U70200KA2023PTC176224</h1>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-[#797979]">Company Name</p>
                <h1 className="text-[16px] text-black">BORROWLY PRIVATE LIMITED</h1>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-[#797979]">Registered Office Address</p>
                <h1 className="text-[16px] text-black max-w-[450px]">Site No. 2, H.L No. 786, First Floor, Near Bharath Petrol Bunk, Dhargha Mohalla, Old Madras Road, Dooravani Nagar, Bengaluru – 560016.
</h1>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-[#797979]">Email ID</p>
                <h1 className="text-[16px] text-black">Support@Borrowly.in</h1>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-[#797979]">Contact No</p>
                <h1 className="text-[16px] text-black">+91-9494545792</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Officer Info */}
        <div className="flex-1 space-y-10 text-gray-700">
          {/* Nodal Grievance Redressal Officer */}
          <div>
            <h2 className="text-3xl font-semibold mb-4">Grievance Redressal Officer</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-[#797979]">Name</p>
                <h1 className="text-[16px] text-black">Borrowly</h1>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-[#797979]">Address</p>
                <h1 className="text-[16px] text-black max-w-[450px]">
                 Site No. 2, H.L No. 786, First Floor, Near Bharath Petrol Bunk, Dhargha Mohalla, Old Madras Road, Dooravani Nagar, Bengaluru – 560016.
                </h1>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-[#797979]">Contact No</p>
                <h1 className="text-[16px] text-black">+91-7760657415</h1>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-[#797979]">Email ID</p>
                <h1 className="text-[16px] text-black">Support@Borrowly.in</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section Below the Content */}
      <motion.div
        className="bg-white w-full lg:w-[65%] max-w-5xl mx-auto rounded-3xl shadow-lg p-6 mt-10"
        initial="hidden"
        animate="show"
      >
        {/* Banner */}
        <div className="bg-cyan-500 text-white text-center p-8 rounded-2xl mb-8">
          <h3 className="text-3xl mb-4 font-semibold">Do you have any question?</h3>
          <p className="text-black bg-white inline-block px-7 py-2 text-sm rounded-full">
            Fill out the form and we will answer all your questions
          </p>
          <img src={img1} alt="Support Illustration" className="w-[200px] mx-auto mt-10" />
        </div>

        {/* Full Width Form with Padding */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-5 rounded-xl bg-[#F5F8FF] text-base focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-5 rounded-xl bg-[#F5F8FF] text-base focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          
          <textarea
            name="question"
            placeholder="Write your question"
            value={formData.question}
            onChange={handleChange}
            rows="4"
            className="w-full p-5 rounded-xl bg-[#F5F8FF] text-base focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          
          <motion.button
            type="submit"
            style={{ fontFamily: "PovetaracSansBlack" }}
            className="w-full cursor-pointer flex items-center justify-center space-x-2 bg-[#00C2CC] text-white py-4 rounded-full text-lg sm:text-base"
            variants={fadeUp} // Ensure the fadeUp variant is defined
            whileHover={{ y: -2, boxShadow: "0px 8px 20px rgba(0,0,0,0.12)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
          >
            <span className="mt-1 text-xl">Save</span>
            <img src={SaveIcon} alt="Save" className="w-6 h-6" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
