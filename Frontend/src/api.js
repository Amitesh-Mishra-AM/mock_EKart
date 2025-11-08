import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});
export function setUserEmail(email) {
  api.defaults.headers.common["x-user-email"] = email;
}

export default api;
