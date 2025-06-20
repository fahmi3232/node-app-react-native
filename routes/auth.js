import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const exist = await User.findOne({ $or: [{ email }, { username }] });
  if (exist) return res.status(409).json({ message: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, name, email, password: hashed });
  return res.status(201).json({ message: 'User created', user: { id: user._id } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, username: user.username, name: user.name, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return res.json({ token });
});

export default router;
