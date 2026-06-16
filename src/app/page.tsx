'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TextInput from '@/components/TextInput';
import AnalyzeButton from '@/components/AnalyzeButton';
import ResultsDashboard from '@/components/ResultsDashboard';
import { useAnalyzer } from '@/hooks/useAnalyzer';

const ResumeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const BriefcaseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export default function Home() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const { result, isLoading, error, analyze, reset } = useAnalyzer();

  const handleAnalyze = () => {
    analyze(resumeText, jobDescription);
  };

  const isInputEmpty = !resumeText.trim() || !jobDescription.trim();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero section */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            <span className="gradient-text">Resume ATS Analyzer</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Optimize your resume for Applicant Tracking Systems. Paste your
            resume and a job description to get an instant compatibility score
            with actionable recommendations.
          </p>
        </div>

        {/* Input section — two-column grid on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-slideUp delay-200">
          <TextInput
            id="resume-input"
            label="Resume"
            placeholder="Paste your resume text here…"
            value={resumeText}
            onChange={setResumeText}
            icon={ResumeIcon}
          />
          <TextInput
            id="job-description-input"
            label="Job Description"
            placeholder="Paste the job description here…"
            value={jobDescription}
            onChange={setJobDescription}
            icon={BriefcaseIcon}
          />
        </div>

        {/* Error display */}
        {error && (
          <div
            className="mx-auto max-w-2xl mb-8 animate-scaleIn rounded-lg border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/30 px-4 py-3 text-sm text-red-700 dark:text-red-300 flex items-center gap-2"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Analyze button — centered */}
        <div className="flex justify-center mb-12 animate-slideUp delay-300">
          <AnalyzeButton
            onClick={handleAnalyze}
            disabled={isInputEmpty}
            isLoading={isLoading}
          />
        </div>

        {/* Results — only shown when a result exists */}
        {result && (
          <div className="animate-scaleIn">
            <ResultsDashboard result={result} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
