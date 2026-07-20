import api from "./api";

export const getEmployees = async () => {
  const response = await api.get("/api/data/employees");
  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await api.get(
    `/api/data/employees/${id}`
  );

  return response.data;
};

export const createEmployee = async (data) => {
  const response = await api.post(
    "/api/auth/create-user",
    data
  );

  return response.data;
};