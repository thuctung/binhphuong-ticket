import viCommon from "./vi/common.json";
import viHomepage from "./vi/homepage.json";
import enCommon from "./en/common.json";
import enHomepage from "./en/homepage.json";
import zhCommon from "./zh/common.json";
import zhHomepage from "./zh/homepage.json";
import koCommon from "./ko/common.json";
import koHomepage from "./ko/homepage.json";

export const resources = {
  vi: { translation: { common: viCommon, homepage: viHomepage } },
  en: { translation: { common: enCommon, homepage: enHomepage } },
  zh: { translation: { common: zhCommon, homepage: zhHomepage } },
  ko: { translation: { common: koCommon, homepage: koHomepage } },
};
