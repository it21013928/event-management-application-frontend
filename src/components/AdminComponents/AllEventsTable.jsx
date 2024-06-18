/* eslint-disable react/prop-types */
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { GetUniqueId } from "../../services/commonServices";
import { GetAllUsers } from "../../services/userService";
import { AllocateUser } from "../../services/eventServie";

export default function AllEventsTable({ rows, fetchAllEvents }) {
  const [openAssign, setOpenAssign] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [options, setOptions] = useState([]);

  const handleCloseAssign = () => {
    setOpenAssign(false);
    fetchAllEvents();
  };
  const handleAllocateUser = async () => {
   await AllocateUser(selectedEvent, {userId: selectedUser.value}).then(()=>{
    toast.success("User Allocated")
    handleCloseAssign()
   }).catch((err)=>{
    toast.error(JSON.stringify(err))
   })
  };

  const fetchAllUsers = async () => {
    try {
      const response = await GetAllUsers();
      const opts = [];
      [...response.data].forEach((row) => {
        opts.push({
          label: `${row.username} (UID_${GetUniqueId(row._id)})`,
          value: row._id,
        });
      });
      setOptions(opts);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          window.location = "/ems-admin-login";
        }
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllEvents();
    fetchAllUsers();
  }, []);

  const getStatusChip = (status) => {
    if (status === "pending") {
      return <Chip label="Pending" color="primary" variant="outlined" />;
    }
    if (status === "completed") {
      return <Chip label="Completed" color="success" variant="outlined" />;
    }
    if (status === "overdue") {
      return <Chip label="Overdue" color="error" variant="outlined" />;
    }
    return null;
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => `EVN_${GetUniqueId(row._id)}`,
    },
    { field: "name", headerName: "Event Name", flex: 1, minWidth: 150 },
    {
      field: "createdDate",
      headerName: "Created Date",
      flex: 1,
      minWidth: 200,
      valueGetter: (value, row) => format(row.createdDate, "yyyy-MM-dd"),
    },
    {
      field: "expectedDate",
      headerName: "Expected Date",
      flex: 1,
      minWidth: 100,
      valueGetter: (value, row) => format(row.expectedDate, "yyyy-MM-dd"),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => getStatusChip(params.value),
    },
    {
      field: "userId",
      headerName: "Assign To",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => {
        if (row.userId === null) {
          return "Not Assigned";
        }
        return `UID_${GetUniqueId(row.userId)}`;
      },
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
            <Button
              onClick={() => {
                setOpenAssign(true);
                setSelectedEvent(params.row._id);
              }}
              variant="contained"
              size="small"
              sx={{ marginRight: "1rem" }}
            >
              Assign USer
            </Button>
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

      <Dialog open={openAssign} onClose={handleCloseAssign} fullWidth>
        <DialogTitle>Assign User</DialogTitle>
        <DialogContent>
          <div style={{ margin: "2rem" }}>
            <Autocomplete
              options={options}
              getOptionLabel={(option) => option.label}
              value={selectedUser}
              onChange={(event, value) => setSelectedUser(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Select Patient"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button onClick={handleCloseAssign}>Cancel</Button>
            <Button onClick={handleAllocateUser}>Assign</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
