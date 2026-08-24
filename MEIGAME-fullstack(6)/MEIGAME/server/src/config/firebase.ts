import 'dotenv/config'; import {cert,getApps,initializeApp} from 'firebase-admin/app'; import {getAuth} from 'firebase-admin/auth'; import {getFirestore,FieldValue} from 'firebase-admin/firestore'; import {getStorage} from 'firebase-admin/storage';
const projectId=process.env.FIREBASE_PROJECT_ID; const clientEmail=process.env.FIREBASE_CLIENT_EMAIL; const privateKey=process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g,'\n');
if(!projectId||!clientEmail||!privateKey) console.warn('Firebase Admin credentials are missing. API starts, but Firebase operations will fail until configured.');
const app=getApps()[0]||initializeApp(projectId&&clientEmail&&privateKey?{credential:cert({projectId,clientEmail,privateKey}),storageBucket:process.env.FIREBASE_STORAGE_BUCKET}:undefined);
export const adminAuth=getAuth(app); export const db=getFirestore(app); export const bucket=getStorage(app).bucket(); export {FieldValue};
