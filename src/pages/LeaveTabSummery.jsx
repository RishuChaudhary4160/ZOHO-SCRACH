import { Box, Typography, Paper } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const LeaveTabSummary = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        mb: 2,
        backgroundColor: "#f5faff",
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Box sx={{ mr: 2 }}>
        <EventAvailableIcon sx={{ fontSize: 40, color: "#d1c4e9" }} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          Privileged Leave
        </Typography>
        <Box sx={{ display: "flex", gap: 4, mt: 1 }}>
          <Box>
            <Typography variant="body2" sx={{ color: "#4caf50" }}>
              Available
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              3 days
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: "#f44336" }}>
              Booked
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              0 day
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default LeaveTabSummary;
