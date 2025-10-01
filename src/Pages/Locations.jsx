import React from "react";
import Locations_sec1 from "../Components/Locations_sec1";
import Locations_sec2 from "../Components/Locations_sec2";
import Footer_New from "../Components/Footer_New";
import Footer_subscribe from "../Components/Footer_subscribe";

const About_us = () => {
  return (
    <div>
      <Locations_sec1 />
       <div className="mx-auto cursor-default">
            <Locations_sec2 />
      </div>
      <Footer_subscribe/>
       <div className="bg-[#111111] w-full">
        <Footer_New/>
      </div>
      
    </div>
  );
};

export default About_us;
