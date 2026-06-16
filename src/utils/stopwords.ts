/**
 * Stop words for ATS keyword extraction.
 *
 * Three categories:
 * 1. Standard English stop words (~175 words)
 * 2. Recruitment/HR jargon words that appear in job postings but carry
 *    no ATS matching value (e.g. "looking", "role", "visionary")
 * 3. Marketing/filler words used for company branding
 */

// ─── Standard English Stop Words ────────────────────────────────────────────
const ENGLISH_STOP_WORDS = [
  // Articles & Determiners
  'a', 'an', 'the', 'this', 'that', 'these', 'those',
  'every', 'each', 'either', 'neither', 'another', 'any', 'some',
  'no', 'all', 'both', 'few', 'more', 'most', 'other', 'several',
  'such', 'many', 'much', 'own',

  // Pronouns
  'i', 'me', 'my', 'myself', 'mine',
  'we', 'us', 'our', 'ours', 'ourselves',
  'you', 'your', 'yours', 'yourself', 'yourselves',
  'he', 'him', 'his', 'himself',
  'she', 'her', 'hers', 'herself',
  'it', 'its', 'itself',
  'they', 'them', 'their', 'theirs', 'themselves',
  'who', 'whom', 'whose', 'which', 'what',
  'whoever', 'whomever', 'whatever', 'whichever',

  // Be verbs
  'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',

  // Have verbs
  'have', 'has', 'had', 'having',

  // Do verbs
  'do', 'does', 'did', 'doing', 'done',

  // Modal verbs
  'will', 'would', 'shall', 'should', 'may', 'might', 'must',
  'can', 'could', 'need', 'dare', 'ought',

  // Prepositions
  'at', 'by', 'for', 'from', 'in', 'into', 'of', 'on', 'onto',
  'to', 'up', 'with', 'about', 'above', 'across', 'after',
  'against', 'along', 'among', 'around', 'before', 'behind',
  'below', 'beneath', 'beside', 'besides', 'between', 'beyond',
  'down', 'during', 'except', 'inside', 'near', 'off', 'out',
  'outside', 'over', 'past', 'since', 'through', 'throughout',
  'toward', 'towards', 'under', 'underneath', 'until', 'unto',
  'upon', 'within', 'without',

  // Conjunctions
  'and', 'but', 'or', 'nor', 'yet', 'so',
  'although', 'because', 'unless', 'while', 'whereas',
  'whether', 'though', 'even', 'if', 'once', 'than',
  'till', 'when', 'whenever', 'where', 'wherever',

  // Adverbs & filler
  'not', 'very', 'just', 'too', 'also', 'only',
  'again', 'already', 'always', 'ever', 'never', 'often',
  'sometimes', 'still', 'here', 'there', 'now', 'then',
  'today', 'tomorrow', 'yesterday', 'soon', 'later',
  'quite', 'rather', 'really', 'simply', 'well',
  'almost', 'enough', 'however', 'therefore', 'thus',
  'instead', 'indeed', 'actually', 'probably', 'perhaps',
  'maybe', 'certainly', 'surely', 'truly',

  // Common verbs (not skill-relevant)
  'etc', 'eg', 'ie', 'able', 'like', 'get', 'got',
  'make', 'made', 'let', 'say', 'said', 'know', 'known',
  'take', 'taken', 'give', 'given', 'go', 'went', 'gone',
  'come', 'came', 'see', 'seen', 'look', 'find', 'found',
  'use', 'used', 'using',
  'new', 'old', 'good', 'great', 'best', 'better',
  'first', 'last', 'long', 'way', 'part',
  'year', 'years', 'day', 'days', 'time', 'times',
  'one', 'two', 'three', 'four', 'five',
  'per', 'via', 'plus', 'set',
];

