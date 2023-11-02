import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../url";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const [Post, setPost] = useState("");
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(URL + `/api/posts/${id}`);
        if (res.data) {
          setPost(res.data);
        }
      } catch (error) {
        console.log(`error while fetching the single post ${error.message}`);
      }
    };
    fetchPost();
  }, []);
  const date = new Date(Post.updatedAt);
  // Extract and format the time part along with AM/PM:
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  const formattedTime = `${formattedHours}:${minutes} ${amPm}`;
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            {Post.title}
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer">
              <BiEdit />
            </p>
            <p className="cursor-pointer">
              <MdDelete />
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>{Post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(Post.createdAt).toDateString()}</p>
            <p>{formattedTime}</p>
          </div>
        </div>
        <img src={Post.photo} className="w-full  mx-auto mt-8" alt="" />
        <p className="mx-auto mt-8">{Post.desc}</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          {Post?.categories &&
            Post.categories.map((category, index) => (
              <div
                className="flex justify-center items-center space-x-2"
                key={index}
              >
                <h1>{category}</h1>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
