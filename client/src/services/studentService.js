import api from "./api";

export const createStudent = async (data) => {
  const response = await api.post(
    "/api/data/students",
    data
  );

  return response.data;
};

export const getStudents = async () => {
  const response = await api.get(
    "/api/data/students"
  );

  return response.data.data; // ✅ FIXED
};

export const getStudentById = async (id) => {
  const response = await api.get(
    `/api/data/students/${id}`
  );

  return response.data.data;
};

export const updateStudent = async (
  id,
  data
) => {
  const response = await api.put(
    `/api/data/students/${id}`,
    data
  );

  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(
    `/api/data/students/${id}`
  );

  return response.data;
};