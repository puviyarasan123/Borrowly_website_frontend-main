import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

import Guide_data from "../assets/Data/GuideData";

import Social_media_1 from "/Social_media_1.svg";
import Social_media_2 from "/Social_media_2.svg";
import Social_media_3 from "/Social_media_3.svg";
import Social_media_4 from "/Social_media_4.svg";
import Social_media_5 from "/Social_media_5.svg";
import Vehical_loan from "../assets/Images/Vehicle_Loan_shortBanner.avif";
import Personal_loan from "../assets/Images/Person_loan_shortBanner.avif";
import Business_Loan from "../assets/Images/Business_Loan_shortBanner.avif";
import Home_Loan from "../assets/Images/Home_Loan_shortBanner.avif";
import Education_Loan from "../assets/Images/Education_Loan_shortBanner.avif";
import Insurance_Loan from "../assets/Images/Insurance_Loan_ShortBanner.avif";
import { toast } from "react-toastify";

import Footer_subscribe from '../Components/Footer_subscribe'
import Footer_New from "../Components/Footer_New";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const Recommended_Guides = {
  Vehical_loan: {
    banner: Vehical_loan,
    title: "Vehicle Loan Guide: Drive Your Dream Car with Confidence",
    parentlink: "Vehical_loan_Guides",
  },
  Personal_loan: {
    banner: Personal_loan,
    title: "Personal Loan Guide: Everything You Need to Know Before Borrowing",
    parentlink: "Personal_loan_Guides",
  },
  Business_Loan: {
    banner: Business_Loan,
    title: "Business Loan Guide: Fuel Your Business Growth",
    parentlink: "Businees_loan_Guides",
  },
  Home_Loan: {
    banner: Home_Loan,
    title: "Home Loan Guide: A Complete Beginner’s Handbook",
    parentlink: "Home_loan_Guides",
  },
  Education_Loan: {
    banner: Education_Loan,
    title: "Education Loan Guide: Invest in Your Future",
    parentlink: "Education_loan_Guides",
  },
  Insurance_Loan: {
    banner: Insurance_Loan,
    title: "Insurance Guide: Protect What Matters Most",
    parentlink: "insurance_loan_Guides",
  },
};

// helpers
const norm = (s) =>
  (s || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

const buildGuidePath = (key, parentlink) =>
  parentlink && parentlink.length > 0
    ? `/Guides/${parentlink}/${key}`
    : `/Guides/${key}`;

const Breadcrumbs = () => {
  
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <motion.nav
      className="text-sm cursor-default text-gray-600 my-4"
      variants={fadeUp}
      initial="hidden"
      animate="show"
    >
      <ul
        style={{ fontFamily: "PovetaracSansBold" }}
        className="flex text-[12px] md:text-[16px] flex-wrap items-center gap-2"
      >
        <li>
          <Link
            to="/"
            className="hover:underline underline-offset-4 hover:text-[#00C2CC]"
          >
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label = value
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <li key={to} className="flex items-center gap-2">
              <FiChevronRight className="text-gray-400" />
              {isLast ? (
                <span className="font-medium text-black">{label}</span>
              ) : (
                <Link
                  to={to}
                  className="hover:underline underline-offset-4 hover:text-[#00C2CC]"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};

const GuideSubPage = () => {
      const navigate = useNavigate()
  const location = useLocation();
  const { guideId } = useParams();
  const pathnames = location.pathname.split("/").filter(Boolean);
  const lastSegment = guideId || pathnames[pathnames.length - 1] || "";

  const guide = Guide_data[lastSegment];
  const currentKeyNorm = norm(lastSegment);
  const currentEntry = Object.entries(Recommended_Guides).find(
    ([key]) => norm(key) === currentKeyNorm
  );
  const currentParent = currentEntry?.[1]?.parentlink || "";
  const currentParentNorm = norm(currentParent);
  const sameParent = Object.entries(Recommended_Guides).filter(
    ([key, item]) =>
      norm(key) !== currentKeyNorm && norm(item.parentlink) === currentParentNorm
  );

  const others = Object.entries(Recommended_Guides).filter(
    ([key]) => norm(key) !== currentKeyNorm && !sameParent.some(([k]) => k === key)
  );
  const recommended = [...sameParent, ...others].slice(0, 3);

  return (
    <>
    <div className="max-w-screen-xl px-5 pb-10 mx-auto">
      <Breadcrumbs />
      {guide ? (
        <div className="mt-6">
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full rounded-xl mb-6"
          />
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <h2
                style={{ fontFamily: "PovetaracSansBlack" }}
                className="text-xl lg:text-3xl font-bold"
              >
                {guide.title}
              </h2>

              <div className="py-4 flex gap-4 items-center border border-l-0 border-r-0 border-t-0 border-b-[#BDBDBD]">
                <p
                  style={{ fontFamily: "PovetaracSansBlack" }}
                  className="text-[#3459FC] text-[16px] lg:text-xl"
                >
                  {guide.subitlte}
                </p>
                <div>
                  <p style={{ fontFamily: "PovetaracSansBold" }} className="text-[#575757] text-[12px] lg:text-lg">
                    {guide.EstComplete} read | {guide.CreatedAt}
                  </p>
                </div>
              </div>

              <div
                style={{ fontFamily: "PovetaracSansBold" }}
                className="mt-8 prose text-[14px] lg:text-lg text-justify"
                dangerouslySetInnerHTML={{ __html: guide.Content }}
              />
            </div>

            {/* Sidebar */}
            <div className="w-full max-w-[375px] px-4">
              {/* Share */}
              <div className="border border-l-0 border-r-0 border-t-0 pb-6 border-b-[#BDBDBD]">
                <h1 style={{ fontFamily: "PovetaracSansBlack" }} className="text-[#000000] text-lg">
                  Share this Guide
                </h1>
                <div className="mt-2 gap-3 flex">
                  <img src={Social_media_1} alt="" className="w-7 cursor-pointer" />
                  <img src={Social_media_2} alt="" className="w-7 cursor-pointer" />
                  <img src={Social_media_3} alt="" className="w-6 cursor-pointer" />
                  <img src={Social_media_4} alt="" className="w-7 cursor-pointer" />
                  <img 
                    src={Social_media_5} 
                    alt="share" 
                    className="w-7 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                        .then(() => {
                          toast.success("🔗 URL copied to clipboard!");
                        })
                        .catch(() => {
                          toast.error("❌ Failed to copy!");
                        });
                    }}
                  />
                </div>
              </div>


              <div className="py-5">
                <h1
                  style={{ fontFamily: "PovetaracSansBlack" }}
                  className="text-[#000000] text-lg mb-4"
                >
                  Recommended Guides
                </h1>

                {recommended.map(([key, item]) => (
                  <div
                    key={key}
                   onClick={() => {
                 navigate(`/Guides/${item.parentlink}`);
                 window.scrollTo(0, 0);
               }}
                    className="block mb-5 cursor-pointer"
                  >
                    <img
                      src={item.banner}
                      alt={item.title}
                      className="w-full rounded-lg"
                    />
                    <p
                      style={{ fontFamily: "PovetaracSansBlack" }}
                      className="text-[#000000] mt-3 text-lg"
                    >
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No guide found for this topic.</p>
      )}
    </div>
    <Footer_subscribe/>
    <Footer_New/>
    </>
  );
};

export default GuideSubPage;
