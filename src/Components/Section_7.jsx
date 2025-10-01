import ReviewCard from './ReviewCard'

const Section_7 = ({isDarkMode}) => {
  return (
    <div className="cursor-default">
        <div className="max-w-screen-xl mx-auto pt-12 flex flex-col md:flex-row md:items-center justify-center h-full px-5 md:px-10">
           <div className="flex-1">
            <p style={{ fontFamily: 'PovetaracSansBold' }} className="text-[#000000] text-[14px] border border-[#CFCCCC] rounded-full w-fit px-4 py-1.5 flex items-center justify-center">
                   Loved by Thousands
                 </p>
             
              <h1  style={{ fontFamily: 'PovetaracSansBlack' }} className={`text-left mt-4 text-[28px] lg:text-[36px] xl:text-[40px] leading-[1.1] ${ isDarkMode ? 'text-white' : 'text-black'}`}>Review from Customer</h1>
              <p style={{ fontFamily: 'PovetaracSansBold' }} className={`mt-2 w-full max-w-[800px] text-[14px] text-left lg:text-[14px] xl:text-lg  ${ isDarkMode ? 'text-[#CCCCCC]' : 'text-[#696868]' }`}>
               Hear how Borrowly made borrowing simple, fast, and stress-free.
              </p>
           </div>
           <div className="items-center hidden md:flex py-3">
               <button style={{ fontFamily: 'PovetaracSansHeavy' }} className={`flex-1 cursor-pointer px-12 hover:scale-102 ${isDarkMode ? 'text-white  border border-[#ffffff]' : 'text-black border border-[#55575B]' } flex items-center justify-center py-3 bg-transparent text-[16px] lg:text-[18px] rounded-lg`}>
                 <span className='mt-1'>See All</span>
               </button>
           </div>
        </div>
        <div className='w-full py-12 md:pt-24'>
            <ReviewCard/>
        </div>
        {/* <div className="items-center w-full px-5 block md:hidden pb-8">
               <button style={{ fontFamily: 'PovetaracSansHeavy' }} className={`flex-1 cursor-pointer w-full px-12 hover:scale-102 ${isDarkMode ? 'text-white  border border-[#ffffff]' : 'text-black border border-[#55575B]' } flex items-center justify-center py-3 bg-transparent text-[16px] lg:text-[18px] rounded-lg`}>
                 <span className='mt-1'>See All</span>
               </button>
           </div> */}
    </div>
  )
}

export default Section_7
