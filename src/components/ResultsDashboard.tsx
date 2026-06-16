'use client';

import type { AnalysisResult } from '@/types';
import ScoreCard from './ScoreCard';
import KeywordMatchCard from './KeywordMatchCard';
import KeywordSection from './KeywordSection';
import Recommendations from './Recommendations';

interface ResultsDashboardProps {
  result: AnalysisResult;
}

export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  return (
    <div className="animate-fadeIn">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold">
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">
            Analysis Results
          </span>
        </h2>
      </div>

      {/* Top Row: ScoreCard + KeywordMatchCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ScoreCard score={result.atsScore} rating={result.strengthRating} />
        <KeywordMatchCard
          matchPercentage={result.keywordMatchPercentage}
          matchedCount={result.matchedKeywords.length}
          totalCount={result.totalKeywords}
        />
      </div>

      {/* Middle Row: KeywordSection */}
      <div className="mb-6">
        <KeywordSection
          matchedKeywords={result.matchedKeywords}
          missingKeywords={result.missingKeywords}
        />
      </div>

      {/* Bottom Row: Recommendations */}
      <div>
        <Recommendations recommendations={result.recommendations} />
      </div>
    </div>
  );
}
