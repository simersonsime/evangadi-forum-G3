import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows external access
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    allowedHosts: [
      "evangadi-forum-frontend-7e96.onrender.com",
      
    ],
  },
});
