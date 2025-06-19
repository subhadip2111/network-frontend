

import { Search, Menu, X, Heart, MessageCircle, Share2, Users, Plus, Zap, Globe, UserPlus, Settings, Bell, Home, Compass, BookOpen } from 'lucide-react';
import ProfileCard from './ProfileCard';

const NavigationDrawer = ({ isOpen, user }) => {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Compass, label: 'Explore' },
    { icon: Users, label: 'Join Community' },
    { icon: BookOpen, label: 'Share Ideas' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`fixed left-0 top-16 bottom-0 z-40 w-80 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4 h-full overflow-y-auto">
        <ProfileCard user={user} />
        
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-800 ${
                item.active ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg' : ''
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4 text-gray-300">My Communities</h4>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-gray-600 hover:border-purple-500 transition-colors mb-3">
            <Plus size={20} />
            <span>Create Community</span>
          </button>
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-800/50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500"></div>
              <span className="text-sm">Tech Innovators</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-800/50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500"></div>
              <span className="text-sm">Design Hub</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavigationDrawer;