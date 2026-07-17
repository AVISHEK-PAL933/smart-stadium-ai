# Deployment Guide

The application is built on Expo and can be deployed to web, iOS, and Android seamlessly.

## Prerequisites
- Node.js (v18+)
- EAS CLI (Expo Application Services)
- An Apple Developer account (for iOS builds)
- A Google Play Developer account (for Android builds)

## Build Process

### 1. Web Deployment
```bash
# Export static web files
npx expo export -p web

# The generated /dist directory can be deployed to Vercel, Netlify, or AWS S3.
```

### 2. iOS Build
```bash
eas build --platform ios
```

### 3. Android Build
```bash
eas build --platform android
```

## Environment Variables
Create a `.env` file for production builds:
```
EXPO_PUBLIC_API_URL=https://api.smartstadium.com
EXPO_PUBLIC_WS_URL=wss://ws.smartstadium.com
```
