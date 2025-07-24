# Razorpay Integration Setup Guide

## Overview
This application now includes Razorpay payment integration for secure online payments.

## Setup Instructions

### 1. Create Razorpay Account
1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up for a new account or log in to your existing account
3. Complete the KYC verification process

### 2. Get API Keys
1. Go to Settings > API Keys in your Razorpay dashboard
2. Generate API keys for Test Mode
3. Copy the **Key ID** (starts with `rzp_test_`)

### 3. Update Environment Configuration
Replace the demo key in the environment files:

**For Development (src/environments/environment.ts):**
```typescript
export const environment = {
  production: false,
  razorpay: {
    key: 'rzp_test_YOUR_ACTUAL_TEST_KEY', // Replace with your test key
    currency: 'INR',
    name: 'TurfBooking',
    description: 'Turf Booking Payment',
    image: '/assets/logo.png'
  }
};
```

**For Production (src/environments/environment.prod.ts):**
```typescript
export const environment = {
  production: true,
  razorpay: {
    key: 'rzp_live_YOUR_ACTUAL_LIVE_KEY', // Replace with your live key
    currency: 'INR',
    name: 'TurfBooking',
    description: 'Turf Booking Payment',
    image: '/assets/logo.png'
  }
};
```

### 4. Test Payment
1. Use test card numbers provided by Razorpay for testing
2. Test cards:
   - **Success**: 4111 1111 1111 1111
   - **Failure**: 4111 1111 1111 1112
   - Any future expiry date and CVV

### 5. Webhook Setup (Optional)
For production, set up webhooks to handle payment confirmations:
1. Go to Settings > Webhooks in Razorpay dashboard
2. Add your server endpoint for payment confirmations
3. Select relevant events (payment.captured, payment.failed, etc.)

## Security Notes
- Never expose your Key Secret in frontend code
- Always verify payments on your backend server
- Use webhooks for reliable payment status updates
- The current implementation uses mock verification - implement proper server-side verification for production

## Troubleshooting

### Common Issues:
1. **"Razorpay is not defined"**: Ensure the Razorpay script is loaded in index.html
2. **Payment not opening**: Check if the API key is correct and active
3. **Network errors**: Verify internet connection and Razorpay service status

### Support:
- Razorpay Documentation: https://razorpay.com/docs/
- Support: https://razorpay.com/support/

## Features Implemented:
- ✅ Razorpay checkout integration
- ✅ Payment status tracking
- ✅ Error handling and retry functionality
- ✅ Responsive payment UI
- ✅ Dark theme support
- ⚠️ Mock payment verification (implement server-side verification for production)

## Next Steps for Production:
1. Implement server-side payment verification
2. Add webhook handling
3. Set up proper error logging
4. Add payment receipt generation
5. Implement refund functionality