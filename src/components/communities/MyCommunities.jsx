import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Plus, Users, Send, Settings, Search, MoreVertical, ArrowLeft, Phone, Video } from 'lucide-react';

const MyCommunities = () => {
    const [activeView, setActiveView] = useState('groups');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const inputValueRef = useRef(''); // For instant typing without re-renders

    const [groups, setGroups] = useState([
        {
            id: 1,
            name: 'React Developers',
            description: 'Discussion about React and frontend development',
            members: 128,
            color: '#25D366',
            lastMessage: 'Hey everyone! Just finished a new React project',
            lastMessageTime: '10:30 AM',
            unreadCount: 3,
            isPrivate: false,
            messages: [
                { id: 1, user: 'John Doe', message: 'Hey everyone! Just finished a new React project', time: '10:30 AM', isMe: false },
                { id: 2, user: 'Jane Smith', message: 'That sounds awesome! Can you share some details?', time: '10:35 AM', isMe: false },
                { id: 3, user: 'Mike Johnson', message: 'I\'d love to see the code if it\'s open source', time: '10:40 AM', isMe: false }
            ]
        },
        {
            id: 2,
            name: 'Design Team',
            description: 'UI/UX design discussions and feedback',
            members: 45,
            color: '#7C3AED',
            lastMessage: 'The new mockups are ready for review',
            lastMessageTime: '2:15 PM',
            unreadCount: 1,
            isPrivate: true,
            messages: [
                { id: 1, user: 'Sarah Wilson', message: 'The new mockups are ready for review', time: '2:15 PM', isMe: false },
                { id: 2, user: 'Tom Brown', message: 'Looking great! Love the color scheme', time: '2:20 PM', isMe: false }
            ]
        },
        {
            id: 3,
            name: 'General Discussion',
            description: 'Open discussion for all topics',
            members: 234,
            color: '#EF4444',
            lastMessage: 'Good morning everyone!',
            lastMessageTime: '9:00 AM',
            unreadCount: 0,
            isPrivate: false,
            messages: [
                { id: 1, user: 'Alex Green', message: 'Good morning everyone!', time: '9:00 AM', isMe: false }
            ]
        }
    ]);

    const [newGroup, setNewGroup] = useState({
        name: '',
        description: '',
        isPrivate: false
    });

    // Memoize current group to prevent unnecessary re-renders
    const currentGroup = useMemo(() =>
        groups.find(g => g.id === selectedGroup?.id) || selectedGroup,
        [groups, selectedGroup?.id]
    );

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentGroup?.messages?.length]); // Only trigger on message count change

    // Optimized message sending with useCallback
    const handleSendMessage = useCallback(() => {
        if (messageInput.trim() && selectedGroup) {
            const newMessage = {
                id: Date.now(),
                user: 'You',
                message: messageInput.trim(),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isMe: true
            };

            // Only update groups array, selectedGroup will be derived from it
            setGroups(prevGroups => prevGroups.map(group =>
                group.id === selectedGroup.id
                    ? {
                        ...group,
                        messages: [...group.messages, newMessage],
                        lastMessage: newMessage.message,
                        lastMessageTime: newMessage.time
                    }
                    : group
            ));

            setMessageInput('');
            // Don't refocus immediately to prevent keyboard flicker
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [messageInput, selectedGroup?.id]); // Only depend on selectedGroup.id, not entire object

    const handleCreateGroup = () => {
        if (newGroup.name.trim()) {
            const colors = ['#25D366', '#7C3AED', '#EF4444', '#3B82F6', '#F59E0B', '#10B981'];
            const group = {
                id: Date.now(),
                name: newGroup.name.trim(),
                description: newGroup.description.trim(),
                members: 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                lastMessage: 'Group created',
                lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                unreadCount: 0,
                isPrivate: newGroup.isPrivate,
                messages: []
            };
            setGroups(prev => [...prev, group]);
            setNewGroup({ name: '', description: '', isPrivate: false });
            setShowCreateGroup(false);
        }
    };

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const GroupCard = ({ group }) => (
        <div
            className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
            onClick={() => {
                setSelectedGroup(group);
                setActiveView('chat');
            }}
        >
            <div className="relative">
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: group.color }}
                >
                    {group.name.substring(0, 2).toUpperCase()}
                </div>
                {group.unreadCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {group.unreadCount}
                    </div>
                )}
            </div>

            <div className="flex-1 ml-4 min-w-0">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">
                        {group.name}
                        {group.isPrivate && <span className="ml-2 text-xs bg-gray-800 text-white px-2 py-1 rounded">Private</span>}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2">{group.lastMessageTime}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600 truncate">{group.lastMessage}</p>
                    <div className="flex items-center text-xs text-gray-500 ml-2">
                        <Users className="w-3 h-3 mr-1" />
                        {group.members}
                    </div>
                </div>
            </div>
        </div>
    );

    const GroupsView = () => (
        <div className="h-screen flex flex-col bg-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold text-gray-900">Chats</h1>
                    <button
                        onClick={() => setShowCreateGroup(true)}
                        className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search or start new chat"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-black"
                    />
                </div>
            </div>

            {/* Groups List */}
            <div className="flex-1 overflow-y-auto">
                {filteredGroups.map((group) => (
                    <GroupCard key={group.id} group={group} />
                ))}
            </div>

            {/* Create Group Modal */}
            {showCreateGroup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h2 className="text-xl font-semibold mb-4">New Group</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={newGroup.name}
                                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Group name"
                            />
                            <textarea
                                value={newGroup.description}
                                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Group description (optional)"
                                rows="3"
                            />
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="private"
                                    checked={newGroup.isPrivate}
                                    onChange={(e) => setNewGroup({ ...newGroup, isPrivate: e.target.checked })}
                                    className="rounded"
                                />
                                <label htmlFor="private" className="text-sm text-gray-700">Make group private</label>
                            </div>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowCreateGroup(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateGroup}
                                className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const ChatView = () => (
        <div className="h-screen flex flex-col bg-white">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setActiveView('groups')}
                            className="text-gray-500 hover:text-gray-700 p-1"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: currentGroup?.color }}
                        >
                            {currentGroup?.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-900">{currentGroup?.name}</h2>
                            <p className="text-sm text-gray-500">{currentGroup?.members} members</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Video className="w-5 h-5 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Phone className="w-5 h-5 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4">
                    {currentGroup?.messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isMe
                                ? 'bg-black text-white'
                                : 'bg-white text-gray-900 border border-gray-200'
                                }`}>
                                {!message.isMe && (
                                    <div className="text-xs font-semibold mb-1" style={{ color: currentGroup?.color }}>
                                        {message.user}
                                    </div>
                                )}
                                <p className="text-sm">{message.message}</p>
                                <div className={`text-xs mt-1 ${message.isMe ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {message.time}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                    <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4">
                        <input
                            ref={inputRef}
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault() && handleSendMessage()}
                            placeholder="Type a message"
                            className="flex-1 bg-transparent py-3 focus:outline-none"
                            autoComplete="off"
                        />


                    </div>
                    <button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto bg-white shadow-lg">
                {activeView === 'groups' ? <GroupsView /> : <ChatView />}
            </div>
        </div>
    );
};

export default MyCommunities;