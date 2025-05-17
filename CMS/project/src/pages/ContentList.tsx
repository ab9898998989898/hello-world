import React, { useState } from 'react';
import { 
  FilePlus2, 
  Filter, 
  Search, 
  ChevronDown, 
  MoreVertical, 
  ArrowUp, 
  ArrowDown,
  CheckCircle2,
  Clock,
  Calendar,
  PenLine,
  Trash2,
  Copy,
  Eye,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock content data
const MOCK_CONTENT = [
  {
    id: 1,
    title: 'The Future of Digital Publishing',
    type: 'Article',
    category: 'Technology',
    status: 'Published',
    author: 'Jane Cooper',
    date: 'May 4, 2025',
    views: 5240,
  },
  {
    id: 2,
    title: 'Content Strategy for 2026',
    type: 'Article',
    category: 'Marketing',
    status: 'Draft',
    author: 'Alex Morgan',
    date: 'May 2, 2025',
    views: 0,
  },
  {
    id: 3,
    title: 'Editorial Guidelines 2025',
    type: 'Document',
    category: 'Guidelines',
    status: 'Under Review',
    author: 'Robert Fox',
    date: 'April 28, 2025',
    views: 1250,
  },
  {
    id: 4,
    title: 'Brand Style Guide',
    type: 'Document',
    category: 'Branding',
    status: 'Scheduled',
    author: 'Jenny Wilson',
    date: 'April 25, 2025',
    views: 0,
  },
  {
    id: 5,
    title: 'The Evolution of E-books',
    type: 'Article',
    category: 'Publishing',
    status: 'Published',
    author: 'Michael Johnson',
    date: 'April 22, 2025',
    views: 4120,
  },
  {
    id: 6,
    title: 'Author Interview: Emma Roberts',
    type: 'Interview',
    category: 'Authors',
    status: 'Published',
    author: 'Sarah Miller',
    date: 'April 20, 2025',
    views: 3870,
  },
  {
    id: 7,
    title: 'Winter Reading List 2025',
    type: 'List',
    category: 'Books',
    status: 'Draft',
    author: 'James Peterson',
    date: 'April 18, 2025',
    views: 0,
  },
  {
    id: 8,
    title: 'Publishing Industry Trends',
    type: 'Report',
    category: 'Industry',
    status: 'Under Review',
    author: 'David Williams',
    date: 'April 15, 2025',
    views: 875,
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-purple-100 text-purple-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

const ContentList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showDropdownId, setShowDropdownId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Sort and filter content
  const filteredContent = MOCK_CONTENT
    .filter(content => {
      const matchesSearch = content.title.toLowerCase().includes(search.toLowerCase()) ||
                           content.author.toLowerCase().includes(search.toLowerCase()) ||
                           content.category.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !selectedStatus || content.status === selectedStatus;
      const matchesType = !selectedType || content.type === selectedType;
      
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      if (sortField === 'title') {
        return sortDirection === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      } else if (sortField === 'views') {
        return sortDirection === 'asc' 
          ? a.views - b.views 
          : b.views - a.views;
      } else {
        // Default sort by date
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const toggleDropdown = (id: number) => {
    setShowDropdownId(showDropdownId === id ? null : id);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(selectedStatus === status ? null : status);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(selectedType === type ? null : type);
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedStatus(null);
    setSelectedType(null);
  };

  // Get unique content types
  const contentTypes = Array.from(new Set(MOCK_CONTENT.map(item => item.type)));
  
  // Get unique statuses
  const contentStatuses = Array.from(new Set(MOCK_CONTENT.map(item => item.status)));

  return (
    <div className="space-y-6 fade-in">
      <header className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your content library
          </p>
        </div>
        <div className="flex space-x-3">
          <Link 
            to="/content/new" 
            className="btn btn-primary flex items-center"
          >
            <FilePlus2 size={16} className="mr-2" />
            Create New
          </Link>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search content..."
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown 
              className={`ml-1 h-4 w-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 animate-slideDown">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="space-y-2">
                  {contentStatuses.map(status => (
                    <div key={status} className="flex items-center">
                      <input
                        id={`status-${status.toLowerCase().replace(' ', '-')}`}
                        type="checkbox"
                        checked={selectedStatus === status}
                        onChange={() => handleStatusChange(status)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label 
                        htmlFor={`status-${status.toLowerCase().replace(' ', '-')}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                <div className="space-y-2">
                  {contentTypes.map(type => (
                    <div key={type} className="flex items-center">
                      <input
                        id={`type-${type.toLowerCase()}`}
                        type="checkbox"
                        checked={selectedType === type}
                        onChange={() => handleTypeChange(type)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label 
                        htmlFor={`type-${type.toLowerCase()}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('title')}
                >
                  <div className="flex items-center">
                    Title
                    {sortField === 'title' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp size={14} className="ml-1" /> : 
                        <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('date')}
                >
                  <div className="flex items-center">
                    Date
                    {sortField === 'date' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp size={14} className="ml-1" /> : 
                        <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('views')}
                >
                  <div className="flex items-center">
                    Views
                    {sortField === 'views' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp size={14} className="ml-1" /> : 
                        <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContent.map((content) => (
                <tr key={content.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {content.title}
                    </div>
                    <div className="text-sm text-gray-500">{content.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {content.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={content.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {content.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {content.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {content.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <button 
                        onClick={() => toggleDropdown(content.id)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <MoreVertical size={20} />
                      </button>
                      
                      {showDropdownId === content.id && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          <Link
                            to={`/content/edit/${content.id}`}
                            className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <PenLine className="mr-3 h-4 w-4" />
                            Edit
                          </Link>
                          <button
                            className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                          >
                            <Eye className="mr-3 h-4 w-4" />
                            Preview
                          </button>
                          <button
                            className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                          >
                            <Copy className="mr-3 h-4 w-4" />
                            Duplicate
                          </button>
                          
                          {content.status !== 'Published' && (
                            <button
                              className="flex w-full px-4 py-2 text-sm text-green-700 hover:bg-gray-100 text-left"
                            >
                              <CheckCircle2 className="mr-3 h-4 w-4" />
                              Publish
                            </button>
                          )}
                          
                          {content.status === 'Draft' && (
                            <button
                              className="flex w-full px-4 py-2 text-sm text-purple-700 hover:bg-gray-100 text-left"
                            >
                              <Clock className="mr-3 h-4 w-4" />
                              Submit for Review
                            </button>
                          )}
                          
                          <button
                            className="flex w-full px-4 py-2 text-sm text-blue-700 hover:bg-gray-100 text-left"
                          >
                            <Calendar className="mr-3 h-4 w-4" />
                            Schedule
                          </button>
                          
                          <button
                            className="flex w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100 text-left"
                          >
                            <Trash2 className="mr-3 h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredContent.length === 0 && (
          <div className="px-6 py-10 text-center">
            <p className="text-gray-500">No content found. Try adjusting your filters.</p>
          </div>
        )}

        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {filteredContent.length} of {MOCK_CONTENT.length} content items
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-secondary">Previous</button>
            <button className="btn btn-secondary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentList;