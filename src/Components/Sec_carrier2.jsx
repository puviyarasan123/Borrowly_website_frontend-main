import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import SeachIcon from "../assets/Icons/SeachIcon.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate


const jobs = [
  /* CA & Legal Department */
  { role: "Chartered Accountants (CA)", team: "CA & Legal Department", location: "Bangalore, Karnataka", description: "Join our CA & Legal team to handle auditing, compliance, and taxation tasks." },
  { role: "Tax Consultants", team: "CA & Legal Department", location: "Bangalore, Karnataka", description: "Provide expert tax advisory services and ensure regulatory compliance." },
  { role: "Company Secretary (CS)", team: "CA & Legal Department", location: "Bangalore, Karnataka", description: "Manage corporate governance, secretarial functions, and legal documentation." },
  { role: "Legal Advisors (Business & Compliance)", team: "CA & Legal Department", location: "Bangalore, Karnataka", description: "Advise the business on legal and compliance matters." },
  { role: "Auditors", team: "CA & Legal Department", location: "Bangalore, Karnataka", description: "Perform internal and external audits to ensure financial accuracy." },
  { role: "GST & Income Tax Experts", team: "CA & Legal Department", location: "Bangalore, Karnataka", description: "Handle GST filings, income tax, and related financial compliance." },

  /* Loan & Finance Department */
  { role: "Loan Officers (Personal, Business, Gold, Education, Vehicle)", team: "Loan & Finance Department", location: "Bangalore, Karnataka", description: "Assist customers with loan applications and approvals." },
  { role: "Credit Analysts", team: "Loan & Finance Department", location: "Bangalore, Karnataka", description: "Analyze credit data and financial statements to evaluate risk." },
  { role: "CIBIL Score Improvement Advisors", team: "Loan & Finance Department", location: "Bangalore, Karnataka", description: "Provide guidance to improve customers' credit scores." },
  { role: "Relationship Managers (Customer Loan Guidance)", team: "Loan & Finance Department", location: "Bangalore, Karnataka", description: "Maintain strong client relationships and provide loan guidance." },
  { role: "Risk & Compliance Officers", team: "Loan & Finance Department", location: "Bangalore, Karnataka", description: "Monitor financial and operational risks and ensure compliance." },

  /* Operations & Support Department */
  { role: "Telecallers (Inbound/Outbound)", team: "Operations & Support Department", location: "Bangalore, Karnataka", description: "Handle customer calls, queries, and follow-ups." },
  { role: "KYC Verification Officers", team: "Operations & Support Department", location: "Bangalore, Karnataka", description: "Verify customer identity and ensure KYC compliance." },
  { role: "Customer Support Executives", team: "Operations & Support Department", location: "Bangalore, Karnataka", description: "Provide customer support and resolve issues efficiently." },
  { role: "Document Collection & Processing Team", team: "Operations & Support Department", location: "Bangalore, Karnataka", description: "Collect and process client documents for loan and legal operations." },
  { role: "Back-Office Executives", team: "Operations & Support Department", location: "Bangalore, Karnataka", description: "Handle administrative and operational support tasks." },

  /* Technology Department */
  { role: "Full Stack Developers", team: "Technology Department", location: "Bangalore, Karnataka", description: "Build and maintain scalable web applications using modern technologies." },
  { role: "Mobile App Developers (Android/iOS)", team: "Technology Department", location: "Bangalore, Karnataka", description: "Develop and optimize mobile applications for Android and iOS." },
  { role: "Frontend & Backend Developers", team: "Technology Department", location: "Bangalore, Karnataka", description: "Implement frontend and backend solutions with high performance." },
  { role: "UI/UX Designers", team: "Technology Department", location: "Bangalore, Karnataka", description: "Design intuitive user interfaces and seamless user experiences." },
  { role: "Software Testers (QA)", team: "Technology Department", location: "Bangalore, Karnataka", description: "Test software for bugs and ensure product quality." },
  { role: "IT Support & Maintenance Engineers", team: "Technology Department", location: "Bangalore, Karnataka", description: "Provide IT support and maintain system infrastructure." },

  /* Business Development & Marketing Department */
  { role: "Business Development Managers (BDM)", team: "Business Development & Marketing Department", location: "Bangalore, Karnataka", description: "Identify new business opportunities and expand client base." },
  { role: "Sales Executives (Loans & Legal Services)", team: "Business Development & Marketing Department", location: "Bangalore, Karnataka", description: "Promote and sell loan and legal service offerings." },
  { role: "Digital Marketing Specialists", team: "Business Development & Marketing Department", location: "Bangalore, Karnataka", description: "Run digital campaigns and optimize online presence." },
  { role: "SEO/SEM Experts", team: "Business Development & Marketing Department", location: "Bangalore, Karnataka", description: "Optimize websites for search engines and manage paid campaigns." },
  { role: "Social Media Managers", team: "Business Development & Marketing Department", location: "Bangalore, Karnataka", description: "Manage social media channels and content strategy." },
  { role: "Content Writers / Copywriters", team: "Business Development & Marketing Department", location: "Bangalore, Karnataka", description: "Create compelling content for marketing campaigns." },

  /* Administration & HR Department */
  { role: "HR Manager (Recruitment & Training)", team: "Administration & HR Department", location: "Bangalore, Karnataka", description: "Manage recruitment, training, and employee relations." },
  { role: "Office Administrator", team: "Administration & HR Department", location: "Bangalore, Karnataka", description: "Ensure smooth office operations and administration." },
  { role: "Payroll & Accounts Manager", team: "Administration & HR Department", location: "Bangalore, Karnataka", description: "Handle payroll, accounting, and financial operations." },
  { role: "Legal Compliance Manager", team: "Administration & HR Department", location: "Bangalore, Karnataka", description: "Ensure organizational compliance with laws and regulations." },

  /* Management & Leadership */
  { role: "Founder & Director(s)", team: "Management & Leadership", location: "Bangalore, Karnataka", description: "Lead and oversee company vision and strategy." },
  { role: "Chief Executive Officer (CEO)", team: "Management & Leadership", location: "Bangalore, Karnataka", description: "Drive overall business strategy and operations." },
  { role: "Chief Operating Officer (COO)", team: "Management & Leadership", location: "Bangalore, Karnataka", description: "Oversee day-to-day business operations." },
  { role: "Chief Financial Officer (CFO)", team: "Management & Leadership", location: "Bangalore, Karnataka", description: "Manage financial strategy, planning, and reporting." },
  { role: "Chief Technology Officer (CTO)", team: "Management & Leadership", location: "Bangalore, Karnataka", description: "Lead technology strategy and innovation." },
];



