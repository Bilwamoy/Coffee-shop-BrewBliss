"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Coffee, Heart, Star } from "lucide-react";

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const events = [
    {
      id: 1,
      title: "Coffee Cupping Workshop",
      category: "workshop",
      date: "2024-01-15",
      time: "2:00 PM - 4:00 PM",
      location: "Main Store - Downtown",
      attendees: 12,
      maxAttendees: 15,
      price: "Free",
      image: "☕",
      description: "Learn the art of coffee tasting with our expert baristas. Discover flavor profiles, brewing techniques, and the journey from bean to cup.",
      instructor: "Master Barista Elena Rodriguez",
      difficulty: "Beginner",
      featured: true
    },
    {
      id: 2,
      title: "Latte Art Competition",
      category: "competition",
      date: "2024-01-20",
      time: "6:00 PM - 9:00 PM",
      location: "Main Store - Downtown",
      attendees: 8,
      maxAttendees: 20,
      price: "$25",
      image: "🎨",
      description: "Show off your latte art skills! Compete with fellow coffee enthusiasts and win amazing prizes including premium coffee beans and brewing equipment.",
      instructor: "Various Local Baristas",
      difficulty: "Intermediate",
      featured: false
    },
    {
      id: 3,
      title: "Coffee & Community Meetup",
      category: "social",
      date: "2024-01-25",
      time: "7:00 PM - 9:00 PM",
      location: "Riverside Branch",
      attendees: 25,
      maxAttendees: 40,
      price: "Free",
      image: "👥",
      description: "Connect with fellow coffee lovers in a relaxed atmosphere. Share stories, make new friends, and enjoy our signature blends together.",
      instructor: "Community Manager Sarah Kim",
      difficulty: "All Levels",
      featured: false
    },
    {
      id: 4,
      title: "Sustainable Coffee Farming Talk",
      category: "education",
      date: "2024-02-01",
      time: "3:00 PM - 5:00 PM",
      location: "Main Store - Downtown",
      attendees: 18,
      maxAttendees: 30,
      price: "Free",
      image: "🌱",
      description: "Learn about sustainable farming practices and how they impact your daily cup. Meet farmers via video call and understand the coffee supply chain.",
      instructor: "Dr. Maria Santos - Coffee Sustainability Expert",
      difficulty: "All Levels",
      featured: true
    },
    {
      id: 5,
      title: "Espresso Masterclass",
      category: "workshop",
      date: "2024-02-08",
      time: "10:00 AM - 1:00 PM",
      location: "Training Center",
      attendees: 6,
      maxAttendees: 10,
      price: "$45",
      image: "⚡",
      description: "Master the perfect espresso shot! Learn about grind size, extraction time, pressure, and temperature. Hands-on practice with professional equipment.",
      instructor: "Head Barista Marcus Johnson",
      difficulty: "Advanced",
      featured: false
    },
    {
      id: 6,
      title: "Coffee & Jazz Evening",
      category: "social",
      date: "2024-02-14",
      time: "7:00 PM - 10:00 PM",
      location: "Main Store - Downtown",
      attendees: 35,
      maxAttendees: 50,
      price: "$15",
      image: "🎵",
      description: "Enjoy smooth jazz music while sipping our finest coffee blends. Perfect for a romantic evening or a relaxing night out with friends.",
      instructor: "Live Jazz Trio Performance",
      difficulty: "All Levels",
      featured: true
    }
  ];

  const categories = [
    { id: "all", name: "All Events", icon: "📅" },
    { id: "workshop", name: "Workshops", icon: "🎓" },
    { id: "competition", name: "Competitions", icon: "🏆" },
    { id: "social", name: "Social", icon: "👥" },
    { id: "education", name: "Education", icon: "📚" }
  ];

  const filteredEvents = selectedCategory === "all" 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-light to-cream">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/10"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-6xl mb-6"
          >
            🐦
          </motion.div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary-dark mb-6">
            Community Events
          </h1>
          <p className="font-body text-xl text-primary mb-8 max-w-2xl mx-auto">
            Join our vibrant coffee community! Discover workshops, competitions, and social gatherings that bring coffee lovers together.
          </p>
          
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-2">📅</div>
              <div className="text-2xl font-bold text-primary-dark">{events.length}</div>
              <div className="font-body text-primary">Upcoming Events</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-2xl font-bold text-primary-dark">
                {events.reduce((sum, event) => sum + event.attendees, 0)}
              </div>
              <div className="font-body text-primary">Community Members</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-primary-dark">
                {events.filter(event => event.category === 'competition').length}
              </div>
              <div className="font-body text-primary">Competitions</div>
            </div>
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

      {/* Events Grid */}
      <section className="py-8 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                  event.featured ? 'ring-2 ring-accent' : ''
                }`}
              >
                {/* Featured Badge */}
                {event.featured && (
                  <div className="absolute -top-3 -right-3 bg-accent text-primary-dark px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Featured
                  </div>
                )}

                {/* Event Header */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{event.image}</div>
                  <h3 className="font-heading text-xl font-bold text-primary-dark mb-2">
                    {event.title}
                  </h3>
                  <span className="font-body text-sm bg-primary-light/20 text-primary px-3 py-1 rounded-full">
                    {categories.find(cat => cat.id === event.category)?.name}
                  </span>
                </div>

                {/* Event Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-primary">
                    <Calendar className="w-4 h-4 mr-3 text-accent" />
                    <span className="font-body text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-primary">
                    <Clock className="w-4 h-4 mr-3 text-accent" />
                    <span className="font-body text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-primary">
                    <MapPin className="w-4 h-4 mr-3 text-accent" />
                    <span className="font-body text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-primary">
                    <Users className="w-4 h-4 mr-3 text-accent" />
                    <span className="font-body text-sm">
                      {event.attendees}/{event.maxAttendees} attendees
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-body text-primary text-sm mb-4 leading-relaxed">
                  {event.description}
                </p>

                {/* Instructor & Difficulty */}
                <div className="mb-4 p-3 bg-primary-light/10 rounded-lg">
                  <p className="font-body text-xs text-primary mb-1">
                    <strong>Instructor:</strong> {event.instructor}
                  </p>
                  <p className="font-body text-xs text-primary">
                    <strong>Level:</strong> {event.difficulty}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-primary-light/20">
                  <div className="text-primary-dark">
                    <span className="font-heading text-lg font-bold">
                      {event.price}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="font-body bg-gradient-to-r from-accent to-accent-dark text-primary-dark px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {event.attendees >= event.maxAttendees ? 'Waitlist' : 'Join Event'}
                  </motion.button>
                </div>

                {/* Attendance Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-primary mb-1">
                    <span>Attendance</span>
                    <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                  </div>
                  <div className="w-full bg-primary-light/20 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-accent to-accent-dark h-2 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-primary-dark/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-dark mb-6">
            Stay Updated
          </h2>
          <p className="font-body text-xl text-primary mb-8">
            Subscribe to our newsletter to get notified about upcoming events and exclusive workshops!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-body bg-gradient-to-r from-accent to-accent-dark text-primary-dark px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            Subscribe Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default EventsPage;