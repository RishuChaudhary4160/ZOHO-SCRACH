import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const AttendanceTabLog = () => {
  // Current date: Friday, June 06, 2025
  const currentDate = new Date("2025-06-06T11:59:00+05:30");

  // Find the start of the week (Sunday)
  const startOfWeek = new Date(currentDate);
  const dayOfWeek = currentDate.getDay(); // 5 (Friday)
  startOfWeek.setDate(currentDate.getDate() - dayOfWeek); // Move back to Sunday

  // Generate dates for the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return {
      day: daysOfWeek[i],
      date: date.getDate().toString().padStart(2, "0"),
      fullDate: date.toISOString().split("T")[0],
    };
  });

  // Hardcoded attendance data based on the image
  const attendanceData = [
    {
      checkIn: "No check-in",
      checkOut: "No check-out",
      hours: "",
      status: "No check-in",
    }, // Sun
    {
      checkIn: "09:55 AM",
      checkOut: "07:14 PM",
      hours: "09:19",
      status: "Present",
    }, // Mon
    {
      checkIn: "09:56 AM",
      checkOut: "07:07 PM",
      hours: "09:11",
      status: "Present",
    }, // Tue
    {
      checkIn: "09:57 AM",
      checkOut: "07:42 PM",
      hours: "09:45",
      status: "Present",
    }, // Wed
    {
      checkIn: "10:02 AM",
      checkOut: "07:03 PM",
      hours: "09:01",
      status: "Present",
    }, // Thu
    {
      checkIn: "09:50 AM",
      checkOut: "No check-out",
      hours: "02:08 / 8Hrs",
      status: "No check-in",
    }, // Fri
    { checkIn: "Weekend", checkOut: "", hours: "", status: "Weekend" }, // Sat
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "#666" }}>
        This Week
      </Typography>
      {weekDates.map((dayInfo, index) => {
        const isToday =
          dayInfo.fullDate === currentDate.toISOString().split("T")[0];
        const data = attendanceData[index];

        return (
          <Paper
            key={dayInfo.day}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              mb: 1,
              backgroundColor: isToday ? "#e3f2fd" : "#fff",
              border: isToday ? "1px solid #1976d2" : "1px solid #e0e0e0",
              borderRadius: 1,
            }}
          >
            {/* Day and Date */}
            <Box sx={{ width: 60, textAlign: "center" }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {dayInfo.day}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {dayInfo.date}
              </Typography>
            </Box>

            {/* Shift Info */}
            <Box
              sx={{
                flexGrow: 1,
                p: 1,
                backgroundColor: "#ffebee",
                borderRadius: 1,
                mx: 1,
              }}
            >
              <Typography variant="body2" sx={{ color: "#d32f2f" }}>
                Day Shift: 9:30 AM - 6:30 PM
              </Typography>
            </Box>

            {/* Attendance Details */}
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {data.checkIn} - {data.checkOut}{" "}
                {data.hours ? `• ${data.hours}` : ""}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color:
                    data.status === "Present"
                      ? "#4caf50"
                      : data.status === "Weekend"
                        ? "#666"
                        : "#ffb300",
                  fontWeight: "medium",
                }}
              >
                {data.status}
              </Typography>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};

export default AttendanceTabLog;
