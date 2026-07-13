export interface MapCoordinate {
  x: number;
  y: number;
}

export interface NavigationDestination {
  id: string;
  name: string;
  category: 'gate' | 'seat' | 'concessions' | 'restroom' | 'parking' | 'emergency' | 'store';
  icon: string;
  coordinates: MapCoordinate;
  description: string;
}

export interface NavigationRoute {
  destination: NavigationDestination;
  path: MapCoordinate[];
  distanceMeters: number;
  timeSeconds: number;
  instructions: string[];
}

export const STADIUM_DESTINATIONS: NavigationDestination[] = [
  {
    id: 'seat',
    name: 'My Seat (Sec 112, Row M, Seat 42)',
    category: 'seat',
    icon: 'seat',
    coordinates: { x: 180, y: 220 },
    description: 'Section 112, Gold category tier',
  },
  {
    id: 'gate_a',
    name: 'Gate A (North Entrance)',
    category: 'gate',
    icon: 'gate',
    coordinates: { x: 150, y: 50 },
    description: 'Main entrance gate near Shuttle pick-up',
  },
  {
    id: 'gate_d',
    name: 'Gate D (East Entrance)',
    category: 'gate',
    icon: 'gate',
    coordinates: { x: 260, y: 150 },
    description: 'Turnstile gate near concessions row',
  },
  {
    id: 'food',
    name: 'Section 112 Concessions',
    category: 'concessions',
    icon: 'food',
    coordinates: { x: 220, y: 180 },
    description: 'Hot dogs, pretzels, cold beer',
  },
  {
    id: 'washroom',
    name: 'Section 112 Restroom',
    category: 'restroom',
    icon: 'toilet',
    coordinates: { x: 120, y: 200 },
    description: 'Mens/Womens public restrooms',
  },
  {
    id: 'parking_b',
    name: 'Parking Zone B (East Lot)',
    category: 'parking',
    icon: 'parking',
    coordinates: { x: 280, y: 350 },
    description: 'East outdoor parking slots lot B',
  },
  {
    id: 'medical',
    name: 'Gate D Medical First Aid',
    category: 'emergency',
    icon: 'medical-bag',
    coordinates: { x: 80, y: 100 },
    description: '24/7 Red Cross paramedic team',
  },
  {
    id: 'store',
    name: 'Official FIFA Merchandise Store',
    category: 'store',
    icon: 'shopping',
    coordinates: { x: 150, y: 120 },
    description: 'Official jerseys, caps & souvenirs',
  },
];

export const CURRENT_LOCATION: MapCoordinate = { x: 60, y: 300 }; // Mock starting location of user

export const getRouteToDestination = (destinationId: string): NavigationRoute | null => {
  const dest = STADIUM_DESTINATIONS.find((d) => d.id === destinationId);
  if (!dest) return null;

  // Mock path layout nodes from current user coordinates
  const path: MapCoordinate[] = [
    CURRENT_LOCATION,
    { x: 100, y: 260 }, // Intermediate junction 1
    { x: 150, y: 180 }, // Intermediate junction 2
    dest.coordinates,
  ];

  // Calculate distance based on simple grid math
  let distanceMeters = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const dx = path[i + 1].x - path[i].x;
    const dy = path[i + 1].y - path[i].y;
    distanceMeters += Math.round(Math.sqrt(dx * dx + dy * dy) * 1.5);
  }

  const timeSeconds = Math.round(distanceMeters * 0.8); // 1.25 m/s walking speed

  const instructions: string[] = [
    'Head north-east along Section 112 corridor (40m)',
    'Turn right towards main turnstiles junction (35m)',
    `Walk straight ahead to reach ${dest.name} (${Math.round(distanceMeters / 3)}m)`,
  ];

  return {
    destination: dest,
    path,
    distanceMeters,
    timeSeconds,
    instructions,
  };
};
