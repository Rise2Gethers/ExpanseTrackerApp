const expoConfig = require("eslint-config-expo/flat");

module.exports = [
  // O expoConfig já é um array de configurações, então apenas espalhamos ele aqui
  ...expoConfig,
  
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Regras adicionais se necessário
      "no-unused-vars": "warn",
    },
  },
  {
    ignores: ["node_modules", ".expo", "dist", "web-build", "babel.config.js"]
  }
];