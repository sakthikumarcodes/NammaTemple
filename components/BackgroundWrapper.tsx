import React from 'react';

export default function BackgroundWrapper({
    images,
    children,
  }: {
    images: string[];   // multiple images support
    children: React.ReactNode;
  }) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Background image layer */}
        <div className="absolute inset-0">
          {images.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url(${img})`,
                opacity: 0.5,               // 👈 more visible background
                mixBlendMode: 'normal',
              }}
            />
          ))}
        </div>
  
        {/* Light overlay for readability - reduced opacity to show images */}
        <div className="absolute inset-0 bg-white/50" />
  
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
  