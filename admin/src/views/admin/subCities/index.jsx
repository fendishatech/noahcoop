import { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../context/themeContext";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axiosClient from "../../../api/axiosClient";

const subCities = () => {
  const [subCities, setSubCities] = useState({});
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDelete = async (id) => {
    console.log(id);
    if (confirm("Do you want to delete this record?")) {
      try {
        const res = await axiosClient.delete(`/sub_cities/${id}`);
        getSubCities();
      } catch (error) {}
    } else {
      console.log("return to app");
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "SubCity Name",
      flex: 1,
    },
    {
      field: "woredas",
      headerName: "Woredas",
      flex: 1,
    },
  ];

  const getSubCities = async () => {
    try {
      const res = await axiosClient.get("/sub_cities");
      setSubCities(res.data.payload);
    } catch (error) {
      console.log(error.message);
    //   toast.error(res.data.message);
    }
  };
  useEffect(() => {
    getSubCities();
  }, []);
  return (
    <Box m="10px">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header title="የክ/ከተሞች ዝርዝር" subtitle="" />
        <Button
          sx={{
            backgroundColor: colors.greenAccent[600],
          }}
          variant="contained"
          href="/new_client"
        >
          አዲስ ክ/ከተማ
        </Button>
      </Box>
      <Box
        height="75vh"
        sx={{
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
          rows={subCities}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default subCities;
