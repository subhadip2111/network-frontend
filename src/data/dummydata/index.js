export const dummyUser = {
  id: 1,
  name: "Alex Johnson",
  username: "@alexdev",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  bio: "Full-stack developer passionate about AI and startups",
  followers: 1234,
  following: 567,
  communities: 8
};

export const dummyPosts = [
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      username: "@sarahtech",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    type: "startup",
    title: "AI-Powered Code Review Tool",
    content: "Building an AI tool that automatically reviews code and suggests improvements. Looking for ML engineers and frontend developers to join the team!",
    tags: ["AI", "Machine Learning", "Frontend", "Code Review"],
    likes: 24,
    comments: 8,
    collaborators: 3,
    timestamp: "2 hours ago",
    mvpProgress: 35,
    seeking: ["ML Engineer", "Frontend Developer", "UI/UX Designer"]
  },
  {
    id: 2,
    author: {
      name: "Mike Rodriguez",
      username: "@mikebuilds",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    type: "problem",
    title: "How to Crack FAANG Interviews?",
    content: "Recently got into Google after 2 years of preparation. Happy to mentor others and share my journey. Let's create a study group!",
    tags: ["Career", "FAANG", "Interview", "Mentorship"],
    likes: 89,
    comments: 23,
    collaborators: 15,
    timestamp: "4 hours ago",
    mvpProgress: null,
    seeking: ["Study Partners", "Mock Interview Partners"]
  },
  {
    id: 3,
    author: {
      name: "Emily Davis",
      username: "@emilyux",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    type: "opensource",
    title: "Open Source Design System",
    content: "Creating a comprehensive design system for React applications. Need contributors for components, documentation, and testing.",
    tags: ["Open Source", "React", "Design System", "UI Components"],
    likes: 42,
    comments: 12,
    collaborators: 7,
    timestamp: "6 hours ago",
    mvpProgress: 68,
    seeking: ["React Developer", "Technical Writer", "QA Tester"]
  },
    {
    id: 4,
    author: {
      name: "Sarah Chen",
      username: "@sarahtech",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    type: "Idea",
    title: "AI-Powered Code Review Tool",
    content: "Building an AI tool that automatically reviews code and suggests improvements. Looking for ML engineers and frontend developers to join the team!",
    tags: ["AI", "Machine Learning", "Frontend", "Code Review"],
    likes: 24,
    comments: 8,
    collaborators: 3,
    timestamp: "2 hours ago",
    mvpProgress: 35,
    seeking: ["ML Engineer", "Frontend Developer", "UI/UX Designer"]
  }
];

export const dummyCommunities = [
  {
    id: 1,
    name: "FAANG Prep Squad",
    description: "Community for preparing FAANG interviews",
    members: 1234,
    category: "Career",
    isJoined: true,
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Startup Founders",
    description: "Network of entrepreneurs and startup founders",
    members: 856,
    category: "Startup",
    isJoined: false,
    avatar: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Open Source Contributors",
    description: "Collaborate on open source projects",
    members: 2341,
    category: "Development",
    isJoined: true,
    avatar: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop"
  }
];




  export const exploreContent = [
  {
    id: 1,
    type: 'startup',
    title: 'Notes App for Rural Students',
    description: 'I built a notes app targeting students who don’t use English often...',
    tags: ['Student Startup', 'EdTech'],
    likes: 34,
    comments: 5,
    seeking: ['Frontend', 'UI/UX'],
  },
  {
    id: 2,
    type: 'demo',
    title: 'Voice-controlled Portfolio Website',
    description: 'Check out how I built my voice-controlled portfolio using React + Web Speech API',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tags: ['WebDev', 'Voice UI'],
    likes: 76,
    comments: 12,
  },
  {
    id: 3,
    type: 'inspiration',
    title: 'Started at 30. Built at 32.',
    story: 'I left my low-paying sales job at 30. Started learning online. Built a B2B tool.',
    outcome: 'Now doing ₹6L/mo revenue with just 1 teammate.',
    tags: ['30+ Builder', 'B2B Product'],
  },
];

