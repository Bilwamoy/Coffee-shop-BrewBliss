import React, { useEffect, useRef, useState } from 'react';

const Logo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Use a key to force re-render and restart animation on click
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const placeText = () => {
      if (!containerRef.current) return;
      const text = "BREW & BLISS • CRAFT COFFEE • ";
      const textContainer = containerRef.current.querySelector('.logo-text');
      if (!textContainer) return;

      // Clear previous text
      textContainer.innerHTML = '';

      const characters = text.split('');
      const angle = 360 / characters.length;

      characters.forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.transform = `rotate(${angle * i}deg)`;
        textContainer.appendChild(span);
      });
    };

    placeText();
  }, [animationKey]); // Rerun when animationKey changes

  const restartAnimation = () => {
    setAnimationKey(prevKey => prevKey + 1);
  };

  const LogoStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@300&display=swap');

    .logo-container {
        width: 150px; /* Smaller size for a navbar */
        height: 150px;
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo-circle {
        width: 100%;
        height: 100%;
        border: 3px solid #4a2c2a; /* Deep coffee brown */
        border-radius: 50%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(0);
        animation: growCircle 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.5s forwards;
    }

    .coffee-cup {
        width: 50px;
        height: 45px;
        border: 3px solid #4a2c2a;
        border-top: none;
        border-radius: 0 0 15px 15px;
        position: relative;
        opacity: 0;
        animation: fadeIn 1s ease-in 2.5s forwards;
    }

    .coffee-cup::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 22px;
        border: 3px solid #4a2c2a;
        border-left: none;
        border-radius: 0 10px 10px 0;
        top: 5px;
        right: -15px;
    }

    .steam {
        position: absolute;
        width: 3px;
        height: 15px;
        background-color: #4a2c2a;
        border-radius: 1.5px;
        bottom: 45px;
        opacity: 0;
        animation: steamRise 2s infinite ease-out 3s;
    }

    .steam.one {
        left: 35%;
        animation-delay: 3s;
    }

    .steam.two {
        left: 50%;
        animation-delay: 3.5s;
    }

    .steam.three {
        left: 65%;
        animation-delay: 3.2s;
    }

    .logo-text {
        position: absolute;
        width: 100%;
        height: 100%;
        animation: rotateIn 2s ease-out 2s forwards;
        opacity: 0;
    }

    .logo-text span {
        position: absolute;
        left: 50%;
        transform-origin: 0 75px; /* Half of the new container width */
        font-family: 'Playfair Display', serif;
        font-size: 16px; /* Adjusted for smaller size */
        font-weight: 700;
        color: #4a2c2a;
    }

    .coffee-bean {
        width: 15px;
        height: 22px;
        background-color: #6f4e37;
        border-radius: 50% / 60%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: beanTransform 2s ease-in-out forwards;
    }

    .coffee-bean::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 1.5px;
        height: 100%;
        background: #f4f1eb;
        transform: translateX(-50%) rotate(10deg);
    }
    
    @keyframes beanTransform {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        40% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.7; }
        100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    }

    @keyframes growCircle {
        from { transform: scale(0); }
        to { transform: scale(1); }
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes rotateIn {
        from { transform: rotate(-90deg); opacity: 0; }
        to { transform: rotate(0deg); opacity: 1; }
    }

    @keyframes steamRise {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        80% { transform: translateY(-30px) scale(0.5); opacity: 0.5; }
        100% { transform: translateY(-40px) scale(0); opacity: 0; }
    }
  `;

  return (
    <>
      <style>{LogoStyles}</style>
      <div
        key={animationKey}
        ref={containerRef}
        className="logo-container"
        onClick={restartAnimation}
      >
        <div className="coffee-bean"></div>
        <div className="logo-circle">
          <div className="coffee-cup">
            <div className="steam one"></div>
            <div className="steam two"></div>
            <div className="steam three"></div>
          </div>
          <div className="logo-text">
            {/* Populated by useEffect */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Logo;
