"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { getAuthInstance } from "@/lib/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";

export default function PostSelfiePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const authInstance = await getAuthInstance();
      if (!authInstance) return;
      
      const unsubscribe = onAuthStateChanged(authInstance, (user) => {
        setCurrentUser(user);
      });
      return unsubscribe;
    };
    
    let unsubscribe: (() => void) | undefined;
    initAuth().then((unsub) => {
      unsubscribe = unsub;
    });
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({
      video: { width: 720, height: 720 }
    })
    .then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    })
    .catch(err => {
      console.error("Error accessing camera: ", err);
      setMessage({ type: "error", text: "Could not access camera. Please ensure you have granted permissions." });
    });
  };

  const takePhoto = () => {
    const width = 720;
    const height = 720;

    if (photoRef.current && videoRef.current) {
      const photo = photoRef.current;
      const video = videoRef.current;
      photo.width = width;
      photo.height = height;

      const ctx = photo.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
      }
    }
  };

  const clearPhoto = () => {
    setHasPhoto(false);
    setCaption("");
    setMessage(null);
    getVideo(); // Restart video stream
  };

  const handlePost = async () => {
    if (!photoRef.current || !hasPhoto) {
      setMessage({ type: "error", text: "Please take a photo first." });
      return;
    }

    if (!currentUser) {
      setMessage({ type: "error", text: "You must be logged in to post." });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      console.log("Attempting to convert canvas to base64...");
      const base64Image = photoRef.current.toDataURL('image/png'); // Convert to base64
      if (!base64Image) {
        throw new Error("Failed to convert image to base64.");
      }
      console.log("Canvas converted to base64.");

      // Create a new post object
      const newPost = {
        id: Date.now().toString(), // Simple ID generation
        userId: currentUser.uid,
        username: currentUser.displayName || currentUser.email || "Anonymous",
        userAvatar: currentUser.photoURL || "",
        imageUrl: base64Image, // Store the base64 image directly
        caption: caption,
        likes: [],
        timestamp: new Date().toISOString(),
      };

      // Get existing posts from localStorage
      const existingPosts = JSON.parse(localStorage.getItem('brewbliss_posts') || '[]');
      
      // Add new post to the beginning of the array
      const updatedPosts = [newPost, ...existingPosts];
      
      // Save back to localStorage
      localStorage.setItem('brewbliss_posts', JSON.stringify(updatedPosts));

      console.log("Post successful!");
      setMessage({ type: "success", text: "Your selfie has been posted successfully!" });
      setCaption("");
      setHasPhoto(false);
      getVideo(); // Restart video stream after a successful post

      // Trigger storage event for other tabs/windows
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'brewbliss_posts',
        newValue: JSON.stringify(updatedPosts)
      }));

    } catch (error) {
      console.error("Error posting selfie: ", error);
      setMessage({ type: "error", text: `Failed to post selfie: ${(error as Error).message}` });
    } finally {
      setIsUploading(false);
      setTimeout(() => setMessage(null), 5000); // Clear message after 5 seconds
    }
  };

  useEffect(() => {
    getVideo();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl md:text-5xl text-primary-dark mb-8"
        >
          Share Your Coffee Moment!
        </motion.h1>

        <p className="font-body text-primary-dark/80 mb-8">
          Take a selfie with your favorite Brew & Bliss coffee and share it with our community.
        </p>

        <div className="bg-secondary-light rounded-lg shadow-lg p-6 mb-8">
          <div className="relative w-full max-w-md mx-auto aspect-square bg-gray-200 rounded-lg overflow-hidden">
            <video ref={videoRef} className={`absolute inset-0 w-full h-full object-cover ${hasPhoto ? 'hidden' : 'block'}`}></video>
            <canvas ref={photoRef} className={`absolute inset-0 w-full h-full object-cover ${hasPhoto ? 'block' : 'hidden'}`}></canvas>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            {!hasPhoto ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={takePhoto}
                className="font-body bg-primary-dark text-secondary-light px-6 py-3 rounded-lg text-lg font-semibold hover:bg-accent transition-colors duration-300"
              >
                Take Photo
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearPhoto}
                className="font-body bg-red-500 text-secondary-light px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors duration-300"
              >
                Retake Photo
              </motion.button>
            )}
          </div>

          {hasPhoto && (
            <div className="mt-8">
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent text-primary-dark"
                placeholder="Add a caption..."
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePost}
                disabled={isUploading}
                className="font-body bg-accent text-primary-dark px-6 py-3 rounded-lg text-lg font-semibold mt-4 w-full hover:bg-primary-dark hover:text-secondary-light transition-colors duration-300"
              >
                {isUploading ? "Posting..." : "Post Selfie"}
              </motion.button>
            </div>
          )}

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 p-4 rounded-lg shadow-md ${
                message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              <p className="font-body text-lg font-semibold">{message.text}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
