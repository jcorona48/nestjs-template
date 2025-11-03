export const DB_CONFIG = {
  url: process.env.TURSO_DATABASE_URL || 'libsql://default-database-url',
  authToken: process.env.TURSO_AUTH_TOKEN || 'default_auth_token',
};
