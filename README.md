# Case Diary

Case Diary is a standalone offline-first React Native mobile app for maintaining a local legal diary. It does not connect to a backend and stores all case data locally on the user's device.

## Technology Stack

- React Native, JSX, Expo
- Expo SDK 57, compatible with Expo Go 57
- React Navigation
- Expo SQLite for local persistence
- Zustand for lightweight settings and refresh state
- React Native Safe Area Context and Gesture Handler
- Native date picker and Expo vector icons

## Architecture

The app keeps responsibilities separated:

- `src/components`: reusable themed UI controls, with `.jsx` and colocated `.styles.js` files
- `src/screens`: mobile screens and workflows, with `.jsx` and colocated `.styles.js` files
- `src/navigation`: bottom tabs and stack navigation
- `src/database`: SQLite initialization, migrations, repositories
- `src/services`: business logic, smart paste, backup, dates
- `src/models`: typed case and diary models
- `src/store`: local settings state
- `src/theme`: colors, spacing, radius, typography
- `src/styles`: global screen styles and shared variables
- `src/utils`: pure helpers and validation

## Development

### Install Dependencies

Install packages once after cloning or opening the project:

```bash
npm install
```

### Start Development Server

Start Metro and Expo from VS Code or a terminal:

```bash
npx expo start --port 8081
```

The same command is available as:

```bash
npm start
```

This starts the development server only. It does not create an APK, AAB, or IPA.

Plain `npx expo start` also works on normal Node LTS setups. In this workspace, Node `v24.18.0` exposed an Expo CLI free-port issue, so the project scripts pin Metro to the standard React Native port `8081`.

The project is aligned to Expo SDK 57 for Expo Go 57.

### Run On Android Emulator

Install Android Studio, create an Android Virtual Device, and start the emulator. Then run:

```bash
npm run android
```

or:

```bash
npx expo start --android --port 8081
```

Expo will open the app in the running emulator through Expo Go when supported. If no emulator is running, Android Studio's Device Manager can start one.

Recommended Android Studio pieces:

- Android Studio
- Android SDK Platform Tools
- An Android Virtual Device
- `adb` available from the Android SDK

### Run On Physical Android Device

Install Expo Go from Google Play. Start the dev server:

```bash
npx expo start
```

Then scan the QR code with Expo Go. Your computer and phone usually need to be on the same network. If LAN discovery is blocked, press `s` in the Expo terminal to change connection mode or use Expo's tunnel option:

```bash
npx expo start --tunnel --port 8081
```

CaseFlow uses Expo-supported native modules, including `expo-sqlite`, so it can be previewed in Expo Go during development.

### Fast Refresh

Fast Refresh is enabled by Expo/React Native by default. Keep the dev server running, edit a component such as `src/components/CaseCard.jsx`, and save the file. The running app should update without creating a production build.

### How To Test Offline

Expo Go needs to load the JavaScript bundle from the development server when previewing. After the app is open, CaseFlow's core functionality is local:

- Navigate between screens
- Create and edit cases
- Search and filter cases
- Add diary entries
- Export local backup data
- Read and write SQLite data

To test offline behavior, open the app first, then disable Wi-Fi/mobile data on the phone or emulator and verify those workflows continue to use local data. Do not stop the dev server while using Expo Go, because the development shell still depends on Metro for reloads and Fast Refresh.

### How SQLite Data Persists

SQLite initializes automatically on app startup in `src/database/database.js`. The app creates `caseflow.db` on the device or emulator and runs migrations without manual setup. Create a case, reload the app, and open All Cases; the case should still be present. Data remains until the app is uninstalled, the emulator/app data is cleared, or Settings > Clear All Data is confirmed.

### Development Sample Data

In development builds only, Settings includes `Insert Development Sample Cases`. It inserts sample cases locally so the dashboard, list, filters, and timeline UI can be tested quickly. It is guarded by `__DEV__` and is not shown in production builds.

Future APK/AAB builds can be produced with Expo/EAS build configuration, but no production build is required for development preview.

## SQLite

SQLite is initialized automatically when the app starts. Users do not configure any database manually.

Tables:

- `cases`: court, case number, parties, generated party name, status, info, start date, timestamps
- `diary_entries`: case timeline entries, optional next date, timestamps

Indexes are created for `case_id`, `entry_date`, `next_date`, `status`, and `case_number`.

Date-only fields are stored as local `YYYY-MM-DD` calendar dates. Timestamps are stored as ISO strings.

## Offline Behavior

CaseFlow has no REST API, backend server, cloud database, authentication server, Firebase, Supabase, or internet dependency. Case, diary, search, date filtering, settings, and backup are local.

## Backup

Settings includes `Export / Backup Data`, which writes a local JSON export and opens the native share sheet when available:

```json
{
  "version": 1,
  "exported_at": "...",
  "cases": [],
  "diary_entries": []
}
```

No data is sent to a server.

## Testing

```bash
npm test
npm run check
```

Tests cover smart paste, date ranges, search matching, party-name generation, and effective next date logic. `npm run check` runs Expo Doctor for project/dependency validation.

## Configuration

`UPCOMING_CASE_LOOKAHEAD_DAYS` defaults to `10` in `src/constants/appConstants.js`. The Settings screen stores the selected lookahead value locally with Zustand/AsyncStorage.

No environment variables are required. Do not add `DATABASE_URL`, `API_URL`, `BACKEND_URL`, or API keys for the MVP.
