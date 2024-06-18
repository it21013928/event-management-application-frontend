import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { AdminLogin } from "../services/authService";
import toast from "react-hot-toast";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await AdminLogin({ username: username, password: password })
      .then(({ data }) => {
        toast.success("Login successful");
        localStorage.setItem("token", data.access_token);
        setTimeout(() => {
          window.location = "/user-management";
        }, 500);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Login</h2>

        <TextField
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" style={styles.button}>
          Login
        </Button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f0f2f5",
    position: "relative",
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    zIndex: -1,
    clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 100%)",
  },
  form: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    zIndex: 1,
  },
  title: {
    marginBottom: "1.5rem",
    color: "#333",
    textAlign: "center",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#667eea",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "2rem",
  },
};

export default AdminLoginPage;
