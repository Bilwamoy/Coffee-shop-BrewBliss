"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface Order {
  id: string;
  date: string;
  items: number;
  total: number;
  status: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "");
        setEmail(currentUser.email || "");
        
        // Fetch user profile data from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setPhone(userData.phone || "");
            
            // Simulate order history
            const mockOrders: Order[] = [
              { id: "1", date: "2023-05-15", items: 3, total: 12.50, status: "Delivered" },
              { id: "2", date: "2023-05-20", items: 2, total: 8.75, status: "Processing" },
              { id: "3", date: "2023-06-01", items: 1, total: 4.99, status: "Delivered" },
            ];
            setOrders(mockOrders);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      await updateProfile(user, { displayName: name });
      await updateDoc(doc(db, "users", user.uid), { phone });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary-light rounded-lg shadow-lg p-8 h-64 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-secondary-light rounded-lg shadow-lg p-12"
          >
            <h2 className="font-heading text-2xl text-primary-dark mb-4">
              Please Sign In
            </h2>
            <p className="font-body text-primary-dark/80 mb-8">
              You need to be signed in to view your profile.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => window.location.href = '/auth/signin'}
                className="font-body bg-primary-dark text-secondary-light px-6 py-3 rounded-lg hover:bg-accent transition-colors duration-300 text-lg font-semibold"
              >
                Sign In
              </button>
              <button 
                onClick={() => window.location.href = '/auth/signup'}
                className="font-body border-2 border-primary-dark text-primary-dark px-6 py-3 rounded-lg hover:bg-primary-dark hover:text-secondary-light transition-colors duration-300 text-lg font-semibold"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl text-primary-dark text-center mb-8"
        >
          Your Profile
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-secondary-light rounded-lg shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-primary-dark text-secondary-light p-6">
            <h2 className="font-heading text-2xl">Account Information</h2>
          </div>
          
          <div className="p-6">
            {editMode ? (
              <div className="space-y-6">
                <div>
                  <label className="font-body block text-primary-dark mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="font-body w-full px-4 py-2 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                
                <div>
                  <label className="font-body block text-primary-dark mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="font-body w-full px-4 py-2 border border-secondary-dark rounded-lg bg-gray-100"
                  />
                </div>
                
                <div>
                  <label className="font-body block text-primary-dark mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="font-body w-full px-4 py-2 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="font-body bg-primary-dark text-secondary-light px-6 py-2 rounded-lg hover:bg-accent transition-colors duration-300 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="font-body border-2 border-primary-dark text-primary-dark px-6 py-2 rounded-lg hover:bg-primary-dark hover:text-secondary-light transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="font-body">
                  <p className="text-primary-dark/60">Full Name</p>
                  <p className="text-primary-dark text-lg">{name || "Not set"}</p>
                </div>
                
                <div className="font-body">
                  <p className="text-primary-dark/60">Email Address</p>
                  <p className="text-primary-dark text-lg">{email}</p>
                </div>
                
                <div className="font-body">
                  <p className="text-primary-dark/60">Phone Number</p>
                  <p className="text-primary-dark text-lg">{phone || "Not set"}</p>
                </div>
                
                <button
                  onClick={() => setEditMode(true)}
                  className="font-body bg-accent text-primary-dark px-6 py-2 rounded-lg hover:bg-secondary-dark transition-colors duration-300 mt-4"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-secondary-light rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-primary-dark text-secondary-light p-6">
            <h2 className="font-heading text-2xl">Order History</h2>
          </div>
          
          <div className="divide-y divide-secondary-dark">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="font-heading text-primary-dark font-semibold">
                      Order #{order.id}
                    </p>
                    <p className="font-body text-primary-dark/80">
                      {order.date} • {order.items} items
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="font-body text-primary-dark font-semibold">
                      ${order.total.toFixed(2)}
                    </p>
                    <span className={`font-body px-3 py-1 rounded-full text-sm ${
                      order.status === "Delivered" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="font-body text-primary-dark/80">
                  You haven't placed any orders yet.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
