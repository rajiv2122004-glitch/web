/**
 * Portfolio Configuration & Content File
 * 
 * You can easily edit all your personal information, social links,
 * projects, skills, and copy in this single file.
 */

export interface SocialLinks {
  linkedin: string;
  youtube: string;
  whatsapp: {
    number: string;
    displayNumber: string;
    prefilledMessage: string;
    url: string;
  };
  email: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'AI & Search' | 'Marketing & Growth' | 'Development & Analysis';
  description: string;
  highlight: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location?: string;
  type: string;
  summary: string;
  responsibilities: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  skills: string[];
  image: string;
  projectUrl?: string;
  githubUrl?: string;
  highlights: string[];
  metricsContext?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Rajiv Kumar H N',
    headline: 'AI Research & Marketing Specialist',
    subheadline: 'SEO | GEO | AEO | AI-Driven Lead Generation',
    statement:
      'I explore the intersection of artificial intelligence, search visibility, and digital marketing to help brands build a stronger online presence.',
    portraitImage: '/src/assets/images/rajiv_kumar_portrait_1793114113158.jpg',
    aboutParagraphs: [
      "Hello, I'm Rajiv Kumar H N, an AI research and marketing professional interested in artificial intelligence, search optimization, and digital growth. My interests include SEO, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), AI-assisted content strategies, and lead generation.",
      'I enjoy exploring emerging technologies, developing digital projects, and finding practical ways to improve online visibility and user experiences.',
    ],
    nammawebMention:
      'Contributed as an AI Research Associate Intern at Nammaweb, actively advancing the AI Index Survey initiative, investigating generative search algorithms, and formulating data-backed visibility strategies.',
  },

  socials: {
    linkedin: 'https://www.linkedin.com/in/rajiv-kumar-h-n-a024683b5/',
    youtube: 'https://www.youtube.com/@Rajiv02-y6s1f',
    whatsapp: {
      number: '917676546577',
      displayNumber: '+91 76765 46577',
      prefilledMessage:
        'Hello Rajiv, I visited your portfolio website and would like to connect with you.',
      url: 'https://wa.me/917676546577?text=Hello%20Rajiv%2C%20I%20visited%20your%20portfolio%20website%20and%20would%20like%20to%20connect%20with%20you.',
    },
    email: 'rajiv2122004@gmail.com',
  },

  skills: [
    {
      id: 'seo',
      name: 'Search Engine Optimization (SEO)',
      category: 'AI & Search',
      description:
        'Organic search strategies, on-page architecture, technical indexing, and semantic search intent alignment.',
      highlight: 'Core Search Foundations',
    },
    {
      id: 'geo',
      name: 'Generative Engine Optimization (GEO)',
      category: 'AI & Search',
      description:
        'Structuring content for visibility within generative AI engines, citations in LLM responses, and synthetic search ecosystems.',
      highlight: 'Next-Gen AI Search',
    },
    {
      id: 'aeo',
      name: 'Answer Engine Optimization (AEO)',
      category: 'AI & Search',
      description:
        'Optimizing for conversational answer engines, knowledge panels, voice queries, and direct factual syntheses.',
      highlight: 'Direct Answer Synthesis',
    },
    {
      id: 'ai-research',
      name: 'AI Research',
      category: 'AI & Search',
      description:
        'Evaluating emerging LLMs, testing prompt-to-query heuristics, model benchmarking, and synthesis algorithms.',
      highlight: 'Emerging Tech Intelligence',
    },
    {
      id: 'ai-marketing',
      name: 'AI-Assisted Marketing',
      category: 'Marketing & Growth',
      description:
        'Integrating artificial intelligence tools into audience segmentation, campaign personalization, and message resonance.',
      highlight: 'Intelligent Campaigns',
    },
    {
      id: 'lead-generation',
      name: 'Lead Generation',
      category: 'Marketing & Growth',
      description:
        'Designing customer acquisition funnels, intent-driven inbound journeys, and automated prospect qualification.',
      highlight: 'High-Intent Funnels',
    },
    {
      id: 'content-marketing',
      name: 'Content Marketing',
      category: 'Marketing & Growth',
      description:
        'Developing authoritative, research-backed content frameworks tailored to capture and retain industry attention.',
      highlight: 'Authoritative Narratives',
    },
    {
      id: 'digital-strategy',
      name: 'Digital Marketing Strategy',
      category: 'Marketing & Growth',
      description:
        'Holistic multi-channel planning coordinating search visibility, brand positioning, and performance measurement.',
      highlight: 'Multi-Channel Growth',
    },
    {
      id: 'web-dev',
      name: 'Website Development',
      category: 'Development & Analysis',
      description:
        'Building responsive, fast, search-optimized web applications with modern frontend frameworks and semantic standards.',
      highlight: 'Performant Interfaces',
    },
    {
      id: 'data-analysis',
      name: 'Research and Data Analysis',
      category: 'Development & Analysis',
      description:
        'Conducting structured surveys, trend analysis, audience behavior tracking, and empirical data interpretation.',
      highlight: 'Empirical Insights',
    },
  ] as SkillItem[],

  experience: [
    {
      id: 'nammaweb-intern',
      role: 'AI Research Associate Intern',
      organization: 'Nammaweb',
      type: 'Research & Marketing Internship',
      summary:
        'Spearheading research initiatives focused on artificial intelligence adoption, search engine transformation, and data-driven visibility frameworks.',
      responsibilities: [
        'Conducted in-depth AI research and contributed to the strategic execution of the AI Index Survey initiative across educational institutions.',
        'Explored evolving algorithms in Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) to define future search visibility models.',
        'Collaborated on digital marketing execution, evaluating content authority patterns and AI-assisted marketing workflows.',
        'Analyzed empirical survey data to identify technology readiness gaps and formulate actionable digital recommendations.',
      ],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: 'ai-index-survey',
      title: 'AI Index Survey',
      category: 'AI Research & Education',
      shortDescription:
        'A comprehensive research study examining artificial intelligence adoption, technological readiness, and integration paradigms across educational institutions.',
      fullDescription:
        'The AI Index Survey is an empirical initiative analyzing how educational institutions evaluate, adopt, and deploy artificial intelligence. The research assesses infrastructure maturity, educator sentiment, curriculum integration barriers, and ethical AI policies, providing actionable guidance for modern academic decision-makers.',
      skills: ['AI Research', 'Empirical Survey Design', 'Data Analysis', 'Academic Technology'],
      image: '/src/assets/images/project_ai_index_1793114114434.jpg',
      highlights: [
        'Survey methodology designed to capture multi-stakeholder institutional perspectives',
        'In-depth analysis of AI readiness factors, budget allocation, and faculty enablement',
        'Actionable frameworks for progressive AI curriculum and policy implementation',
      ],
      metricsContext: 'Conducted under Nammaweb research initiatives',
    },
    {
      id: 'seo-geo-aeo-research',
      title: 'SEO, GEO & AEO Research',
      category: 'Search Intelligence',
      shortDescription:
        'Pioneering strategies and comparative analyses bridging traditional search visibility with modern generative AI and answer engine algorithms.',
      fullDescription:
        'With generative search engines (like Perplexity, Google Gemini Overviews, and ChatGPT Search) reshaping how people seek information, this research breaks down the transition from keyword-based SEO to entity-based Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). It provides a concrete blueprint for brands to secure AI citations and authoritative answer placement.',
      skills: ['Generative Engine Optimization', 'Answer Engine Optimization', 'Semantic Search', 'Knowledge Graphs'],
      image: '/src/assets/images/project_seo_geo_1793114114806.jpg',
      highlights: [
        'Entity modeling and structured schema optimization for synthetic answer engines',
        'Framework for earning citations in generative LLM responses and knowledge carousels',
        'Comparative performance benchmarks between traditional SERP and AI-synthesized outputs',
      ],
    },
    {
      id: 'ai-powered-websites',
      title: 'AI-Powered Website Projects',
      category: 'Web & Digital Platforms',
      shortDescription:
        'Interactive web applications and digital platforms built with modern frontend frameworks and intelligent automation workflows.',
      fullDescription:
        'A series of modern web developments integrating clean user experiences, fast loading performance, technical SEO best practices, and intelligent feature integrations. Engineered to deliver seamless cross-device responsiveness and high conversion efficiency for targeted audience engagement.',
      skills: ['Website Development', 'TypeScript', 'React', 'Technical SEO', 'Performance'],
      image: '/src/assets/images/project_ai_websites_1793114114479.jpg',
      highlights: [
        'Lighthouse-optimized architecture with sub-second initial paint and zero layout shifts',
        'Semantic HTML5 structure and dynamic OpenGraph tagging for maximum discoverability',
        'Modular, maintainable code architectures engineered for rapid scaling',
      ],
    },
    {
      id: 'personal-portfolio',
      title: 'Personal Portfolio Platform',
      category: 'Branding & Motion Design',
      shortDescription:
        'A bespoke, high-performance personal portfolio showcasing technical identity, research initiatives, and cinematic interactive motion.',
      fullDescription:
        'Designed as an editorial-grade digital home, this platform features cinematic entrance transitions, authentic identity preservation, interactive skill categorizations, and direct multi-channel contact pathways including verified LinkedIn, YouTube, and WhatsApp integrations.',
      skills: ['UI/UX Design', 'Motion Architecture', 'Brand Positioning', 'Accessibility'],
      image: '/src/assets/images/rajiv_kumar_portrait_1793114113158.jpg',
      highlights: [
        'Cinematic interactive entrance motion with reduced-motion fallback compliance',
        'Direct instant WhatsApp message dispatch with pre-filled context',
        'Centralized content configuration enabling zero-friction maintenance',
      ],
    },
  ] as ProjectItem[],

  youtubeShowcase: {
    title: 'Rajiv Kumar H N — Digital & AI Insights',
    channelUrl: 'https://www.youtube.com/@Rajiv02-y6s1f',
    channelHandle: '@Rajiv02-y6s1f',
    description:
      'Explore tutorials, technology explorations, and insightful discussions covering artificial intelligence, search visibility strategies, and digital innovations on my official channel.',
    featuredTopics: [
      'Generative Engine Optimization (GEO) & The Future of Search',
      'Answer Engine Optimization (AEO) Principles & Practical Demos',
      'AI-Powered Lead Generation & Marketing Automation Frameworks',
      'Emerging AI Research & Industry Implementation Studies',
    ],
  },
};
