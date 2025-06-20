import express from 'express';
import { verifyToken } from '../middleware/authJwt.js';

const router = express.Router();

router.get('/me', verifyToken, (req, res) => {
  const { username, name, email, usage } = req.user;
  res.json({ username, name, email, usage });
});

export default router;
