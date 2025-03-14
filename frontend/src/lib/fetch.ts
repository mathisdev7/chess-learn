const API_BASE_URL = "http://localhost:3000";

export const fetchApi = async (route: string, options: RequestInit = {}) => {
  const response = await fetch(API_BASE_URL + route, options);
  if (!response.ok) {
    throw new Error("API request failed");
  }
  return response;
};
