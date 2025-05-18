import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ChevronDown,
  Image as ImageIcon,
  Link as LinkIcon,
  Type,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  FileText,
  Trash2
} from 'lucide-react';

// Mock content data
const MOCK_CONTENT = [
  {
    id: "1",
    title: "The Future of Digital Publishing",
    content: `<h1>The Future of Digital Publishing</h1>
    <p>Digital publishing has rapidly evolved over the past decade, transforming how content is created, distributed, and consumed. As we look to the future, several key trends are emerging that will shape the industry for years to come.</p>
    <h2>1. AI-Powered Content Creation</h2>
    <p>Artificial intelligence is increasingly being used to assist human writers, editors, and publishers. From automated grammar checking to content recommendations and even basic article generation, AI is streamlining the publishing workflow.</p>
    <h2>2. Interactive and Immersive Experiences</h2>
    <p>Static content is giving way to interactive experiences. Enhanced e-books, augmented reality overlays, and multimedia integration are creating more engaging ways for readers to connect with content.</p>
    <h2>3. Personalized Content Delivery</h2>
    <p>Publishers are leveraging data analytics to deliver personalized content experiences. Recommendation engines and custom content streams are becoming more sophisticated, increasing reader engagement and satisfaction.</p>`,
    excerpt: "An exploration of emerging trends and technologies that will shape the future of digital content publishing.",
    category: "Technology",
    tags: ["digital publishing", "future trends", "technology"],
    status: "Published",
    author: "Jane Cooper",
    date: "May 4, 2025",
    featuredImage: "https://images.pexels.com/photos/7173047/pexels-photo-7173047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "2",
    title: "Content Strategy for 2026",
    content: `<h1>Content Strategy for 2026</h1>
    <p>As we approach 2026, organizations need to rethink their content strategies to stay relevant in an increasingly competitive digital landscape.</p>
    <h2>Key Components of a 2026 Content Strategy</h2>
    <p>Successful content strategies will need to incorporate multiple channels, formats, and approaches while maintaining brand consistency and meeting audience needs.</p>
    <h2>Draft Outline</h2>
    <ul>
      <li>Introduction to modern content ecosystems</li>
      <li>Audience segmentation and personalization</li>
      <li>Multi-format content planning</li>
      <li>Distribution channel optimization</li>
      <li>Performance measurement frameworks</li>
    </ul>
    <p>This is a draft document that needs further development and review.</p>`,
    excerpt: "Preparing your content strategy for the next generation of digital consumers and platforms.",
    category: "Marketing",
    tags: ["content strategy", "marketing", "planning"],
    status: "Draft",
    author: "Alex Morgan",
    date: "May 2, 2025",
    featuredImage: "https://images.pexels.com/photos/6893930/pexels-photo-6893930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const ContentEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewContent = !id;
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [status, setStatus] = useState('Draft');
  const [featuredImage, setFeaturedImage] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Mock categories
  const categories = [
    'Technology', 'Marketing', 'Publishing', 'Authors', 
    'Books', 'Industry', 'Guidelines', 'Branding'
  ];

  // Initialize editor with content if editing existing item
  useEffect(() => {
    if (!isNewContent) {
      const contentItem = MOCK_CONTENT.find(item => item.id === id);
      if (contentItem) {
        setTitle(contentItem.title);
        setContent(contentItem.content);
        setExcerpt(contentItem.excerpt);
        setCategory(contentItem.category);
        setTags(contentItem.tags);
        setStatus(contentItem.status);
        setFeaturedImage(contentItem.featuredImage);
      }
    }
  }, [id, isNewContent]);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSaving(false);
      // In a real app, would save to API here
      navigate('/content');
    }, 800);
  };

  const handlePublish = () => {
    setStatus('Published');
    handleSave();
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim().toLowerCase())) {
        setTags([...tags, tagInput.trim().toLowerCase()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const selectCategory = (cat: string) => {
    setCategory(cat);
    setShowCategoryDropdown(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto fade-in">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNewContent ? 'Create New Content' : 'Edit Content'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {isNewContent ? 'Create a new piece of content for your audience' : 'Make changes to your existing content'}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="btn btn-secondary flex items-center"
          >
            <Eye size={16} className="mr-2" />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn btn-secondary flex items-center"
          >
            {isSaving ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-b-2 border-primary-600 rounded-full"></span>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Save Draft
              </>
            )}
          </button>
          <div className="relative">
            <button
              onClick={handlePublish}
              className="btn btn-primary flex items-center"
            >
              <CheckCircle2 size={16} className="mr-2" />
              Publish
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white shadow-md rounded-lg p-6">
        {!showPreview ? (
          // Editor View
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                className="w-full text-3xl font-bold border-0 border-b border-gray-200 focus:ring-0 focus:border-primary-500 placeholder-gray-400"
              />
            </div>

            {/* Rich Text Editor Toolbar */}
            <div className="border border-gray-200 rounded-lg">
              <div className="flex flex-wrap items-center gap-1 p-2 border-b">
                <div className="flex items-center mr-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Type size={18} />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Heading1 size={18} />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Heading2 size={18} />
                  </button>
                </div>
                <div className="flex items-center mr-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Bold size={18} />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Italic size={18} />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Underline size={18} />
                  </button>
                </div>
                <div className="flex items-center mr-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <List size={18} />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ListOrdered size={18} />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Quote size={18} />
                  </button>
                </div>
                <div className="flex items-center mr-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <AlignLeft size={18} />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <AlignCenter size={18} />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <AlignRight size={18} />
                  </button>
                </div>
                <div className="flex items-center">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <LinkIcon size={18} />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ImageIcon size={18} />
                  </button>
                </div>
              </div>

              {/* Content Editor */}
              <div className="p-4 min-h-[400px]">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your content here..."
                  className="w-full h-96 border-0 focus:ring-0 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Metadata Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-6 md:col-span-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Write a short excerpt..."
                    className="w-full h-24 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {tag}
                        <button 
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-blue-400 hover:text-blue-600"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tags (press Enter to add)..."
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                  {featuredImage ? (
                    <div className="relative">
                      <img 
                        src={featuredImage} 
                        alt="Featured" 
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <button 
                        onClick={() => setFeaturedImage('')}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <button className="text-sm text-primary-600 hover:text-primary-500">
                          Upload an image
                        </button>
                        <p className="mt-1 text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <span>{category || 'Select a category'}</span>
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </button>
                    
                    {showCategoryDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {categories.map(cat => (
                          <div
                            key={cat}
                            onClick={() => selectCategory(cat)}
                            className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 ${
                              category === cat ? 'bg-primary-50 text-primary-600' : 'text-gray-900'
                            }`}
                          >
                            {cat}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="status-draft"
                        name="status"
                        type="radio"
                        checked={status === 'Draft'}
                        onChange={() => setStatus('Draft')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="status-draft" className="ml-2 block text-sm text-gray-700">
                        Draft
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="status-review"
                        name="status"
                        type="radio"
                        checked={status === 'Under Review'}
                        onChange={() => setStatus('Under Review')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="status-review" className="ml-2 block text-sm text-gray-700">
                        Review
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Preview Mode
          <div className="space-y-6">
            {featuredImage && (
              <img src={featuredImage} alt={title} className="w-full h-64 object-cover rounded-lg" />
            )}
            
            <h1 className="text-3xl font-bold text-gray-900">{title || 'Untitled Content'}</h1>
            
            {category && (
              <div className="text-sm text-primary-600 font-medium">{category}</div>
            )}
            
            {excerpt && (
              <div className="text-lg text-gray-700 font-light italic border-l-4 border-gray-200 pl-4">
                {excerpt}
              </div>
            )}
            
            <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: content || '<p>No content to preview</p>' }} />
            
            {tags.length > 0 && (
              <div className="pt-4 border-t">
                <div className="text-sm font-medium text-gray-700 mb-2">Tags:</div>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => navigate('/content')}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn btn-primary"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default ContentEditor;