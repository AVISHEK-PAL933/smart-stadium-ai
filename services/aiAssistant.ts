export interface AIResponse {
  answer: string;
  actionType?: string;
  actionPayload?: any;
}

const MOCK_ANSWERS: Record<string, AIResponse> = {
  seat: {
    answer:
      "Your currently linked ticket is in Section 112, Row M, Seat 42. I've loaded the indoor path overlay map for you.",
    actionType: 'NAVIGATE',
    actionPayload: { destId: 'seat' },
  },
  ticket: {
    answer: "I've fetched your digital entry pass! FIFA World Cup 2026™ Match 14: BRA vs ARG.",
    actionType: 'TICKET',
    actionPayload: { match: 'BRA vs ARG', gate: 'D' },
  },
  gate: {
    answer:
      "Your ticket designates Gate D for stadium entry. I\'ve marked it on the map and drawn the walking route.",
    actionType: 'NAVIGATE',
    actionPayload: { destId: 'gate_d' },
  },
  washroom: {
    answer:
      "The nearest washroom is 30 meters to your left. I've marked the walking route on the map overlay.",
    actionType: 'NAVIGATE',
    actionPayload: { destId: 'washroom' },
  },
  food: {
    answer:
      'Section 112 concessions offers Classic Stadium Hot Dogs, Pretzels, Nachos, and cold beverages. Let me show you where it is.',
    actionType: 'NAVIGATE',
    actionPayload: { destId: 'food' },
  },
  parking: {
    answer:
      'Your vehicle is parked in Zone B (East Parking Lot). Let me guide you to the exit route.',
    actionType: 'NAVIGATE',
    actionPayload: { destId: 'parking_b' },
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
      "The official FIFA Store is at Gate A. Open now. I've loaded the indoor route map to the store for you.",
    actionType: 'NAVIGATE',
    actionPayload: { destId: 'store' },
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
  fan_zone: {
    answer:
      '🎮 Opening Fan Zone! Play quizzes, spin the lucky wheel, predict match results, climb the leaderboard, and earn exclusive rewards!',
    actionType: 'FAN_ZONE',
  },
  merch: {
    answer:
      '🛒 Opening the FIFA Merch Store! Browse official jerseys, footballs, collectibles, and more. Flash sale is live with up to 60% OFF on select items!',
    actionType: 'MERCH',
  },
};

export const askAIAssistant = async (query: string): Promise<AIResponse> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const lowerQuery = query.toLowerCase().trim();

  // Natural conversational greetings
  if (
    lowerQuery === 'hi' ||
    lowerQuery === 'hello' ||
    lowerQuery === 'hey' ||
    lowerQuery === 'how are you' ||
    lowerQuery === 'how are you?' ||
    lowerQuery === 'hi there' ||
    lowerQuery === 'hello there' ||
    lowerQuery === 'good morning' ||
    lowerQuery === 'good afternoon' ||
    lowerQuery === 'good evening' ||
    lowerQuery === 'whats up' ||
    lowerQuery === "what's up"
  ) {
    return {
      answer: "Hi there! 👋 I'm your StadiumMind AI assistant. I'm having a great day at the stadium! I'm here to help you navigate, find food, locate your seat, or give you live match updates. How can I make your match-day experience better?",
    };
  }

  const sectionMatch = lowerQuery.match(/section\s*(\d+)/);
  const dynamicSection = sectionMatch ? sectionMatch[1] : null;

  if (dynamicSection && (lowerQuery.includes('where') || lowerQuery.includes('find') || lowerQuery.includes('navigate') || lowerQuery.includes('go to'))) {
    return {
      answer: `Of course! I can guide you to Section ${dynamicSection}. I've just loaded the fastest walking route on your map.`,
      actionType: 'NAVIGATE',
      actionPayload: { destId: `section_${dynamicSection}` },
    };
  }

  if (lowerQuery.includes('other section') || lowerQuery.includes('another section') || lowerQuery.includes('any section')) {
    return {
      answer: "Yes, definitely! You can explore facilities, order food, and get directions to absolutely any section in the stadium. Which section are you looking for?",
      actionType: 'NAVIGATE'
    };
  }

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
  if (lowerQuery.includes('pizza')) {
    return {
      answer: "I've loaded the food concessions menu and filtered it to pizzas for you!",
      actionType: 'FOOD',
      actionPayload: { filter: 'Pizza' },
    };
  }
  if (lowerQuery.includes('popcorn')) {
    return {
      answer:
        'Giant Butter Popcorn buckets are available at nearby stands. Opening concessions menu...',
      actionType: 'FOOD',
      actionPayload: { filter: 'Popcorn' },
    };
  }
  if (lowerQuery.includes('coffee')) {
    return {
      answer: 'Piping hot espresso and coffees are ready for delivery. Opening concessions menu...',
      actionType: 'FOOD',
      actionPayload: { filter: 'Coffee' },
    };
  }
  if (lowerQuery.includes('veg')) {
    return {
      answer: 'Showing vegetarian food recommendations on the concessions menu.',
      actionType: 'FOOD',
      actionPayload: { filter: 'veg' },
    };
  }
  if (lowerQuery.includes('spicy')) {
    return {
      answer: 'Showing spicy items (like Pepperoni Pizzas) on the concessions menu.',
      actionType: 'FOOD',
      actionPayload: { filter: 'spicy' },
    };
  }
  if (lowerQuery.includes('calorie') || lowerQuery.includes('healthy')) {
    return {
      answer: 'Showing healthy options and low calorie salad bowls on the concessions menu.',
      actionType: 'FOOD',
      actionPayload: { filter: 'healthy' },
    };
  }
  if (
    lowerQuery.includes('food') ||
    lowerQuery.includes('concession') ||
    lowerQuery.includes('drink') ||
    lowerQuery.includes('eat') ||
    lowerQuery.includes('order') ||
    lowerQuery.includes('menu')
  ) {
    if (dynamicSection) {
      return {
        answer: `Absolutely! There are fantastic food options available right near Section ${dynamicSection}. I've opened the menu so you can order directly to that seat.`,
        actionType: 'FOOD',
        actionPayload: { filter: `Section ${dynamicSection}` },
      };
    }
    return {
      answer:
        "I'd love to help you get some food! I'm opening the concessions menu now. You can order warm food and cold drinks directly to your seat.",
      actionType: 'FOOD',
    };
  }
  if (
    lowerQuery.includes('park') ||
    lowerQuery.includes('transit') ||
    lowerQuery.includes('shuttle') ||
    lowerQuery.includes('bus') ||
    lowerQuery.includes('metro') ||
    lowerQuery.includes('car') ||
    lowerQuery.includes('charger') ||
    lowerQuery.includes('ev')
  ) {
    return MOCK_ANSWERS['parking'];
  }
  if (
    lowerQuery.includes('match') ||
    lowerQuery.includes('score') ||
    lowerQuery.includes('today') ||
    lowerQuery.includes('lineup') ||
    lowerQuery.includes('stats') ||
    lowerQuery.includes('commentary') ||
    lowerQuery.includes('who will win')
  ) {
    return MOCK_ANSWERS['match'];
  }
  if (
    lowerQuery.includes('emergency') ||
    lowerQuery.includes('help') ||
    lowerQuery.includes('sos') ||
    lowerQuery.includes('fire') ||
    lowerQuery.includes('medical') ||
    lowerQuery.includes('police') ||
    lowerQuery.includes('lost child') ||
    lowerQuery.includes('safety') ||
    lowerQuery.includes('suspicious')
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

  if (
    lowerQuery.includes('leaderboard') ||
    lowerQuery.includes('fan zone') ||
    lowerQuery.includes('gamif') ||
    lowerQuery.includes('quiz') ||
    lowerQuery.includes('spin') ||
    lowerQuery.includes('scratch') ||
    lowerQuery.includes('predict') ||
    lowerQuery.includes('badge') ||
    lowerQuery.includes('xp') ||
    lowerQuery.includes('coins') ||
    lowerQuery.includes('reward') ||
    lowerQuery.includes('achievement') ||
    lowerQuery.includes('penalty') ||
    lowerQuery.includes('poll') ||
    lowerQuery.includes('selfie')
  ) {
    return MOCK_ANSWERS['fan_zone'];
  }

  if (
    lowerQuery.includes('jersey') ||
    lowerQuery.includes('merch') ||
    lowerQuery.includes('merchandise') ||
    lowerQuery.includes('football ball') ||
    lowerQuery.includes('collectible') ||
    lowerQuery.includes('scarf') ||
    lowerQuery.includes('cap') ||
    lowerQuery.includes('sneaker') ||
    lowerQuery.includes('buy') ||
    lowerQuery.includes('shop') ||
    lowerQuery.includes('flash sale') ||
    lowerQuery.includes('discount') ||
    lowerQuery.includes('customize')
  ) {
    return MOCK_ANSWERS['merch'];
  }

  return {
    answer:
      "I'm not exactly sure how to help with that specifically! But I'd love to assist you with stadium navigation, finding great food, managing your ticket, or giving you live match updates. Could you try rephrasing your question?",
  };
};
