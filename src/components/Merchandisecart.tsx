"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

// --- TYPE DEFINITIONS ---
// Defines the structure for a single product item.
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Defines the structure for an item within the shopping cart.
// This matches the CartContext structure.
interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
  customizations: Record<string, any>;
  quantity: number;
  totalPrice: number;
}

// --- PRODUCT DATA ---
// An array of all available merchandise items with real images.
const merchandiseItems: Product[] = [
  {
    id: 1,
    name: 'Branded Coffee Mugs',
    description: 'Start your day with a sturdy ceramic mug featuring our classic logo.',
    price: 1200, // Price in INR
    imageUrl: '/merchandise-images/Branded Coffee Mugs.png',
  },
  {
    id: 2,
    name: 'Reusable Tumblers',
    description: 'Eco-friendly and stylish, perfect for your coffee on the go.',
    price: 1800,
    imageUrl: '/merchandise-images/Reusable Tumblers.png',
  },
  {
    id: 3,
    name: 'Brew & Bliss T-shirts',
    description: 'Soft, 100% cotton t-shirts. Show off your love for great coffee.',
    price: 1500,
    imageUrl: '/merchandise-images/Brew & Bliss T-shirts.png',
  },
  {
    id: 4,
    name: 'Signature Roast Coffee Beans',
    description: 'A 250g bag of our signature medium roast with notes of chocolate and citrus.',
    price: 850,
    imageUrl: '/merchandise-images/Signature Roast Coffee Beans.png',
  },
  {
    id: 5,
    name: 'Pour-Over Coffee Maker',
    description: 'Brew the perfect cup at home with this elegant glass pour-over set.',
    price: 2500,
    imageUrl: '/merchandise-images/Pour-Over Coffee Maker.png',
  },
  {
    id: 6,
    name: 'Brew & Bliss Gift Cards',
    description: 'The perfect gift for any coffee lover. Available in various amounts.',
    price: 1000,
    imageUrl: '/merchandise-images/Brew & Bliss Gift Cards.png',
  },
];

// --- REUSABLE COMPONENTS ---

// ProductCard Component: Displays a single merchandise item.
const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group">
    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 font-playfair">{product.name}</h3>
      <p className="text-gray-600 mt-2 font-roboto h-12">{product.description}</p>
      <div className="flex justify-between items-center mt-6">
        <p className="text-2xl font-bold text-brown-700 font-playfair">₹{product.price.toLocaleString('en-IN')}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-brown-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-brown-700 transition-colors duration-300"
        >
          <ShoppingCart size={20} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  </div>
);

// --- MAIN MERCHANDISE PAGE COMPONENT ---
const MerchandisePage: React.FC = () => {
  const { items: cart, addToCart, updateQuantity, totalItems, totalAmount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  // Effect to load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Function to add a product to the cart or update its quantity.
  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      product: {
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        images: [product.imageUrl],
      },
      customizations: {},
      quantity: 1,
      totalPrice: product.price,
    };
    addToCart(cartItem);
    setIsCartOpen(true); // Open cart when an item is added
  };

  // Function to update the quantity of a cart item.
  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  // Calculate the subtotal price of all items in the cart.
  const subtotal = totalAmount;

  return (
    <div className="bg-cream-100 min-h-screen font-roboto text-gray-700" 
     style={{ '--font-playfair': "'Playfair Display', serif", '--font-roboto': "'Roboto', sans-serif" } as React.CSSProperties}>
      <style>{`
        .font-playfair { font-family: var(--font-playfair); }
        .font-roboto { font-family: var(--font-roboto); }
        .bg-cream-100 { background-color: #fdfbfb; }
        .bg-brown-600 { background-color: #6c584c; }
        .bg-brown-700 { background-color: #4a2c2a; }
        .text-brown-700 { color: #4a2c2a; }
        .border-brown-200 { border-color: #e2e2e2; }
        .ring-brown-600 { --tw-ring-color: #6c584c; }
      `}</style>
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-brown-700 font-playfair">Brew & Bliss Merchandise</h1>
          <button onClick={() => setIsCartOpen(true)} className="relative">
            <ShoppingCart size={28} className="text-brown-700" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brown-700 font-playfair">Take a Piece of Brew & Bliss Home</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Our exclusive collection features high-quality items designed to enhance your coffee experience and show off your love for our brand.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {merchandiseItems.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </main>

      {/* Shopping Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-30 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex justify-between items-center p-6 border-b border-brown-200">
            <h2 className="text-2xl font-bold text-brown-700 font-playfair">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow p-6 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <ShoppingCart size={48} className="mx-auto" />
                <p className="mt-4">Your cart is empty.</p>
              </div>
            ) : (
              <ul className="space-y-6">
                {cart.map(item => (
                  <li key={item.product.id} className="flex items-center space-x-4">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 rounded-md object-cover" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">₹{item.product.price.toLocaleString('en-IN')}</p>
                      <div className="flex items-center mt-2">
                        <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)} className="p-1 border rounded-full hover:bg-gray-100">
                          <Minus size={16} />
                        </button>
                        <span className="px-3 font-medium">{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)} className="p-1 border rounded-full hover:bg-gray-100">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => handleUpdateQuantity(item.product.id, 0)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={20} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-brown-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Subtotal</span>
                <span className="text-xl font-bold text-brown-700 font-playfair">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <button 
                onClick={() => router.push('/checkout')}
                className="w-full bg-brown-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-brown-700 transition-colors duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay for when cart is open */}
      {isCartOpen && (
        <div onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black bg-opacity-40 z-20 transition-opacity duration-300"></div>
      )}
    </div>
  );
};

export default MerchandisePage;
