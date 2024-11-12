import axios from 'axios';

const getExpirationDate = (jwtToken: string): number => {
  const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

  return jwt && jwt.exp && jwt.exp * 1000;
};

const authorization = (() => {
  let jwt: Nullable<string> = window.localStorage.getItem('token') || null;
  let jwtRefresh: Nullable<string> = window.localStorage.getItem('refreshToken') || null;
  const refreshEndpoint = `${process.env.REACT_APP_API_BASE_URL}/auth/refresh`;

  let _refreshTimeout: number;

  const getToken = () => jwt;
  const getRefreshToken = () => jwtRefresh;

  const setToken = ({
    token,
    refreshToken,
  }: AuthResponse) => {
    const expiry = getExpirationDate(token);
    jwt = token;
    jwtRefresh = refreshToken;
    window.localStorage.setItem('refreshToken', refreshToken);
    window.localStorage.setItem('token', token);

    if (expiry) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      _refreshToken(expiry);
    }
  };

  const _breakRefreshToken = () => {
    if (_refreshTimeout) window.clearTimeout(_refreshTimeout);
  };

  const removeToken = () => {
    jwt = null;
    jwtRefresh = null;
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('token');

    _breakRefreshToken();
  };

  const getRefreshedToken = (callback?: () => void, refreshToken?: string) => {
    if (!getRefreshToken() && !refreshToken) return Promise.resolve();
    const data = {
      refresh: getRefreshToken() || refreshToken,
    };

    const options = {
      url: refreshEndpoint,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return axios(options)
      .then((response) => {
        setToken(response.data);

        return response.data;
      })
      .catch(() => {
        removeToken();
        if (callback) callback();
      });
  };

  const _refreshToken = (delay: number) => {
    _refreshTimeout = window.setTimeout(getRefreshedToken, delay - 5000);
  };

  const isAuthenticated = !!getToken();

  return {
    getToken,
    getRefreshToken,
    setToken,
    removeToken,
    getRefreshedToken,
    isAuthenticated,
  };
})();

export { getExpirationDate };
export default authorization;
