import { STOP_WORDS } from './stopwords';
import type { SkillCategory, CategorizedKeyword } from '@/types';

// ─── Known Skill Dictionaries ───────────────────────────────────────────────
// Each set contains lowercase terms that belong to a specific skill category.
// When a keyword matches one of these sets it gets assigned that category
// and a corresponding weight boost.

const PROGRAMMING_LANGUAGES: Set<string> = new Set([
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'golang',
  'rust', 'ruby', 'php', 'swift', 'kotlin', 'scala', 'perl', 'r',
  'objective-c', 'dart', 'lua', 'haskell', 'elixir', 'erlang', 'clojure',
  'fortran', 'cobol', 'assembly', 'matlab', 'julia', 'groovy',
  'shell', 'bash', 'powershell', 'sql', 'plsql', 'tsql', 'nosql',
  'html', 'css', 'sass', 'scss', 'less', 'xml', 'json', 'yaml',
  'graphql', 'solidity', 'vhdl', 'verilog', 'apex',
]);

const FRAMEWORKS_AND_LIBRARIES: Set<string> = new Set([
  // JavaScript / TypeScript
  'react', 'react.js', 'reactjs', 'next.js', 'nextjs', 'angular', 'angular.js',
  'vue', 'vue.js', 'vuejs', 'svelte', 'nuxt', 'nuxt.js', 'gatsby',
  'express', 'express.js', 'node.js', 'nodejs', 'deno', 'bun',
  'jquery', 'backbone', 'ember', 'remix', 'astro',
  'redux', 'mobx', 'zustand', 'recoil', 'tanstack',
  'tailwindcss', 'tailwind', 'bootstrap', 'material-ui', 'chakra-ui',
  'styled-components', 'emotion', 'ant-design',
  'jest', 'mocha', 'cypress', 'playwright', 'vitest', 'storybook',
  'webpack', 'vite', 'rollup', 'esbuild', 'parcel', 'turbopack',

  // Python
  'django', 'flask', 'fastapi', 'tornado', 'pyramid',
  'pandas', 'numpy', 'scipy', 'matplotlib', 'seaborn',
  'scikit-learn', 'sklearn', 'tensorflow', 'pytorch', 'keras',
  'transformers', 'huggingface', 'langchain', 'llamaindex',
  'celery', 'airflow', 'dbt', 'great-expectations',
  'pytest', 'unittest', 'sqlalchemy', 'pydantic',

  // Java / JVM
  'spring', 'spring-boot', 'springboot', 'hibernate', 'maven', 'gradle',
  'junit', 'mockito', 'tomcat', 'netty', 'quarkus', 'micronaut',
  'kafka', 'spark', 'flink', 'hadoop', 'hive', 'presto', 'trino',

  // Ruby
  'rails', 'ruby-on-rails', 'sinatra',

  // .NET
  '.net', 'asp.net', 'blazor', 'entity-framework', 'xamarin', 'maui',

  // Mobile
  'react-native', 'flutter', 'swiftui', 'jetpack-compose', 'ionic', 'cordova',

  // DevOps / Infra
  'terraform', 'ansible', 'puppet', 'chef', 'pulumi',
  'prometheus', 'grafana', 'datadog', 'splunk', 'elk',
  'nginx', 'apache', 'caddy', 'haproxy',

  // Data / ML
  'spark', 'databricks', 'snowflake', 'dask', 'ray',
  'mlflow', 'kubeflow', 'sagemaker', 'vertex-ai',
  'opencv', 'spacy', 'nltk', 'gensim',
]);

