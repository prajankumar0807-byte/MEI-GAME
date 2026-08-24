import { Router } from 'express';
import { verifyFirebaseToken, requireRole, requirePermission } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { createQuiz, listQuizzes, getQuiz, postQuiz, patchQuiz, deleteQuiz, publish, start, end, archive } from '../controllers/quizzes.js';
import { me, logout } from '../controllers/auth.js';
import { join } from '../controllers/join.js';
import * as participant from '../controllers/participant.js';
import { createQuiz as createQuizSchema, joinSchema, answerSchema } from '../validators/schemas.js';
import { db } from '../config/firebase.js';

export const router = Router();
router.get('/health', (_req, res) => res.json({ ok: true, name: 'MEIGAME API' }));
router.get('/auth/me', verifyFirebaseToken, me);
router.post('/auth/logout', verifyFirebaseToken, logout);
router.get('/quizzes', verifyFirebaseToken, listQuizzes);
router.get('/quizzes/:id', verifyFirebaseToken, getQuiz);
router.post('/quizzes', verifyFirebaseToken, requirePermission('CREATE_QUIZ'), validate(createQuizSchema), postQuiz);
router.patch('/quizzes/:id', verifyFirebaseToken, requirePermission('EDIT_QUIZ'), patchQuiz);
router.delete('/quizzes/:id', verifyFirebaseToken, requirePermission('DELETE_QUIZ'), deleteQuiz);
router.post('/quizzes/:id/publish', verifyFirebaseToken, requirePermission('EDIT_QUIZ'), publish);
router.post('/quizzes/:id/start', verifyFirebaseToken, requirePermission('START_QUIZ'), start);
router.post('/quizzes/:id/end', verifyFirebaseToken, requirePermission('END_QUIZ'), end);
router.post('/quizzes/:id/archive', verifyFirebaseToken, requirePermission('DELETE_QUIZ'), archive);
router.post('/join/:joinCode', validate(joinSchema), join);
router.get('/participant/session/:sessionId', participant.session);
router.post('/participant/session/:sessionId/answer', validate(answerSchema), participant.answer);
router.post('/participant/session/:sessionId/complete', participant.complete);
router.get('/participant/session/:sessionId/result', participant.result);
router.get('/users', verifyFirebaseToken, requireRole('SUPER_ADMIN'), async (_req, res) => {
  const s = await db().collection('users').limit(100).get();
  res.json({ users: s.docs.map(d => ({ uid: d.id, ...d.data() })) });
});
router.get('/activity', verifyFirebaseToken, requireRole('SUPER_ADMIN'), async (_req, res) => {
  const s = await db().collection('activityLogs').orderBy('createdAt', 'desc').limit(100).get();
  res.json({ logs: s.docs.map(d => ({ id: d.id, ...d.data() })) });
});
