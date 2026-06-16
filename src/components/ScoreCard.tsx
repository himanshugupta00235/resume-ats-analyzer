'use client';

import { useState, useEffect } from 'react';
import type { StrengthRating } from '@/types';

interface ScoreCardProps {
  score: number;
  rating: StrengthRating;
}

const ratingConfig: Record<StrengthRating, { color: string; bgLight: string; bgDark: string; label: string }> = {
  Poor: {
    color: 'text-red-500',
    bgLight: 'bg-red-100 text-red-700',
    bgDark: 'dark:bg-red-900/30 dark:text-red-300',
    label: 'Poor Match',
  },
  Average: {
    color: 'text-amber-500',
    bgLight: 'bg-amber-100 text-amber-700',
    bgDark: 'dark:bg-amber-900/30 dark:text-amber-300',
    label: 'Average Match',
  },
  Good: {
    color: 'text-yellow-500',
    bgLight: 'bg-yellow-100 text-yellow-700',
    bgDark: 'dark:bg-yellow-900/30 dark:text-yellow-300',
    label: 'Good Match',
  },
  Excellent: {
    color: 'text-emerald-500',
    bgLight: 'bg-emerald-100 text-emerald-700',
    bgDark: 'dark:bg-emerald-900/30 dark:text-emerald-300',
    label: 'Excellent Match',
  },
};

function getStrokeColor(score: number): string {
  if (score <= 40) return '#ef4444'; // red-500
  if (score <= 60) return '#f59e0b'; // amber-500
  if (score <= 80) return '#eab308'; // yellow-500
  return '#10b981'; // emerald-500
}

export default function ScoreCard({ score, rating }: ScoreCardProps) {
  const [animatedOffset, setAnimatedOffset] = useState(440);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (score / 100) * circumference;

  useEffect(() => {
    // Small delay to trigger the CSS transition
    const timer = setTimeout(() => {
      setAnimatedOffset(targetOffset);
    }, 100);
    return () => clearTimeout(timer);
  }, [targetOffset]);

  const config = ratingConfig[rating];
  const strokeColor = getStrokeColor(score);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700 transition-all duration-300">
      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 text-center mb-6">
        ATS Match Score
      </h3>

      {/* Circular Progress Gauge */}
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-40 h-40 -rotate-90" viewBox="0 0 160 160">
            {/* Background Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              strokeWidth="12"
              className="stroke-slate-200 dark:stroke-slate-700"
            />
            {/* Foreground Circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              strokeWidth="12"
              stroke={strokeColor}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={animatedOffset}
              style={{
                transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </svg>
          {/* Score Text in Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-4xl font-bold"
              style={{ color: strokeColor }}
            >
              {score}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              / 100
            </span>
          </div>
        </div>
      </div>

      {/* Rating Badge */}
      <div className="flex justify-center">
        <span
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold ${config.bgLight} ${config.bgDark} transition-all duration-300`}
        >
          <span className="w-2 h-2 rounded-full bg-current" />
          {config.label}
        </span>
      </div>
    </div>
  );
}
