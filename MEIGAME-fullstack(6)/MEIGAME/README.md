# MEIGAME — Full-Stack College Live Quiz Platform

MEIGAME is a Firebase-backed college live quiz platform with React/TypeScript frontend, Express/TypeScript backend, Firebase Authentication, Firestore, role-based authorization, server-side scoring, participant isolation, audit logging and a responsive 3D-inspired UI.

## Stack
- React + TypeScript + Vite
- Tailwind CSS v4
- React Router, TanStack Query, React Hook Form, Zod
- Firebase Web SDK 12.18.0
- Node.js + Express + TypeScript
- Firebase Admin SDK + Cloud Firestore
- Vitest + Supertest

## Firebase setup
1. Create/choose Firebase project `mame`.
2. Enable Email/Password Authentication.
3. Create a Firestore database.
4. Apply `firestore.rules` and `firestore.indexes.json`.
5. Apply `storage.rules` if Storage is enabled.
6. Copy `.env.example` to `.env`.
7. Keep the supplied public web configuration in the `VITE_*` variables.
8. Create a Firebase Admin service account and put its project ID, client email and private key in the server variables. **Do not put Admin credentials in VITE_* variables.**

The public Firebase web configuration supplied for this project is included in `.env.example`. Public Firebase web API keys are not server secrets; Admin private keys are secrets.

### Important configuration check
The supplied configuration contains `projectId: mame` and `authDomain: mebaseapp.com`. Firebase normally uses an auth domain tied to the Firebase project (for example `mame.firebaseapp.com`) unless a custom auth domain has actually been configured. If Firebase Authentication rejects the supplied domain, replace `VITE_FIREBASE_AUTH_DOMAIN` with the exact Auth domain shown in Firebase Console. Do not guess it.

## Development
```bash
npm install
npm run install:all
npm run dev
```
Frontend: http://localhost:5173  
Backend: http://localhost:5000  
Health: http://localhost:5000/health

## Seed development Super Admins
The seed script creates/updates Firebase Auth users and Firestore profiles. It never stores passwords in Firestore.

```bash
npm run firebase:seed
```

Development credentials requested for the project:
- Username: `mecprajan` / Password: `mahendra@123`
- Username: `mecraju` / Password: `mahendra@123`

The seed uses internal Firebase email identities for username login. Change these passwords before production and do not use them as real production credentials.

## Build and test
```bash
npm run build
npm test
```

## GitHub hosting
The repository is structured for GitHub. Commit the source files and `.env.example`; never commit `.env`, service-account JSON, private keys or `node_modules`.

For Firebase Hosting, build the client first and deploy the `client/dist` directory according to your Firebase Hosting configuration. The Express API requires a compatible server runtime (Cloud Functions/Cloud Run or another Node host); Firebase Hosting alone does not execute this Express server merely because the source is present.

## Security model
- Firebase Authentication owns passwords.
- Backend verifies Firebase ID tokens with Firebase Admin SDK.
- Backend authorization is authoritative.
- Staff permissions are checked server-side.
- Correct answers are removed from participant question responses.
- Scores and correctness are calculated server-side.
- Duplicate answer IDs are deterministic.
- Firestore rules deny direct writes to answers/results/activity logs.
- Helmet, CORS and rate limiting are enabled.
- Secrets are environment variables only.

## Logo
The repository contains `client/public/logo/` as requested. No MEIGAME logo image was supplied in this build environment, so no fake/recreated logo has been inserted. Put the real file at:

`client/public/logo/meigame-logo.png`

Then update the `Logo` component to use the image asset if desired.

## Production checklist
- Configure the exact Firebase Auth domain in the Firebase Console.
- Configure Admin credentials in the deployment environment.
- Replace development seed passwords.
- Restrict CORS to the production frontend origin.
- Deploy the Express API separately as Cloud Functions/Cloud Run or another Node service.
- Deploy Firestore rules/indexes and Storage rules.
- Add the real MEIGAME logo.
- Run `npm run build` and `npm test` in CI before deployment.
