import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold">ModernShop</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your one-stop destination for quality products at affordable prices. Shop with confidence and enjoy a seamless experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white text-sm">All Products</Link>
              </li>
              <li>
                <Link to="/products?category=electronics" className="text-gray-300 hover:text-white text-sm">Electronics</Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="text-gray-300 hover:text-white text-sm">Clothing</Link>
              </li>
              <li>
                <Link to="/products?category=home" className="text-gray-300 hover:text-white text-sm">Home & Kitchen</Link>
              </li>
              <li>
                <Link to="/products?category=beauty" className="text-gray-300 hover:text-white text-sm">Beauty & Personal Care</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white text-sm">Sign In</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white text-sm">Register</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white text-sm">View Cart</Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-300 hover:text-white text-sm">Track Orders</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white text-sm">My Account</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-indigo-400 mr-2 mt-0.5" />
                <span className="text-gray-300 text-sm">123 Commerce St, Shopping City, SC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="text-gray-300 text-sm">support@modernshop.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} ModernShop. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
              <Link to="/shipping" className="text-gray-400 hover:text-white text-sm">Shipping Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;