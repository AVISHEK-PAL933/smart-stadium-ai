export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  isCaptain?: boolean;
  goals: number;
  assists: number;
  minutesPlayed: number;
  yellowCards: number;
}

export interface MatchStats {
  possessionHome: number;
  possessionAway: number;
  shotsHome: number;
  shotsAway: number;
  shotsOnTargetHome: number;
  shotsOnTargetAway: number;
  cornersHome: number;
  cornersAway: number;
  foulsHome: number;
  foulsAway: number;
  yellowHome: number;
  yellowAway: number;
  redHome: number;
  redAway: number;
  passAccuracyHome: number;
  passAccuracyAway: number;
  xgHome: number;
  xgAway: number;
}

export interface CommentaryEvent {
  minute: number;
  type: 'GOAL' | 'CARD' | 'CORNER' | 'FOUL' | 'SUB' | 'KICKOFF';
  title: string;
  body: string;
  team: 'HOME' | 'AWAY' | 'NEUTRAL';
}

export const MATCH_STATS: MatchStats = {
  possessionHome: 46,
  possessionAway: 54,
  shotsHome: 12,
  shotsAway: 16,
  shotsOnTargetHome: 5,
  shotsOnTargetAway: 8,
  cornersHome: 4,
  cornersAway: 7,
  foulsHome: 14,
  foulsAway: 11,
  yellowHome: 3,
  yellowAway: 2,
  redHome: 0,
  redAway: 0,
  passAccuracyHome: 82,
  passAccuracyAway: 87,
  xgHome: 1.45,
  xgAway: 1.98,
};

export const SQUAD_BRAZIL: Player[] = [
  {
    id: 'br1',
    name: 'Alisson Becker',
    number: 1,
    position: 'GK',
    goals: 0,
    assists: 0,
    minutesPlayed: 680,
    yellowCards: 0,
  },
  {
    id: 'br2',
    name: 'Marquinhos',
    number: 4,
    position: 'DEF',
    isCaptain: true,
    goals: 1,
    assists: 0,
    minutesPlayed: 680,
    yellowCards: 1,
  },
  {
    id: 'br3',
    name: 'Eder Militao',
    number: 3,
    position: 'DEF',
    goals: 0,
    assists: 0,
    minutesPlayed: 610,
    yellowCards: 2,
  },
  {
    id: 'br4',
    name: 'Danilo',
    number: 2,
    position: 'DEF',
    goals: 0,
    assists: 1,
    minutesPlayed: 590,
    yellowCards: 1,
  },
  {
    id: 'br5',
    name: 'Bruno Guimaraes',
    number: 5,
    position: 'MID',
    goals: 1,
    assists: 2,
    minutesPlayed: 680,
    yellowCards: 3,
  },
  {
    id: 'br6',
    name: 'Lucas Paqueta',
    number: 8,
    position: 'MID',
    goals: 2,
    assists: 3,
    minutesPlayed: 620,
    yellowCards: 2,
  },
  {
    id: 'br7',
    name: 'Vinicius Jr',
    number: 7,
    position: 'FWD',
    goals: 6,
    assists: 4,
    minutesPlayed: 650,
    yellowCards: 1,
  },
  {
    id: 'br8',
    name: 'Rodrygo Goes',
    number: 10,
    position: 'FWD',
    goals: 4,
    assists: 5,
    minutesPlayed: 640,
    yellowCards: 0,
  },
  {
    id: 'br9',
    name: 'Raphinha',
    number: 11,
    position: 'FWD',
    goals: 3,
    assists: 2,
    minutesPlayed: 580,
    yellowCards: 1,
  },
  {
    id: 'br10',
    name: 'Endrick Felipe',
    number: 9,
    position: 'FWD',
    goals: 5,
    assists: 1,
    minutesPlayed: 320,
    yellowCards: 0,
  },
];

