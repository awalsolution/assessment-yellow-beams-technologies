import { cleanEnv, port, str, bool, num } from 'envalid';

export const ValidateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
      default: 'development',
    }),
    PORT: port({ default: 5000 }),
    DB_HOST: str(),
    DB_PORT: port(),
    DB_DATABASE: str(),
    JWT_SECRET_KEY: str(),
    LOG_FORMAT: str(),
    LOG_DIR: str(),
    ORIGIN: str(),
    CREDENTIALS: bool(),
    OPENAI_API_KEY: str(),
  });
};
