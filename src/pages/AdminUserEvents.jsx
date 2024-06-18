import { useEffect, useState } from "react";
import AllEventsTable from "../components/AdminComponents/AllEventsTable";
import Header from "../components/Common/Header";
import { GetAllEvents } from "../services/eventServie";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddEventForm from "../components/AdminComponents/AddEventForm";
export default function AdminUserEvents() {
  const [events, setEvents] = useState([]);
  const [openAddEvent, setOpenAddEvent] = useState(false);

  const fetchAllEvents = async () => {
    await GetAllEvents()
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
const handleCloseAddEvent = () => {
  setOpenAddEvent(false);
  fetchAllEvents();
};
  useEffect(() => {
    fetchAllEvents();
  }, []);

  
  return (
    <div>
      <Header type={"admin"} />
      <div style={{ margin: "2rem" }}>
        <div
          style={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenAddEvent(true);
            }}
          >
            Add New Event
          </Button>
        </div>
        <AllEventsTable rows={events} fetchAllEvents={fetchAllEvents} />
      </div>
      <Dialog open={openAddEvent} onClose={handleCloseAddEvent} fullWidth>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <AddEventForm onClose={handleCloseAddEvent} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
