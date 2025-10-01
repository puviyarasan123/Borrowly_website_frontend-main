import Header_contactus from "../Components/Header_contactus";
import Contactus_section4 from "../Components/Contactus_section4";
import Contactus_section3 from "../Components/Contactus_section3";
import Footer_New from "../Components/Footer_New";
import Contactus_section5 from "../Components/Contactus_section5";


const Contact_us = () => {
  return (
    <div className="cursor-default">
      <div className="max-w-screen-xl mx-auto cursor-default">
        <Header_contactus />
      </div>

      <div className="bg-[#F8F9F9] ">
          <Contactus_section4 />
      </div>

      <div className="max-w-screen-xl mx-auto cursor-default">
        <div className="px-5 lg:px-12">
          <Contactus_section3 />
        </div>
        <Contactus_section5 /> 
      </div>
      <div className="bg-[#111111] w-full">
        <Footer_New/>
      </div>
    </div>
  )
}

export default Contact_us
