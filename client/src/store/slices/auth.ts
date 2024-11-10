// types
import { AuthAction, AuthState } from '@store/types/auth';
import { CreateSlice } from '@store/types';
import authorization from '@utils/authorization';

type CreateAuthSlice = CreateSlice<AuthState & AuthAction>;

const initAuthState = {
  isAuthenticated: false,
  refreshToken: null,
  token: null,
  userId: null,
};

const createAuthSlice: CreateAuthSlice = set => ({
  ...initAuthState,
  setAuthData: (data, withAuthHelper = true) => set(() => {
    if (withAuthHelper) authorization.setToken(data as AuthResponse);
    return ({ ...data, isAuthenticated: true });
  }),
  logout: () => set(() => {
    authorization.removeToken();
    return initAuthState;
  }),
});

const authBlackList = ['isAuthenticated', 'refreshToken', 'token', 'userId'];

export { authBlackList };
export default createAuthSlice;
