import { AnalysisResult, Recommendation, StrengthRating, CategorizedKeyword } from '@/types';
import { extractCategorizedKeywords, normalizeText } from './keywords';

// ─── Resume Signal Detection ────────────────────────────────────────────────

/**
 * Check if the resume text contains structural signals that ATS systems
 * look for: contact info, education, experience, skills sections, metrics.
 */
function checkResumeSignals(resumeText: string): {
  hasContact: boolean;
  hasEducation: boolean;
  hasExperience: boolean;
  hasSkills: boolean;
  hasMetrics: boolean;
} {
  const text = resumeText.toLowerCase();

  const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;
  const phonePattern = /(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/;
  const hasContact = emailPattern.test(text) || phonePattern.test(text);

  const educationTerms = [
    'education', 'university', 'college', 'bachelor', 'master', 'phd',
    'degree', 'diploma', 'certification', 'certified', 'b.s.', 'b.a.',
    'm.s.', 'm.a.', 'mba', 'btech', 'b.tech', 'm.tech', 'bsc', 'msc',
    'academic', 'gpa', 'graduated', 'coursework',
  ];
  const hasEducation = educationTerms.some((term) => text.includes(term));

  const experienceTerms = [
    'experience', 'employment', 'work history', 'professional experience',
    'work experience', 'career', 'positions held', 'job history',
    'internship', 'intern', 'freelance',
  ];
  const hasExperience = experienceTerms.some((term) => text.includes(term));

  const skillsTerms = [
    'skills', 'technical skills', 'core competencies', 'competencies',
    'proficiencies', 'expertise', 'technologies', 'tools', 'languages',
    'frameworks', 'platforms',
  ];
  const hasSkills = skillsTerms.some((term) => text.includes(term));

  const metricsPattern = /\d+\s*%|\$\s*\d+|\d+x\b|increased|decreased|reduced|improved|grew|saved|generated|delivered|achieved|optimized|boosted|streamlined/;
  const hasMetrics = metricsPattern.test(text);

  return { hasContact, hasEducation, hasExperience, hasSkills, hasMetrics };
}

// ─── Weighted Keyword Density ───────────────────────────────────────────────

/**
 * Calculate weighted density: how often matched keywords appear in the resume,
 * with higher-weight skills contributing more to the density score.
 */
function calculateWeightedDensity(
  resumeNormalized: string,
  matchedKeywords: CategorizedKeyword[]
): number {
  if (matchedKeywords.length === 0) return 0;

  let weightedOccurrences = 0;
  let totalWeight = 0;

  for (const kw of matchedKeywords) {
    let count = 0;
    let searchFrom = 0;
    while (true) {
      const index = resumeNormalized.indexOf(kw.keyword, searchFrom);
      if (index === -1) break;
      count++;
      searchFrom = index + kw.keyword.length;
    }
    // Cap per-keyword count at 5 to prevent stuffing
    const cappedCount = Math.min(count, 5);
    weightedOccurrences += cappedCount * kw.weight;
    totalWeight += kw.weight;
  }

  // Target: average 2+ weighted mentions = max score
  const avgWeightedOccurrences = weightedOccurrences / totalWeight;
  return Math.min(avgWeightedOccurrences / 2, 1);
}

// ─── Strength Rating ────────────────────────────────────────────────────────

function getStrengthRating(score: number): StrengthRating {
  if (score >= 81) return 'Excellent';
  if (score >= 61) return 'Good';
  if (score >= 41) return 'Average';
  return 'Poor';
}

// ─── Recommendation Engine ──────────────────────────────────────────────────

function generateRecommendations(
  matchedCategorized: CategorizedKeyword[],
  missingCategorized: CategorizedKeyword[],
  keywordMatchPercentage: number,
  atsScore: number,
  signals: ReturnType<typeof checkResumeSignals>
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // ── Missing high-weight technical skills ──
  const missingTechnical = missingCategorized.filter(
    (kw) => kw.category === 'technical' || kw.category === 'cloud' || kw.category === 'database'
  );
  if (missingTechnical.length > 0) {
    const topMissing = missingTechnical
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 5);
    recommendations.push({
      id: 'missing-technical-skills',
      title: 'Add Missing Technical Skills',
      description: `Your resume is missing ${missingTechnical.length} technical skill${missingTechnical.length === 1 ? '' : 's'} from the job description. Top missing: ${topMissing.map((k) => `"${k.keyword}"`).join(', ')}${missingTechnical.length > 5 ? `, and ${missingTechnical.length - 5} more` : ''}.`,
      priority: 'high',
      icon: '🔧',
    });
  }

  // ── Missing required skills specifically ──
  const missingRequired = missingCategorized.filter((kw) => kw.isRequired && kw.weight >= 0.8);
  if (missingRequired.length > 0 && missingRequired.length !== missingTechnical.length) {
    recommendations.push({
      id: 'missing-required-skills',
      title: 'Address Required Skills Gap',
      description: `${missingRequired.length} skill${missingRequired.length === 1 ? '' : 's'} listed as "required" in the job description ${missingRequired.length === 1 ? 'is' : 'are'} missing from your resume: ${missingRequired.slice(0, 4).map((k) => `"${k.keyword}"`).join(', ')}. These are likely used for initial ATS filtering.`,
      priority: 'high',
      icon: '🚨',
    });
  }

  // ── Missing methodology/process keywords ──
  const missingMethodology = missingCategorized.filter((kw) => kw.category === 'methodology');
  if (missingMethodology.length > 2) {
    recommendations.push({
      id: 'missing-methodologies',
      title: 'Add Development Methodologies',
      description: `The job requires methodologies like ${missingMethodology.slice(0, 3).map((k) => `"${k.keyword}"`).join(', ')} which are missing from your resume. Mention relevant processes in your experience descriptions.`,
      priority: 'medium',
      icon: '⚙️',
    });
  }

  // ── No measurable achievements ──
  if (!signals.hasMetrics) {
    recommendations.push({
      id: 'include-metrics',
      title: 'Include Measurable Achievements',
      description:
        'Your resume lacks quantified results. Add specific numbers, percentages, and dollar amounts. For example: "Increased API throughput by 40%" or "Reduced deployment time from 2 hours to 15 minutes".',
      priority: 'high',
      icon: '📊',
    });
  }

  // ── Low keyword match ──
  if (keywordMatchPercentage < 50) {
    recommendations.push({
      id: 'align-keywords',
      title: 'Align Resume with Job Requirements',
      description:
        'Less than half of the technical keywords from the job description appear in your resume. Review the job posting and naturally incorporate relevant skills and technologies into your experience sections.',
      priority: 'high',
      icon: '🎯',
    });
  }

  // ── Missing certifications that JD mentions ──
  const missingCerts = missingCategorized.filter((kw) => kw.category === 'certification');
  if (missingCerts.length > 0) {
    recommendations.push({
      id: 'add-certifications',
      title: 'Highlight Relevant Certifications',
      description: `The job description mentions ${missingCerts.map((k) => `"${k.keyword}"`).join(', ')}. If you hold these certifications, add them prominently. If not, consider pursuing them to strengthen your candidacy.`,
      priority: 'medium',
      icon: '🏆',
    });
  }

  // ── No education section ──
  if (!signals.hasEducation) {
    recommendations.push({
      id: 'add-education',
      title: 'Add Education Section',
      description:
        'No education details detected. Include degrees, certifications, relevant coursework, and academic achievements. Most ATS systems look for education credentials.',
      priority: 'medium',
      icon: '🎓',
    });
  }

  // ── No skills section ──
  if (!signals.hasSkills) {
    recommendations.push({
      id: 'add-skills-section',
      title: 'Add a Dedicated Skills Section',
      description:
        'A clearly labeled "Technical Skills" section helps ATS systems identify your competencies. List programming languages, frameworks, tools, and cloud platforms in a scannable format.',
      priority: 'medium',
      icon: '💡',
    });
  }

  // ── Low score — quantify impact ──
  if (atsScore < 60) {
    recommendations.push({
      id: 'quantify-impact',
      title: 'Quantify Your Impact',
      description:
        'Use the format "Action verb + task + quantified result" for each bullet point. Example: "Architected microservices platform serving 10M+ requests/day with 99.9% uptime".',
      priority: 'medium',
      icon: '📈',
    });
  }

  // ── No contact info ──
  if (!signals.hasContact) {
    recommendations.push({
      id: 'add-contact-info',
      title: 'Add Contact Information',
      description:
        'No email or phone number detected. Include a professional email and phone number at the top of your resume.',
      priority: 'high',
      icon: '📧',
    });
  }

  // ── No experience section ──
  if (!signals.hasExperience) {
    recommendations.push({
      id: 'add-experience',
      title: 'Add Professional Experience Section',
      description:
        'No experience section detected. Include job titles, company names, dates, and bullet-point accomplishments.',
      priority: 'high',
      icon: '💼',
    });
  }

  // ── Soft skills gap ──
  const missingSoft = missingCategorized.filter((kw) => kw.category === 'soft');
  if (missingSoft.length > 2) {
    recommendations.push({
      id: 'add-soft-skills',
      title: 'Incorporate Soft Skills',
      description: `The job values ${missingSoft.slice(0, 3).map((k) => `"${k.keyword}"`).join(', ')}. Weave these into your experience descriptions rather than listing them separately — show them through achievements.`,
      priority: 'low',
      icon: '🤝',
    });
  }

  // ── General missing keyword review ──
  if (missingCategorized.length > 0) {
    recommendations.push({
      id: 'review-missing-keywords',
      title: 'Review Missing Keywords',
      description: `You are missing ${missingCategorized.length} keyword${missingCategorized.length === 1 ? '' : 's'}. Review the full list below and integrate those that accurately reflect your experience. Prioritize technical skills (red pills) over soft skills.`,
      priority: missingCategorized.length > 10 ? 'high' : 'medium',
      icon: '🔍',
    });
  }

  // Sort by priority: high → medium → low
  const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recommendations;
}

