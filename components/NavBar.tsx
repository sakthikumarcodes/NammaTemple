'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DonateModal from './DonateModal';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-amber-300/30 shadow-md">
      <div
        className="w-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800"
        style={{
          backgroundImage:
            'linear-gradient(135deg, #d97706 0%, #b45309 25%, #92400e 50%, #78350f 75%, #92400e 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          {/* Main Nav Bar */}
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 text-white hover:text-amber-100 transition-colors min-w-0 flex-1"
            >
              <span className="inline-flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-amber-50/10 border border-amber-200/30 overflow-hidden">
                <Image
                  src="/assets/TempleIcon.png"
                  alt="Temple icon"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </span>
              <div className="flex flex-col items-start leading-tight min-w-0">
                <span className="text-xs sm:text-base font-serif font-bold truncate w-full">
                  ஸ்ரீ அன்னலூஞ்சல் பாப்பாத்தி அம்மன் கோயில்
                </span>
                <span className="text-[9px] sm:text-[11px] uppercase tracking-wide text-amber-100/80 hidden sm:block">
                  கலந்துடை மகரிஷி கோத்திர மக்கள் குலதெய்வம்
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-4 text-sm font-semibold">
              <Link 
                href="/" 
                className="text-white hover:text-amber-100 transition-colors border-b-2 border-transparent hover:border-amber-200 pb-1"
              >
                Home
              </Link>
              <Link 
                href="/pangali" 
                className="text-white hover:text-amber-100 transition-colors border-b-2 border-transparent hover:border-amber-200 pb-1"
              >
                Pangali
              </Link>
              <Link href="/analytics"  className="text-white hover:text-amber-100 transition-colors border-b-2 border-transparent hover:border-amber-200 pb-1">
                Analytics
              </Link>
              <Link
                href="/relatives"
                className="text-white hover:text-amber-100 transition-colors border-b-2 border-transparent hover:border-amber-200 pb-1"
              >
                Relatives
              </Link>
              <Link
                href="/expenses"
                className="text-white hover:text-amber-100 transition-colors border-b-2 border-transparent hover:border-amber-200 pb-1"
              >
                Expenses
              </Link>
              <Link
                href="/family"
                className="text-white hover:text-amber-100 transition-colors border-b-2 border-transparent hover:border-amber-200 pb-1"
              >
                Family
              </Link>
              
              {/* Language Switcher */}
              <LanguageSwitcher />
              
              {/* Donate Button */}
              <button
                onClick={() => setIsDonateModalOpen(true)}
                className="px-3 xl:px-4 py-1.5 xl:py-2 bg-white text-amber-700 rounded-lg font-semibold hover:bg-amber-50 transition-colors shadow-sm border border-amber-200 text-xs xl:text-sm"
              >
                💝 Donate
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-amber-700/50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden mt-3 pb-3 border-t border-amber-400/30 pt-3 space-y-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-white hover:bg-amber-700/50 rounded-lg transition-colors text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/pangali"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-white hover:bg-amber-700/50 rounded-lg transition-colors text-sm font-medium"
              >
                Pangali
              </Link>
              <Link
                href="/analytics"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-white hover:bg-amber-700/50 rounded-lg transition-colors text-sm font-medium"
              >
                Analytics
              </Link>
              <Link
                href="/relatives"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-white hover:bg-amber-700/50 rounded-lg transition-colors text-sm font-medium"
              >
                Relatives
              </Link>
              <Link
                href="/expenses"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-white hover:bg-amber-700/50 rounded-lg transition-colors text-sm font-medium"
              >
                Expenses
              </Link>
              <Link
                href="/family"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-white hover:bg-amber-700/50 rounded-lg transition-colors text-sm font-medium"
              >
                Family
              </Link>
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => {
                  setIsDonateModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-2 px-3 py-2 bg-white text-amber-700 rounded-lg font-semibold hover:bg-amber-50 transition-colors shadow-sm border border-amber-200 text-sm"
              >
                💝 Donate
              </button>
            </nav>
          )}
          
          <DonateModal 
            isOpen={isDonateModalOpen} 
            onClose={() => setIsDonateModalOpen(false)} 
          />
        </div>
      </div>
    </header>
  );
}
