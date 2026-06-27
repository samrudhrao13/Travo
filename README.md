# Travo — Uber for Tempo Travelers & Private Buses

Travo is a mobile-first booking platform for Tempo Travelers (TT) and private buses in India. Skip the travel agencies — book a verified vehicle in 15–20 minutes or schedule ahead for any date.

## What Travo Does

- **Quick Booking** — TT or bus at your location in 15–20 minutes
- **Schedule Trips** — Plan rides for specific dates and time slots
- **City & Intercity** — Works for local group travel and outstation journeys
- **No Middlemen** — Direct connection between passengers and verified drivers
- **Live Tracking** — Real-time driver location and trip status
- **Flexible Payment** — Cash, UPI, or card

## Apps in This Monorepo

| App | Tech | Description |
|-----|------|-------------|
| `passenger-app/` | React Native (Expo) | Passenger booking, tracking & history |
| `driver-app/` | React Native (Expo) | Driver dashboard, rides & earnings |
| `admin-dashboard/` | React + Vite + Tailwind | Fleet, bookings, revenue analytics |

## Tech Stack

- **Mobile** — React Native via Expo SDK 54, React Navigation v6
- **Backend** — Firebase (Auth, Firestore, Storage)
- **Admin** — React 18, Vite, Tailwind CSS, Recharts
- **Auth** — Firebase Phone OTP (demo mode available for testing)

## Project Structure

```
Travo/
├── passenger-app/        # Expo React Native — passenger
│   ├── src/
│   │   ├── navigation/   # Stack + tab navigators
│   │   ├── screens/      # All screens (auth, booking, tracking, history)
│   │   ├── services/     # Firebase service layer
│   │   └── theme/        # Design tokens (colors, typography, spacing)
│   ├── assets/           # Icons, splash, adaptive icon
│   └── App.tsx           # Root component with demo mode flag
│
├── driver-app/           # Expo React Native — driver
│   └── src/
│       └── screens/      # Dashboard, trips, earnings
│
├── admin-dashboard/      # React + Vite web app
│   └── src/
│       └── pages/        # Dashboard, bookings, drivers, fleet, revenue
│
└── firebase/             # Firestore schema & security rules
```

## Vehicle Types & Pricing

| Vehicle | Seats | Base Fare | Per KM |
|---------|-------|-----------|--------|
| TT 9-seater | 9 | ₹250 | ₹18 |
| TT 12-seater | 12 | ₹320 | ₹22 |
| Mini Bus | 20 | ₹800 | ₹38 |
| Full Bus | 45 | ₹1,800 | ₹65 |

All fares include 5% GST.

## Booking Flow

```
Home → Choose TT / Bus
     → Select Vehicle Size
     → Enter Pickup & Drop
     → Book Now or Schedule
     → Fare Breakdown + Payment Method
     → Confirm → Driver Assigned
     → Live Tracking → Trip Complete → Rate
```

## Getting Started

### Prerequisites

- Node.js 18+
- Expo Go app on Android or iOS
- Firebase project (for production) — see `SETUP.md`

### Passenger App (Demo Mode — no Firebase needed)

```bash
cd passenger-app
npm install --legacy-peer-deps
npx expo start --clear
```

Scan the QR code in Expo Go. In demo mode:
- Enter **any 10-digit** phone number
- Enter **any 6-digit** OTP
- Full booking flow is interactive with mock data

> To enable real Firebase auth: add your config to `src/services/firebase.ts` and set `DEMO_MODE = false` in `App.tsx`.

### Driver App

```bash
cd driver-app
npm install --legacy-peer-deps
npx expo start --clear
```

### Admin Dashboard

```bash
cd admin-dashboard
npm install --legacy-peer-deps
npm run dev
```

Open `http://localhost:5173` — login with `admin@travo.app` / `travo123`.

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#F97316` | Orange — brand, CTAs |
| Secondary | `#1E3A5F` | Navy — headers, bus type |
| Accent | `#10B981` | Green — success, pickup |
| Danger | `#EF4444` | Red — cancel, drop |

## Firebase Schema

Collections: `users`, `drivers`, `vehicles`, `bookings`, `reviews`

See `firebase/firestore/schema.md` for full field definitions and `firebase/firestore.rules` for security rules.

## Deployment Roadmap

- [ ] Add real Firebase config (see `SETUP.md`)
- [ ] Enable Google Maps API key for live tracking
- [ ] EAS Build → Google Play Store (₹2,100 one-time fee)
- [ ] EAS Build → Apple App Store (₹8,300/year)
- [ ] Admin dashboard → Vercel / Firebase Hosting

## License

MIT
