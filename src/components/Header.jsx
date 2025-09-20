import logo from "../assets/logoo.png";
import { useNavigate, NavLink } from "react-router";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full text-white md:mt-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between md:px-4 py-3">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="Logo"
          className="h-16 cursor-pointer"
        />

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive ? "text-[#80c044]" : "hover:text-[#2f8741]"
                  }`
                }
              >
                Characters
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/episodes"
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive ? "text-[#80c044]" : "hover:text-[#2f8741]"
                  }`
                }
              >
                Episodes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/locations"
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive ? "text-[#80c044]" : "hover:text-[#2f8741]"
                  }`
                }
              >
                Locations
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav
              className="fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-green-light/95 to-green-dark/95 z-50 shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <ul className="flex flex-col items-start gap-6 p-6 text-lg">
                <li>
                  <NavLink
                    to="/"
                    end
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block transition-colors duration-200 ${
                        isActive ? "text-gray-800" : "hover:text-gray-800"
                      }`
                    }
                  >
                    Characters
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/episodes"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block transition-colors duration-200 ${
                        isActive ? "text-gray-800" : "hover:text-gray-800"
                      }`
                    }
                  >
                    Episodes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/locations"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block transition-colors duration-200 ${
                        isActive ? "text-gray-800" : "hover:text-gray-800"
                      }`
                    }
                  >
                    Locations
                  </NavLink>
                </li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
