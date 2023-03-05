import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  e2e: {
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173/',
  },
  env: {
    USER_NAME: process.env.USER_NAME,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
    USER_TOKEN: process.env.USER_TOKEN,
    USER_AVATAR: process.env.USER_AVATAR,
  },
  projectId: 'fjo7zx',
});
