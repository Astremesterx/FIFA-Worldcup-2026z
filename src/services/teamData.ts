import type { Team } from './api';

export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'GK' | 'DEF' | 'DF' | 'MID' | 'MF' | 'FWD' | 'FW';
  club: string;
  isStar?: boolean;
}

export interface Milestone {
  year: number;
  description: string;
}

export interface TeamProfileData {
  coach: string;
  federation: string;
  historySummary: string;
  players: Player[];
  milestones: Milestone[];
  colors: {
    primary: string;
    secondary: string;
  };
}

const HARDCODED_PROFILES: Record<string, Partial<TeamProfileData>> = {
  // Argentina
  '37': {
    coach: 'Lionel Scaloni',
    federation: 'CONMEBOL',
    historySummary: 'The defending world champions arrive in North America looking to solidify their dynasty. With a blend of legendary veterans and a fiercely talented new generation, La Albiceleste plays with unparalleled passion and tactical fluidity.',
    players: [
      { id: 'arg-1', name: 'Emiliano Martínez', number: 23, position: 'GK', club: 'Aston Villa', isStar: false },
      { id: 'arg-2', name: 'Cristian Romero', number: 13, position: 'DEF', club: 'Tottenham', isStar: false },
      { id: 'arg-3', name: 'Enzo Fernández', number: 24, position: 'MID', club: 'Chelsea', isStar: true },
      { id: 'arg-4', name: 'Alexis Mac Allister', number: 20, position: 'MID', club: 'Liverpool', isStar: false },
      { id: 'arg-5', name: 'Lionel Messi', number: 10, position: 'FWD', club: 'Inter Miami', isStar: true },
      { id: 'arg-6', name: 'Julián Álvarez', number: 9, position: 'FWD', club: 'Man City', isStar: false },
    ],
    milestones: [
      { year: 1978, description: 'Won their first World Cup on home soil, led by Mario Kempes.' },
      { year: 1986, description: 'Diego Maradona\'s legendary performances brought Argentina their second star in Mexico.' },
      { year: 2022, description: 'Lionel Messi lifted the trophy in Qatar, completing his legendary resume.' }
    ],
    colors: { primary: '#43A1D5', secondary: '#F5F5F5' }
  },
  // France
  '33': {
    coach: 'Didier Deschamps',
    federation: 'UEFA',
    historySummary: 'A powerhouse looking to cement their legacy on the world stage once more. Les Bleus boast a generation of unmatched talent, combining blistering pace with tactical discipline.',
    players: [
      { id: 'fra-1', name: 'Mike Maignan', number: 16, position: 'GK', club: 'AC Milan', isStar: false },
      { id: 'fra-2', name: 'William Saliba', number: 4, position: 'DEF', club: 'Arsenal', isStar: false },
      { id: 'fra-3', name: 'Aurélien Tchouaméni', number: 8, position: 'MID', club: 'Real Madrid', isStar: false },
      { id: 'fra-4', name: 'Eduardo Camavinga', number: 6, position: 'MID', club: 'Real Madrid', isStar: false },
      { id: 'fra-5', name: 'Kylian Mbappé', number: 10, position: 'FWD', club: 'Real Madrid', isStar: true },
      { id: 'fra-6', name: 'Antoine Griezmann', number: 7, position: 'FWD', club: 'Atlético Madrid', isStar: true },
    ],
    milestones: [
      { year: 1998, description: 'Zidane led France to their first World Cup victory on home soil.' },
      { year: 2006, description: 'Reached the final in Germany, ending in heartbreak against Italy.' },
      { year: 2018, description: 'A young Mbappé announced himself as France won their second star in Russia.' },
      { year: 2022, description: 'Reached back-to-back finals, falling just short against Argentina.' }
    ],
    colors: { primary: '#002654', secondary: '#ED2939' }
  },
  // Spain
  '29': {
    coach: 'Luis de la Fuente',
    federation: 'UEFA',
    historySummary: 'La Roja are driven by a stunning new generation of technical maestros. Their possession-heavy style has evolved into a more direct, lethal approach while maintaining their iconic midfield dominance.',
    players: [
      { id: 'esp-1', name: 'Unai Simón', number: 23, position: 'GK', club: 'Athletic Club', isStar: false },
      { id: 'esp-2', name: 'Aymeric Laporte', number: 14, position: 'DEF', club: 'Al Nassr', isStar: false },
      { id: 'esp-3', name: 'Rodri', number: 16, position: 'MID', club: 'Man City', isStar: true },
      { id: 'esp-4', name: 'Pedri', number: 20, position: 'MID', club: 'Barcelona', isStar: false },
      { id: 'esp-5', name: 'Lamine Yamal', number: 19, position: 'FWD', club: 'Barcelona', isStar: true },
      { id: 'esp-6', name: 'Nico Williams', number: 11, position: 'FWD', club: 'Athletic Club', isStar: true },
    ],
    milestones: [
      { year: 2010, description: 'Iniesta\'s extra-time goal secured Spain\'s first and only World Cup star in South Africa.' },
      { year: 2014, description: 'Entered as defending champions but suffered a shock group-stage exit.' },
      { year: 2026, description: 'Entering as European Champions with the youngest core in their history.' }
    ],
    colors: { primary: '#AA151B', secondary: '#F1BF00' }
  },
  // England
  '45': {
    coach: 'Gareth Southgate',
    federation: 'UEFA',
    historySummary: 'Searching for history across the Atlantic. The Three Lions squad blends immense tournament experience with explosive youth, determined to finally bring football home.',
    players: [
      { id: 'eng-1', name: 'Jordan Pickford', number: 1, position: 'GK', club: 'Everton', isStar: false },
      { id: 'eng-2', name: 'John Stones', number: 5, position: 'DEF', club: 'Man City', isStar: false },
      { id: 'eng-3', name: 'Declan Rice', number: 4, position: 'MID', club: 'Arsenal', isStar: true },
      { id: 'eng-4', name: 'Jude Bellingham', number: 10, position: 'MID', club: 'Real Madrid', isStar: true },
      { id: 'eng-5', name: 'Bukayo Saka', number: 7, position: 'FWD', club: 'Arsenal', isStar: true },
      { id: 'eng-6', name: 'Harry Kane', number: 9, position: 'FWD', club: 'Bayern Munich', isStar: true },
    ],
    milestones: [
      { year: 1966, description: 'Won their sole World Cup at Wembley Stadium.' },
      { year: 1990, description: 'Reached the semi-finals in Italia 90, sparking a football renaissance.' },
      { year: 2018, description: 'Broke their penalty curse and reached the semi-finals in Russia.' }
    ],
    colors: { primary: '#CE1126', secondary: '#FFFFFF' }
  },
  // Portugal
  '41': {
    coach: 'Roberto Martínez',
    federation: 'UEFA',
    historySummary: 'A team brimming with world-class talent across the pitch. Portugal blends the immense experience of their legendary captain with a brilliant generation of creative midfielders and lethal attackers.',
    players: [
      { id: 'por-1', name: 'Diogo Costa', number: 22, position: 'GK', club: 'FC Porto', isStar: false },
      { id: 'por-2', name: 'Rúben Dias', number: 4, position: 'DEF', club: 'Man City', isStar: false },
      { id: 'por-3', name: 'Bruno Fernandes', number: 8, position: 'MID', club: 'Man Utd', isStar: true },
      { id: 'por-4', name: 'Bernardo Silva', number: 10, position: 'MID', club: 'Man City', isStar: false },
      { id: 'por-5', name: 'Rafael Leão', number: 17, position: 'FWD', club: 'AC Milan', isStar: false },
      { id: 'por-6', name: 'Cristiano Ronaldo', number: 7, position: 'FWD', club: 'Al Nassr', isStar: true },
    ],
    milestones: [
      { year: 1966, description: 'Eusébio led Portugal to a historic 3rd place finish in their debut tournament.' },
      { year: 2006, description: 'Reached the semi-finals in Germany, their best finish in the modern era.' },
      { year: 2022, description: 'Advanced to the quarter-finals in Qatar before suffering a shock defeat.' }
    ],
    colors: { primary: '#FF0000', secondary: '#006600' }
  },
  // Brazil
  '9': {
    coach: 'Carlo Ancelotti',
    federation: 'CONMEBOL',
    historySummary: 'The most successful nation in World Cup history is on a mission to secure their elusive "Hexa" (sixth star). With a breathtaking attack featuring pure Brazilian flair, the Seleção are ready to bring Jogo Bonito back to the biggest stage.',
    players: [
      { id: 'bra-1', name: 'Alisson Becker', number: 1, position: 'GK', club: 'Liverpool', isStar: false },
      { id: 'bra-2', name: 'Marquinhos', number: 4, position: 'DEF', club: 'PSG', isStar: false },
      { id: 'bra-3', name: 'Bruno Guimarães', number: 8, position: 'MID', club: 'Newcastle', isStar: false },
      { id: 'bra-4', name: 'Lucas Paquetá', number: 10, position: 'MID', club: 'West Ham', isStar: false },
      { id: 'bra-5', name: 'Vinícius Júnior', number: 7, position: 'FWD', club: 'Real Madrid', isStar: true },
      { id: 'bra-6', name: 'Neymar Jr', number: 11, position: 'FWD', club: 'Al Hilal', isStar: true },
    ],
    milestones: [
      { year: 1958, description: 'A young Pelé introduced himself to the world, securing Brazil\'s first star.' },
      { year: 1970, description: 'Considered the greatest team ever assembled, claiming their third title in Mexico.' },
      { year: 2002, description: 'Ronaldo\'s redemption arc culminated in Brazil\'s record fifth World Cup victory.' }
    ]
  }
};

