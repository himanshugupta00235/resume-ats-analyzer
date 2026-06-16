# 📄 Resume ATS Analyzer

A powerful, local-first Resume ATS (Applicant Tracking System) Analyzer built with Next.js 15. Paste your resume and a job description to instantly get an ATS compatibility score, keyword analysis, and actionable recommendations — all processed client-side with zero data sent to any server.

<!-- Add screenshot here -->

**[🔗 Live Demo](#)** <!-- Replace with your deployed URL -->

---

## ✨ Features

- **ATS Score Calculation** — Weighted scoring formula analyzing keyword match, keyword density, and resume completeness signals
- **Keyword Extraction & Matching** — Intelligent NLP-inspired keyword extraction with stop word filtering and multi-word technical term detection
- **Missing Keywords Report** — See exactly which job description keywords are absent from your resume
- **Smart Recommendations** — Dynamic, prioritized suggestions for improving your resume's ATS compatibility
- **Resume Completeness Check** — Detects presence of contact info, education, experience, skills sections, and quantified achievements
- **100% Client-Side** — All processing happens in the browser; your data never leaves your machine
- **Dark Mode Support** — Elegant dark/light theme toggle with Tailwind's class-based dark mode
- **Responsive Design** — Fully responsive layout optimized for desktop, tablet, and mobile
- **Modern UI** — Glassmorphism effects, smooth animations, and a premium SaaS-inspired interface

---

## 🛠️ Tech Stack

| Technology      | Purpose                    |
| --------------- | -------------------------- |
| **Next.js 15**  | React framework & routing  |
| **React 19**    | UI components              |
| **TypeScript**  | Type safety                |
| **Tailwind CSS**| Utility-first styling      |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: latest LTS)
- **npm**, **yarn**, or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/resume-ats-analyzer.git

# Navigate to the project directory
cd resume-ats-analyzer

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: Resume ATS Analyzer"
git remote add origin https://github.com/your-username/resume-ats-analyzer.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **"Import Project"** and select your repository.
4. Vercel will auto-detect Next.js settings — click **Deploy**.
5. Your app will be live at `https://your-project.vercel.app` within minutes.

---

## 📁 Project Structure

```
resume-ats-analyzer/
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router pages & layouts
│   │   ├── layout.tsx       # Root layout with Inter font & theme
│   │   ├── page.tsx         # Main application page
│   │   └── globals.css      # Global styles & Tailwind directives
│   ├── components/          # React UI components
│   │   ├── Header.tsx       # Navigation bar with dark mode toggle
│   │   ├── ResumeInput.tsx  # Resume & JD text input form
│   │   ├── ScoreDisplay.tsx # Animated ATS score gauge
│   │   ├── KeywordAnalysis.tsx # Matched/missing keyword lists
│   │   ├── Recommendations.tsx # Prioritized improvement cards
│   │   └── Footer.tsx       # Page footer
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # AnalysisResult, Recommendation types
│   └── utils/               # Core logic utilities
│       ├── analyzer.ts      # ATS scoring engine
│       ├── keywords.ts      # Keyword extraction & normalization
│       └── stopwords.ts     # English stop words set
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please ensure your code follows the existing style and includes appropriate TypeScript types.

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ for <a href="#">Digital Heroes</a>
</p>
