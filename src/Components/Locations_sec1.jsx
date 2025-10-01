import React from "react";
import img from '../assets/Images/india.png';

const locations = [
  "Delhi", "Mumbai", "Bengaluru", "Kolkata", "Hyderabad", "Thane", "Ludhiana",
  "Faridabad", "Vasai-Virar", "Dhanbad", "Gurugram", "Kanpur", "Nagpur", "Indore",
  "Ghaziabad", "Aurangabad", "Prayagraj", "Jabalpur", "Patna", "Vadodara", "Agra",
  "Srinagar", "Navi Mumbai", "Bhopal", "Ranchi", "Chandigarh", "Meerut", "Noida",
  "Rajkot", "Nashik", "Vijayawada", "Varanasi"
];

const Locations = () => {
  // Split locations into 4 sets
  const sets = [
    locations.slice(0, 8),
    locations.slice(8, 16),
    locations.slice(16, 24),
    locations.slice(24)
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        {/* Button-style Locations Text */}
        <button className="bg-blue-100 text-blue-600 py-1 px-4 rounded-full text-lg font-semibold">
          Locations
        </button>
        <h2 className="text-3xl font-semibold text-black mt-4">Available in 100+ cities</h2>
        <p className="text-gray-600 mt-2">
          We offer loans in all the major cities across India<br />
          <span className="font-medium text-green-600">All rural + urban areas covered</span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between mt-8 gap-8">
        {/* Locations list with bold bullet points */}
        <div className="w-full lg:w-[70%] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4">
          {sets.map((set, index) => (
            <div key={index} className="flex flex-col space-y-4">
              {set.map((location, locIndex) => {
                // Custom styles for highlighted cities
                let customStyle = "text-lg text-gray-700 font-bold flex items-center";
                let extraNote = null;

                if (location === "Bengaluru") {
                  customStyle += " text-red-800";
                }

                if (location === "Delhi" || location === "Mumbai") {
                  extraNote = (
                    <span className="text-sm text-gray-500 ml-1">→ 3 Months</span>
                  );
                }

                return (
                  <div key={locIndex} className={customStyle}>
                    <span className="mr-2">•</span>
                    {location}
                    {extraNote}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Image (India Map) */}
        <div className="w-full lg:w-[25%] mt-8 lg:mt-0">
          <img src={img} alt="India map" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Locations;
