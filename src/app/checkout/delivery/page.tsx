"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

const DeliveryPage = () => {
  const [status, setStatus] = useState(0);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const statuses = [
    "Order Confirmed",
    "Preparing Your Order",
    "Out for Delivery",
    "Delivered",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prevStatus) => {
        if (prevStatus < statuses.length - 1) {
          return prevStatus + 1;
        }
        clearInterval(interval);
        return prevStatus;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Delivery Status</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">Order ID: {orderId}</p>
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <motion.div
              style={{ width: `${(status / (statuses.length - 1)) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${(status / (statuses.length - 1)) * 100}%` }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>
        </div>
        <div className="flex justify-between">
          {statuses.map((s, i) => (
            <div key={i} className={`text-center ${i <= status ? 'text-blue-500' : 'text-gray-400'}`}>
              <p className="font-semibold">{s}</p>
            </div>
          ))}
        </div>

        {status === statuses.length - 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Enjoy!</h2>
            <p className="text-lg text-gray-700">Your order has been delivered. We hope you enjoy your delicious coffee!</p>
            <p className="text-lg text-gray-700 mt-4">Thank you for choosing Brew & Bliss. We can't wait to serve you again!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DeliveryPage;
