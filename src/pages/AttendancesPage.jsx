import { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  Button,
  TextField,
  Badge,
} from "@mui/material";

// Updated data to reflect the new "CHECK-OUT!" time
const attendanceData = [
  {
    date: "Sun, 01-Jun-2025",
    firstIn: "--",
    lastOut: "--",
    totalHours: "08:00",
    payableHours: "08:00",
    status: "Weekend",
    shift: "Day Shift - 2MH",
  },
  {
    date: "Mon, 02-Jun-2025",
    firstIn: "09:55 AM",
    lastOut: "07:14 PM",
    totalHours: "09:19",
    payableHours: "08:00",
    status: "Present",
    shift: "Day Shift - 2MH",
    lateBy: "00:55",
  },
  {
    date: "Tue, 03-Jun-2025",
    firstIn: "09:56 AM",
    lastOut: "07:07 PM",
    totalHours: "09:11",
    payableHours: "08:00",
    status: "Present",
    shift: "Day Shift - 2MH",
    lateBy: "00:26",
  },
  {
    date: "Wed, 04-Jun-2025",
    firstIn: "09:57 AM",
    lastOut: "07:42 PM",
    totalHours: "09:45",
    payableHours: "08:00",
    status: "Present",
    shift: "Day Shift - 2MH",
    lateBy: "00:27",
  },
  {
    date: "Thu, 05-Jun-2025",
    firstIn: "10:02 AM",
    lastOut: "07:03 PM",
    totalHours: "09:01",
    payableHours: "08:00",
    status: "Present",
    shift: "Day Shift - 2MH",
    lateBy: "00:32",
  },
  {
    date: "Fri, 06-Jun-2025",
    firstIn: "09:50 AM",
    lastOut: "--",
    totalHours: "02:33:54",
    payableHours: "--",
    status: "Present",
    shift: "Day Shift - 2MH",
    lateBy: "00:20",
  },
  {
    date: "Sat, 07-Jun-2025",
    firstIn: "--",
    lastOut: "--",
    totalHours: "00:00",
    payableHours: "08:00",
    status: "Weekend",
    shift: "Day Shift - 2MH",
  },
];

const timelineData = [
  { day: "Sun", date: "01", hoursWorked: "00:00", status: "Weekend" },
  {
    day: "Mon",
    date: "02",
    firstIn: "09:55 AM",
    lastOut: "07:14 PM",
    hoursWorked: "09:19",
    status: "Present",
    lateBy: "00:55",
  },
  {
    day: "Tue",
    date: "03",
    firstIn: "09:56 AM",
    lastOut: "07:07 PM",
    hoursWorked: "09:11",
    status: "Present",
    lateBy: "00:26",
  },
  {
    day: "Wed",
    date: "04",
    firstIn: "09:57 AM",
    lastOut: "07:42 PM",
    hoursWorked: "09:45",
    status: "Present",
    lateBy: "00:27",
  },
  {
    day: "Thu",
    date: "05",
    firstIn: "10:02 AM",
    lastOut: "07:03 PM",
    hoursWorked: "09:01",
    status: "Present",
    lateBy: "00:32",
  },
  {
    day: "Fri",
    date: "06",
    firstIn: "09:50 AM",
    lastOut: "--",
    hoursWorked: "02:33:54",
    status: "Present",
    lateBy: "00:20",
  },
  { day: "Sat", date: "07", hoursWorked: "00:00", status: "Weekend" },
];

const calendarData = [
  { day: 2, status: "Present", hours: "09:19 Hrs" },
  { day: 3, status: "Present", hours: "09:11 Hrs" },
  { day: 4, status: "Present", hours: "09:45 Hrs" },
  { day: 5, status: "Present", hours: "09:01 Hrs" },
  { day: 6, status: "Present", hours: "--" },
];

