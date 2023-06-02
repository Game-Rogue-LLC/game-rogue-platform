export const Event = {
  oid: "",
  id: "",
  name: "",
  description: "",
  banner: "",
  darkLogo: "",
  lightLogo: "",
  format: 0, // default: Single Elimination
  registrationStartAt: new Date(),
  registrationEndAt: new Date(),
  checkIn: 15,
  startAt: new Date(),
  endAt: new Date(),
  timezone: 0,
  seedingType: 0, // Random Seeding/Manual Seeding
  participants: [],
  participantsCount: 2,
  staffs: [],
  terms: "",
  privacy: "",
  ruleBook: "",
  status: 0,
  deleted: false,
};

export const EventParticipant = {
  tid: "",
  score: 0,
  wins: 0,
  loses: 0,
  draws: 0,
  registeredAt: "",
  deleted: false,
};
