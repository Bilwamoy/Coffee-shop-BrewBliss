"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

// --- ICONS ---
interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

const ChevronLeft: React.FC<IconProps> = ({ size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ChevronRight: React.FC<IconProps> = ({ size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m9 18 6-6-6-6" />
    </svg>
);

const Sparkles: React.FC<IconProps> = ({ size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9.93 13.5A2.25 2.25 0 0 0 7.5 12a2.25 2.25 0 0 0-2.43 1.5M12 3v2M3 12h2M12 21v-2M21 12h-2M12 7.5a4.5 4.5 0 0 0-4.5 4.5M16.5 12a4.5 4.5 0 0 0-4.5-4.5M14.07 13.5A2.25 2.25 0 0 0 16.5 12a2.25 2.25 0 0 0 2.43 1.5M18.07 7.93l-1.41-1.41M5.93 18.07l-1.41-1.41M18.07 18.07l-1.41 1.41M5.93 5.93l-1.41 1.41"/>
    </svg>
);

const X: React.FC<IconProps> = ({ size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// --- ENHANCED STORY MODAL ---
interface StoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    coffeeOptions: string[];
}

const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose, coffeeOptions }) => {
    const [mood, setMood] = useState('Cozy');
    const [coffee, setCoffee] = useState('Caffè Latte');
    const [story, setStory] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const moodOptions = ['Cozy', 'Inspired', 'Relaxed', 'Focused', 'Adventurous'];

    const generateStory = async () => {
        setIsLoading(true);
        setStory('');
        const prompt = `You are a storyteller for Brew & Bliss, a warm and soulful coffee shop. A customer is feeling ${mood} and is about to enjoy a ${coffee}. Write a short, beautiful, two-sentence story (max 50 words) about their moment of bliss. Capture the feeling, aroma, and the simple joy of this experience.`;

        const payload = {
            contents: [{
                parts: [{ text: prompt }]
            }]
        };
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setStory(text);
            } else {
                setStory("We couldn't quite capture the moment. Please try again.");
            }
        } catch (error) {
            console.error("Error generating story:", error);
            setStory("Our storyteller is taking a quick coffee break. Please try again in a moment.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div 
                    initial={{ scale: 0.7, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.7, opacity: 0, y: 50 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="glass-morphism text-cream rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <motion.button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 text-cream/70 hover:text-cream transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X />
                    </motion.button>
                    
                    <motion.h2 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="font-heading text-2xl font-bold mb-6 text-center"
                    >
                        Create Your Blissful Moment
                    </motion.h2>
                    
                    <div className="space-y-4">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label htmlFor="mood" className="block text-sm font-medium text-cream/90 mb-2">Choose your mood:</label>
                            <select 
                                id="mood" 
                                value={mood} 
                                onChange={(e) => setMood(e.target.value)} 
                                className="w-full p-3 bg-coffee-dark/50 border border-cream/20 rounded-lg shadow-sm focus:ring-2 focus:ring-accent focus:border-accent text-cream backdrop-blur-sm"
                            >
                                {moodOptions.map(m => <option key={m} value={m} className="bg-coffee-dark text-cream">{m}</option>)}
                            </select>
                        </motion.div>
                        
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label htmlFor="coffee" className="block text-sm font-medium text-cream/90 mb-2">Choose your coffee:</label>
                            <select 
                                id="coffee" 
                                value={coffee} 
                                onChange={(e) => setCoffee(e.target.value)} 
                                className="w-full p-3 bg-coffee-dark/50 border border-cream/20 rounded-lg shadow-sm focus:ring-2 focus:ring-accent focus:border-accent text-cream backdrop-blur-sm"
                            >
                                {coffeeOptions.map(c => <option key={c} value={c} className="bg-coffee-dark text-cream">{c}</option>)}
                            </select>
                        </motion.div>
                    </div>
                    
                    <motion.button 
                        onClick={generateStory} 
                        disabled={isLoading} 
                        className="w-full mt-6 bg-gradient-to-r from-accent to-accent-dark text-coffee-dark font-bold py-3 px-4 rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div
                            animate={isLoading ? { rotate: 360 } : {}}
                            transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                        >
                            <Sparkles />
                        </motion.div>
                        {isLoading ? 'Crafting your story...' : 'Generate My Story'}
                    </motion.button>
                    
                    <AnimatePresence>
                        {story && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                className="mt-6 p-4 bg-gradient-to-r from-coffee-warm/20 to-coffee-light/20 border-l-4 border-accent rounded-r-lg backdrop-blur-sm"
                            >
                                <p className="text-cream/90 italic leading-relaxed">{story}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// --- ENHANCED CAROUSEL COMPONENT ---
export default function EnhancedCarousel() {
    const slides = [
        {
            imageUrl: "/images/coffeemakertraditional.png",
            title: "From Ethiopian Highlands to Your Cup",
            subtitle: "Discover the soul of coffee, sourced with purpose.",
            alt: "Misty forest highlands representing where coffee beans are sourced."
        },
        {
            imageUrl: "/images/coffeeshop interior.png",
            title: "Crafted by Hand, Brewed with Heart",
            subtitle: "Every drop tells a story of passion and precision.",
            alt: "A barista carefully pouring beautiful latte art into a cup."
        },
        {
            imageUrl: "/images/morning coffee.png",
            title: "Your Sanctuary for Connection",
            subtitle: "Find your moment of bliss in the heart of our community.",
            alt: "The warm, inviting, and cozy interior of the Brew & Bliss coffee shop."
        },
        {
            imageUrl: "/images/dalgona coffe.png",
            title: "Your Daily Dose of Bliss",
            subtitle: "Visit us today and become part of our story.",
            alt: "A warm cup of coffee resting on a wooden table in a cozy setting."
        },
        {
            imageUrl: "/images/Brew&Bliss2.png",
            title: "What's Your Moment of Bliss?",
            subtitle: "Let our storyteller craft a unique coffee moment, just for you.",
            alt: "A person writing in a journal with a cup of coffee nearby.",
            isInteractive: true
        },
    ];

    const coffeeOptions = [
        'Caffè Latte', 'Cappuccino', 'Caramel Macchiato', 'Caffè Americano', 'Caffè Mocha', 'Espresso', 'Flat White', 'Iced Coffee', 'Cold Brew'
    ];

    const [current, setCurrent] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Enhanced slide transition with direction
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? 45 : -45,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            rotateY: direction < 0 ? 45 : -45,
        }),
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrent((prevCurrent) => {
            if (newDirection === 1) {
                return prevCurrent === slides.length - 1 ? 0 : prevCurrent + 1;
            } else {
                return prevCurrent === 0 ? slides.length - 1 : prevCurrent - 1;
            }
        });
    }, [slides.length]);

    const nextSlide = useCallback(() => {
        paginate(1);
    }, [paginate]);

    const prevSlide = useCallback(() => {
        paginate(-1);
    }, [paginate]);

    // Auto-play functionality
    useEffect(() => {
        if (isAutoPlaying) {
            intervalRef.current = setInterval(nextSlide, 7000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [nextSlide, isAutoPlaying]);

    // Pause auto-play on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    // 3D parallax effect on mouse move
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!carouselRef.current) return;

            const rect = carouselRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            gsap.to(carouselRef.current, {
                duration: 0.3,
                rotationY: (x - 0.5) * 5,
                rotationX: (y - 0.5) * -5,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            if (!carouselRef.current) return;
            gsap.to(carouselRef.current, {
                duration: 0.5,
                rotationY: 0,
                rotationX: 0,
                ease: "power2.out",
            });
        };

        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('mousemove', handleMouseMove);
            carousel.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                carousel.removeEventListener('mousemove', handleMouseMove);
                carousel.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    return (
        <>
            <StoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} coffeeOptions={coffeeOptions} />
            
            <div 
                ref={carouselRef}
                className="w-full h-screen font-sans relative overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: '1000px' }}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.5 },
                            scale: { duration: 0.5 },
                            rotateY: { duration: 0.5 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute w-full h-full cursor-grab active:cursor-grabbing"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Background Image with Parallax */}
                        <motion.div 
                            className="absolute inset-0"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 8, ease: "linear" }}
                        >
                            <Image 
                                src={slides[current].imageUrl} 
                                alt={slides[current].alt}
                                fill
                                sizes="100vw"
                                style={{ objectFit: "cover" }}
                                className="w-full h-full"
                                priority
                                onError={(e) => { 
                                    e.currentTarget.src = 'https://placehold.co/1920x1080/333/FFF?text=Image+Not+Found'; 
                                }}
                            />
                        </motion.div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10"></div>

                        {/* Content */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
                            <motion.h1 
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                                className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-4xl"
                                style={{ 
                                    textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                                    transform: 'translateZ(50px)'
                                }}
                            >
                                {slides[current].title}
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                                className="font-body text-lg md:text-xl lg:text-2xl max-w-3xl mb-8 leading-relaxed"
                                style={{ 
                                    textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
                                    transform: 'translateZ(30px)'
                                }}
                            >
                                {slides[current].subtitle}
                            </motion.p>
                            
                            {slides[current].isInteractive && (
                                <motion.button 
                                    onClick={() => setIsModalOpen(true)} 
                                    className="bg-gradient-to-r from-accent to-accent-dark text-coffee-dark font-bold py-4 px-8 rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 text-lg"
                                    initial={{ y: 20, opacity: 0, scale: 0.9 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                                    whileHover={{ 
                                        scale: 1.05, 
                                        y: -5,
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ transform: 'translateZ(40px)' }}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 15, -15, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Sparkles />
                                    </motion.div>
                                    ✨ Create My Story
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="absolute inset-0 z-30 flex items-center justify-between p-6">
                    <motion.button 
                        onClick={prevSlide} 
                        className="p-4 rounded-full glass-morphism text-white hover:bg-white/20 transition-all duration-300 group"
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    >
                        <motion.div
                            animate={{ x: [-2, 2, -2] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ChevronLeft size={32} />
                        </motion.div>
                    </motion.button>
                    
                    <motion.button 
                        onClick={nextSlide} 
                        className="p-4 rounded-full glass-morphism text-white hover:bg-white/20 transition-all duration-300 group"
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    >
                        <motion.div
                            animate={{ x: [-2, 2, -2] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ChevronRight size={32} />
                        </motion.div>
                    </motion.button>
                </div>

                {/* Enhanced Indicators */}
                <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
                    {slides.map((_, i) => (
                        <motion.div
                            key={i}
                            onClick={() => {
                                setDirection(i > current ? 1 : -1);
                                setCurrent(i);
                            }}
                            className={`cursor-pointer transition-all duration-300 ${
                                current === i 
                                    ? 'w-12 h-3 bg-white rounded-full' 
                                    : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/70'
                            }`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                        />
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/20">
                    <motion.div
                        className="h-full bg-gradient-to-r from-accent to-accent-dark"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 7, ease: "linear", repeat: Infinity }}
                        key={current}
                    />
                </div>
            </div>
        </>
    );
}