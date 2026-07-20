// services/courseService.js

import api from "./api";

export const createCourse = async (data) => {
  const response = await api.post(
    "/api/data/courses",
    data
  );

  return response.data;
};

export const getCourses = async () => {
  const response = await api.get(
    "/api/data/courses"
  );

  return response.data;
};

export const getCourseById = async (id) => {
  const response = await api.get(
    `/api/data/courses/${id}`
  );

  return response.data;
};

export const updateCourse = async (
  id,
  data
) => {
  const response = await api.put(
    `/api/data/courses/${id}`,
    data
  );

  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(
    `/api/data/courses/${id}`
  );

  return response.data;
};