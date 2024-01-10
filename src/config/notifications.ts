/* eslint-disable consistent-return */
import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { colors } from '../constants/colors';
import Constants from 'expo-constants';
// este metodo tem de receber um parametro com o type user, se for
// de acordo ao typeuser colocamos uma notificacao diferente
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export const registerForPushNotificationsAsync = async (
  perfil: string
) => {
  let token;

  // if (Device.isDevice) {
  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert(
      'Notificações',
      'Para melhor experiência, pedimos que considere ativar as notificações.'
    );
    return;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: colors.default.green,
      sound:
        perfil.toLowerCase() === 'comprador' ||
        perfil.toLowerCase() === 'vendedor'
          ? 'sound1.wav'
          : 'sound2.wav',
    });
  }
  // Learn more about projectId:
  // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  token = (
    await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    })
  ).data;

  /* } else {
    alert('Must use physical device for Push Notifications');
  } */

  return token;
};
