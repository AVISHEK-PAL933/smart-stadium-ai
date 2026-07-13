export interface AIResponse {
  answer: string;
  actionType?: string;
  actionPayload?: any;
}

const MOCK_ANSWERS: Record<string, AIResponse> = {
  seat: {
    answer:
      'Your reserved seat is located in Section 112, Row M, Seat 42. Go to Gate D and follow the blue lights.',
    actionType: 'NAVIGATE',
    actionPayload: { gate: 'D', section: '112', row: 'M', seat: '42' },
  },
  ticket: {
    answer: "I've fetched your digital entry pass! FIFA World Cup 2026™ Match 14: BRA vs ARG.",
    actionType: 'TICKET',
    actionPayload: { match: 'BRA vs ARG', gate: 'D' },
  },
  gate: {
    answer:
      "Gate A is located on the North side of the stadium. It's currently a 5-minute walk from your current location.",
    actionType: 'NAVIGATE',
    actionPayload: { destination: 'Gate A' },
  },
  washroom: {
    answer:
      'The nearest washroom is 30 meters to your left, right next to the Section 112 concessions stand.',
    actionType: 'NAVIGATE',
    actionPayload: { destination: 'Washroom Sec 112' },
  },
  food: {
    answer:
      'Section 112 concessions offers Classic Stadium Hot Dogs, Pretzels, Nachos, and cold beverages. You can order directly to your seat using the Food Delivery module!',
    actionType: 'FOOD',
  },
  parking: {
    answer:
      'Your vehicle is parked in Zone B (East Parking Lot). There are currently 550 open spots in Zone B.',
    actionType: 'PARKING',
  },
  match: {
    answer: "Today's feature match: BRA vs ARG (LIVE - 68'). Next match: USA vs ENG at 21:00.",
    actionType: 'MATCH',
  },
  emergency: {
    answer:
      'EMERGENCY PROTOCOL ACTIVATED: Medical and Security personnel have been alerted to Section 112, Row M, Seat 42.',
    actionType: 'SOS',
  },
  lost: {
    answer:
      'You can report or browse lost items (like phones, wallets, keys) in the Lost & Found module. Our AI matches reported items live.',
    actionType: 'LOST_FOUND',
  },
  merchandise: {
    answer:
      'The official FIFA Store is at Gate A. Open now. Show your smart ticket for a 10% discount on team jerseys!',
    actionType: 'MERCHANDISE',
  },
  rules: {
    answer:
      'Stadium Rules: No large bags (> 30x30cm), professional cameras, or outside beverages. Re-entry is not permitted.',
  },
  weather: {
    answer:
      'Current temperature is 24°C with clear skies. Perfect conditions for football. No rain expected.',
  },
  transport: {
    answer:
      'Shuttles to the City Center leave every 10 minutes from Gate A. The metro station is a 7-minute walk from the South exit.',
  },
};

export const askAIAssistant = async (query: string): Promise<AIResponse> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('seat') || lowerQuery.includes('chair') || lowerQuery.includes('sit')) {
    return MOCK_ANSWERS['seat'];
  }
  if (
    lowerQuery.includes('ticket') ||
    lowerQuery.includes('pass') ||
    lowerQuery.includes('booking')
  ) {
    return MOCK_ANSWERS['ticket'];
  }
  if (lowerQuery.includes('gate a')) {
    return MOCK_ANSWERS['gate'];
  }
  if (
    lowerQuery.includes('washroom') ||
    lowerQuery.includes('toilet') ||
    lowerQuery.includes('restroom')
  ) {
    return MOCK_ANSWERS['washroom'];
  }
  if (
    lowerQuery.includes('food') ||
    lowerQuery.includes('concession') ||
    lowerQuery.includes('drink') ||
    lowerQuery.includes('eat')
  ) {
    return MOCK_ANSWERS['food'];
  }
  if (lowerQuery.includes('park')) {
    return MOCK_ANSWERS['parking'];
  }
  if (
    lowerQuery.includes('match') ||
    lowerQuery.includes('score') ||
    lowerQuery.includes('today')
  ) {
    return MOCK_ANSWERS['match'];
  }
  if (
    lowerQuery.includes('emergency') ||
    lowerQuery.includes('help') ||
    lowerQuery.includes('sos')
  ) {
    return MOCK_ANSWERS['emergency'];
  }
  if (lowerQuery.includes('lost') || lowerQuery.includes('found')) {
    return MOCK_ANSWERS['lost'];
  }
  if (lowerQuery.includes('merch') || lowerQuery.includes('shop') || lowerQuery.includes('store')) {
    return MOCK_ANSWERS['merchandise'];
  }
  if (lowerQuery.includes('rules') || lowerQuery.includes('prohibited')) {
    return MOCK_ANSWERS['rules'];
  }
  if (
    lowerQuery.includes('weather') ||
    lowerQuery.includes('temp') ||
    lowerQuery.includes('rain')
  ) {
    return MOCK_ANSWERS['weather'];
  }
  if (
    lowerQuery.includes('transport') ||
    lowerQuery.includes('bus') ||
    lowerQuery.includes('train') ||
    lowerQuery.includes('metro') ||
    lowerQuery.includes('shuttle')
  ) {
    return MOCK_ANSWERS['transport'];
  }

  return {
    answer:
      "I'm not sure about that stadium facility. Try asking about your seat, ticket, gate A navigation, or emergency services.",
  };
};
