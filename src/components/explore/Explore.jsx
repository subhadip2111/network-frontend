// import React, { useState } from 'react';

// import { exploreContent } from '../../data/dummydata';
// import CategoryTabs from './CategoryTab';
// import TagFilter from './Tagfilter';
// import IdeaCard from './IdeaCard';

// const Explore = () => {
//   const [activeTab, setActiveTab] = useState('startup');
//   const [selectedTags, setSelectedTags] = useState([]);
//   const filteredData = exploreContent
//     .filter(item => item.type === activeTab)
//     .filter(item =>
//       selectedTags.length === 0 || selectedTags.some(tag => item.tags.includes(tag))
//     );

//   return (
//     <div className="px-4 sm:px-8 py-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-white mb-4">Explore New Ways to Think & Build</h1>
//       <p className="text-gray-300 mb-6">
//         Discover startup ideas, demos, stories of people like you who built something real — not just a job.
//       </p>

//       <CategoryTabs active={activeTab} onChange={setActiveTab} />
//       <TagFilter selectedTags={selectedTags} onChange={setSelectedTags} />

//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
//         {filteredData.map(item => {
//           if (item.type === 'demo') return <VideoDemoCard key={item.id} data={item} />;
//           if (item.type === 'inspiration') return <InspirationCard key={item.id} data={item} />;
//           return <IdeaCard key={item.id} data={item} />;
//         })}
//       </div>
//     </div>
//   );
// };

// export default Explore;

 import { useState, useEffect } from 'react';
import { Search, Zap, Users, BookOpen, ArrowRight, ChevronDown, X, User, Briefcase, HeartPulse, Shield } from 'lucide-react';

const Explore = () => {
  // State for search, active tab, and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending'); // 'trending' | 'people' | 'categories'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [userInterests, setUserInterests] = useState([]);

  // Dummy Data: Categories
  const categories = [
    { id: 'tech', name: 'Technology', icon: <Briefcase size={16} /> },
    { id: 'business', name: 'Business', icon: <User size={16} /> },
    { id: 'health', name: 'Health', icon: <HeartPulse size={16} /> },
    { id: 'service', name: 'Service', icon: <Shield size={16} /> },
  ];

  // Dummy Data: Trending Topics
  const trendingTopics = [
    {
      id: 1,
      title: "AI & Machine Learning",
      description: "Latest breakthroughs in AI research",
      category: "tech",
      followers: "1.2M",
      icon: "🤖",
    },
    {
      id: 2,
      title: "Startup Funding",
      description: "How to raise your first $100K",
      category: "business",
      followers: "850K",
      icon: "💼",
    },
    {
      id: 3,
      title: "Digital Marketing",
      description: "Master SEO & Social Media Ads",
      category: "business",
      followers: "2.3M",
      icon: "📈",
    },
  ];

  // Dummy Data: Smart People
  const smartPeople = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "AI Researcher @Google",
      expertise: "Neural Networks",
      followers: "150K",
      category: "tech",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Founder @TechStart",
      expertise: "Startup Growth",
      followers: "89K",
      category: "business",
    },
    {
      id: 3,
      name: "David Park",
      role: "Marketing Director",
      expertise: "Growth Hacking",
      followers: "210K",
      category: "business",
    },
  ];

  // Filter data based on search & category
  const filteredTrending = trendingTopics.filter(topic => 
    (topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     topic.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory ? topic.category === selectedCategory.id : true)
  );

  const filteredPeople = smartPeople.filter(person => 
    (person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     person.expertise.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory ? person.category === selectedCategory.id : true)
  );

  // Simulate fetching user interests (e.g., from backend)
  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setUserInterests(['tech', 'business']); // User is interested in Tech & Business
    }, 500);
  }, []);

  // Get personalized recommendations
  const personalizedTopics = trendingTopics.filter(topic => 
    userInterests.includes(topic.category)
  );

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore</h1>
          <p className="text-gray-600">
            Discover smart content and connect with experts.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search topics, people, or categories..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="text-gray-500" size={20} />
            </button>
          )}
        </div>

        {/* Tabs & Category Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex space-x-1 border-b border-gray-200">
            <button
              className={`px-4 py-2 font-medium flex items-center ${activeTab === 'trending' ? 'border-b-2 border-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab('trending')}
            >
              <Zap className="mr-2" size={18} />
              Trending
            </button>
            <button
              className={`px-4 py-2 font-medium flex items-center ${activeTab === 'people' ? 'border-b-2 border-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab('people')}
            >
              <Users className="mr-2" size={18} />
              Smart People
            </button>
            <button
              className={`px-4 py-2 font-medium flex items-center ${activeTab === 'categories' ? 'border-b-2 border-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab('categories')}
            >
              <BookOpen className="mr-2" size={18} />
              Categories
            </button>
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg"
            >
              {selectedCategory ? selectedCategory.name : "All Categories"}
              <ChevronDown className="ml-2" size={16} />
            </button>
            {showCategoryDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setShowCategoryDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowCategoryDropdown(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Personalized Recommendations */}
        {userInterests.length > 0 && activeTab === 'trending' && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Recommended for you</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {personalizedTopics.slice(0, 3).map(topic => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        {activeTab === 'trending' && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              {selectedCategory ? `${selectedCategory.name} Topics` : "All Trending Topics"}
            </h2>
            {filteredTrending.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrending.map(topic => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No topics found. Try a different search or category.
              </div>
            )}
          </div>
        )}

        {activeTab === 'people' && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              {selectedCategory ? `${selectedCategory.name} Experts` : "Smart People to Connect With"}
            </h2>
            {filteredPeople.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPeople.map(person => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No people found. Try a different search or category.
              </div>
            )}
          </div>
        )}

        {activeTab === 'categories' && (
          <div>
            <h2 className="text-xl font-bold mb-6">Browse Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category);
                    setActiveTab('trending');
                  }}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="p-2 bg-gray-100 rounded-full mr-3">
                    {category.icon}
                  </div>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Topic Card Component
const TopicCard = ({ topic }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="text-3xl mb-4">{topic.icon}</div>
    <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
    <p className="text-gray-600 mb-4">{topic.description}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{topic.followers} followers</span>
      <button className="text-black hover:underline flex items-center">
        Explore <ArrowRight className="ml-1" size={16} />
      </button>
    </div>
  </div>
);

// Reusable Person Card Component
const PersonCard = ({ person }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold">
        {person.name.charAt(0)}
      </div>
      <div className="ml-4">
        <h3 className="font-bold">{person.name}</h3>
        <p className="text-sm text-gray-600">{person.role}</p>
      </div>
    </div>
    <p className="text-gray-700 mb-4">
      <span className="font-medium">Expertise:</span> {person.expertise}
    </p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{person.followers} followers</span>
      <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
        Connect
      </button>
    </div>
  </div>
);

export default Explore;


