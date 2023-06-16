export const DEFAULT_CONTENTBLOCK_IMAGE = "/Game_Rogue_Text_2.png";
export const DEFAULT_LOGO = "/LOGO.png";
export const DEFAULT_PROFILE_PICTURE = "/static/images/Profile_Picture.png";
export const ORGANIZER_PROFILE_LIMIT = 1;
export const ORGANIZATION_PROFILE_LIMIT = 1;
export const TEAM_PROFILE_LIMIT = 10;

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
    value: 0,
    name: "Tournament"
  },
  league: {
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
    key: "round-robin-double-split",
    value: 5,
    name: "Round Robin Double Split"
  },
  {
    key: "round-robin-triple-split",
    value: 6,
    name: "Round Robin Triple Split"
  },
  {
    key: "round-robin-quadruple-split",
    value: 7,
    name: "Round Robin Quadruple split"
  },
  {
    key: "round-robin-semi-split",
    value: 8,
    name: "Semi Round Robin"
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
    name: "XBox",
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
