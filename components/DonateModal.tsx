'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const { t } = useTranslation();
  
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
        className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-serif font-bold">
              💝 {t('donateTitle')}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-amber-100 transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-[10px] sm:text-xs text-amber-100 mt-0.5">
            {t('donateSubtitle')}
          </p>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Google Pay Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border-2 border-blue-300">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-1.5 text-xs sm:text-sm">
                💳 {t('googlePay')}
              </h3>
              <a
                href={`https://tez.google.com/pay?pa=getpvs@okicici&pn=ஸ்ரீ%20அன்னலூஞ்சல்%20பாப்பாத்தி%20அம்மன்%20கோயில்&cu=INR`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 bg-white border-2 border-blue-400 rounded-lg hover:bg-blue-50 transition-colors text-blue-700 font-semibold text-xs sm:text-sm"
              >
                <span>💳</span>
                <span>{t('payNow')}</span>
                <span className="text-[10px]">↗</span>
              </a>
              <p className="text-[10px] text-blue-700 mt-1.5 text-center">
                {t('instantPaymentShort')}
              </p>
            </div>

            {/* UPI Section */}
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-1.5 text-xs sm:text-sm">
                📱 {t('upiPayment')}
              </h3>
              <div className="flex items-center gap-1.5 mb-1.5">
                <code className="flex-1 bg-white px-2 py-1.5 rounded border border-green-300 text-[10px] sm:text-xs font-mono text-green-900 break-all">
                  getpvs@okicici
                </code>
                <button
                  onClick={() => copyToClipboard('getpvs@okicici')}
                  className="px-2 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition text-[10px] sm:text-xs font-medium whitespace-nowrap"
                >
                  {t('copy')}
                </button>
              </div>
              <p className="text-[10px] text-green-700">
                {t('useInAnyUPI')}
              </p>
            </div>

            {/* Alternative Option */}
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-1.5 text-xs sm:text-sm">
                💬 {t('alternativeOption')}
              </h3>
              <div className="text-[10px] sm:text-xs text-blue-900">
                <p className="mb-1">
                  {t('sendToManiAnna')}
                </p>
                <p className="text-[9px] sm:text-[10px] text-blue-700">
                  {t('informWhatsApp')}
                </p>
              </div>
            </div>
          </div>

          {/* QR Code - Smaller and inline */}
          <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 text-center">
            <p className="text-[10px] sm:text-xs text-slate-600 mb-2">{t('scanQRCodeToPay')}</p>
            <div className="bg-white p-2 rounded-lg inline-block border border-slate-200">
              <Image
                src="/assets/myQR.jpeg"
                alt="Scan QR code to pay"
                width={160}
                height={160}
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
              />
            </div>
          </div>

          {/* Note - Compact */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
            <p className="text-[10px] sm:text-xs text-amber-800">
              {t('note')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

