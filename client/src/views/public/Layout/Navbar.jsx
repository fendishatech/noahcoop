import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  return (
    <div
      className={` ${
        scrolled ? "bg-white shadow-md" : "transparent"
      } bg-opacity-10 backdrop-filter backdrop-blur-[5px] fixed top-0 left-0 w-full h-[80px] z-10`}
    >
      <nav className="w-full h-full flex justify-between items-center px-6 py-2">
        <div className="text-2xl font-semibold text-black ">
          <h1 className="text-6xl font-bold bg-gradient-to-b from-green-500 to-yellow-800 bg-clip-text text-transparent">
            ኖህ <span className="text-5xl">Noah</span>{" "}
            <span className="text-2xl">SCOOP</span>
          </h1>
        </div>
        <ul className="flex gap-3">
          <li>TOKENIZATION</li>
          <li>SENTENCES</li>
          <li>
            <Link to={"/pos"}>POS</Link>
          </li>
          <li>STEMMING</li>
          <li>SENTIMENT</li>
          <li>NGRAMS</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
