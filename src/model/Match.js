export const Match = {
  eid: "",
  id: "",
  name: "",
  nextMatchId: "",
  tournamentRoundText: "",
  startTime: "",
  state: "",
  participants: [],
  up: "",         // Prev Match ID of participant 1
  down: "",       // Prev Match ID of participant 2
  // Fields from tournament-pairing
  round: 0,
  match: 0,
  player1: 0,
  player2: 0,
  win: {
    round: 0,
    match: 0
  },
  startsAt: new Date(),
  endsAt: new Date(),
  status: 0
}

export const Participant = {
  id: "",
  resultText: "",
  isWinner: false,
  status: null,
  name: "",
  score: 0,
  // Additional fields
  round: 0,
}

export default Match;