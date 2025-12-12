export default function configuration() {
  return {
    hashing: {
      memoryCost: Number.parseInt(process.env.ARGON2_MEMORY_COST || '4096'),
      type: process.env.ARGON2_TYPE || 'argon2id',
      timeCost: Number.parseInt(process.env.ARGON2_TIME_COST || '1'),
      parallelism: Number.parseInt(process.env.ARGON2_PARALLELISM || '1'),
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'default_secret_key',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      },
    },
    bankingly: {
      apiUrl: process.env.BANKINGLY_API_URL || 'https://api.bankingly.com',
      username: process.env.BANKINGLY_USERNAME || 'default_username',
      password: process.env.BANKINGLY_PASSWORD || 'default_password',
      timeout: Number.parseInt(process.env.BANKINGLY_TIMEOUT || '5000'),
      maxRedirects: Number.parseInt(process.env.BANKINGLY_MAX_REDIRECTS || '5'),
    },
    db: {
      url: process.env.TURSO_DATABASE_URL || 'libsql://default-database-url',
      authToken: process.env.TURSO_AUTH_TOKEN || 'default_auth_token',
    },
  };
}

export type Configuration = ReturnType<typeof configuration>;
