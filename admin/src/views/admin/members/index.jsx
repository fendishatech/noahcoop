import { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../context/themeContext";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axiosClient from "../../../api/axiosClient";

const Members = () => {
  const [members, setMembers] = useState({});
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDelete = async (id) => {
    console.log(id);
    if (confirm("Do you want to delete this record?")) {
      try {
        const res = await axiosClient.delete(`/members/${id}`);
        getMembers();
      } catch (error) {}
    } else {
      console.log("return to app");
    }
  };

  const providedAttributes = [
    "gender",
    "dob",
    "martialStatus",
    "familyMembers_no",
    "familyMembersGender",
    "phoneNo",
    "willList",
    "memberType",
  ];
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) =>
        ` ${params.row.title || ""} ${params.row.firstName || ""} ${
          params.row.middleName || ""
        }${params.row.lastName || ""}`,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) => ` ${params.row.gender || ""}`,
    },
    {
      field: "phoneNo",
      headerName: "Phone Number",
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
              href={`/edit_member/${id}`}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              href={`/member_detail/${id}`}
            >
              Detail
            </Button>
            <Button variant="contained" color="error">
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const getMembers = async () => {
    try {
      const res = await axiosClient.get("/members");
      setMembers(res.data.payload);
      console.log(res.data.payload);
    } catch (error) {
      console.log(error.message);
      // toast.error(res.data.message);
    }
  };
  useEffect(() => {
    getMembers();
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
          href="/new_member"
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
          rows={members}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Members;
