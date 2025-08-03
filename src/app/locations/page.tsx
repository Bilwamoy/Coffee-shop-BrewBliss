"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { locationData } from "@/lib/locationData";

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl md:text-5xl text-primary-dark text-center mb-12"
        >
          Our Locations
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locationData.map((location) => (
            <Link key={location.id} href={`/locations/${location.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-secondary-light rounded-lg shadow-lg p-6 cursor-pointer h-full"
              >
                <h3 className="font-heading text-xl text-primary-dark mb-2">
                  {location.name}
                </h3>
                <p className="font-body text-primary-dark/80 mb-2">
                  {location.address}
                </p>
                <p className="font-body text-primary-dark/80 mb-2">
                  Hours: {location.hours}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
