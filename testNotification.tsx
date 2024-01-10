import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { type Subscription } from 'expo-modules-core';

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}
export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  const notificationListener = useRef();
  const responseListener = useRef<Subscription>();

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } =
        await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get token for push notification');
      return;
    }

    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    });

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#fff',
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener(
        (notification) => {
          setNotification(notification);
        }
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        (response) => {}
      );
    return () => {
      if (notificationListener.current && responseListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(
          responseListener.current
        );
      }
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};
export default function TestNotification() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { expoPushToken: token } = usePushNotifications();

  const handle = async () => {
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Ativar notificatcao');
      const permition = await Notifications.requestPermissionsAsync();
      console.log(permition);
      return;
    }

    await Notifications.setNotificationChannelAsync('test', {
      name: 'Vendedor',
      sound: 'sound1.wav',
      importance: Notifications.AndroidImportance.HIGH,
    });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hello, Joel',
        body: 'Aqui está minha notificacao',
        sound: 'sound1.wav',
        vibrate: [1],
      },
      trigger: {
        seconds: 2,
        channelId: 'Vendedor',
      },
    });
    console.log('ativo notificacao');
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          handle();
        }}
      />
      <Button
        title="View token"
        onPress={async () => {
          console.log('o token é: ');
          console.log(token);
        }}
      />
    </View>
  );
}
