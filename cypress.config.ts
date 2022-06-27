import { cypressCodegen } from 'cypress-codegen/dist/plugin';
import { defineConfig } from 'cypress';

export default defineConfig({
  retries: 1,
  video: false,

  e2e: {
    setupNodeEvents(on, config) {
      cypressCodegen(on, config);
      return config;
    }
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    },
    setupNodeEvents(on, config) {
      cypressCodegen(on, config);
      return config;
    }
  }
});
