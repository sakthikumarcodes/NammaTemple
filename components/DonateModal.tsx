'use client';

import { useState, useEffect } from 'react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-serif font-bold">
              💝 திருக்கொடை வழங்க
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-amber-100 transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-xs sm:text-sm text-amber-100 mt-1">
            Donate to support temple renovation
          </p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* UPI Section */}
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              📱 UPI Payment (Option 1)
            </h3>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-2">
              <code className="flex-1 bg-white px-3 py-2 rounded-lg border border-green-300 text-xs sm:text-sm font-mono text-green-900 break-all">
                {/* Replace with your actual UPI ID */}
                temple@upi
              </code>
              <button
                onClick={() => copyToClipboard('temple@upi')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium whitespace-nowrap"
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-green-700 mt-2">
              Scan QR code or use UPI ID above
            </p>
          </div>

          {/* QR Code */}
          <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200 text-center">
            <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3">Scan QR Code to Pay</p>
            <div className="bg-white p-3 sm:p-4 rounded-lg inline-block border-2 border-dashed border-slate-300">
              <div className="w-40 h-40 sm:w-48 sm:h-48 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                {/* Replace with actual QR code image */}
                QR Code Image
                <br />
                (Add your QR code here)
              </div>
            </div>
          </div>

          {/* Alternative Option */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              💬 Alternative Option
            </h3>
            <div className="space-y-2 text-sm text-blue-900">
              <p>
                <strong>Option 2:</strong> Send money to{' '}
                <span className="font-semibold text-blue-800">Pudupalayam Mani Anna</span> via UPI
              </p>
              <p className="text-xs text-blue-700 mt-2">
                After payment, please inform in the{' '}
                <span className="font-semibold">WhatsApp channel</span> with your name and amount.
              </p>
            </div>
          </div>

          {/* Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-800">
              <strong>Note:</strong> Please mention your name in the payment reference or WhatsApp message. 
              Your contribution will be updated in the dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

