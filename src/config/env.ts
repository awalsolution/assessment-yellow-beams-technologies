import { config } from 'dotenv';
import path from 'node:path';

const nodeEnv = process.env.NODE_ENV || 'development';
const envFilePath = path.resolve(process.cwd(), `.env.${nodeEnv}`);

config({ path: envFilePath });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, HOST, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, OPENAI_API_KEY } = process.env;
export const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
