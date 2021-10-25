const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
  
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')


module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        baseURL: "http://localhost:3000",
        uploadFilePath: 'tmp'
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
    distDir: "build",
    env: {
      NEXTAUTH_URL: "https://test.khambodiahr.com",
      baseURL: "https://test.khambodiahr.com",
      uploadFilePath: '/tmp'
    },
  };
};
