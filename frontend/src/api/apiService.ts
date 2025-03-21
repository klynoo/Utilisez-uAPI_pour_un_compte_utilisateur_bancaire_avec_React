import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/user/login`, credentials);
  return response.data;
};

export const getUserProfile = async (token: string) => {
  const response = await axios.post(
    `${API_URL}/user/profile`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateUserProfile = async (token: string, userData: any) => {
  const response = await axios.put(`${API_URL}/user/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
