import { Box, Typography, Paper } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

const WorkSchedule = () => {
  // Current date: Friday, June 06, 2025
  const currentDate = new Date("2025-06-06T12:04:00+05:30");

  // Find the start of the week (Sunday)
  const startOfWeek = new Date(currentDate);
  const dayOfWeek = currentDate.getDay(); // 5 (Friday)
  startOfWeek.setDate(currentDate.getDate() - dayOfWeek); // Move back to Sunday

  // Calculate end of the week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  // Generate days of the week with dates
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return {
      day: daysOfWeek[i],
      date: date.getDate().toString().padStart(2, "0"),
      fullDate: date.toISOString().split("T")[0],
    };
  });

  // Hardcoded schedule data based on the image
  const scheduleData = [
    { day: "Sun 01", status: "Weekend", hours: "", color: "grey" },
    { day: "Mon 02", status: "Present", hours: "09:19 Hrs", color: "green" },
    { day: "Tue 03", status: "Present", hours: "09:11 Hrs", color: "green" },
    { day: "Wed 04", status: "Present", hours: "09:45 Hrs", color: "green" },
    { day: "Thu 05", status: "Present", hours: "09:01 Hrs", color: "green" },
    { day: "Fri 06", status: "Present", hours: "02:12 Hrs", color: "blue" },
    { day: "Sat 07", status: "Weekend", hours: "", color: "grey" },
  ];

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <WorkIcon sx={{ fontSize: 24, color: "#bdbdbd" }} />
        <Typography variant="h6">Work Schedule</Typography>
      </Box>

      {/* Date Range */}
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {`${startOfWeek.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })} - ${endOfWeek.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}`}
      </Typography>

      {/* Shift Info */}
      <Box sx={{ backgroundColor: "#ffebee", p: 1, borderRadius: 1, mb: 2 }}>
        <Typography variant="body2" color="error">
          Day Shift: 2-MH | 9:30 AM - 6:30 PM
        </Typography>
      </Box>

      {/* Timeline */}
      <Box sx={{ position: "relative", mb: 2 }}>
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            left: "7.14%", // Start from the center of the first dot
            width: "85.72%", // Span across 6 segments (100% - 7.14% on each side)
            height: "2px",
            borderTop: "2px dashed #e0e0e0",
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {weekDays.map((dayInfo, index) => {
            const isToday =
              dayInfo.fullDate === currentDate.toISOString().split("T")[0];
            const data = scheduleData[index];

            return (
              <Box key={index} sx={{ textAlign: "center", flex: 1 }}>
                {/* Dot */}
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    backgroundColor:
                      data.color === "grey" ? "#bdbdbd" : data.color,
                    border: isToday ? "2px solid #1976d2" : "none",
                    borderRadius: isToday ? "0" : "50%",
                    transform: isToday ? "rotate(45deg)" : "none",
                    mx: "auto",
                    mb: 1,
                  }}
                />

                {/* Day and Date */}
                <Typography variant="body2">
                  {dayInfo.day} {dayInfo.date}
                </Typography>

                {/* Status */}
                {data.status && (
                  <Typography
                    variant="body2"
                    color={
                      data.color === "green"
                        ? "#4caf50"
                        : data.color === "blue"
                          ? "#1976d2"
                          : "#666"
                    }
                  >
                    {data.status}
                  </Typography>
                )}

                {/* Hours */}
                {data.hours && (
                  <Typography variant="body2" color="textSecondary">
                    {data.hours}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
};

export default WorkSchedule;
