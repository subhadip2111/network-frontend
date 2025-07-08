import { Users, Heart, MessageCircle } from 'lucide-react';

const IdeaCard = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 hover:shadow-xl transition">
      <h3 className="text-lg font-semibold text-white mb-2">{data.title}</h3>
      <p className="text-gray-300 text-sm mb-4">{data.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {data.tags.map((tag) => (
          <span
            key={tag}
            className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" />
            {data.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {data.comments}
          </span>
        </div>

        {data.seeking?.length > 0 && (
          <div className="flex items-center gap-1 text-purple-400">
            <Users className="w-4 h-4" />
            <span>Collaborate</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaCard;
