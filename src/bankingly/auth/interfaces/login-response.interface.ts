export class LoginResponse {
  signInResult:
    | 'Success'
    | 'Failed'
    | 'LockedOut'
    | 'RequiresVerification'
    | 'RequiresPasswordChange';
  forceFlags: {
    acceptTerms: boolean;
    changePass: boolean;
    setPhone: boolean;
  };
  biometricEnabled: boolean;
  kickedExistingSession: boolean;
  deviceTrackingEnabled: boolean;
  lastLoginDate: string;
  lastLoginIpAddress: string;
  lastLoginUserAgent: string;
  hasSummaryNotification: boolean;
  siteType: 'Person' | 'Business';
  userAccessToken: string;
  expiresIn: number;
  refreshToken: string;
}
