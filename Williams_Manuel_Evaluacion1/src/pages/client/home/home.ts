import { verificarAcceso, logout } from "../../../utils/auth";
import { obtenerSesion } from "../../../utils/localStorage";

// Protege la ruta: solo acceden usuarios con rol "client"
verificarAcceso(
  "/src/pages/auth/login/login.html",   // redirige si no está logueado
  "/src/pages/admin/home/home.html",    // redirige si el rol es "admin"
  "client"
);

// Referencias al DOM
const btnLogout     = document.getElementById("btn-logout")     as HTMLButtonElement;
const nombreUsuario = document.getElementById("nombre-usuario") as HTMLSpanElement;

// Cierra la sesión al hacer clic en el botón
btnLogout.addEventListener("click", () => {
  logout();
});

// Muestra el email del usuario logueado en el saludo
const sesion = obtenerSesion();
if (sesion) {
  nombreUsuario.textContent = sesion.email;
}
