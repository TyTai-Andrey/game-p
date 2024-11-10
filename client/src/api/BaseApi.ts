// vendor imports
import axios from 'axios';

// utils
import authorization from '@utils/authorization';

export const getClientAxios = axios.create({ headers: { Accept: 'application/json' } });

export default class BaseApi {
  static getClient() {
    return axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authorization.getToken()}`,
      },
    });
  }
}
