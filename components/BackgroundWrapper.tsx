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
        {/* Background image layer - show first image as main background */}
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: images[0] ? `url(${images[0]})` : 'none',
            opacity: 0.4,
          }}
        />
        
        {/* Additional images as subtle overlays if multiple provided */}
        {images.length > 1 && images.slice(1).map((img, i) => (
          <div
            key={i + 1}
            className="absolute inset-0 bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${img})`,
              opacity: 0.15,
              mixBlendMode: 'overlay',
            }}
          />
        ))}
  
        {/* Light overlay for readability - reduced opacity to show images */}
        <div className="absolute inset-0 bg-white/40" />
  
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
  