export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  categoryTag: 'productivity' | 'utility';
  badgeCategory: string;
  description: string;
  features: string[];
  stack: string[];
  github: string;
  image: string;
  filename: string;
  type: 'tasktracker' | 'calculator';
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Jeevan Kumar',
    monogram: 'JK',
    title: 'Aspiring AI Engineer | B.Tech Student',
    subTitle: 'Aspiring AI Engineer | B.Tech Student | Developer',
    location: 'India',
    year: '2026',
    email: 'jeevankumar110f@gmail.com',
    github: 'https://github.com/jeevankumar110-lgtmand',
    linkedin: 'https://www.linkedin.com/in/jeevan-undefined-16373943b/',
    portraitImage: '/assets/jeevan-portrait.jpg',
    philosophyQuote: 'Curiosity creates ideas.\nIdeas inspire innovation.\nInnovation shapes tomorrow.',
    philosophySub: 'I believe in continuous learning, creative experimentation, and building things that turn ideas into reality.',
    heroQuote: '"I\'m Jeevan Kumar and I build ideas into intelligent solutions."',
    introBlurb: '"I\'m a technology enthusiast exploring Python, web development, and Generative AI. I enjoy transforming ideas into practical projects."',
  },
  academic: {
    degree: 'B.Tech — First Semester',
    toolset: 'Python • Web • GenAI',
    focus: 'Applied AI & Problem Solving',
    discipline: 'COMPUTER SCIENCE & APPLIED AI',
  },
  direction: [
    {
      num: '01',
      title: 'Programming',
      description: 'Exploring Python programming, data structures fundamentals, and developing a strong foundation in algorithmic software development.',
      tags: '[ PYTHON 3.X • LOGIC ]',
    },
    {
      num: '02',
      title: 'Web Development',
      description: 'Learning to create clean, responsive, and user-friendly web interfaces using HTML, CSS, and modern web architectural standards.',
      tags: '[ HTML5 • CSS3 • JAVASCRIPT ]',
    },
    {
      num: '03',
      title: 'Generative AI',
      description: 'Exploring modern generative AI tools, prompt engineering workflows, and understanding how artificial intelligence can solve practical problems.',
      tags: '[ LLMS • PROMPT FLOWS • EXPERIMENTATION ]',
    },
    {
      num: '04',
      title: 'Problem Solving',
      description: 'Developing analytical problem-solving abilities through hackathons, ideathons, and consistent hands-on project execution.',
      tags: '[ ALGORITHMS • HACKATHONS • ITERATION ]',
    },
  ],
  achievements: {
    num: '01',
    category: 'COLLABORATIVE CHALLENGES & SPRINTS',
    title: 'Hackathons & Ideathons Participant',
    description: '"Participating in collegiate hackathons and ideathons gives me opportunities to explore real-world problems, brainstorm ideas under time constraints, collaborate in cross-functional teams, and turn concepts into working prototypes."',
    organization: 'Campus Ideathons & Collegiate Hackathons',
    tenure: '2026 — Present',
    artifactImage: '/media-club.svg',
    artifactLabel: 'INNOVATION SPRINT // ARCHIVE',
    artifactVol: 'VOL. 01',
  },
  projects: [
    {
      id: '1',
      number: 'PROJECT 01',
      title: 'Daily Task Tracker & Calendar',
      category: 'Productivity / Browser Application',
      categoryTag: 'productivity',
      badgeCategory: '[ CLIENT ARCHITECTURE • LOCAL STORAGE ]',
      description: 'A browser-based daily productivity application designed to help users organize daily activities, manage tasks, and plan their schedules through an interactive calendar.',
      features: [
        'Interactive monthly calendar with real-time day grid',
        'Previous and next month navigation',
        'Date selection with scoped daily view',
        'Add daily tasks with custom time assignments',
        'Mark tasks as completed with instant state updates',
        'Delete tasks with immediate cleanups',
        'Hourly schedule view from 6 AM to 10 PM',
        'Highlight the current hour dynamically',
        'Persistent task saving using browser Local Storage',
      ],
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Local Storage'],
      github: 'https://github.com/jeevankumar110-lgtmand',
      image: '/task-tracker.svg',
      filename: 'task_tracker.js',
      type: 'tasktracker',
    },
    {
      id: '2',
      number: 'PROJECT 02',
      title: 'Web-Based Calculator',
      category: 'Mathematics / Interactive Utility',
      categoryTag: 'utility',
      badgeCategory: '[ INTERACTIVE UTILITY • DOM LOGIC ]',
      description: 'A simple interactive web-based calculator designed to perform fundamental mathematical operations through a clean graphical interface.',
      features: [
        'Fundamental arithmetic: addition, subtraction, multiplication, and division',
        'Decimal number input with floating-point precision',
        'Clear display functionality (AC / Reset)',
        'Interactive numerical and operational keypad buttons',
        'Defensive error handling for division by zero & invalid expressions',
        'Responsive layout with clean tactile user feedback',
      ],
      stack: ['HTML5', 'CSS3', 'JavaScript'],
      github: 'https://github.com/jeevankumar110-lgtmand',
      image: '/calculator-app.svg',
      filename: 'calculator.js',
      type: 'calculator',
    },
  ] as ProjectData[],
  journey: [
    {
      field: 'EDUCATION',
      sub: 'Undergraduate Degree',
      period: 'First Semester',
      description: 'B.Tech — First Semester. Foundational study in programming, computational mathematics, and logical frameworks.',
      status: 'Enrolled',
    },
    {
      field: 'PROGRAMMING FOUNDATIONS',
      sub: 'Python Core',
      period: '2026',
      description: 'Comprehensive study of Python syntax, data structures, conditional control flows, and hands-on algorithm construction.',
      status: 'In Progress',
    },
    {
      field: 'WEB DEVELOPMENT',
      sub: 'Frontend Architecture',
      period: '2026',
      description: 'Building clean, responsive, and accessible web layouts utilizing modern HTML5, CSS3, and JavaScript best practices.',
      status: 'In Progress',
    },
    {
      field: 'ARTIFICIAL INTELLIGENCE',
      sub: 'Foundations & Concepts',
      period: '2026',
      description: 'Exploring machine learning fundamentals, neural network concepts, and the theoretical underpinnings of applied AI systems.',
      status: 'Exploring',
    },
    {
      field: 'GENERATIVE AI',
      sub: 'Modern Workflows',
      period: '2026',
      description: 'Learning modern Generative AI tooling, prompt structuring, API integrations, and developer productivity workflows.',
      status: 'In Progress',
    },
    {
      field: 'HACKATHONS & IDEATHONS',
      sub: 'Collaborative Challenges',
      period: '2026',
      description: 'Participating in campus hackathons and ideathons, pitching innovative concepts, and rapid prototyping under timed constraints.',
      status: 'Active',
    },
  ],
};
