# Razorpay Setup Guide

## Issue Fixed
The Razorpay integration was failing because:
1. Missing environment variables for Razorpay keys in the backend
2. Hardcoded placeholder key in the frontend

## Steps to Fix

### 1. Get Razorpay Credentials
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign in to your account (or create one if you don't have it)
3. Go to Settings → API Keys
4. Generate or copy your:
   - **Key ID** (starts with `rzp_test_` for test mode or `rzp_live_` for live mode)
   - **Key Secret** (keep this secure)

### 2. Configure Backend Environment Variables
1. Open `backend/.env` file
2. Replace the placeholder values:
   ```
   RAZORPAY_KEY_ID=your_actual_razorpay_key_id_here
   RAZORPAY_KEY_SECRET=your_actual_razorpay_key_secret_here
   ```

### 3. Start the Backend Server
```bash
cd backend
npm install
node server.js
```

### 4. Start the Frontend
```bash
npm install
ng serve
```

## Testing
- Use test mode credentials for development
- For test payments, use these test card details:
  - Card Number: 4111 1111 1111 1111
  - CVV: Any 3 digits
  - Expiry: Any future date

## Security Notes
- Never commit real API keys to version control
- The `.env` file is already in `.gitignore`
- Only the Key ID is sent to frontend (safe to expose)
- Key Secret stays secure on the backend

## Troubleshooting
- Ensure backend server is running on port 3000
- Check browser console for any JavaScript errors
- Verify Razorpay keys are correctly set in `.env`
- Make sure your Razorpay account is activated