import http from "./httpService";
import { jwtDecode } from "jwt-decode";
const endpoint = "/api/v1/auth";

export async function UserLogin(user){
    return await http.post(endpoint+"/user-login",user)
}

export async function AdminLogin(admin) {
  return await http.post(endpoint + "/admin-login", admin);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    return null;
  }
}