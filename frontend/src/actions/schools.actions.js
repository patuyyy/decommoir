import api from "../api/api";

export const getAllSchools = async () => {
  try {
    const response = await api.get("/api/schools/");
    return response.data;
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
};

export const getSchoolById = async (id) => {
  try {
    const response = await api.get(`/api/schools/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching school with id ${id}:`, error);
    throw error;
  }
};