import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  stock: number;
  category: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // In a real app, you would fetch from your API
        // For now, we'll use placeholder data
        const placeholderProduct: Product = {
          _id: id || '1',
          name: 'Premium Wireless Headphones',
          price: 199.99,
          images: [
            'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/3394652/pexels-photo-3394652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          ],
          rating: 4.8,
          reviewCount: 124,
          description: 'Experience crystal-clear sound with our premium wireless headphones featuring advanced noise cancellation technology. These headphones provide an immersive audio experience with deep bass and crisp highs. The comfortable over-ear design allows for hours of listening without discomfort, while the long-lasting battery ensures you can enjoy your music all day long.',
          features: [
            'Active Noise Cancellation',
            'Bluetooth 5.0 connectivity',
            'Up to 30 hours of battery life',
            'Comfortable over-ear design',
            'Built-in microphone for calls',
            'Touch controls for easy operation'
          ],
          specifications: {
            'Brand': 'ModernAudio',
            'Model': 'MA-500',
            'Color': 'Matte Black',
            'Connectivity': 'Bluetooth 5.0, 3.5mm jack',
            'Battery Life': '30 hours',
            'Charging Time': '2 hours',
            'Weight': '250g',
            'Warranty': '2 years'
          },
          stock: 15,
          category: 'Electronics'
        };

        setProduct(placeholderProduct);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">Home</Link>
          </li>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <li>
            <Link to="/products" className="text-gray-500 hover:text-gray-700 text-sm">Products</Link>
          </li>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <li>
            <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-gray-700 text-sm">{product.category}</Link>
          </li>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <li>
            <span className="text-gray-900 text-sm font-medium">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`border-2 rounded-md overflow-hidden ${
                  activeImage === index ? 'border-indigo-500' : 'border-transparent'
                }`}
              >
                <img src={image} alt={`${product.name} - View ${index + 1}`} className="w-full h-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>
          
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.stock > 0 ? (
              <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Out of Stock
              </span>
            )}
          </div>
          
          <p className="text-gray-600 mb-6">{product.description.split('.')[0]}.</p>
          
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mr-4">
                Quantity:
              </label>
              <select
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                disabled={product.stock === 0}
              >
                {[...Array(Math.min(10, product.stock))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                  product.stock > 0
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              
              <button className="p-3 rounded-md border border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400">
                <Heart className="h-6 w-6" />
              </button>
              
              <button className="p-3 rounded-md border border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-start">
              <Truck className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                <p className="text-sm text-gray-500">On orders over $50. Delivery in 3-5 business days.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">2-Year Warranty</h4>
                <p className="text-sm text-gray-500">Full coverage for manufacturing defects.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <RotateCcw className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">30-Day Returns</h4>
                <p className="text-sm text-gray-500">Return or exchange within 30 days of purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`${
                activeTab === 'description'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`${
                activeTab === 'features'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`${
                activeTab === 'specifications'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`${
                activeTab === 'reviews'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Reviews
            </button>
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-600 mt-4">
                The ergonomic design ensures a comfortable fit for extended listening sessions, while the premium materials provide durability and style. With intuitive touch controls, you can easily manage your music, calls, and voice assistant without reaching for your device.
              </p>
              <p className="text-gray-600 mt-4">
                These headphones are perfect for commuting, traveling, or enjoying your favorite music at home. The included carrying case keeps your headphones protected when not in use, and the adjustable headband ensures a perfect fit for any head size.
              </p>
            </div>
          )}
          
          {activeTab === 'features' && (
            <ul className="space-y-4">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          )}
          
          {activeTab === 'specifications' && (
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                        {key}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  Write a Review
                </button>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    Based on {product.reviewCount} reviews
                  </span>
                </div>
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const percentage = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1;
                    return (
                      <div key={rating} className="flex items-center">
                        <div className="flex items-center w-24">
                          <span className="text-sm text-gray-600 mr-2">{rating} stars</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-yellow-400 h-2.5 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 ml-2">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    name: 'Sarah Johnson',
                    rating: 5,
                    date: '2 months ago',
                    comment: 'These headphones are amazing! The sound quality is exceptional, and the noise cancellation works perfectly. I use them every day for work calls and listening to music. Battery life is impressive too - I only need to charge them once a week with daily use.'
                  },
                  {
                    name: 'Michael Chen',
                    rating: 4,
                    date: '3 weeks ago',
                    comment: 'Great headphones overall. The sound is clear and balanced, and they\'re very comfortable to wear for long periods. The only reason I\'m giving 4 stars instead of 5 is that the touch controls can be a bit sensitive sometimes.'
                  },
                  {
                    name: 'Emily Rodriguez',
                    rating: 5,
                    date: '1 month ago',
                    comment: 'Absolutely worth the price! The noise cancellation is perfect for my commute, and the sound quality is better than any headphones I\'ve owned before. The carrying case is also very sturdy and well-designed.'
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{review.name}</h4>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              _id: '5',
              name: 'Portable Bluetooth Speaker',
              price: 79.99,
              image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              rating: 4.5,
              description: 'Take your music anywhere with this waterproof portable Bluetooth speaker with 20-hour battery life.'
            },
            {
              _id: '7',
              name: 'Smart Home Security Camera',
              price: 129.99,
              image: 'https://images.pexels.com/photos/3205735/pexels-photo-3205735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              rating: 4.6,
              description: 'Keep your home secure with this HD security camera featuring motion detection and night vision.'
            },
            {
              _id: '2',
              name: 'Smart Fitness Watch',
              price: 149.99,
              image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              rating: 4.6,
              description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.'
            },
            {
              _id: '4',
              name: 'Ultra HD 4K Monitor',
              price: 349.99,
              image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              rating: 4.9,
              description: 'Enhance your viewing experience with this Ultra HD 4K monitor featuring vibrant colors and sharp details.'
            }
          ].map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link to={`/products/${product._id}`}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <Link to={`/products/${product._id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 truncate">{product.name}</h3>
                </Link>
                <div className="mt-1 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.rating.toFixed(1)})</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <button className="text-indigo-600 hover:text-indigo-800">
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;