// ─── Recruitment / HR Jargon ────────────────────────────────────────────────
// These words commonly appear in job descriptions but are NOT skills.
// An ATS should never match on "looking" or "role".
const RECRUITMENT_STOP_WORDS = [
  // Job posting structure words
  'role', 'roles', 'position', 'positions', 'job', 'jobs',
  'opening', 'openings', 'vacancy', 'vacancies', 'opportunity',
  'opportunities', 'posting', 'postings', 'listing',

  // Recruitment verbs & phrases
  'looking', 'seeking', 'hiring', 'recruiting', 'searching',
  'wanted', 'needed', 'required', 'preferred', 'desired',
  'responsible', 'responsibilities', 'responsibility',
  'duties', 'duty', 'tasks', 'task',
  'report', 'reporting', 'reports',
  'join', 'joining', 'apply', 'applying', 'application',
  'submit', 'submitting', 'candidate', 'candidates',
  'applicant', 'applicants', 'resume', 'resumes',
  'cover', 'letter', 'portfolio',

  // Company/team generic terms
  'company', 'organization', 'firm', 'employer',
  'team', 'teams', 'group', 'department', 'division',
  'office', 'location', 'workplace', 'environment',
  'culture', 'mission', 'vision', 'values',
  'colleague', 'colleagues', 'member', 'members',
  'staff', 'employee', 'employees', 'personnel',

  // Experience level descriptors (not skills)
  'junior', 'senior', 'mid-level', 'entry-level', 'lead',
  'principal', 'staff', 'associate', 'assistant',
  'manager', 'director', 'vp', 'chief', 'head',
  'level', 'tier', 'grade',

  // Time & availability
  'full-time', 'part-time', 'contract', 'freelance',
  'temporary', 'permanent', 'remote', 'onsite', 'hybrid',
  'immediately', 'asap', 'flexible', 'hours',

  // Compensation & benefits (not skills)
  'salary', 'compensation', 'benefits', 'bonus', 'equity',
  'stock', 'options', 'insurance', 'healthcare', 'dental',
  'vacation', 'pto', 'retirement', '401k', 'package',
  'competitive', 'commensurate',

  // Generic qualifiers
  'minimum', 'maximum', 'least', 'strong', 'proven',
  'demonstrated', 'extensive', 'solid', 'deep', 'broad',
  'relevant', 'related', 'equivalent', 'similar',
  'excellent', 'exceptional', 'outstanding', 'superior',

  // Generic action/description words
  'work', 'working', 'worked', 'develop', 'developing',
  'developed', 'create', 'creating', 'created',
  'build', 'building', 'built', 'manage', 'managing',
  'managed', 'lead', 'leading', 'led', 'support',
  'supporting', 'supported', 'help', 'helping', 'helped',
  'provide', 'providing', 'provided', 'ensure', 'ensuring',
  'ensured', 'maintain', 'maintaining', 'maintained',
  'implement', 'implementing', 'implemented',
  'collaborate', 'collaborating', 'collaborated',
  'participate', 'participating', 'participated',
  'contribute', 'contributing', 'contributed',
  'deliver', 'delivering', 'delivered',
  'drive', 'driving', 'driven',
  'handle', 'handling', 'handled',
  'perform', 'performing', 'performed',
  'assist', 'assisting', 'assisted',
  'include', 'including', 'includes', 'included',
  'involve', 'involving', 'involves', 'involved',
  'require', 'requiring', 'requires',
  'understand', 'understanding',
  'identify', 'identifying', 'identified',
  'define', 'defining', 'defined',
  'improve', 'improving', 'improved',
  'review', 'reviewing', 'reviewed',
  'evaluate', 'evaluating', 'evaluated',
  'communicate', 'communicating', 'communicated',
  'coordinate', 'coordinating', 'coordinated',
  'facilitate', 'facilitating', 'facilitated',
  'prepare', 'preparing', 'prepared',
  'conduct', 'conducting', 'conducted',
  'analyze', 'analyzing', 'analyzed',
  'research', 'researching', 'researched',
  'establish', 'establishing', 'established',
  'plan', 'planning', 'planned',
  'track', 'tracking', 'tracked',
  'monitor', 'monitoring', 'monitored',
  'resolve', 'resolving', 'resolved',
  'process', 'processing', 'processed',
  'document', 'documenting', 'documented',
  'design', 'designing', 'designed',
  'test', 'testing', 'tested',
  'train', 'training', 'trained',
  'learn', 'learning', 'learned',

  // Misc non-skill words frequently in JDs
  'ability', 'knowledge', 'experience', 'expertise',
  'background', 'proficiency', 'familiarity', 'exposure',
  'skill', 'skills', 'qualification', 'qualifications',
  'requirement', 'requirements', 'criteria', 'criterion',
  'ideal', 'ideally', 'plus', 'bonus', 'nice-to-have',
  'must-have', 'essential', 'key', 'core',
  'hands-on', 'practical', 'real-world',
  'industry', 'sector', 'field', 'area', 'domain',
  'project', 'projects', 'initiative', 'initiatives',
  'product', 'products', 'service', 'services',
  'solution', 'solutions', 'system', 'systems',
  'business', 'technical', 'functional',
  'internal', 'external', 'global', 'local',
  'multiple', 'various', 'different', 'complex',
  'high', 'low', 'large', 'small',
  'based', 'focused', 'oriented', 'driven',
  'related', 'specific', 'general', 'overall',
  'ongoing', 'current', 'future', 'existing',
  'additional', 'other', 'further',
  'across', 'within', 'throughout',
  'daily', 'weekly', 'monthly', 'annual', 'annually',
  'fast-paced', 'dynamic', 'innovative', 'collaborative',
  'inclusive', 'diverse', 'equal',
  'stakeholder', 'stakeholders', 'client', 'clients',
  'customer', 'customers', 'user', 'users', 'end-user',
  'vendor', 'vendors', 'partner', 'partners',
  'success', 'successful', 'successfully',
  'effective', 'effectively', 'efficient', 'efficiently',
  'timely', 'accurate', 'accurately',
  'appropriate', 'appropriately',
];