/* ---------- helpers ---------- */
const useClickOutside = (refs, onClose) => {
  useEffect(() => {
    const handler = (e) => {
      const target = e.target;
      const clickedOutside = refs.every((r) => r.current && !r.current.contains(target));
      if (clickedOutside) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [refs, onClose]);
};

/* ---------- dropdown ---------- */
const Dropdown = ({ label, options, value, onChange, className }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  useClickOutside([btnRef, menuRef], () => setOpen(false));

  const selectedLabel = value ?? label;

  return (
    <div className={`relative ${className || ""}`}>
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        className="w-full h-[55px] bg-[#F4F4F4] rounded-lg px-4 text-left flex items-center justify-between"
        style={{ fontFamily: "PovetaracSansBold" }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`${value ? "text-black" : "text-gray-500"}`}>{selectedLabel}</span>
        <motion.svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            role="listbox"
            className="absolute z-20 mt-2 w-full max-h-64 overflow-auto rounded-xl bg-white shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="p-2">
              <button
                onClick={() => {
                  onChange(null);
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                Clear
              </button>
            </div>
            <div className="px-2 pb-2">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  role="option"
                  aria-selected={value === opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 ${value === opt.value ? "bg-gray-100" : ""}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------- variants ---------- */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};
const cardIn = {
  hidden: { opacity: 0, y: 22, scale: 0.99 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.2, ease: "easeIn" } },
};

/* ---------- main ---------- */
const Sec_carrier2 = () => {
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState(null);
  const [location, setLocation] = useState(null);
    const navigate = useNavigate();

  const teamOptions = useMemo(() => {
    const set = new Set(jobs.map((j) => j.team));
    return Array.from(set).sort().map((t) => ({ label: t, value: t }));
  }, []);

  const locationOptions = useMemo(() => {
    const set = new Set(jobs.map((j) => j.location));
    return Array.from(set).sort().map((l) => ({ label: l, value: l }));
  }, []);

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((j) => {
      const matchesSearch =
        !q ||
        j.role.toLowerCase().includes(q) ||
        j.team.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q);
      const matchesTeam = !team || j.team === team;
      const matchesLocation = !location || j.location === location;
      return matchesSearch && matchesTeam && matchesLocation;
    });
  }, [search, team, location]);

  const clearAll = () => {
    setSearch("");
    setTeam(null);
    setLocation(null);
  };

  return (
    <motion.section
      className="max-w-screen-xl cursor-default mx-auto py-10 px-4"
      variants={container}
      initial="hidden"
      animate="show"     // animate on first load
    >
      {/* Filters */}
      <div className="flex flex-col md:flex-row w-full gap-4 mb-5" variants={fadeUp}>
        <div className="relative flex-1">
          <img src={SeachIcon} alt="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
          <input
            type="text"
            placeholder="Search roles"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#F4F4F4] py-3 pl-10 h-[55px] pr-4 rounded-lg outline-none w-full"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          />
        </div>

        <Dropdown label="All teams" options={teamOptions} value={team} onChange={setTeam} className="flex-1" />
        <Dropdown label="All locations" options={locationOptions} value={location} onChange={setLocation} className="flex-1" />
      </div>

      {/* Summary */}
      <motion.p
        style={{ fontFamily: "PovetaracSansBold" }}
        className="py-4 pb-16 text-center text-xl text-[#5E6562]"
        variants={fadeUp}
      >
        Showing{" "}
        <span className="font-semibold">
          {filteredJobs.length} {filteredJobs.length === 1 ? "role" : "roles"}
        </span>{" "}
        {team ? <>in <span className="font-semibold">{team}</span></> : <>in <span className="font-semibold">all teams</span></>} and{" "}
        {location ? <span className="font-semibold">{location}</span> : <span className="font-semibold">all locations</span>}
        <button onClick={clearAll} className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer select-none underline-offset-2 hover:underline">
          Clear all filters
        </button>
      </motion.p>

      {/* Table headers (desktop) */}
      <motion.div
        style={{ fontFamily: "PovetaracSansBlack" }}
        className="hidden text-[16px] md:grid grid-cols-3 mt-6 px-10 text-black"
        variants={fadeUp}
      >
        <div>Role</div>
        <div>Teams</div>
        <div>Location</div>
      </motion.div>

      {/* Jobs list */}
      <motion.div className="flex flex-col mt-3 gap-8" layout>
        <AnimatePresence mode="popLayout">
          {filteredJobs.length === 0 ? (
            <motion.div
              key="no-results"
              className="bg-[#F9F9F9] rounded-2xl px-10 py-12 text-center"
              variants={cardIn}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className="text-lg text-gray-700 mb-2" style={{ fontFamily: "PovetaracSansBlack" }}>
                No matches found
              </div>
              <p className="text-gray-500" style={{ fontFamily: "PovetaracSansBold" }}>
                Try a different keyword, team, or location.
              </p>
            </motion.div>
          ) : (
            filteredJobs.map((job, idx) => (
              <motion.div
                key={`${job.role}-${idx}`}
                className="bg-[#F9F9F9] rounded-2xl px-10 py-10"
                layout
                variants={cardIn}
                initial="hidden"
                animate="show"
                exit="exit"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="grid md:grid-cols-3 gap-2">
                  <div style={{ fontFamily: "PovetaracSansBlack" }} className="text-lg text-gray-700">
                    {job.role}
                  </div>
                  <div style={{ fontFamily: "PovetaracSansBold" }} className="text-gray-400 text-base">
                    {job.team}
                  </div>
                  <div style={{ fontFamily: "PovetaracSansBold" }} className="text-gray-500 text-base">
                    {job.location}
                  </div>
                </div>
                <p style={{ fontFamily: "PovetaracSansBold" }} className="mt-2 py-4 text-gray-500 text-[16px]">
                  {job.description}
                </p>
               <motion.button
  onClick={() => navigate("/Carriers_form")} // ✅ Navigate to application form
  className="flex items-center gap-2 mt-4 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 cursor-pointer"
  whileHover={{ y: -2, boxShadow: "0 12px 28px rgba(0,0,0,0.12)" }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 340, damping: 22 }}
>
  Apply Now <IoIosArrowForward />
</motion.button>

              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default Sec_carrier2;
