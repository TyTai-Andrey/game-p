type AuthState = {
  isAuthenticated: boolean
  refreshToken: Nullable<string>
  token: Nullable<string>
  userId: Nullable<string>
};

type AuthAction = {
  setAuthData: (authData: Omit<AuthState, 'isAuthenticated'>, withAuthHelper?: boolean) => void
  logout: () => void
};

export type {
  AuthAction,
  AuthState,
};
