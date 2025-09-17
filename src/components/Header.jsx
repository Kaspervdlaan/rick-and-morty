import portal from "../assets/portal.png";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="w-full bg-green-900 text-white pb-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <img onClick={() => navigate("/")} src={portal} alt="Portal" className="w-22 h-22 cursor-pointer" />
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="/"
                className="hover:text-green-400 transition-colors duration-200"
              >
                Characters
              </a>
            </li>
            <li>
              <a
                href="/episodes"
                className="hover:text-green-400 transition-colors duration-200"
              >
                Episodes
              </a>
            </li>
            <li>
              <a  
                href="/locations"
                className="hover:text-green-400 transition-colors duration-200"
              >
                Locations
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;