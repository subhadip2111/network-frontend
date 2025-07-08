// components/PostLayout.jsx
import { Outlet, Link } from "react-router-dom";

const PostLayout = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
        <Link
          to="/post/create"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Create Post
        </Link>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <Outlet /> {/* Dynamically renders PostList, CreatePost, or PostDetails */}
      </div>
    </div>
  );
};

export default PostLayout;
