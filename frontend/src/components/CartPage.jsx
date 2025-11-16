// components/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem('amourFloralsCart') || '[]');
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem('amourFloralsCart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('amourFloralsCart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SPRING10') {
      setDiscount(0.1); // 10% discount
      alert('Promo code applied! 10% discount added.');
    } else if (promoCode.toUpperCase() === 'WELCOME15') {
      setDiscount(0.15); // 15% discount
      alert('Promo code applied! 15% discount added.');
    } else {
      alert('Invalid promo code. Please try again.');
    }
    setPromoCode('');
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  const saveForLater = () => {
    alert('Items saved for later!');
    // Implement save for later functionality
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/products" 
              className="text-rose-600 hover:text-rose-700 transition duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
            <Link to="/" className="text-2xl font-light text-gray-800">
              Amour Florals
            </Link>
            <div className="w-20"></div> {/* Spacer for balance */}
          </div>
        </div>
      </nav>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-light text-gray-800 mb-8 text-center">Your Beautiful Selections</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
              <Link 
                to="/products" 
                className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full font-medium transition duration-300"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="bg-gray-100 rounded-lg h-32 w-32 flex items-center justify-center">
                        <span className="text-gray-400">Image</span>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-gray-800 mb-2">{item.product}</h3>
                        <p className="text-gray-600 mb-2">A stunning arrangement of deep red roses.</p>
                        <p className="text-lg font-medium text-rose-600">${item.price.toFixed(2)}</p>
                        
                        {/* Selected Options */}
                        <div className="mt-2 text-sm text-gray-500">
                          <p>Size: {item.size.charAt(0).toUpperCase() + item.size.slice(1)}</p>
                          <p>Vase: {item.vase.charAt(0).toUpperCase() + item.vase.slice(1)}</p>
                          {item.personalNote && (
                            <p>Note: {item.personalNote}</p>
                          )}
                        </div>
                      </div>

                      {/* Quantity and Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <button 
                          onClick={() => removeItem(index)}
                          className="text-gray-400 hover:text-rose-600 transition duration-300 p-2"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                          >
                            -
                          </button>
                          <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                  <h3 className="text-xl font-medium text-gray-800 mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-800">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-800">Calculated at next step</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-3">PROMO CODE</h4>
                    <div className="flex">
                      <input 
                        type="text" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      />
                      <button 
                        onClick={applyPromoCode}
                        className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-r-lg transition duration-300"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-medium text-gray-800 mb-6 border-t border-gray-200 pt-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-lg font-medium text-lg transition duration-300 mb-4">
                    Proceed to Checkout
                  </button>

                  <button 
                    onClick={saveForLater}
                    className="w-full bg-white border border-rose-600 text-rose-600 hover:bg-rose-50 py-4 rounded-lg font-medium text-lg transition duration-300"
                  >
                    Save for Later
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-light mb-4">Amour Florals</h3>
              <p className="text-gray-300">
                Where flowers become art. Creating timeless arrangements for every special moment.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Explore</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/products" className="hover:text-white transition">Shop All</Link></li>
                <li><Link to="/collections" className="hover:text-white transition">Collections</Link></li>
                <li><Link to="/about" className="hover:text-white transition">Our Story</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link to="/faqs" className="hover:text-white transition">FAQs</Link></li>
                <li><Link to="/shipping" className="hover:text-white transition">Shipping Info</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Amour Florals. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;