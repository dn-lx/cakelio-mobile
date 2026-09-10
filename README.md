# Cakelio Mobile

Shared Android and iOS application for **Cakelio**.

## Stack
- Expo SDK 57 / React Native 0.86
- Expo Router + TypeScript
- Supabase Auth/Postgres/Storage
- AsyncStorage-backed native auth sessions
- EAS Build for Android/iOS

## Supabase
This app connects only to the dedicated Cakelio project (`wbqnctrvxohxwiaignhg`). Copy `.env.example` to `.env.local` and add the Cakelio publishable key. Never add a Supabase secret/service-role key to an Expo public environment variable.

## Current status
- Guest Home/Bakers/Studio remain available
- Customer/provider email signup and sign-in
- Persistent native authentication
- Profile screen reflects signed-in account type

Production email-confirmation deep links will be configured with the Cakelio domain and Supabase redirect allow-list before store release.
