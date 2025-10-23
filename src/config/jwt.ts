export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'default_secret_key',
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};
