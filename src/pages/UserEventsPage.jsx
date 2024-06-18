import { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import { GetUserEvents } from "../services/eventServie";
import UserEventsTable from "../components/UserComponents/UserEventsTable";
import { getCurrentUser } from "../services/authService";

export default function UserEventsPage() {
  const [events, setEvents] = useState([]);
  const user = getCurrentUser()
  const fetchAllEvents = async () => {
    await GetUserEvents(user.sub)
      .then(({ data }) => {
        setEvents(data);
      })
      .catch((error) => {
        if (error.response) {
        if (error.response.status === 401) {
          window.location = "/ems-admin-login";
        }
      }
      });
  };

  useEffect(()=>{
    fetchAllEvents();
  },[])

  return (
    <div>
      <Header />
      <div style={{ margin: "2rem" }}>
        <UserEventsTable rows={events} fetchAllEvents={fetchAllEvents} />
      </div>
    </div>
  );
}
