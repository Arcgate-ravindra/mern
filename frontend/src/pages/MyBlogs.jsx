import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";

const MyBlogs = () => {
  const { id } = useParams();
  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(URL + "/api/posts/user/" + id, {
          withCredentials: true,
        });
        if (res.data) {
          setPosts(res.data);
        }
      } catch (error) {
        console.log(
          `error while fetchingb the single post in myblogs ${error.message}`
        );
      }
    };
    fetchPost();
  }, [id]);
  // console.log("posts",Posts)
  return (
    <div>
      <Navbar />
      {Posts.length > 0 ? (
        Posts.map((post) => (
          <div className="px-8 md:px-[200px] min-h-[80vh]" key={post._id}>
            <ProfilePosts post = {post} />
          </div>
        ))
      ) : (
        <div><h1>No Posts are available</h1></div>
      )}
      <Footer />
    </div>
  );
};

export default MyBlogs;
