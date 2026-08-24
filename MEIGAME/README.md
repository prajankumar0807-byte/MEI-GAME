# MEIGAME

Private college live quiz platform built with React, TypeScript, Express and Firebase.

## Stack
- React + Vite + TypeScript + Tailwind CSS
- React Router, TanStack Query, React Hook Form, Zod, Framer Motion
- Node.js + Express + Firebase Admin SDK
- Firebase Authentication + Cloud Firestore + Storage rules
- Vitest + Supertest

## Architecture
The browser authenticates with Firebase Authentication and sends an ID token to the Express API. Express verifies the token with Firebase Admin SDK, loads the Firestore user profile, and performs role/permission checks. Quiz correctness and scoring are server-side. Firestore rules deny direct writes to answers/results/activity logs.

## Setup
1. Create a Firebase project and enable Email/Password Authentication.
2. Create a Firestore database and Storage bucket.
3. Copy `.env.example` to `.env` and fill server Firebase Admin values plus client `VITE_*` values.
4. Install dependencies: `npm install` (root), `npm --prefix client install`, `npm --prefix server install`.
5. Run locally: `npm run dev`.
6. Seed development Super Admins: `npm run firebase:seed`.

Development seed identities are represented as `mecprajan@meigame.local` / `mecraju@meigame.local` because Firebase Auth signs in with email rather than a username. Password for both is `mahendra@123`. These are development credentials only; change them before production.

## Firebase deployment
Use Firebase CLI separately to deploy Firestore rules/indexes and Hosting after authenticating: `firebase deploy --only firestore,storage,hosting`.

## Important security notes
- Never commit `.env` or Firebase Admin private keys.
- `VITE_*` values are public client configuration; Admin credentials are server-only.
- Backend authorization is authoritative even though Firestore rules also protect direct client access.
- Correct answers are stripped from participant responses.
- Client-provided score/correctness/rank fields are ignored.

## Verification
`npm run build` builds both packages. `npm test` runs server and client smoke tests. Firebase integration tests requiring a real project are intentionally not claimed as local offline tests.

## Logo
Place the provided logo at `client/public/logo/meigame-logo.png`. A text/vector fallback is used by the UI if no image is present.

## Firebase CLI

Install the Firebase CLI globally on your computer:

```bash
npm install -g firebase-tools
firebase --version
firebase login
```

The root project also includes `firebase-tools` as a development dependency, so after `npm install` you can use the local CLI through npm scripts without relying on the global installation:

```bash
npm run firebase -- --version
npm run firebase:login
npm run firebase:projects
npm run firebase:deploy
```

Connect this project to your Firebase project with:

```bash
firebase use --add
```

Then deploy Hosting, Firestore rules/indexes, and Storage rules as required.
