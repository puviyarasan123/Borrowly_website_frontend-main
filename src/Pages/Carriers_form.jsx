import React, { useState } from "react";
import { motion } from "framer-motion";
import SaveIcon from "../assets/Icons/SaveIcon.svg";

export default function CareerForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cv: null,
    assistance: "",
    privacy: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Form Data Submitted:", formData);

      // Example API call
      // const formDataObj = new FormData();
      // Object.entries(formData).forEach(([key, val]) =>
      //   formDataObj.append(key, val)
      // );
      // await axios.post("/api/careers", formDataObj);

      alert("Form submitted successfully ✅");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  // Simple fadeUp animation
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
  <div className="min-h-screen flex flex-col items-center bg-white px-4 pt-6">
      <div className="w-full max-w-md">
        {/* Careers badge */}
        <div className="flex justify-center mb-4">
          <span style={{ fontFamily: 'PovetaracSansBold' }} className="px-4 py-1 border rounded-full text-sm text-gray-700">
            Careers
          </span>
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily: 'PovetaracSansblack' }} className="text-center text-xl font-medium text-gray-900 mb-8 leading-snug">
          Apply now and join us to make finance for <br />
          people, not paperwork.
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 text-sm text-gray-900"
        >
          {/* First Name */}
          <div>
            <label style={{ fontFamily: 'PovetaracSansblack' }} className="block mb-2 font-medium">First name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-md px-4 py-4 bg-[#F4F4F4] focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          {/* Last Name */}
          <div>
            <label style={{ fontFamily: 'PovetaracSansblack' }} className="block mb-2 font-medium">Last name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-md px-4 py-4 bg-[#F4F4F4] focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ fontFamily: 'PovetaracSansblack' }} className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md px-4 py-4 bg-[#F4F4F4] focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          {/* Phone */}
          <div>
            <label style={{ fontFamily: 'PovetaracSansblack' }} className="block mb-2 font-medium">Phone number</label>
            <div className="flex">
              <span className="px-4 py-4 rounded-l-md bg-gray-100 text-gray-700 text-sm mr-1">
                +91
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md px-4 py-4 bg-[#F4F4F4] focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          {/* Upload CV */}
          <div>
            <label style={{ fontFamily: 'PovetaracSansblack' }} className="block mb-2 font-medium">Upload your CV</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              <input
                type="file"
                name="cv"
                accept=".pdf,.docx"
                onChange={handleChange}
                className="hidden"
                id="cv-upload"
              />
              <p className="text-xs text-gray-500 mt-2">
                Drop files here to upload
                <br />or choose from your device
              </p>

              <label
                htmlFor="cv-upload"
                className="cursor-pointer px-5 py-2 bg-[#E7E7E7] rounded-md text-gray-700 text-sm mt-3 inline-block"
              >
                Browse files
              </label>
            </div>
            <p className="text-xs text-gray-700 font-semibold mt-2">
              Supported formats: .pdf, .docx (max. file size 5MB)
            </p>
          </div>

          {/* Assistance */}
          <div>
            <label style={{ fontFamily: 'PovetaracSansblack' }} className="block mb-1 font-medium">
              Do you require special assistance? (optional)
            </label>
            <input
              type="text"
              name="assistance"
              value={formData.assistance}
              onChange={handleChange}
              className="w-full rounded-md px-3 py-4 bg-[#F4F4F4] focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Privacy */}
          <div style={{ fontFamily: 'PovetaracSansbold' }} className="flex items-start space-x-2 text-xs text-gray-600">
            <input
              type="checkbox"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
              className="mt-0.5"
            />
            <p>
              By ticking this box, I confirm that I have read and understand the
              content of the Privacy Notice and acknowledge that my personal
              data will be processed as part of this application.
            </p>
          </div>

          {/* Submit */}
         <motion.button
  type="submit"
  disabled={loading}
  className="w-full cursor-pointer flex items-center justify-center space-x-2 bg-[#00C2CC] text-white py-4 rounded-full text-lg mb-6"
  variants={fadeUp}
  initial="hidden"
  animate="visible"
  whileHover={{ y: -2, boxShadow: "0px 8px 20px rgba(0,0,0,0.12)" }}
  whileTap={{ scale: 0.98 }}
>
  <span className="mt-1 text-xl">
    {loading ? "Saving..." : "Save"}
  </span>
  <img src={SaveIcon} alt="Save" className="w-6 h-6" />
</motion.button>

        </form>
      </div>
    </div>
  );
}
