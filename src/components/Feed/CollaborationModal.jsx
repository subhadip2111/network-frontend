const CollaborationModal = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Join Collaboration</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg">
            <X size={20} />
          </button>
        </div>
        
        <p className="text-gray-300 mb-4">
          Send a collaboration request for "{post.title}"
        </p>
        
        <textarea
          placeholder="Tell them why you want to collaborate..."
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        
        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all">
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};
export default CollaborationModal;