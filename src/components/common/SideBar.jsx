import { Home, LogOut, Settings, Compass, Users, MessageCircle, Plus ,User} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import Profile from "../pages/profile/Profile";
import { useState } from "react";

const Sidebar = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.auth.user)
console.log('us')
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'join-community', label: 'Join Community', icon: Users },
    { id: 'post', label: 'Create Post', icon: Plus },
    { id: 'my-communities', label: 'My Communities', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },

  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={user?.profilePicture ? user.profilePicture : 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'}
            alt={user?.fullName || 'User'}
            className="w-12 h-12 rounded-full"

          />

          <div>
            <h3 className="font-semibold text-gray-900">{user?.fullName}</h3>
            <p className="text-sm text-gray-500">{user?.fullName||'user'}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            {/* <p className="font-semibold text-gray-900">{user?.followers||200}</p> */}
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div>
            {/* <p className="font-semibold text-gray-900">{user.following}</p> */}
            <p className="text-xs text-gray-500">Following</p>
          </div>
          <div>
            {/* <p className="font-semibold text-gray-900">{user.communities}</p> */}
            <p className="text-xs text-gray-500">Communities</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeSection === item.id
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <Link to={'/'} className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link >
      </div>
    </aside>
  );
};

export default Sidebar;