import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/fetch-post");
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      {posts.length === 0 && <p>No posts available</p>}
      {posts.map((post) => (
        <div key={post._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          {post.image && <img src={post.image} alt={post.title} style={{ maxWidth: "300px" }} />}
        </div>
      ))}
    </div>
  );
};

export default FetchPost;