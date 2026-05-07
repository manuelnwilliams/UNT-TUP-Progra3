import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Entrada raíz
        index:       resolve(__dirname, "index.html"),
        // Páginas de autenticación
        login:       resolve(__dirname, "src/pages/auth/login/login.html"),
        registro:    resolve(__dirname, "src/pages/auth/registro/registro.html"),
        // Páginas de rol
        adminHome:   resolve(__dirname, "src/pages/admin/home/home.html"),
        clientHome:  resolve(__dirname, "src/pages/client/home/home.html"),
        // Páginas de la tienda
        storeHome:   resolve(__dirname, "src/pages/store/home/home.html"),
        storeCarrito: resolve(__dirname, "src/pages/store/cart/cart.html"),
      },
    },
  },
  base: "./",
});
