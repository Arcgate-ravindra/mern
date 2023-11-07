import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import axios from "axios";
import { URL } from "../url";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation()
  console.log(search);
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get(URL + "/api/posts/" + search);
        setPosts(res.data);
      } catch (error) {
        console.log(`Error while fetching the all post api : ${error.message}`);
      }
    };

    fetchAllPosts();
  }, [search]);
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
