import mongoose, { set } from 'mongoose';
import { DB_HOST, DB_PORT, DB_DATABASE } from '../config/env';
import { logger } from '@/src/utils/logger';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

    // if (NODE_ENV !== 'production') {
    //   set('debug', true);
    // }

    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI);
    logger.info(`🍃 MongoDB Connected at : mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`);
    logger.info(`=================================`);

    mongoose.connection.on('error', err => {
      logger.error('🍃 MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.error('🍃 MongoDB disconnected');
    });
  } catch (error) {
    logger.error('🍃 Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
