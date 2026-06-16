'use client';

import { useState, useEffect } from 'react';

interface KeywordSectionProps {
  matchedKeywords: string[];
  missingKeywords: string[];
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-emerald-500"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-red-500"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

export default function KeywordSection({ matchedKeywords, missingKeywords }: KeywordSectionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 transition-all duration-300">
      {/* Matched Keywords */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-4">
          <CheckIcon />
          <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Matched Keywords
          </h4>
          <span className="ml-auto text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
            {matchedKeywords.length}
          </span>
        </div>
        {matchedKeywords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.map((keyword, index) => (
              <span
                key={`matched-${keyword}-${index}`}
                className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(8px)',
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500 italic">
            No matched keywords found
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200 dark:border-slate-700 my-4" />

      {/* Missing Keywords */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <XIcon />
          <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Missing Keywords
          </h4>
          <span className="ml-auto text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
            {missingKeywords.length}
          </span>
        </div>
        {missingKeywords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword, index) => (
              <span
                key={`missing-${keyword}-${index}`}
                className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(8px)',
                  transitionDelay: `${(matchedKeywords.length + index) * 50}ms`,
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-emerald-500 dark:text-emerald-400 italic">
            All keywords matched!
          </p>
        )}
      </div>
    </div>
  );
}
