import mongoose from 'mongoose';
import { config } from './env.js';

export async function connectToDatabase() {
  if (!config.mongoUri) {
    throw new Error('MONGODB_URI/MONGO_URI is not set in environment');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(config.mongoUri, {
    autoIndex: true,
  });
}
