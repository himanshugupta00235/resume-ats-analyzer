'use client';

import React from 'react';

interface TextInputProps {
  id?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  maxLength?: number;
}

export default function TextInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  icon,
  maxLength = 10000,
}: TextInputProps) {
  const charCount = value.length;
  const charPercentage = (charCount / maxLength) * 100;

  const getCounterColor = () => {
    if (charPercentage > 95) return 'text-red-500';
    if (charPercentage > 80) return 'text-amber-500';
    return 'text-slate-500 dark:text-slate-400';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 transition-all duration-300">
      {/* Label */}
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
        <span className="text-indigo-500">{icon}</span>
        {label}
      </label>

      {/* Textarea */}
      <textarea
        id={id}
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            onChange(e.target.value);
          }
        }}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full min-h-[200px] resize-y bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 text-sm leading-relaxed"
      />

      {/* Bottom bar */}
      <div className="flex items-center justify-between mt-3">
        <span className={`text-xs font-medium transition-colors duration-300 ${getCounterColor()}`}>
          {charCount.toLocaleString()} / {maxLength.toLocaleString()} characters
        </span>
        {value.length > 0 && (
          <button
            onClick={() => onChange('')}
            className="text-xs font-medium text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors duration-300 focus:outline-none"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
