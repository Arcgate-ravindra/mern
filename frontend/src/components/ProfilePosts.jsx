/* eslint-disable react/prop-types */
import { useContext } from "react";
import ToDoContext from "../context/mainContext";

const ProfilePosts = ({ post }) => {
  const { user } = useContext(ToDoContext);
  const date = new Date(post.updatedAt);
  // Extract and format the time part along with AM/PM:
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  const formattedTime = `${formattedHours}:${minutes} ${amPm}`;
  return user?._id === post?.userId ? (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={post.photo} alt="" className="h-full w-full object-cover" />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.createdAt).toDateString()}</p>
            <p>{formattedTime}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">{post.desc}</p>
      </div>
    </div>
  ) : null;
};

export default ProfilePosts;
