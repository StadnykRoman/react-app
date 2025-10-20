# Mini App (Expo) — Login, Recovery, and Todos

A small React Native app built with Expo that demonstrates a simple, production-like setup: authentication, navigation, a recovery flow with persistence, and a refreshable list powered by a public API.

## Features

- Email/password login (fixed test credentials)
- Recovery progress with milestones and local persistence
- Services screen with a refreshable Todos list (public API)
- Logout
- TypeScript and basic theming
 - React Native Paper for inputs/buttons

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Start the app

```bash
npx expo start
```

3) Open on a device

- Press i to launch iOS simulator
- Press w to launch web emulator

## Login

- Email: `test@test.com`
- Password: `password`


## What’s Inside

- `src/screens` — UI screens (Login, Dashboard, Recovery, Treatments, Profile, Support)
- `src/components` — shared UI (Screen, Header, Button, Card, etc.)
- `src/services` — simple services for auth and recovery data
- `src/constants` — theme, endpoints, storage keys
- `src/contexts` — `RecoveryContext` (recovery state) and `TodosContext` (public API data)
- `src/utils` — storage helper and small utilities

## Data Sources

- Services screen fetches the first 12 todos from `jsonplaceholder.typicode.com/todos` with pull-to-refresh. See `API_ENDPOINTS.TODOS`. [Link](https://jsonplaceholder.typicode.com/todos)
- Recovery progress is provided by in-app services with persistence for recovery state.

## Notes

- No external identity provider is required; login is limited to the test credentials above.
- Recovery progress is stored locally via AsyncStorage and shared across screens.

## Known Issues

- Google sign-in currently works only on the web build. iOS/Android simulator support is not finished yet. Can extend if needed.
- Most manual testing was done on the iOS simulator (iPhone 16).

## Scripts

```bash
npm run start
npm run ios
npm run android 
```