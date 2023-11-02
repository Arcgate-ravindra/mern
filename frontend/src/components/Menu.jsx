
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../url"; 
import ToDoContext from "../context/mainContext";
import { useContext } from "react";
const Menu = () => {
  const {setUser,user} = useContext(ToDoContext);
  const usenavigate = useNavigate()
  const logoutHandler = async () => {
    try {
          await axios.get(URL + "/api/auth/logout",{withCredentials:true})
          setUser(null)
          usenavigate("/")
    } catch (error) {
          console.log(`error while logout the user ${error.message}`)
    }
  }
  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
      <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
        <Link to="/profile/123456" >Profile</Link> 
      </h3>

      <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
        <Link to={`/myblogs/${user._id}`}>My blogs</Link>
      </h3>

      <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
        <button onClick={logoutHandler}>Logout</button>
      </h3>
    </div>
  );
};

export default Menu;
