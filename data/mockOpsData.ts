export const mockOpsData = {
  liveStatus: {
    visitorsInside: 62450,
    currentCapacity: "78%",
    ticketsScanned: 62500,
    openGates: 12,
    totalGates: 16,
    parkingOccupancy: "92%",
    securityAlerts: 3,
    medicalAlerts: 1,
    foodOrders: 1245,
    navRequests: 890,
    aiRequests: 3200,
    energyConsumption: "4.2 MW",
    waterConsumption: "15k L",
  },
  eventStream: [ // @ts-ignore

    { id: "1", time: "18:45", event: "Gate A opened", type: "info" },
    { id: "2", time: "18:42", event: "Medical request completed (Sector 4)", type: "success" },
    { id: "3", time: "18:40", event: "Crowd density increased at North Entrance", type: "warning" },
    { id: "4", time: "18:35", event: "Food order #4092 delivered", type: "success" },
    { id: "5", time: "18:30", event: "AI Assistant answered 500+ questions in last 5m", type: "info" },
    { id: "6", time: "18:25", event: "Parking Lot B full", type: "warning" },
    { id: "7", time: "18:20", event: "Emergency drill completed successfully", type: "success" },
  ],
  aiDecisions: [
    { id: "d1", action: "Open Gate 5", reason: "Crowd density at Gate 4 > 80%", confidence: "High" },
    { id: "d2", action: "Deploy Security Team", reason: "Unauthorized access attempt at VIP Lounge", confidence: "High" },
    { id: "d3", action: "Reduce Queue at Food Court", reason: "Wait time > 15 mins at Zone A", confidence: "Medium" },
    { id: "d4", action: "Increase Staff in Parking", reason: "Arrival rate spike predicted", confidence: "Low" },
  ],
  predictiveAnalytics: [
    { label: "Crowd Density Spike", probability: 85, time: "in 15m" },
    { label: "Queue Length > 10m", probability: 60, time: "in 30m" },
    { label: "Food Demand Surge", probability: 92, time: "Halftime" },
    { label: "Parking Availability < 5%", probability: 98, time: "in 10m" },
    { label: "Network Load Critical", probability: 15, time: "in 1h" },
  ],
  resources: [
    { type: "Security Teams", available: 12, busy: 4, offline: 0 },
    { type: "Medical Teams", available: 3, busy: 2, offline: 1 },
    { type: "Volunteers", available: 40, busy: 15, offline: 5 },
    { type: "Cleaning Staff", available: 10, busy: 20, offline: 0 },
    { type: "Police", available: 8, busy: 2, offline: 0 },
  ],
  systemHealth: [ // @ts-ignore

    { service: "AI Assistant", status: "Healthy", latency: "45ms" },
    { service: "Navigation", status: "Healthy", latency: "120ms" },
    { service: "Food Ordering", status: "Warning", latency: "450ms" },
    { service: "Payments", status: "Healthy", latency: "200ms" },
    { service: "Ticketing", status: "Healthy", latency: "80ms" },
    { service: "Database", status: "Healthy", latency: "15ms" },
    { service: "Cloud Maps", status: "Offline", latency: "---" },
  ],
  chartData: {
    visitors: [10000, 25000, 45000, 60000, 62450],
    revenue: [50, 150, 300, 450, 500],
    incidents: [0, 1, 3, 2, 0],
  },
  aiInsights: [
    "Crowd expected to increase by 18% in the next 30 minutes at the North Gate.",
    "Parking Zone B reaches capacity in 20 minutes based on current arrival rates.",
    "Food demand rising near Section 112; suggest redirecting vendors.",
    "VIP area operating normally. All services optimal.",
    "Medical response time improved by 12% compared to last event."
  ]
};
