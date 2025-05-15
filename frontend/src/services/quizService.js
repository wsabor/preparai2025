import axios from "axios";

const API = "http://localhost:3000/api";

export async function saveScore(user, pontos) {
  return axios.post(`${API}/scores`, { user, pontos });
}

export async function fetchRanking() {
  const res = await axios.get(`${API}/scores`);
  return res.data; // array de { user, pontos, timestamp }
}
