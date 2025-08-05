"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Star, Heart, Coffee, MessageCircle } from "lucide-react";

const ReviewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "👩‍💼",
      rating: 5,
      category: "coffee",
      date: "2 days ago",
      title: "Perfect Morning Blend!",
      content: "The Ethiopian single origin is absolutely divine! The floral notes and bright acidity make my mornings so much better. The baristas here really know their craft.",
      likes: 24,
      helpful: 18
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "👨‍💻",
      rating: 5,
      category: "atmosphere",
      date: "1 week ago",
      title: "Great Work Environment",
      content: "I've been working from here for months. The WiFi is fast, the music is perfect, and the coffee keeps me productive. Plus, the staff is incredibly friendly!",
      likes: 31,
      helpful: 22
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "👩‍🎨",
      rating: 4,
      category: "food",
      date: "3 days ago",
      title: "Delicious Pastries",
      content: "Their croissants are flaky perfection! I tried the almond croissant and it was heavenly. The avocado toast is also fresh and well-seasoned.",
      likes: 19,
      helpful: 15
    },
    {
      id: 4,
      name: "David Park",
      avatar: "👨‍🍳",
      rating: 5,
      category: "service",
      date: "5 days ago",
      title: "Outstanding Service",
      content: "The team here goes above and beyond. They remembered my usual order after just a few visits and always greet me with a smile. Exceptional customer service!",
      likes: 42,
      helpful: 35
    },
    {
      id: 5,
      name: "Lisa Thompson",
      avatar: "👩‍🏫",
      rating: 5,
      category: "coffee",
      date: "1 week ago",
      title: "Coffee Perfection",
      content: "As a coffee enthusiast, I'm very picky about my brew. This place exceeds expectations every time. The pour-over technique is flawless and the beans are always fresh.",
      likes: 28,
      helpful: 21
    },
    {
      id: 6,
      name: "Alex Kumar",
      avatar: "👨‍🎓",
      rating: 4,
      category: "atmosphere",
      date: "4 days ago",
      title: "Perfect Study Spot",
      content: "Great place for studying! Quiet corners, comfortable seating, and the ambient lighting is just right. The background music helps me focus without being distracting.",
      likes: 16,
      helpful: 12
    }
  ];

  const categories = [
    { id: "all", name: "All Reviews", icon: "📝" },
    { id: "coffee", name: "Coffee Quality", icon: "☕" },
    { id: "atmosphere", name: "Atmosphere", icon: "🏠" },
    { id: "service", name: "Service", icon: "👥" },
    { id: "food", name: "Food", icon: "🥐" }
  ];

  const filteredReviews = selectedCategory === "all" 
    ? reviews 
    : reviews.filter(review => review.category === selectedCategory);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-light to-cream text-black">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/10"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="text-6xl mb-6">📖</div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary-dark mb-6">
            Customer Reviews
          </h1>
          <p className="font-body text-xl text-primary mb-8 max-w-2xl mx-auto">
            Discover what our coffee community has to say about their Brew & Bliss experience
          </p>
          
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto shadow-lg"
          >
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-primary-dark mr-3">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= averageRating ? "text-accent fill-accent" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="font-body text-primary">
              Based on {totalReviews} reviews
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`font-body px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-accent text-primary-dark shadow-lg"
                    : "bg-white/70 text-primary hover:bg-white/90"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-8 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Review Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{review.avatar}</span>
                    <div>
                      <h3 className="font-heading font-semibold text-primary-dark">
                        {review.name}
                      </h3>
                      <p className="font-body text-sm text-primary">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating ? "text-accent fill-accent" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Content */}
                <h4 className="font-heading font-semibold text-primary-dark mb-3">
                  {review.title}
                </h4>
                <p className="font-body text-primary mb-4 leading-relaxed">
                  {review.content}
                </p>

                {/* Review Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-primary-light/20">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-primary hover:text-accent transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="font-body text-sm">{review.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-primary hover:text-accent transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-body text-sm">Helpful ({review.helpful})</span>
                    </button>
                  </div>
                  <span className="font-body text-xs text-primary bg-primary-light/20 px-3 py-1 rounded-full">
                    {categories.find(cat => cat.id === review.category)?.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-primary-dark/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-dark mb-6">
            Share Your Experience
          </h2>
          <p className="font-body text-xl text-primary mb-8">
            We'd love to hear about your visit to Brew & Bliss!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-body bg-gradient-to-r from-accent to-accent-dark text-primary-dark px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            Leave a Review
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default ReviewsPage;