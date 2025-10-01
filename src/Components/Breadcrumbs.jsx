import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";


const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

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
}

export default Breadcrumbs