// ─── Marketing / Buzzword Filler ────────────────────────────────────────────
// These appear in company branding but are meaningless for skill matching.
const MARKETING_STOP_WORDS = [
  'visionary', 'next-generation', 'cutting-edge', 'state-of-the-art',
  'world-class', 'best-in-class', 'bleeding-edge', 'revolutionary',
  'disruptive', 'game-changing', 'groundbreaking', 'pioneering',
  'transformative', 'synergy', 'synergies', 'paradigm',
  'leverage', 'leveraging', 'leveraged',
  'empower', 'empowering', 'empowered',
  'evangelist', 'rockstar', 'ninja', 'guru', 'wizard', 'unicorn',
  'passionate', 'passion', 'enthusiastic', 'enthusiasm',
  'thriving', 'thrive', 'flourish', 'flourishing',
  'exciting', 'excited', 'exciting', 'amazing', 'awesome',
  'incredible', 'fantastic', 'wonderful', 'remarkable',
  'unparalleled', 'unprecedented', 'unique', 'uniquely',
  'seamless', 'seamlessly', 'robust', 'robustly',
  'scalable', 'turnkey', 'holistic', 'end-to-end',
  'mission-critical', 'mission-driven', 'purpose-driven',
  'thought-leader', 'thought-leadership',
  'ecosystem', 'landscape', 'space',
  'north-star', 'alignment', 'aligned',
  'impactful', 'meaningful', 'purposeful',
  'proactive', 'proactively', 'self-starter',
  'go-getter', 'results-oriented', 'detail-oriented',
  'forward-thinking', 'like-minded',
  'vibrant', 'energetic', 'entrepreneurial',
];

/**
 * Combined stop words set used by the keyword extractor.
 * Merges standard English, recruitment jargon, and marketing filler.
 */
export const STOP_WORDS: Set<string> = new Set([
  ...ENGLISH_STOP_WORDS,
  ...RECRUITMENT_STOP_WORDS,
  ...MARKETING_STOP_WORDS,
]);
