export const DEFAULT_CONTENTBLOCK_IMAGE = "/static/images/home/banner_image.png";
export const DEFAULT_LOGO = "/static/images/home/dark_logo.png";
export const DEFAULT_LIGHT_LOGO = "/static/images/home/light_logo.png";
export const DEFAULT_DARK_LOGO = "/static/images/home/dark_logo.png";
export const DEFAULT_PROFILE_PICTURE = "/static/images/avatar/default.png";
export const ORGANIZATION_PROFILE_LIMIT = 1;
export const ORGANIZER_PROFILE_LIMIT = 1;
export const TEAM_PROFILE_LIMIT = 10;

export const GAMES = [
  {
    id: 0,
    value: 0,
    name: "Rainbow Six Siege",
    image: "/static/images/games/r6s.webp"
  }
  // "Valorant",
  // "Counter-Strike: Global Offensive",
  // "Roller Champions",
  // "Rocket League",
  // "League of Legends",
  // "Trackmania",
  // "Magic: The Gathering",
  // "Overwatch 2",
  // "Modern Warfare 2",
  // "FIFA",
  // "Zula Global"
];

export const TEAM_TYPES = [
  {
    id: 0,
    value: 0,
    name: "Pro Team"
  },
  {
    id: 1,
    value: 1,
    name: "Challenger Team"
  },
  {
    id: 2,
    value: 2,
    name: "Semi-Professional Team"
  },
  {
    id: 3,
    value: 3,
    name: "Casual Team"
  }
];

export const STAFF_ROLES = [
  {
    id: 0,
    name: "Event Director"
  },
  {
    id: 1,
    name: "Event Assistant Director"
  },
  {
    id: 2,
    name: "Event Manager"
  },
  {
    id: 3,
    name: "Event Admin"
  },
  {
    id: 4,
    name: "Producer"
  },
  {
    id: 5,
    name: "Broadcaster"
  },
  {
    id: 6,
    name: "Commentator"
  }
];

export const EVENT_CATEGORIES = {
  tournament: {
    id: 0,
    value: 0,
    name: "Tournament"
  },
  league: {
    id: 1,
    value: 1,
    name: "League"
  }
};

export const EVENT_FORMATS = [
  {
    key: "single-elimination",
    value: 0,
    name: "Single Elimination"
  },
  {
    key: "double-elimination",
    value: 1,
    name: "Double Elimination"
  },
  {
    key: "ladder-elimination",
    value: 2,
    name: "Ladder Elimination"
  },
  {
    key: "pyramid-elimination",
    value: 3,
    name: "Pyramid Elimination"
  },
  {
    key: "straight-round-robin",
    value: 4,
    name: "Straight Round Robin"
  },
  {
    key: "2-divisions-split",
    value: 5,
    name: "2 Divisions Split"
  },
  {
    key: "round-robin-double-split",
    value: 6,
    name: "Round Robin Double Split"
  },
  {
    key: "round-robin-triple-split",
    value: 7,
    name: "Round Robin Triple Split"
  },
  {
    key: "round-robin-quadruple-split",
    value: 8,
    name: "Round Robin Quadruple split"
  },
  {
    key: "round-robin-semi-split",
    value: 9,
    name: "Semi Round Robin"
  },
  {
    key: "baku-pairing",
    value: 10,
    name: "Baku pairing System"
  }
];

export const EVENT_SEED_TYPES = {
  manual: {
    value: 0,
    name: "Manual"
  },
  random: {
    value: 1,
    name: "Random"
  }
};

export const EVENT_REGIONS = [
  {
    id: 0,
    value: 0,
    name: "North America"
  },
  {
    id: 1,
    value: 1,
    name: "Latin America"
  },
  {
    id: 2,
    value: 2,
    name: "Europe"
  }
];

export const EVENT_STATES = {
  CREATING: {
    value: 0,
    name: "CREATING"
  },
  SCHEDULING: {
    value: 1,
    name: "SCHEDULING"
  },
  SCHEDULED: {
    value: 2,
    name: "SCHEDULED"
  },
  STARTED: {
    value: 3,
    name: "STARTED"
  },
  FINISHED: {
    value: 4,
    name: "FINISHED"
  }
};

export const MATCH_STATES = {
  NOT_STARTED_SCHEDULING: {
    value: 0,
    name: "NOT STARTED SCHEDULING"
  },
  SCHEDULING: {
    value: 1,
    name: "SCHEDULING"
  },
  SCHEDULED: {
    value: 2,
    name: "SCHEDULED"
  },
  STARTED: {
    value: 3,
    name: "STARTED"
  },
  FINISHED: {
    value: 4,
    name: "FINISHED"
  }
};

export const PLATFORMS = [
  {
    id: 0,
    value: 0,
    name: "Xbox",
    image: "/static/images/platforms/xbox.png"
  },
  {
    id: 1,
    value: 1,
    name: "PC",
    image: "/static/images/platforms/pc.png"
  },
  {
    id: 2,
    value: 2,
    name: "PS4",
    image: "/static/images/platforms/playstation.png"
  },
  {
    id: 3,
    value: 3,
    name: "Cross-Platform",
    image: "/static/images/platforms/cross-platform.png"
  }
];

export const NULL_FUNCTION = () => {};

export const SCORE_WIN = 3;
export const SCORE_LOSE = 0;
export const SCORE_DRAW = 1;

// export default {
//     DEFAULT_CONTENTBLOCK_IMAGE,
//     DEFAULT_LOGO,
//     STAFF_ROLES,
//     EVENT_FORMATS,
//     EVENT_STATES,
//     EVENT_CATEGORIES,
//     EVENT_SEED_TYPES,
//     NULL_FUNCTION
// }

export const PARTICIPANT_STATES = {
  PLAYED: "PLAYED",
  NO_SHOW: "NO_SHOW",
  WALK_OVER: "WALK_OVER",
  NO_PARTY: "NO_PARTY",
  CREATED: "CREATED",
  PLAYING: "PLAYING"
};

export const TEAM_POSITIONS = [
  {
    id: 0,
    val: 0,
    name: "Manager"
  },
  {
    id: 1,
    val: 1,
    name: "Player"
  }
];

export const TICKET_TYPES = {
  FOLLOW_USER: "FOLLOW_USER",
  TEAM_REGISTER_REQUEST: "TEAM_REGISTER_REQUEST",
  MATCH_SCHEDULE_REQUEST: "MATCH_SCHEDULE_REQUEST"
};

// export default {
//   TICKET_TYPES,
//   TEAM_POSITIONS,
//   PARTICIPANT_STATES,
//   SCORE_WIN,
//   SCORE_LOSE,
//   SCORE_DRAW,
//   NULL_FUNCTION,
//   PLATFORMS,
//   MATCH_STATES,
//   EVENT_STATES,
//   EVENT_REGIONS,
//   EVENT_SEED_TYPES,
//   EVENT_FORMATS,
//   EVENT_CATEGORIES,
//   STAFF_ROLES,
//   TEAM_TYPES,
//   GAMES,
//   DEFAULT_CONTENTBLOCK_IMAGE,
//   DEFAULT_LOGO,
//   DEFAULT_LIGHT_LOGO,
//   DEFAULT_DARK_LOGO,
//   DEFAULT_PROFILE_PICTURE,
//   ORGANIZER_PROFILE_LIMIT,
//   ORGANIZER_PROFILE_LIMIT,
//   TEAM_PROFILE_LIMIT
// };
