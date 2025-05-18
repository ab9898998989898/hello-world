import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Award, Truck, CreditCard } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
}

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, you would fetch from your API
        // For now, we'll use placeholder data
        const placeholderProducts = [
          {
            _id: '1',
            name: 'Premium Wireless Headphones',
            price: 199.99,
            image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.8,
            description: 'Experience crystal-clear sound with our premium wireless headphones featuring noise cancellation technology.'
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
            _id: '3',
            name: 'Ergonomic Office Chair',
            price: 249.99,
            image: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.7,
            description: 'Stay comfortable during long work hours with this ergonomic office chair designed for proper posture.'
          },
          {
            _id: '4',
            name: 'Ultra HD 4K Monitor',
            price: 349.99,
            image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.9,
            description: 'Enhance your viewing experience with this Ultra HD 4K monitor featuring vibrant colors and sharp details.'
          }
        ];

        const newArrivalsData = [
          {
            _id: '5',
            name: 'Portable Bluetooth Speaker',
            price: 79.99,
            image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.5,
            description: 'Take your music anywhere with this waterproof portable Bluetooth speaker with 20-hour battery life.'
          },
          {
            _id: '6',
            name: 'Leather Laptop Bag',
            price: 89.99,
            image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.7,
            description: 'Stylish and durable leather laptop bag with multiple compartments for all your essentials.'
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
            _id: '8',
            name: 'Stainless Steel Water Bottle',
            price: 24.99,
            image: 'https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rating: 4.8,
            description: 'Stay hydrated with this vacuum-insulated stainless steel water bottle that keeps drinks cold for 24 hours.'
          }
        ];

        setFeaturedProducts(placeholderProducts);
        setNewArrivals(newArrivalsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Discover Amazing Products for Every Need
            </h1>
            <p className="text-xl mb-8">
              Shop the latest trends and innovative products at unbeatable prices. Free shipping on orders over $50.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                to="/products?category=featured"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
              >
                View Featured
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm">
              <Truck className="h-10 w-10 text-indigo-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Free Shipping</h3>
                <p className="mt-2 text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            
            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm">
              <CreditCard className="h-10 w-10 text-indigo-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Secure Payment</h3>
                <p className="mt-2 text-sm text-gray-600">100% secure transactions</p>
              </div>
            </div>
            
            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm">
              <Award className="h-10 w-10 text-indigo-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Quality Guarantee</h3>
                <p className="mt-2 text-sm text-gray-600">30-day money-back guarantee</p>
              </div>
            </div>
            
            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm">
              <TrendingUp className="h-10 w-10 text-indigo-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Trending Products</h3>
                <p className="mt-2 text-sm text-gray-600">Updated weekly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/products?category=featured" className="text-indigo-600 hover:text-indigo-800 flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Summer Sale</h2>
              <p className="text-gray-300 text-lg mb-6">
                Get up to 50% off on selected items. Limited time offer.
              </p>
              <Link
                to="/products?sale=true"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 transition-colors"
              >
                Shop the Sale
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Summer Sale" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
            <Link to="/products?category=new" className="text-indigo-600 hover:text-indigo-800 flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map(product => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Stay updated with the latest products, exclusive offers, and discounts.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;