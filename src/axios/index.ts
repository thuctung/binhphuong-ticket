import axios from "axios";
import i18nConfig from "../../i18nConfig";

const COOKIE_NAME = "NEXT_LOCALE";

const isValidLang = (l?: string | null): l is string => !!l && i18nConfig.locales.includes(l);

function getClientLang(): string {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  const fromCookie = match ? decodeURIComponent(match[1]) : null;
  if (isValidLang(fromCookie)) return fromCookie;

  const fromPath = window.location.pathname.split("/")[1];
  if (isValidLang(fromPath)) return fromPath;

  return i18nConfig.defaultLocale;
}

const api = axios.create({
  baseURL: "/",
  timeout: 500000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      config.headers["Accept-Language"] = getClientLang();
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
