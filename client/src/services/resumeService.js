import api from "./api";

export const createResume = async (data) => {
  const response = await api.post(
    "/api/data/resumes",
    data
  );

  return response.data;
};

export const getResumes = async () => {
  const response = await api.get(
    "/api/data/resumes"
  );

  return response.data;
};

export const getResumeById = async (id) => {
  const response = await api.get(
    `/api/data/resumes/${id}`
  );

  return response.data;
};

export const updateResume = async (
  id,
  data
) => {
  const response = await api.put(
    `/api/data/resumes/${id}`,
    data
  );

  return response.data;
};

export const deleteResume = async (id) => {
  const response = await api.delete(
    `/api/data/resumes/${id}`
  );

  return response.data;
};