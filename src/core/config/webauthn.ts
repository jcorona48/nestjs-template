export const WEBAUTHN_CONFIG = {
  rpName: process.env.WEBAUTHN_RP_NAME || 'Default RP',
  rpID: process.env.WEBAUTHN_RP_ID || 'localhost',
  origin: process.env.WEBAUTHN_ORIGIN || 'http://localhost:5173',
};
