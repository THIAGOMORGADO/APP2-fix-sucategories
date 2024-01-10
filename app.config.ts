import type { ConfigContext, ExpoConfig } from '@expo/config';

import packageJson from './package.json';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Field Right',
  slug: 'field-right',
  description:
    'An app to help you find the right Goods Services near you.',
  owner: 'fieldrightapp',
  // owner: 'aldemiro19',
  version: packageJson.version,
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'fieldright',
  userInterfaceStyle: 'automatic',
  platforms: ['android', 'ios'],
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  jsEngine: 'hermes',
  // runtimeVersion:"exposdk:46.0.0",

  // runtimeVersion: "1.0.0",
  android: {
    icon: './assets/images/icon.png',
    versionCode: 19,
    permissions: [],
    adaptiveIcon: {
      backgroundColor: '#fff',
      foregroundImage: './assets/images/adaptive-icon.png',
    },
    package: 'com.gersonsalvador.fieldrightmobile',
    googleServicesFile: './google-services.json',
    // useNextNotificationsApi: true,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    icon: './assets/images/icon.png',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    supportsTablet: true,
    bundleIdentifier:
      process.env.APP_ENV === 'production'
        ? 'com.fieldright.ios'
        : 'com.fieldright.ios-dev',
    buildNumber: '19',
    jsEngine: 'jsc',
  },
  packagerOpts: {
    config: 'metro.config.js',
  },
  extra: {
    api: {
      production: 'https://fieldrightapi.herokuapp.com',
      test: 'https://fieldrightapitest.herokuapp.com',
      external: {
        google:
          'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&key=AIzaSyC2_uGMQfhxhLRCsIDkHPy7RDGe7DwXLVQ&',
        ibge: 'https://servicodados.ibge.gov.br/api/v1',
      },
    },
    eas: {
      projectId: 'a19e4dd9-23bd-4031-9169-3737833a8349',
    },
  },
  plugins: [
    [
      'expo-notifications',
      {
        icon: './assets/images/icon.png',
        color: '#29c17e',
        mode: 'production',
        iosDisplayInForeground: true,
        androidMode: 'default',
      },
    ],
  ],
  androidNavigationBar: {
    backgroundColor: '#ffffff',
    barStyle: 'dark-content',
  },
});
