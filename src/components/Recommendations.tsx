'use client';

import { useState, useEffect } from 'react';
import type { Recommendation } from '@/types';

interface RecommendationsProps {
  recommendations: Recommendation[];
}

const priorityConfig: Record<
  Recommendation['priority'],
  { bg: string; text: string; label: string }
> = {
  high: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300',
    label: 'High',
  },
  medium: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    label: 'Medium',
  },
  low: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-300',
    label: 'Low',
  },
};

const priorityIconBg: Record<Recommendation['priority'], string> = {
  high: 'bg-red-100 dark:bg-red-900/30',
  medium: 'bg-amber-100 dark:bg-amber-900/30',
  low: 'bg-emerald-100 dark:bg-emerald-900/30',
};

export default function Recommendations({ recommendations }: RecommendationsProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 transition-all duration-300">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-indigo-600 dark:text-indigo-400"
          >
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Recommendations
        </h3>
        <span className="ml-auto text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
          {recommendations.length} tips
        </span>
      </div>

      {/* Recommendations List */}
      {recommendations.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-8 italic">
          No recommendations at this time. Your resume looks great!
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {recommendations.map((rec, index) => {
            const pConfig = priorityConfig[rec.priority];
            return (
              <div
                key={rec.id}
                className="relative flex items-start gap-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50 transition-all duration-300 hover:border-slate-200 dark:hover:border-slate-600"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(12px)',
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg ${priorityIconBg[rec.priority]} flex items-center justify-center text-lg`}
                >
                  {rec.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {rec.title}
                    </h4>
                    <span
                      className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${pConfig.bg} ${pConfig.text}`}
                    >
                      {pConfig.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
