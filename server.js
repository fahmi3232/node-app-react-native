import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API is running'));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/api/test', (req, res) => {
  res.send('Server is working!');
});


const PORT = process.env.PORT || 8082
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
