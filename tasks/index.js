const express = require("express");
const app = express();

const port = 3000;

const halls = [
    {
        roomid: 1,
        hallName: 'hall P',
        facilities: "single bed with AC",
        price: 200,
        seatsAvailable: 50,
        bookings: [
            {
                bookingDate: new Date('2023-12-23'),
                organizer: "John Jacob"
            }
        ]
    },
    {
        roomid: 2,
        hallName: 'hall C',
        facilities: "single bed without AC",
        price: 200,
        seatsAvailable: 50,
        bookings: []
    },
    {
        roomid: 3,
        hallName: 'Hall A',
        facilities: "Double bed with AC",
        price: 350,
        seatsAvailable: 100,
        bookings: [
            {
                bookingDate: new Date('2023-12-25'),
                organizer: 'John Doe'
            }
        ]
    }
];

app.get("/", respondRoom);

app.get("/halls", (req, res) => {
    res.json(halls);
});

app.use(express.json());

function respondRoom(req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to creeta  booking APP");
}

app.post("/book-hall", (req, res) => {
    const { hallName, bookingDate, organizer } = req.body;

    const hall = halls.find(hall => hall.hallName === hallName);

    if (!hall) {
        return res.status(404).json({ error: "Hall not found" });
    }

    const existingDate = hall.bookings.find(
        booking => booking.bookingDate.toDateString() === new Date(bookingDate).toDateString()
    );

    if (existingDate) {
        return res.status(400).json({ error: "Booking date already exists for this hall" });
    }

    hall.bookings.push({
        bookingDate: new Date(bookingDate),
        organizer
    });

    res.status(201).json({ message: "Hall booked successfully", hall });
});

app.get("/allbookings", (req, res) => {
    const hallsWithBookings = halls.map(hall => {
        const { roomid, hallName, price, seatsAvailable, bookings } = hall;
        return {
            roomid,
            hallName,
            price,
            seatsAvailable,
            bookings: bookings.map(booking => ({
                bookingDate: booking.bookingDate,
                organizer: booking.organizer
            }))
        };
    });

    res.json(hallsWithBookings);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
   





