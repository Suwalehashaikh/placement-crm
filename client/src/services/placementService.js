import api from "./api";

// GET ALL
export const getPlacements = async () => {
  const res = await api.get("/api/data/placements");
  return res.data;
};

// GET ONE
export const getPlacementById = async (id) => {
  const res = await api.get(
    `/api/data/placements/${id}`
  );

  return res.data;
};

// CREATE
export const createPlacement = async (data) => {
  const res = await api.post(
    "/api/data/placements",
    data
  );

  return res.data;
};

// UPDATE
export const updatePlacement = async (
  id,
  data
) => {
  const res = await api.put(
    `/api/data/placements/${id}`,
    data
  );

  return res.data;
};

// DELETE
export const deletePlacement = async (
  id
) => {
  const res = await api.delete(
    `/api/data/placements/${id}`
  );

  return res.data;
};