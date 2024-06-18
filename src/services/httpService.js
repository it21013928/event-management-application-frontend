import axios from "axios";

axios.defaults.baseURL = "https://event-management-application-backend.vercel.app/";

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
export default http;
