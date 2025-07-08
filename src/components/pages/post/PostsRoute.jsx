// pages/PostsRoute.jsx
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// import PostLayout from "../components/PostLayout";

import PostLayout from "./PostLayout";
import PostList from "./Postlist";
import CreatePost from "./CreatePost";
import PostDetails from "./PostDetails";

const PostsRoute = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "How to build with React",
      excerpt: "A short guide on building UI with React and Tailwind CSS.",
      content: "Here is the full content of the post...",
      author: "Subhadip",
      date: "2025-07-08",
    },
  ]);

  const handleAddPost = (newPost) => {
    const id = posts.length + 1;
    const post = {
      ...newPost,
      id,
      date: new Date().toLocaleDateString(),
    };
    setPosts([post, ...posts]);
  };

  return (
    <Routes>
      <Route path="/" element={<PostLayout/>}>
        <Route index element={<PostList posts={posts} />} />
        <Route path="create" element={<CreatePost onSubmit={handleAddPost} />} />
        <Route path=":id" element={<PostDetails posts={posts} />} />
      </Route>
    </Routes>
  );
};

export default PostsRoute;
