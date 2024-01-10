import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';

export const Camera: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ExpoCamera style={{ flex: 1 }} type={type}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0.1,
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() => {
            setType(
              type === ExpoCamera.Constants.Type.back
                ? ExpoCamera.Constants.Type.front
                : ExpoCamera.Constants.Type.back
            );
          }}
        >
          <Text
            style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
          >
            {' '}
            Flip{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </ExpoCamera>
  );
};
