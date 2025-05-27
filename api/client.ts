import axios from "axios";

const BASE_URL = "https://67ac71475853dfff53dab929.mockapi.io/api/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
