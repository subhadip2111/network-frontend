

import { useState } from 'react';
import { Upload, X, ImageIcon, Link, FileText, Users, Lightbulb, HelpCircle, BookOpen, Rocket } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreatePostForm = () => {
  const authUser = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  // Post type configurations
  const postTypeConfig = {
    idea: {
      label: '💡 Idea',
      icon: Lightbulb,
      description: 'Share your innovative ideas and concepts',
      fields: ['title', 'content', 'tags', 'seeking', 'imageUrls','techStack'],
      placeholders: {
        title: 'What\'s your big idea?',
        content: 'Describe your idea in detail...',
        seeking: 'What kind of help or collaboration are you looking for?'
      }
    },
    query: {
      label: '❓ Query',
      icon: HelpCircle,
      description: 'Ask questions and seek help from the community',
      fields: ['title', 'content', 'tags', 'urgency'],
      placeholders: {
        title: 'What\'s your question?',
        content: 'Provide details about what you need help with...'
      }
    },
    resources: {
      label: '📚 Resources',
      icon: BookOpen,
      description: 'Share helpful resources, documents, or links',
      fields: ['title', 'content', 'tags', 'resourceUrls', 'resourceType'],
      placeholders: {
        title: 'What resource are you sharing?',
        content: 'Describe the resource and why it\'s valuable...'
      }
    },
    product_demo: {
      label: '🚀 Product Demo',
      icon: Rocket,
      description: 'Showcase your product or project',
      fields: ['title', 'content', 'tags', 'imageUrls', 'demoUrl', 'techStack'],
      placeholders: {
        title: 'What\'s your product called?',
        content: 'Describe your product and its key features...',
        demoUrl: 'Link to live demo or video'
      }
    }
  };

  const [formData, setFormData] = useState({
    type: 'idea',
    title: '',
    content: '',
    tags: '',
    imageUrls: [],
    seeking: '', 
    urgency: 'medium', 
    resourceUrls: [],
    resourceType: 'article',
    demoUrl: '', 
    techStack: '', 
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentConfig = postTypeConfig[formData.type];
    const filteredData = {
      type: formData.type,
    };

    currentConfig.fields.forEach(field => {
      if (field === 'tags') {
        filteredData[field] = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      } else {
        filteredData[field] = formData[field];
      }
    });

    
    try {
      const createPost = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/post/create`,
        filteredData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'x-api-key': import.meta.env.VITE_SWAGGER_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      

   ;
setTimeout(()=>{
     toast.success('Thanks for sharing your thoughts! Once verified, your post will be published on Network.', {
        duration: 8000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
},1000)
      setFormData({
        type: 'idea',
        title: '',
        content: '',
        tags: '',
        imageUrls: [],
        seeking: '',
        urgency: 'medium',
        resourceUrls: [],
        resourceType: 'article',
        demoUrl: '',
        techStack: '',
      });
      
      navigate('/home');
    } catch (error) {
      console.log(error);
      toast.error('Failed to create post. Please try again.');
    }
  };

  const handleTypeChange = (newType) => {
    setFormData(prev => ({
      ...prev,
      type: newType,
      seeking: '',
      urgency: 'medium',
      resourceUrls: [],
      resourceType: 'article',
      demoUrl: '',
      techStack: '',
    }));
  };

  const handleImageUpload = async (event) => {
    const files = [...event.target.files];
    if (files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls = [];

    for (let file of files) {
      const imageData = new FormData();
      imageData.append('file', file);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/user/image/upload`,
          imageData,
          {
            headers: {
              'x-api-key': import.meta.env.VITE_SWAGGER_API_KEY,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const imageUrl = response?.data?.url;
        if (imageUrl) uploadedUrls.push(imageUrl);
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }

    setFormData(prev => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ...uploadedUrls],
    }));
    setIsUploading(false);
  };

  const removeImage = (urlToRemove) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter(url => url !== urlToRemove),
    }));
  };

  const addResourceUrl = () => {
    setFormData(prev => ({
      ...prev,
      resourceUrls: [...prev.resourceUrls, ''],
    }));
  };

  const updateResourceUrl = (index, value) => {
    setFormData(prev => ({
      ...prev,
      resourceUrls: prev.resourceUrls.map((url, i) => i === index ? value : url),
    }));
  };

  const removeResourceUrl = (index) => {
    setFormData(prev => ({
      ...prev,
      resourceUrls: prev.resourceUrls.filter((_, i) => i !== index),
    }));
  };

  const currentConfig = postTypeConfig[formData.type];
  const shouldShowField = (fieldName) => currentConfig.fields.includes(fieldName);
  console.log(formData);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Post Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Post Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(postTypeConfig).map(([key, config]) => {
              const IconComponent = config.icon;
              return (
                <div
                  key={key}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.type === key
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleTypeChange(key)}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent size={20} className={formData.type === key ? 'text-indigo-600' : 'text-gray-500'} />
                    <div>
                      <h3 className={`font-medium ${formData.type === key ? 'text-indigo-900' : 'text-gray-900'}`}>
                        {config.label}
                      </h3>
                      <p className="text-sm text-gray-600">{config.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder={currentConfig.placeholders.title}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder={currentConfig.placeholders.content}
            required
          />
        </div>

        {/* Image Upload - Only for specific types */}
        {shouldShowField('imageUrls') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload images or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB each</p>
                </label>
              </div>

              {formData.imageUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt="Uploaded"
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(url)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Seeking Help - Only for ideas */}
        {shouldShowField('seeking') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What are you seeking?</label>
            <input
              type="text"
              value={formData.seeking}
              onChange={(e) => setFormData({ ...formData, seeking: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder={currentConfig.placeholders.seeking}
            />
          </div>
        )}

        {/* Urgency - Only for queries */}
        {shouldShowField('urgency') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
            <select
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="low">🟢 Low - General question</option>
              <option value="medium">🟡 Medium - Need help soon</option>
              <option value="high">🔴 High - Urgent assistance needed</option>
            </select>
          </div>
        )}

        {/* Resource URLs - Only for resources */}
        {shouldShowField('resourceUrls') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resource Links</label>
            <div className="space-y-3">
              {formData.resourceUrls.map((url, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => updateResourceUrl(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://example.com/resource"
                  />
                  <button
                    type="button"
                    onClick={() => removeResourceUrl(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addResourceUrl}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <Link size={16} />
                <span>Add Resource Link</span>
              </button>
            </div>
          </div>
        )}

        {/* Resource Type - Only for resources */}
        {shouldShowField('resourceType') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
            <select
              value={formData.resourceType}
              onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="article">📰 Article</option>
              <option value="video">🎥 Video</option>
              <option value="course">🎓 Course</option>
              <option value="tool">🛠️ Tool</option>
              <option value="book">📚 Book</option>
              <option value="documentation">📋 Documentation</option>
              <option value="other">🔗 Other</option>
            </select>
          </div>
        )}

        {/* Demo URL - Only for product demos */}
        {shouldShowField('demoUrl') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Demo URL</label>
            <input
              type="url"
              value={formData.demoUrl}
              onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder={currentConfig.placeholders.demoUrl}
            />
          </div>
        )}

        {/* Tech Stack - Only for product demos */}
        {shouldShowField('techStack') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tech Stack</label>
            <input
              type="text"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="React, Node.js, MongoDB, etc."
            />
          </div>
        )}

        {/* Tags - Always shown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter tags separated by commas (e.g., React, AI, Startup)"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Publish Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;