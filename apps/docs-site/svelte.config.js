import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  compilerOptions: {
    runes: true,
  },
  kit: {
    adapter: adapter({
      pages: "dist",
      assets: "dist",
      strict: true,
    }),
    prerender: {
      handleHttpError: "fail",
    },
  },
};

export default config;
