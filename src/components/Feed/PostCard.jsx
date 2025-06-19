// import { useState } from "react";
// import { Search, Menu, X, Heart, MessageCircle, Share2, Users, Plus, Zap, Globe, UserPlus, Settings, Bell, Home, Compass, BookOpen } from 'lucide-react';
// import CollaborationModal from "./CollaborationModal";

// const PostCard = ({ post }) => {
//   const [liked, setLiked] = useState(false);
//   const [showCollabModal, setShowCollabModal] = useState(false);

//   return (
//     <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-6 border border-gray-700 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:scale-[1.02]">
//       <div className="flex items-center gap-3 mb-4">
//         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-0.5">
//           <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
//             <span className="font-bold">{post.author.charAt(0)}</span>
//           </div>
//         </div>
//         <div className="flex-1">
//           <h4 className="font-semibold text-white">{post.author}</h4>
//           <p className="text-sm text-gray-400">{post.time}</p>
//         </div>
//         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//           post.type === 'idea' ? 'bg-purple-600/20 text-purple-400' :
//           post.type === 'product' ? 'bg-blue-600/20 text-blue-400' :
//           'bg-green-600/20 text-green-400'
//         }`}>
//           {post.type.toUpperCase()}
//         </span>
//       </div>
      
//       <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
//       <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>
      
//       {post.image && (
//         <div className="mb-4 rounded-xl overflow-hidden">
//           <div className="w-full h-48 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
//             <span className="text-white font-semibold">Demo Preview</span>
//           </div>
//         </div>
//       )}
      
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => setLiked(!liked)}
//             className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
//               liked ? 'bg-red-600/20 text-red-400' : 'bg-gray-700 hover:bg-gray-600'
//             }`}
//           >
//             <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
//             <span>{post.likes + (liked ? 1 : 0)}</span>
//           </button>
          
//           <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
//             <MessageCircle size={18} />
//             <span>{post.comments}</span>
//           </button>
          
//           <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
//             <Share2 size={18} />
//             <span>Share</span>
//           </button>
//         </div>
        
//         <button
//           onClick={() => setShowCollabModal(true)}
//           className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
//         >
//           <UserPlus size={18} className="inline mr-2" />
//           Collaborate
//         </button>
//       </div>
      
//       {showCollabModal && (
//         <CollaborationModal post={post} onClose={() => setShowCollabModal(false)} />
//       )}
//     </div>
//   );
// };
// export default PostCard;

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  UserPlus,
} from "lucide-react";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showCollabModal, setShowCollabModal] = useState(false);

  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 mb-6 shadow-lg hover:shadow-white/10 transition-all duration-300 transform hover:scale-[1.01]">
      
      {/* Post Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-700 p-0.5">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold">
            {post.author.charAt(0)}
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white">{post.author}</h4>
          <p className="text-sm text-gray-500">{post.time}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium border border-gray-700 text-gray-400">
          {post.type.toUpperCase()}
        </span>
      </div>

      {/* Title & Content */}
      <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
      <p className="text-gray-400 mb-4 leading-relaxed">{post.content}</p>

      {/* Media Preview */}
      {post.image && (
        <div className="mb-4 rounded-xl overflow-hidden border border-gray-700">
          <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-white font-semibold">
            Demo Preview
          </div>
        </div>
      )}

      {/* Reaction Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
              liked
                ? "bg-gray-800 border-red-500 text-red-400"
                : "bg-gray-900 border-gray-700 hover:bg-gray-800 text-gray-300"
            }`}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
            <span>{post.likes + (liked ? 1 : 0)}</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 hover:bg-gray-800 text-gray-300">
            <MessageCircle size={18} />
            <span>{post.comments}</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 hover:bg-gray-800 text-gray-300">
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>

        <button
          onClick={() => setShowCollabModal(true)}
          className="px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
        >
          <UserPlus size={18} className="inline mr-2" />
          Collaborate
        </button>
      </div>

      {/* Collaboration Modal Placeholder */}
      {showCollabModal && (
        <div className="mt-4 p-4 border border-gray-700 rounded-lg text-gray-200 bg-gray-900">
          <p>Request to collaborate on <strong>{post.title}</strong></p>
          <button
            onClick={() => setShowCollabModal(false)}
            className="mt-2 px-4 py-2 bg-black border border-gray-600 text-white rounded hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
