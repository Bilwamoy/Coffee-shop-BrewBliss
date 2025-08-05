"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function TestStarsPage() {
  const [rating, setRating] = useState(0);

  const handleRatingClick = (newRating: number) => {
    console.log('Star clicked:', newRating);
    setRating(newRating);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-light to-cream p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-heading text-4xl font-bold text-primary-dark mb-8">
          Star Rating Test
        </h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <p className="font-body text-primary mb-6">
            Current Rating: {rating} star{rating !== 1 ? 's' : ''}
          </p>
          
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRatingClick(star)}
                className="focus:outline-none cursor-pointer p-2 rounded-full hover:bg-accent/10 transition-colors"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                <Star
                  className={`w-10 h-10 transition-all duration-200 ${
                    star <= rating
                      ? "text-accent fill-accent drop-shadow-lg"
                      : "text-gray-400 hover:text-accent hover:fill-accent/50 hover:scale-110"
                  }`}
                />
              </motion.button>
            ))}
          </div>
          
          <button
            onClick={() => setRating(0)}
            className="font-body bg-primary-dark text-cream px-4 py-2 rounded-lg hover:bg-accent hover:text-primary-dark transition-colors"
          >
            Reset Rating
          </button>
          
          <div className="mt-6 p-4 bg-primary-light/10 rounded-lg">
            <p className="font-body text-primary text-sm">
              Debug Info: Rating state = {rating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}