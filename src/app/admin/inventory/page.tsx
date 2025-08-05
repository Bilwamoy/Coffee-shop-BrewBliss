"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  Coffee,
  Wheat,
  Milk,
  Cookie,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock inventory data
  const inventoryItems = [
    {
      id: 1,
      name: "Ethiopian Single Origin Beans",
      category: "coffee",
      sku: "ETH-001",
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      unit: "lbs",
      costPerUnit: 12.50,
      sellPrice: 24.99,
      supplier: "Highland Coffee Co.",
      lastRestocked: "2024-01-10",
      status: "in_stock",
      trend: "stable",
      weeklyUsage: 8.5
    },
    {
      id: 2,
      name: "Whole Milk",
      category: "dairy",
      sku: "MLK-001",
      currentStock: 5,
      minStock: 10,
      maxStock: 50,
      unit: "gallons",
      costPerUnit: 3.25,
      sellPrice: 0, // Not sold directly
      supplier: "Local Dairy Farm",
      lastRestocked: "2024-01-12",
      status: "low_stock",
      trend: "decreasing",
      weeklyUsage: 15.2
    },
    {
      id: 3,
      name: "Almond Flour",
      category: "baking",
      sku: "ALM-001",
      currentStock: 0,
      minStock: 5,
      maxStock: 25,
      unit: "lbs",
      costPerUnit: 8.75,
      sellPrice: 0,
      supplier: "Organic Supplies Inc.",
      lastRestocked: "2024-01-05",
      status: "out_of_stock",
      trend: "critical",
      weeklyUsage: 3.2
    },
    {
      id: 4,
      name: "Colombian Medium Roast",
      category: "coffee",
      sku: "COL-001",
      currentStock: 78,
      minStock: 30,
      maxStock: 120,
      unit: "lbs",
      costPerUnit: 10.25,
      sellPrice: 22.99,
      supplier: "Mountain Coffee Roasters",
      lastRestocked: "2024-01-08",
      status: "in_stock",
      trend: "increasing",
      weeklyUsage: 12.1
    },
    {
      id: 5,
      name: "Vanilla Syrup",
      category: "syrups",
      sku: "VAN-001",
      currentStock: 12,
      minStock: 8,
      maxStock: 40,
      unit: "bottles",
      costPerUnit: 4.50,
      sellPrice: 0,
      supplier: "Flavor Masters",
      lastRestocked: "2024-01-11",
      status: "in_stock",
      trend: "stable",
      weeklyUsage: 2.8
    },
    {
      id: 6,
      name: "Croissants (Frozen)",
      category: "pastries",
      sku: "CRO-001",
      currentStock: 24,
      minStock: 15,
      maxStock: 60,
      unit: "pieces",
      costPerUnit: 1.25,
      sellPrice: 4.25,
      supplier: "French Bakery Supply",
      lastRestocked: "2024-01-13",
      status: "in_stock",
      trend: "stable",
      weeklyUsage: 18.5
    }
  ];

  const categories = [
    { id: "all", name: "All Items", icon: Package },
    { id: "coffee", name: "Coffee Beans", icon: Coffee },
    { id: "dairy", name: "Dairy Products", icon: Milk },
    { id: "baking", name: "Baking Supplies", icon: Wheat },
    { id: "syrups", name: "Syrups & Flavors", icon: Cookie },
    { id: "pastries", name: "Pastries", icon: Cookie }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock": return "text-green-600 bg-green-100";
      case "low_stock": return "text-yellow-600 bg-yellow-100";
      case "out_of_stock": return "text-red-600 bg-red-100";
      default: return "text-black bg-gray-100";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing": return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "decreasing": return <TrendingDown className="w-4 h-4 text-red-600" />;
      case "critical": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventoryItems.filter(item => item.status === "low_stock" || item.status === "out_of_stock");
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);

  const InventoryCard = ({ item }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-bold text-black">{item.name}</h3>
            {getTrendIcon(item.trend)}
          </div>
          <p className="text-black text-sm mb-1">SKU: {item.sku}</p>
          <p className="text-black text-sm">Supplier: {item.supplier}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedItem(item)}
            className="p-2 text-black hover:text-accent transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-black hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-black">Current Stock:</span>
          <span className="font-semibold text-black">
            {item.currentStock} {item.unit}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-black">Min/Max:</span>
          <span className="text-black">
            {item.minStock}/{item.maxStock} {item.unit}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-black">Cost per Unit:</span>
          <span className="font-semibold text-black">${item.costPerUnit}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-black">Weekly Usage:</span>
          <span className="text-black">{item.weeklyUsage} {item.unit}</span>
        </div>
      </div>

      {/* Stock Level Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-black mb-1">
          <span>Stock Level</span>
          <span>{Math.round((item.currentStock / item.maxStock) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(item.currentStock / item.maxStock) * 100}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-2 rounded-full ${
              item.currentStock <= item.minStock 
                ? 'bg-red-500' 
                : item.currentStock <= item.minStock * 1.5 
                ? 'bg-yellow-500' 
                : 'bg-green-500'
            }`}
          ></motion.div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
          {item.status.replace('_', ' ').toUpperCase()}
        </span>
        <span className="text-black text-sm">
          Last restocked: {item.lastRestocked}
        </span>
      </div>
    </motion.div>
  );

  const StatsCard = ({ title, value, icon: Icon, color, subtitle }: any) => (
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
      <p className="text-black text-sm mb-1">{title}</p>
      {subtitle && <p className="text-black/70 text-xs">{subtitle}</p>}
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
              <h1 className="text-3xl font-bold text-black mb-2">Inventory Management</h1>
              <p className="text-black">Track and manage your coffee shop inventory</p>
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
                <Upload className="w-5 h-5 text-black" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
                className="bg-accent text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Item</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Items"
            value={inventoryItems.length}
            icon={Package}
            color="bg-blue-500"
            subtitle="Active inventory items"
          />
          <StatsCard
            title="Low Stock Alerts"
            value={lowStockItems.length}
            icon={AlertTriangle}
            color="bg-red-500"
            subtitle="Items need restocking"
          />
          <StatsCard
            title="Total Value"
            value={`$${totalValue.toLocaleString()}`}
            icon={BarChart3}
            color="bg-green-500"
            subtitle="Current inventory value"
          />
          <StatsCard
            title="Categories"
            value={categories.length - 1}
            icon={Coffee}
            color="bg-purple-500"
            subtitle="Product categories"
          />
        </div>

        {/* Search and Filters */}
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
                placeholder="Search items by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/80 border border-primary-light/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-black"
              />
            </div>
            
            <div className="flex space-x-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? "bg-accent text-black shadow-lg"
                      : "bg-white/80 text-black hover:bg-white"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="hidden md:inline">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Low Stock Alerts */}
        {lowStockItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-bold text-red-800">Low Stock Alerts</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-4 border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-1">{item.name}</h4>
                  <p className="text-red-600 text-sm mb-2">
                    Current: {item.currentStock} {item.unit} (Min: {item.minStock})
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                  >
                    Restock Now
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <InventoryCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Package className="w-16 h-16 text-black/50 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">No items found</h3>
            <p className="text-black">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default InventoryPage;