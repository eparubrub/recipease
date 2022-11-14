module.exports = {
  env: {
    REACT_APP_FIREBASE_KEY: process.env.REACT_APP_FIREBASE_KEY,
    REACT_APP_AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
    REACT_APP_SENDER_ID: process.env.REACT_APP_SENDER_ID,
    REACT_APP_APP_ID: process.env.REACT_APP_APP_ID,
    REACT_APP_MEASUREMENT_ID: process.env.REACT_APP_MEASUREMENT_ID,
    REACT_APP_PASSWORD: process.env.REACT_APP_PASSWORD,
    REACT_APP_DEV_OR_ENV: process.env.REACT_APP_DEV_OR_ENV,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};
