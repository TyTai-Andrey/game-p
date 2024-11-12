// vendor imports
import { AxiosError } from 'axios';

// local imports
// api
import BaseApi from '@api/BaseApi';

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
      return { error: (error as AxiosError)?.response?.data as DefaultError };
    }
  }
}

export default GameApi;
