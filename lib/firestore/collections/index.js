import articleStore from "./articles";
import categoryStore from "./categories/index";
import eventStore from "./event/index";
import matchStore from "./match/index";
import messageStore from "./messages/index";
import organizationStore from "./organization/index";
import playerStore from "./player/index";
import postStore from "./posts/index";
import productStore from "./products/index";
import shopStore from "./shops/index";
import teamStore from "./team/index";
import ticketStore from "./ticket/index";

export default {
  organization: organizationStore,
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
  article: articleStore
};
