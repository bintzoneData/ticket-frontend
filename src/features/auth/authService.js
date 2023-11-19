import axios from 'axios';
const API_URL3 = 'http://localhost:3000/api/users/';
const API_URL = 'api/users/';
const API_URL2 = '/api/users/login';
// regitet
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const login = async (userData) => {
  const response = await axios.post(API_URL2, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const update = async (userId, user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + userId, user, config);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const logout = () => localStorage.removeItem('user');
const authService = {
  register,
  login,
  logout,
  update,
};

export default authService;
