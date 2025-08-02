"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      className="bg-secondary-light rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
    >
      <div className="relative h-48 w-full">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-t-lg w-full h-full flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heading text-xl font-semibold text-primary-dark mb-2">
          {product.name}
        </h3>
        <p className="font-body text-primary-dark/80 mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="font-body text-lg font-bold text-primary-dark">
            ${product.price.toFixed(2)}
          </span>
          
          <Link 
            href={`/products/${product.id}`}
            className="font-body bg-primary-dark text-secondary-light px-4 py-2 rounded-lg hover:bg-accent transition-colors duration-300"
          >
            Customize
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
