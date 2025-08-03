"use client";
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const { items, totalAmount, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', address: '', card: '' });
  const router = useRouter();

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      const orderId = Math.random().toString(36).substr(2, 9);
      router.push(`/checkout/receipt?orderId=${orderId}`);
      clearCart();
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>
      <div className="max-w-2xl mx-auto">
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-semibold mb-4">Review Your Order</h2>
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{item.product.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className="text-lg font-semibold">${item.totalPrice.toFixed(2)}</p>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold">Total:</p>
              <p className="text-xl font-semibold">${totalAmount.toFixed(2)}</p>
            </div>
            <button onClick={handleNextStep} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
              Next
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-semibold mb-4">Shipping & Payment</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium mb-2">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-lg font-medium mb-2">Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="card" className="block text-lg font-medium mb-2">Credit Card</label>
              <input type="text" id="card" name="card" value={formData.card} onChange={handleInputChange} className="w-full p-2 border rounded" />
            </div>
            <div className="flex justify-between">
              <button onClick={handlePrevStep} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Back
              </button>
              <button onClick={handlePayment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Process Payment
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
