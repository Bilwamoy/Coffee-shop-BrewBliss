"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "@/lib/menuData";

const ProductCard = ({ product }: { product: MenuItem }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      className="bg-secondary-light rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
    >
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-t-lg"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heading text-xl font-semibold text-primary-dark mb-2">
          {product.name}
        </h3>
        <p className="font-body text-primary-dark/80 mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <Link 
            href={`/products/${product.id}`}
            className="font-body bg-primary-dark text-secondary-light px-4 py-2 rounded-lg hover:bg-accent transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
