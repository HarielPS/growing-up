"use client"
import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, DateCalendar, DayCalendarSkeleton } from '@mui/x-date-pickers';
import { Box, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';

// Function to mimic an API call for fetching highlighted days
const fakeFetch = (date, { signal }) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));
      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
};

const BasicDateCalendar = ({ events }) => {
  const requestAbortController = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);

  const fetchHighlightedDays = (date) => {
    const daysToHighlight = events.map(event => dayjs(event.date).date());
    setHighlightedDays(daysToHighlight);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHighlightedDays(dayjs());
    return () => requestAbortController.current?.abort();
  }, [events]);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleDateClick = (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    const eventsForDate = events.filter(event => event.date === formattedDate);
    setEventDetails(eventsForDate);
    setSelectedDate(formattedDate);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEventDetails([]);
  };

  const ServerDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isSelected ? '🔔' : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          onClick={() => handleDateClick(day)}
        />
      </Badge>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onChange={handleDateClick}
        onMonthChange={handleMonthChange}
        loading={isLoading}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {eventDetails.length > 0 ? (
            eventDetails.map((event, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">{event.name}</Typography>
                <Typography variant="body1">Amount: ${event.amount}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1">No events for this date.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default BasicDateCalendar;
