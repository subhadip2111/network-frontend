import { ArrowRight, Code, Heart, Lightbulb, MessageCircle, Rocket, Share2 } from "lucide-react";

const PostCard = ({ post, onLike, onComment, onJoin }) => {
  const getTypeIcon = (type) => {
    switch(type) {
      case 'startup': return <Rocket className="w-5 h-5 text-orange-500" />;
      case 'problem': return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'opensource': return <Code className="w-5 h-5 text-green-500" />;
      default: return <Lightbulb className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'startup': return 'bg-orange-100 text-orange-800';
      case 'problem': return 'bg-yellow-100 text-yellow-800';
      case 'opensource': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
          <div>
            <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
            <p className="text-sm text-gray-500">{post.author.username} • {post.timestamp}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getTypeIcon(post.type)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
            {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
            #{tag}
          </span>
        ))}
      </div>

      {post.mvpProgress && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">MVP Progress</span>
            <span className="text-sm font-bold text-indigo-600">{post.mvpProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${post.mvpProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h5 className="text-sm font-semibold text-gray-900 mb-2">Looking for:</h5>
        <div className="flex flex-wrap gap-2">
          {post.seeking.map(role => (
            <span key={role} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => onLike(post.id)}
            className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <Heart className="w-5 h-5" />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button 
            onClick={() => onComment(post.id)}
            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        
        <button 
          onClick={() => onJoin(post.id)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center space-x-2"
        >
          <span>Join Collaboration</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
export default PostCard;

// import {
//   Heart,
//   MessageCircle,
//   Share2,
//   Bookmark,
//   MoreHorizontal,
//   Users,
// } from "lucide-react";
// import { useState } from "react";

// const PostCard = ({ post, onLike, onComment, onJoin }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   const handleLike = () => {
//     setIsLiked(!isLiked);
//     onLike(post.id);
//   };

//   const handleBookmark = () => {
//     setIsBookmarked(!isBookmarked);
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl shadow-sm max-w-xl mx-auto my-6">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4">
//         <div className="flex items-center gap-3">
//           <img
//             src={post.author.avatar}
//             alt={post.author.name}
//             className="w-10 h-10 rounded-full object-cover"
//           />
//           <div>
//             <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
//             <p className="text-xs text-gray-500">@{post.author.username}</p>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={handleBookmark}
//             className="text-gray-500 hover:text-blue-500 transition"
//           >
//             <Bookmark className="w-5 h-5" />
//           </button>
//           <button className="text-gray-500 hover:text-gray-700 transition">
//             <MoreHorizontal className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       {/* Post Image */}
//       {post.image && (
//         <div className="w-full h-96 bg-gray-100">
//           <img
//             src={post.image}
//             alt="post content"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="flex items-center justify-between px-4 py-3">
//         <div className="flex items-center gap-6">
//           <button
//             onClick={handleLike}
//             className={`flex items-center gap-1 text-gray-600 hover:text-red-500 transition ${
//               isLiked ? "text-red-500" : ""
//             }`}
//           >
//             <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
//             <span className="text-sm font-medium">
//               {post.likes + (isLiked ? 1 : 0)}
//             </span>
//           </button>

//           <button
//             onClick={() => onComment(post.id)}
//             className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition"
//           >
//             <MessageCircle className="w-5 h-5" />
//             <span className="text-sm font-medium">{post.comments}</span>
//           </button>

//           <button className="flex items-center gap-1 text-gray-600 hover:text-green-500 transition">
//             <Share2 className="w-5 h-5" />
//             <span className="text-sm font-medium">Share</span>
//           </button>
//         </div>
//       </div>

//       {/* Post Text */}
//       <div className="px-4 pb-4 text-sm text-gray-800">
//         <p className="mb-2">
//           <span className="font-semibold">{post.author.name}</span>{" "}
//           {post.content}
//         </p>

//         {/* Collaborators */}
//         <div className="mt-3">
//           <h4 className="text-xs text-gray-500 uppercase mb-1 flex items-center gap-1">
//             <Users className="w-4 h-4 text-purple-500" />
//             Collaborators Wanted:
//           </h4>
//           <div className="flex flex-wrap gap-2">
//             {post.seeking.map((role) => (
//               <span
//                 key={role}
//                 className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium"
//               >
//                 {role}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostCard;