const TOOLS_AND_PLATFORMS: Set<string> = new Set([
  // Version control
  'git', 'github', 'gitlab', 'bitbucket', 'svn', 'mercurial',

  // CI/CD
  'jenkins', 'circleci', 'travisci', 'travis-ci', 'github-actions',
  'gitlab-ci', 'teamcity', 'bamboo', 'argo', 'argocd', 'spinnaker',
  'drone', 'concourse',

  // Containers & Orchestration
  'docker', 'kubernetes', 'k8s', 'openshift', 'rancher', 'nomad',
  'podman', 'containerd', 'helm', 'istio', 'envoy', 'linkerd',

  // Messaging & Streaming
  'kafka', 'rabbitmq', 'redis', 'memcached', 'nats', 'pulsar',
  'activemq', 'zeromq', 'kinesis', 'eventbridge',

  // Monitoring & Logging
  'prometheus', 'grafana', 'datadog', 'new-relic', 'splunk',
  'elasticsearch', 'logstash', 'kibana', 'jaeger', 'zipkin',
  'pagerduty', 'opsgenie', 'sentry',

  // IDEs & Editors
  'vscode', 'intellij', 'eclipse', 'vim', 'neovim', 'emacs',

  // Project / Collaboration
  'jira', 'confluence', 'trello', 'asana', 'notion', 'linear',
  'slack', 'teams', 'figma', 'sketch', 'adobe-xd', 'invision',
  'miro', 'lucidchart',

  // API & Testing
  'postman', 'swagger', 'openapi', 'insomnia', 'soapui',
  'selenium', 'appium', 'k6', 'gatling', 'jmeter', 'locust',

  // Build & Package
  'npm', 'yarn', 'pnpm', 'pip', 'poetry', 'conda',
  'homebrew', 'apt', 'yum', 'snap', 'flatpak',

  // Data tools
  'tableau', 'power-bi', 'powerbi', 'looker', 'superset',
  'jupyter', 'notebook', 'colab', 'zeppelin',
]);

const CLOUD_TECHNOLOGIES: Set<string> = new Set([
  // AWS
  'aws', 'amazon-web-services', 'ec2', 's3', 'lambda', 'ecs', 'eks',
  'fargate', 'rds', 'dynamodb', 'aurora', 'redshift', 'athena',
  'glue', 'cloudformation', 'cloudfront', 'cloudwatch', 'sns', 'sqs',
  'step-functions', 'api-gateway', 'cognito', 'iam', 'route53',
  'elasticache', 'elastic-beanstalk', 'lightsail', 'amplify',
  'cdk', 'sam', 'bedrock',

  // GCP
  'gcp', 'google-cloud', 'bigquery', 'cloud-functions', 'cloud-run',
  'gke', 'compute-engine', 'cloud-storage', 'pub/sub', 'pubsub',
  'cloud-sql', 'firestore', 'firebase', 'vertex-ai', 'cloud-build',
  'cloud-composer', 'dataflow', 'dataproc', 'spanner',

  // Azure
  'azure', 'azure-devops', 'azure-functions', 'aks',
  'cosmos-db', 'cosmosdb', 'azure-sql', 'blob-storage',
  'azure-pipelines', 'logic-apps', 'app-service',
  'azure-ad', 'entra-id', 'azure-monitor',

  // General cloud concepts
  'microservices', 'serverless', 'containers', 'containerization',
  'cloud-native', 'iaas', 'paas', 'saas', 'faas',
  'ci/cd', 'cicd', 'devops', 'devsecops', 'sre',
  'infrastructure-as-code', 'iac',
  'load-balancing', 'auto-scaling', 'cdn', 'dns',
  'vpn', 'vpc', 'subnet', 'api-gateway',
]);

const DATABASES: Set<string> = new Set([
  // Relational
  'postgresql', 'postgres', 'mysql', 'mariadb', 'oracle',
  'sql-server', 'mssql', 'sqlite', 'cockroachdb', 'tidb',

  // NoSQL
  'mongodb', 'dynamodb', 'couchdb', 'cassandra', 'scylladb',
  'hbase', 'neo4j', 'arangodb', 'rethinkdb',
  'firebase', 'firestore', 'supabase', 'planetscale',

  // Cache / In-memory
  'redis', 'memcached', 'valkey', 'dragonfly',

  // Search
  'elasticsearch', 'opensearch', 'solr', 'meilisearch', 'algolia',
  'typesense', 'pinecone', 'weaviate', 'qdrant', 'chromadb',

  // Data warehouses
  'snowflake', 'redshift', 'bigquery', 'databricks',
  'clickhouse', 'druid', 'presto', 'trino',
]);

