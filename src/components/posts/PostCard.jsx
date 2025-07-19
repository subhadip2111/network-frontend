import {
  ArrowRight, Code, Handshake, Lightbulb, PartyPopper, Rocket,
  ThumbsUp, Users
} from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateSinglePostInArray } from "../../features/auth/postSlice";

const PostCard = ({ feed }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const updatedPost = useSelector((state) => {
    const posts = state.posts.posts || [];
    return posts.find(post => post.id === feed.id) || feed;
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const displayedFeed = updatedPost;
  const getTypeIcon = (type) => {
    switch (type) {
      case 'startup': return <Rocket className="w-5 h-5 text-orange-500" />;
      case 'problem': return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'opensource': return <Code className="w-5 h-5 text-green-500" />;
      default: return <Lightbulb className="w-5 h-5 text-gray-500" />;
    }
  };
  const getTypeColor = (type) => {
    switch (type) {
      case 'startup': return 'bg-orange-100 text-orange-800';
      case 'problem': return 'bg-yellow-100 text-yellow-800';
      case 'opensource': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInteraction = async (type) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const payload = {
        postId: feed.id,
        userId: currentUser.id,
        type: type,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/post-interactions/${feed.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'x-api-key': import.meta.env.VITE_SWAGGER_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      const updatedPostData = res.data.data;
      // Update the specific post in the posts array instead of separate post state
      dispatch(updateSinglePostInArray({
        postId: feed.id,
        updatedPost: updatedPostData
      }));
      
    } catch (error) {
      console.error("Interaction failed:", error);
      // Optionally add user-friendly error handling here
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow  ">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={displayedFeed.user?.profilePicture}
            alt={displayedFeed.user?.fullName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="font-semibold text-gray-900">{displayedFeed.user?.fullName}</h4>
            <p className="text-sm text-gray-500">
              @{displayedFeed.user?.fullName} • {formatDistanceToNow(new Date(displayedFeed.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getTypeIcon(displayedFeed.type)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(displayedFeed.type)}`}>
            {displayedFeed.type?.charAt(0).toUpperCase() + displayedFeed.type?.slice(1)}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{displayedFeed.title}</h3>
      <p className="text-gray-700 mb-4">{displayedFeed.content}</p>

      {displayedFeed.tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {displayedFeed.tags
            .replace(/[\[\]{}"]/g, '')
            .split(',')
            .map(tag => (
              <span
                key={tag.trim()}
                className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
              >
                #{tag.trim()}
              </span>
            ))}
        </div>
      )}

      {displayedFeed.seeking && displayedFeed.seeking.replace(/[\[\]{}"]/g, '').trim() !== '' && (
        <div className="mb-4">
          <h5 className="text-sm font-semibold text-gray-900 mb-2">Looking for:</h5>
          <div className="flex flex-wrap gap-2">
            {displayedFeed.seeking
              .replace(/[\[\]{}"]/g, '')
              .split(',')
              .map(role => (
                <span
                  key={role.trim()}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                >
                  {role.trim()}
                </span>
              ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            disabled={isUpdating}
            onClick={() => handleInteraction('like')}
            className={`flex items-center space-x-2 transition-colors disabled:opacity-50 ${
              isUpdating ? 'text-gray-400' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <ThumbsUp className={`w-5 h-5 ${isUpdating ? 'animate-pulse' : ''}`} />
            <span className="text-sm">{displayedFeed.likeCount || 0}</span>
          </button>

          <button
            disabled={isUpdating}
            onClick={() => handleInteraction('celebrate')}
            className={`flex items-center space-x-2 transition-colors disabled:opacity-50 ${
              isUpdating ? 'text-gray-400' : 'text-gray-500 hover:text-pink-500'
            }`}
          >
            <PartyPopper className={`w-5 h-5 ${isUpdating ? 'animate-pulse' : ''}`} />
            <span className="text-sm">{displayedFeed.celebrateCount || 0}</span>
          </button>

          <button
            disabled={isUpdating}
            onClick={() => handleInteraction('colaborate')}
            className={`flex items-center space-x-2 transition-colors disabled:opacity-50 ${
              isUpdating ? 'text-gray-400' : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            <Handshake className={`w-5 h-5 ${isUpdating ? 'animate-pulse' : ''}`} />
            <span className="text-sm">{displayedFeed.collaboratorCount || 0}</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-500">
            <Users className="w-5 h-5" />
          </button>
        </div>

        {
          displayedFeed.type=='idea'?<button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center space-x-2"
        >
          <span>Join Collaboration</span>
          <ArrowRight className="w-4 h-4" />
        </button>:null
        }
      </div>
    </div>
  );
};

export default PostCard;