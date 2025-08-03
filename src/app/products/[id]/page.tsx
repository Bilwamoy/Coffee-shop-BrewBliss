"use client";
"use client";
import { useContext } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { menuData, MenuItem } from '@/lib/menuData';
import { useCart } from '@/contexts/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = menuData.find((item) => item.id === parseInt(id as string));

  if (!product) {
    return <div>Product not found</div>;
  }

  // Placeholder details - you can expand this
  const productDetails = {
    origin: "From the finest coffee beans of South America.",
    components: "100% Arabica beans, purified water, and a touch of magic.",
    story: "This coffee has a rich history, cultivated by generations of farmers dedicated to quality."
  }

  const handleAddToCart = () => {
    const cartItem = {
      product: {
        id: product.id.toString(),
        name: product.name,
        price: 5.99, // Default price, you might want to add price to your menuData
        images: [product.imageUrl],
      },
      customizations: {},
      quantity: 1,
      totalPrice: 5.99, // Default price
    };
    addToCart(cartItem);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Origin</h2>
            <p>{productDetails.origin}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Components</h2>
            <p>{productDetails.components}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
            <p>{productDetails.story}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
