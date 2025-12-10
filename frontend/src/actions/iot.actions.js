import api from "../api/api";


export const getDevices = async () => {
    try {
        const response = await api.get("/api/devices");
        return response.data;
    } catch (error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
}

export const getLatest50IotData = async (deviceId) => {
  try {
    const response = await api.get(`/api/iot/latest50/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching latest IoT data:", error);
    throw error;
  }
};

export const getLatestIotData = async () => {
  try {
    const response = await api.get("/api/iot/latest");
    return response.data;
  } catch (error) {
    console.error("Error fetching latest IoT data:", error);
    throw error;
  }
};

export const getLatestIotDataById = async (deviceId) => {
  try {
    const response = await api.get(`/api/iot/latest/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching latest IoT data:", error);
    throw error;
  }
};


