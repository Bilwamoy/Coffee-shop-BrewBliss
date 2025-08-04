"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import Image from 'next/image';

// Icons
const CreditCardIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const ShieldCheckIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const TruckIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LockIcon = ({ className = "" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Delivery Info
  deliveryType: 'delivery' | 'pickup';
  address: string;
  city: string;
  zipCode: string;
  deliveryInstructions: string;
  
  // Payment Info
  paymentMethod: 'card' | 'paypal' | 'apple' | 'google';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  
  // Preferences
  saveInfo: boolean;
  newsletter: boolean;
}

const EnhancedCheckout = () => {
  const { items, totalAmount, clearCart } = useCart();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    deliveryType: 'delivery',
    address: '',
    city: '',
    zipCode: '',
    deliveryInstructions: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    saveInfo: false,
    newsletter: false,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // 3D Card Animation
  useEffect(() => {
    if (cardRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(card, {
          duration: 0.3,
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
          duration: 0.5,
          rotationX: 0,
          rotationY: 0,
          ease: "power2.out",
        });
      };

      const card = cardRef.current;
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [currentStep]);

  const steps = [
    { id: 1, title: 'Order Review', icon: '📋' },
    { id: 2, title: 'Delivery Info', icon: '🚚' },
    { id: 3, title: 'Payment', icon: '💳' },
    { id: 4, title: 'Confirmation', icon: '✅' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    switch (step) {
      case 2:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (formData.deliveryType === 'delivery') {
          if (!formData.address.trim()) newErrors.address = 'Address is required';
          if (!formData.city.trim()) newErrors.city = 'City is required';
          if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        }
        break;
      case 3:
        if (formData.paymentMethod === 'card') {
          if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
          if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
          if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
          if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const processPayment = async () => {
    if (!validateStep(3)) return;

    setIsProcessing(true);
    const stages = [
      'Validating payment information...',
      'Processing payment...',
      'Confirming order...',
      'Preparing your coffee...',
      'Order confirmed!'
    ];

    for (let i = 0; i < stages.length; i++) {
      setProcessingStage(stages[i]);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    clearCart();
    router.push(`/checkout/delivery?orderId=${orderId}&total=${totalAmount.toFixed(2)}`);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'visa';
    if (/^5[1-5]/.test(num)) return 'mastercard';
    if (/^3[47]/.test(num)) return 'amex';
    return 'generic';
  };

  const deliveryFee = formData.deliveryType === 'delivery' ? 3.99 : 0;
  const tax = totalAmount * 0.08;
  const finalTotal = totalAmount + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-dark via-coffee-medium to-coffee-warm py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-center items-center space-x-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`flex flex-col items-center ${
                  currentStep >= step.id ? 'text-accent' : 'text-cream/50'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 ${
                    currentStep >= step.id
                      ? 'bg-accent text-coffee-dark shadow-lg'
                      : 'bg-coffee-medium text-cream/50'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  animate={currentStep === step.id ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {step.icon}
                </motion.div>
                <span className="font-body text-sm font-medium">{step.title}</span>
                {index < steps.length - 1 && (
                  <motion.div
                    className={`absolute top-8 left-20 w-16 h-0.5 ${
                      currentStep > step.id ? 'bg-accent' : 'bg-cream/20'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: currentStep > step.id ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              className="glass-morphism rounded-2xl p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Order Review */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="font-heading text-3xl text-cream mb-6">Review Your Order</h2>
                    <div className="space-y-4">
                      {items.map((item, index) => (
                        <motion.div
                          key={item.product.id}
                          className="flex items-center space-x-4 p-4 bg-coffee-medium/30 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={item.product.images?.[0] || '/images/placeholder-coffee.svg'}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-heading text-lg text-cream">{item.product.name}</h3>
                            <p className="text-cream/70">Qty: {item.quantity}</p>
                            {Object.entries(item.customizations).map(([type, option]) => (
                              <p key={type} className="text-cream/60 text-sm">
                                {type}: {option.name}
                              </p>
                            ))}
                          </div>
                          <div className="text-right">
                            <p className="font-heading text-lg text-accent">${item.totalPrice.toFixed(2)}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-8 flex justify-end">
                      <motion.button
                        onClick={nextStep}
                        className="bg-accent text-coffee-dark px-8 py-3 rounded-lg font-bold hover:bg-accent-dark transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Continue to Delivery
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Delivery Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="font-heading text-3xl text-cream mb-6">Delivery Information</h2>
                    
                    {/* Delivery Type */}
                    <div className="mb-6">
                      <div className="grid grid-cols-2 gap-4">
                        <motion.label
                          className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                            formData.deliveryType === 'delivery'
                              ? 'border-accent bg-accent/10'
                              : 'border-cream/20 hover:border-cream/40'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            name="deliveryType"
                            value="delivery"
                            checked={formData.deliveryType === 'delivery'}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <TruckIcon className="w-8 h-8 mx-auto mb-2 text-accent" />
                            <p className="font-heading text-cream">Delivery</p>
                            <p className="text-cream/70 text-sm">$3.99 fee</p>
                          </div>
                        </motion.label>
                        
                        <motion.label
                          className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                            formData.deliveryType === 'pickup'
                              ? 'border-accent bg-accent/10'
                              : 'border-cream/20 hover:border-cream/40'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            name="deliveryType"
                            value="pickup"
                            checked={formData.deliveryType === 'pickup'}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <div className="w-8 h-8 mx-auto mb-2 text-accent text-2xl">🏪</div>
                            <p className="font-heading text-cream">Pickup</p>
                            <p className="text-cream/70 text-sm">Free</p>
                          </div>
                        </motion.label>
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-cream mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full p-3 bg-coffee-medium/50 border rounded-lg text-cream placeholder-cream/50 focus:border-accent focus:outline-none ${
                            errors.firstName ? 'border-red-500' : 'border-cream/20'
                          }`}
                          placeholder="Bilwamoy"
                        />
                        {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-cream mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full p-3 bg-coffee-medium/50 border rounded-lg text-cream placeholder-cream/50 focus:border-accent focus:outline-none ${
                            errors.lastName ? 'border-red-500' : 'border-cream/20'
                          }`}
                          placeholder="Sarkar"
                        />
                        {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-cream mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full p-3 bg-coffee-medium/50 border rounded-lg text-cream placeholder-cream/50 focus:border-accent focus:outline-none ${
                            errors.email ? 'border-red-500' : 'border-cream/20'
                          }`}
                          placeholder="bilwamoy@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-cream mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full p-3 bg-coffee-medium/50 border rounded-lg text-cream placeholder-cream/50 focus:border-accent focus:outline-none ${
                            errors.phone ? 'border-red-500' : 'border-cream/20'
                          }`}
                          placeholder="(555) 123-4567"
                        />
                        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Address (only for delivery) */}
                    {formData.deliveryType === 'delivery' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 mb-6"
                      >
                        <div>
                          <label className="block text-cream mb-2">Address *</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`w-full p-3 bg-coffee-medium/50 border rounded-lg text-cream placeholder-cream/50 focus:border-accent focus:outline-none ${
                              errors.address ? 'border-red-500' : 'border-cream/20'
                            }`}
                            placeholder="123 Main Street"
                          />
                          {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-cream mb-2">City *</label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className={`w-full p-3 bg-coffee-medium/50 border rounded-lg text-cream placeholder-cream/50 focus:border-accent focus:outline-none ${
                                errors.city ? 'border-red-500' : 'border-cream/20'
                              }`}
                              placeholder="New York"
                            />
                            {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                          </div>
                          <div>
                            <label className="block text-cream mb-2">ZIP Code *</label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              className={`w-full p-3 bg-coffee-medium/50 border rounded-lg text-cream placeholder-cream/50 focus:border-accent focus:outline-none ${
                                errors.zipCode ? 'border-red-500' : 'border-cream/20'
                              }`}
                              placeholder="10001"
                            />
                            {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
                          </div>
                        </div>
                        <div>
                          <label className="block text-cream mb-2">Delivery Instructions</label>
                          <textarea
                            name="deliveryInstructions"
                            value={formData.deliveryInstructions}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-coffee-medium/50 border border-cream/20 rounded-lg text-cream placeholder-cream/50 focus:border-accent focus:outline-none"
                            placeholder="Leave at door, ring bell, etc."
                            rows={3}
                          />
                        </div>
                      </motion.div>
                    )}

                    <div className="flex justify-between">
                      <motion.button
                        onClick={prevStep}
                        className="bg-coffee-medium text-cream px-6 py-3 rounded-lg font-bold hover:bg-coffee-light transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        onClick={nextStep}
                        className="bg-accent text-coffee-dark px-8 py-3 rounded-lg font-bold hover:bg-accent-dark transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Continue to Payment
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="font-heading text-3xl text-cream mb-6">Payment Information</h2>
                    
                    {/* Payment Methods */}
                    <div className="mb-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { id: 'card', name: 'Credit Card', icon: '💳' },
                          { id: 'paypal', name: 'PayPal', icon: '🅿️' },
                          { id: 'apple', name: 'Apple Pay', icon: '🍎' },
                          { id: 'google', name: 'Google Pay', icon: '🔍' },
                        ].map((method) => (
                          <motion.label
                            key={method.id}
                            className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                              formData.paymentMethod === method.id
                                ? 'border-accent bg-accent/10'
                                : 'border-cream/20 hover:border-cream/40'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={formData.paymentMethod === method.id}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className="text-center">
                              <div className="text-2xl mb-1">{method.icon}</div>
                              <p className="text-cream text-sm">{method.name}</p>
                            </div>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    {/* Credit Card Form */}
                    {formData.paymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-cream mb-2">Card Number *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                            className={`w-full p-3 bg-coffee-medium/50 border rounded-lg text-cream placeholder-cream/50 focus:border-accent focus:outline-none ${
                              errors.cardNumber ? 'border-red-500' : 'border-cream/20'
                            }`}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                          {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-cream mb-2">Cardholder Name *</label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            className={`w-full p-3 bg-coffee-medium/50 border rounded-lg text-cream placeholder-cream/50 focus:border-accent focus:outline-none ${
                              errors.cardName ? 'border-red-500' : 'border-cream/20'
                            }`}
                            placeholder="Bilwamoy Sarkar"
                          />
                          {errors.cardName && <p className="text-red-400 text-sm mt-1">{errors.cardName}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-cream mb-2">Expiry Date *</label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              className={`w-full p-3 bg-coffee-medium/50 border rounded-lg text-cream placeholder-cream/50 focus:border-accent focus:outline-none ${
                                errors.expiryDate ? 'border-red-500' : 'border-cream/20'
                              }`}
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                            {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
                          </div>
                          <div>
                            <label className="block text-cream mb-2">CVV *</label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              className={`w-full p-3 bg-coffee-medium/50 border rounded-lg text-cream placeholder-cream/50 focus:border-accent focus:outline-none ${
                                errors.cvv ? 'border-red-500' : 'border-cream/20'
                              }`}
                              placeholder="123"
                              maxLength={4}
                            />
                            {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Other Payment Methods */}
                    {formData.paymentMethod !== 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-center py-8"
                      >
                        <div className="text-6xl mb-4">
                          {formData.paymentMethod === 'paypal' && '🅿️'}
                          {formData.paymentMethod === 'apple' && '🍎'}
                          {formData.paymentMethod === 'google' && '🔍'}
                        </div>
                        <p className="text-cream/70">
                          You'll be redirected to {formData.paymentMethod === 'paypal' ? 'PayPal' : formData.paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'} to complete your payment.
                        </p>
                      </motion.div>
                    )}

                    {/* Security Notice */}
                    <div className="flex items-center space-x-2 text-cream/70 text-sm mt-6 p-3 bg-coffee-medium/30 rounded-lg">
                      <ShieldCheckIcon className="w-5 h-5 text-accent" />
                      <span>Your payment information is encrypted and secure</span>
                    </div>

                    <div className="flex justify-between mt-8">
                      <motion.button
                        onClick={prevStep}
                        className="bg-coffee-medium text-cream px-6 py-3 rounded-lg font-bold hover:bg-coffee-light transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        onClick={processPayment}
                        disabled={isProcessing}
                        className="bg-accent text-coffee-dark px-8 py-3 rounded-lg font-bold hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                        whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                      >
                        {isProcessing ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Processing Overlay */}
              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-coffee-dark/90 backdrop-blur-sm rounded-2xl flex items-center justify-center z-50"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <motion.p
                        key={processingStage}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-cream text-lg"
                      >
                        {processingStage}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="glass-morphism rounded-2xl p-6 sticky top-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-heading text-2xl text-cream mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div>
                      <p className="text-cream font-medium">{item.product.name}</p>
                      <p className="text-cream/70 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-accent font-bold">${item.totalPrice.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-cream/20 pt-4 space-y-2">
                <div className="flex justify-between text-cream/70">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                {formData.deliveryType === 'delivery' && (
                  <div className="flex justify-between text-cream/70">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-cream/70">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-cream font-bold text-lg pt-2 border-t border-cream/20">
                  <span>Total</span>
                  <span className="text-accent">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* 3D Credit Card Preview */}
              {currentStep === 3 && formData.paymentMethod === 'card' && (
                <motion.div
                  ref={cardRef}
                  className="mt-8 perspective-1000"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative w-full h-48 bg-gradient-to-br from-accent to-accent-dark rounded-xl p-6 text-coffee-dark shadow-2xl transform-gpu">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-8 bg-coffee-dark/20 rounded"></div>
                      <div className="text-right">
                        <p className="text-xs opacity-70">VALID THRU</p>
                        <p className="font-mono">{formData.expiryDate || 'MM/YY'}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="font-mono text-lg tracking-wider">
                        {formData.cardNumber || '•••• •••• •••• ••••'}
                      </p>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="font-medium uppercase">
                        {formData.cardName || 'BILWAMOY SARKAR'}
                      </p>
                      <div className="text-xs opacity-70">
                        {getCardType(formData.cardNumber).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-cream/70 text-sm">
                  <LockIcon className="w-4 h-4 text-accent" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-2 text-cream/70 text-sm">
                  <ShieldCheckIcon className="w-4 h-4 text-accent" />
                  <span>PCI Compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-cream/70 text-sm">
                  <div className="w-4 h-4 text-accent">🔒</div>
                  <span>Money Back Guarantee</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCheckout;