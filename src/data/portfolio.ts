/**
 * Central portfolio content for Mohammad Sheran Asgar.
 * Update this file when adding verified project, education, or contact details.
 */
export type Palette = { from: string; via: string; to: string; accent: string };
const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const profile = {
  fullName: 'Mohammad Sheran Asgar',
  displayName: 'Sheran Asgar',
  firstName: 'SHERAN',
  seriesTag: 'THE SERIES',
  originalLabel: 'A SHERAN ORIGINAL',
  role: 'CSE Student · Full-Stack Developer · AI & Data Analytics',
  tagline: ['Full-Stack Development', 'AI / ML', 'Data Analytics'],
  intro: 'A B.Tech Computer Science student building practical web applications, AI-powered tools, and data-driven projects with React, Next.js, Python, Java, SQL, and modern cloud platforms.',
  location: 'Lucknow, Uttar Pradesh',
  email: '',
  links: {
    linkedin: 'https://www.linkedin.com/in/mohammad-sheran-asgar/',
    github: 'https://github.com/Sheran2004',
  },
  resumePdf: '',
  portrait: {
    src: '/assets/sheran-asgar.jpeg',
    srcSet: '/assets/sheran-asgar.jpeg 1240w',
    alt: 'Mohammad Sheran Asgar wearing a navy suit and burgundy tie',
  },
  interests: ['Full-Stack Development', 'Artificial Intelligence', 'Data Analytics', 'Machine Learning'],
};

export const education = [
  {
    school: 'Noida Institute of Engineering and Technology',
    place: 'Greater Noida, Uttar Pradesh',
    degree: 'B.Tech — Computer Science and Engineering',
    period: '2023 – 2027',
    score: 'Currently pursuing',
  },
];

export const experience = [
  {
    company: 'GAOTek Inc.', role: 'Web Development Intern', place: 'Remote', period: 'Jul 2026 – Present',
    points: ['Develop responsive web interfaces using HTML, CSS, JavaScript, and React.', 'Collaborate with a remote team on web development tasks and iterative improvements.'],
  },
  {
    company: 'Cook N Klean', role: 'Human Resources Intern', place: 'Remote', period: 'Jul 2026 – Sep 2026',
    points: ['Supported recruitment, resume screening, interview coordination, onboarding, and HR documentation.', 'Practised candidate communication and organisational coordination.'],
  },
  {
    company: 'Suvidha Foundation (Suvidha Mahila Mandal)', role: 'Machine Learning Intern', place: 'Remote · Nagpur, Maharashtra', period: 'Jul 2026 – Aug 2026',
    points: ['Worked on machine-learning learning tasks and applied core ML concepts to practical problem-solving.'],
  },
  {
    company: 'ELiteTech Intern', role: 'Full Stack Developer Intern', place: 'Hybrid', period: 'Jul 2026 – Aug 2026',
    points: ['Built responsive web applications using React.js, Node.js, Express.js, and MongoDB.', 'Developed REST APIs and integrated frontend interfaces with backend services.'],
  },
  {
    company: 'The Developers Arena', role: 'Web Development Intern', place: 'Remote', period: 'Nov 2025 – Feb 2026',
    points: ['Built responsive web interfaces using HTML, CSS, JavaScript, and React.', 'Collaborated with developers using Git and GitHub.'],
  },
];

export type Metric = { value: string; label: string };
export type Project = {
  id: string; title: string; year: string; genre: string; logline: string; stack: string[];
  build: string[]; features: string[]; metrics: Metric[]; github?: string; live?: string;
  palette: Palette; motif: 'shield' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'mplad-sentinel', title: 'MPLAD Sentinel', year: '2026', genre: 'GovTech · Data Intelligence · Anomaly Detection',
    logline: 'A review dashboard for exploring MPLADS development works, surfacing unusual patterns, and tracking human review decisions.',
    stack: ['TypeScript', 'React', 'Vite', 'PostgreSQL', 'Groq'],
    build: ['Built a workflow-oriented dashboard for imported development-work records and explainable risk signals.', 'Added database-backed case review and event-history concepts to make analysis traceable.'],
    features: ['Works data exploration', 'Anomaly signals', 'Case review workflow', 'Review event history', 'AI-assisted investigation'],
    metrics: [], github: 'https://github.com/Sheran2004/mplad-sentinel', live: 'https://mplad-sentinel-eosin.vercel.app', palette: ocean, motif: 'tenants',
  },
  {
    id: 'meditwin-ai', title: 'Meditwin AI', year: '2026', genre: 'HealthTech · AI · Full Stack',
    logline: 'An AI-powered digital health platform concept for risk prediction, clinical decision support, report analysis, and emergency alerts.',
    stack: ['Next.js', 'FastAPI', 'Python', 'PostgreSQL', 'Groq'],
    build: ['Worked on a full-stack healthcare workflow combining a modern web interface with API-backed services.', 'Focused on health-risk insights, report interpretation, and clear clinical-support workflows.'],
    features: ['Risk prediction workflows', 'Report analysis', 'Clinical decision support', 'Emergency alert concepts', 'Full-stack architecture'],
    metrics: [], github: 'https://github.com/Sheran2004/Meditwin-AI', live: 'https://meditwin-ai-gamma.vercel.app', palette: crimson, motif: 'shield',
  },
  {
    id: 'oceanguard-ai', title: 'OceanGuard AI', year: '2026', genre: 'AI · Computer Vision · Environment',
    logline: 'An AI-powered solar-image analysis project focused on detecting marine debris and supporting cleaner waterways.',
    stack: ['Python', 'Computer Vision', 'AI'],
    build: ['Explores image-based detection workflows for identifying debris in marine imagery.', 'Frames computer vision as a practical tool for environmental monitoring.'],
    features: ['Image analysis', 'Marine debris detection focus', 'AI-assisted monitoring'],
    metrics: [], github: 'https://github.com/Sheran2004/oceanguard-ai', palette: ocean, motif: 'flow',
  },
  {
    id: 'campusos-ai', title: 'CampusOS AI', year: '2026', genre: 'EdTech · AI · Career Platform',
    logline: 'An AI-powered campus career and placement platform bringing job discovery, resume analysis, mock interviews, and student support together.',
    stack: ['TypeScript', 'React', 'AI', 'Web APIs'],
    build: ['Designed around student career workflows, from resume preparation to interview practice and opportunity discovery.', 'Combines several placement-support features into one campus-oriented experience.'],
    features: ['Resume analysis', 'Mock interviews', 'Job discovery', 'Hackathon and mentor discovery', 'Student career workflows'],
    metrics: [], github: 'https://github.com/Sheran2004/CampusOS-AI', live: 'https://campusos-ai-neon.vercel.app', palette: violet, motif: 'flow',
  },
  {
    id: 'inkwell-collab-editor', title: 'Inkwell Collab Editor', year: '2026', genre: 'Full Stack · Real-Time Collaboration',
    logline: 'A collaborative document editor designed for live editing and communication across multiple users.',
    stack: ['React', 'Node.js', 'Socket.IO', 'PostgreSQL'],
    build: ['Built around real-time collaboration and synchronised editing workflows.', 'Uses a full-stack architecture with live communication features.'],
    features: ['Real-time collaboration', 'Live updates', 'Collaborative editing', 'Full-stack application'],
    metrics: [], github: 'https://github.com/Sheran2004/inkwell-collab-editor', live: 'https://inkwell-collab-editor-beta.vercel.app', palette: jade, motif: 'flow',
  },
  {
    id: 'kabadiwala-connect', title: 'Kabadiwala Connect', year: '2026', genre: 'Marketplace · Sustainability · AI',
    logline: 'A mobile-first scrap marketplace connecting scrap collectors with recyclers through listings, pickup coordination, and tracking.',
    stack: ['Python', 'Web APIs', 'AI'],
    build: ['Focused on connecting scrap sellers, collectors, and recycling partners in one workflow.', 'Includes marketplace and pickup-related functionality to support a more organised recycling process.'],
    features: ['Scrap listings', 'Pickup coordination', 'Order tracking', 'Ratings and chat concepts', 'Hindi and English voice-AI direction'],
    metrics: [], github: 'https://github.com/Sheran2004/kabadiwala-connect', palette: jade, motif: 'tenants',
  },
  {
    id: 'happybirthday-bestie', title: 'HappyBirthday Bestie', year: '2026', genre: 'Creative Web · Interactive Experience',
    logline: 'A personalised birthday surprise website with heartfelt messages, music, a special letter, and animated moments.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    build: ['Created a playful, story-led birthday experience rather than a standard static greeting page.', 'Uses interactive sections, animation, and music to make the surprise feel personal.'],
    features: ['Birthday story', 'Animated interactions', 'Music experience', 'Personal letter and surprise content'],
    metrics: [], github: 'https://github.com/Sheran2004/HappyBirthday-Bestie', live: 'https://happybirthdaybestie-pearl.vercel.app', palette: crimson, motif: 'flow',
  },
  {
    id: 'transcript-studio', title: 'TranscriptStudio', year: '2026', genre: 'AI · Speech-to-Text · Translation',
    logline: 'A local-first tool for transcribing audio and video with timestamps and translating segments across English, Hindi, and Hinglish.',
    stack: ['Python', 'Flask', 'faster-whisper', 'CTranslate2', 'Argos Translate'],
    build: ['Developed a Flask workflow for media transcription with segment timing.', 'Explored multilingual translation and local speech-processing components.'],
    features: ['Audio and video transcription', 'Timestamped segments', 'Multilingual translation', 'English, Hindi and Hinglish workflows', 'Local processing'],
    metrics: [], github: 'https://github.com/Sheran2004/TranscriptStudio', palette: violet, motif: 'shield',
  },
  {
    id: 'vision-ai', title: 'Vision AI', year: '2026', genre: 'Multimodal AI · Voice · Computer Vision',
    logline: 'An on-device-style multimodal assistant concept combining AI chat, voice input, OCR, summarisation, translation, and object detection.',
    stack: ['JavaScript', 'Groq', 'YOLO', 'OCR'],
    build: ['Brings several visual and language interactions into a single assistant experience.', 'Explores voice, image understanding, and AI-powered assistance in one interface.'],
    features: ['AI chat', 'Voice input', 'OCR', 'Summarisation and translation', 'Object detection'],
    metrics: [], github: 'https://github.com/Sheran2004/Vision-AI', live: 'https://visionsync-frontend-two.vercel.app', palette: ocean, motif: 'shield',
  },
  {
    id: 'surakshaaai', title: 'SurakshaAI', year: '2026', genre: 'AI Safety · Scam Detection',
    logline: 'An AI-assisted scam detection concept helping users identify suspicious messages, links, screenshots, and voice-based scam attempts.',
    stack: ['Python', 'AI', 'Text Analysis'],
    build: ['Targets common digital-safety signals across messages, URLs, and user-provided evidence.', 'Designed with accessibility and scam awareness in mind, especially for vulnerable users.'],
    features: ['Suspicious message review', 'Link risk checks', 'Screenshot analysis direction', 'Voice-scam awareness'],
    metrics: [], github: 'https://github.com/Sheran2004/SurakshaAI', palette: crimson, motif: 'shield',
  },
  {
    id: 'data-intelligence-platform', title: 'Data Intelligence Platform', year: '2026', genre: 'AI · Data Analytics · Natural Language',
    logline: 'An AI-assisted analytics platform that turns natural-language prompts into structured datasets, workflows, summaries, and charts.',
    stack: ['Python', 'LLMs', 'Data Analysis', 'Charts'],
    build: ['Explores converting plain-language questions into structured analytical workflows.', 'Combines dataset generation and summarisation with visual reporting concepts.'],
    features: ['Natural-language prompts', 'Structured datasets', 'AI summaries', 'Charts and dashboards'],
    metrics: [], github: 'https://github.com/Sheran2004/data-intelligence-platform', palette: ocean, motif: 'tenants',
  },
  {
    id: 'leadmail-ai', title: 'Leadmail AI', year: '2026', genre: 'AI Automation · Sales Operations',
    logline: 'An AI-assisted lead sourcing and outreach console for classifying prospects, drafting personalised emails, and tracking replies.',
    stack: ['TypeScript', 'React', 'AI', 'Email APIs'],
    build: ['Designed to support lead discovery and outreach in a single workflow.', 'Focuses on personalisation, prospect organisation, and reply tracking.'],
    features: ['Lead sourcing and import', 'AI prospect classification', 'Personalised email drafts', 'Reply tracking'],
    metrics: [], github: 'https://github.com/Sheran2004/Leadmail-AI', palette: amber, motif: 'flow',
  },
  {
    id: 'travel-together', title: 'Travel Together', year: '2026', genre: 'Social Travel · Full Stack',
    logline: 'A travel social platform for discovering trips, finding compatible travel partners, and coordinating group plans.',
    stack: ['JavaScript', 'React', 'WebRTC', 'Maps'],
    build: ['Centres on matching travellers with similar plans and interests.', 'Includes collaboration-oriented trip planning and communication concepts.'],
    features: ['Trip discovery', 'Travel partner matching', 'Group trip planning', 'Voice notes and chat concepts'],
    metrics: [], github: 'https://github.com/Sheran2004/Travel-Together', live: 'https://travel-together-mdkh.onrender.com', palette: jade, motif: 'flow',
  },
  {
    id: 'retail-customer-analytics', title: 'Retail Customer Analytics', year: '2026', genre: 'Data Analytics · BI · Customer Insights',
    logline: 'A retail analytics dashboard exploring transaction data, customer segments, repeat purchases, and revenue trends.',
    stack: ['Python', 'SQL', 'Power BI', 'Streamlit'],
    build: ['Analyses retail transaction patterns to support customer and revenue insights.', 'Connects data preparation with dashboard-oriented reporting.'],
    features: ['Customer segmentation', 'Repeat purchase analysis', 'Revenue trends', 'Interactive analytics'],
    metrics: [], github: 'https://github.com/Sheran2004/Retail-Customer-Analytics', palette: amber, motif: 'tenants',
  },
  {
    id: 'ecommerce-sales-dashboard', title: 'Ecommerce Sales Dashboard', year: '2026', genre: 'Data Analytics · Sales Intelligence',
    logline: 'An interactive sales analytics dashboard exploring thousands of orders, sales trends, profit margins, and regional performance.',
    stack: ['Power BI', 'SQL', 'Python', 'Streamlit'],
    build: ['Organises sales data into business-focused performance views.', 'Explores regional comparisons, product trends, margins, and customer segments.'],
    features: ['Sales trends', 'Profit and margin analysis', 'Regional performance', 'Customer segmentation'],
    metrics: [], github: 'https://github.com/Sheran2004/Ecommerce-Sales-Dashboard', palette: ocean, motif: 'tenants',
  },
  {
    id: 'hr-analytics-dashboard', title: 'HR Analytics Dashboard', year: '2026', genre: 'People Analytics · BI',
    logline: 'An employee analytics dashboard focused on attrition patterns, department-level turnover, salary analysis, and job satisfaction.',
    stack: ['Python', 'SQL', 'Power BI'],
    build: ['Explores workforce data to highlight attrition and employee-experience patterns.', 'Supports comparisons across departments and employee groups.'],
    features: ['Attrition analysis', 'Department comparisons', 'Salary and satisfaction trends', 'Workforce reporting'],
    metrics: [], github: 'https://github.com/Sheran2004/HR-Analytics-Dashboard', palette: violet, motif: 'tenants',
  },
  {
    id: 'microscopy-image-restoration', title: 'Microscopy Image Restoration', year: '2026', genre: 'Deep Learning · Computer Vision · Research',
    logline: 'A deep-learning image restoration project exploring super-resolution, denoising, and image-quality evaluation.',
    stack: ['Python', 'PyTorch', 'Deep Learning', 'Computer Vision'],
    build: ['Explored model training and evaluation for restoring microscopy images.', 'Focuses on image quality and quantitative evaluation alongside visual results.'],
    features: ['Image denoising', 'Super-resolution experiments', 'PSNR and SSIM evaluation', 'GPU training workflow'],
    metrics: [], github: 'https://github.com/Sheran2004/Microscopy-Image-Restoration', palette: crimson, motif: 'shield',
  },
  {
    id: 'revenueguard-ai', title: 'RevenueGuard AI', year: '2026', genre: 'Machine Learning · Revenue Analytics',
    logline: 'A customer churn prediction and revenue recovery workflow using machine learning to flag accounts that may need attention.',
    stack: ['Python', 'scikit-learn', 'Random Forest', 'Flask'],
    build: ['Uses customer and business signals to explore churn-risk prediction.', 'Connects model outputs to a practical revenue-recovery workflow.'],
    features: ['Churn prediction', 'Risk-based prioritisation', 'Model-driven insights', 'Revenue recovery workflow'],
    metrics: [], github: 'https://github.com/Sheran2004/RevenueGuard-AI', palette: amber, motif: 'tenants',
  },
  {
    id: 'smart-crop-advisory', title: 'Smart Crop Advisory System', year: '2025–2026', genre: 'AgriTech · Full-Stack Web',
    logline: 'An agriculture-focused application designed to make crop guidance more accessible through a responsive dashboard.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Firebase', 'Vercel'],
    build: ['Built a responsive agriculture-focused interface using Next.js and Tailwind CSS.', 'Worked with Firebase integration and a web deployment workflow.'],
    features: ['Responsive web interface', 'Crop advisory experience', 'Firebase integration', 'Dashboard layout'],
    metrics: [], github: 'https://github.com/Sheran2004/Smart-Crop-Advisory-System', palette: jade, motif: 'flow',
  },
  {
    id: 'particle-field', title: 'Particle Field', year: '2026', genre: 'Creative Coding · Interactive 3D',
    logline: 'An interactive 3D particle sphere controlled by real-time hand gestures using browser-based vision and 3D graphics.',
    stack: ['HTML', 'JavaScript', 'MediaPipe', 'Three.js'],
    build: ['Combines hand-gesture input with a real-time visual scene.', 'A creative coding project showcasing browser graphics and interaction.'],
    features: ['Hand-gesture control', 'Interactive 3D particles', 'Real-time visual response'],
    metrics: [], github: 'https://github.com/Sheran2004/Particle-Field', palette: violet, motif: 'flow',
  },
  {
    id: 'focus-tracker-extension', title: 'Focus Tracker Extension', year: '2026', genre: 'Productivity · Browser Extension · Analytics',
    logline: 'A browser productivity extension that classifies websites as productive or distracting and summarises activity in a dashboard.',
    stack: ['JavaScript', 'Node.js', 'Express', 'SQLite'],
    build: ['Tracks browsing activity and categorises website usage.', 'Pairs extension behaviour with a dashboard and backend data storage.'],
    features: ['Website classification', 'Focus-time tracking', 'Productivity dashboard', 'Usage summaries'],
    metrics: [], github: 'https://github.com/Sheran2004/focus-tracker-extension', palette: ocean, motif: 'tenants',
  },
  {
    id: 'kisan-mitra', title: 'Kisan-Mitra', year: '2026', genre: 'AgriTech · Machine Learning · Decision Support',
    logline: 'An AI-powered crop recommendation and disease-detection project designed to help make agricultural guidance more accessible.',
    stack: ['Python', 'Machine Learning', 'HTML', 'CSS'],
    build: ['Combines agriculture-focused prediction workflows with a farmer-oriented interface.', 'Focuses on crop guidance and disease-awareness use cases.'],
    features: ['Crop recommendations', 'Disease-detection workflow', 'Agriculture-focused interface'],
    metrics: [], github: 'https://github.com/Sheran2004/Kisan-Mitra', palette: jade, motif: 'flow',
  },
  {
    id: 'sms-spam-detector', title: 'SMS Spam Detector', year: '2026', genre: 'Machine Learning · NLP · Cyber Safety',
    logline: 'A text-classification project that identifies potentially spam or harmful SMS messages using machine-learning techniques.',
    stack: ['Python', 'scikit-learn', 'NLP', 'TF-IDF'],
    build: ['Uses text features to classify messages into spam and non-spam categories.', 'Demonstrates a practical natural-language-processing workflow.'],
    features: ['SMS text classification', 'Spam detection', 'Text preprocessing', 'Model evaluation'],
    metrics: [], github: 'https://github.com/Sheran2004/SMS-Spam-Detector', palette: crimson, motif: 'shield',
  },
  {
    id: 'relay-chat-app', title: 'Relay Chat App', year: '2026', genre: 'Full Stack · Real-Time Messaging',
    logline: 'A real-time multi-room chat application with persistent messages, online presence, and typing indicators.',
    stack: ['JavaScript', 'Node.js', 'Express', 'Socket.IO', 'SQLite'],
    build: ['Implements live messaging and room-based conversation flows.', 'Adds presence and typing states to make conversations feel immediate.'],
    features: ['Real-time chat', 'Multiple chat rooms', 'Persistent messages', 'Online presence', 'Typing indicators'],
    metrics: [], github: 'https://github.com/Sheran2004/relay-chat-app', palette: ocean, motif: 'flow',
  },
  {
    id: 'bulletin-live-news', title: 'The Bulletin Live News', year: '2026', genre: 'News · Web Development · API Integration',
    logline: 'A real-time news reading experience with language switching, dark mode, and saved or read/unread story tracking.',
    stack: ['HTML', 'CSS', 'JavaScript', 'News API'],
    build: ['Organises current headlines into a focused reading interface.', 'Includes language and reading-state features for a more useful browsing experience.'],
    features: ['Live news feed', 'English/Hindi language toggle', 'Dark mode', 'Save stories', 'Read/unread tracking'],
    metrics: [], github: 'https://github.com/Sheran2004/the-bulletin-live-news', palette: amber, motif: 'flow',
  },
  {
    id: 'hr-recruitment-workflow', title: 'HR Recruitment Workflow App', year: '2026', genre: 'HRTech · Full Stack · Workflow Automation',
    logline: 'A recruitment platform for job postings, resume screening, interview scheduling, candidate tracking, and onboarding workflows.',
    stack: ['React', 'FastAPI', 'Python', 'SQL'],
    build: ['Brings recruiter tasks into a single workflow-oriented interface.', 'Covers candidate progress from application and screening through interview and onboarding stages.'],
    features: ['Job posting management', 'Resume screening', 'Interview scheduling', 'Candidate pipeline', 'Onboarding tracker'],
    metrics: [], github: 'https://github.com/Sheran2004/hr-recruitment-workflow-app', palette: violet, motif: 'tenants',
  },
  {
    id: 'customer-churn-prediction', title: 'Customer Churn Prediction System', year: '2026', genre: 'Machine Learning · Business Analytics',
    logline: 'A machine-learning workflow for estimating customer churn risk and surfacing accounts that may need retention attention.',
    stack: ['Python', 'scikit-learn', 'Pandas', 'Flask'],
    build: ['Uses customer data and classification workflows to explore churn risk.', 'Connects model predictions with business-oriented interpretation.'],
    features: ['Data preprocessing', 'Churn-risk prediction', 'Model evaluation', 'Business insights'],
    metrics: [], github: 'https://github.com/Sheran2004/Customer-Churn-Prediction-System', palette: amber, motif: 'tenants',
  },
  {
    id: 'news-aggregator', title: 'News Aggregator', year: '2025–2026', genre: 'Web Development · News · API Integration',
    logline: 'A news aggregation website that brings headlines together in one interface for easier browsing.',
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    build: ['Built around fetching and presenting news content in a single place.', 'Combines a web interface with server-side and database components.'],
    features: ['News browsing', 'Category-based content', 'Database-backed web workflow', 'Responsive interface'],
    metrics: [], github: 'https://github.com/Sheran2004/News-Aggregator', palette: ocean, motif: 'flow',
  },
];

export type Achievement = { id: string; title: string; org: string; detail: string; laurel: string; link?: string };
export const achievements: Achievement[] = [
  { id: 'research', title: 'Melanoma Research', org: 'HAM10000 Dataset', detail: 'Experimented with deep-learning image classification models and evaluation workflows for skin-lesion research.', laurel: 'Research Project' },
  { id: 'hackathon', title: 'Hackathon Builder', org: 'Student Innovation', detail: 'Explored project ideas and prototypes for real-world problem statements and student innovation programs.', laurel: 'Innovation' },
];

export type Certification = { issuer: string; name: string; link: string };
export const certifications: Certification[] = [
  { issuer: 'Infosys', name: 'Machine Learning with Python', link: '' },
  { issuer: 'SFJ Business Solutions Pvt. Ltd.', name: 'Gen AI NASSCOM – Certificate of Completion', link: '' },
  { issuer: 'FutureSkills Prime', name: 'Exploratory Data Analysis', link: '' },
  { issuer: 'Unstop', name: 'Application Screening of Data Analyst Internship – Certificate of Participation', link: '' },
  { issuer: 'Global Innovation Build Challenge', name: 'V1 – Participant', link: '' },
  { issuer: 'Unstop', name: 'Elite Hack 1.0 – Certificate of Participation', link: '' },
  { issuer: 'Forage', name: 'Deloitte Australia – Technology Job Simulation', link: '' },
  { issuer: 'MongoDB', name: 'Introduction to MongoDB (For Students)', link: '' },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };
export const skillCategories: SkillCategory[] = [
  { id: 'languages', title: 'Programming Languages', subtitle: 'Core coding toolkit', skills: [{ name: 'Java', mono: 'Jv', note: 'DSA' }, { name: 'Python', mono: 'Py' }, { name: 'JavaScript', mono: 'Js' }, { name: 'TypeScript', mono: 'Ts' }] },
  { id: 'frontend', title: 'Frontend', subtitle: 'Interfaces & user experience', skills: [{ name: 'React', mono: 'Re' }, { name: 'Next.js', mono: 'Nx' }, { name: 'HTML', mono: 'Ht' }, { name: 'CSS', mono: 'Cs' }, { name: 'Tailwind CSS', mono: 'Tw' }, { name: 'Vite', mono: 'Vi' }] },
  { id: 'backend', title: 'Backend & APIs', subtitle: 'Application logic', skills: [{ name: 'Node.js', mono: 'No' }, { name: 'Express.js', mono: 'Ex' }, { name: 'Flask', mono: 'Fl' }, { name: 'REST APIs', mono: 'Ap' }] },
  { id: 'data', title: 'Data & Databases', subtitle: 'Storage, querying and analysis', skills: [{ name: 'SQL', mono: 'Sq' }, { name: 'MySQL', mono: 'My' }, { name: 'PostgreSQL', mono: 'Pg' }, { name: 'MongoDB', mono: 'Mg' }, { name: 'Power BI', mono: 'BI' }, { name: 'Tableau', mono: 'Tb' }, { name: 'Excel', mono: 'Xl' }] },
  { id: 'ai', title: 'AI / ML', subtitle: 'Models and language tools', skills: [{ name: 'PyTorch', mono: 'Pt' }, { name: 'TensorFlow', mono: 'Tf' }, { name: 'Machine Learning', mono: 'ML' }, { name: 'Whisper', mono: 'Wh' }, { name: 'LangChain', mono: 'LC' }] },
  { id: 'tools', title: 'Tools & Deployment', subtitle: 'Build, test and ship', skills: [{ name: 'Git / GitHub', mono: 'Gt' }, { name: 'Docker', mono: 'Dk' }, { name: 'Postman', mono: 'Pm' }, { name: 'Firebase', mono: 'Fb' }, { name: 'Vercel', mono: 'Vc' }] },
];

export const skillEvidence: Record<string, string[]> = {
  Java: ['DSA practice'], Python: ['TranscriptStudio', 'Machine learning experiments'], React: ['MPLAD Sentinel', 'Smart Crop Advisory System'], 'Next.js': ['Smart Crop Advisory System'], Flask: ['TranscriptStudio'], PostgreSQL: ['MPLAD Sentinel'], 'Power BI': ['Data analytics skillset'], Tableau: ['Data analytics skillset'], 'Git / GitHub': ['Project version control'], 'Machine Learning': ['HAM10000 melanoma research', 'TranscriptStudio'],
};

export type Episode = { code: string; title: string; description: string; tags: string[]; runtime: string; palette: Palette };
export type Season = { number: number; title: string; period: string; synopsis: string; episodes: Episode[] };
export const seasons: Season[] = [
  { number: 1, title: 'The Foundation', period: '2023 – Present', synopsis: 'The B.Tech Computer Science and Engineering journey, paired with hands-on software development.', episodes: [
    { code: 'S01 E01', title: 'The Engineer', description: 'B.Tech in Computer Science and Engineering at Noida Institute of Engineering and Technology.', tags: ['B.Tech', 'CSE'], runtime: '2023 – 2027', palette: violet },
    { code: 'S01 E02', title: 'The Problem Solver', description: 'Building coding fundamentals through Java, Python, web development, and project-based learning.', tags: ['Java', 'Python', 'DSA'], runtime: 'Ongoing', palette: amber },
  ] },
  { number: 2, title: 'Building for the Web', period: '2024 – 2026', synopsis: 'Full-stack projects built around real interfaces, APIs, data, and deployment.', episodes: [
    { code: 'S02 E01', title: 'The Crop Advisor', description: 'A responsive Smart Crop Advisory System using Next.js, Firebase, and Tailwind CSS.', tags: ['Next.js', 'Firebase', 'Tailwind'], runtime: 'Project', palette: jade },
    { code: 'S02 E02', title: 'The Data Workflow', description: 'MPLAD Sentinel explores anomaly signals and case-review workflows for development-work data.', tags: ['Analytics', 'PostgreSQL', 'GovTech'], runtime: 'Project', palette: ocean },
  ] },
  { number: 3, title: 'AI in Practice', period: '2025 – 2026', synopsis: 'Experiments across speech technology, machine learning, and computer vision.', episodes: [
    { code: 'S03 E01', title: 'The Translator', description: 'TranscriptStudio combines timestamped transcription with multilingual translation workflows.', tags: ['Whisper', 'Flask', 'Translation'], runtime: 'Project', palette: violet },
    { code: 'S03 E02', title: 'The Researcher', description: 'Deep-learning experiments using the HAM10000 skin-lesion image dataset.', tags: ['PyTorch', 'Computer Vision', 'Evaluation'], runtime: 'Research project', palette: crimson },
  ] },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };
export const topPicks: TopPick[] = [
  { label: 'Featured project', title: 'MPLAD Sentinel', detail: 'Anomaly review and data workflow', palette: ocean },
  { label: 'AgriTech', title: 'Smart Crop', detail: 'A crop advisory web experience', palette: jade },
  { label: 'AI tool', title: 'TranscriptStudio', detail: 'Transcription and translation', palette: violet },
  { label: 'Core language', title: 'Java', detail: 'DSA and programming practice', palette: amber },
  { label: 'AI / ML', title: 'Computer Vision', detail: 'HAM10000 model experiments', palette: crimson },
  { label: 'Frontend', title: 'React + Next.js', detail: 'Interactive web applications', palette: ocean },
  { label: 'Data', title: 'SQL & BI', detail: 'Analysis and dashboards', palette: jade },
];

export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };
export const introSlides: IntroSlide[] = [
  { kicker: 'Education', title: 'B.Tech · CSE', lines: ['Noida Institute of Engineering and Technology', '2023 – 2027'], chips: ['Computer Science'] },
  { kicker: 'Skills', title: 'Build. Analyse. Learn.', lines: ['Java, Python, TypeScript · React, Next.js, Node.js', 'SQL, Power BI, Tableau · PyTorch, TensorFlow'], chips: ['Full Stack', 'AI / ML', 'Analytics'] },
  { kicker: 'Projects', title: 'Three Originals', lines: ['MPLAD Sentinel — anomaly review workflow', 'Smart Crop Advisory System — agriculture web app', 'TranscriptStudio — transcription and translation'] },
  { kicker: 'Research', title: 'Computer Vision', lines: ['HAM10000 dataset experiments', 'Deep-learning model training and evaluation'] },
  { kicker: 'Current mission', title: 'Now building', lines: ['Useful full-stack applications, AI tools, and data workflows'] },
];

export type ProfileId = 'sheran' | 'recruiter' | 'developer' | 'analyst';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';
export const viewerProfiles: { id: ProfileId; name: string; blurb: string; color: string; order: SectionId[] }[] = [
  { id: 'sheran', name: 'Sheran', blurb: 'The full series, in order', color: '#e5132b', order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'] },
  { id: 'recruiter', name: 'Recruiter', blurb: 'Projects, skills & resume first', color: '#4cc9ff', order: ['story', 'originals', 'skills', 'about', 'journey', 'moments', 'picks'] },
  { id: 'developer', name: 'Developer', blurb: 'Projects, stack & GitHub first', color: '#46e3a8', order: ['originals', 'skills', 'journey', 'about', 'picks', 'moments', 'story'] },
  { id: 'analyst', name: 'Data Analyst', blurb: 'Data projects & analytics skills first', color: '#ffb547', order: ['picks', 'originals', 'skills', 'journey', 'about', 'moments', 'story'] },
];
export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & interests', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Projects', card: 'My Projects', meta: `${projects.length} Originals`, palette: crimson },
  picks: { nav: 'Highlights', card: 'Top Picks', meta: 'Selected skills and projects', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Highlights', card: 'Highlights', meta: `${achievements.length} Highlights • ${certifications.length} Certifications`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Profile • Education • Projects', palette: violet },
};