// Updated Timeline View Component
const TimelineView = () => {
  const timeSlots = [
    "09:30AM",
    "10:30AM",
    "11:30AM",
    "12:30PM",
    "01:30PM",
    "02:30PM",
    "03:30PM",
    "04:30PM",
    "05:30PM",
    "06:30PM",
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="subtitle1">
          Day Shift - 2MH [9:30 AM - 6:30 PM]
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            placeholder="Add notes for check-in/out"
            size="small"
            sx={{ width: "200px" }}
          />
          <Badge
            badgeContent="CHECK-OUT! 02:33:54 Hrs"
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: "#f44336",
                color: "white",
                fontSize: "12px",
                padding: "4px 8px",
                borderRadius: "4px",
              },
            }}
          />
        </Box>
      </Box>
      {timelineData.map((entry, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            bgcolor: entry.status === "Weekend" ? "#fff3e0" : "#fff",
            p: 1,
            borderBottom: "1px solid #e0e0e0",
            height: "60px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "60px",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {entry.day === "Fri" && (
              <Box
                sx={{
                  bgcolor: "#2196f3",
                  color: "white",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                Today
              </Box>
            )}
            <Typography variant="body2" sx={{ width: "30px" }}>
              {entry.day}
            </Typography>
            <Typography variant="body2" sx={{ width: "30px" }}>
              {entry.date}
            </Typography>
          </Box>
          <Box sx={{ position: "relative", flex: 1, height: "50px" }}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: "1px",
                background: entry.status === "Weekend" ? "#ffb300" : "#4caf50",
              }}
            />
            {timeSlots.map((slot, slotIndex) => (
              <Box
                key={slot}
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#bdbdbd",
                  left: `${(slotIndex / (timeSlots.length - 1)) * 100}%`,
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: "-20px",
                    fontSize: "10px",
                    color: "#666",
                    transform: "translateX(-50%)",
                  }}
                >
                  {slot}
                </Typography>
              </Box>
            ))}
            {entry.firstIn && (
              <Typography
                sx={{
                  position: "absolute",
                  bottom: "-20px",
                  fontSize: "12px",
                  color: "#666",
                  left: "0%",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {entry.firstIn}
                {entry.lateBy && (
                  <Typography component="span" color="error">
                    Late by {entry.lateBy}
                  </Typography>
                )}
              </Typography>
            )}
            {entry.lastOut && entry.lastOut !== "--" && (
              <Typography
                sx={{
                  position: "absolute",
                  bottom: "-20px",
                  fontSize: "12px",
                  color: "#666",
                  right: "5%",
                }}
              >
                {entry.lastOut}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "100px", textAlign: "right" }}>
            <Typography variant="body2" sx={{ fontSize: "12px" }}>
              Hrs worked
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "12px" }}>
              {entry.hoursWorked}
            </Typography>
          </Box>
        </Box>
      ))}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              bgcolor: "#ffeb3b",
            }}
          />
          <Typography variant="caption">6 Pay Days</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              bgcolor: "#4caf50",
            }}
          />
          <Typography variant="caption">4 Present</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              bgcolor: "#9c27b0",
            }}
          />
          <Typography variant="caption">0 On Duty</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              bgcolor: "#ff9800",
            }}
          />
          <Typography variant="caption">0 Paid leave Days</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              bgcolor: "#2196f3",
            }}
          />
          <Typography variant="caption">0 Holi-Days</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              bgcolor: "#f5f5f5",
            }}
          />
          <Typography variant="caption">2 Weekend</Typography>
        </Box>
      </Box>
    </Box>
  );
};

// Tabular View Component (unchanged)
const TabularView = () => (
  <Table sx={{ bgcolor: "#f5f7fa" }}>
    <TableHead>
      <TableRow>
        <TableCell>Date</TableCell>
        <TableCell>First In</TableCell>
        <TableCell>Last Out</TableCell>
        <TableCell>Total Hours</TableCell>
        <TableCell>Payable Hours</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Shift(s)</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {attendanceData.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.date}</TableCell>
          <TableCell>{row.firstIn}</TableCell>
          <TableCell>{row.lastOut}</TableCell>
          <TableCell>{row.totalHours}</TableCell>
          <TableCell>{row.payableHours}</TableCell>
          <TableCell>
            <Box
              sx={{
                bgcolor: row.status === "Present" ? "#4caf50" : "#ffeb3b",
                color: "white",
                borderRadius: 1,
                textAlign: "center",
                p: 0.5,
                fontSize: "12px",
              }}
            >
              {row.status}
            </Box>
          </TableCell>
          <TableCell>{row.shift}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

// Calendar View Component (unchanged)
const CalendarView = () => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: 1,
      bgcolor: "#f5f7fa",
      p: 2,
    }}
  >
    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
      <Typography
        key={day}
        variant="body2"
        sx={{ textAlign: "center", fontWeight: 500 }}
      >
        {day}
      </Typography>
    ))}
    {Array.from({ length: 35 }, (_, i) => {
      const day = i + 1;
      const data = calendarData.find((d) => d.day === day);
      return (
        <Box
          key={i}
          sx={{
            bgcolor: data ? "#e8f5e9" : "#fff3e0",
            border: day === 6 ? "2px solid #2196f3" : "1px solid #e0e0e0",
            p: 1,
            textAlign: "center",
            minHeight: 60,
          }}
        >
          <Typography variant="body2">{day <= 30 ? day : ""}</Typography>
          {data && (
            <>
              <Typography variant="caption" sx={{ color: "#4caf50" }}>
                {data.status}
              </Typography>
              <Typography variant="caption" sx={{ display: "block" }}>
                {data.hours}
              </Typography>
            </>
          )}
        </Box>
      );
    })}
  </Box>
);

// Main Component
export default function AttendancesPage() {
  const [tab, setTab] = useState(0);

  return (
    <Container sx={{ mt: 7 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">01-Jun-2025 - 07-Jun-2025</Typography>
        <Button variant="contained" color="primary">
          Regularization
        </Button>
      </Box>
      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        sx={{ mb: 2, backgroundColor: "#f5f7fa" }}
      >
        <Tab label="Timeline" sx={{ textTransform: "none", fontWeight: 500 }} />
        <Tab label="Table" sx={{ textTransform: "none", fontWeight: 500 }} />
        <Tab label="Calendar" sx={{ textTransform: "none", fontWeight: 500 }} />
      </Tabs>
      {tab === 0 && <TimelineView />}
      {tab === 1 && <TabularView />}
      {tab === 2 && <CalendarView />}
    </Container>
  );
}
