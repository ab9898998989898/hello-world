import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductProps {
  _id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
}

const ProductCard: React.FC<ProductProps> = ({ _id, name, price, image, rating, description }) => {
  const { addToCart, state } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the add to cart button
    addToCart({
      _id,
      name,
      price,
      image,
      quantity: 1
    });
  };

  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/products/${_id}`);
  };

  // Calculate quantity of this item in cart
  const itemInCart = state.items.find(item => item._id === _id);
  const quantity = itemInCart?.quantity || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <a href="#" onClick={handleProductClick}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-64 object-cover"
          />
        </a>
        <button 
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-4">
        <a href="#" onClick={handleProductClick} className="block">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 truncate">{name}</h3>
        </a>
        
        <div className="mt-1 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors relative"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
            {quantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {quantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;