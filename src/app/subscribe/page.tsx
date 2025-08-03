"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SubscribePage() {
  const [paymentStatus, setPaymentStatus] = useState<{ status: string; message: string } | null>(null);

  const handleSubscribe = (plan: string, price: number) => {
    // Simulate payment process
    setPaymentStatus({ status: "processing", message: `Processing your ${plan} subscription for $${price}...` });

    setTimeout(() => {
      // Simulate successful payment
      const isSuccess = Math.random() > 0.1; // 90% success rate

      if (isSuccess) {
        setPaymentStatus({ status: "success", message: `Payment successful for ${plan} subscription! An email has been sent to the admin for approval. You will be notified once your plan is active.` });
        // In a real application, you would send an actual email to the admin here
        // For demonstration, we'll just log it:
        console.log(`Admin Notification: User subscribed to ${plan} plan for $${price}. Awaiting approval.`);
      } else {
        setPaymentStatus({ status: "failed", message: `Payment failed for ${plan} subscription. Please try again or contact support.` });
      }
    }, 2000);
  };

  const plans = [
    {
      name: "Weekly Bliss",
      price: 5.99,
      duration: "per week",
      features: [
        "Access to premium articles",
        "Weekly coffee tips",
        "Exclusive discounts on single-origin beans",
      ],
    },
    {
      name: "Monthly Brew",
      price: 19.99,
      duration: "per month",
      features: [
        "All Weekly Bliss features",
        "Early access to new blends",
        "Monthly virtual tasting sessions",
        "Priority customer support",
      ],
    },
    {
      name: "Yearly Indulgence",
      price: 199.99,
      duration: "per year",
      features: [
        "All Monthly Brew features",
        "Personalized coffee recommendations",
        "Annual limited edition merchandise",
        "Invitation to exclusive events",
        "Dedicated account manager",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl md:text-5xl text-primary-dark mb-8"
        >
          Choose Your Blissful Subscription
        </motion.h1>

        <p className="font-body text-primary-dark/80 mb-12 max-w-3xl mx-auto">
          Unlock exclusive benefits, premium content, and a deeper connection to the world of coffee with our flexible subscription plans. Select the one that best suits your coffee journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-secondary-light rounded-lg shadow-lg p-8 flex flex-col justify-between border-t-4 border-accent"
            >
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary-dark mb-4">
                  {plan.name}
                </h2>
                <p className="font-body text-primary-dark/80 text-5xl font-extrabold mb-6">
                  ${plan.price}
                  <span className="text-lg font-medium">/{plan.duration}</span>
                </p>
                <ul className="font-body text-primary-dark/80 text-left space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSubscribe(plan.name, plan.price)}
                className="font-body bg-primary-dark text-secondary-light px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent transition-colors duration-300"
                disabled={!!(paymentStatus && paymentStatus.status === "processing")}
              >
                {paymentStatus && paymentStatus.status === "processing" && paymentStatus.message && paymentStatus.message.includes(plan.name) ? "Processing..." : "Get Started"}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {paymentStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-12 p-6 rounded-lg shadow-lg max-w-md mx-auto ${
              paymentStatus.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            <p className="font-body text-lg font-semibold">{paymentStatus.message}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
