"use client";
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ReceiptPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">Your order has been placed successfully.</p>
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Order Receipt</h2>
          <p className="text-lg">Order ID: {orderId}</p>
          {/* You can add more details here from your cart context if needed */}
        </div>
        <Link href={`/checkout/delivery?orderId=${orderId}`} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center block">
          Track Your Delivery
        </Link>
      </motion.div>
    </div>
  );
};

export default ReceiptPage;
