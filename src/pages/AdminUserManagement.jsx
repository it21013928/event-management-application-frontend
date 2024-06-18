import Header from "../components/Common/Header";
import UsersTable from "../components/AdminComponents/UsersTable";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import AddUserForm from "../components/AdminComponents/AddUserForm";
import { GetAllUsers } from "../services/userService";
import { getCurrentUser } from "../services/authService";
export default function AdminUserManagement() {
  const [openAddUser, setOpenAddUser] = useState(false);
  const [rows, setRows] = useState([]);
  const user = getCurrentUser();

  const fetchAllUsers = async () => {
    try {
      const response = await GetAllUsers();
      const users = [];
      [...response.data].forEach((row) => {
        if (row.isActive) {
          row.isActive = "Active Account";
        } else {
          row.isActive = "Account Deactivated";
        }
        users.push(row);
      });
      setRows(users);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          window.location = "/ems-admin-login";
        }
      }
      console.log(error);
    }
  };
  const handleCloseAddUser = () => {
    setOpenAddUser(false);
    fetchAllUsers();
  };
  useEffect(() => {
    console.log("user", user);
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
              setOpenAddUser(true);
            }}
          >
            Add New user
          </Button>
        </div>
        <UsersTable rows={rows} fetchAllUsers={fetchAllUsers} />
      </div>
      <Dialog open={openAddUser} onClose={handleCloseAddUser} fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <AddUserForm onClose={handleCloseAddUser} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
