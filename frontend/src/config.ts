const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const API_ENDPOINTS = {
  LEADERBOARD: `${API_BASE_URL}/api/leaderboard`,
  WIN: `${API_BASE_URL}/api/win`,
};

export default API_ENDPOINTS;