// ─── Main Analysis Function ─────────────────────────────────────────────────

/**
 * Analyze a resume against a job description using weighted skill matching.
 *
 * Scoring formula (weighted):
 * - 50% weighted keyword match (technical skills weighted highest)
 * - 20% keyword density (frequency of matched keywords, weighted)
 * - 15% resume completeness (contact, education, experience, skills, metrics)
 * - 15% required skills coverage (% of required/high-weight skills matched)
 */
export function analyzeResume(
  resumeText: string,
  jobDescriptionText: string
): AnalysisResult {
  // Extract categorized keywords from job description
  const categorizedKeywords = extractCategorizedKeywords(
    jobDescriptionText,
    jobDescriptionText
  );

  if (categorizedKeywords.length === 0) {
    return {
      atsScore: 0,
      keywordMatchPercentage: 0,
      matchedKeywords: [],
      missingKeywords: [],
      totalKeywords: 0,
      strengthRating: 'Poor',
      recommendations: [
        {
          id: 'no-keywords',
          title: 'No Technical Keywords Found',
          description:
            'Could not extract meaningful technical keywords from the job description. Paste a more detailed posting that lists specific technologies, tools, and qualifications.',
          priority: 'high',
          icon: '⚠️',
        },
      ],
    };
  }

  // Normalize resume text for matching
  const resumeNormalized = normalizeText(resumeText);

  // Classify each categorized keyword as matched or missing
  const matchedCategorized: CategorizedKeyword[] = [];
  const missingCategorized: CategorizedKeyword[] = [];

  for (const kw of categorizedKeywords) {
    if (resumeNormalized.includes(kw.keyword)) {
      matchedCategorized.push(kw);
    } else {
      missingCategorized.push(kw);
    }
  }

  // ── Weighted keyword match ──
  // Instead of simple count ratio, weight each keyword by its importance.
  const totalWeight = categorizedKeywords.reduce((sum, kw) => sum + kw.weight, 0);
  const matchedWeight = matchedCategorized.reduce((sum, kw) => sum + kw.weight, 0);
  const weightedMatchRatio = totalWeight > 0 ? matchedWeight / totalWeight : 0;

  // Simple percentage for display (unweighted, easier to understand)
  const keywordMatchPercentage = Math.round(
    (matchedCategorized.length / categorizedKeywords.length) * 100
  );

  // ── Weighted density score ──
  const densityScore = calculateWeightedDensity(resumeNormalized, matchedCategorized);

  // ── Resume completeness ──
  const signals = checkResumeSignals(resumeText);
  const completenessFactors = [
    signals.hasContact,
    signals.hasEducation,
    signals.hasExperience,
    signals.hasSkills,
    signals.hasMetrics,
  ];
  const completenessScore =
    completenessFactors.filter(Boolean).length / completenessFactors.length;

  // ── Required skills coverage ──
  const requiredKeywords = categorizedKeywords.filter((kw) => kw.isRequired && kw.weight >= 0.8);
  const matchedRequired = requiredKeywords.filter((kw) =>
    resumeNormalized.includes(kw.keyword)
  );
  const requiredCoverage = requiredKeywords.length > 0
    ? matchedRequired.length / requiredKeywords.length
    : weightedMatchRatio; // Fall back to overall match if no explicit required section

  // ── Final ATS Score ──
  // Weighted formula: 50% skill match + 20% density + 15% completeness + 15% required coverage
  const rawScore =
    weightedMatchRatio * 0.50 +
    densityScore * 0.20 +
    completenessScore * 0.15 +
    requiredCoverage * 0.15;

  const atsScore = Math.round(Math.min(rawScore * 100, 100));
  const strengthRating = getStrengthRating(atsScore);

  // Generate recommendations
  const recommendations = generateRecommendations(
    matchedCategorized,
    missingCategorized,
    keywordMatchPercentage,
    atsScore,
    signals
  );

  // Sort missing keywords by weight (most important first)
  missingCategorized.sort((a, b) => b.weight - a.weight);

  return {
    atsScore,
    keywordMatchPercentage,
    matchedKeywords: matchedCategorized.map((kw) => kw.keyword),
    missingKeywords: missingCategorized.map((kw) => kw.keyword),
    totalKeywords: categorizedKeywords.length,
    strengthRating,
    recommendations,
  };
}
