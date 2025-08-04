"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getAuthInstance } from "@/lib/firebase/config";
import { onAuthStateChanged, User as FirebaseAuthUser } from "firebase/auth";

interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: string[]; // Array of user IDs who liked the post
  timestamp: string;
}

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<FirebaseAuthUser | null>(null);
  const [following, setFollowing] = useState<string[]>([]); // IDs of users current user is following

  useEffect(() => {
    const initAuth = async () => {
      const authInstance = await getAuthInstance();
      if (!authInstance) return;
      
      const unsubscribeAuth = onAuthStateChanged(authInstance, (user) => {
        setCurrentUser(user);
      });
      return unsubscribeAuth;
    };
    
    let unsubscribe: (() => void) | undefined;
    initAuth().then((unsub) => {
      unsubscribe = unsub;
    });
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Load posts from localStorage
  useEffect(() => {
    const loadPosts = () => {
      try {
        const savedPosts = localStorage.getItem('brewbliss_posts');
        if (savedPosts) {
          const parsedPosts = JSON.parse(savedPosts);
          setPosts(parsedPosts);
        }
      } catch (error) {
        console.error("Error loading posts from localStorage:", error);
      }
    };

    loadPosts();
    
    // Listen for storage changes to update posts in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'brewbliss_posts') {
        loadPosts();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Load following status from localStorage
  useEffect(() => {
    if (currentUser) {
      try {
        const savedFollowing = localStorage.getItem(`brewbliss_following_${currentUser.uid}`);
        if (savedFollowing) {
          setFollowing(JSON.parse(savedFollowing));
        }
      } catch (error) {
        console.error("Error loading following status:", error);
      }
    } else {
      setFollowing([]);
    }
  }, [currentUser]);

  const handleLike = (postId: string) => {
    if (!currentUser) {
      console.log("User not logged in to like posts.");
      return;
    }

    try {
      setPosts(prevPosts => {
        const updatedPosts = prevPosts.map(post => {
          if (post.id === postId) {
            const hasLiked = post.likes.includes(currentUser.uid);
            return {
              ...post,
              likes: hasLiked
                ? post.likes.filter(id => id !== currentUser.uid)
                : [...post.likes, currentUser.uid],
            };
          }
          return post;
        });
        
        // Save to localStorage
        localStorage.setItem('brewbliss_posts', JSON.stringify(updatedPosts));
        return updatedPosts;
      });
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const handleFollow = (userIdToFollow: string) => {
    if (!currentUser) {
      console.log("User not logged in to follow.");
      return;
    }

    try {
      const isCurrentlyFollowing = following.includes(userIdToFollow);
      const updatedFollowing = isCurrentlyFollowing
        ? following.filter(id => id !== userIdToFollow)
        : [...following, userIdToFollow];
      
      setFollowing(updatedFollowing);
      localStorage.setItem(`brewbliss_following_${currentUser.uid}`, JSON.stringify(updatedFollowing));
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl md:text-5xl text-primary-dark mb-8 text-center"
        >
          Community Moments
        </motion.h1>

        <div className="space-y-8">
          {posts.map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-secondary-light rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={post.userAvatar || "/images/default-avatar.svg"} // Fallback avatar
                    alt={post.username}
                    width={40}
                    height={40}
                    className="rounded-full mr-3 object-cover"
                  />
                  <span className="font-body text-primary-dark font-semibold">
                    {post.username}
                  </span>
                </div>
                <span className="font-body text-primary-dark/60 text-sm">
                  {new Date(post.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="relative w-full h-96 bg-gray-200">
                <Image
                  src={post.imageUrl}
                  alt={post.caption}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-4">
                <p className="font-body text-primary-dark mb-3">
                  {post.caption}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center font-body text-primary-dark ${post.likes.includes(currentUser?.uid || "") ? "text-red-500" : "hover:text-red-500"}`}
                    >
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      {post.likes.length} Likes
                    </button>
                    <Link href={`/dashboard/${post.id}`} className="font-body text-primary-dark hover:text-accent">
                      View Comments (Simulated)
                    </Link>
                  </div>
                  {currentUser && post.userId !== currentUser.uid && (
                    <button
                      onClick={() => handleFollow(post.userId)}
                      className={`font-body px-3 py-1 rounded-full text-sm ${following.includes(post.userId) ? "bg-gray-300 text-gray-700" : "bg-accent text-primary-dark hover:bg-primary-dark hover:text-secondary-light"}`}
                    >
                      {following.includes(post.userId) ? "Following" : "Follow"}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}