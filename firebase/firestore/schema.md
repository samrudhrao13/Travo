# Travo Firestore Schema

## Collections

### `/users/{userId}`
```json
{
  "uid": "string",
  "phone": "+91XXXXXXXXXX",
  "name": "string",
  "email": "string (optional)",
  "createdAt": "Timestamp",
  "totalTrips": 0,
  "rating": 0.0,
  "fcmToken": "string"
}
```

### `/drivers/{driverId}`
```json
{
  "uid": "string",
  "name": "string",
  "phone": "+91XXXXXXXXXX",
  "vehicleId": "string (ref to /vehicles)",
  "isOnline": false,
  "currentLocation": { "lat": 0, "lng": 0 },
  "rating": 4.8,
  "totalTrips": 0,
  "earnings": { "today": 0, "week": 0, "month": 0 },
  "fcmToken": "string",
  "isVerified": true,
  "joinedAt": "Timestamp"
}
```

### `/vehicles/{vehicleId}`
```json
{
  "type": "tt_9 | tt_12 | mini_bus | full_bus",
  "name": "Tempo Traveller 9",
  "seats": 9,
  "regNumber": "KA 04 AB 1234",
  "driverId": "string",
  "isActive": true,
  "pricePerKm": 18,
  "basePrice": 250,
  "features": ["AC", "GPS"],
  "fuelLevel": 72
}
```

### `/bookings/{bookingId}`
```json
{
  "id": "string",
  "passengerId": "string",
  "driverId": "string | null",
  "vehicleId": "string",
  "vehicleType": "tt_9 | tt_12 | mini_bus | full_bus",
  "pickup": {
    "address": "Indiranagar, Bangalore",
    "lat": 12.9783,
    "lng": 77.6408
  },
  "drop": {
    "address": "Whitefield, Bangalore",
    "lat": 12.9698,
    "lng": 77.7500
  },
  "rideType": "now | schedule",
  "scheduledAt": "Timestamp | null",
  "status": "pending | driver_assigned | in_progress | completed | cancelled",
  "fare": {
    "subtotal": 800,
    "gst": 40,
    "total": 840,
    "distanceKm": 14
  },
  "paymentMethod": "cash | upi | card",
  "paymentStatus": "pending | paid",
  "rating": 0,
  "createdAt": "Timestamp",
  "completedAt": "Timestamp | null"
}
```

### `/reviews/{reviewId}`
```json
{
  "bookingId": "string",
  "passengerId": "string",
  "driverId": "string",
  "rating": 5,
  "comment": "string (optional)",
  "createdAt": "Timestamp"
}
```
