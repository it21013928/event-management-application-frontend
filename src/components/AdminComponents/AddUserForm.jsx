/* eslint-disable react/prop-types */
import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { CreateNewUser } from "../../services/userService";

export default function AddUserForm({onClose}) {
  const [userData, setUserData] = useState({
    username: null,
    email: null,
    password: null,
  });
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(userData.password !== confirmPassword){
       return toast.error("Password does not match")
    }
    await CreateNewUser(userData).then(()=>{
      toast.success("User saved successfully")
      onClose();
    }).catch((error)=> toast.error(JSON.stringify(error)));
  }

  return (
    <div>
      <Card style={{ padding: "1rem" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            fullWidth
            required
            label="Username"
            margin="normal"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
          <TextField
            type="email"
            fullWidth
            required
            label="Email Address"
            margin="normal"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          <TextField
            type="password"
            fullWidth
            required
            label="Password"
            margin="normal"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
          <TextField
            type="password"
            fullWidth
            required
            label="Confirm Password"
            margin="normal"
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            <div>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit"> Submit</Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
