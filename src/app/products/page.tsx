"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { menuData, getMenuCategories, getMenuItemsByCategory, MenuItem } from "@/lib/menuData";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getMenuCategories();

  const filteredProducts = selectedCategory
    ? getMenuItemsByCategory(selectedCategory)
    : menuData;

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl md:text-5xl text-primary-dark text-center mb-12"
        >
          Our Menu
        </motion.h1>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`font-body px-6 py-3 rounded-full text-lg font-medium transition-colors duration-300 ${
              selectedCategory === null
                ? "bg-primary-dark text-secondary-light"
                : "bg-secondary-light text-primary-dark hover:bg-primary-light"
            }`}
          >
            All Products
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`font-body px-6 py-3 rounded-full text-lg font-medium transition-colors duration-300 ${
                selectedCategory === category
                  ? "bg-primary-dark text-secondary-light"
                  : "bg-secondary-light text-primary-dark hover:bg-primary-light"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
