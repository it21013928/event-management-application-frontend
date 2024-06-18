/* eslint-disable react/prop-types */
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeactivateUser, DeleteUser } from "../../services/userService";
import toast from "react-hot-toast";
import { GetUniqueId } from "../../services/commonServices";

export default function UsersTable({ rows, fetchAllUsers }) {
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCloseDelete = () => {
    setOpenDelete(false);
    fetchAllUsers();
  };

  const handleCloseDeactivate = () => {
    setOpenDeactivate(false);
    fetchAllUsers();
  };

  const handleDeleteUser = async () => {
    await DeleteUser(selectedUser)
      .then(() => {
        toast.success("User Deleted Successfully");
        handleCloseDelete();
      })
      .catch((er) => toast.error(JSON.stringify(er)));
  };

  const handleDeactivateUser = async () => {
    const user = [...rows].filter((u) => u._id == selectedUser)[0];
    await DeactivateUser(selectedUser)
      .then(() => {
        toast.success(
          `User ${
            user.isActive === "Active Account" ? "Deactivated" : "Activated"
          } Successfully`
        );
        handleCloseDeactivate();
      })
      .catch((er) => toast.error(JSON.stringify(er)));
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "Event ID",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => `UID_${GetUniqueId(row._id)}`,
    },
    { field: "username", headerName: "Username", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email Address", flex: 1, minWidth: 200 },
    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          key={params.row._id}
          disableTouchRipple
          icon={
            <div>
              <Button
                onClick={() => {
                  setSelectedUser(params.row._id);
                  setOpenDelete(true);
                }}
                variant="contained"
                size="small"
                sx={{ marginRight: "1rem" }}
                color="error"
                startIcon={<DeleteIcon />}
              >
                Remove
              </Button>
              <Button
                onClick={() => {
                  setSelectedUser(params.row._id);
                  setOpenDeactivate(true);
                }}
                variant="contained"
                size="small"
                sx={{ marginRight: "1rem" }}
              >
                {params.row.isActive === "Active Account"
                  ? "Deactivate"
                  : "Activate"}
              </Button>
            </div>
          }
        />,
      ],
    },
  ];

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        columnBuffer={20}
        disableRowSelectionOnClick
      />
      <Dialog open={openDelete} onClose={handleCloseDelete} fullWidth>
        <DialogTitle>Remove User</DialogTitle>
        <DialogContent>
          <div style={{ fontSize: "18px" }}>
            Are you sure you want to remove this user?
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button onClick={handleDeleteUser}>Remove</Button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeactivate} onClose={handleCloseDeactivate} fullWidth>
        <DialogTitle>
          {selectedUser !== null
            ? [...rows].filter((u) => u._id == selectedUser)[0].isActive ===
              "Active Account"
              ? "Deactivate User Account"
              : "Activate User Account"
            : ""}
        </DialogTitle>
        <DialogContent>
          <div style={{ fontSize: "18px" }}>
            {selectedUser !== null
              ? [...rows].filter((u) => u._id == selectedUser)[0].isActive ===
                "Active Account"
                ? "Are you sure you want to Deactivate?"
                : "Are you sure you want to Activate?"
              : ""}
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button onClick={handleCloseDeactivate}>Cancel</Button>
            <Button onClick={handleDeactivateUser}>
              {selectedUser !== null
                ? [...rows].filter((u) => u._id == selectedUser)[0].isActive ===
                  "Active Account"
                  ? "Deactivate"
                  : "Activate"
                : ""}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
