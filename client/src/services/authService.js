import api from "./api";


export const signupUser = async (data) => {
  const response = await api.post(
    "/api/auth/signup",
    data
  );

  return response.data;
};
export const loginUser = async (email, password) => {
  const response = await api.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await api.post("/api/auth/otp-verify", {
    email,
    otp,
  });

  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await api.post("/api/auth/refresh");

  return response.data;
};

export const getUserData = async (userId) => {
  const response = await api.get(`/api/auth/user/${userId}`);

  return response.data;
};