const GENERIC_COACH_NAMES = ['Carlos', 'Roberto', 'John', 'Michael', 'David', 'Jorge', 'Fernando', 'Marco'];
const GENERIC_LAST_NAMES = ['Smith', 'Garcia', 'Rossi', 'Silva', 'Muller', 'Martinez', 'Olsen', 'Kim'];
const GENERIC_CLUBS = ['Local FC', 'Capital City', 'Sporting', 'United', 'Real', 'Dynamo', 'Athletic', 'Wanderers'];

function seedRandom(seedStr: string) {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = Math.imul(31, hash) + seedStr.charCodeAt(i) | 0;
  }
  return () => {
    hash = Math.imul(15256249, hash);
    return (hash >>> 0) / 4294967296;
  };
}

export function getProfileForTeam(team: Team, squadData?: { coach?: string; players?: Player[] }): TeamProfileData {
  const overrides = HARDCODED_PROFILES[team.id] || {};
  
  const rand = seedRandom(team.id + team.name_en);
  
  const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
  
  const coach = squadData?.coach && squadData.coach !== 'Unknown' 
    ? squadData.coach 
    : (overrides.coach || `${pick(GENERIC_COACH_NAMES)} ${pick(GENERIC_LAST_NAMES)}`);
    
  const federation = overrides.federation || 'FIFA Member';
  
  const historySummary = overrides.historySummary || 
    `${team.name_en} arrives at the 2026 World Cup ready to make their mark. The squad has undergone rigorous tactical development and is prepared to challenge the world's best on the biggest stage.`;
    
  let players: Player[] = squadData?.players && squadData.players.length > 0
    ? squadData.players as Player[]
    : (overrides.players || []);

  if (players.length > 0 && players.length < 26) {
    const currentCount = players.length;
    const generated = Array.from({ length: 26 - currentCount }).map((_, i) => {
      const globalIdx = currentCount + i;
      let pos: Player['position'] = 'FWD';
      if (globalIdx < 3) pos = 'GK';
      else if (globalIdx < 11) pos = 'DEF';
      else if (globalIdx < 19) pos = 'MID';

      return {
        id: `${team.id}-p${globalIdx}`,
        name: `${pick(GENERIC_COACH_NAMES).charAt(0)}. ${pick(GENERIC_LAST_NAMES)}`,
        number: globalIdx + 1,
        position: pos,
        club: pick(GENERIC_CLUBS),
        isStar: false,
      };
    });
    players = [...players, ...generated];
  } else if (players.length === 0) {
    players = Array.from({ length: 26 }).map((_, i) => {
      let pos: Player['position'] = 'FWD';
      if (i < 3) pos = 'GK';
      else if (i < 11) pos = 'DEF';
      else if (i < 19) pos = 'MID';

      return {
        id: `${team.id}-p${i}`,
        name: `${pick(GENERIC_COACH_NAMES).charAt(0)}. ${pick(GENERIC_LAST_NAMES)}`,
        number: i + 1,
        position: pos,
        club: pick(GENERIC_CLUBS),
        isStar: i === 9 || i === 10,
      };
    });
  }
  
  const milestones = overrides.milestones || [
    { year: 2024, description: `${team.name_en} successfully secured their qualification after a grueling regional campaign.` },
    { year: 2026, description: `Making a highly anticipated appearance to represent their nation in the expanded 48-team tournament.` }
  ];

  const colors = overrides.colors || {
    primary: `hsl(${Math.floor(rand() * 360)}, 70%, 50%)`,
    secondary: `hsl(${Math.floor(rand() * 360)}, 80%, 60%)`
  };

  return { coach, federation, historySummary, players, milestones, colors };
}
