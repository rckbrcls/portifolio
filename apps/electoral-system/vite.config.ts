import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  define: {
    // Ensure the VITE_API_URL is inlined during build to avoid runtime import.meta access
    // Provide both the original import.meta key (for other code) and a simple global
    // constant __VITE_API_URL__ we can reference safely from TypeScript/JS without
    // touching import.meta at runtime.
    "import.meta.env.VITE_API_URL": JSON.stringify(
      process.env.VITE_API_URL ?? "",
    ),
    __VITE_API_URL__: JSON.stringify(process.env.VITE_API_URL ?? ""),
  },
});
