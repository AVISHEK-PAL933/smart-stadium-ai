export const mockFanData = {
  user: {
    name: "Alex Johnson",
    nationality: "USA",
    favoriteTeam: "USA National Team",
    membershipTier: "Gold VIP",
    loyaltyLevel: "Level 12",
    rewardPoints: 12450,
    photoUrl: "https://i.pravatar.cc/150?img=11",
  },
  homeFeed: {
    welcomeMessage: "Welcome back, Alex!",
    upcomingMatch: "USA vs ENG - 14:00 Today",
    recentModules: ["Food Ordering", "Navigation"],
  },
  achievements: [
    { title: "First Match", icon: "ticket", unlocked: true, color: "#ffd600" },
    { title: "Explorer", icon: "map", unlocked: true, color: "#00e5ff" },
    { title: "Food Lover", icon: "restaurant", unlocked: true, color: "#ff3d00" },
    { title: "Super Fan", icon: "star", unlocked: true, color: "#b388ff" },
    { title: "Navigator", icon: "compass", unlocked: false, color: "#2979ff" },
    { title: "VIP Guest", icon: "ribbon", unlocked: false, color: "#00e676" },
  ],
  rewards: {
    recentActivity: [
      { action: "Ticket Purchase", points: "+500", date: "Today" },
      { action: "Food Order", points: "+150", date: "Yesterday" },
      { action: "Daily Login", points: "+10", date: "Today" },
    ],
    redeemable: [
      { title: "Free Hotdog", cost: 1500, icon: "fast-food" },
      { title: "VIP Seat Upgrade", cost: 10000, icon: "star" },
      { title: "Team Scarf", cost: 3500, icon: "shirt" },
    ],
  },
  challenges: [
    { title: "Visit 3 Zones", progress: 2, total: 3, reward: 200 },
    { title: "Try New Food", progress: 0, total: 1, reward: 150 },
    { title: "Predict Match Score", progress: 1, total: 1, reward: 100 },
    { title: "Use AI Assistant", progress: 5, total: 5, reward: 50 },
  ],
  socialWall: [
    { user: "Sarah M.", text: "What an amazing atmosphere at the stadium today! ⚽🔥 #FIFA2026", likes: 245, comments: 12, time: "5m ago" },
    { user: "John D.", text: "The new smart food ordering system is incredibly fast.", likes: 112, comments: 4, time: "12m ago" },
    { user: "Emma W.", text: "Just got my VIP upgrade via reward points! Best day ever!", likes: 580, comments: 45, time: "1h ago" },
  ],
  fantasyPredictor: {
    match: "USA vs ENG",
    options: {
      winner: ["USA", "Draw", "ENG"],
      firstGoal: ["Pulisic", "Kane", "Saka", "Reyna"],
    }
  },
  livePolls: [
    {
      question: "Who will score next?",
      options: [
        { label: "Pulisic", votes: 45 },
        { label: "Kane", votes: 35 },
        { label: "Other", votes: 20 },
      ]
    },
    {
      question: "Best fan atmosphere?",
      options: [
        { label: "North Stand", votes: 60 },
        { label: "South Stand", votes: 40 },
      ]
    }
  ],
  marketplace: [
    { name: "Official USA Jersey", price: "$120", tag: "Hot", image: "shirt" },
    { name: "FIFA 2026 Cap", price: "$35", tag: "New", image: "person" },
    { name: "Team Scarf", price: "$25", tag: "Sale", image: "ribbon" },
    { name: "Official Match Ball", price: "$150", tag: "Premium", image: "football" },
  ],
  recommendations: [
    { type: "Food", text: "Try the new Spicy Chicken Burger near Gate B.", icon: "fast-food" },
    { type: "Merch", text: "Exclusive USA scarf available at Store 4.", icon: "shirt" },
    { type: "Upgrade", text: "Upgrade to VIP Lounge for 10,000 points.", icon: "star" },
  ],
  liveStats: {
    currentFans: "78,450",
    countries: "42",
    avgAge: "28",
    engagement: "94%",
    popularTeam: "USA",
  }
};
