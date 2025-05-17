import React, { useState } from 'react';
import { 
  Save, 
  UserPlus, 
  PenSquare, 
  AlertTriangle, 
  Check,
  User, 
  Mail, 
  Key,
  Globe,
  Feather,
  Database,
  Sliders,
  HelpCircle,
  DownloadCloud,
  UploadCloud,
  Trash2
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('Jane Editor');
  const [email, setEmail] = useState('editor@example.com');
  const [role, setRole] = useState('editor');
  const [profileImage, setProfileImage] = useState('');
  const [notifyOnComment, setNotifyOnComment] = useState(true);
  const [notifyOnPublish, setNotifyOnPublish] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto fade-in">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account and application preferences
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          {saveSuccess && (
            <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-md">
              <Check size={16} className="mr-1" /> 
              Saved successfully
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn btn-primary flex items-center"
          >
            {isSaving ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-b-2 border-white rounded-full"></span>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <nav className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">Settings</h2>
            </div>
            <div className="p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'profile' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User size={18} className="mr-3" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'account' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Key size={18} className="mr-3" />
                Account
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'notifications' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Mail size={18} className="mr-3" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'appearance' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Sliders size={18} className="mr-3" />
                Appearance
              </button>
              <button
                onClick={() => setActiveTab('siteSettings')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'siteSettings' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Globe size={18} className="mr-3" />
                Site Settings
              </button>
              <button
                onClick={() => setActiveTab('contentTypes')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'contentTypes' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Feather size={18} className="mr-3" />
                Content Types
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'users' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <UserPlus size={18} className="mr-3" />
                Users
              </button>
              <button
                onClick={() => setActiveTab('database')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'database' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Database size={18} className="mr-3" />
                Database
              </button>
              <button
                onClick={() => setActiveTab('backup')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'backup' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <DownloadCloud size={18} className="mr-3" />
                Backup & Restore
              </button>
              <button
                onClick={() => setActiveTab('help')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'help' 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <HelpCircle size={18} className="mr-3" />
                Help & Support
              </button>
            </div>
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:w-3/4">
          <div className="bg-white shadow rounded-lg">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="md:w-1/4">
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                          {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-24 h-24 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-4xl">
                              {name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <button className="mt-2 text-sm text-primary-600 hover:text-primary-500">
                          Change photo
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:w-3/4 space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                          Role
                        </label>
                        <select
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                          <option value="author">Author</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          rows={4}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="Write a short bio..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Change Password</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="current-password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="new-password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirm-password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <button className="btn btn-primary">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-5 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <div className="mt-4">
                      <button className="btn btn-secondary">
                        Enable Two-Factor Authentication
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-5 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900 text-red-600">Danger Zone</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Once you delete your account, all of your content will be permanently removed.
                      This action cannot be undone.
                    </p>
                    <div className="mt-4">
                      <button className="flex items-center text-red-600 border border-red-200 px-4 py-2 rounded-md hover:bg-red-50">
                        <AlertTriangle size={16} className="mr-2" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Email Notifications</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Choose what types of email notifications you'd like to receive.
                    </p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="comments"
                            type="checkbox"
                            checked={notifyOnComment}
                            onChange={() => setNotifyOnComment(!notifyOnComment)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="comments" className="font-medium text-gray-700">Comments</label>
                          <p className="text-gray-500">Get notified when someone comments on your content.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="publishes"
                            type="checkbox"
                            checked={notifyOnPublish}
                            onChange={() => setNotifyOnPublish(!notifyOnPublish)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="publishes" className="font-medium text-gray-700">Publications</label>
                          <p className="text-gray-500">Get notified when content you've worked on is published.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="digest"
                            type="checkbox"
                            checked={weeklyDigest}
                            onChange={() => setWeeklyDigest(!weeklyDigest)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="digest" className="font-medium text-gray-700">Weekly Digest</label>
                          <p className="text-gray-500">Receive a weekly summary of content performance and activity.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-5 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900">In-App Notifications</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage notifications that appear within the application.
                    </p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Content comments</p>
                          <p className="text-sm text-gray-500">Notifications for new comments on your content</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className={`${
                              true ? 'bg-primary-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                          >
                            <span className="sr-only">Enable notifications</span>
                            <span
                              className={`${
                                true ? 'translate-x-5' : 'translate-x-0'
                              } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Workflow updates</p>
                          <p className="text-sm text-gray-500">Notifications for content status changes</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className={`${
                              true ? 'bg-primary-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                          >
                            <span className="sr-only">Enable notifications</span>
                            <span
                              className={`${
                                true ? 'translate-x-5' : 'translate-x-0'
                              } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">System alerts</p>
                          <p className="text-sm text-gray-500">Important system notifications and updates</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className={`${
                              true ? 'bg-primary-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                          >
                            <span className="sr-only">Enable notifications</span>
                            <span
                              className={`${
                                true ? 'translate-x-5' : 'translate-x-0'
                              } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Appearance Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Theme</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Customize how the application looks.
                    </p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Dark Mode</p>
                          <p className="text-sm text-gray-500">Enable dark mode for the entire application</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => setDarkMode(!darkMode)}
                            className={`${
                              darkMode ? 'bg-primary-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                          >
                            <span className="sr-only">Enable dark mode</span>
                            <span
                              className={`${
                                darkMode ? 'translate-x-5' : 'translate-x-0'
                              } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-5 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900">Editor Preferences</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Customize your content editing experience.
                    </p>
                    
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="editor-font-size" className="block text-sm font-medium text-gray-700">
                          Editor Font Size
                        </label>
                        <select
                          id="editor-font-size"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option>Small (14px)</option>
                          <option selected>Medium (16px)</option>
                          <option>Large (18px)</option>
                          <option>Extra Large (20px)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="editor-font-family" className="block text-sm font-medium text-gray-700">
                          Editor Font Family
                        </label>
                        <select
                          id="editor-font-family"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option selected>System Default</option>
                          <option>Serif</option>
                          <option>Sans-serif</option>
                          <option>Monospace</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Autosave</p>
                          <p className="text-sm text-gray-500">Automatically save content as you type</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className={`bg-primary-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                          >
                            <span className="sr-only">Enable autosave</span>
                            <span
                              className={`translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Site Settings */}
            {activeTab === 'siteSettings' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Site Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">General</h3>
                    
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="site-name" className="block text-sm font-medium text-gray-700">
                          Site Name
                        </label>
                        <input
                          type="text"
                          id="site-name"
                          defaultValue="Publishing Company CMS"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="site-description" className="block text-sm font-medium text-gray-700">
                          Site Description
                        </label>
                        <textarea
                          id="site-description"
                          rows={3}
                          defaultValue="A professional content management system for publishing companies."
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                          Timezone
                        </label>
                        <select
                          id="timezone"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option>(GMT-05:00) Eastern Time</option>
                          <option>(GMT-06:00) Central Time</option>
                          <option>(GMT-07:00) Mountain Time</option>
                          <option>(GMT-08:00) Pacific Time</option>
                          <option>(GMT+00:00) UTC</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-5 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900">Site Logo</h3>
                    
                    <div className="mt-4">
                      <div className="flex items-center space-x-6">
                        <div className="h-16 w-16 overflow-hidden bg-gray-100">
                          <div className="h-full w-full bg-primary-100 flex items-center justify-center text-primary-600">
                            Logo
                          </div>
                        </div>
                        <div>
                          <button className="btn btn-secondary">
                            Upload Logo
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Recommended size: 200x50 pixels. Max file size: 2MB.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-5 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900">Publishing Settings</h3>
                    
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="default-author" className="block text-sm font-medium text-gray-700">
                          Default Author
                        </label>
                        <select
                          id="default-author"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option>None</option>
                          <option>Jane Editor</option>
                          <option>Alex Morgan</option>
                          <option>Robert Fox</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Require Review</p>
                          <p className="text-sm text-gray-500">Require content to be reviewed before publishing</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className={`bg-primary-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                          >
                            <span className="sr-only">Enable review requirement</span>
                            <span
                              className={`translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content Types */}
            {activeTab === 'contentTypes' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Content Types</h2>
                
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-sm text-gray-500">Manage the types of content that can be created in your CMS.</p>
                  <button className="btn btn-primary">Add Content Type</button>
                </div>
                
                <div className="space-y-6">
                  <div className="border rounded-md">
                    <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                      <h3 className="text-md font-medium text-gray-900">Article</h3>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-500">
                          <PenSquare size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-4">Standard article format with rich text and media support.</p>
                      
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Fields:</h4>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-600 flex items-center">
                          <span className="w-1/3">Title</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Text (Required)</span>
                        </li>
                        <li className="text-sm text-gray-600 flex items-center">
                          <span className="w-1/3">Content</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Rich Text (Required)</span>
                        </li>
                        <li className="text-sm text-gray-600 flex items-center">
                          <span className="w-1/3">Excerpt</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Text</span>
                        </li>
                        <li className="text-sm text-gray-600 flex items-center">
                          <span className="w-1/3">Featured Image</span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">Image</span>
                        </li>
                        <li className="text-sm text-gray-600 flex items-center">
                          <span className="w-1/3">Category</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Reference</span>
                        </li>
                        <li className="text-sm text-gray-600 flex items-center">
                          <span className="w-1/3">Tags</span>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Array</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="border rounded-md">
                    <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                      <h3 className="text-md font-medium text-gray-900">Document</h3>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-500">
                          <PenSquare size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-4">Formal document with sections, chapters, and references.</p>
                      
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Fields:</h4>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-600 flex items-center">
                          <span className="w-1/3">Title</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Text (Required)</span>
                        </li>
                        <li className="text-sm text-gray-600 flex items-center">
                          <span className="w-1/3">Content</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Rich Text (Required)</span>
                        </li>
                        <li className="text-sm text-gray-600 flex items-center">
                          <span className="w-1/3">Cover Image</span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">Image</span>
                        </li>
                        <li className="text-sm text-gray-600 flex items-center">
                          <span className="w-1/3">Category</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Reference</span>
                        </li>
                        <li className="text-sm text-gray-600 flex items-center">
                          <span className="w-1/3">Version</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Text</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users */}
            {activeTab === 'users' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">User Management</h2>
                
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-sm text-gray-500">Manage users and their permissions.</p>
                  <button className="btn btn-primary flex items-center">
                    <UserPlus size={16} className="mr-2" />
                    Add User
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary-100 text-primary-600">
                              JE
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Jane Editor</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">editor@example.com</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Editor
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-primary-600 hover:text-primary-900">Edit</a>
                        </td>
                      </tr>
                      
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                              AM
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Alex Morgan</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">alex@example.com</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                            Author
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-primary-600 hover:text-primary-900">Edit</a>
                        </td>
                      </tr>
                      
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                              RF
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Robert Fox</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">robert@example.com</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Admin
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-primary-600 hover:text-primary-900">Edit</a>
                        </td>
                      </tr>
                      
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-600">
                              JW
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Jenny Wilson</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">jenny@example.com</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Viewer
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Invited
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-primary-600 hover:text-primary-900">Edit</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Backup & Restore */}
            {activeTab === 'backup' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Backup & Restore</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Create Backup</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Create a complete backup of your content and configuration.
                    </p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="backup-content"
                            type="checkbox"
                            checked={true}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="backup-content" className="font-medium text-gray-700">Content</label>
                          <p className="text-gray-500">All published and draft content</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="backup-media"
                            type="checkbox"
                            checked={true}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="backup-media" className="font-medium text-gray-700">Media Library</label>
                          <p className="text-gray-500">All uploaded images and files</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="backup-settings"
                            type="checkbox"
                            checked={true}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="backup-settings" className="font-medium text-gray-700">Settings</label>
                          <p className="text-gray-500">All system settings and configurations</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="backup-users"
                            type="checkbox"
                            checked={true}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="backup-users" className="font-medium text-gray-700">Users</label>
                          <p className="text-gray-500">User accounts and permissions</p>
                        </div>
                      </div>
                      
                      <div>
                        <button className="btn btn-primary flex items-center">
                          <DownloadCloud size={16} className="mr-2" />
                          Create Backup
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-5 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900">Restore from Backup</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Restore your content and configuration from a previous backup.
                    </p>
                    
                    <div className="mt-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <button className="text-sm text-primary-600 hover:text-primary-500">
                            Upload backup file
                          </button>
                          <p className="mt-1 text-xs text-gray-500">
                            Only upload backup files created by this system.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-yellow-50 rounded-md p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-yellow-400" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">Important</h3>
                            <div className="mt-2 text-sm text-yellow-700">
                              <p>
                                Restoring from a backup will overwrite existing content and settings.
                                This action cannot be undone.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-5 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900">Scheduled Backups</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Configure automatic backups on a regular schedule.
                    </p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Enable Scheduled Backups</p>
                          <p className="text-sm text-gray-500">Automatically back up your content on a schedule</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className={`bg-primary-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
                          >
                            <span className="sr-only">Enable scheduled backups</span>
                            <span
                              className={`translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="backup-frequency" className="block text-sm font-medium text-gray-700">
                          Backup Frequency
                        </label>
                        <select
                          id="backup-frequency"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option>Daily</option>
                          <option selected>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="retention-period" className="block text-sm font-medium text-gray-700">
                          Retention Period
                        </label>
                        <select
                          id="retention-period"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option>Last 7 days</option>
                          <option>Last 30 days</option>
                          <option selected>Last 3 months</option>
                          <option>Last 6 months</option>
                          <option>Last 12 months</option>
                        </select>
                        <p className="mt-1 text-xs text-gray-500">
                          Older backups will be automatically deleted.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;