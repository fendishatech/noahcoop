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
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  return (
    <Box
      sx={{
        width: isCollapsed ? "60px" : "300px",
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
        <IconButton>
          <MenuOutlinedIcon
            sx={{ fontSize: 36 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem key={"Clients"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonOutlinedIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary={"Clients"} />}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {["Users", "Clients", "Members", "Loan"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <PersonOutlinedIcon />
                ) : (
                  <MenuOutlinedIcon />
                )}
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary={text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem key={"Settings"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonOutlinedIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary={"Settings"} />}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