const METHODOLOGIES: Set<string> = new Set([
  'agile', 'scrum', 'kanban', 'lean', 'waterfall', 'safe',
  'xp', 'extreme-programming', 'tdd', 'bdd', 'ddd',
  'test-driven-development', 'behavior-driven-development',
  'domain-driven-design', 'pair-programming', 'mob-programming',
  'code-review', 'peer-review',
  'oop', 'functional-programming', 'reactive-programming',
  'event-driven', 'microservices', 'monorepo',
  'rest', 'restful', 'soap', 'grpc', 'graphql', 'websocket',
  'oauth', 'jwt', 'saml', 'sso', 'openid',
  'solid', 'dry', 'kiss', 'yagni',
  'design-patterns', 'mvc', 'mvvm', 'mvp',
  'cqrs', 'event-sourcing', 'saga-pattern',
  'twelve-factor', '12-factor',
  'gitflow', 'trunk-based-development',
  'blue-green-deployment', 'canary-deployment', 'feature-flags',
  'a/b-testing', 'observability', 'monitoring',
  'incident-response', 'postmortem', 'runbook',
  'sla', 'slo', 'sli',
]);

const CERTIFICATIONS: Set<string> = new Set([
  // AWS
  'aws-certified', 'solutions-architect', 'cloud-practitioner',
  'sysops-administrator', 'developer-associate',

  // GCP
  'google-cloud-certified', 'professional-cloud-architect',
  'professional-data-engineer',

  // Azure
  'azure-certified', 'az-900', 'az-104', 'az-204', 'az-305', 'az-400',

  // General
  'pmp', 'prince2', 'itil', 'togaf',
  'cissp', 'cism', 'cisa', 'ceh', 'comptia',
  'security+', 'network+', 'a+',
  'csm', 'psm', 'safe-agilist',
  'ckad', 'cka', 'cks',
  'terraform-associate', 'hashicorp-certified',
  'istqb', 'six-sigma', 'green-belt', 'black-belt',
  'ocjp', 'ocp', 'oca',
]);

const SOFT_SKILLS: Set<string> = new Set([
  'communication', 'leadership', 'teamwork', 'mentoring', 'mentorship',
  'collaboration', 'problem-solving', 'critical-thinking', 'analytical',
  'decision-making', 'time-management', 'prioritization',
  'presentation', 'negotiation', 'conflict-resolution',
  'adaptability', 'creativity', 'innovation',
  'attention-to-detail', 'multitasking', 'organization',
  'accountability', 'ownership', 'initiative',
  'empathy', 'emotional-intelligence',
  'stakeholder-management', 'client-facing',
  'cross-functional', 'interpersonal',
  'strategic-thinking', 'strategic-planning',
  'coaching', 'facilitation', 'delegation',
  'documentation', 'technical-writing',
]);

// ─── Multi-word Technical Terms (Bigrams & Trigrams) ────────────────────────
export const TECHNICAL_PHRASES: Set<string> = new Set([
  // AI / ML
  'machine learning', 'deep learning', 'artificial intelligence',
  'natural language processing', 'computer vision', 'neural networks',
  'reinforcement learning', 'transfer learning', 'generative ai',
  'large language models', 'prompt engineering',

  // Data
  'data science', 'data engineering', 'data analysis', 'data visualization',
  'data pipeline', 'data warehouse', 'data lake', 'data mesh',
  'data governance', 'data modeling', 'data quality',
  'etl pipeline', 'elt pipeline', 'batch processing', 'stream processing',
  'real-time analytics', 'business intelligence',

  // Engineering
  'software engineering', 'software development', 'software architecture',
  'system design', 'systems architecture', 'distributed systems',
  'web development', 'mobile development', 'full stack',
  'front end', 'back end', 'frontend', 'backend', 'fullstack',
  'api design', 'api development', 'rest api', 'graphql api',
  'database design', 'database administration',

  // DevOps & Cloud
  'cloud computing', 'cloud architecture', 'cloud migration',
  'infrastructure as code', 'continuous integration',
  'continuous delivery', 'continuous deployment',
  'site reliability engineering', 'platform engineering',
  'container orchestration', 'service mesh',
  'blue green deployment', 'canary deployment',
  'disaster recovery', 'high availability',
  'load balancing', 'auto scaling',

  // Security
  'cyber security', 'cybersecurity', 'network security',
  'application security', 'information security',
  'penetration testing', 'vulnerability assessment',
  'identity management', 'access control',
  'security compliance', 'threat modeling',

  // Management & Process
  'project management', 'product management', 'program management',
  'agile methodology', 'scrum master', 'product owner',
  'sprint planning', 'backlog grooming', 'release management',
  'change management', 'risk management',
  'quality assurance', 'quality engineering',
  'user experience', 'user interface', 'user research',
  'design thinking', 'design system',

  // Business
  'supply chain', 'business analysis', 'process improvement',
  'digital transformation', 'customer success',
  'revenue growth', 'cost optimization',
  'cross functional', 'team leadership',
  'technical leadership', 'engineering management',
  'technical writing', 'api documentation',
  'code review', 'pair programming',
  'version control', 'source control',
  'unit testing', 'integration testing', 'end to end testing',
  'performance testing', 'load testing',
  'accessibility testing', 'security testing',
]);

