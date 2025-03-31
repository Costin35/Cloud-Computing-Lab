import { useEffect, useState } from "react";
import Feed from "../../componenets/Feed/Feed";
import './styles.css';

const Home = () => {
  const API_URL = "http://localhost:5108/api/Posts";
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(API_URL, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Error at loading posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPosts();
  }, [API_URL]);

  return (
    <main>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.length ? <Feed posts={posts} /> : <p>No posts.</p>}
    </main>
  );
};

export default Home;