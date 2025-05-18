import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Camera, Mail, Building, MapPin, Phone, Calendar, Save } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    company: 'Publishing Co.',
    location: 'New York, USA',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2025'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 fade-in">
      <div className="bg-dark-800 shadow rounded-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-800"></div>

        {/* Profile Section */}
        <div className="relative px-6 py-8">
          {/* Profile Photo */}
          <div className="absolute -top-12">
            <div className="h-24 w-24 rounded-full ring-4 ring-dark-800 bg-dark-700 flex items-center justify-center text-3xl text-white">
              {user?.name.charAt(0)}
              <button className="absolute bottom-0 right-0 bg-dark-700 p-1.5 rounded-full text-white hover:bg-dark-600">
                <Camera size={16} />
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="mt-12">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="text-2xl font-bold text-white bg-dark-700 border-none rounded px-2 py-1"
                      />
                    ) : (
                      <h1 className="text-2xl font-bold text-white">{formData.name}</h1>
                    )}
                    <p className="text-primary-400 mt-1 capitalize">{formData.role}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-dark-100">
                      <Mail size={18} className="text-primary-400 mr-2" />
                      {isEditing ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-dark-700 border-none rounded px-2 py-1 text-white"
                        />
                      ) : (
                        <span>{formData.email}</span>
                      )}
                    </div>
                    <div className="flex items-center text-dark-100">
                      <Building size={18} className="text-primary-400 mr-2" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="bg-dark-700 border-none rounded px-2 py-1 text-white"
                        />
                      ) : (
                        <span>{formData.company}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-dark-100">
                      <MapPin size={18} className="text-primary-400 mr-2" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="bg-dark-700 border-none rounded px-2 py-1 text-white"
                        />
                      ) : (
                        <span>{formData.location}</span>
                      )}
                    </div>
                    <div className="flex items-center text-dark-100">
                      <Phone size={18} className="text-primary-400 mr-2" />
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-dark-700 border-none rounded px-2 py-1 text-white"
                        />
                      ) : (
                        <span>{formData.phone}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-dark-100">
                  <Calendar size={18} className="text-primary-400 mr-2" />
                  <span>Joined {formData.joinDate}</span>
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                    >
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Activity & Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Published article', date: '2 hours ago' },
              { action: 'Updated profile', date: '1 day ago' },
              { action: 'Commented on post', date: '3 days ago' }
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center text-dark-100">
                <span>{activity.action}</span>
                <span className="text-dark-400 text-sm">{activity.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-white mb-4">Content Stats</h2>
          <div className="space-y-4">
            {[
              { label: 'Published Articles', value: '24' },
              { label: 'Total Views', value: '45.2K' },
              { label: 'Avg. Engagement', value: '12%' }
            ].map((stat, index) => (
              <div key={index} className="flex justify-between items-center text-dark-100">
                <span>{stat.label}</span>
                <span className="font-medium text-primary-400">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-800 rounded-lg p-6">
          <h2 className="text-lg font-medium text-white mb-4">Achievements</h2>
          <div className="space-y-4">
            {[
              { badge: '🏆', title: 'Top Contributor', date: 'March 2025' },
              { badge: '⭐', title: 'Quality Writer', date: 'February 2025' },
              { badge: '🎯', title: 'Trending Author', date: 'January 2025' }
            ].map((achievement, index) => (
              <div key={index} className="flex items-center text-dark-100">
                <span className="text-2xl mr-2">{achievement.badge}</span>
                <div>
                  <div className="font-medium">{achievement.title}</div>
                  <div className="text-dark-400 text-sm">{achievement.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;