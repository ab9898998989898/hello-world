import React from 'react';
import { 
  BarChart3, 
  Users, 
  Clock, 
  FilePlus2, 
  FileText, 
  Heart, 
  Eye, 
  Calendar, 
  ChevronRight, 
  Bell,
  RefreshCcw,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleNewContent = () => {
    navigate('/content/new');
  };

  return (
    <div className="space-y-6 fade-in">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.name}
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-3">
          <button 
            onClick={handleRefresh}
            className="btn btn-secondary flex items-center"
          >
            <RefreshCcw size={16} className="mr-2" />
            Refresh
          </button>
          <button 
            onClick={handleNewContent}
            className="btn btn-primary flex items-center"
          >
            <FilePlus2 size={16} className="mr-2" />
            New Content
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Content
                  </dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">142</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <button 
                onClick={() => navigate('/content')}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                View all
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Monthly Views
                  </dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">98.5K</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <button 
                onClick={() => navigate('/analytics')}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                View analytics
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Review
                  </dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">7</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <button 
                onClick={() => navigate('/content?status=review')}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Review now
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Scheduled
                  </dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">12</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <button 
                onClick={() => navigate('/calendar')}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                View calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Recent content */}
        <div className="bg-white shadow rounded-lg col-span-2">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Content
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">The Future of Digital Publishing</div>
                    <div className="text-sm text-gray-500">Article</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Jane Cooper
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    May 4, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => navigate('/content/edit/1')}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Content Strategy for 2026</div>
                    <div className="text-sm text-gray-500">Article</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Draft
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Alex Morgan
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    May 2, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => navigate('/content/edit/2')}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Editorial Guidelines 2025</div>
                    <div className="text-sm text-gray-500">Document</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      Under Review
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Robert Fox
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    April 28, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => navigate('/content/edit/3')}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Brand Style Guide</div>
                    <div className="text-sm text-gray-500">Document</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Scheduled
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Jenny Wilson
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    April 25, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => navigate('/content/edit/4')}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing 4 of 142 content items
            </div>
            <button 
              onClick={() => navigate('/content')}
              className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              View all content
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Activity
            </h3>
            <button 
              onClick={() => navigate('/notifications')}
              className="text-primary-600 hover:text-primary-500"
            >
              <Bell size={18} />
            </button>
          </div>
          <div className="p-5">
            <div className="flow-root">
              <ul className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Activity size={16} className="text-blue-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Content Published
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            "The Future of Digital Publishing" has been published.
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <p>10 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Users size={16} className="text-green-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            New Contributor
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Sarah Connor has joined as a contributor.
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <p>45 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Heart size={16} className="text-yellow-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Trending Article
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            "Marketing Strategies" is trending with 5.2K views.
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <p>2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-8">
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <BarChart3 size={16} className="text-purple-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Analytics Updated
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            April analytics report is now available.
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          <p>4 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <button 
                onClick={() => navigate('/activity')}
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                View all activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;