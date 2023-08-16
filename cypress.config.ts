import { cypressCodegen } from 'cypress-codegen';
import { defineConfig } from 'cypress';

export default defineConfig({
  screenshotOnRunFailure: false,
  video: false,

  e2e: {
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      cypressCodegen(on, config);
      return config;
    }
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: {}
    },
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      cypressCodegen(on, config);
      return config;
    }
  }
});
