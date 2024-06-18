/* eslint-disable react/prop-types */
import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { CreateNewEvent } from "../../services/eventServie";

export default function AddEventForm({ onClose }) {
  const [eventData, setEventData] = useState({
    name: null,
    expectedDate: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await CreateNewEvent(eventData)
      .then(() => {
        toast.success("Event saved successfully");
        onClose();
      })
      .catch((error) => {
        onClose();
        if (error.response) return toast.error(error.response.data.message[0]);
        toast.error("Something went wrong");
      });
  };

  return (
    <div>
      <Card style={{ padding: "1rem" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            fullWidth
            required
            label="Eventname"
            margin="normal"
            name="name"
            value={eventData.name}
            onChange={handleInputChange}
          />
          <TextField
            type="date"
            fullWidth
            required
            label="Expected Date"
            margin="normal"
            name="expectedDate"
            InputLabelProps={{ shrink: true }}
            value={eventData.expectedDate}
            onChange={handleInputChange}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            <div>
              <Button onClick={onClose} >Cancel</Button>
              <Button type="submit"> Submit</Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
