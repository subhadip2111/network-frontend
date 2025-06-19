const ProfileCard = ({ user }) => {
  return (
    <div className="bg-black border border-gray-800 rounded-2xl p-6 mb-6 shadow-xl">
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center bg-gray-900 text-white text-xl font-bold">
          {user.name.charAt(0)}
        </div>

        {/* User Info */}
        <div>
          <h3 className="text-xl font-semibold text-white">{user.name}</h3>
          <p className="text-gray-400 text-sm">@{user.username}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-white">{user.ideas}</div>
          <div className="text-sm text-gray-400">Ideas</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{user.communities}</div>
          <div className="text-sm text-gray-400">Communities</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{user.followers}</div>
          <div className="text-sm text-gray-400">Followers</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
