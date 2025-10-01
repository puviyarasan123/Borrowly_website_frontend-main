import React,{useState} from 'react'

import social_1 from '../assets/Icons/Social_1.svg'
import social_2 from '../assets/Icons/Social_2.svg'
import social_3 from '../assets/Icons/Social_3.png'
import social_4 from '../assets/Icons/Social_4.svg'
import social_5 from '../assets/Icons/Social_5.png'
import social_6 from '../assets/Icons/Social_6.jpg'
import social_7 from '../assets/Icons/Social_7.png'

const Footer_New = ({isDarkMode}) => {
    const sections = [
  {
    title: "Types of Personal Loans",
    items: [
      "Personal Loan",
      "Instant Loan",
      "Unsecured Loan",
      "Short Term Personal Loan",
      "Digital Personal Loan",
      "Instant Cash Loans",
      "Small Personal Loan",
      "Personal Loan for Men",
      "Personal Loan for Women",
      "Travel Loan",
      "Urgent Personal Loan",
      "Medical Emergency Loan",
      "Marriage Loan",
      "Debt Repayment Loan",
      "Low-Salary Personal Loan",
      "Emergency Loan",
      "Personal Loan For Salaried",
      "Home Renovation Loan",
      "Home Construction Loan",
      "Personal Loan for Shopping",
      "Personal Loan for Maternity",
      "Personal Loan for Hobbies",
      "Personal Loan for Occasion",
      "Personal Loan for Gifting",
    ],
  },
  {
    title: "Personal Loans by Location",
    items: [
      "Personal Loan in Bengaluru",
      "Personal Loan in Hyderabad",
      "Personal Loan in Delhi",
      "Personal Loan in Chennai",
      "Personal Loan in Mumbai",
      "Personal Loan in Ahmedabad",
      "Personal Loan in Pune",
      "Personal Loan in Kolkata",
      "Personal Loan in Surat",
      "Personal Loan in Coimbatore",
      "Personal Loan in Jaipur",
      "Personal Loan in Lucknow",
      "Personal Loan in Kanpur",
      "Personal Loan in Gurugram",
    ],
  },
  {
    title: "Personal Loans by Amount",
    items: [
      "5,000 Personal Loan",
      "10,000 Personal Loan",
      "20,000 Personal Loan",
      "25,000 Personal Loan",
      "30,000 Personal Loan",
      "40,000 Personal Loan",
      "50,000 Personal Loan",
      "75,000 Personal Loan",
      "100,000 (1 Lakh) Personal Loan",
      "150,000 Personal Loan",
      "200,000 Personal Loan",
      "300,000 Personal Loan",
      "500,000 Personal Loan",
    ],
  },
  {
    title: "Personal Loans by Salary",
    items: [
      "Personal Loan for Salary 20,000",
      "Personal Loan for Salary 25,000",
      "Personal Loan for Salary 30,000",
      "Personal Loan for Salary 40,000",
      "Personal Loan for Salary 50,000",
      "Personal Loan for Salary 60,000",
      "Personal Loan for Salary 75,000",
      "Personal Loan for Salary 1,00,000 and above",
    ],
  },
];


const [openSections, setOpenSections] = useState({});

  function toggleSection(index) {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }



  return (
    <div className='w-full py-5 bg-[#111111] cursor-default'>
       <div className="py-12 px-5 w-full max-w-[1200px] mx-auto">
          
        <div className={`${ isDarkMode ? 'text-[#ffffff]' : 'text-[#000000]' } flex-1 flex flex-col md:flex-row md:gap-3 order-2 lg:order-1`}>
          <div className=" md:px-5 min-w-[130px]  mb-4 text-white">
            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-[16px] md:text-lg mb-2">
              Home
            </h1> 
           <div className="flex flex-col gap-1 text-[#BDBDBD] text-[14px] ">
  {[
    { name: 'About Us', link: '/About_us' },
    { name: 'Guides', link: '/Guides' },
    { name: 'Blogs', link: '/blogs' },
    { name: 'Privacy Policy', link: '/privacy_policy' },
  ].map((item, i) => (
    <a
      key={i}
      href={item.link}
      className="cursor-pointer hover:underline hover:text-white"
      style={{ fontFamily: 'PovetaracSansBold' }}
    >
      {item.name}
    </a>
  ))}
</div>

          </div>
         {/* ================== Company Section (commented out) ================== */}
{/*
<div className="flex-1 min-w-[130px] md:px-5 mb-4 text-white">
  <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-[16px] md:text-lg mb-2">
    Company
  </h1>
  <div className="flex flex-col text-[#BDBDBD] gap-1 text-[14px] ">
    {[
      "Company",
      "Lending Partners",
      "Digital Lead Partners",
      "Collection Agencies",
      "Fair Practices Code",
      "Grievance Redressal",
      "RBI Sachet Portal",
      "Privacy Policy",
      "Gold refund & cancelation policy",
      "Contact Us"
    ].map((item, i) => (
      <p className='cursor-pointer '  key={i} style={{ fontFamily: 'PovetaracSansBold' }}>{item}</p>
    ))}
  </div>
</div>
*/}

{/* ================== Services Section (new) ================== */}
<div className="flex-1 min-w-[130px] md:px-5 mb-4 text-white">
  <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-[16px] md:text-lg mb-2">
    Services
  </h1>
  <div className="flex flex-col text-[#BDBDBD] gap-1 text-[14px] ">
    {[
      { name: "Personal Loan", link: "/personal_loan" },
      { name: "Business Loan", link: "/business_loan" },
      { name: "Education Loan", link: "/education_loan" },
      { name: "Home Loan", link: "/home_loan" },
      { name: "Gold Loan", link: "/gold_loan" },
      { name: "Vehicle Loan", link: "/vehicle_loan" },
      { name: "Insurance", link: "/insurance_loan" },
    ].map((service, i) => (
      <a
        key={i}
        href={service.link}
        className="cursor-pointer hover:underline hover:text-white"
        style={{ fontFamily: 'PovetaracSansBold' }}
      >
        {service.name}
      </a>
    ))}
  </div>
</div>

          <div className="flex-1 min-w-[130px] md:px-5  mb-4 text-white">
            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-[16px] md:text-lg mb-2">
              Keep in touch with us
            </h1>
            <div className="flex flex-col gap-1 text-[#BDBDBD] text-[14px] ">
              {[
                "📞 +91-9494545792 | +91-9494545137",
                "✉️ support@borrowly.in",
                "Borrowly®️ is powered by Wiseway Consultants Private Limited, Site No. 2, H.L No. 786, First Floor, Near Bharath Petrol Bunk, Dhargha Mohalla, Old Madras Road, Dooravani Nagar, Bengaluru – 560016.",
              ]
              .map((item, i) => (
                <p className='cursor-pointer  w-fit'  key={i} style={{ fontFamily: 'PovetaracSansBold' }}>{item}</p>
              ))}
            </div>
          </div>
          <div className="flex-1 min-w-[180px]  md:px-5  mb-4 text-white">
            <h1 style={{ fontFamily: 'PovetaracSansBlack' }} className="text-[16px] md:text-lg mb-2">
              For Grievance Redressal Contact:
            </h1>
            <div className="flex flex-col gap-1 text-[#BDBDBD] text-[14px] ">
              {['Consumer Grievance Officer', '📞 +91-7760657415', 'Borrowly®️ (Registered Trademark of Wiseway Consultants Private Limited)','Site No. 2, H.L No. 786, First Floor, Near Bharath Petrol Bunk, Dhargha Mohalla, Old Madras Road, Dooravani Nagar, Bengaluru – 560016.'].map((item, i) => (
                <p className='cursor-pointer  w-fit'  key={i} style={{ fontFamily: 'PovetaracSansBold' }}>{item}</p>
              ))}
            </div>
          </div>
         </div>

         <div className='md:py-5 pb-5 md:pb-10 md:px-5'>
             <hr style={{ borderTop: '0.1px solid #BDBDBD' }} className='opacity-40'/>
         </div>


 <div className="flex flex-col gap-4 md:gap-8">
      {sections.map(({ title, items }, idx) => {
        const isOpen = openSections[idx] || false;
        return (
            <>
          <div key={title} className='flex flex-col md:flex-row' clas style={{ fontFamily: "PovetaracSansBlack" }}>
            {/* Title + toggle icon on mobile */}
            <div className="flex min-w-[300px] justify-between cursor-pointer md:cursor-default md:px-5">
              <h2 className="text-white text-lg md:text-[16px] flex-1 min-w-[180px]" onClick={() => toggleSection(idx)}>
                {title}
              </h2>

              {/* Mobile toggle */}
              <div className="md:hidden" onClick={() => toggleSection(idx)}>
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#BDBDBD]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#BDBDBD]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Desktop: horizontal list with pipes */}
            <div
              className="hidden md:block px-5 text-[#BDBDBD] leading-8 text-justify text-[16px]"
              style={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {items.map((item, i) => (
                <span key={item}>
                  <a
                    href="/personal_loan"
                    className="hover:underline underline-offset-8 hover:text-white"
                  >
                    {item}
                  </a>
                  {i !== items.length - 1 && (
                    <span style={{ margin: "0 8px" }}>|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Mobile: collapsible vertical list */}
            {isOpen && (
              <div className="md:hidden mt-2 space-y-1">
                {items.map((item) => (
                  <a
                    key={item}
                    href="personal_loan"
                    className="block hover:underline text-white underline-offset-8"
                    style={{ whiteSpace: "normal", wordBreak: "break-word" }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
            <div className='md:py-5 md:px-5'>
             <hr style={{ borderTop: '0.1px solid #BDBDBD' }} className='opacity-40'/>
         </div>
         </>
        );
      })}
    </div>

        <div clas style={{ fontFamily: "PovetaracSansBlack" }} className='text-[#BDBDBD] pt-6 py-3 gap-3 text-[14px] md:px-5  flex flex-wrap md:items-center md:gap-10'>
             <h1 className=''>Terms</h1>
             <h1  className=''>© 2025 Borrowly</h1>
             <h1  className=''>Borrowly will act as a lending service provider as per RBI classification</h1>
            <div className="flex-1 md:justify-end flex flex-wrap gap-2">
  <a href="https://www.instagram.com/borrowly.in/" target="_blank" rel="noopener noreferrer">
    <img src={social_1} alt="Instagram" className="w-6" />
  </a>

  <a href="https://www.facebook.com/profile.php?id=61578687491185" target="_blank" rel="noopener noreferrer">
    <img src={social_3} alt="Facebook" className="w-6" />
  </a>

  <a href="https://x.com/BorrowlyIn" target="_blank" rel="noopener noreferrer">
    <img src={social_5} alt="X" className="w-6" />
  </a>

  <a href="https://www.linkedin.com/in/borrowly-in-7b650b385/" target="_blank" rel="noopener noreferrer">
    <img src={social_2} alt="LinkedIn" className="w-6" />
  </a>

  <a href="https://www.youtube.com/@borrowly" target="_blank" rel="noopener noreferrer">
    <img src={social_4} alt="YouTube" className="w-6" />
  </a>

  <a href="https://www.threads.com/@borrowly.in?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer">
    <img src={social_6} alt="Threads" className="w-6" />
  </a>


</div>

         </div>
         <div clas style={{ fontFamily: "PovetaracSansBold" }} className='md:px-5 text-justify'>
             <p className='text-[10px] md:text-[12px] text-[#BDBDBD]'>
                 Statutory Disclaimer: Olyv is an ISO 27001:2013 - certified digital lending platform that partners exclusively with RBI-registered lenders to provide financial solutions. All loan approvals, interest rates, and repayment terms are at the sole discretion of the respective lending partners and are subject to their evaluation criteria. Olyv does not influence the decisions made by its lending partners. Borrowers are advised to carefully read and understand the terms and conditions associated with loan products before proceeding. Availability of services is subject to applicable laws, regulations, and the platform’s policies. Terms and conditions apply
             </p>
         </div>
          <div className='py-5 md:px-5'>
             <hr style={{ borderTop: '0.1px solid #BDBDBD' }} className='opacity-40'/>
         </div>
         <div>
            <h1 style={{ fontFamily: "PovetaracSansBold" }}  className='flex items-center py-3 justify-center text-[#BDBDBD]/30 text-4xl lg:text-9xl '>MADE IN INDIA</h1>
         </div>
          <div clas style={{ fontFamily: "PovetaracSansBlack" }} className='text-[#BDBDBD] pt-6 py-3 gap-3 text-[14px] md:px-5 text-center mx-auto flex items-center justify-center flex-wrap md:items-center md:gap-10'>
             <h1 className="text-center">
             © 2025 Borrowly Technologies. All copy rights are reserved.
            </h1>
            
          </div>
        
       </div>
    </div>
  )
}

export default Footer_New
