import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import {
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Menu,
  MenuItem,
  Avatar,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import PersonIcon from "@mui/icons-material/Person";
// import PeopleIcon from "@mui/icons-material/People";
// import AssignmentIcon from "@mui/icons-material/Assignment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import loginImage from "../assets/login/images/crm.jpg";
// import { AccountCircleRounded } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SummarizeIcon from "@mui/icons-material/Summarize";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { onSuccess } from "../helper";
import { useDispatch } from "react-redux";
import { saveStatus } from "./redux/LoginSlice";
const isActive = (path) => location.pathname === path;
function AppNavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const drawerWidth = 240;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [permission, setPermission] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const rolesKey = localStorage.getItem("role-key");
  let reportBaseUrl = import.meta.env.VITE_REPORT_BASE_URL;
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/login");
    dispatch(saveStatus(false));
    localStorage.clear();
    onSuccess("Logged Out Successfully");
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const redirectToReport = () => {
    let url = `${reportBaseUrl}/reports?role-key=${rolesKey}`;
    window.location.href = url;
  };
  React.useEffect(() => {
    // const userPermission = atob(localStorage.getItem("permission"));
    const userPermission = localStorage.getItem("permission");

    setPermission(userPermission);
    setLoading(false);
  }, []);

  const drawer = (
    <div>
      <Toolbar sx={{ backgroundColor: "#3f4766" }}>
        {/* Logo */}
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            <img src={loginImage} alt="Logo" style={{ height: 60 }} />
          </Typography>
        </Box>
      </Toolbar>
      <Divider />

      <List sx={{ backgroundColor: "#3f4766", color: "#ffffff" }}>
        {/* Home Section with Expandable List */}
        <Accordion sx={{ backgroundColor: "#3f4766", color: "#ffffff" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
          >
            <ListItemIcon sx={{ color: "#ffffff" }}>
              <HomeIcon />
            </ListItemIcon>
            <Typography>Home Page</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "0px 0px 10px" }}>
            <List sx={{ backgroundColor: "#2f3b5c", padding: "0px" }}>
              <ListItemButton
                onClick={() => navigate("/home/my")}
                sx={{
                  backgroundColor: isActive("/home/my")
                    ? "#556080"
                    : "transparent",
                  "&:hover": { backgroundColor: "#4a5a78" },
                  borderLeft: isActive("/home/my")
                    ? "4px solid #00bcd4"
                    : "4px solid transparent",
                  paddingLeft: "16px",
                }}
              >
                {/* <ListItemIcon sx={{ color: "#ffffff" }}>
                  <PersonIcon />
                </ListItemIcon> */}
                <ListItemText primary="My Hone" />
              </ListItemButton>
            </List>
          </AccordionDetails>
        </Accordion>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        {/* Master Section */}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#ffff",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              color: "#3f4766",
              fontWeight: "bold",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Attendance Management System
          </Typography>
          {/* User Dropdown */}
          {/* <IconButton onClick={handleMenuOpen} sx={{ color: "#3f4662", border: "none", backgroundColor: "#fff" }}>
            <AccountCircleRounded />
          </IconButton> */}
          <Button
            onClick={handleMenuOpen}
            sx={{
              color: "#3f4662",
              border: "none",
              backgroundColor: "#fff",
              outline: "none",
              "&:focus": { outline: "none" },
              "&:active": { outline: "none", boxShadow: "none" },
            }}
          >
            <Avatar
              sx={{ bgcolor: "#E56A54", border: "none", marginRight: "10px" }}
            >
              {window.localStorage.getItem("name") === "null null"
                ? ""
                : window.localStorage.getItem("name")[0].toUpperCase()}
            </Avatar>
            <KeyboardArrowDownIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>
              <Typography>
                {localStorage.getItem("name") || "--"}
                <Typography sx={{ color: "#9e9e9e" }}>
                  {localStorage.getItem("code") || "--"}
                </Typography>
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#3f4766",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default AppNavBar;
