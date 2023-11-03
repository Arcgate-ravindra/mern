import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import axios from "axios";
import { URL } from "../url";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get(URL + "/api/posts/");
        setPosts(res.data);
      } catch (error) {
        console.log(`Error while fetching the all post api : ${error.message}`);
      }
    };

    fetchAllPosts();
  }, []);
  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {posts.map((post) => (
          <HomePosts key={post._id} post={post} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
