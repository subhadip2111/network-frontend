import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Calendar, Star, Edit3, Save, X, Upload, Camera, Github, Axe } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../features/auth/profileSlice';
import axios from 'axios';
import Loader from '../../common/Loader';
import { data } from 'react-router-dom';
import { updateUser } from '../../../features/auth/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken)
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profileData);
  const [newSkill, setNewSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const simulateApiCall = (data, delay = 1000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data });
      }, delay);
    });
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/${currentUser.id}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'x-api-key': import.meta.env.VITE_SWAGGER_API_KEY,
            'Content-Type': 'application/json',
          }
        }
      )
      const userData = response.data.data;
      dispatch(updateUser({ data: userData }))
      setProfileData(userData);
      setEditData(userData);

    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event) => {
    const selectedFile = event.target.files[0];

    const formData = new FormData();
    formData.append('file', selectedFile);
    if (!selectedFile) return;

    setUploadingImage(true);

    try {

      const previewUrl = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/image/upload`,
        formData,
        {
          headers: {
            'x-api-key': import.meta.env.VITE_SWAGGER_API_KEY,
            'Content-Type': 'multipart/form-data',
          }
        }
      )
      console.log(previewUrl.data.url)
      setPreviewImage(previewUrl.data.url);
      setEditData((prev) => ({
        ...prev,
        profilePicture: previewUrl.data.url,
      }));

    } catch (error) {
      console.error('Image upload failed:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      handleInputChange('skills', [...editData.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    handleInputChange('skills', editData.skills.filter(skill => skill !== skillToRemove));
  };

const handleSave = async () => {
  if (!profileData.id) {
    console.error('User ID not available for update');
    return;
  }

  setIsLoading(true);

  const updatedPayload = {};

  // Compare editable fields
  Object.keys(editData).forEach((key) => {
    if (
      key !== 'id' &&
      JSON.stringify(editData[key]) !== JSON.stringify(profileData[key])
    ) {
      updatedPayload[key] = editData[key];
    }
  });

  if (previewImage && previewImage !== profileData.profilePicture) {
    updatedPayload.profilePicture = previewImage;
  }

  // No change? Exit
  if (Object.keys(updatedPayload).length === 0) {
    setIsLoading(false);
    setIsEditing(false);
    setPreviewImage(null);
    return;
  }

  try {

    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/user/${currentUser.id}`,
      updatedPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'x-api-key': import.meta.env.VITE_SWAGGER_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Profile updated successfully:', response.data.data);

dispatch(updateUser({ data: response.data.data }))
    setProfileData((prev) => ({
      ...prev,
      ...updatedPayload,
    }));

    setIsEditing(false);
    setPreviewImage(null);
    setNewSkill('');
  } catch (error) {
    console.error('Profile update failed:', error.response?.data || error.message);
  } finally {
    setIsLoading(false);
  }
};


  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
    setPreviewImage(null);
    setNewSkill('');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const displayValue = (value, placeholder = 'Not provided') => {
    return value || placeholder;
  };

  if (!profileData) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {(previewImage || profileData.profilePicture) ? (
                    <img
                      src={previewImage || profileData.profilePicture}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {displayValue(profileData.fullName, 'Your Name')}
                </h1>
                <p className="text-gray-600 capitalize">{profileData.role?.toLowerCase()}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isLoading || uploadingImage}
                    className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isLoading ? 'Saving...' : 'Save'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.fullName || ''}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{displayValue(profileData.fullName)}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="flex items-center space-x-2 text-gray-900">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{profileData.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editData.age || ''}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your age"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{displayValue(profileData.age)}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Profile</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={editData.githubProfile || ''}
                    onChange={(e) => handleInputChange('githubProfile', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/username"
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Github className="w-4 h-4 text-gray-500" />
                    {profileData.githubProfile ? (
                      <a href={profileData.githubProfile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {profileData.githubProfile}
                      </a>
                    ) : (
                      <span>{displayValue(profileData.githubProfile)}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                    {profileData.role?.toLowerCase()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Referral Points</label>
                <div className="flex items-center space-x-2 text-gray-900">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{profileData.referalPoint || 0} points</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                <div className="flex items-center space-x-2 text-gray-900">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{formatDate(profileData.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Biography</h2>
          {isEditing ? (
            <textarea
              value={editData.bio || ''}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">
              {displayValue(profileData.bio, 'No biography provided yet.')}
            </p>
          )}
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
          {isEditing && (
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a skill"
              />
              <button
                onClick={addSkill}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {editData.skills && editData.skills.length > 0 ? (
              editData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No skills added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;