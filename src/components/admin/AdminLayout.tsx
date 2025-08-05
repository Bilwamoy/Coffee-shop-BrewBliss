"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Coffee, 
  BarChart3, 
  Package, 
  Users, 
  ShoppingCart,
  MessageSquare,
  Settings,
  Bell,
  Search,
  RefreshCw,
  Home,
  Calendar,
  TrendingUp,
  UserCheck,
  Warehouse,
  Mail
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigationItems = [
    { 
      id: "dashboard", 
      name: "Dashboard", 
      icon: BarChart3, 
      href: "/admin",
      description: "Overview & Analytics"
    },
    { 
      id: "orders", 
      name: "Orders", 
      icon: ShoppingCart, 
      href: "/admin/orders",
      description: "Manage Orders"
    },
    { 
      id: "products", 
      name: "Products", 
      icon: Package, 
      href: "/admin/products",
      description: "Product Catalog"
    },
    { 
      id: "inventory", 
      name: "Inventory", 
      icon: Warehouse, 
      href: "/admin/inventory",
      description: "Stock Management"
    },
    { 
      id: "staff", 
      name: "Staff", 
      icon: Users, 
      href: "/admin/staff",
      description: "Team Management"
    },
    { 
      id: "customers", 
      name: "Customers", 
      icon: UserCheck, 
      href: "/admin/customers",
      description: "Customer Database"
    },
    { 
      id: "analytics", 
      name: "Analytics", 
      icon: TrendingUp, 
      href: "/admin/analytics",
      description: "Detailed Reports"
    },
    { 
      id: "reviews", 
      name: "Reviews", 
      icon: MessageSquare, 
      href: "/admin/reviews",
      description: "Customer Feedback"
    },
    { 
      id: "messages", 
      name: "Messages", 
      icon: Mail, 
      href: "/admin/messages",
      description: "Contact Messages"
    },
    { 
      id: "events", 
      name: "Events", 
      icon: Calendar, 
      href: "/admin/events",
      description: "Event Management"
    },
    { 
      id: "settings", 
      name: "Settings", 
      icon: Settings, 
      href: "/admin/settings",
      description: "System Configuration"
    }
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-light to-cream">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-primary-light/20 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-3 bg-accent rounded-xl"
                >
                  <Coffee className="w-8 h-8 text-black" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-black">Brew & Bliss Admin</h1>
                  <p className="text-black">Coffee Shop Management</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/80 border border-primary-light/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-black"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Bell className="w-6 h-6 text-black" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLoading(!isLoading)}
                className="p-3 bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <RefreshCw className={`w-6 h-6 text-black ${isLoading ? 'animate-spin' : ''}`} />
              </motion.button>

              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Home className="w-6 h-6 text-black" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 bg-white/90 backdrop-blur-sm shadow-lg min-h-screen border-r border-primary-light/20 sticky top-[88px] overflow-y-auto"
          style={{ height: 'calc(100vh - 88px)' }}
        >
          <nav className="p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 group ${
                      isActive(item.href)
                        ? "bg-accent text-black shadow-lg"
                        : "text-black hover:bg-primary-light/20"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isActive(item.href) 
                        ? "bg-primary-dark/20" 
                        : "bg-accent/20 group-hover:bg-accent/30"
                    }`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{item.name}</div>
                      <div className={`text-xs ${
                        isActive(item.href) 
                          ? "text-black/70" 
                          : "text-black/70"
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Quick Stats in Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-4 bg-gradient-to-br from-accent/20 to-primary-light/20 rounded-xl"
            >
              <h3 className="font-bold text-black mb-3">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-black">Today's Orders:</span>
                  <span className="font-semibold text-black">47</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black">Revenue:</span>
                  <span className="font-semibold text-black">$1,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black">Active Staff:</span>
                  <span className="font-semibold text-black">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black">Low Stock Items:</span>
                  <span className="font-semibold text-red-600">3</span>
                </div>
              </div>
            </motion.div>

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 p-4 bg-green-100 rounded-xl"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 font-semibold text-sm">System Status</span>
              </div>
              <p className="text-green-700 text-xs">All systems operational</p>
              <p className="text-green-600 text-xs">Last updated: Just now</p>
            </motion.div>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;