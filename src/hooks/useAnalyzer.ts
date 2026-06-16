'use client';

import { useState, useCallback } from 'react';
import { AnalysisResult } from '@/types';
import { analyzeResume } from '@/utils/analyzer';

export interface UseAnalyzerReturn {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  analyze: (resumeText: string, jobDescription: string) => void;
  reset: () => void;
}

export function useAnalyzer(): UseAnalyzerReturn {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(
    (resumeText: string, jobDescription: string) => {
      // Validate inputs
      if (!resumeText.trim()) {
        setError('Please paste your resume text before analyzing.');
        return;
      }
      if (!jobDescription.trim()) {
        setError('Please paste the job description before analyzing.');
        return;
      }

      // Clear previous state
      setError(null);
      setResult(null);
      setIsLoading(true);

      // Simulate processing delay for a more deliberate UX
      setTimeout(() => {
        try {
          const analysisResult = analyzeResume(resumeText, jobDescription);
          setResult(analysisResult);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : 'An unexpected error occurred during analysis. Please try again.'
          );
        } finally {
          setIsLoading(false);
        }
      }, 1500);
    },
    []
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, isLoading, error, analyze, reset };
}
