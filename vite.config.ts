import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://cloud.umami.is", // Укажите URL вашего Umami сервера
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Если необходимо изменить путь
      },
    },
  },
  plugins: [react()],
});
