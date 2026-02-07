import React from 'react';

export default function BackgroundWrapper({
    images,
    children,
  }: {
    images: string[];   // multiple images support
    children: React.ReactNode;
  }) {
    return (
      <div className="relative min-h-screen overflow-hidden print:bg-white">
        {/* Background image layer - hidden in print */}
        <div className="absolute inset-0 print:hidden">
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
  
        {/* Light overlay for readability - hidden in print */}
        <div className="absolute inset-0 bg-white/50 print:hidden" />
  
        {/* Content - always visible */}
        <div className="relative z-10 print:relative print:z-auto">
          {children}
        </div>
      </div>
    );
  }
  