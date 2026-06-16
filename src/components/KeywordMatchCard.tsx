'use client';

import { useState, useEffect } from 'react';

interface KeywordMatchCardProps {
  matchPercentage: number;
  matchedCount: number;
  totalCount: number;
}

function getPercentageColor(pct: number): string {
  if (pct <= 40) return 'text-red-500';
  if (pct <= 60) return 'text-amber-500';
  if (pct <= 80) return 'text-yellow-500';
  return 'text-emerald-500';
}

export default function KeywordMatchCard({
  matchPercentage,
  matchedCount,
  totalCount,
}: KeywordMatchCardProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(matchPercentage);
    }, 200);
    return () => clearTimeout(timer);
  }, [matchPercentage]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700 transition-all duration-300">
      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 text-center mb-6">
        Keyword Match
      </h3>

      {/* Percentage Display */}
      <div className="text-center mb-6">
        <span className={`text-5xl font-bold ${getPercentageColor(matchPercentage)} transition-colors duration-300`}>
          {matchPercentage}
        </span>
        <span className="text-2xl font-semibold text-slate-400 dark:text-slate-500">%</span>
      </div>

      {/* Progress Bar */}
      <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-4">
        <div
          className="h-4 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-1000 ease-out"
          style={{ width: `${animatedWidth}%` }}
        />
      </div>

      {/* Match Count */}
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-slate-700 dark:text-slate-300">{matchedCount}</span>
        {' '}of{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-300">{totalCount}</span>
        {' '}keywords matched
      </p>
    </div>
  );
}
