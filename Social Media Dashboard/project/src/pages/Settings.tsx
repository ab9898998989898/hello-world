import React from 'react';
import { User, Lock, Bell, Globe, Layers, Sliders } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-2xl md:text-3xl">Settings</h1>
        <p className="text-dark-400">Manage your account and application preferences.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="card sticky top-20">
            <div className="space-y-1">
              <a href="#profile" className="nav-link active">
                <User size={18} />
                Profile
              </a>
              <a href="#security" className="nav-link">
                <Lock size={18} />
                Security
              </a>
              <a href="#notifications" className="nav-link">
                <Bell size={18} />
                Notifications
              </a>
              <a href="#integrations" className="nav-link">
                <Globe size={18} />
                Integrations
              </a>
              <a href="#display" className="nav-link">
                <Layers size={18} />
                Display
              </a>
              <a href="#preferences" className="nav-link">
                <Sliders size={18} />
                Preferences
              </a>
            </div>
            
            <div className="mt-6 pt-4 border-t border-dark-800">
              <p className="text-sm text-dark-400 mb-2">Account Status</p>
              <div className="flex items-center justify-between">
                <span className="font-medium">Pro Plan</span>
                <button className="text-sm text-primary-400 hover:text-primary-300">
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-8">
          <div id="profile" className="card">
            <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-secondary-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                AM
              </div>
              
              <div>
                <p className="font-medium">Alex Morgan</p>
                <p className="text-sm text-dark-400">Marketing Director</p>
                <button className="text-sm text-primary-400 hover:text-primary-300 mt-1">
                  Change Avatar
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="Alex"
                    className="w-full p-2 rounded-lg bg-dark-800 border border-dark-700 focus:outline-none focus:border-primary-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="Morgan"
                    className="w-full p-2 rounded-lg bg-dark-800 border border-dark-700 focus:outline-none focus:border-primary-600"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  defaultValue="alex.morgan@company.com"
                  className="w-full p-2 rounded-lg bg-dark-800 border border-dark-700 focus:outline-none focus:border-primary-600"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Job Title</label>
                <input 
                  type="text" 
                  defaultValue="Marketing Director"
                  className="w-full p-2 rounded-lg bg-dark-800 border border-dark-700 focus:outline-none focus:border-primary-600"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Company</label>
                <input 
                  type="text" 
                  defaultValue="Acme Inc."
                  className="w-full p-2 rounded-lg bg-dark-800 border border-dark-700 focus:outline-none focus:border-primary-600"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Bio</label>
                <textarea 
                  rows={4}
                  defaultValue="Marketing Director with over 10 years of experience in digital marketing and social media strategy."
                  className="w-full p-2 rounded-lg bg-dark-800 border border-dark-700 focus:outline-none focus:border-primary-600"
                />
              </div>
              
              <div className="pt-2 flex justify-end gap-3">
                <button className="btn btn-outline">Cancel</button>
                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
          
          <div id="security" className="card">
            <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Current Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full p-2 rounded-lg bg-dark-800 border border-dark-700 focus:outline-none focus:border-primary-600"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full p-2 rounded-lg bg-dark-800 border border-dark-700 focus:outline-none focus:border-primary-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Confirm New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full p-2 rounded-lg bg-dark-800 border border-dark-700 focus:outline-none focus:border-primary-600"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button className="btn btn-primary">Update Password</button>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-dark-800">
                <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-dark-400 mb-3">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <button className="btn btn-outline">Enable 2FA</button>
              </div>
              
              <div className="pt-4 border-t border-dark-800">
                <h3 className="font-medium mb-2">Sessions</h3>
                <p className="text-sm text-dark-400 mb-3">
                  Manage your active sessions across devices.
                </p>
                <button className="btn btn-outline text-error-500 border-error-500 hover:bg-error-500/10">
                  Sign Out All Devices
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;