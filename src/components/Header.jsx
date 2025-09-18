import portal from "../assets/portal.png";
import { useNavigate, NavLink } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <img
          onClick={() => navigate("/")}
          src={portal}
          alt="Portal"
          className="w-22 h-22 cursor-pointer"
        />
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive ? "text-green-400 font-bold" : "hover:text-green-400"
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
                    isActive ? "text-green-400 font-bold" : "hover:text-green-400"
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
                    isActive ? "text-green-400 font-bold" : "hover:text-green-400"
                  }`
                }
              >
                Locations
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
