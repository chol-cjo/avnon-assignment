import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run assignment-question:serve:development',
        production: 'nx run assignment-question:serve:production',
      },
      ciWebServerCommand: 'nx run assignment-question:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
