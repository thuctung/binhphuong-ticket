import viCommon from "./vi/common.json";
import viHomepage from "./vi/homepage.json";
import viBuyTicket from "./vi/buyticket.json";
import viCart from "./vi/cart.json";

import enCommon from "./en/common.json";
import enHomepage from "./en/homepage.json";
import enBuyTicket from "./en/buyticket.json";
import enCart from "./en/cart.json";

import zhCommon from "./zh/common.json";
import zhHomepage from "./zh/homepage.json";
import zhBuyTicket from "./zh/buyticket.json";
import zhCart from "./zh/cart.json";

import koCommon from "./ko/common.json";
import koHomepage from "./ko/homepage.json";
import koBuyTicket from "./ko/buyticket.json";
import koCart from "./ko/cart.json";

export const resources = {
  vi: {
    translation: { common: viCommon, homepage: viHomepage, buyticket: viBuyTicket, cart: viCart },
  },
  en: {
    translation: { common: enCommon, homepage: enHomepage, buyticket: enBuyTicket, cart: enCart },
  },
  zh: {
    translation: { common: zhCommon, homepage: zhHomepage, buyticket: zhBuyTicket, cart: zhCart },
  },
  ko: {
    translation: { common: koCommon, homepage: koHomepage, buyticket: koBuyTicket, cart: koCart },
  },
};