// ─── Skill Category Lookup ──────────────────────────────────────────────────

/**
 * Determine which skill category a keyword belongs to.
 * Returns the category and its base weight.
 */
export function categorizeKeyword(keyword: string): { category: SkillCategory; weight: number } {
  if (PROGRAMMING_LANGUAGES.has(keyword))        return { category: 'technical', weight: 1.0 };
  if (FRAMEWORKS_AND_LIBRARIES.has(keyword))      return { category: 'technical', weight: 1.0 };
  if (CLOUD_TECHNOLOGIES.has(keyword))            return { category: 'cloud', weight: 0.95 };
  if (DATABASES.has(keyword))                     return { category: 'database', weight: 0.95 };
  if (TOOLS_AND_PLATFORMS.has(keyword))            return { category: 'technical', weight: 0.90 };
  if (CERTIFICATIONS.has(keyword))                return { category: 'certification', weight: 0.90 };
  if (METHODOLOGIES.has(keyword))                 return { category: 'methodology', weight: 0.75 };
  if (SOFT_SKILLS.has(keyword))                   return { category: 'soft', weight: 0.40 };
  return { category: 'general', weight: 0.60 };
}

// ─── Text Normalization ─────────────────────────────────────────────────────

/**
 * Normalize text for comparison: lowercase, preserve tech terms with
 * dots/hyphens (e.g. node.js, react.js, ci/cd), remove other special
 * characters, and collapse whitespace.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    // Preserve dots in tech terms like "node.js", "vue.js", "asp.net"
    .replace(/\.(?![a-z])/g, ' ')
    // Preserve forward slash in terms like "ci/cd", "pub/sub"
    .replace(/\//g, '-')
    // Preserve hyphens between word characters
    .replace(/(?<=[a-z0-9])-(?=[a-z0-9])/g, '‑')
    // Remove all remaining special characters except preserved ones
    .replace(/[^a-z0-9.‑\s]/g, ' ')
    // Restore hyphens
    .replace(/‑/g, '-')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Section Context Detection ──────────────────────────────────────────────

/**
 * Detect whether a keyword appears in a "required" or "preferred" context
 * within the job description, so we can weight it accordingly.
 */
export function detectRequirementContext(text: string): {
  requiredSection: string;
  preferredSection: string;
} {
  const lower = text.toLowerCase();

  // Split on common section headers
  const requiredPatterns = [
    /(?:required|must-have|minimum|essential)\s*(?:skills|qualifications|requirements|experience|competencies)[:\s]/gi,
    /(?:what you(?:'ll)? need|what we(?:'re)? looking for|you (?:should|must) have)[:\s]/gi,
  ];

  const preferredPatterns = [
    /(?:preferred|nice-to-have|bonus|desired|plus|optional)\s*(?:skills|qualifications|requirements|experience)?[:\s]/gi,
    /(?:it(?:'s| is) (?:a )?(?:plus|bonus) if|ideally you(?:'ll)? have)[:\s]/gi,
  ];

  let requiredStart = -1;
  let preferredStart = -1;

  for (const pattern of requiredPatterns) {
    const match = pattern.exec(lower);
    if (match && (requiredStart === -1 || match.index < requiredStart)) {
      requiredStart = match.index;
    }
  }

  for (const pattern of preferredPatterns) {
    const match = pattern.exec(lower);
    if (match && (preferredStart === -1 || match.index < preferredStart)) {
      preferredStart = match.index;
    }
  }

  // Rough section splitting — take text from section header to next header or end
  const sectionBreakers = /\n\s*(?:required|preferred|nice|bonus|minimum|about|responsibilities|duties|what you|who you|benefits|compensation|salary|our team|about us|equal opportunity)/gi;

  const requiredSection = requiredStart >= 0
    ? extractSection(lower, requiredStart, sectionBreakers)
    : lower; // If no explicit sections, treat everything as "required"

  const preferredSection = preferredStart >= 0
    ? extractSection(lower, preferredStart, sectionBreakers)
    : '';

  return { requiredSection, preferredSection };
}

