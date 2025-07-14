import { TrendingUp } from "lucide-react";
import PostCard from "../posts/PostCard";

const Dashboard = ({ user, posts, onLike, onComment, onJoin }) => {




  const stats = [
    { label: 'Active Projects', value: '12', change: '+2 this week', color: 'text-green-600' },
    { label: 'Collaborations', value: '8', change: '+1 this month', color: 'text-blue-600' },
    { label: 'Communities', value: user.communities, change: 'All time', color: 'text-indigo-600' },
    { label: 'Network Score', value: '94', change: '+5 points', color: 'text-purple-600' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-gray-600">Here's what's happening in your network today.</p>
      </div>

   

      <div>
        <div className="space-y-6">
          {posts.slice(0, 3).map(post => (
            <PostCard
              key={post.id} 
              post={post} 
              onLike={onLike} 
              onComment={onComment} 
              onJoin={onJoin} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;