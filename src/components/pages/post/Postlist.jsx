// components/PostList.jsx
import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
          <p className="text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>
          <div className="mt-4">
            <Link
              to={`/posts/${post.id}`}
              className="text-indigo-600 hover:underline text-sm font-medium"
            >
              Read more →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