function extractSection(text: string, start: number, breakerPattern: RegExp): string {
  const remaining = text.slice(start);
  // Reset the regex
  breakerPattern.lastIndex = 0;
  // Find the first breaker AFTER the start (skip the one at start)
  let found = false;
  let match: RegExpExecArray | null;
  while ((match = breakerPattern.exec(remaining)) !== null) {
    if (match.index > 10) { // Skip the header itself
      return remaining.slice(0, match.index);
    }
    found = true;
  }
  return remaining;
}

// ─── Keyword Extraction ─────────────────────────────────────────────────────

/**
 * Extract meaningful, ATS-relevant keywords from text.
 *
 * Pipeline:
 * 1. Normalize text
 * 2. Extract multi-word technical phrases first (highest signal)
 * 3. Extract single-word keywords, filtering stop words
 * 4. Categorize each keyword and assign weight
 * 5. Filter out any remaining generic/non-skill words
 * 6. Deduplicate
 */
export function extractKeywords(text: string): string[] {
  const normalized = normalizeText(text);
  const words = normalized.split(' ');

  const seen = new Set<string>();
  const result: string[] = [];

  // 1. Extract multi-word technical phrases (bigrams & trigrams)
  //    These are the highest-signal keywords.
  for (let windowSize = 3; windowSize >= 2; windowSize--) {
    for (let i = 0; i <= words.length - windowSize; i++) {
      const phrase = words.slice(i, i + windowSize).join(' ');
      if (TECHNICAL_PHRASES.has(phrase) && !seen.has(phrase)) {
        seen.add(phrase);
        result.push(phrase);
      }
    }
  }

  // 2. Extract single-word keywords
  for (const word of words) {
    if (word.length < 2) continue;
    if (STOP_WORDS.has(word)) continue;
    if (seen.has(word)) continue;

    // Check if this word is part of an already-extracted phrase
    const isInPhrase = result.some(
      (phrase) => phrase.includes(' ') && phrase.split(' ').includes(word)
    );
    if (isInPhrase) continue;

    // Only include if it's a recognized skill OR looks like a technical term
    const { category } = categorizeKeyword(word);
    if (category !== 'general' || looksLikeTechnicalTerm(word)) {
      seen.add(word);
      result.push(word);
    }
  }

  return result;
}

/**
 * Extract keywords with full categorization and weight data.
 * Used by the analyzer for weighted scoring.
 */
export function extractCategorizedKeywords(
  text: string,
  fullText: string
): CategorizedKeyword[] {
  const keywords = extractKeywords(text);
  const { requiredSection, preferredSection } = detectRequirementContext(fullText);

  return keywords.map((keyword) => {
    const { category, weight: baseWeight } = categorizeKeyword(keyword);

    // Determine if keyword is in "required" vs "preferred" context
    const inRequired = requiredSection.includes(keyword);
    const inPreferred = preferredSection.includes(keyword) && !inRequired;

    // Adjust weight based on context
    let weight = baseWeight;
    if (inRequired) {
      weight = Math.min(weight * 1.2, 1.0); // Boost required skills
    } else if (inPreferred) {
      weight = weight * 0.8; // Reduce preferred-only skills
    }

    return {
      keyword,
      category,
      weight,
      isRequired: inRequired || !preferredSection, // If no sections, assume required
    };
  });
}

/**
 * Heuristic check: does this word look like a technical term?
 * Catches terms not in our dictionaries (e.g. "webpack", "prisma").
 */
function looksLikeTechnicalTerm(word: string): boolean {
  // Contains a dot (e.g. "node.js", "vue.js")
  if (word.includes('.')) return true;
  // Contains a hyphen (e.g. "ci-cd", "e-commerce") — but not if it's a compound English word
  if (word.includes('-') && word.length > 3) return true;
  // Ends with common tech suffixes
  if (/(?:js|db|ml|ai|ui|ux|api|sdk|cli|ops|sql|ql)$/i.test(word)) return true;
  // Contains numbers mixed with letters (e.g. "ec2", "s3", "h2")
  if (/[a-z]\d|\d[a-z]/i.test(word) && word.length <= 10) return true;
  // All uppercase acronyms of 2-5 chars (e.g. "REST", "SOAP", "gRPC")
  if (/^[A-Z]{2,5}$/.test(word)) return true;

  return false;
}
