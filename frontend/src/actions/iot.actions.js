import api from "../api/api";

export const getLatestIotData = async () => {
  try {
    const response = await api.get("/api/iot/latest");
    return response.data;
  } catch (error) {
    console.error("Error fetching latest IoT data:", error);
    throw error;
  }
};

