'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Shopping Cart</h2>
          <button title='button'
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ maxHeight: 'calc(100vh - 250px)' }}>
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-slate-600 text-lg">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-slate-50 rounded-xl p-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate">{item.name}</h3>
                    <p className="text-sm text-slate-600">{item.catagory}</p>
                    <p className="text-lg font-bold text-violet-600 mt-1">${item.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border-2 border-slate-300 hover:border-violet-600 hover:text-violet-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border-2 border-slate-300 hover:border-violet-600 hover:text-violet-600 transition-colors"
                      >
                        +
                      </button>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="w-full py-2 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear Cart
              </button>
            </>
          )}
        </div>

        {/* Footer - Total & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-slate-200 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg">
              <span className="text-slate-600">Subtotal:</span>
              <span className="font-bold text-slate-900">${getTotalPrice().toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <button
              onClick={onClose}
              className="w-full py-2 text-slate-600 hover:text-slate-900 text-sm font-medium"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
