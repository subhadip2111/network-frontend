// components/IdeaCard.jsx
import React, { useState } from 'react'

const IdeaCard = ({ idea }) => {
  const [likes, setLikes] = useState(idea.likes || 0)

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4 text-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{idea.name}</h3>
        <span className="text-sm px-2 py-1 bg-gray-700 rounded">{idea.type}</span>
      </div>
      <p className="text-gray-300 mb-3">{idea.description}</p>

      {idea.media && idea.mediaType === 'image' && (
        <img src={idea.media} alt="Idea" className="rounded-lg mb-3 max-h-64 object-cover" />
      )}
      {idea.media && idea.mediaType === 'video' && (
        <video controls className="rounded-lg mb-3 max-h-64 w-full">
          <source src={idea.media} type="video/mp4" />
        </video>
      )}

      <div className="flex space-x-4 text-gray-400 mt-2">
        <button onClick={() => setLikes(likes + 1)} className="hover:text-blue-400">
          👍 {likes}
        </button>
        <button className="hover:text-red-400">💬 React</button>
      </div>
    </div>
  )
}

export default IdeaCard
