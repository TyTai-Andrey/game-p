// vendor imports
import { AxiosError } from 'axios';

// local imports
// api
import BaseApi from '@api/BaseApi';

// utils
import { serverError } from '@utils/notifications-operations';

class GameApi {
  static async create(data: GameData): Promise<ITypeOrError<GameResponse>> {
    const client = BaseApi.getClient();
    const options = {
      data,
      method: 'POST',
      url: '/game/create',
    };

    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      serverError(error);
      return { error: (error as AxiosError)?.response?.data as DefaultError };
    }
  }
}

export default GameApi;
