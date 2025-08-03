"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged, User as FirebaseAuthUser } from "firebase/auth";

interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: string[]; // Array of user IDs who liked the post
  timestamp: string; // Changed to string as it will come from API
}

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<FirebaseAuthUser | null>(null);
  const [following, setFollowing] = useState<string[]>([]); // IDs of users current user is following

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  // Fetch posts from API route
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
    // You might want to set up polling or websockets for real-time updates
    // For now, it fetches once on component mount.
  }, []);

  // Fetch following status for current user (from API route)
  useEffect(() => {
    const fetchFollowing = async () => {
      if (currentUser) {
        try {
          const idToken = await currentUser.getIdToken();
          const response = await fetch(`/api/users/${currentUser.uid}/follow`, {
            headers: {
              'Authorization': `Bearer ${idToken}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setFollowing(data.following || []);
          } else {
            console.error("Failed to fetch following status:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching following status:", error);
        }
      } else {
        setFollowing([]);
      }
    };
    fetchFollowing();
  }, [currentUser]);

  const handleLike = async (postId: string) => {
    if (!currentUser) {
      console.log("User not logged in to like posts.");
      return;
    }

    try {
      const idToken = await currentUser.getIdToken();
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ userId: currentUser.uid }),
      });

      if (response.ok) {
        // Optimistically update UI or refetch posts
        setPosts(prevPosts =>
          prevPosts.map(post => {
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
          })
        );
      } else {
        console.error("Failed to like/unlike post:", response.statusText);
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const handleFollow = async (userIdToFollow: string) => {
    if (!currentUser) {
      console.log("User not logged in to follow.");
      return;
    }

    try {
      const idToken = await currentUser.getIdToken();
      const isCurrentlyFollowing = following.includes(userIdToFollow);
      const method = isCurrentlyFollowing ? 'DELETE' : 'POST';

      const response = await fetch(`/api/users/${userIdToFollow}/follow`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ followerId: currentUser.uid }),
      });

      if (response.ok) {
        // Optimistically update UI
        if (isCurrentlyFollowing) {
          setFollowing(prev => prev.filter(id => id !== userIdToFollow));
        } else {
          setFollowing(prev => [...prev, userIdToFollow]);
        }
      } else {
        console.error("Failed to follow/unfollow user:", response.statusText);
      }
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
                    src={post.userAvatar || "/images/default-avatar.png"} // Fallback avatar
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