import React, { useState } from 'react';
import { 
  Upload, 
  Search, 
  Grid3X3, 
  List, 
  Filter, 
  ChevronDown, 
  MoreVertical,
  Download,
  Link2,
  Edit3,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';

// Mock media data
const MOCK_MEDIA = [
  {
    id: 1,
    name: 'cover-image-book.jpg',
    type: 'image/jpeg',
    size: '2.4 MB',
    dimensions: '1920 x 1080',
    url: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    uploadedBy: 'Jane Cooper',
    uploadedDate: 'May 4, 2025',
    usedIn: ['The Future of Digital Publishing'],
  },
  {
    id: 2,
    name: 'marketing-strategy.jpg',
    type: 'image/jpeg',
    size: '1.8 MB',
    dimensions: '1600 x 900',
    url: 'https://images.pexels.com/photos/6893930/pexels-photo-6893930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    uploadedBy: 'Alex Morgan',
    uploadedDate: 'May 2, 2025',
    usedIn: ['Content Strategy for 2026'],
  },
  {
    id: 3,
    name: 'editorial-team.jpg',
    type: 'image/jpeg',
    size: '3.2 MB',
    dimensions: '2000 x 1330',
    url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    uploadedBy: 'Robert Fox',
    uploadedDate: 'April 28, 2025',
    usedIn: ['Editorial Guidelines 2025'],
  },
  {
    id: 4,
    name: 'brand-guide-cover.jpg',
    type: 'image/jpeg',
    size: '1.5 MB',
    dimensions: '1800 x 1200',
    url: 'https://images.pexels.com/photos/6214385/pexels-photo-6214385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    uploadedBy: 'Jenny Wilson',
    uploadedDate: 'April 25, 2025',
    usedIn: ['Brand Style Guide'],
  },
  {
    id: 5,
    name: 'author-interview.jpg',
    type: 'image/jpeg',
    size: '2.1 MB',
    dimensions: '1600 x 1067',
    url: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    uploadedBy: 'Sarah Miller',
    uploadedDate: 'April 20, 2025',
    usedIn: ['Author Interview: Emma Roberts'],
  },
  {
    id: 6,
    name: 'reading-list.jpg',
    type: 'image/jpeg',
    size: '2.7 MB',
    dimensions: '2400 x 1600',
    url: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    uploadedBy: 'James Peterson',
    uploadedDate: 'April 18, 2025',
    usedIn: ['Winter Reading List 2025'],
  },
  {
    id: 7,
    name: 'industry-report.jpg',
    type: 'image/jpeg',
    size: '1.9 MB',
    dimensions: '1800 x 1200',
    url: 'https://images.pexels.com/photos/8867304/pexels-photo-8867304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    uploadedBy: 'David Williams',
    uploadedDate: 'April 15, 2025',
    usedIn: ['Publishing Industry Trends'],
  },
  {
    id: 8,
    name: 'digital-books.jpg',
    type: 'image/jpeg',
    size: '2.3 MB',
    dimensions: '2000 x 1333',
    url: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    uploadedBy: 'Michael Johnson',
    uploadedDate: 'April 22, 2025',
    usedIn: ['The Evolution of E-books'],
  },
];

const MediaLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  // Filter media based on search
  const filteredMedia = MOCK_MEDIA.filter(media => 
    media.name.toLowerCase().includes(search.toLowerCase()) ||
    media.uploadedBy.toLowerCase().includes(search.toLowerCase())
  );

  // Handle media selection
  const handleMediaSelect = (id: number) => {
    if (selectedMediaId === id) {
      setSelectedMediaId(null);
      setShowDetails(false);
    } else {
      setSelectedMediaId(id);
      setShowDetails(true);
    }
  };

  // Toggle dropdown menu
  const toggleDropdown = (id: number) => {
    setActiveDropdownId(activeDropdownId === id ? null : id);
  };

  // Get selected media details
  const selectedMedia = selectedMediaId 
    ? MOCK_MEDIA.find(media => media.id === selectedMediaId) 
    : null;

  return (
    <div className="space-y-6 fade-in">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your images, videos, and other media assets
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn btn-primary flex items-center">
            <Upload size={16} className="mr-2" />
            Upload Media
          </button>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search media files..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setView('grid')}
              className={`p-2 rounded-md ${view === 'grid' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
            >
              <Grid3X3 size={20} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-md ${view === 'list' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
            >
              <List size={20} />
            </button>

            <div className="relative">
              <button 
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Media Display */}
        <div className={`bg-white shadow rounded-lg p-4 ${showDetails ? 'lg:w-2/3' : 'w-full'}`}>
          {filteredMedia.length === 0 ? (
            <div className="text-center py-10">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No media files found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms.</p>
            </div>
          ) : view === 'grid' ? (
            // Grid View
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map(media => (
                <div 
                  key={media.id}
                  onClick={() => handleMediaSelect(media.id)}
                  className={`relative group rounded-lg overflow-hidden border ${selectedMediaId === media.id ? 'ring-2 ring-primary-500 border-primary-500' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <img 
                    src={media.url} 
                    alt={media.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-white p-2">
                    <p className="text-sm font-medium text-gray-800 truncate" title={media.name}>
                      {media.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {media.type.split('/')[1].toUpperCase()} · {media.size}
                    </p>
                  </div>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(media.id);
                        }}
                        className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {activeDropdownId === media.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                          <button
                            className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                          >
                            <Download size={14} className="mr-2" />
                            Download
                          </button>
                          <button
                            className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                          >
                            <Link2 size={14} className="mr-2" />
                            Copy Link
                          </button>
                          <button
                            className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                          >
                            <Edit3 size={14} className="mr-2" />
                            Rename
                          </button>
                          <button
                            className="flex w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
                          >
                            <Trash2 size={14} className="mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded By
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMedia.map(media => (
                    <tr 
                      key={media.id}
                      onClick={() => handleMediaSelect(media.id)}
                      className={`hover:bg-gray-50 cursor-pointer ${selectedMediaId === media.id ? 'bg-primary-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              src={media.url} 
                              alt={media.name}
                              className="h-10 w-10 rounded object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                              {media.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {media.type}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {media.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {media.uploadedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {media.uploadedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(media.id);
                            }}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <MoreVertical size={18} />
                          </button>
                          
                          {activeDropdownId === media.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                              <button
                                className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                              >
                                <Download size={14} className="mr-2" />
                                Download
                              </button>
                              <button
                                className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                              >
                                <Link2 size={14} className="mr-2" />
                                Copy Link
                              </button>
                              <button
                                className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                              >
                                <Edit3 size={14} className="mr-2" />
                                Rename
                              </button>
                              <button
                                className="flex w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
                              >
                                <Trash2 size={14} className="mr-2" />
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
          )}

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-3">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="btn btn-secondary">Previous</button>
              <button className="btn btn-secondary">Next</button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredMedia.length}</span> of{' '}
                  <span className="font-medium">{MOCK_MEDIA.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronDown className="h-5 w-5 rotate-90" />
                  </button>
                  <button
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    1
                  </button>
                  <button
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-50 text-sm font-medium text-primary-600 hover:bg-primary-100"
                  >
                    2
                  </button>
                  <button
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    3
                  </button>
                  <button
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronDown className="h-5 w-5 -rotate-90" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Details Panel */}
        {showDetails && selectedMedia && (
          <div className="bg-white shadow rounded-lg p-6 lg:w-1/3">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">Media Details</h3>
              <button 
                onClick={() => {
                  setSelectedMediaId(null);
                  setShowDetails(false);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            
            <div className="mt-4">
              <img 
                src={selectedMedia.url} 
                alt={selectedMedia.name}
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">File Name</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedMedia.name}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Dimensions</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedMedia.dimensions}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">File Type</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedMedia.type}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">File Size</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedMedia.size}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Uploaded By</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedMedia.uploadedBy}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Upload Date</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedMedia.uploadedDate}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Used In</h4>
                <ul className="mt-1 space-y-1">
                  {selectedMedia.usedIn.map((item, index) => (
                    <li key={index} className="text-sm text-primary-600">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col space-y-2">
              <button className="btn btn-secondary flex items-center justify-center">
                <Download size={16} className="mr-2" />
                Download
              </button>
              <button className="btn btn-secondary flex items-center justify-center">
                <Link2 size={16} className="mr-2" />
                Copy Link
              </button>
              <button className="btn btn-secondary flex items-center justify-center">
                <Edit3 size={16} className="mr-2" />
                Edit Details
              </button>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center justify-center mt-4">
                <Trash2 size={16} className="mr-2" />
                Delete File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;