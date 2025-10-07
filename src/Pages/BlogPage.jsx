import React from "react";
import { motion } from "framer-motion";
import blog1 from "../assets/Images/Blog1.avif";
import blog2 from "../assets/Images/Blog2.avif";
import blog3 from "../assets/Images/Blog3.avif";
import blog4 from "../assets/Images/Blog4.avif";
import blog5 from "../assets/Images/Blog5.avif";
import blog6 from "../assets/Images/Blog6.avif";
import { useNavigate } from "react-router-dom";

import Footer_New from '../Components/Footer_New.jsx'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const cardIn = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const BlogCard = ({ image, title, description, onReadMore }) => {
  return (
    <motion.div className="flex-1 bg-[#F4F4F4] cursor-pointer rounded-4xl p-5" variants={cardIn} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 320, damping: 22 }}>
      <div className="relative overflow-hidden rounded-2xl" whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
        <img src={image} alt={title} className="w-full h-auto rounded-2xl" />
        {/* soft shine on hover */}
        <motion.span className="pointer-events-none absolute inset-0" initial={{ background: "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, transparent 80%)" }} whileHover={{ background: "linear-gradient(120deg, transparent 10%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.25) 60%, transparent 90%)" }} transition={{ duration: 0.35 }} />
      </div>

      <div style={{ fontFamily: "PovetaracSansBold" }} className="py-5 px-3">
        <h1 style={{ fontFamily: "PovetaracSansBlack" }} className="text-xl md:text-2xl">{title}</h1>
        <p className="text-[16px] mt-2 text-[#6D6D6D]">{description}</p>
        <motion.button onClick={onReadMore} className="pt-5 cursor-pointer text-lg underline underline-offset-4" whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
          Read more
        </motion.button>
      </div>
    </motion.div>
  );
};

const Blogs = () => {
  const Navigate = useNavigate();
  const blogPosts = [
    {
      image: blog1,
      title: "Borrowly Financial Insights Blogs..",
      description: "A collection of professional blogs by Borrowly designed to educate and guide customers towards financial discipline..",
      path: "/blogs/financial-discipline"
    },
    {
      image: blog2,
      title: "How to Choose the Right Loan for Your Needs",
      description: "Financial discipline is the foundation of financial stability.",
      path: "/blogs/blog-1"
    },
    {
      image: blog3,
      title: "The Smart Borrower's Guide: Things to Know Before Taking a Loan",
      description: "Before signing any loan agreement, every borrower should understand what they're committing to.",
      path: "/blogs/blog-2"
    },
    {
      image: blog4,
      title: "Everything You Need to Know About Your Credit Score (CIBIL)",
      description: "Your CIBIL score is a three-digit number representing your creditworthiness.",
      path: "/blogs/blog-3"
    },
    {
      image: blog5,
      title: "10 Easy Ways to Boost Your Credit Score in 90 Days",
      description: "Improving your CIBIL score requires consistency and discipline.",
      path: "/blogs/blog-4"
    },
    {
      image: blog6,
      title: "30 Smart Money-Saving Tips to Get Out of the Debt Trap",
      description: "Managing debt requires planning, discipline, and strategic action.",
      path: "/blogs/blog-5"
    }
  ];

  return (
    <>
      <motion.div initial="hidden" animate="show" variants={container}>
        <motion.div className="max-w-screen-lg mx-auto pt-10 px-2 sm:px-5" variants={fadeUp}>
          <p style={{ fontFamily: "PovetaracSansBold" }} className="text-[#084DB3] text-[14px] bg-[#DEE8F6] text-left rounded-full w-fit px-4 py-1.5">
            Read Our Blog
          </p>
          <h1 style={{ fontFamily: "PovetaracSansBold" }} className="text-4xl mt-3">
            Borrowly Finance Blog
          </h1>
          <p style={{ fontFamily: "PovetaracSansBold" }} className="w-full max-w-[800px] text-[14px] text-left lg:text-[14px] xl:text-lg">
            Latest updates, insights, and news on loans, money, and smart borrowing.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-2 py-5">
            {blogPosts.map((blog, index) => (
              <motion.div key={index} variants={container}>
                <BlogCard
                  image={blog.image}
                  title={blog.title}
                  description={blog.description}
                  onReadMore={() => Navigate(blog.path)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <div className="pt-16">
        <Footer_New/>
      </div>
    </>
  );
};

export default Blogs;