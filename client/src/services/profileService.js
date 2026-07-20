
import api from "./api.js"

export const getProfile = async () => {
  const response = await api.get("/api/profile");

  return response.data;
};

export const updateProfile = async (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  const response = await api.put(
    "/api/profile",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};
