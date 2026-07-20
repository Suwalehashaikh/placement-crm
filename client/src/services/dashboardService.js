import api from "./api";

export const getDashboardData = async () => {
  const response = await api.get(
    "/api/data/dashboard"
  );

  return response.data;
};