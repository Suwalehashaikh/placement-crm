import api from "./api";

export const getAlumni = async () => {
  const response = await api.get("/api/data/alumni");
  return response.data;
};

export const getAlumniById = async (id) => {
  const response = await api.get(`/api/data/alumni/${id}`);
  return response.data;
};

export const createAlumni = async (data) => {
  const response = await api.post(
    "/api/data/alumni",
    data
  );

  return response.data;
};

export const updateAlumni = async (
  id,
  data
) => {
  const response = await api.put(
    `/api/data/alumni/${id}`,
    data
  );

  return response.data;
};

export const deleteAlumni = async (id) => {
  const response = await api.delete(
    `/api/data/alumni/${id}`
  );

  return response.data;
};