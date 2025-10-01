import React from "react";
import Aboutus_section1 from "../Components/Sec_carrier1";
import Aboutus_section2 from "../Components/Sec_carrier2";
import Footer_New from "../Components/Footer_New";

const Carriers = () => {
  return (
    <div>
      <Aboutus_section1 />
       <div className="mx-auto cursor-default">
            <Aboutus_section2 />
      </div>
       <div className="bg-[#111111] w-full">
        <Footer_New/>
      </div>
    </div>
  );
};

export default Carriers;
