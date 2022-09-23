import { Logger } from '@nestjs/common';

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value) {
    Logger.log(`[${key}]: "${value}"`, `Configuration`);
    return value;
  }

  if (!defaultValue){
    throw new Error(`${key} not found in .env`);
  }
  Logger.log(`[${key}]: "${defaultValue}" (default)`, `Configuration`);
  return defaultValue;
}

function expiresConvert(value: string): string {
  return `${parseInt(value) * 60}s`;
}

export default () => ({
  PORT: parseInt(getEnv('PORT', '3030')),
  DB: {
    HOST: getEnv('DB_HOST', 'localhost'),
    PORT: parseInt(getEnv('DB_PORT', '3306')),
    USERNAME: getEnv('DB_USERNAME'),
    PASSWORD: getEnv('DB_PASSWORD'),
    DATABASE: getEnv('DB_DATABASE'),
  },
  AUTH: {
    SECRET: getEnv('AUTH_SECRET'),
    EXPIRES_IN: expiresConvert(getEnv('AUTH_EXPIRES_IN', '5')),
  }
});
