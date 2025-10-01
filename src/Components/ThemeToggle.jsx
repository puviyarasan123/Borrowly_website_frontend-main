
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = ({toggleTheme,isDarkMode}) => {
  
  return (
    <div
      onClick={toggleTheme}
      className={`w-16 h-9 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isDarkMode ? "bg-gray-300" : "bg-[#00C2CC]"
      }`}
    >
      <div
        className={`w-7 h-7 flex items-center justify-center rounded-full transition-transform duration-300 ${
          isDarkMode ? "translate-x-0 bg-gray-600" : "translate-x-7 bg-white"
        }`}
      >
        {isDarkMode ? (
          <FaMoon className="text-white text-sm" />
        ) : (
          <FaSun className="text-[#00C2CC] text-sm" />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
