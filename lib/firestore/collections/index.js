import organizationStore from "./organization/index";
import eventStore from "./event/index";
import matchStore from "./match/index";
import playerStore from "./player/index";
import teamStore from "./team/index";
import ticketStore from "./ticket/index";

export default {
  organization: organizationStore,
  event: eventStore,
  match: matchStore,
  player: playerStore,
  team: teamStore,
  ticket: ticketStore,
};
