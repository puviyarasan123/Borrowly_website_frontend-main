import React from "react";
import { MdEmail } from "react-icons/md";

const ContactUs = () => {
  return (
    <section className="max-w-screen-xl cursor-default mx-auto px-3 md:px-12 py-12">
      <div className="bg-[#d9e7ff] rounded-2xl p-5 md:p-10 grid md:grid-cols-2 gap-10  shadow-md">
        
        {/* Left Content */}
        <div className="space-y-4">
          <MdEmail size={40} className="text-blue-600" />
          <h2  style={{ fontFamily: "PovetaracSansBlack" }} className="text-3xl font-bold text-gray-900">
            If you like what you see, <br className="hidden md:block"/> let&apos;s work together.
          </h2>
          <p  style={{ fontFamily: "PovetaracSansBold" }} className="text-[#82898D] text-sm leading-relaxed">
            Need help choosing the right loan? Have questions about EMIs? <br />
            Fill out the contact form and our team will get back to you quickly.
          </p>
        </div>

        {/* Right Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <input
    type="text"
    placeholder="Name*"
    className="px-5 p-3 rounded-lg h-[60px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="email"
    placeholder="Email*"
    className="px-5 p-3 rounded-lg h-[60px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    placeholder="Phone*"
    className="px-5 p-3 rounded-lg h-[60px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    placeholder="Subject*"
    className="px-5 p-3 rounded-lg h-[60px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <textarea
    placeholder="Message"
    rows="4"
    className="col-span-1 md:col-span-2 px-5 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  ></textarea>
  <div className="col-span-1 md:col-span-2 py-3 flex justify-start">
    <button
      type="submit"
      className="bg-white px-6 py-2 rounded-full border border-black text-black font-medium hover:bg-gray-100 transition"
    >
      Submit
    </button>
  </div>
</form>

      </div>
    </section>
  );
};

export default ContactUs;
