import { SUN_GROUP } from "@/commons/constant";
import axios from "axios";

const sunWorldApiClient = axios.create({
  baseURL: SUN_GROUP.serviceURL,
  timeout: 500000,
  headers: {
    "swg-subscription-key": SUN_GROUP.swgSubscriptionKey,
    "Content-Type": "application/json",
  },
});

sunWorldApiClient.interceptors.request.use(async (config) => {
  const token = "dsdasdasd";
  if (token) {
    config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiIwYTcwOTdjOS0xNThlLTQ1YjgtYjRkYi04ZGI0MGFhNmJkMzIiLCJpc3MiOiJodHRwczovL3N1bndvcmxkYjJjZGV2LmIyY2xvZ2luLmNvbS9jMDEzM2E3YS00Njk3LTRlN2MtOGYxYy1mNGU4MzIyYjA1NzUvdjIuMC8iLCJleHAiOjE3OTE1MzcyMzIsIm5iZiI6MTc5MTUzMzYzMiwidGZwIjoiQjJDXzFfcm9wYyIsImF6cGFjciI6IjEiLCJzdWIiOiI5NDIzY2Q3Ni05NGU1LTQ1NjEtYjNkOC1jMjUwOTdhMDhjYTgiLCJvaWQiOiI5NDIzY2Q3Ni05NGU1LTQ1NjEtYjNkOC1jMjUwOTdhMDhjYTgiLCJ0aWQiOiJjMDEzM2E3YS00Njk3LTRlN2MtOGYxYy1mNGU4MzIyYjA1NzUiLCJ2ZXIiOiIyLjAiLCJhenAiOiJmNzFhZjFjMi00YWVlLTRmNmMtODI2ZC00MWUwZTk4ZmYzMjQiLCJpYXQiOjE3OTE1MzM2MzJ9.tGIXOnDhmec84k_4u42B89CCGRNDMKf5tMo4-t7Tyd-okFZ9_o2zTwJDWhm-CtvjaI2_gTTyNfTCv3aWIVQvg4yLUzVIOXAhnykZ2bgp5GPY3GGLa0rhlHYjcCkocwZjaOJeLtxA_mscdfmPFLXF11JpvXONiOmAxN31jdxNg8T67kmLY8mejMDw3whWshOtO5-L1Ei2uGawLgn_eaSQ0sdavkmrbN3nX2lMHZmrH7sQcGMCZ3RSmz-aviu0GwG4rGLjqK80xjQ4OWBekqR9XacFo3vAe-c6m-0WP_Vru_x3r-SuYatoDvo-I8e3JNKA6TDSWhDIDjtbxK-AsGM5yA`;
  }
  return config;
});
export default sunWorldApiClient;
