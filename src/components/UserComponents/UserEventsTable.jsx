/* eslint-disable react/prop-types */
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { GetUniqueId } from "../../services/commonServices";
import { UpdateStatus } from "../../services/eventServie";

export default function UserEventsTable({ rows, fetchAllEvents }) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    fetchAllEvents();
  };
  const handleAllocateUser = async () => {
    await UpdateStatus({ id: selectedEvent, status: "completed" })
      .then(() => {
        toast.success("Event was successfully completed");
        handleCloseUpdate();
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    fetchAllEvents();
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
      headerName: "Event ID",
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
              {params.row.status === "pending" && (
                <Button
                  onClick={() => {
                    setOpenUpdate(true);
                    setSelectedEvent(params.row._id);
                  }}
                  variant="contained"
                  size="small"
                  sx={{ marginRight: "1rem" }}
                >
                  Update Status
                </Button>
              )}
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

      <Dialog open={openUpdate} onClose={handleCloseUpdate} fullWidth>
        <DialogTitle>Update Event Status</DialogTitle>
        <DialogContent>
          <div style={{ fontSize: "18px" }}>
            Are you sure you want to mark this event as completed?
          </div>
        </DialogContent>
        <DialogActions>
          <div>
            <Button onClick={handleCloseUpdate}>Cancel</Button>
            <Button onClick={handleAllocateUser}>Update</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
