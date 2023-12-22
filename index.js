// node js tasks-1: web developer tasks

const express = require('express');
const app = express();
app.use(express.json());

// Sample data for booked halls
let bookedHalls = [{
    id: 1,
    hallName: 'Hall A',
    pricePerHour: 50,
    seatsAvailable: 100,
    bookings: [
      {
        bookingDate: new Date('2023-12-25'),
        organizer: 'John Doe'
      }
    ]
  }
];

// Endpoint to get all booked halls
app.get('/halls', (req, res) => {
  res.json(bookedHalls);
});

// Endpoint to book a hall
app.post('/book-hall', (req, res) => {
  const { hallName, bookingDate, organizer } = req.body;

  // Check if the hall is available on the requested date
  const isHallAvailable = bookedHalls.some(
    hall =>
      hall.hallName === hallName &&
      hall.bookingDate.toDateString() === new Date(bookingDate).toDateString()
  );

  if (isHallAvailable) {
    return res.status(400).json({ error: 'Hall is already booked on that date' });
  }

  // If hall is available, book it
  const newBooking = {
    hallName,
    bookingDate: new Date(bookingDate),
    organizer
  };
  bookedHalls.push(newBooking);
  res.status(201).json(newBooking);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
