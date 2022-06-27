import { cypressCodegen } from 'cypress-codegen/dist/plugin';
import { defineConfig } from 'cypress';

export default defineConfig({
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
