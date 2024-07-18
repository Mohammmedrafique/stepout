const API_URL = "https://stepout-qqiv.onrender.com/api";

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const addTrain = async (trainData, token) => {
  const response = await fetch(`${API_URL}/admin/add-train`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(trainData),
  });
  return response.json();
};

export const getTrains = async (source, destination) => {
  const response = await fetch(
    `${API_URL}/trains?source=${source}&destination=${destination}`
  );

  return response.json();
};

export const bookSeat = async (bookingData, token) => {
  const response = await fetch(`${API_URL}/user/book-seat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });
  return response.json();
};
