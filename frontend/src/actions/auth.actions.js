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
    const response = await api.post("/api/auth/google-register", {
      google_token: credentials.google_token,
      school_id: credentials.school_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user with Google:", error);
    throw error;
  }
};