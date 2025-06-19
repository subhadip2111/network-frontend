import PostCard from "./PostCard";

const Feed = () => {
  const posts = [
    {
      id: 1,
      author: 'Alex Chen',
      time: '2h ago',
      type: 'idea',
      title: 'AI-Powered Code Review Assistant',
      content: 'Building an intelligent code review tool that understands context and provides meaningful suggestions. Looking for frontend developers to join!',
      likes: 24,
      comments: 8,
      image: true
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      time: '4h ago',
      type: 'product',
      title: 'EcoTrack - Sustainability Dashboard',
      content: 'Just launched beta! Track your carbon footprint with beautiful visualizations. Need feedback from environmental enthusiasts.',
      likes: 45,
      comments: 12,
      image: true
    },
    {
      id: 3,
      author: 'Mike Rodriguez',
      time: '6h ago',
      type: 'community',
      title: 'Starting ML Study Group',
      content: 'Weekly sessions to dive deep into machine learning algorithms. All skill levels welcome! First meeting this Friday.',
      likes: 18,
      comments: 6
    }
  ];

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;