import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import ToDoContext from "../context/mainContext";



const Profile = () => {
  const {id} = useParams();
  const [User,setUser] = useState();
  const [email, setEmail] = useState("");
  const [username,setUsername] = useState("")
  const usenavigate = useNavigate();
  const {user} = useContext(ToDoContext);
  useEffect(() => {
    const userFetch = async () => {
      try {
              const res = await axios.get(URL + "/api/users/" + id);
              if(res.data){
                setUser(res.data);
                setEmail(res.data.email);
                setUsername(res.data.username);
              }
      } catch (error) {
            console.log("error while fetching using users in profile" + error,message)
      }
    }
    userFetch()
  },[id])

  const updateHandler = async () => {
    try {
        await axios.put(URL + "/api/users/" + id, {username,email}, {withCredentials:true})
        setEmail("")
        setUsername("")
        usenavigate(`/profile/${id}`)
    } catch (error) {
        console.log("error while updating the user" + error.message)
    }
  }

  const delHandler = async() => {
    try {
        await axios.delete(URL + "/api/users/" + id, {withCredentials : true})
        useNavigate("/")
    } catch (error) {
        console.log("error while deleting the user" + error.message)
    }
  }
  return  user?._id === id ?( 
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col justify-center items-center space-y-4">
          <img src="https://images.unsplash.com/photo-1698778874232-6a0a58d84055?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8" />
          <h1 className="font-bold text-xl">{User?.username}</h1>
        </div>
        <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
          <div className=" flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {/* <input onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none px-4 py-2 text-gray-500" placeholder="Your password" type="password"/> */}
            <div className="flex items-center space-x-4 mt-8">
              <button onClick={updateHandler} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">
                Update
              </button>
              <button onClick={delHandler} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">
                Delete
              </button>
            </div>
            {/* {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>} */}
          </div>
        </div>
      </div>
      <Footer />`
    </div>
  ) : (<div>You are not authenticated...!!</div>);
};

export default Profile;