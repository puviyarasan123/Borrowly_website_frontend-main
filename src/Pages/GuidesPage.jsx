import React from 'react'
import Footer_New from '../Components/Footer_New';
import GuidesSection_1 from '../Components/GuidesSection_1';
import GuidesSection_2 from '../Components/GuidesSection_2';
import Footer_subscribe from '../Components/Footer_subscribe'
import Section_11 from '../Components/Section_11'


import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const GuidesPage = () => {
  return (
   <>
    <motion.section className="text-center w-full max-w-screen-xl mx-auto py-10" initial="hidden" animate="show" variants={{  hidden: {}, show: { transition: { staggerChildren: 0.15 } },}}>
          <p style={{ fontFamily: 'PovetaracSansBold' }} className="text-[#084DB3] text-[14px] bg-[#DEE8F6] mx-auto text-left rounded-full w-fit px-4 py-1.5">Browse Guides</p>
          <motion.h1 variants={fadeUp} style={{ fontFamily: "PovetaracSansBlack" }} className="text-center mt-4 text-[28px] md:text-[36px] xl:text-[40px] leading-[1.1]">Helpful Loan Guides</motion.h1>
          <motion.p variants={fadeUp} style={{ fontFamily: "PovetaracSansBold" }} className="mt-2 px-5 w-full max-w-[800px] mx-auto text-[14px] md:text-lg">
             Step-by-step resources to understand, compare, and manage loans with confidence.
          </motion.p>
    </motion.section>
    <div>
        <GuidesSection_1/>
        <GuidesSection_2/>
    </div>
    <Section_11/>
    <Footer_subscribe/>
    <Footer_New/>
    </>
  )
}

export default GuidesPage
