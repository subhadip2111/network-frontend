import { Home, LogOut, Settings ,Compass,Users,MessageCircle,Plus} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ activeSection, onSectionChange, user }) => {

  console.log(`Sidebar rendered with active section: ${activeSection}`);
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home},
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'join-community', label: 'Join Community', icon: Users },
    { id: 'post', label: 'Create Post', icon: Plus },
    { id: 'my-communities', label: 'My Communities', icon: MessageCircle }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.username}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-semibold text-gray-900">{user.followers}</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user.following}</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user.communities}</p>
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
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === item.id
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