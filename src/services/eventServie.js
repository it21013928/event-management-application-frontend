import http from "./httpService";

const endpoint = "/api/v1/events";

const token = localStorage.getItem("token");
const header = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export async function GetAllEvents() {
  return await http.get(endpoint, { ...header });
}

export async function GetUserEvents(id) {
  return await http.get(endpoint + `/${id}`, { ...header });
}

export async function CreateNewEvent(event) {
  return await http.post(endpoint, event, { ...header });
}

export async function AllocateUser(id, user) {
  return await http.put(endpoint + `/allocate/${id}`, user, { ...header });
}

export async function UpdateStatus(event) {
  return await http.put(endpoint + "/updateStatus", event, { ...header });
}
