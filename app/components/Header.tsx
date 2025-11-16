'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';

const Header = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <div>
       <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">ModernShop</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-slate-700 hover:text-violet-600 transition-colors font-medium">Shop</a>
              <a href="#" className="text-slate-700 hover:text-violet-600 transition-colors font-medium">About</a>
              <a href="#" className="text-slate-700 hover:text-violet-600 transition-colors font-medium">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              <button title='th' className="text-slate-700 hover:text-violet-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-slate-700 hover:text-violet-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

export default Header