"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  Download,
  RefreshCw,
  Package,
  DollarSign,
  User,
  Calendar,
  MapPin,
  Phone
} from "lucide-react";

const OrdersPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      customer: {
        name: "Sarah Johnson",
        email: "sarah@email.com",
        phone: "(555) 123-4567",
        avatar: "👩‍💼"
      },
      items: [
        { name: "Ethiopian Single Origin", quantity: 1, price: 24.99 },
        { name: "Almond Croissant", quantity: 2, price: 4.25 }
      ],
      total: 33.49,
      status: "completed",
      orderDate: "2024-01-15T10:30:00",
      completedDate: "2024-01-15T10:45:00",
      paymentMethod: "Credit Card",
      orderType: "pickup",
      notes: "Extra hot, no sugar"
    },
    {
      id: "ORD-002",
      customer: {
        name: "Mike Chen",
        email: "mike@email.com",
        phone: "(555) 234-5678",
        avatar: "👨‍💻"
      },
      items: [
        { name: "Vanilla Latte", quantity: 2, price: 5.50 },
        { name: "Blueberry Muffin", quantity: 1, price: 3.75 }
      ],
      total: 14.75,
      status: "preparing",
      orderDate: "2024-01-15T11:15:00",
      paymentMethod: "Mobile Pay",
      orderType: "dine-in",
      notes: "Oat milk substitute"
    },
    {
      id: "ORD-003",
      customer: {
        name: "Emma Rodriguez",
        email: "emma@email.com",
        phone: "(555) 345-6789",
        avatar: "👩‍🎨"
      },
      items: [
        { name: "Cappuccino", quantity: 1, price: 4.50 },
        { name: "Chocolate Chip Cookie", quantity: 3, price: 2.25 }
      ],
      total: 11.25,
      status: "pending",
      orderDate: "2024-01-15T11:45:00",
      paymentMethod: "Cash",
      orderType: "takeaway",
      notes: ""
    },
    {
      id: "ORD-004",
      customer: {
        name: "David Park",
        email: "david@email.com",
        phone: "(555) 456-7890",
        avatar: "👨‍🍳"
      },
      items: [
        { name: "Cold Brew", quantity: 1, price: 4.75 },
        { name: "Avocado Toast", quantity: 1, price: 8.50 },
        { name: "Fresh Orange Juice", quantity: 1, price: 3.25 }
      ],
      total: 16.50,
      status: "cancelled",
      orderDate: "2024-01-15T09:20:00",
      cancelledDate: "2024-01-15T09:25:00",
      paymentMethod: "Credit Card",
      orderType: "delivery",
      notes: "Customer requested cancellation"
    }
  ];

  const statusOptions = [
    { id: "all", name: "All Orders", color: "bg-gray-500" },
    { id: "pending", name: "Pending", color: "bg-yellow-500" },
    { id: "preparing", name: "Preparing", color: "bg-blue-500" },
    { id: "completed", name: "Completed", color: "bg-green-500" },
    { id: "cancelled", name: "Cancelled", color: "bg-red-500" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "preparing": return "text-blue-600 bg-blue-100";
      case "completed": return "text-green-600 bg-green-100";
      case "cancelled": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "preparing": return <Package className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const OrderCard = ({ order }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-3xl">{order.customer.avatar}</span>
          <div>
            <h3 className="font-bold text-black text-lg">{order.id}</h3>
            <p className="text-black">{order.customer.name}</p>
            <p className="text-black text-sm">{new Date(order.orderDate).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            <span>{order.status.toUpperCase()}</span>
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <h4 className="font-semibold text-black">Items:</h4>
        {order.items.map((item: any, index: number) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-black">{item.quantity}x {item.name}</span>
            <span className="text-black font-semibold">${(item.quantity * item.price).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-black">
          <p>Payment: {order.paymentMethod}</p>
          <p>Type: {order.orderType}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-black">${order.total.toFixed(2)}</p>
        </div>
      </div>

      {order.notes && (
        <div className="mb-4 p-3 bg-primary-light/10 rounded-lg">
          <p className="text-sm text-black"><strong>Notes:</strong> {order.notes}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedOrder(order)}
            className="p-2 text-black hover:text-accent transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-black hover:text-accent transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          {order.status === "pending" && (
            <button className="p-2 text-black hover:text-red-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {order.status === "pending" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Preparing
          </motion.button>
        )}
        
        {order.status === "preparing" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            Mark Complete
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
                <h1 className="text-3xl font-bold text-black mb-2">Orders Management</h1>
                <p className="text-black">Track and manage customer orders</p>
              </div>
              
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/90 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Download className="w-5 h-5 text-black" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/90 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <RefreshCw className="w-5 h-5 text-black" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Orders"
              value={orders.length}
              icon={ShoppingCart}
              color="bg-blue-500"
            />
            <StatsCard
              title="Pending Orders"
              value={orders.filter(o => o.status === "pending").length}
              icon={Clock}
              color="bg-yellow-500"
            />
            <StatsCard
              title="Completed Today"
              value={orders.filter(o => o.status === "completed").length}
              icon={CheckCircle}
              color="bg-green-500"
            />
            <StatsCard
              title="Total Revenue"
              value={`$${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`}
              icon={DollarSign}
              color="bg-purple-500"
            />
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by order ID or customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/80 border border-primary-light/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-black"
                />
              </div>
              
              <div className="flex space-x-2">
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
          </motion.div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </AnimatePresence>
          </div>

          {filteredOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <ShoppingCart className="w-16 h-16 text-black/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">No orders found</h3>
              <p className="text-black">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersPage;