import Footer_New from '../Components/Footer_New';
import { motion } from "framer-motion";

import Team_1 from '/Co-founder.avif'
import Team_2 from '/founder.avif'
import Team_3 from '/Co-2.avif'

import Team_section2 from '../Components/Team_section2'
import ContactusBanner from '../Components/ContactusBanner';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const Team = () => {
  return (
    <>
      <motion.section className="text-center w-full max-w-screen-xl mx-auto py-10" initial="hidden" animate="show" variants={{  hidden: {}, show: { transition: { staggerChildren: 0.15 } },}}>
            <p style={{ fontFamily: 'PovetaracSansBold' }} className="text-[#084DB3] text-[14px] bg-[#DEE8F6] mx-auto text-left rounded-full w-fit px-4 py-1.5">Visit Our Team</p>
            <motion.h1 variants={fadeUp} style={{ fontFamily: "PovetaracSansBlack" }} className="text-center mt-4 text-[28px] md:text-[36px] xl:text-[40px] leading-[1.1]">Get to Know the People Behind the Progress</motion.h1>
            <motion.p variants={fadeUp} style={{ fontFamily: "PovetaracSansBold" }} className="mt-2 px-5 w-full max-w-[800px] mx-auto text-[14px] md:text-lg">
               Driven by purpose, our board blends creativity, innovation, and expertise to shape remarkable outcomes.
            </motion.p>
      </motion.section>
      <div className='text-center pb-10 w-full max-w-screen-xl px-5 mx-auto'>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 lg:gap-2'>
            
             <div className='bg-[#ffe9d6] rounded-2xl lg:rounded-tl-4xl flex items-end relative'>
                 <img src={Team_2} alt='' className='h-[430px] mx-auto pt-10'/>
                <div className="absolute -bottom-8 py-4 left-1/2 flex items-center justify-center flex-col -translate-x-1/2 bg-white rounded-xl w-[80%] shadow-lg">
                   <h1  style={{ fontFamily: "PovetaracSansBlack" }} className='text-xl'>Founder & Director</h1>
                   <h1 style={{ fontFamily: "PovetaracSansBlack" }} className='text-[16px]'>Divya sappogu</h1>
                </div>
            </div>
             <div className="bg-[#E9F4FF]  rounded-2xl lg:rounded-0 flex items-end relative">
                <img src={Team_1} alt='' className='w-[500px] mx-auto pt-10'/>
                <div className="absolute -bottom-8 py-4 left-1/2 flex items-center justify-center flex-col -translate-x-1/2 bg-white rounded-xl w-[80%] shadow-lg">
                   <h1  style={{ fontFamily: "PovetaracSansBlack" }} className='text-xl'>Mahendra B M</h1>
                   <h1 style={{ fontFamily: "PovetaracSansBlack" }} className='text-[16px]'>Director and CEO</h1>
                </div>
             </div>
              <div className="bg-[#F2EEFF]  rounded-2xl lg:rounded-tr-4xl flex items-end relative">
                <img src={Team_3} alt='' className='w-[390px] mx-auto pt-10'/>
                <div className="absolute -bottom-8 py-4 left-1/2 flex items-center justify-center flex-col -translate-x-1/2 bg-white rounded-xl w-[80%] shadow-lg">
                   <h1  style={{ fontFamily: "PovetaracSansBlack" }} className='text-xl'>Komari Naga Maddilety</h1>
                   <h1 style={{ fontFamily: "PovetaracSansBlack" }} className='text-[16px]'>Director & Co-founder</h1>
                </div>
             </div>
         </div>
      </div>
      <Team_section2/>
      <ContactusBanner/>
      <Footer_New/>
    </>
  )
}

export default Team
