import React from 'react';
import { Menu, X, Bell, Search } from 'lucide-react';

const Header = ({ onToggleDrawer, isDrawerOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        
        {/* Left Section: Menu + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDrawer}
            className="p-2 rounded-md bg-gray-900 hover:bg-gray-800 transition-all duration-200"
          >
            {isDrawerOpen ? (
              <X size={20} className="text-white" />
            ) : (
              <Menu size={20} className="text-white" />
            )}
          </button>
          <h1 className="text-xl font-bold text-white">Network Space</h1>
        </div>

        {/* Middle Section: Styled Search Button */}
        <button
          type="button"
          className="relative inline-flex items-center justify-start w-64 h-8 px-4 py-2 text-sm font-normal transition-colors bg-black text-[#9c9c9c] border border-[#2e2e2e] rounded-md hover:text-white hover:bg-[#242424]"
        >
          <span className="hidden lg:inline-flex">Search docs...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <kbd className="pointer-events-none absolute right-1 top-1 flex h-5 select-none items-center gap-1 rounded border border-[#2e2e2e] bg-[#242424] px-1.5 font-mono text-[10px] font-medium">
            <span>⌘</span>K
          </kbd>
        </button>

        {/* Right Section: Notification + Avatar */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md bg-gray-900 hover:bg-gray-800 transition">
            <Bell size={20} className="text-white" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
