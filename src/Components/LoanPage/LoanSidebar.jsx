import React from 'react'

import tickdone from '../../assets/Icons/tickdone.svg'

const LoanSidebar = ({ mainTitle, subTitle,img, features }) => {
  return (
    <div className='bg-[#025FDA] h-full p-5 flex flex-col md:w-[450px]'>
      <div className='w-fit mx-auto flex-1 flex flex-col justify-center'>
        <div>
          <h1 style={{ fontFamily: "PovetaracSansBlack" }} className="text-3xl bg-gradient-to-b from-[#86bbff] via-[#86bbff] to-[#1771e8] bg-clip-text text-transparent">
            {mainTitle}
          </h1>
          <h1 style={{ fontFamily: "PovetaracSansBlack" }} className="text-5xl bg-gradient-to-b from-[#86bbff] via-[#86bbff] to-[#1771e8] bg-clip-text text-transparent">
            {subTitle}
          </h1>
        </div>
        <div className='pt-10  hidden md:flex flex-col gap-5'>
          {features?.map((feature, index) => (
            <div className='flex gap-3' key={index}>
              <div>
                <img src={tickdone} alt='' className='w-4' />
              </div>
              <div className='flex-1 text-white'>
                <h1 style={{ fontFamily: "PovetaracSansBlack" }}className='text-[12px] md:text-lg'>{feature.title}</h1>
                <p style={{ fontFamily: "PovetaracSansbold" }} className=' text-xs md:text-sm'>
                  – {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <img src={img} alt='' className='mx-auto md:mt-auto max-w-[250px] md:max-w-[400px]'/>
    </div>
  )
}

export default LoanSidebar
