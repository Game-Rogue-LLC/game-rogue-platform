import articleStore from "./articles";
import categoryStore from "./categories/index";
import eventStore from "./event/index";
import matchStore from "./match/index";
import messageStore from "./messages/index";
import metaStore from "./meta";
import organizationStore from "./organization/index";
import organizerStore from "./organizer/index";
import playerStore from "./player/index";
import postStore from "./posts/index";
import productStore from "./products/index";
import shopStore from "./shops/index";
import teamStore from "./team/index";
import ticketStore from "./ticket/index";
import staffStore from "./staff/index";
import sponsorStore from "./sponsor/index";

const store = {
  organization: organizationStore,
  organizer: organizerStore,
  event: eventStore,
  match: matchStore,
  player: playerStore,
  team: teamStore,
  ticket: ticketStore,
  post: postStore,
  message: messageStore,
  shop: shopStore,
  product: productStore,
  category: categoryStore,
  article: articleStore,
  staff: staffStore,
  sponsor: sponsorStore,
  meta: metaStore
};

export default store;
