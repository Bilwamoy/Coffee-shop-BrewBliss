import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

// --- ICONS ---
interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

const ChevronLeft: React.FC<IconProps> = ({ size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 18-6-6 6-6" />
    </svg>
);

interface ChevronRightProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

const ChevronRight: React.FC<ChevronRightProps> = ({ size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m9 18 6-6-6-6" />
    </svg>
);

interface SparklesProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

const Sparkles: React.FC<SparklesProps> = ({ size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.93 13.5A2.25 2.25 0 0 0 7.5 12a2.25 2.25 0 0 0-2.43 1.5M12 3v2M3 12h2M12 21v-2M21 12h-2M12 7.5a4.5 4.5 0 0 0-4.5 4.5M16.5 12a4.5 4.5 0 0 0-4.5-4.5M14.07 13.5A2.25 2.25 0 0 0 16.5 12a2.25 2.25 0 0 0 2.43 1.5M18.07 7.93l-1.41-1.41M5.93 18.07l-1.41-1.41M18.07 18.07l-1.41 1.41M5.93 5.93l-1.41 1.41"/></svg>
);

interface XProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

const X: React.FC<XProps> = ({ size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);


// --- GEMINI API STORY MODAL ---
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
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white text-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full relative transform transition-all duration-300 scale-100">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                    <X />
                </button>
                <h2 className="text-2xl font-serif font-bold mb-4 text-center">Create Your Blissful Moment</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-1">Choose your mood:</label>
                        <select id="mood" value={mood} onChange={(e) => setMood(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-800 focus:border-amber-800">
                            {moodOptions.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="coffee" className="block text-sm font-medium text-gray-700 mb-1">Choose your coffee:</label>
                        <select id="coffee" value={coffee} onChange={(e) => setCoffee(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-800 focus:border-amber-800">
                            {coffeeOptions.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                <button onClick={generateStory} disabled={isLoading} className="w-full mt-6 bg-amber-900 text-white font-bold py-3 px-4 rounded-md hover:bg-amber-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400">
                    <Sparkles />
                    {isLoading ? 'Crafting your story...' : 'Generate My Story'}
                </button>
                {story && (
                    <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-800 rounded-r-lg">
                        <p className="text-gray-700 italic">{story}</p>
                    </div>
                )}
            </div>
        </div>
    );
};


// --- MAIN CAROUSEL COMPONENT ---
export default function App() {
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

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = useCallback(() => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  }, [current, slides.length]);
  
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 7000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <>
      <StoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} coffeeOptions={coffeeOptions} />
      <div className="w-full h-screen font-sans">
        <div className="relative w-full h-full overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === current ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
              <Image 
                src={slide.imageUrl} 
                alt={slide.alt}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                className="w-full h-full"
                priority={index === 0}
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/1920x1080/333/FFF?text=Image+Not+Found'; }}
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
                <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 leading-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                  {slide.subtitle}
                </p>
                {slide.isInteractive && (
                    <button onClick={() => setIsModalOpen(true)} className="mt-6 bg-white text-amber-900 font-bold py-3 px-6 rounded-md hover:bg-amber-100 transition-colors flex items-center gap-2 shadow-lg">
                        <Sparkles />
                        ✨ Create My Story
                    </button>
                )}
              </div>
            </div>
          ))}
          <div className="absolute inset-0 z-30 flex items-center justify-between p-4">
            <button onClick={prevSlide} className="p-2 rounded-full bg-black bg-opacity-40 text-white hover:bg-opacity-60 transition-colors">
              <ChevronLeft size={32} />
            </button>
            <button onClick={nextSlide} className="p-2 rounded-full bg-black bg-opacity-40 text-white hover:bg-opacity-60 transition-colors">
              <ChevronRight size={32} />
            </button>
          </div>
          <div className="absolute bottom-5 left-0 right-0 z-30 flex justify-center gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  current === i ? 'bg-white p-2' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

