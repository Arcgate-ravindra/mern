import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import ToDoContext from "../context/mainContext";

const Navbar = () => {
  const { user } = useContext(ToDoContext);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(null);
  const showMenu = () => {
    setMenu(!menu);
  };
  const usenavigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">Blog Market</Link>
      </h1>
      <div className="flex justify-center items-center space-x-0">
        <p onClick={() => usenavigate(search ? `?search=${search}` : usenavigate("/"))}className="cursor-pointer">
          <BsSearch />
        </p>
        <input
          className="outline-none px-3 "
          placeholder="Search a post"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <>
            <h3>
              <Link to="/write">Write</Link>
            </h3>
            <div>
              <p onClick={showMenu} className="cursor-pointer relative">
                <FaBars />
              </p>
              {menu && <Menu />}
            </div>
          </>
        ) : (
          <>
            <h3>
              <Link to="/login">Login</Link>
            </h3>
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
