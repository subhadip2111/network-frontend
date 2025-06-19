// import React, { useState } from 'react'
// import Header from './Header';
// import NavigationDrawer from './ProfileSidebar';
// import Feed from './Feed';
// const Dashboard = () => {
//     const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//     const user = {
//         name: 'John Doe',
//         username: 'johndoe',
//         ideas: 15,
//         communities: 8,
//         followers: 234
//     };

//     const toggleDrawer = () => {
//         setIsDrawerOpen(!isDrawerOpen);
//     };
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
//             <Header onToggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
//             <NavigationDrawer isOpen={isDrawerOpen} user={user} />

//             <main className={`pt-20 pb-8 transition-all duration-300 ${isDrawerOpen ? 'ml-80' : 'ml-0'}`}>
//                 <div className="max-w-2xl mx-auto px-4">
//                     <div className="mb-8">
//                         <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 mb-6 shadow-2xl">
//                             <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 🚀</h2>
//                             <p className="text-purple-100">Ready to explore new ideas and connect with innovators?</p>
//                         </div>
//                     </div>

//                     <Feed />
//                 </div>
//             </main>

//             {isDrawerOpen && (
//                 <div
//                     className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
//                     onClick={toggleDrawer}
//                 />
//             )}
//         </div>
//     )
// }

// export default Dashboard


import React, { useState } from 'react';
import Header from './Header';
import NavigationDrawer from './ProfileSidebar';
import Feed from './Feed';

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const user = {
    name: 'John Doe',
    username: 'johndoe',
    ideas: 15,
    communities: 8,
    followers: 234
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Header */}
      <Header onToggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />

      {/* Sidebar Drawer */}
      <NavigationDrawer isOpen={isDrawerOpen} user={user} />

      {/* Overlay for mobile when drawer is open */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={toggleDrawer}
        />
      )}

      {/* Main Content */}
      <main
        className={`pt-20 transition-all duration-300 ${
          isDrawerOpen ? 'ml-72' : 'ml-0'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 pb-16">
          {/* Welcome Banner */}
          <div className="mb-8">
            <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70 p-6 shadow-lg backdrop-blur-md">
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome back, {user.name}! 🚀
              </h2>
              <p className="text-gray-400">
                Ready to explore new ideas and connect with innovators?
              </p>
            </div>
          </div>

          {/* Feed */}
          <Feed />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