export const SQUAD_ARGENTINA: Player[] = [
  {
    id: 'ar1',
    name: 'Emiliano Martinez',
    number: 23,
    position: 'GK',
    goals: 0,
    assists: 0,
    minutesPlayed: 680,
    yellowCards: 1,
  },
  {
    id: 'ar2',
    name: 'Cristian Romero',
    number: 13,
    position: 'DEF',
    goals: 1,
    assists: 0,
    minutesPlayed: 680,
    yellowCards: 2,
  },
  {
    id: 'ar3',
    name: 'Nicolas Otamendi',
    number: 19,
    position: 'DEF',
    goals: 0,
    assists: 0,
    minutesPlayed: 620,
    yellowCards: 1,
  },
  {
    id: 'ar4',
    name: 'Nahuel Molina',
    number: 26,
    position: 'DEF',
    goals: 1,
    assists: 2,
    minutesPlayed: 570,
    yellowCards: 0,
  },
  {
    id: 'ar5',
    name: 'Rodrigo De Paul',
    number: 7,
    position: 'MID',
    goals: 2,
    assists: 4,
    minutesPlayed: 680,
    yellowCards: 3,
  },
  {
    id: 'ar6',
    name: 'Alexis Mac Allister',
    number: 20,
    position: 'MID',
    goals: 3,
    assists: 3,
    minutesPlayed: 630,
    yellowCards: 1,
  },
  {
    id: 'ar7',
    name: 'Lionel Messi',
    number: 10,
    position: 'FWD',
    isCaptain: true,
    goals: 9,
    assists: 7,
    minutesPlayed: 660,
    yellowCards: 0,
  },
  {
    id: 'ar8',
    name: 'Julian Alvarez',
    number: 9,
    position: 'FWD',
    goals: 5,
    assists: 3,
    minutesPlayed: 590,
    yellowCards: 1,
  },
  {
    id: 'ar9',
    name: 'Lautaro Martinez',
    number: 22,
    position: 'FWD',
    goals: 7,
    assists: 2,
    minutesPlayed: 410,
    yellowCards: 1,
  },
  {
    id: 'ar10',
    name: 'Enzo Fernandez',
    number: 24,
    position: 'MID',
    goals: 2,
    assists: 3,
    minutesPlayed: 640,
    yellowCards: 2,
  },
];

export const COMMENTARY_EVENTS: CommentaryEvent[] = [
  {
    minute: 1,
    type: 'KICKOFF',
    title: 'Match Kickoff',
    body: 'Match starts under clear night skies at MetLife Stadium.',
    team: 'NEUTRAL',
  },
  {
    minute: 15,
    type: 'GOAL',
    title: 'GOAL! Argentina Score',
    body: 'Lionel Messi finishes a sublime team pass with a low curling shot inside the post.',
    team: 'AWAY',
  },
  {
    minute: 22,
    type: 'CARD',
    title: 'Yellow Card - Brazil',
    body: 'Bruno Guimaraes receives a booking for a sliding tackle on Rodrigo De Paul.',
    team: 'HOME',
  },
  {
    minute: 40,
    type: 'CORNER',
    title: 'Corner Kick',
    body: 'Lucas Paqueta shoots from outside box, tipped wide by Emiliano Martinez.',
    team: 'HOME',
  },
  {
    minute: 54,
    type: 'FOUL',
    title: 'Free Kick Given',
    body: 'Nahuel Molina pulls down Vinicius Jr near the corner flag.',
    team: 'AWAY',
  },
  {
    minute: 70,
    type: 'SUB',
    title: 'Substitution - Brazil',
    body: 'Endrick Felipe comes on for Raphinha in a strategic tactical change.',
    team: 'HOME',
  },
  {
    minute: 89,
    type: 'GOAL',
    title: 'GOAL! Brazil Equalize',
    body: 'Vinicius Jr beats two defenders on the left wing and slots it past Martinez!',
    team: 'HOME',
  },
];

export const AI_MATCH_SUMMARY =
  'The first half was dominated by Argentina with 58% possession, leading early via a Lionel Messi signature curve in the 15th minute. Brazil rebuilt lines in the second half, mounting constant counter-attacks through Vinicius Jr, finally leveling the score line in the 89th minute to split details.';
