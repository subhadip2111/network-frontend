import { useEffect, useState } from "react";
import { dummyCommunities, dummyPosts, dummyUser } from "../../data/dummydata";
import Header from "../common/Header";
import Sidebar from "../common/SideBar";
import Dashboard from "../dashboard/Dashboard";
import ExplorePage from "./Explorelayout";
import JoinCommunitySection from "../communities/JoinCommunitySection";
import PostsRoute from "../pages/post/PostsRoute";
import CreatePost from "../pages/post/CreatePost";
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
    // if (showCreatePost) {
    //   return (
    //     // <CreatePostForm
    //     //   onSubmit={handleCreatePost}
    //     //   onCancel={() => setShowCreatePost(false)}
    //     // />
    //   );
    // }

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
        <JoinCommunitySection allCommunities={dummyCommunities}/>
        );

      case 'post':
return (
       <CreatePost/>


)
      case 'my-communities':
        const myCommunities = communities.filter(c => c.isJoined);
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Communities</h1>
                <p className="text-gray-600">Manage your communities and stay connected with your network.</p>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Create Community
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {myCommunities.map(community => (
                  <div key={community.id} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start space-x-4">
                      <img src={community.avatar} alt={community.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{community.name}</h3>
                        <p className="text-gray-600 mb-3">{community.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{community.members.toLocaleString()} members</span>
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors">
                              Manage
                            </button>
                            <button className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Communities</span>
                      <span className="font-semibold">{myCommunities.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Discussions</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">New Messages</span>
                      <span className="font-semibold">3</span>
                    </div>
                  </div>
                </div>

                <Messages messages={dummyMessages} />
              </div>
            </div>
          </div>
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
          user={dummyUser}
        />

        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default NetworkApp;