"use client";

import React, { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set initial volume
      audioRef.current.play().catch(error => {
        console.log("Autoplay prevented: ", error);
        setAutoplayBlocked(true);
      });
    }
  }, [src]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setAutoplayBlocked(false);
      }).catch(error => {
        console.error("Error playing music: ", error);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      {autoplayBlocked && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={handlePlay}
            className="bg-primary-dark text-secondary-light px-4 py-2 rounded-full shadow-lg hover:bg-accent transition-colors duration-300"
          >
            Play Music
          </button>
        </div>
      )}
    </>
  );
};

export default AudioPlayer;