"use client";

export default function ReviewsSimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-light to-cream p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-dark text-center mb-8">
          Customer Reviews (Simple)
        </h1>
        
        <div className="bg-white/80 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">Sarah Johnson</h2>
          <div className="flex mb-2">
            <span className="text-accent">⭐⭐⭐⭐⭐</span>
          </div>
          <p className="text-primary">
            The Ethiopian single origin is absolutely divine! The floral notes and bright acidity make my mornings so much better.
          </p>
        </div>

        <div className="bg-white/80 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">Mike Chen</h2>
          <div className="flex mb-2">
            <span className="text-accent">⭐⭐⭐⭐⭐</span>
          </div>
          <p className="text-primary">
            I've been working from here for months. The WiFi is fast, the music is perfect, and the coffee keeps me productive.
          </p>
        </div>

        <div className="bg-white/80 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">Emma Rodriguez</h2>
          <div className="flex mb-2">
            <span className="text-accent">⭐⭐⭐⭐</span>
          </div>
          <p className="text-primary">
            Their croissants are flaky perfection! I tried the almond croissant and it was heavenly.
          </p>
        </div>
      </div>
    </div>
  );
}