export const mockAnalyticsData = {
  kpis: [
    { label: "Total Visitors", value: "78,450", icon: "people", color: "#00e5ff" },
    { label: "Revenue Today", value: "$1.2M", icon: "cash", color: "#00e676" },
    { label: "Tickets Sold", value: "98.5%", icon: "ticket", color: "#fbc02d" },
    { label: "Food Revenue", value: "$450K", icon: "restaurant", color: "#ff3d00" },
    { label: "Merchandise", value: "$280K", icon: "cart", color: "#b388ff" },
    { label: "Parking", value: "$120K", icon: "car", color: "#2979ff" },
    { label: "AI Requests", value: "145K", icon: "hardware-chip", color: "#00e5ff" },
    { label: "Emergencies", value: "2", icon: "warning", color: "#ff1744" },
    { label: "Staff Efficiency", value: "92%", icon: "briefcase", color: "#00e676" },
    { label: "Utilization", value: "95%", icon: "business", color: "#fbc02d" },
    { label: "Satisfaction", value: "4.8/5", icon: "star", color: "#ffd600" },
    { label: "Sustainability", value: "88/100", icon: "leaf", color: "#00e676" },
  ],
  revenue: {
    daily: [1.1, 1.2, 0.9, 1.4, 1.8, 2.1, 1.2],
    weekly: [5.4, 6.1, 7.2, 8.5],
    byCategory: [
      { label: "Tickets", value: 65, color: "#00e5ff" },
      { label: "Food", value: 20, color: "#fbc02d" },
      { label: "Merch", value: 10, color: "#b388ff" },
      { label: "Parking", value: 5, color: "#ff3d00" },
    ],
  },
  visitors: {
    hourly: [10000, 25000, 45000, 60000, 75000, 78450],
    byGate: [
      { label: "Gate A", value: 35, color: "#00e676" },
      { label: "Gate B", value: 25, color: "#2979ff" },
      { label: "Gate C", value: 25, color: "#fbc02d" },
      { label: "Gate D", value: 15, color: "#b388ff" },
    ],
  },
  fanBehaviour: {
    popularFood: "Hot Dog & Beer Combo",
    mostVisited: "Fan Zone B",
    navUsage: "45%",
    aiQueries: "145,200",
    avgStay: "4h 15m",
  },
  aiInsights: [
    "Revenue increased 21% compared to the last match.",
    "Parking demand is growing rapidly in the North lot.",
    "Section 118 generates the highest food sales per capita.",
    "Visitors heavily prefer Gate B, consider redistributing staff.",
    "Average wait time reduced by 12 minutes using AI routing.",
    "AI handled 92% of all guest queries successfully."
  ],
  predictions: [
    { label: "Revenue", value: "+12%", trend: "up" },
    { label: "Visitors", value: "85,000", trend: "up" },
    { label: "Food Demand", value: "High", trend: "up" },
    { label: "Merch Sales", value: "+5%", trend: "up" },
    { label: "Queue Length", value: "15m", trend: "down" },
  ],
  sponsors: [
    { name: "Adidas", impressions: "1.2M", engagement: "8.5%", clicks: "45K" },
    { name: "Coca-Cola", impressions: "2.4M", engagement: "12%", clicks: "120K" },
    { name: "Visa", impressions: "900K", engagement: "5.2%", clicks: "25K" },
  ],
  operations: [
    { metric: "Medical Response", time: "2m 15s", target: "3m" },
    { metric: "Security Response", time: "1m 45s", target: "2m" },
    { metric: "Food Delivery", time: "12m 30s", target: "15m" },
    { metric: "AI Accuracy", time: "98.5%", target: "95%" },
  ],
  aiAssistant: {
    summary: "Today's performance is exceeding targets. Revenue is up 21% driven by dynamic food pricing. No critical security incidents reported.",
    recommendations: [
      "Open additional merch stalls in East Wing to capture exiting crowds.",
      "Re-route traffic from Gate B to Gate C to reduce queue times.",
      "Deploy 5 additional cleaning staff to Fan Zone A."
    ],
    risks: [
      "Parking Lot North reaching capacity in 15 mins.",
      "Rain forecasted for 20:00, expect surge in covered areas."
    ]
  }
};
