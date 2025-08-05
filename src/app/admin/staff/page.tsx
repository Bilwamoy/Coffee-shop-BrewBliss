"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Users, 
  UserPlus, 
  Calendar, 
  Clock, 
  Star,
  Award,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  Eye,
  Coffee,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  BarChart3
} from "lucide-react";

const StaffPage = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock staff data
  const staffMembers = [
    {
      id: 1,
      name: "Elena Rodriguez",
      role: "Head Barista",
      avatar: "👩‍💼",
      email: "elena@brewbliss.com",
      phone: "(555) 123-4567",
      address: "123 Coffee St, Seattle, WA",
      hireDate: "2022-03-15",
      salary: 55000,
      status: "active",
      performance: 4.8,
      hoursThisWeek: 38,
      totalHours: 1840,
      skills: ["Latte Art", "Coffee Cupping", "Team Leadership", "Customer Service"],
      certifications: ["Barista Level 3", "Coffee Quality Institute"],
      schedule: {
        monday: "6:00 AM - 2:00 PM",
        tuesday: "6:00 AM - 2:00 PM",
        wednesday: "Off",
        thursday: "6:00 AM - 2:00 PM",
        friday: "6:00 AM - 2:00 PM",
        saturday: "7:00 AM - 3:00 PM",
        sunday: "Off"
      },
      recentActivity: [
        { date: "2024-01-15", action: "Completed Latte Art Workshop", type: "training" },
        { date: "2024-01-14", action: "Received 5-star customer review", type: "achievement" },
        { date: "2024-01-13", action: "Mentored new barista", type: "mentoring" }
      ]
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Senior Barista",
      avatar: "👨‍🍳",
      email: "marcus@brewbliss.com",
      phone: "(555) 234-5678",
      address: "456 Bean Ave, Seattle, WA",
      hireDate: "2022-08-20",
      salary: 48000,
      status: "active",
      performance: 4.6,
      hoursThisWeek: 40,
      totalHours: 1520,
      skills: ["Espresso Mastery", "Equipment Maintenance", "Inventory Management"],
      certifications: ["Barista Level 2", "Food Safety"],
      schedule: {
        monday: "2:00 PM - 10:00 PM",
        tuesday: "2:00 PM - 10:00 PM",
        wednesday: "2:00 PM - 10:00 PM",
        thursday: "Off",
        friday: "2:00 PM - 10:00 PM",
        saturday: "Off",
        sunday: "10:00 AM - 6:00 PM"
      },
      recentActivity: [
        { date: "2024-01-15", action: "Fixed espresso machine", type: "maintenance" },
        { date: "2024-01-14", action: "Completed inventory count", type: "task" },
        { date: "2024-01-12", action: "Customer complaint resolved", type: "service" }
      ]
    },
    {
      id: 3,
      name: "Sarah Kim",
      role: "Barista",
      avatar: "👩‍🎓",
      email: "sarah@brewbliss.com",
      phone: "(555) 345-6789",
      address: "789 Roast Rd, Seattle, WA",
      hireDate: "2023-06-10",
      salary: 42000,
      status: "active",
      performance: 4.4,
      hoursThisWeek: 35,
      totalHours: 980,
      skills: ["Customer Service", "Cash Handling", "Basic Latte Art"],
      certifications: ["Barista Level 1", "Food Safety"],
      schedule: {
        monday: "10:00 AM - 6:00 PM",
        tuesday: "Off",
        wednesday: "10:00 AM - 6:00 PM",
        thursday: "10:00 AM - 6:00 PM",
        friday: "Off",
        saturday: "8:00 AM - 4:00 PM",
        sunday: "8:00 AM - 4:00 PM"
      },
      recentActivity: [
        { date: "2024-01-15", action: "Started Advanced Latte Art course", type: "training" },
        { date: "2024-01-13", action: "Handled busy morning rush", type: "achievement" },
        { date: "2024-01-11", action: "Perfect attendance this month", type: "achievement" }
      ]
    },
    {
      id: 4,
      name: "David Park",
      role: "Assistant Manager",
      avatar: "👨‍💻",
      email: "david@brewbliss.com",
      phone: "(555) 456-7890",
      address: "321 Brew Blvd, Seattle, WA",
      hireDate: "2021-11-05",
      salary: 62000,
      status: "active",
      performance: 4.9,
      hoursThisWeek: 42,
      totalHours: 2240,
      skills: ["Management", "Staff Training", "Financial Planning", "Customer Relations"],
      certifications: ["Management Certificate", "Barista Level 3", "First Aid"],
      schedule: {
        monday: "8:00 AM - 4:00 PM",
        tuesday: "8:00 AM - 4:00 PM",
        wednesday: "8:00 AM - 4:00 PM",
        thursday: "8:00 AM - 4:00 PM",
        friday: "8:00 AM - 4:00 PM",
        saturday: "Off",
        sunday: "Off"
      },
      recentActivity: [
        { date: "2024-01-15", action: "Conducted staff meeting", type: "management" },
        { date: "2024-01-14", action: "Reviewed monthly performance", type: "management" },
        { date: "2024-01-13", action: "Approved vacation requests", type: "management" }
      ]
    }
  ];

  const tabs = [
    { id: "overview", name: "Overview" },
    { id: "schedule", name: "Schedule" },
    { id: "performance", name: "Performance" },
    { id: "payroll", name: "Payroll" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-100";
      case "inactive": return "text-red-600 bg-red-100";
      case "on_leave": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "training": return <Award className="w-4 h-4 text-blue-600" />;
      case "achievement": return <Star className="w-4 h-4 text-yellow-600" />;
      case "maintenance": return <Coffee className="w-4 h-4 text-orange-600" />;
      case "management": return <Users className="w-4 h-4 text-purple-600" />;
      default: return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  const StaffCard = ({ staff }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{staff.avatar}</div>
          <div>
            <h3 className="font-bold text-black text-lg">{staff.name}</h3>
            <p className="text-black">{staff.role}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-black">{staff.performance}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedStaff(staff)}
            className="p-2 text-black hover:text-accent transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-black hover:text-accent transition-colors">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-black">
          <Mail className="w-4 h-4" />
          <span>{staff.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-black">
          <Phone className="w-4 h-4" />
          <span>{staff.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-black">
          <Calendar className="w-4 h-4" />
          <span>Hired: {staff.hireDate}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-black">
          <Clock className="w-4 h-4" />
          <span>This week: {staff.hoursThisWeek}h</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {staff.skills.slice(0, 3).map((skill: string, index: number) => (
          <span key={index} className="px-2 py-1 bg-accent/20 text-accent-dark text-xs rounded-full">
            {skill}
          </span>
        ))}
        {staff.skills.length > 3 && (
          <span className="px-2 py-1 bg-primary-light/20 text-black text-xs rounded-full">
            +{staff.skills.length - 3} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(staff.status)}`}>
          {staff.status.toUpperCase()}
        </span>
        <span className="text-black font-semibold">
          ${staff.salary.toLocaleString()}/year
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

  const renderTabContent = () => {
    switch (selectedTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffMembers.map((staff) => (
              <StaffCard key={staff.id} staff={staff} />
            ))}
          </div>
        );

      case "schedule":
        return (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-black mb-6">Weekly Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary-light/20">
                    <th className="text-left py-3 px-4 font-semibold text-black">Staff Member</th>
                    <th className="text-left py-3 px-4 font-semibold text-black">Monday</th>
                    <th className="text-left py-3 px-4 font-semibold text-black">Tuesday</th>
                    <th className="text-left py-3 px-4 font-semibold text-black">Wednesday</th>
                    <th className="text-left py-3 px-4 font-semibold text-black">Thursday</th>
                    <th className="text-left py-3 px-4 font-semibold text-black">Friday</th>
                    <th className="text-left py-3 px-4 font-semibold text-black">Saturday</th>
                    <th className="text-left py-3 px-4 font-semibold text-black">Sunday</th>
                  </tr>
                </thead>
                <tbody>
                  {staffMembers.map((staff) => (
                    <motion.tr
                      key={staff.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border-b border-primary-light/10 hover:bg-primary-light/5"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{staff.avatar}</span>
                          <div>
                            <p className="font-semibold text-black">{staff.name}</p>
                            <p className="text-sm text-black">{staff.role}</p>
                          </div>
                        </div>
                      </td>
                      {Object.entries(staff.schedule).map(([day, time]) => (
                        <td key={day} className="py-4 px-4 text-sm text-black">
                          {time === "Off" ? (
                            <span className="text-red-600 font-semibold">Off</span>
                          ) : (
                            <span className="text-black">{time}</span>
                          )}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "performance":
        return (
          <div className="space-y-6">
            {staffMembers.map((staff) => (
              <motion.div
                key={staff.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{staff.avatar}</span>
                    <div>
                      <h3 className="font-bold text-black text-lg">{staff.name}</h3>
                      <p className="text-black">{staff.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xl font-bold text-black">{staff.performance}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-100 rounded-xl">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="text-2xl font-bold text-blue-800">{staff.totalHours}</h4>
                    <p className="text-blue-600 text-sm">Total Hours</p>
                  </div>
                  <div className="text-center p-4 bg-green-100 rounded-xl">
                    <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="text-2xl font-bold text-green-800">{staff.certifications.length}</h4>
                    <p className="text-green-600 text-sm">Certifications</p>
                  </div>
                  <div className="text-center p-4 bg-purple-100 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="text-2xl font-bold text-purple-800">{staff.skills.length}</h4>
                    <p className="text-purple-600 text-sm">Skills</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-black mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    {staff.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-primary-light/10 rounded-lg">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-black font-medium">{activity.action}</p>
                          <p className="text-black text-sm">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case "payroll":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatsCard
                title="Total Payroll"
                value={`$${staffMembers.reduce((sum, staff) => sum + staff.salary, 0).toLocaleString()}`}
                icon={DollarSign}
                color="bg-green-500"
                subtitle="Annual salaries"
              />
              <StatsCard
                title="Average Salary"
                value={`$${Math.round(staffMembers.reduce((sum, staff) => sum + staff.salary, 0) / staffMembers.length).toLocaleString()}`}
                icon={BarChart3}
                color="bg-blue-500"
                subtitle="Per employee"
              />
              <StatsCard
                title="Total Hours"
                value={staffMembers.reduce((sum, staff) => sum + staff.hoursThisWeek, 0)}
                icon={Clock}
                color="bg-purple-500"
                subtitle="This week"
              />
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-black mb-6">Payroll Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary-light/20">
                      <th className="text-left py-3 px-4 font-semibold text-black">Employee</th>
                      <th className="text-left py-3 px-4 font-semibold text-black">Role</th>
                      <th className="text-left py-3 px-4 font-semibold text-black">Annual Salary</th>
                      <th className="text-left py-3 px-4 font-semibold text-black">Hours This Week</th>
                      <th className="text-left py-3 px-4 font-semibold text-black">Weekly Pay</th>
                      <th className="text-left py-3 px-4 font-semibold text-black">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffMembers.map((staff) => (
                      <motion.tr
                        key={staff.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border-b border-primary-light/10 hover:bg-primary-light/5"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{staff.avatar}</span>
                            <span className="font-semibold text-black">{staff.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-black">{staff.role}</td>
                        <td className="py-4 px-4 font-semibold text-black">
                          ${staff.salary.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-black">{staff.hoursThisWeek}h</td>
                        <td className="py-4 px-4 font-semibold text-black">
                          ${Math.round((staff.salary / 52) * (staff.hoursThisWeek / 40)).toLocaleString()}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(staff.status)}`}>
                            {staff.status.toUpperCase()}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
              <h1 className="text-3xl font-bold text-black mb-2">Staff Management</h1>
              <p className="text-black">Manage your coffee shop team</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="bg-accent text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>Add Staff Member</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Staff"
            value={staffMembers.length}
            icon={Users}
            color="bg-blue-500"
            subtitle="Active employees"
          />
          <StatsCard
            title="Avg Performance"
            value={(staffMembers.reduce((sum, staff) => sum + staff.performance, 0) / staffMembers.length).toFixed(1)}
            icon={Star}
            color="bg-yellow-500"
            subtitle="Out of 5.0"
          />
          <StatsCard
            title="Total Hours"
            value={staffMembers.reduce((sum, staff) => sum + staff.hoursThisWeek, 0)}
            icon={Clock}
            color="bg-green-500"
            subtitle="This week"
          />
          <StatsCard
            title="Monthly Payroll"
            value={`$${Math.round(staffMembers.reduce((sum, staff) => sum + staff.salary, 0) / 12).toLocaleString()}`}
            icon={DollarSign}
            color="bg-purple-500"
            subtitle="Estimated"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedTab === tab.id
                  ? "bg-accent text-black shadow-lg"
                  : "bg-white/80 text-black hover:bg-white"
              }`}
            >
              {tab.name}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StaffPage;