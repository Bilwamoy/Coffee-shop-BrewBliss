"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getAuthInstance } from "@/lib/firebase/config";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const authInstance = await getAuthInstance();
    if (!authInstance) {
      setError("Authentication service is not available.");
      return;
    }
    
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Failed to create account. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const authInstance = await getAuthInstance();
    if (!authInstance) {
      setError("Authentication service is not available.");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(authInstance, provider);
      // Update profile with display name if not already set
      if (!result.user.displayName) {
        await updateProfile(result.user, { displayName: result.user.email?.split('@')[0] || 'User' });
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Failed to sign up with Google.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="font-heading text-3xl text-primary-dark">Sign Up</h1>
          <p className="font-body text-primary-dark/80 mt-2">
            Create your Brew & Bliss account
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-secondary-light rounded-lg shadow-lg p-8"
        >
          {error && (
            <div className="font-body bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSignUp} className="space-y-6">
            <div>
              <label htmlFor="name" className="font-body block text-primary-dark mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-body w-full px-4 py-3 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Bilwamoy Sarkar"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="font-body block text-primary-dark mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-body w-full px-4 py-3 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="font-body block text-primary-dark mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-body w-full px-4 py-3 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="font-body block text-primary-dark mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="font-body w-full px-4 py-3 border border-secondary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="font-body w-full bg-primary-dark text-secondary-light py-3 rounded-lg hover:bg-accent transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary-dark"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="font-body px-2 bg-secondary-light text-primary-dark">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="font-body w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 flex items-center justify-center"
              >
                <span>Google</span>
              </button>
            </div>
          </div>

          <div className="font-body text-center mt-6 text-primary-dark/80">
            <p>
              Already have an account?{" "}
              <button
                onClick={() => router.push("/auth/signin")}
                className="text-accent font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
