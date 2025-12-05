import api from "../api/api";

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/api/auth/login", {
      username: credentials.identifier,
      password: credentials.password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const registerUser = async (credentials) => {
  try {
    const response = await api.post("/api/auth/register", {
      name: credentials.name,
      email: credentials.email,
      username: credentials.username,
      school_id: credentials.school_id,
      password: credentials.password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const registerUserWithGoogle = async (credentials) => {
  try {
    console.log("Registering user with Google:", credentials);
    const response = await api.post("/api/auth/google-register", {
      google_token: credentials.google_token,
      school_id: credentials.school_id,
      username: credentials.username,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user with Google:", error);
    throw error;
  }
};

export const checkGoogleUser = async (google_token) => {
  try {
    return await api.post("/api/auth/google-response", { google_token });
  } catch (error) {
    console.error("Error checking Google user:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post("/api/auth/refresh-token");
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
