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
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.middleName || ""} ${
          params.row.lastName || ""
        }`,
    },
    {
      field: "phoneNo",
      headerName: "Phone Numbers",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            gap={2}
            // backgroundColor={
            //   access === "admin"
            //     ? colors.greenAccent[600]
            //     : access === "manager"
            //     ? colors.greenAccent[700]
            //     : colors.greenAccent[700]
            // }
            borderRadius="4px"
          >
            {/* {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />} */}
            <Button
              variant="contained"
              color="secondary"
              href={`/edit_client/${id}`}
            >
              Edit
            </Button>
            <Button variant="contained" color="error">
              Delete
            </Button>
            <Button variant="contained" color="success">
              ወደ አባል ቀይር
            </Button>
            {/* <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              ወደ አባል ቀይር
            </Typography>
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              ወደ አባል ቀይር
            </Typography> */}
          </Box>
        );
      },
    },
  ];

  const getClients = async () => {
    try {
      const res = await axiosClient.get("/clients");
      setClients(res.data.payload);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getClients();
  }, []);
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
