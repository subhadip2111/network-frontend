import { useState } from "react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { dummyCommunities, dummyPosts, dummyUser } from "../../data/dummydata";
import Header from "../common/Header";
import Sidebar from "../common/SideBar";
import Dashboard from "../dashboard/Dashboard";
import ExplorePage from "./Explorelayout";
import JoinCommunitySection from "../communities/JoinCommunitySection";
import PostsRoute from "../pages/post/PostsRoute";
import CreatePost from "../pages/post/CreatePost";
import MyCommunities from "../communities/MyCommunities";
import Profile from "../pages/profile/Profile";
import CreatePostForm from "../posts/CreatePostForm";

const NetworkApp = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [communities, setCommunities] = useState(dummyCommunities);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const location = useLocation();

  // Get active section from current route
  const getActiveSection = () => {
    const path = location.pathname;
    if (path === '/home' || path === '/home/') return 'dashboard';
    if (path.includes('/explore')) return 'explore';
    if (path.includes('/join-community')) return 'join-community';
    if (path.includes('/post')) return 'post';
    if (path.includes('/my-communities')) return 'my-communities';
    if (path.includes('/profile')) return 'profile';
    return 'dashboard';
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId) => {
    console.log('Comment on post:', postId);
  };

  const handleJoin = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, collaborators: post.collaborators + 1 }
        : post
    ));
  };

  const handleJoinCommunity = (communityId) => {
    setCommunities(communities.map(community =>
      community.id === communityId
        ? { ...community, isJoined: true, members: community.members + 1 }
        : community
    ));
  };

  const handleLeaveCommunity = (communityId) => {
    setCommunities(communities.map(community =>
      community.id === communityId
        ? { ...community, isJoined: false, members: community.members - 1 }
        : community
    ));
  };

  const handleCreatePost = (postData) => {
    const newPost = {
      id: posts.length + 1,
      author: dummyUser,
      ...postData,
      likes: 0,
      comments: 0,
      collaborators: 0,
      timestamp: 'Just now',
      mvpProgress: postData.type === 'startup' ? 0 : null
    };
    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
  };

  return (
    <div className="min-h-screen bg-gray-50  ">
      <Header
        user={dummyUser}
        onProfileClick={() => console.log('Profile clicked')}
        onNotificationClick={() => console.log('Notifications clicked')}
      />

      <div className="flex">
        <Sidebar
          activeSection={getActiveSection()}
          onSectionChange={(section) => {
            console.log('Section changed to:', section);
          }}
        />

        <main className="flex-1 p-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard
                  user={dummyUser}
                  posts={posts}
                  onLike={handleLike}
                  onComment={handleComment}
                  onJoin={handleJoin}
                />
              } 
            />
            <Route 
              path="/explore" 
              element={<ExplorePage />} 
            />
            <Route 
              path="/join-community" 
              element={<JoinCommunitySection allCommunities={dummyCommunities} />} 
            />
            <Route 
              path="/post" 
              element={<CreatePostForm  />} 
            />
            <Route 
              path="/my-communities" 
              element={<MyCommunities />} 
            />
            <Route 
              path="/profile" 
              element={<Profile />} 
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default NetworkApp;