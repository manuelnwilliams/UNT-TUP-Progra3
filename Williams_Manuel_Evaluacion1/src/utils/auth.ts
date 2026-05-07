import type { Rol } from "../types/Rol";
import { obtenerSesion, eliminarSesion } from "./localStorage";
import { navigate } from "./navigate";

// Verifica que el usuario esté logueado y tenga el rol correcto.
// Si no está logueado → redirige al login.
// Si está logueado pero con otro rol → redirige a su home correspondiente.
export const verificarAcceso = (
  rutaLogin: string,
  rutaOtroRol: string,
  rolRequerido: Rol
): void => {
  const sesion = obtenerSesion();

  if (!sesion || !sesion.loggedIn) {
    navigate(rutaLogin);
    return;
  }

  if (sesion.role !== rolRequerido) {
    navigate(rutaOtroRol);
  }
};

// Cierra la sesión y redirige al login
export const logout = (): void => {
  eliminarSesion();
  navigate("/src/pages/auth/login/login.html");
};
