// components/PostDetails.jsx
import { useParams } from "react-router-dom";

const PostDetails = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    return <div className="text-red-600">Post not found</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
      <p className="text-gray-500 text-sm">By {post.author} • {post.date}</p>
      <div className="text-gray-700 leading-relaxed mt-4 whitespace-pre-line">
        {post.content}
      </div>
    </div>
  );
};

export default PostDetails;
