"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Coffee,
  Calendar,
  Clock,
  MapPin,
  Star,
  Activity,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  // Mock analytics data
  const analyticsData = {
    revenue: {
      current: 125430,
      previous: 108920,
      change: 15.2,
      trend: "up",
      data: [85000, 92000, 88000, 95000, 102000, 108920, 125430]
    },
    orders: {
      current: 1247,
      previous: 1089,
      change: 14.5,
      trend: "up",
      data: [850, 920, 880, 950, 1020, 1089, 1247]
    },
    customers: {
      current: 892,
      previous: 834,
      change: 7.0,
      trend: "up",
      data: [720, 750, 780, 810, 825, 834, 892]
    },
    avgOrderValue: {
      current: 18.45,
      previous: 16.80,
      change: 9.8,
      trend: "up",
      data: [15.2, 15.8, 16.1, 16.5, 17.2, 16.8, 18.45]
    }
  };

  const topProducts = [
    { name: "Ethiopian Single Origin", sales: 234, revenue: 5845.66, growth: 12.5 },
    { name: "Vanilla Latte", sales: 456, revenue: 2508.00, growth: 8.3 },
    { name: "Cold Brew", sales: 345, revenue: 1638.75, growth: -2.1 },
    { name: "Cappuccino", sales: 289, revenue: 1589.95, growth: 15.7 },
    { name: "Almond Croissant", sales: 189, revenue: 803.25, growth: 5.4 }
  ];

  const customerInsights = {
    newCustomers: 156,
    returningCustomers: 736,
    customerRetention: 82.5,
    avgVisitsPerMonth: 4.2,
    peakHours: [
      { hour: "7-8 AM", orders: 89 },
      { hour: "12-1 PM", orders: 156 },
      { hour: "3-4 PM", orders: 134 },
      { hour: "7-8 PM", orders: 98 }
    ]
  };

  const MetricCard = ({ title, current, previous, change, trend, icon: Icon, color }: any) => (
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
        <div className="flex items-center space-x-1">
          {trend === "up" ? (
            <TrendingUp className="w-4 h-4 text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
          <span className={`text-sm font-semibold ${trend === "up" ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-black mb-1">
        {typeof current === 'number' && current > 1000 ? current.toLocaleString() : current}
      </h3>
      <p className="text-black text-sm mb-2">{title}</p>
      <p className="text-xs text-black/70">
        vs. previous period: {typeof previous === 'number' && previous > 1000 ? previous.toLocaleString() : previous}
      </p>
    </motion.div>
  );

  const ChartContainer = ({ title, children }: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold text-black mb-6">{title}</h3>
      {children}
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
              <h1 className="text-3xl font-bold text-black mb-2">Analytics Dashboard</h1>
              <p className="text-black">Comprehensive insights into your coffee shop performance</p>
            </div>
            
            <div className="flex space-x-4">
              {["24h", "7d", "30d", "90d"].map((range) => (
                <motion.button
                  key={range}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                    timeRange === range
                      ? "bg-accent text-black shadow-lg"
                      : "bg-white/80 text-black hover:bg-white"
                  }`}
                >
                  {range}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            current={`$${analyticsData.revenue.current.toLocaleString()}`}
            previous={`$${analyticsData.revenue.previous.toLocaleString()}`}
            change={analyticsData.revenue.change}
            trend={analyticsData.revenue.trend}
            icon={DollarSign}
            color="bg-green-500"
          />
          <MetricCard
            title="Total Orders"
            current={analyticsData.orders.current}
            previous={analyticsData.orders.previous}
            change={analyticsData.orders.change}
            trend={analyticsData.orders.trend}
            icon={ShoppingCart}
            color="bg-blue-500"
          />
          <MetricCard
            title="Active Customers"
            current={analyticsData.customers.current}
            previous={analyticsData.customers.previous}
            change={analyticsData.customers.change}
            trend={analyticsData.customers.trend}
            icon={Users}
            color="bg-purple-500"
          />
          <MetricCard
            title="Avg Order Value"
            current={`$${analyticsData.avgOrderValue.current}`}
            previous={`$${analyticsData.avgOrderValue.previous}`}
            change={analyticsData.avgOrderValue.change}
            trend={analyticsData.avgOrderValue.trend}
            icon={TrendingUp}
            color="bg-orange-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartContainer title="Revenue Trend">
            <div className="h-64 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <LineChart className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <p className="text-black">Revenue Chart Component</p>
                <p className="text-sm text-black/70 mt-2">
                  {analyticsData.revenue.change > 0 ? '↗' : '↘'} {analyticsData.revenue.change}% vs last period
                </p>
              </div>
            </div>
          </ChartContainer>

          <ChartContainer title="Order Distribution">
            <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <p className="text-black">Order Distribution Chart</p>
                <p className="text-sm text-black/70 mt-2">
                  Beverages: 65% | Food: 25% | Retail: 10%
                </p>
              </div>
            </div>
          </ChartContainer>
        </div>

        {/* Top Products & Customer Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartContainer title="Top Performing Products">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-primary-light/10 rounded-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                      <Coffee className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">{product.name}</h4>
                      <p className="text-sm text-black">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-black">${product.revenue}</p>
                    <p className={`text-sm ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.growth >= 0 ? '+' : ''}{product.growth}%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ChartContainer>

          <ChartContainer title="Customer Insights">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-100 rounded-xl">
                  <h4 className="text-2xl font-bold text-green-800">{customerInsights.newCustomers}</h4>
                  <p className="text-green-600 text-sm">New Customers</p>
                </div>
                <div className="text-center p-4 bg-blue-100 rounded-xl">
                  <h4 className="text-2xl font-bold text-blue-800">{customerInsights.returningCustomers}</h4>
                  <p className="text-blue-600 text-sm">Returning</p>
                </div>
              </div>
              
              <div className="p-4 bg-purple-100 rounded-xl">
                <h4 className="font-semibold text-purple-800 mb-2">Peak Hours</h4>
                <div className="space-y-2">
                  {customerInsights.peakHours.map((hour, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-purple-700 text-sm">{hour.hour}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-purple-200 rounded-full">
                          <div 
                            className="h-2 bg-purple-600 rounded-full"
                            style={{ width: `${(hour.orders / 156) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-purple-800 text-sm font-semibold">{hour.orders}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-orange-100 rounded-xl">
                  <h4 className="text-xl font-bold text-orange-800">{customerInsights.customerRetention}%</h4>
                  <p className="text-orange-600 text-sm">Retention Rate</p>
                </div>
                <div className="text-center p-4 bg-teal-100 rounded-xl">
                  <h4 className="text-xl font-bold text-teal-800">{customerInsights.avgVisitsPerMonth}</h4>
                  <p className="text-teal-600 text-sm">Avg Visits/Month</p>
                </div>
              </div>
            </div>
          </ChartContainer>
        </div>

        {/* Real-time Activity */}
        <ChartContainer title="Real-time Activity">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-6 bg-gradient-to-br from-green-100 to-green-50 rounded-xl"
            >
              <Activity className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-green-800 mb-2">23</h4>
              <p className="text-green-600">Active Orders</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl"
            >
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-blue-800 mb-2">47</h4>
              <p className="text-blue-600">Customers Online</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl"
            >
              <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-2xl font-bold text-purple-800 mb-2">3.2m</h4>
              <p className="text-purple-600">Avg Wait Time</p>
            </motion.div>
          </div>
        </ChartContainer>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;