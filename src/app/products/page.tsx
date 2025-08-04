"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ProductCard from "@/components/ui/ProductCard";
import PremiumBackground from "@/components/PremiumBackground";
import CoffeeDivider from "@/components/CoffeeDivider";
import StaggeredMenu from "@/components/animations/StaggeredMenu";
import AnimatedCard from "@/components/animations/AnimatedCard";
import GridMorphing from "@/components/animations/GridMorphing";
import { menuData, getMenuCategories, getMenuItemsByCategory, MenuItem } from "@/lib/menuData";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [triggerGridAnimation, setTriggerGridAnimation] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = getMenuCategories();

  const filteredProducts = selectedCategory
    ? getMenuItemsByCategory(selectedCategory)
    : menuData;

  // Animate category filters
  useEffect(() => {
    if (!filtersRef.current) return;

    const buttons = filtersRef.current.querySelectorAll('button');
    gsap.fromTo(buttons, 
      {
        y: 30,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.4)",
      }
    );
  }, []);

  // Animate products grid when category changes
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.product-card-container');
    gsap.fromTo(cards, 
      {
        y: 50,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, [filteredProducts]);

  return (
    <PremiumBackground>
      <div className="min-h-screen py-20">
        {/* Hero Section */}
        <section className="section-warm-beige py-20 px-4 text-center relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h1 className="font-heading text-5xl md:text-6xl text-coffee-dark mb-6">
                Our Artisanal Menu
              </h1>
              <p className="font-body text-xl text-coffee-warm max-w-3xl mx-auto leading-relaxed">
                Discover our carefully curated selection of premium coffees, artisanal treats, and handcrafted beverages
              </p>
            </motion.div>

            {/* Category Filters */}
            <motion.div
              ref={filtersRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setTriggerGridAnimation(true);
                  setTimeout(() => setTriggerGridAnimation(false), 100);
                }}
                className={`font-body px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 luxury-hover ${
                  selectedCategory === null
                    ? "bg-gradient-to-r from-coffee-warm to-coffee-light text-cream shadow-xl"
                    : "glass-morphism text-coffee-dark hover:bg-coffee-warm hover:text-cream"
                }`}
              >
                All Products
              </button>
              
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setTriggerGridAnimation(true);
                    setTimeout(() => setTriggerGridAnimation(false), 100);
                  }}
                  className={`font-body px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 luxury-hover ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-coffee-warm to-coffee-light text-cream shadow-xl"
                      : "glass-morphism text-coffee-dark hover:bg-coffee-warm hover:text-cream"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Coffee Bean Divider */}
        <CoffeeDivider variant="beans" />

        {/* Products Section */}
        <section className="section-cream py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <GridMorphing
              columns={4}
              gap={8}
              morphType="splash"
              triggerAnimation={triggerGridAnimation}
            >
              {filteredProducts.map((product, index) => (
                <AnimatedCard
                  key={product.id}
                  animationType="lift"
                  delay={index * 0.05}
                  className="product-card-container"
                >
                  <ProductCard product={product} />
                </AnimatedCard>
              ))}
            </GridMorphing>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-coffee-warm to-coffee-light rounded-full flex items-center justify-center">
                  <span className="text-6xl">☕</span>
                </div>
                <h3 className="font-heading text-2xl text-coffee-dark mb-4">
                  No products found
                </h3>
                <p className="font-body text-coffee-warm">
                  Try selecting a different category or check back later for new additions.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Steam Divider */}
        <CoffeeDivider variant="steam" />

        {/* Call to Action */}
        <section className="section-dark-brown py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-morphism p-12 rounded-3xl luxury-hover"
            >
              <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center shadow-xl">
                <span className="text-3xl">🎯</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl text-cream mb-6">
                Can't Find What You're Looking For?
              </h2>
              <p className="font-body text-beige-warm text-lg mb-8 leading-relaxed">
                Our baristas are always happy to create custom blends and recommend the perfect coffee for your taste preferences.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-accent to-accent-dark text-coffee-dark px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Our Baristas
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </PremiumBackground>
  );
}
