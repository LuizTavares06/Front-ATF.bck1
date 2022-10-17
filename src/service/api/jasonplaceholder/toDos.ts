import axios from "axios";

const api = axios.create({
  baseURL: "https://api-back-end-at-final.herokuapp.com/sistema/recado/",
});

async function get(url: string) {
  const response = await api.get(url);

  return response.data;
}

export { get };
