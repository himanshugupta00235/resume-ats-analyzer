export type StrengthRating = 'Poor' | 'Average' | 'Good' | 'Excellent';

/**
 * Skill categories used for weighted ATS scoring.
 * Technical/required skills are weighted highest, soft skills lowest.
 */
export type SkillCategory =
  | 'technical'      // Programming languages, frameworks, tools
  | 'cloud'          // Cloud platforms, infrastructure
  | 'database'       // Database systems
  | 'methodology'    // Agile, Scrum, DevOps, etc.
  | 'certification'  // Industry certifications
  | 'soft'           // Communication, leadership, etc.
  | 'domain'         // Industry/domain-specific terms
  | 'general';       // Uncategorized but still relevant

/**
 * A keyword extracted from the job description with its
 * assigned category and context-based weight.
 */
export interface CategorizedKeyword {
  keyword: string;
  category: SkillCategory;
  weight: number;          // 0.0–1.0 multiplier for scoring
  isRequired: boolean;     // appeared in "required" context
}

export interface AnalysisResult {
  atsScore: number;
  keywordMatchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  totalKeywords: number;
  strengthRating: StrengthRating;
  recommendations: Recommendation[];
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}
