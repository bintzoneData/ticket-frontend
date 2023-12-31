import axios from 'axios';
const API_URL = `${process.env.REACT_APP_MAIN_API}/tickets/`;
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, ticketData, config);
  return response.data;
};
const getTickets = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${process.env.REACT_APP_MAIN_API}/tickets?process=${query}`,
    config
  );
  if (response.data) {
    localStorage.setItem('Tickets', JSON.stringify(response.data));
  }
  return response.data;
};
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + ticketId, config);
  return response.data;
};
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + ticketId,
    {
      status: 'closed',
    },
    config
  );
  return response.data;
};
const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
};
export default ticketService;
