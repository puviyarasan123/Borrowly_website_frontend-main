import React from 'react'
import WaitingIcon from '../assets/Images/WaitingIcon.avif'
import Footer_New from '../Components/Footer_New';
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


const BlogPage = () => {
  return (
    <>
    <motion.section className="text-center w-full md:h-[80dvh] max-w-screen-xl flex flex-col mx-auto py-10" initial="hidden" animate="show" 
         variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <div className=''>
             <p
            style={{ fontFamily: 'PovetaracSansBold' }}
            className="text-[#084DB3] text-[14px] bg-[#DEE8F6] mx-auto text-left rounded-full w-fit px-4 py-1.5"
          >
            Read Our Blog
          </p>
          <motion.h1
            variants={fadeUp}
            style={{ fontFamily: "PovetaracSansBlack" }}
            className="text-center mt-4 text-[28px] md:text-[36px] xl:text-[40px] leading-[1.1]"
          >
            Borrowly Finance Blog
          </motion.h1>
    
          <motion.p
            variants={fadeUp}
            style={{ fontFamily: "PovetaracSansBold" }}
            className="mt-2 px-5 w-full max-w-[800px] mx-auto text-[14px] md:text-lg"
          >
             Latest updates, insights, and news on loans, money, and smart borrowing.
          </motion.p>
          </div>

          <div className='flex justify-center py-12 flex-1 flex-col items-center'>
            <img src={WaitingIcon} alt='' className='mt-10 w-[240px]' />
            <motion.h1
            variants={fadeUp}
            style={{ fontFamily: "PovetaracSansBlack" }}
            className="text-center mt-4 text-[28px] md:text-[36px] text-[#CDCDCD] xl:text-[40px] leading-[1.1]"
          >
            Coming Soon!
          </motion.h1>
    
          <motion.p
            variants={fadeUp}
            style={{ fontFamily: "PovetaracSansBold" }}
            className="mt-2 px-5 w-full max-w-[600px] mx-auto text-[#CDCDCD] text-[14px] md:text-lg"
          >
             Our blog is getting ready. Stay tuned for smart borrowing tips, loan news, and market insights.
          </motion.p>
          </div>


        </motion.section>
     <Footer_New/>
    </>
     
  )
}

export default BlogPage
