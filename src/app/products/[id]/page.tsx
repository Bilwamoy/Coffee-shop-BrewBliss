"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  availability: boolean;
  customizations: any[];
}

interface CustomizationOption {
  id: string;
  name: string;
  price: number;
  type: string;
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, CustomizationOption>>({});
  const [quantity, setQuantity] = useState(1);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, "products", params.id));
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() } as Product);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  // Calculate total price based on customizations
  const calculateTotalPrice = () => {
    if (!product) return 0;
    
    let total = product.price;
    Object.values(selectedCustomizations).forEach(option => {
      total += option.price;
    });
    
    return total * quantity;
  };

  // Handle customization selection
  const handleCustomizationSelect = (type: string, option: CustomizationOption) => {
    setSelectedCustomizations(prev => ({
      ...prev,
      [type]: option
    }));
  };

  // Handle add to cart
  const handleAddToCart = () => {
    // In a real implementation, this would interact with a cart context
    console.log("Adding to cart:", {
      product,
      customizations: selectedCustomizations,
      quantity,
      totalPrice: calculateTotalPrice()
    });
    
    // Show a confirmation animation
    alert(`Added ${quantity} ${product?.name} to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2 bg-secondary-light rounded-lg h-96"></div>
            <div className="md:w-1/2 space-y-6">
              <div className="h-8 bg-secondary-light rounded w-3/4"></div>
              <div className="h-4 bg-secondary-light rounded w-full"></div>
              <div className="h-4 bg-secondary-light rounded w-full"></div>
              <div className="h-4 bg-secondary-light rounded w-2/3"></div>
              <div className="h-12 bg-secondary-light rounded w-1/2 mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-heading text-3xl text-primary-dark">Product Not Found</h1>
          <p className="font-body text-primary-dark/80 mt-4">
            The product you're looking for doesn't exist or is no longer available.
          </p>
          {category ? (
            <a 
              href={`/products?category=${category}`} 
              className="font-body inline-block mt-8 bg-primary-dark text-secondary-light px-6 py-3 rounded-lg hover:bg-accent transition-colors duration-300"
            >
              Back to {category}
            </a>
          ) : (
            <a 
              href="/products" 
              className="font-body inline-block mt-8 bg-primary-dark text-secondary-light px-6 py-3 rounded-lg hover:bg-accent transition-colors duration-300"
            >
              Back to Menu
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-12"
        >
          {/* Product Images */}
          <div className="md:w-1/2">
            {product.images && product.images.length > 0 ? (
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-lg w-full h-96 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
            
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 mt-4 overflow-x-auto">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            <motion.h1
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-heading text-4xl text-primary-dark mb-4"
            >
              {product.name}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-body text-primary-dark/80 text-lg mb-6"
            >
              {product.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <span className="font-body text-2xl font-bold text-primary-dark">
                ${product.price.toFixed(2)}
              </span>
            </motion.div>
            
            {/* Customization Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-8 mb-12"
            >
              {product.customizations && product.customizations.map((customization) => (
                <div key={customization.type}>
                  <h3 className="font-heading text-xl text-primary-dark mb-4">
                    {customization.type}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3">
                    {customization.options.map((option: CustomizationOption) => (
                      <button
                        key={option.id}
                        onClick={() => handleCustomizationSelect(customization.type, option)}
                        className={`font-body px-4 py-2 rounded-lg border-2 transition-colors duration-300 ${
                          selectedCustomizations[customization.type]?.id === option.id
                            ? "bg-primary-dark text-secondary-light border-primary-dark"
                            : "bg-secondary-light text-primary-dark border-secondary-dark hover:border-accent"
                        }`}
                      >
                        {option.name} 
                        {option.price > 0 && (
                          <span> +${option.price.toFixed(2)}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
            
            {/* Quantity Selector */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center mb-8"
            >
              <span className="font-body text-lg text-primary-dark mr-4">Quantity:</span>
              <div className="flex items-center border-2 border-secondary-dark rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="font-body px-4 py-2 text-primary-dark hover:bg-secondary-light"
                >
                  -
                </button>
                <span className="font-body px-4 py-2 text-primary-dark">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="font-body px-4 py-2 text-primary-dark hover:bg-secondary-light"
                >
                  +
                </button>
              </div>
            </motion.div>
            
            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="font-body w-full bg-accent text-primary-dark px-6 py-4 rounded-lg text-xl font-bold hover:bg-secondary-dark transition-colors duration-300"
            >
              Add to Cart - ${calculateTotalPrice().toFixed(2)}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
