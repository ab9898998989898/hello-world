import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { state: cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else {
      navigate('/checkout');
    }
  };

  const subtotal = Math.abs(cart.totalPrice);
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
      
      {cart.items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <li key={item._id} className="p-6 flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    
                    <div className="sm:ml-6 flex-1 flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <div className="flex justify-between sm:block">
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link to={`/products/${item._id}`} className="hover:text-indigo-600">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="sm:hidden text-lg font-medium text-gray-900">${item.price.toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Item #{item._id.slice(-6)}</p>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 flex items-center justify-between sm:block">
                        <div className="hidden sm:block text-right mb-4">
                          <p className="text-lg font-medium text-gray-900">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              type="button"
                              className="p-2 text-gray-600 hover:text-gray-900"
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="px-2 py-1 text-gray-900">{item.quantity}</span>
                            <button
                              type="button"
                              className="p-2 text-gray-600 hover:text-gray-900"
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            type="button"
                            className="ml-4 text-red-500 hover:text-red-700"
                            onClick={() => removeFromCart(item._id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-gray-200 px-6 py-4 flex justify-between">
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                  onClick={() => clearCart()}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Cart
                </button>
                
                <Link
                  to="/products"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal ({cart.totalItems} items)</p>
                  <p className="text-gray-900 font-medium">${subtotal.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-gray-900 font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax</p>
                  <p className="text-gray-900 font-medium">
                    ${tax.toFixed(2)}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <p className="text-lg font-medium text-gray-900">Total</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Proceed to Checkout
                </button>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">We Accept</h3>
                <div className="flex space-x-2">
                  {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((method) => (
                    <div key={method} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-800">
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our customer service team is available 24/7 to assist you with any questions or concerns.
              </p>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;