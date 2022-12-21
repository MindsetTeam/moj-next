const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      swcMinify: true,
      env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        baseURL: process.env.NEXTAUTH_URL,
        uploadFilePath: "tmp",
        tokenTelegramBot: process.env.TOKEN_TELEGRAM_BOT,
        MONGODB_URI: process.env.MONGODB_URI,
      },
    };
  }

  return {
    ...withPWA({
      pwa: {
        dest: "public",
        runtimeCaching,
      },
    }),
    swcMinify: true,
    distDir: "build",
    env: {
      NEXTAUTH_URL: "https://test.khambodiahr.com",
      baseURL: "https://test.khambodiahr.com",
      uploadFilePath: "/tmp",
      tokenTelegramBot: process.env.TOKEN_TELEGRAM_BOT,
      MONGODB_URI: process.env.MONGODB_URI,
    },
  };
};
