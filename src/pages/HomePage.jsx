import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Divider,
  Tabs,
  Tab,
  Container,
  Grid,
} from "@mui/material";
import { TimelineDot } from "@mui/lab";

export default function HomePage() {
  const [tabValue, setTabValue] = useState(5); // Default to "Profile" tab
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [timer, setTimer] = useState(0);
  const [checkInTime, setCheckInTime] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  // Dynamic work schedule based on current week
  const currentDate = new Date("2025-06-05T18:19:00+05:30"); // Current date and time: 06:19 PM IST on June 05, 2025
  const startOfWeek = new Date(currentDate);
  const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  startOfWeek.setDate(currentDate.getDate() - dayOfWeek); // Set to Sunday of the current week

  const scheduleData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    const dayStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
    });
    const isWeekend = index === 0 || index === 6;
    const isToday = date.toDateString() === currentDate.toDateString();
    let status = "";
    let hours = "";
    let color = "grey";

    if (isWeekend) {
      status = "Weekend";
    } else if (isToday) {
      if (isCheckedIn && checkInTime) {
        status = "Present";
        const elapsed = Math.floor((Date.now() - checkInTime) / 1000);
        const hoursElapsed = Math.floor(elapsed / 3600);
        const minutesElapsed = Math.floor((elapsed % 3600) / 60);
        const secondsElapsed = elapsed % 60;
        hours = `${hoursElapsed.toString().padStart(2, "0")}:${minutesElapsed.toString().padStart(2, "0")}:${secondsElapsed.toString().padStart(2, "0")} Hrs`;
        color = "blue";
      } else if (checkInTime) {
        status = "Present";
        const elapsed = Math.floor((timer - checkInTime) / 1000);
        const hoursElapsed = Math.floor(elapsed / 3600);
        const minutesElapsed = Math.floor((elapsed % 3600) / 60);
        const secondsElapsed = elapsed % 60;
        hours = `${hoursElapsed.toString().padStart(2, "0")}:${minutesElapsed.toString().padStart(2, "0")}:${secondsElapsed.toString().padStart(2, "0")} Hrs`;
        color = "green";
      }
    } else if (date < currentDate && !isWeekend) {
      status = "Present";
      hours = "09:00 Hrs"; // Mock data for past days
      color = "green";
    }

    return { day: dayStr, status, hours, color };
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setCheckInTime(Date.now());
    const id = setInterval(() => {
      setTimer(Date.now());
    }, 1000);
    setIntervalId(id);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    clearInterval(intervalId);
    setIntervalId(null);
    setTimer(checkInTime ? Date.now() : 0);
  };

  const getGreeting = () => {
    const hours = currentDate.getHours();
    if (hours >= 0 && hours < 12) return "Good Morning";
    if (hours >= 12 && hours < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const DashboardContent = () => (
    <>
      {/* Greeting */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src="https://via.placeholder.com/40x40.png?text=M"
            alt="Rishu Logo"
            style={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography variant="h5" sx={{ fontSize: "1.5rem" }}>
              {getGreeting()}, Rishu Kumar
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Have a productive day!
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e3f2fd",
            borderRadius: 2,
            px: 2,
            py: 1,
          }}
        >
          <Typography variant="body1">Sunny</Typography>
          <Box
            sx={{
              ml: 1,
              width: 24,
              height: 24,
              backgroundColor: "#ffca28",
              borderRadius: "50%",
            }}
          />
        </Box>
      </Box>

      {/* Work Schedule */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Box
            sx={{
              width: 24,
              height: 24,
              backgroundColor: "#e0e0e0",
              borderRadius: "50%",
            }}
          />
          <Typography variant="h6" gutterBottom>
            Work Schedule
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {`${startOfWeek.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })} - ${new Date(startOfWeek).setDate(startOfWeek.getDate() + 6) && new Date(startOfWeek).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}`}
        </Typography>
        <Box sx={{ backgroundColor: "#ffebee", p: 1, borderRadius: 1, mb: 2 }}>
          <Typography variant="body2" color="error">
            Day Shift: 2-MH | 9:30 AM - 6:30 PM
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
            mb: 2,
          }}
        >
          {scheduleData.map((item, index) => (
            <Box key={index} sx={{ textAlign: "center", flex: 1 }}>
              {index > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: `calc(${index * 14.28}% - 1px)`,
                    width: "14.28%",
                    height: 2,
                    backgroundColor: "#e0e0e0",
                  }}
                />
              )}
              <TimelineDot
                sx={{ backgroundColor: item.color, mx: "auto", mb: 1 }}
              />
              <Typography variant="body2">{item.day}</Typography>
              {item.status && (
                <Typography
                  variant="body2"
                  color={
                    item.color === "green" || item.color === "blue"
                      ? item.color
                      : "textSecondary"
                  }
                >
                  {item.status}
                </Typography>
              )}
              {item.hours && (
                <Typography variant="body2" color="textSecondary">
                  {item.hours}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Dummy Text Section with Name */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Dummy Section
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Created by: Rishu Kumar
        </Typography>
      </Paper>

      {/* Reminder */}
      <Box sx={{ backgroundColor: "#fff3e0", p: 2, borderRadius: 2 }}>
        <Typography variant="body1">
          You are yet to submit your time logs today!
        </Typography>
      </Box>
    </>
  );

  const ProfileContent = () => (
    <>
      {/* Work Information */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Work Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Company
            </Typography>
            <Typography variant="body1">Rishu Org</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              My Org Role
            </Typography>
            <Typography variant="body1">Team Member</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Department
            </Typography>
            <Typography variant="body1">-</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Employee Type
            </Typography>
            <Typography variant="body1">FULL TIME</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Location
            </Typography>
            <Typography variant="body1">-</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Employee Status
            </Typography>
            <Typography variant="body1">Active</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Designation
            </Typography>
            <Typography variant="body1">-</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Source of Hire
            </Typography>
            <Typography variant="body1">-</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Date of Joining
            </Typography>
            <Typography variant="body1">09-Nov-2023</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Current Experience
            </Typography>
            <Typography variant="body1">1 year(s) 7 month(s)</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Total Experience
            </Typography>
            <Typography variant="body1">1 year(s) 7 month(s)</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Hierarchy Information */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Hierarchy Information
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Reporting Manager
        </Typography>
        <Typography variant="body1">-</Typography>
      </Paper>
    </>
  );

  const formatTimer = () => {
    if (!checkInTime) return "00 : 00 : 00";
    const elapsed = Math.floor((timer - checkInTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    return `${hours.toString().padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Container sx={{ mt: 7 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#f5f7fa",
        }}
      >
        {/* Header with Tabs */}
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 150,
            borderBottom: "1px solid #e0e0e0",
            mb: 2,
          }}
        />
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: "#fff",
            px: 2,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="dashboard tabs"
          >
            <Tab label="Overview" />
            <Tab
              label="Dashboard"
              sx={
                tabValue === 1 ? { color: "#1976d2", fontWeight: "bold" } : {}
              }
            />
            <Tab label="Calendar" />
            <Tab label="Activities" />
            <Tab label="Feeds" />
            <Tab
              label="Profile"
              sx={
                tabValue === 5 ? { color: "#1976d2", fontWeight: "bold" } : {}
              }
            />
            <Tab label="Approvals" />
            <Tab label="Leave" />
            <Tab label="Attendance" />
            <Tab label="Time Logs" />
            <Tab label="Timesheets" />
            <Tab label="Jobs" />
            <Tab label="Files" />
            <Tab label="Related Data" />
          </Tabs>
        </Box>

        {/* Main Content */}
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          {/* Sidebar */}
          <Box
            sx={{
              width: 250,
              backgroundColor: "#fff",
              p: 2,
              borderRight: "1px solid #e0e0e0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Avatar
                sx={{ width: 56, height: 56, mb: 1, bgcolor: "#e0e0e0" }}
              />
              <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                MH-BN0107 - Rishu Kumar
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  In
                </Typography>
                <Typography variant="body2" color="green">
                  {formatTimer()}
                </Typography>
              </Box>
              {isCheckedIn ? (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2, width: "100%", textTransform: "none" }}
                  onClick={handleCheckOut}
                >
                  Check-out
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, width: "100%", textTransform: "none" }}
                  onClick={handleCheckIn}
                >
                  Check-in
                </Button>
              )}
            </Box>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>
                Department Members
              </Typography>
              <Typography variant="body2" color="textSecondary">
                No Data Found
              </Typography>
            </Box>
          </Box>

          {/* Main Content Area */}
          <Box sx={{ flexGrow: 1, p: 3 }}>
            {tabValue === 1 && <DashboardContent />}
            {tabValue === 5 && <ProfileContent />}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
