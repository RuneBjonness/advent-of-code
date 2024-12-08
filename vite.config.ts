import { resolve } from "node:path";
import { UserConfig } from "vite";

export default {
  root: "src",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
} satisfies UserConfig;
