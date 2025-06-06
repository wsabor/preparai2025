import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.warn(
    "A variável de ambiente VITE_API_BASE_URL não está definida. As chamadas de API podem falhar ou usar um fallback inseguro."
  );
}

export async function saveScore(user, pontos) {
  if (!API_BASE_URL) {
    return Promise.reject(new Error("URL da API não configurada."));
  }
  return axios.post(`${API_BASE_URL}/scores`, { user, pontos });
}

export async function fetchRanking() {
  if (!API_BASE_URL) {
    return Promise.reject(new Error("URL da API não configurada."));
  }
  return axios.get(`${API_BASE_URL}/scores`).then((res) => res.data);
}

export async function fetchPerguntas() {
  if (!API_BASE_URL)
    return Promise.reject(new Error("URL da API não configurada."));
  const res = await axios.get(`${API_BASE_URL}/perguntas`);
  return res.data;
}
