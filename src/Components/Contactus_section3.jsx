import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Contactus_section2 from "./Contactus_section2";
import Contactus_section1 from "./Contactus_section1";

const tabFade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const contentVariants = {
  initial: (dir) => ({ opacity: 0, x: dir > 0 ? 20 : -20 }),
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -20 : 20, transition: { duration: 0.25, ease: "easeIn" } }),
};

const Contactus_section3 = () => {
  const [selected, setSelected] = useState(true); // true=Borrower, false=Borrow Agents
  const [dir, setDir] = useState(1); // for slide direction

  const switchTab = (nextSelected) => {
    if (nextSelected === selected) return;
    // direction: going to right tab => 1; to left tab => -1
    setDir(nextSelected ? -1 : 1);
    setSelected(nextSelected);
  };

  return (
    <section className="py-10">
      {/* Tabs */}
      <motion.div
        className="relative grid grid-cols-2 border-b mb-12"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {/* Sliding underline */}
        <motion.div
          className="absolute bottom-0 h-[2px] bg-black"
          initial={false}
          animate={{ left: selected ? "0%" : "50%", width: "50%" }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
        />

        {/* Borrower tab */}
        <motion.h2
          variants={tabFade}
          onClick={() => switchTab(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && switchTab(true)}
          style={{ fontFamily: "PovetaracSansblack" }}
          className={`text-center pb-2 cursor-pointer text-lg md:text-2xl select-none ${
            selected ? "text-black" : "text-[#7F8286]"
          }`}
        >
          <motion.span
            animate={{ scale: selected ? 1.02 : 1, y: selected ? -1 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="inline-block"
          >
            Borrower
          </motion.span>
        </motion.h2>

        {/* Borrow Agents tab */}
        <motion.h2
          variants={tabFade}
          onClick={() => switchTab(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && switchTab(false)}
          style={{ fontFamily: "PovetaracSansblack" }}
          className={`text-center pb-2 cursor-pointer text-lg md:text-2xl select-none ${
            !selected ? "text-black" : "text-[#7F8286]"
          }`}
        >
          <motion.span
            animate={{ scale: !selected ? 1.02 : 1, y: !selected ? -1 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="inline-block"
          >
            Borrow Agents
          </motion.span>
        </motion.h2>
      </motion.div>

      {/* Content */}
      <div className="relative">
        <AnimatePresence mode="wait" custom={dir}>
          {selected ? (
            <motion.div
              key="borrower"
              custom={dir}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col md:grid lg:grid-cols-2 gap-10 md:gap-8"
            >
              <div>
                <Contactus_section2 />
              </div>
              <div>
                <Contactus_section1 />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="agents"
              custom={dir}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center justify-center gap-3 py-8"
            >
              {/* Placeholder – replace with your agents content */}
              <p
                style={{ fontFamily: "PovetaracSansbold" }}
                className="text-[#7F8286] text-base"
              >
                Agent resources coming soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contactus_section3;
