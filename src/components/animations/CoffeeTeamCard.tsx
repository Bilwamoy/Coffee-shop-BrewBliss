"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  specialty: string;
  coffeeIcon: string;
  hoverColor: string;
}

interface CoffeeTeamCardProps {
  member: TeamMember;
  index: number;
  className?: string;
}

export default function CoffeeTeamCard({ member, index, className = '' }: CoffeeTeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -15, rotateY: 5, scale: 1.02 }}
      className={`group perspective-1000 ${className}`}
    >
      <div className="glass-morphism rounded-2xl overflow-hidden luxury-hover relative">
        {/* Coffee cup background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23654321' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Profile Image Section */}
        <div className="relative h-64 bg-gradient-to-br from-coffee-light to-coffee-dark flex items-center justify-center overflow-hidden">
          {/* Animated coffee icon */}
          <motion.div
            className={`w-32 h-32 bg-gradient-to-br ${member.hoverColor} rounded-full flex items-center justify-center shadow-xl relative z-10`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-5xl">{member.coffeeIcon}</span>
            
            {/* Pulsing ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5
              }}
            />
          </motion.div>
          
          {/* Steam effect */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-white rounded-full absolute opacity-60"
                style={{ left: `${i * 8}px` }}
                animate={{
                  y: [0, -30, -60],
                  opacity: [0.8, 0.4, 0],
                  scale: [1, 1.5, 2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Floating coffee beans */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-3 bg-gradient-to-br from-coffee-light to-coffee-dark rounded-full opacity-30"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + (i % 2) * 40}%`,
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </div>

          {/* Specialty badge overlay */}
          <div className="absolute top-4 right-4 bg-gradient-to-br from-accent/80 to-accent-dark/80 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-xs font-semibold text-coffee-dark">{member.specialty}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 relative z-10">
          <motion.h3 
            className="font-heading text-xl text-coffee-dark mb-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {member.name}
          </motion.h3>
          
          <p className="font-body text-accent font-semibold mb-3">{member.role}</p>
          <p className="font-body text-coffee-warm text-sm leading-relaxed mb-4">{member.bio}</p>
          
          {/* Interactive specialty showcase */}
          <motion.div 
            className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-accent/20 to-accent-dark/20 rounded-full group-hover:from-accent/30 group-hover:to-accent-dark/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xs font-semibold text-coffee-dark">{member.specialty}</span>
          </motion.div>

          {/* Coffee expertise indicators */}
          <div className="mt-4 flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-accent rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.1 + index * 0.2 }}
                whileHover={{ scale: 1.5 }}
              />
            ))}
          </div>
        </div>

        {/* Hover overlay with coffee theme */}
        <div className={`absolute inset-0 bg-gradient-to-br ${member.hoverColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Coffee bean particles on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-2 bg-coffee-dark rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
              }}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 360],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}