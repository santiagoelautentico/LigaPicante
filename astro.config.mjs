import { defineConfig } from "astro/config";

import react from "@astrojs/react";

export default defineConfig({
  vite: {
    server: {
      allowedHosts: true,
    },
  },

  integrations: [react()],
});