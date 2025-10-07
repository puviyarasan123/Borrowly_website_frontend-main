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
            <motion.section 
                className="text-center w-full max-w-screen-xl mx-auto py-10" 
                initial="hidden" 
                animate="show" 
                variants={{ 
                    hidden: {}, 
                    show: { transition: { staggerChildren: 0.15 } },
                }}
            >
                <p style={{ fontFamily: 'PovetaracSansBold' }} className="text-[#084DB3] text-[14px] bg-[#DEE8F6] mx-auto text-left rounded-full w-fit px-4 py-1.5">Visit Our Team</p>
                <motion.h1 variants={fadeUp} style={{ fontFamily: "PovetaracSansBlack" }} className="text-center mt-4 text-[28px] md:text-[36px] xl:text-[40px] leading-[1.1]">Our Leadership Team</motion.h1>
                <motion.p variants={fadeUp} style={{ fontFamily: "PovetaracSansBold" }} className="mt-2 px-5 w-full max-w-[800px] mx-auto text-[14px] md:text-lg">
                    Driven by purpose, our board blends creativity, innovation, and expertise to shape remarkable outcomes.
                </motion.p>
            </motion.section>

            <div className='text-center pb-10 w-full max-w-screen-xl px-5 mx-auto'>
                <div className='grid grid-cols-1 gap-10 md:gap-14 lg:gap-2'>
                    {/* Divya Sappogu - Founder & Director */}
                    <div className='flex flex-col md:flex-row items-center justify-center gap-5 p-5 bg-white shadow-lg rounded-2xl'>
                        <div className="md:w-[40%] flex justify-center items-end rounded-2xl bg-[#ffe9d6]"> 
                            <img src={Team_2} alt='Divya Sappogu' className='h-auto w-full max-w-[400px] rounded-2xl '/>
                        </div>
                        <div className="text-left md:w-1/2 mt-5 md:mt-0 p-5">
                            <h1 style={{ fontFamily: "PovetaracSansBlack" }} className='text-2xl md:text-3xl'>Divya Sappogu</h1>
                            <p style={{ fontFamily: 'PovetaracSansBold' }} className='text-[#084DB3] text-lg md:text-xl'>Founder & Director</p>
                            <p style={{ fontFamily: "PovetaracSansBold" }} className="mt-4 text-base md:text-xl text-[#333]">
                                Divya is the visionary mind behind Borrowly’s foundation and growth. With strong expertise in
                                financial services and strategic development, she focuses on innovation, customer experience, and
                                sustainable business practices. Her leadership ensures that Borrowly remains agile,
                                customer-focused, and ahead of emerging financial trends.
                            </p>
                        </div>
                    </div>

                    {/* Mahendra B M - Managing Director & CEO */}
                    <div className='flex flex-col md:flex-row-reverse items-center justify-center gap-5 p-5 bg-white shadow-lg rounded-2xl'>
                        <div className="md:w-[40%] flex justify-center items-end rounded-2xl bg-[#E9F4FF]">
                            <img src={Team_1} alt='Mahendra B M' className='h-auto w-full max-w-[400px] rounded-2xl'/>
                        </div>
                        <div className="text-left md:w-1/2 mt-5 md:mt-0 p-5">
                            <h1 style={{ fontFamily: "PovetaracSansBlack" }} className='text-2xl md:text-3xl'>Mahendra B M</h1>
                            <p style={{ fontFamily: 'PovetaracSansBold' }} className='text-[#084DB3] text-lg md:text-xl'>Managing Director & CEO</p>
                            <p style={{ fontFamily: "PovetaracSansBold" }} className="mt-4 text-base md:text-xl text-[#333]">
                                As Managing Director and Chief Executive Officer, Mahendra leads Borrowly’s overall business
                                direction, strategy, and innovation. With a solid background in fintech operations, financial
                                technology, and digital transformation, he plays a key role in driving organizational growth and
                                operational excellence. His leadership combines business acumen with a passion for building
                                scalable, technology-driven financial ecosystems.
                            </p>
                        </div>
                    </div>

                    {/* Komari Naga Maddilety - Director & Co-founder */}
                    <div className='flex flex-col md:flex-row items-center justify-center gap-5 p-5 bg-white shadow-lg rounded-2xl'>
                        <div className="md:w-[40%] flex justify-center items-end rounded-2xl bg-[#F2EEFF]">
                            <img src={Team_3} alt='Komari Naga Maddilety' className='h-auto w-full max-w-[400px] rounded-2xl'/>
                        </div>
                        <div className="text-left md:w-1/2 mt-5 md:mt-0 p-5">
                            <h1 style={{ fontFamily: "PovetaracSansBlack" }} className='text-2xl md:text-3xl'>Komari Naga Maddilety</h1>
                            <p style={{ fontFamily: 'PovetaracSansBold' }} className='text-[#084DB3] text-lg md:text-xl'>Director & Co-founder</p>
                            <p style={{ fontFamily: "PovetaracSansBold" }} className="mt-4 text-base md:text-xl text-[#333]">
                                Komari Naga is a strategic thinker with deep expertise in fintech integration, process optimization,
                                and business scalability. His operational leadership ensures that Borrowly consistently delivers
                                efficient, transparent, and reliable financial services. He plays a vital role in executing Borrowly’s
                                mission of redefining digital lending through trust and innovation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Together for a Smarter Financial Future Section */}
                <div className="mt-20 w-full max-w-[800px] mx-auto text-center">
                    <h1 style={{ fontFamily: "PovetaracSansBlack" }} className="text-3xl md:text-4xl">Together for a Smarter Financial Future</h1>
                    <p style={{ fontFamily: "PovetaracSansBold" }} className="mt-4 text-base md:text-xl text-[#333]">
                        United by vision and driven by innovation, our leadership team is committed to transforming how
                        individuals and businesses access finance. At Borrowly, we believe in empowering our customers
                        through technology, transparency, and trust — redefining the future of financial solutions in India.
                    </p>
                </div>
            </div>

            <Team_section2/>
            <ContactusBanner/>
            <Footer_New/>
        </>
    );
}

export default Team;