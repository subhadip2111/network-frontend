import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Messages = ({ messages }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="bg-white rounded-xl border border-gray-200 h-96 flex">
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Messages</h3>
        </div>
        <div className="overflow-y-auto">
          {messages.map(message => (
            <button
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 ${
                selectedMessage?.id === message.id ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <img src={message.avatar} alt={message.sender} className="w-8 h-8 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{message.sender}</p>
                  <p className="text-sm text-gray-500 truncate">{message.message}</p>
                </div>
                {message.unread && <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img src={selectedMessage.avatar} alt={selectedMessage.sender} className="w-8 h-8 rounded-full" />
                <h4 className="font-semibold text-gray-900">{selectedMessage.sender}</h4>
              </div>
            </div>
            <div className="flex-1 p-4">
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-gray-900">{selectedMessage.message}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedMessage.timestamp}</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;