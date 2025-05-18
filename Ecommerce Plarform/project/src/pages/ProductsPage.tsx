import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  category: string;
}

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Kitchen',
    'Beauty & Personal Care',
    'Sports & Outdoors'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, you would fetch from your API with filters
        // For now, we'll use placeholder data
        const placeholderProducts = [
          {
            _id: '1',
            name: 'Premium Wireless Headphones',
            price: 199.99,
            image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.8,
            description: 'Experience crystal-clear sound with our premium wireless headphones featuring noise cancellation technology.',
            category: 'Electronics'
          },
          {
            _id: '2',
            name: 'Smart Fitness Watch',
            price: 149.99,
            image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.6,
            description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.',
            category: 'Electronics'
          },
          {
            _id: '3',
            name: 'Ergonomic Office Chair',
            price: 249.99,
            image: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.7,
            description: 'Stay comfortable during long work hours with this ergonomic office chair designed for proper posture.',
            category: 'Home & Kitchen'
          },
          {
            _id: '4',
            name: 'Ultra HD 4K Monitor',
            price: 349.99,
            image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.9,
            description: 'Enhance your viewing experience with this Ultra HD 4K monitor featuring vibrant colors and sharp details.',
            category: 'Electronics'
          },
          {
            _id: '5',
            name: 'Portable Bluetooth Speaker',
            price: 79.99,
            image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.5,
            description: 'Take your music anywhere with this waterproof portable Bluetooth speaker with 20-hour battery life.',
            category: 'Electronics'
          },
          {
            _id: '6',
            name: 'Leather Laptop Bag',
            price: 89.99,
            image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.7,
            description: 'Stylish and durable leather laptop bag with multiple compartments for all your essentials.',
            category: 'Clothing'
          },
          {
            _id: '7',
            name: 'Smart Home Security Camera',
            price: 129.99,
            image: 'https://images.pexels.com/photos/3205735/pexels-photo-3205735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.6,
            description: 'Keep your home secure with this HD security camera featuring motion detection and night vision.',
            category: 'Electronics'
          },
          {
            _id: '8',
            name: 'Stainless Steel Water Bottle',
            price: 24.99,
            image: 'https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.8,
            description: 'Stay hydrated with this vacuum-insulated stainless steel water bottle that keeps drinks cold for 24 hours.',
            category: 'Sports & Outdoors'
          },
          {
            _id: '9',
            name: 'Organic Cotton T-Shirt',
            price: 29.99,
            image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.5,
            description: 'Comfortable and eco-friendly organic cotton t-shirt available in multiple colors.',
            category: 'Clothing'
          },
          {
            _id: '10',
            name: 'Professional Blender',
            price: 119.99,
            image: 'https://images.pexels.com/photos/3209101/pexels-photo-3209101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.7,
            description: 'High-performance blender with multiple speed settings for smoothies, soups, and more.',
            category: 'Home & Kitchen'
          },
          {
            _id: '11',
            name: 'Natural Face Moisturizer',
            price: 34.99,
            image: 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.6,
            description: 'Hydrating face moisturizer made with natural ingredients for all skin types.',
            category: 'Beauty & Personal Care'
          },
          {
            _id: '12',
            name: 'Yoga Mat',
            price: 39.99,
            image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.8,
            description: 'Non-slip yoga mat with extra cushioning for comfort during workouts.',
            category: 'Sports & Outdoors'
          }
        ];

        // Apply category filter from URL if present
        const categoryParam = searchParams.get('category');
        if (categoryParam && categoryParam !== 'featured' && categoryParam !== 'new') {
          setSelectedCategories([categoryParam]);
        }

        setProducts(placeholderProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSortBy('featured');
  };

  const filteredProducts = products
    .filter(product => 
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      (product.price >= priceRange[0] && product.price <= priceRange[1])
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile filter button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-2" />
            {filterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {/* Sidebar filters */}
        <div className={`md:w-64 ${filterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Reset All
              </button>
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      name={`category-${category}`}
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">${priceRange[0]}</span>
                  <span className="text-sm text-gray-500">${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full"
                />
                <div className="flex space-x-2">
                  <input
                    type="number"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                  <span className="text-gray-500 self-center">to</span>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
            
            {/* Ratings */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Customer Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input
                      id={`rating-${rating}`}
                      name="rating"
                      type="radio"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1">& Up</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Product grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">All Products</h1>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                name="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
          
          {/* Active filters */}
          {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000) && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                  >
                    {category}
                    <X className="ml-1 h-4 w-4" />
                  </button>
                ))}
                
                {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                  <button
                    onClick={() => setPriceRange([0, 1000])}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                  >
                    ${priceRange[0]} - ${priceRange[1]}
                    <X className="ml-1 h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;