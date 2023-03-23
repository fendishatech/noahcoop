import { useState } from "react";

import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../../context/themeContext";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import SavingsIcon from "@mui/icons-material/Savings";
// import {LocationCity} from "@mui/icons-material";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Sidebar = ({ open, setOpen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const linkItems = [
    {
      title: "ደምበኛ",
      linkTo: "/clients",
      icon: <PersonIcon />,
    },
    {
      title: "ከተሞች",
      linkTo: "/cities",
      icon: <PersonIcon />,
    },
    {
      title: "ክ/ከተሞች",
      linkTo: "/sub_cities",
      icon: <PersonIcon />,
    },
    {
      title: "ስታፍ",
      linkTo: "/staff",
      icon: <PeopleIcon />,
    },
    {
      title: "አባላት",
      linkTo: "/members",
      icon: <SupervisedUserCircleIcon />,
    },
    {
      title: "የብድር አገልግሎት",
      linkTo: "/loan",
      icon: <SavingsIcon />,
    },
  ];

  return (
    <Box
      sx={{
        width: isCollapsed ? "60px" : "270px",
        position: "fixed",
        zIndex: "1",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between">
        {!isCollapsed && (
          <Typography sx={{ paddingLeft: "10px", paddingTop: "18px" }}>
            ADMIN
          </Typography>
        )}
        <IconButton
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            setOpen(!open);
          }}
        >
          <MenuOutlinedIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </Box>
      <Divider />
      <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
        <ListItem key={"dashboard"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary={"ዳሽቦርድ"} />}
          </ListItemButton>
        </ListItem>
      </Link>

      <Divider />

      <List>
        {linkItems.map((item, index) => (
          <Item
            isCollapsed={isCollapsed}
            key={index}
            title={item.title}
            linkTo={item.linkTo}
            icon={item.icon}
          />
        ))}
      </List>

      <Divider />

      <Link
        to={"/settings"}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <ListItem key={"settings"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary={"ሴቲንግስ"} />}
          </ListItemButton>
        </ListItem>
      </Link>
    </Box>
  );
};

export default Sidebar;

const Item = ({ title, linkTo, icon, isCollapsed }) => {
  return (
    <Link to={linkTo} style={{ color: "inherit", textDecoration: "none" }}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          {!isCollapsed && <ListItemText primary={title} />}
        </ListItemButton>
      </ListItem>
    </Link>
  );
};
