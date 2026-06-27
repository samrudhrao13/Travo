# Travo — Setup Guide

## Project Structure

```
Travo/
├── passenger-app/        # Passenger-facing Expo React Native app
├── driver-app/           # Driver partner Expo React Native app
├── admin-dashboard/      # Admin web dashboard (React + Vite + Tailwind)
└── firebase/             # Firestore rules & schema docs
```

---

## Step 1: Create a Firebase Project

1. Go to **https://console.firebase.google.com**
2. Create a new project → name it `travo-app`
3. Enable **Authentication** → Phone number sign-in
4. Enable **Firestore Database** → Start in production mode
5. Register two apps:
   - Android/iOS app for passengers → App ID: `com.travo.passenger`
   - Android/iOS app for drivers → App ID: `com.travo.driver`
6. Copy each app's Firebase config object

---

## Step 2: Add Firebase Config

### Passenger App
Edit `passenger-app/src/services/firebase.ts`:
```ts
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "travo-app.firebaseapp.com",
  projectId: "travo-app",
  storageBucket: "travo-app.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_PASSENGER_APP_ID",
};
```

### Driver App
Edit `driver-app/src/services/firebase.ts` the same way.

---

## Step 3: Install Dependencies

### Admin Dashboard (Web)
```bash
cd admin-dashboard
npm install
npm run dev
# Opens at http://localhost:3001
# Login: admin@travo.app / travo123
```

### Passenger App (Mobile)
```bash
cd passenger-app
npm install
npx expo start
# Scan QR with Expo Go app
```

### Driver App (Mobile)
```bash
cd driver-app
npm install
npx expo start
# Scan QR with Expo Go app
```

---

## Step 4: Set Up Google Maps (for live tracking)

1. Get a **Google Maps API key** from Google Cloud Console
2. Enable: Maps SDK for Android, Maps SDK for iOS, Directions API
3. Add key to `app.json`:
```json
"android": {
  "config": {
    "googleMaps": { "apiKey": "YOUR_KEY" }
  }
}
```

---

## App Features Summary

### Passenger App
| Feature | Screen |
|---------|--------|
| Phone OTP Login | PhoneAuth → OTP |
| Onboarding | Onboarding (4 slides) |
| Book TT or Bus | Home → VehicleSelect |
| Pick Pickup & Drop | Location |
| Book Now (15-20 min) | RideType → Fare → Confirm |
| Schedule a Trip | Schedule → Fare → Confirm |
| Live Tracking | Waiting → Tracking |
| Rate Driver | TripComplete |
| Trip History | History tab |
| Profile & Logout | Profile tab |

### Driver App
| Feature | Screen |
|---------|--------|
| Phone OTP Login | Auth |
| Online/Offline Toggle | Dashboard |
| Ride Request Popup | Dashboard (auto-slides in) |
| Accept/Decline Rides | Dashboard |
| Trip History | Trips tab |
| Earnings & Payouts | Earnings tab |

### Admin Dashboard
| Page | URL |
|------|-----|
| Dashboard Overview | `/` |
| All Bookings | `/bookings` |
| Driver Management | `/drivers` |
| Fleet Management | `/fleet` |
| Revenue & Analytics | `/revenue` |

---

## Payments (Production)

Integrate **Razorpay** (India-focused) for UPI, card, and wallet payments:
```bash
npm install react-native-razorpay
```

---

## Deployment

- **Mobile apps**: Build with `npx expo build` or **EAS Build** (`eas build`)
- **Admin dashboard**: Deploy to Vercel / Firebase Hosting (`npm run build`)
- **Firebase Functions**: Deploy notifications and fare calculation logic
