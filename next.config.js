const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        baseURL: "http://localhost:3000",
      },
    };
  }

  return {
    distDir: "build",
    env: {
      NEXTAUTH_URL: "https://test.khambodiahr.com",
      baseURL: "https://test.khambodiahr.com",
    },
  };
};
