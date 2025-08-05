"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  MessageSquare, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Star,
  User,
  Calendar,
  Search,
  Filter,
  Reply,
  Archive,
  Trash2,
  Eye,
  Coffee,
  Phone,
  MapPin
} from "lucide-react";

const MessagesPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Mock messages data
  const messages = [
    {
      id: "MSG-001",
      type: "barista",
      subject: "Question about Ethiopian coffee brewing",
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "(555) 123-4567",
      message: "Hi! I recently bought your Ethiopian single origin beans and I'm having trouble getting the right flavor profile. Could you share some brewing tips? I'm using a V60 pour-over method but the coffee tastes a bit sour. What grind size and water temperature would you recommend?",
      status: "unread",
      priority: "medium",
      timestamp: "2024-01-15T14:30:00",
      assignedTo: "Elena Rodriguez",
      tags: ["brewing", "ethiopian", "pour-over"]
    },
    {
      id: "MSG-002",
      type: "complaint",
      subject: "Cold coffee and slow service",
      name: "Mike Chen",
      email: "mike@email.com",
      phone: "(555) 234-5678",
      message: "I visited your downtown location yesterday around 2 PM and was disappointed with the service. My latte was served lukewarm and I had to wait 15 minutes despite there being only 2 people ahead of me. This is not the quality I expect from Brew & Bliss. Please address this issue.",
      status: "replied",
      priority: "high",
      timestamp: "2024-01-15T11:45:00",
      assignedTo: "David Park",
      tags: ["service", "temperature", "wait-time"],
      reply: {
        timestamp: "2024-01-15T13:20:00",
        message: "Thank you for bringing this to our attention. We sincerely apologize for the poor experience. I've spoken with our downtown team and we're implementing additional training. Please accept this $20 gift card as our apology."
      }
    },
    {
      id: "MSG-003",
      type: "compliment",
      subject: "Amazing latte art and friendly staff!",
      name: "Emma Rodriguez",
      email: "emma@email.com",
      phone: "(555) 345-6789",
      message: "I just wanted to say how much I love coming to your coffee shop! The barista Sarah made the most beautiful latte art today - it was a perfect rosetta pattern. The coffee was delicious and the atmosphere is so welcoming. You have an amazing team!",
      status: "read",
      priority: "low",
      timestamp: "2024-01-15T09:20:00",
      assignedTo: "Sarah Kim",
      tags: ["latte-art", "staff", "positive"]
    },
    {
      id: "MSG-004",
      type: "suggestion",
      subject: "Plant-based milk alternatives",
      name: "Alex Thompson",
      email: "alex@email.com",
      phone: "(555) 456-7890",
      message: "Love your coffee shop! I was wondering if you could consider adding more plant-based milk options? I'd love to see macadamia milk or pea milk as alternatives. Many of your customers would appreciate more variety for dietary restrictions and preferences.",
      status: "in_progress",
      priority: "medium",
      timestamp: "2024-01-14T16:15:00",
      assignedTo: "David Park",
      tags: ["menu", "plant-based", "suggestion"]
    },
    {
      id: "MSG-005",
      type: "catering",
      subject: "Corporate event catering inquiry",
      name: "Jennifer Walsh",
      email: "jennifer@techcorp.com",
      phone: "(555) 567-8901",
      message: "Hi, I'm organizing a corporate event for 50 people next month and would like to inquire about your catering services. We need coffee, pastries, and light lunch options. The event is on February 15th from 9 AM to 2 PM. Could you provide a quote and menu options?",
      status: "unread",
      priority: "high",
      timestamp: "2024-01-14T10:30:00",
      assignedTo: null,
      tags: ["catering", "corporate", "quote"]
    }
  ];

  const statusOptions = [
    { id: "all", name: "All Messages", color: "bg-gray-500" },
    { id: "unread", name: "Unread", color: "bg-red-500" },
    { id: "read", name: "Read", color: "bg-blue-500" },
    { id: "replied", name: "Replied", color: "bg-green-500" },
    { id: "in_progress", name: "In Progress", color: "bg-yellow-500" },
    { id: "archived", name: "Archived", color: "bg-gray-400" }
  ];

  const typeOptions = [
    { id: "all", name: "All Types", icon: MessageSquare },
    { id: "barista", name: "Barista Questions", icon: Coffee },
    { id: "complaint", name: "Complaints", icon: AlertCircle },
    { id: "compliment", name: "Compliments", icon: Star },
    { id: "suggestion", name: "Suggestions", icon: MessageSquare },
    { id: "catering", name: "Catering", icon: Coffee },
    { id: "general", name: "General", icon: Mail }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread": return "text-red-600 bg-red-100";
      case "read": return "text-blue-600 bg-blue-100";
      case "replied": return "text-green-600 bg-green-100";
      case "in_progress": return "text-yellow-600 bg-yellow-100";
      case "archived": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "barista": return <Coffee className="w-4 h-4" />;
      case "complaint": return <AlertCircle className="w-4 h-4" />;
      case "compliment": return <Star className="w-4 h-4" />;
      case "catering": return <Coffee className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesStatus = selectedStatus === "all" || message.status === selectedStatus;
    const matchesType = selectedType === "all" || message.type === selectedType;
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const MessageCard = ({ message }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
        message.status === 'unread' ? 'border-l-4 border-red-500' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            message.type === 'complaint' ? 'bg-red-100' :
            message.type === 'compliment' ? 'bg-green-100' :
            message.type === 'barista' ? 'bg-blue-100' :
            'bg-gray-100'
          }`}>
            {getTypeIcon(message.type)}
          </div>
          <div>
            <h3 className="font-bold text-black text-lg">{message.subject}</h3>
            <p className="text-black text-sm">{message.name} • {message.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(message.priority)}`}>
            {message.priority.toUpperCase()}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(message.status)}`}>
            {message.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-black text-sm line-clamp-3 leading-relaxed">
          {message.message}
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4 text-sm text-black">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(message.timestamp).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
        {message.assignedTo && (
          <div className="flex items-center space-x-1 text-sm text-black">
            <User className="w-4 h-4" />
            <span>{message.assignedTo}</span>
          </div>
        )}
      </div>

      {message.tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {message.tags.map((tag: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-accent/20 text-accent-dark text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {message.reply && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-green-800 font-semibold text-sm">Replied</span>
            <span className="text-green-600 text-xs">
              {new Date(message.reply.timestamp).toLocaleString()}
            </span>
          </div>
          <p className="text-black text-sm">{message.reply.message}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedMessage(message)}
            className="p-2 text-black hover:text-accent transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-black hover:text-blue-600 transition-colors">
            <Reply className="w-4 h-4" />
          </button>
          <button className="p-2 text-black hover:text-yellow-600 transition-colors">
            <Archive className="w-4 h-4" />
          </button>
          <button className="p-2 text-black hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        {message.status === 'unread' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Mark as Read
          </motion.button>
        )}
        
        {message.status === 'read' && !message.reply && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            Reply
          </motion.button>
        )}
      </div>
    </motion.div>
  );

  const StatsCard = ({ title, value, icon: Icon, color }: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-black mb-1">{value}</h3>
      <p className="text-black text-sm">{title}</p>
    </motion.div>
  );

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">Customer Messages</h1>
                <p className="text-black">Manage customer inquiries and feedback</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Messages"
              value={messages.length}
              icon={MessageSquare}
              color="bg-blue-500"
            />
            <StatsCard
              title="Unread Messages"
              value={messages.filter(m => m.status === "unread").length}
              icon={Mail}
              color="bg-red-500"
            />
            <StatsCard
              title="Barista Questions"
              value={messages.filter(m => m.type === "barista").length}
              icon={Coffee}
              color="bg-green-500"
            />
            <StatsCard
              title="High Priority"
              value={messages.filter(m => m.priority === "high").length}
              icon={AlertCircle}
              color="bg-orange-500"
            />
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search messages by subject, name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/80 border border-primary-light/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-black"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <motion.button
                    key={status.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedStatus(status.id)}
                    className={`px-4 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                      selectedStatus === status.id
                        ? "bg-accent text-black shadow-lg"
                        : "bg-white/80 text-black hover:bg-white"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                    <span className="hidden md:inline">{status.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {typeOptions.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                    selectedType === type.id
                      ? "bg-primary-dark text-cream shadow-lg"
                      : "bg-white/60 text-black hover:bg-white/80"
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  <span className="text-sm">{type.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Messages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredMessages.map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
            </AnimatePresence>
          </div>

          {filteredMessages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <MessageSquare className="w-16 h-16 text-black/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">No messages found</h3>
              <p className="text-black">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default MessagesPage;