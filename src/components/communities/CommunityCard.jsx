const CommunityCard = ({ community, onJoin, onLeave }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <img src={community.avatar} alt={community.name} className="w-16 h-16 rounded-xl object-cover" />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{community.name}</h3>
          <p className="text-gray-600 mb-3">{community.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{community.members.toLocaleString()} members</span>
              <span className="px-2 py-1 bg-gray-100 rounded-full">{community.category}</span>
            </div>
            {community.isJoined ? (
              <button 
                onClick={() => onLeave(community.id)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Leave
              </button>
            ) : (
              <button 
                onClick={() => onJoin(community.id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Join
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommunityCard;