// components/IdeaList.jsx
import React from 'react'
import IdeaCard from './IdeaCard'

const mockIdeas = [
  {
    name: 'Open Source Collaboration Tool',
    description: 'A platform for devs to collaborate on open source ideas.',
    type: 'Tool',
    media: 'https://via.placeholder.com/600x300',
    mediaType: 'image',
    likes: 42,
  },
  {
    name: 'Idea Showcase Platform',
    description: 'Users share and vote on new app ideas.',
    type: 'Product',
    media: 'https://www.w3schools.com/html/mov_bbb.mp4',
    mediaType: 'video',
    likes: 87,
  },
]

const IdeaList = () => {
  return (
    <div className="p-4">
      {mockIdeas.map((idea, idx) => (
        <IdeaCard key={idx} idea={idea} />
      ))}
    </div>
  )
}

export default IdeaList
