"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Coffee, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Calendar,
  Star,
  DollarSign,
  Package,
  MessageSquare,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  RefreshCw
} from "lucide-react";

// Mock data - in real app, this would come from API
const mockData = {
  stats: {
    totalRevenue: 125430,
    totalOrders: 1247,
    totalCustomers: 892,
    avgRating: 4.8,
    dailyGrowth: 12.5,
    monthlyGrowth: 8.3
  },
  recentOrders: [
    { id: "ORD-001", customer: "Sarah Johnson", items: "Espresso, Croissant", total: 12.50, status: "completed", time: "2 min ago" },
    { id: "ORD-002", customer: "Mike Chen", items: "Latte, Muffin", total: 15.75, status: "preparing", time: "5 min ago" },
    { id: "ORD-003", customer: "Emma Rodriguez", items: "Cappuccino", total: 8.25, status: "pending", time: "8 min ago" },
    { id: "ORD-004", customer: "David Park", items: "Cold Brew, Sandwich", total: 18.90, status: "completed", time: "12 min ago" }
  ],
  products: [
    { id: 1, name: "Ethiopian Single Origin", category: "Coffee", price: 24.99, stock: 45, sales: 234 },
    { id: 2, name: "Vanilla Latte", category: "Beverages", price: 5.50, stock: 0, sales: 456 },
    { id: 3, name: "Almond Croissant", category: "Pastries", price: 4.25, stock: 23, sales: 189 },
    { id: 4, name: "Cold Brew", category: "Beverages", price: 4.75, stock: 67, sales: 345 }
  ],
  reviews: [
    { id: 1, customer: "Alice Brown", rating: 5, comment: "Amazing coffee and service!", date: "2024-01-15", product: "Ethiopian Single Origin" },
    { id: 2, customer: "John Smith", rating: 4, comment: "Great atmosphere for work", date: "2024-01-14", product: "Latte" },
    { id: 3, customer: "Lisa Wang", rating: 5, comment: "Best coffee in town!", date: "2024-01-13", product: "Cappuccino" }
  ]
};

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState(3);

  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: BarChart3 },
    { id: "orders", name: "Orders", icon: ShoppingCart },
    { id: "products", name: "Products", icon: Package },
    { id: "customers", name: "Customers", icon: Users },
    { id: "reviews", name: "Reviews", icon: MessageSquare },
    { id: "analytics", name: "Analytics", icon: TrendingUp },
    { id: "settings", name: "Settings", icon: Settings }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <span className={`text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
      <h3 className="text-2xl font-bold text-black mb-1">{value}</h3>
      <p className="text-black text-sm">{title}</p>
    </motion.div>
  );

  const OrderRow = ({ order }: any) => (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ backgroundColor: "rgba(139, 69, 19, 0.05)" }}
      className="border-b border-primary-light/20"
    >
      <td className="py-4 px-6 font-semibold text-black">{order.id}</td>
      <td className="py-4 px-6 text-black">{order.customer}</td>
      <td className="py-4 px-6 text-black">{order.items}</td>
      <td className="py-4 px-6 font-semibold text-black">${order.total}</td>
      <td className="py-4 px-6">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          order.status === 'completed' ? 'bg-green-100 text-green-800' :
          order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {order.status}
        </span>
      </td>
      <td className="py-4 px-6 text-black text-sm">{order.time}</td>
      <td className="py-4 px-6">
        <div className="flex space-x-2">
          <button className="p-2 text-black hover:text-accent transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-black hover:text-accent transition-colors">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  );

  const ProductCard = ({ product }: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-black mb-1">{product.name}</h3>
          <p className="text-black text-sm">{product.category}</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-black hover:text-accent transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-black hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-black">Price:</span>
          <span className="font-semibold text-black">${product.price}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black">Stock:</span>
          <span className={`font-semibold ${product.stock === 0 ? 'text-red-600' : 'text-black'}`}>
            {product.stock}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-black">Sales:</span>
          <span className="font-semibold text-black">{product.sales}</span>
        </div>
      </div>
      
      {product.stock === 0 && (
        <div className="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm font-semibold">
          Out of Stock
        </div>
      )}
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={`$${mockData.stats.totalRevenue.toLocaleString()}`}
                change={mockData.stats.monthlyGrowth}
                icon={DollarSign}
                color="bg-green-500"
              />
              <StatCard
                title="Total Orders"
                value={mockData.stats.totalOrders.toLocaleString()}
                change={mockData.stats.dailyGrowth}
                icon={ShoppingCart}
                color="bg-blue-500"
              />
              <StatCard
                title="Customers"
                value={mockData.stats.totalCustomers.toLocaleString()}
                change={5.2}
                icon={Users}
                color="bg-purple-500"
              />
              <StatCard
                title="Avg Rating"
                value={mockData.stats.avgRating}
                change={2.1}
                icon={Star}
                color="bg-yellow-500"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-black mb-4">Sales Overview</h3>
                <div className="h-64 bg-gradient-to-br from-accent/20 to-primary-light/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-accent mx-auto mb-4" />
                    <p className="text-black">Chart Component Here</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-black mb-4">Product Distribution</h3>
                <div className="h-64 bg-gradient-to-br from-secondary-light/20 to-cream/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-16 h-16 text-accent mx-auto mb-4" />
                    <p className="text-black">Pie Chart Component Here</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-black">Recent Orders</h3>
                <button className="text-accent hover:text-accent-dark transition-colors">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary-light/20">
                      <th className="text-left py-3 px-6 font-semibold text-black">Order ID</th>
                      <th className="text-left py-3 px-6 font-semibold text-black">Customer</th>
                      <th className="text-left py-3 px-6 font-semibold text-black">Items</th>
                      <th className="text-left py-3 px-6 font-semibold text-black">Total</th>
                      <th className="text-left py-3 px-6 font-semibold text-black">Status</th>
                      <th className="text-left py-3 px-6 font-semibold text-black">Time</th>
                      <th className="text-left py-3 px-6 font-semibold text-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.recentOrders.map((order) => (
                      <OrderRow key={order.id} order={order} />
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        );

      case "products":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black">Products Management</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Product</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black">Orders Management</h2>
              <div className="flex space-x-4">
                <button className="p-3 bg-white/90 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <Filter className="w-5 h-5 text-black" />
                </button>
                <button className="p-3 bg-white/90 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <Download className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary-light/20">
                      <th className="text-left py-3 px-6 font-semibold text-black">Order ID</th>
                      <th className="text-left py-3 px-6 font-semibold text-black">Customer</th>
                      <th className="text-left py-3 px-6 font-semibold text-black">Items</th>
                      <th className="text-left py-3 px-6 font-semibold text-black">Total</th>
                      <th className="text-left py-3 px-6 font-semibold text-black">Status</th>
                      <th className="text-left py-3 px-6 font-semibold text-black">Time</th>
                      <th className="text-left py-3 px-6 font-semibold text-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.recentOrders.map((order) => (
                      <OrderRow key={order.id} order={order} />
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        );

      case "reviews":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black">Customer Reviews</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockData.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-black">{review.customer}</h3>
                      <p className="text-black text-sm">{review.product}</p>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? "text-accent fill-accent" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-black mb-4">{review.comment}</p>
                  <p className="text-black text-sm">{review.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-20">
            <Coffee className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">Coming Soon</h3>
            <p className="text-black">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminPanel;