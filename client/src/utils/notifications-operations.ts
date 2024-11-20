import { Store, iNotification } from 'react-notifications-component';
import { AxiosError } from 'axios';

const baseParams: Pick<iNotification, 'insert' | 'container' | 'animationIn' | 'animationOut' | 'dismiss'> = {
  insert: 'top',
  container: 'top-right',
  animationIn: ['animate', 'fadeIn'],
  animationOut: ['animate', 'fadeOut'],
  dismiss: {
    duration: 5000,
    onScreen: true,
  },
};

const errorNotification = (
  error?: string,
  message?: string,
) => {
  Store.addNotification({
    title: error || 'Ошибка выполнения запроса к серверу!',
    message,
    type: 'danger',
    ...baseParams,
  });
};

const serverError = (error: AxiosError | DefaultError | unknown) => {
  const axiosError = (error as AxiosError)?.response?.data;
  const base = { errors: {}, message: 'Ошибка выполнения запроса к серверу!' };
  const { errors, message } = (axiosError || error) as DefaultError || base;

  const errorMessage = Object.keys(errors).map((key: string) => `${key}: ${errors[key]}`).join('\n');
  errorNotification(message, errorMessage);
};

const successNotification = (message: string) => {
  Store.addNotification({
    title: message,
    type: 'success',
    ...baseParams,
  });
};

export { serverError, errorNotification, successNotification };
