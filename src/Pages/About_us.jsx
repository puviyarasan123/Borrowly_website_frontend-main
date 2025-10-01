import React from "react";
import Aboutus_section1 from "../Components/Aboutus_section1";
import Aboutus_section2 from "../Components/Aboutus_section2";
import Aboutus_section3 from "../Components/Aboutus_section3";
import Aboutus_section4 from "../Components/Aboutus_section4";
import Aboutus_section5 from "../Components/Aboutus_section5";
import Footer_New from "../Components/Footer_New";

const About_us = () => {
  return (
    <div>
      <Aboutus_section1 />
       <div className="mx-auto cursor-default">
            <Aboutus_section2 />
      </div>
  
      <Aboutus_section3 />
       <div className=" mx-auto cursor-default">
            <Aboutus_section4 />
      </div>
     
       <div className="bg-[#111111] w-full">
        <Footer_New/>
      </div>
    </div>
  );
};

export default About_us;
