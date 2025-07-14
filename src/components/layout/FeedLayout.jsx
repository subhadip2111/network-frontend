import { useEffect, useState } from "react";
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
const NetworkApp = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [posts, setPosts] = useState(dummyPosts);
  const [communities, setCommunities] = useState(dummyCommunities);
  const [showCreatePost, setShowCreatePost] = useState(false);

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
    setActiveSection('dashboard');
  };

  const renderContent = () => {


    switch (activeSection) {
      case 'dashboard':
        return (
          <Dashboard
            user={dummyUser}
            posts={posts}
            onLike={handleLike}
            onComment={handleComment}
            onJoin={handleJoin}
          />
        );

      case 'explore':
        return <ExplorePage />;

      case 'join-community':
        return (
          <JoinCommunitySection allCommunities={dummyCommunities} />
        );

      case 'post':
        return (
          <CreatePost />


        )
      case 'my-communities':
        return (
          <MyCommunities />
        )
      case 'profile':
        return (
            <Profile/>
          
        );

      default:
        return (
          <Dashboard
            user={dummyUser}
            posts={posts}
            onLike={handleLike}
            onComment={handleComment}
            onJoin={handleJoin}
          />
        );
    }
  };

  useEffect(() => {
    if (activeSection === 'post') {
      setShowCreatePost(true);
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={dummyUser}
        onProfileClick={() => console.log('Profile clicked')}
        onNotificationClick={() => console.log('Notifications clicked')}
      />

      <div className="flex">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default NetworkApp;