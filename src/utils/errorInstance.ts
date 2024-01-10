/* eslint-disable no-console */
/* eslint-disable default-param-last */
import axios from 'axios';
import { Alert } from 'react-native';

export function errorHandler(
  error: Error | unknown,
  showConsoleLog: boolean | null | string = false,
  callback: (
    message?: string | unknown,
    errors?: string | unknown
  ) => void
): void {
  if (axios.isAxiosError(error) && error.response) {
    // Is this the correct way?
    const errors = Object.prototype.hasOwnProperty.call(
      error.response?.data,
      'errors'
    )
      ? error.response?.data.errors
      : error.response?.data.message;
    const responseMessage =
      typeof errors === 'string' ? errors : errors.join('. ');

    callback(responseMessage, errors);
  } else {
    Alert.alert(
      'Algo deu errado! 😭',
      `Ocorreu um erro inesperado na comunicação com nosso o servidor,
      tente novamente mais tarde ou contacte o suporte.`,
      [
        {
          text: 'Ok',
        },
      ],
      { cancelable: false }
    );
  }

  if (showConsoleLog) {
    if (typeof showConsoleLog !== 'string')
      console.log(`»» API Response Error: `, error);
    else
      console.log(
        `»» API Response Error[${showConsoleLog}]: `,
        error
      );
  }
}
