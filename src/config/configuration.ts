export default function configuration() {
  return {
    hashing: {
      memoryCost: parseInt(process.env.ARGON2_MEMORY_COST || '4096'),
      type: process.env.ARGON2_TYPE || 'argon2id',
      timeCost: parseInt(process.env.ARGON2_TIME_COST || '1'),
      parallelism: parseInt(process.env.ARGON2_PARALLELISM || '1'),
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'default_secret_key',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      },
    },
  };
}

export type Configuration = ReturnType<typeof configuration>;
