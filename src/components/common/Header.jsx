import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ user, onProfileClick, onNotificationClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link to={'/home'} className="text-2xl font-bold text-indigo-600">Network</Link>
        <div className="relative pl-96 ">
          <Search className="absolute left-auto top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search ideas, communities, people..."
            className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={onNotificationClick}
          className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
        </button>
        
    
      </div>
    </header>
  );
};


export default Header;