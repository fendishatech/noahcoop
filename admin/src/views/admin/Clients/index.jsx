import { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../context/themeContext";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axiosClient from "../../../api/axiosClient";

const Clients = () => {
  const [clients, setClients] = useState({});
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "first_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone_no",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              ወደ አባል ቀይር
            </Typography>
          </Box>
        );
      },
    },
  ];

  const getClients = async () => {
    const res = await axiosClient.get("/clients");
    setClients(res.data.payload);
  };
  useEffect(() => {
    getClients();
  }, []);

  console.log(clients);
  return (
    <Box m="10px">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header title="የደንበኞች ዝርዝር" subtitle="" />
        <Button
          sx={{
            backgroundColor: colors.greenAccent[600],
          }}
          variant="contained"
          href="/new_client"
        >
          አዲስ ደምብኛ
        </Button>
      </Box>
      <Box
        height="75vh"
        sx={{
          //   "& .MuiDataGrid-root": {
          //     border: "none",
          //   },
          //   "& .MuiDataGrid-cell": {
          //     borderBottom: "none",
          //   },
          //   "& .name-column--cell": {
          //     color: colors.greenAccent[300],
          //   },
          //   "& .MuiDataGrid-columnHeaders": {
          //     backgroundColor: colors.blueAccent[700],
          //     borderBottom: "none",
          //   },
          //   "& .MuiDataGrid-virtualScroller": {
          //     backgroundColor: colors.primary[400],
          //   },
          //   "& .MuiDataGrid-footerContainer": {
          //     borderTop: "none",
          //     backgroundColor: colors.blueAccent[700],
          //   },
          //   "& .MuiCheckbox-root": {
          //     color: `${colors.greenAccent[200]} !important`,
          //   },
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={clients}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Clients;
