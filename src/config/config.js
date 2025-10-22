export const getConfig = (key) => {
  const env = import.meta.env.VITE_APP_ENV || 'production';

  const base = {
    ENV: env,
    BACKEND_GRAPHQL_ENDPOINT: import.meta.env.VITE_APP_BASE_URL,
    VITE_APP_FIREBASE_CONFIG: {
      apiKey: 'AIzaSyANyQ0KHKktNYXbbeWw47sxGc5E36kuXwo',
      authDomain: 'portfolio-watch-app.firebaseapp.com',
      projectId: 'portfolio-watch-app',
      storageBucket: 'portfolio-watch-app.firebasestorage.app',
      messagingSenderId: '1016954697381',
      appId: '1:1016954697381:web:59a327e6ce5cdc119dbf4c',
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'Missing Measurement ID',
    },
  };

  const development = {
    ...base,
  };

  const configSettings = {
    development,
  };

  const config = configSettings[env] || configSettings.development;

  if (!key) {
    return config;
  }

  return config[key];
};

export default {
  getConfig,
};
