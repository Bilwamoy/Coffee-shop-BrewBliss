"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showControls, setShowControls] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Audio play failed:", err));
    }
    setIsPlaying(!isPlaying);
    if (!userInteracted) setUserInteracted(true);
  }, [isPlaying, userInteracted]);

  const handleMuteToggle = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume > 0 && isMuted) {
      handleMuteToggle();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleCanPlay = () => {
      if (userInteracted) {
        audio?.play().catch(err => console.error("Audio play failed on interaction:", err));
        setIsPlaying(true);
      }
    };

    audio?.addEventListener('canplay', handleCanPlay);

    return () => {
      audio?.removeEventListener('canplay', handleCanPlay);
    };
  }, [userInteracted]);

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <div 
        className="fixed bottom-5 right-5 z-50"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <AnimatePresence>
          {showControls ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-3 bg-coffee-dark bg-opacity-80 backdrop-blur-sm p-3 rounded-full shadow-lg"
            >
              <button onClick={handlePlayPause} className="text-cream hover:text-warm-beige transition-colors">
                {isPlaying ? '❚❚' : '▶'}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-cream rounded-full appearance-none cursor-pointer"
              />
              <button onClick={handleMuteToggle} className="text-cream hover:text-warm-beige transition-colors">
                {isMuted ? '🔇' : '🔊'}
              </button>
            </motion.div>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handlePlayPause}
              className="w-12 h-12 bg-coffee-dark bg-opacity-80 backdrop-blur-sm text-cream rounded-full shadow-lg flex items-center justify-center"
            >
              {isPlaying ? '🎶' : '▶'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AudioPlayer;