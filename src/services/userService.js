import http from "./httpService";

const endpoint = "/api/v1/users";

const token = localStorage.getItem("token");
const header = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export async function CreateNewUser(user) {
  return await http.post(endpoint, user, { ...header });
}

export async function GetAllUsers() {
  return await http.get(endpoint, { ...header });
}

export async function DeleteUser(id) {
  return await http.delete(endpoint + `/${id}`, { ...header });
}

export async function DeactivateUser(id) {
  return await http.put(endpoint + `/${id}`, {}, { ...header });
}
