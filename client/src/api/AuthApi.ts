// vendor imports
import { AxiosError } from 'axios';

// local imports
// api
import BaseApi from '@api/BaseApi';

class AuthApi {
  static async register(data: AuthData): Promise<ITypeOrError<AuthResponse>> {
    const client = BaseApi.getClient();
    const options = {
      data,
      method: 'POST',
      url: '/register',
    };

    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      return { error: (error as AxiosError)?.response?.data as DefaultError };
    }
  }

  static async login(data: AuthData): Promise<ITypeOrError<AuthResponse>> {
    const client = BaseApi.getClient();
    const options = {
      data,
      method: 'POST',
      url: '/login',
    };

    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      return { error: (error as AxiosError)?.response?.data as DefaultError };
    }
  }

  static async logout(): Promise<void> {
    const client = BaseApi.getClient();
    const options = {
      method: 'POST',
      url: '/logout',
    };

    await client(options);
  }
}

export default AuthApi;
