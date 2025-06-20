import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  usage:    { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
