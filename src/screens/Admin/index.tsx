import React from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  Button,
  Colors,
  Avatar,
} from 'react-native-ui-lib';
import { useAuth } from '../../hooks/auth';

export const Admin: React.FC = () => {
  const { user, signOut } = useAuth();
  const { id, firstName, lastName } = user;

  return (
    <View style={styles.container}>
      <View style={styles.userProfile}>
        <Avatar
          size={68}
          badgeProps={{
            backgroundColor: Colors.$backgroundSuccessHeavy,
          }}
          label={`${firstName ? firstName[0] : null}${
            lastName ? lastName[0] : null
          }`}
          backgroundColor={Colors.$backgroundDarkActive}
          labelColor={Colors.$textDefaultLight}
        />
        <Text
          style={styles.userProfileName}
        >{`${firstName} ${lastName}`}</Text>
        <Text style={styles.userProfileAdminText}>
          Você está logado como Admin
        </Text>
        <Text
          color={Colors.$textDangerLight}
          style={styles.userProfileAdminDescription}
        >
          A Field Right Mobile App ainda não suporta usuários
          Administradores
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          label="Sair e Logar com outra conta"
          style={styles.buttonLogout}
          size={Button.sizes.large}
          borderRadius={6}
          backgroundColor={Colors.green30}
          onPress={() => {
            if (id) signOut(id);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  userProfile: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingTop: 120,
  },
  userProfileName: {
    fontSize: 28,
    paddingVertical: 10,
  },
  userProfileAdminText: {
    fontSize: 20,
    paddingVertical: 10,
  },
  userProfileAdminDescription: {
    fontSize: 16,
    paddingVertical: 10,
    textAlign: 'center',
  },
  buttonLogout: {
    fontSize: 20,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 40,
  },
});
