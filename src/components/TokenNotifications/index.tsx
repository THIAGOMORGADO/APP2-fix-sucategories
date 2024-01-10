import React, {
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAuth } from '../../hooks/auth';
import * as Notifications from 'expo-notifications';
import { type Subscription } from 'expo-modules-core';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/* ToDo: Implementar consumo de som nesta push notification - som padrão e específico para app fieldright */
/* ToDo: Validar o som */

const TokenNotifications = ({ children }: PropsWithChildren) => {
  const [notification, setNotification] = useState<boolean>(false);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const { handleTokenNotifications, user } = useAuth();
  const { savedToken, resolveToken } = handleTokenNotifications;

  useEffect(() => {
    (async () => {
      const token = await savedToken();
      if (!token && !!user && user.id) {
        resolveToken(user.id);
      }

      if (token) {
        notificationListener.current =
          Notifications.addNotificationReceivedListener(
            (notification) => {
              setNotification(!!notification);
            }
          );

        responseListener.current =
          Notifications.addNotificationResponseReceivedListener(
            (response) => {}
          );
        return () => {
          if (
            notificationListener.current &&
            responseListener.current
          ) {
            Notifications.removeNotificationSubscription(
              notificationListener.current
            );
            Notifications.removeNotificationSubscription(
              responseListener.current
            );
          }
        };
      }
    })();
  }, []);

  return <>{children}</>;
};

export default TokenNotifications;
