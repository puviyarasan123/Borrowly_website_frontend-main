import React from 'react'
import Section_1 from '../Components/Section_1'
import Section_2 from '../Components/Section_2'
import Section_3 from '../Components/Section_3'
import EmiCalculator from '../Components/Section_4'
import Section_5 from '../Components/Section_5'
import Section_6 from '../Components/Section_6'
import Section_7 from '../Components/Section_7' 
import Section_9 from '../Components/Section_9' 
import Section_10 from '../Components/Section_10' 
import Section_11 from '../Components/Section_11' 
import Footer_New from '../Components/Footer_New'
import Footer_subscribe from '../Components/Footer_subscribe'



import Simple_steps from '../Components/Simple_steps'

const Index = ({isDarkMode}) => {
  return (
    <div className={` ${isDarkMode ? 'bg-gradient-to-r from-[#111827] via-[#111827] to-[#112E4B]' : 'bg-white'}`}>
      <Section_1 isDarkMode={isDarkMode} />
      <Section_2 isDarkMode={isDarkMode} />
      <Simple_steps isDarkMode={isDarkMode} />
      <EmiCalculator isDarkMode={isDarkMode}/>
      <Section_3 isDarkMode={isDarkMode} />
      <Section_5 isDarkMode={isDarkMode}/>
      <Section_6 isDarkMode={isDarkMode}/>
      <Section_7 isDarkMode={isDarkMode}/>
      {/* <Section_8 isDarkMode={isDarkMode}/> */}
      <Section_9 isDarkMode={isDarkMode}/>
      <Section_10 isDarkMode={isDarkMode}/>
      <Section_11 isDarkMode={isDarkMode}/>
      {/* <Banner_section isDarkMode={isDarkMode}/> */}
      {/* <Footer isDarkMode={isDarkMode}/> */}
      <Footer_subscribe/>
      <Footer_New/>
    </div>
  )
}

export default Index
