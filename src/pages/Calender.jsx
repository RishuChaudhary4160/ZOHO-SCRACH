import { useState } from "react";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const CalendarTab = ({ currentDate, scheduleData }) => {
  console.log("currentDate:", currentDate);
  console.log("scheduleData:", scheduleData);

  const [selectedDate, setSelectedDate] = useState(() => {
    const date = new Date(currentDate);
    console.log("Parsed selectedDate:", date);
    return isNaN(date.getTime()) ? new Date() : date;
  });

  const handlePrevMonth = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month + 1, 0);
    return isNaN(date.getTime()) ? 0 : date.getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    const date = new Date(year, month, 1);
    return isNaN(date.getTime()) ? 0 : date.getDay();
  };

  const renderCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    console.log(
      "Year:",
      year,
      "Month:",
      month,
      "Days:",
      daysInMonth,
      "First Day:",
      firstDay
    );
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <Box
          key={`empty-${i}`}
          sx={{
            border: "1px solid #e0e0e0",
            height: 100,
            backgroundColor: "#fff3e0",
          }}
        />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split("T")[0];
      const isToday = (() => {
        const currDate = new Date(currentDate);
        return isNaN(currDate.getTime())
          ? false
          : dateString === currDate.toISOString().split("T")[0];
      })();
      const scheduleDay = day < 10 ? `0${day}` : day.toString();
      const scheduleMonth =
        month + 1 < 10 ? `0${month + 1}` : (month + 1).toString();
      const scheduleItem =
        scheduleData?.find((item) => {
          if (!item?.day) return false;
          const [, dayStr] = item.day.split(" ");
          if (!dayStr || isNaN(parseInt(dayStr))) return false;
          const itemDate = new Date(`${year}-${scheduleMonth}-${dayStr}`);
          return isNaN(itemDate.getTime())
            ? false
            : itemDate.toISOString().split("T")[0] === dateString;
        }) || null;

      days.push(
        <Box
          key={day}
          sx={{
            border: "1px solid #e0e0e0",
            height: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            backgroundColor: isToday ? "#e3f2fd" : "#fff",
          }}
        >
          <Typography variant="body2">{day}</Typography>
          {scheduleItem?.status && (
            <>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor:
                    scheduleItem.color === "green" ? "#e8f5e9" : "transparent",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  mt: 1,
                }}
              >
                {scheduleItem.status}
              </Typography>
              {scheduleItem.hours && (
                <Typography variant="body2" color="textSecondary">
                  {scheduleItem.hours}
                </Typography>
              )}
            </>
          )}
          {isToday && (
            <Box
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                width: 20,
                height: 20,
                backgroundColor: "#1976d2",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "0.75rem",
              }}
            >
              {day}
            </Box>
          )}
        </Box>
      );
    }

    return days;
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton onClick={handlePrevMonth} data-testid="prev-month-button">
          <ArrowBackIos />
        </IconButton>
        <Typography variant="h6" data-testid="month-year">
          {selectedDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </Typography>
        <IconButton onClick={handleNextMonth} data-testid="next-month-button">
          <ArrowForwardIos />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          borderBottom: "1px solid #e0e0e0",
          pb: 1,
          mb: 1,
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Typography key={day} variant="body2" sx={{ fontWeight: "bold" }}>
            {day}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "1px",
          backgroundColor: "#e0e0e0",
          minHeight: "400px",
        }}
      >
        {renderCalendar()}
      </Box>
    </Paper>
  );
};

export default CalendarTab;
