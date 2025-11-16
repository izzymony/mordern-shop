'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import productData from '@/data/products.json';
import Image from 'next/image';
import Loader from './components/Loader';
import CartProvider from './context/CartContext';
import { useCart } from './context/CartContext';


const categories = [
  { name: 'Accessories', images: '/istockphoto-1328049157-2048x2048shirts.jpg', gradient: '' },
  { name: 'Bags', images: '/pexels-sanddollar-205436-634538.jpg', gradient: '' },
  { name: 'Tech', images: '/pexels-luis-gomes-166706-546819.jpg', gradient: '' },
  { name: 'Fashion', images: '/istockphoto-1328049157-2048x2048shirts.jpg', gradient: '' },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState(productData);
  const[loading, setLoading] = useState(false);
  const [couunt, setCount] = useState(0);

  const {addToCart} = useCart();

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);


    useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/product');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
    }, []);



  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
     <Header/>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold">New Collection 2025</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
                Elevate Your
                <span className="block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Style</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Discover premium quality products that blend timeless design with modern functionality. Free shipping on all orders over $100.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Shop Now
                </button>
                <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-xl font-semibold hover:border-violet-600 hover:text-violet-600 transition-all duration-300">
                  View Lookbook
                </button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-slate-900">10k+</div>
                  <div className="text-sm text-slate-600">Happy Customers</div>
                </div>
                <div className="w-px h-12 bg-slate-300"></div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">500+</div>
                  <div className="text-sm text-slate-600">Products</div>
                </div>
                <div className="w-px h-12 bg-slate-300"></div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">4.9★</div>
                  <div className="text-sm text-slate-600">Average Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] bg-gradient-to-br from-violet-200 via-purple-200 to-indigo-200 flex items-center justify-center">
                  <Image src={'/pexels-thatguycraig000-1682699.jpg'} alt='fhg' width={300} height={300}
                  className="object-cover w-full h-full"/>
                </div>
              </div>
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-violet-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-slate-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Shop by Category</h2>
            <p className="text-slate-600 text-lg">Explore our curated collections</p>
          </div>
          <div className="grid grid-cols-2 h-full w-full md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={` rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  activeCategory === category.name ? 'ring-4 ring-violet-600' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                <div className="">
                 
                  <Image
                  src={category.images}
                  alt={category.name}
                  width={550}
                  height={550}
                  />
                  <div className="text-black font-semibold text-lg">{category.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === 'All'
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat.name
                    ? 'bg-violet-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Products</h2>
            <p className="text-slate-600 text-lg">Handpicked items just for you</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={` aspect-square flex items-center justify-center relative overflow-hidden`}>
                  <Image 
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-slate-700">{product.category}</span>
                  </div>
                  <button title='image' className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-rose-500 hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-slate-900">${product.price}</span>
                    <button onClick={() => addToCart({ ...product, quantity: 1, review: 0, ratings: 0 })} className="px-6 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                  <div className="mt-4 flex gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Limited Time Offer</h2>
              <p className="text-xl text-violet-100">Get 25% off on your first order. Use code: <span className="font-bold bg-white/20 px-3 py-1 rounded">WELCOME25</span></p>
              <button className="px-8 py-4 bg-white text-violet-600 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                Shop the Sale
              </button>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white">
                  <div className="text-4xl mb-2">🚚</div>
                  <div className="font-semibold">Free Shipping</div>
                  <div className="text-sm text-violet-200">On orders $100+</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white mt-8">
                  <div className="text-4xl mb-2">🔄</div>
                  <div className="font-semibold">Easy Returns</div>
                  <div className="text-sm text-violet-200">30-day policy</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white -mt-8">
                  <div className="text-4xl mb-2">🔒</div>
                  <div className="font-semibold">Secure Payment</div>
                  <div className="text-sm text-violet-200">SSL Protected</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white">
                  <div className="text-4xl mb-2">💎</div>
                  <div className="font-semibold">Premium Quality</div>
                  <div className="text-sm text-violet-200">Guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Stay in the Loop</h2>
          <p className="text-slate-600 text-lg mb-8">Subscribe to our newsletter for exclusive deals and style tips</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); setEmail(''); }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-violet-600 focus:outline-none transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
                <span className="text-xl font-bold text-white">ModernShop</span>
              </div>
              <p className="text-sm">Premium fashion and lifestyle products for the modern you.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-violet-400 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-violet-600 transition-colors">
                  <span className="text-lg">📱</span>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-violet-600 transition-colors">
                  <span className="text-lg">🐦</span>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-violet-600 transition-colors">
                  <span className="text-lg">📷</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; 2025 ModernShop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
