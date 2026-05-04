import { getSession } from "./utils/localStorage";

const user = getSession();
const path = window.location.pathname;

// rutas protegidas
const isAdminRoute = path.includes("/admin");
const isClientRoute = path.includes("/client");

if (!user) {
  // no logueado redirige al login
  if (isAdminRoute || isClientRoute) {
    window.location.href = "/src/pages/auth/login/login.html";
  }
} else {
  // logueado pero sin permiso
  if (isAdminRoute && user.rol !== "admin") {
    window.location.href = "/src/pages/client/home/home.html";
  }

  if (isClientRoute && user.rol !== "client") {
    window.location.href = "/src/pages/admin/home/home.html";
  }
}