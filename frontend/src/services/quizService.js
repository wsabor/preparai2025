import axios from "axios";

const PORT = 3000; // ou importe de alguma config se mudar
const API = `${window.location.protocol}//${window.location.hostname}:${PORT}/api`;

export async function saveScore(user, pontos) {
  return axios.post(`${API}/scores`, { user, pontos });
}

export async function fetchRanking() {
  const res = await axios.get(`${API}/scores`);
  return res.data; // array de { user, pontos, timestamp }
}
